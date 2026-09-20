import { getDb, getSettings } from '../../server/db.js';
import { priceBasket } from '../../server/pricing.js';
import { createCheckoutSession } from '../../server/stripe.js';
import { handle, json, fail, readJson, clean, randomId, orderRef, paymentMode } from '../../server/util.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POSTCODE_RE = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;

function validateCustomer(c = {}) {
  const v = {
    email: clean(c.email, 254).toLowerCase(), name: clean(c.name, 100), phone: clean(c.phone, 30),
    line1: clean(c.line1, 120), line2: clean(c.line2, 120), city: clean(c.city, 80),
    county: clean(c.county, 80), postcode: clean(c.postcode, 10).toUpperCase(),
  };
  const fields = {};
  if (!EMAIL_RE.test(v.email)) fields.email = 'Enter a valid email address, like name@example.com.';
  if (v.name.length < 2) fields.name = 'Enter the name for the delivery label.';
  if (!v.line1) fields.line1 = 'Enter the first line of the address.';
  if (!v.city) fields.city = 'Enter the town or city.';
  if (!POSTCODE_RE.test(v.postcode)) fields.postcode = 'Enter a full UK postcode, like CH1 2AB.';
  if (v.phone && !/^[\d+() -]{7,}$/.test(v.phone)) fields.phone = 'Enter a phone number using digits only, or leave it blank.';
  if (c.country && c.country !== 'GB') fields.country = 'We currently deliver to UK addresses only.';
  if (POSTCODE_RE.test(v.postcode) && !v.postcode.includes(' ')) v.postcode = v.postcode.slice(0, -3) + ' ' + v.postcode.slice(-3);
  return { v, fields };
}

export const onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);

  const { v, fields } = validateCustomer(body.customer);
  if (Object.keys(fields).length) return fail(422, 'Please check the highlighted details.', { fields });

  // Re-price everything from the database. Any totals the browser sends are ignored.
  const settings = await getSettings(db);
  const quote = await priceBasket(db, settings, body.items || []);
  if (!quote.lines.length) return fail(400, 'Your basket is empty.');
  if (!quote.ok) return fail(409, 'Some items in your basket have changed. Please review your basket.', { quote });

  const mode = paymentMode(env);
  const id = randomId(16), token = randomId(24), ref = orderRef(), now = new Date().toISOString();
  const items = quote.lines.map((l) => ({
    variant_id: l.variant_id, product_id: l.product_id, name: l.name, label: l.label,
    unit_pence: l.unit_pence, qty: l.qty, line_pence: l.line_pence,
  }));
  const address = { line1: v.line1, line2: v.line2, city: v.city, county: v.county, postcode: v.postcode, country: 'GB' };

  await db.prepare(
    `INSERT INTO orders(id,ref,token,mode,status,email,name,phone,address,items,subtotal_pence,delivery_pence,total_pence,currency,created_at)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'gbp',?)`)
    .bind(id, ref, token, mode, mode === 'demo' ? 'demo' : 'pending', v.email, v.name, v.phone,
      JSON.stringify(address), JSON.stringify(items), quote.subtotal_pence, quote.delivery_pence, quote.total_pence, now).run();

  const origin = new URL(request.url).origin;

  if (mode === 'demo') {
    // No Stripe keys configured: send to a clearly-labelled demo page. No payment
    // is taken or simulated, the order is never marked paid, and stock is untouched.
    return json({ mode, url: `${origin}/demo-checkout?token=${token}` });
  }

  let session;
  try {
  session = await createCheckoutSession(env, {
    mode: 'payment',
    client_reference_id: id,
    customer_email: v.email,
    success_url: `${origin}/success?token=${token}`,
    cancel_url: `${origin}/cancelled?token=${token}`,
    expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
    metadata: { order_id: id, order_ref: ref },
    payment_intent_data: {
      description: `Order ${ref}`,
      metadata: { order_id: id, order_ref: ref },
      shipping: { name: v.name, phone: v.phone || undefined,
        address: { line1: v.line1, line2: v.line2 || undefined, city: v.city, state: v.county || undefined, postal_code: v.postcode, country: 'GB' } },
    },
    // payment_method_types is left unset on purpose: Stripe then offers cards plus
    // Apple Pay / Google Pay / Link where the customer's device is eligible.
    line_items: Object.fromEntries(items.map((it, i) => [i, {
      quantity: it.qty,
      price_data: { currency: 'gbp', unit_amount: it.unit_pence,
        product_data: { name: it.label ? `${it.name} – ${it.label}` : it.name } },
    }])),
    shipping_options: { 0: { shipping_rate_data: {
      type: 'fixed_amount', display_name: settings.delivery_name || 'UK delivery',
      fixed_amount: { amount: quote.delivery_pence, currency: 'gbp' } } } },
  }, `order-${id}`);
  } catch (err) {
    await db.prepare(`UPDATE orders SET status='failed', admin_note='Could not create Stripe session.' WHERE id=?`).bind(id).run();
    throw err;
  }

  await db.prepare(`UPDATE orders SET stripe_session_id=? WHERE id=?`).bind(session.id, id).run();
  return json({ mode, url: session.url });
});
