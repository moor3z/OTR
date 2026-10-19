import { getDb, getSettings } from '../../server/db.js';
import { priceBasket } from '../../server/pricing.js';
import { createCheckoutSession, createDiscountCoupon } from '../../server/stripe.js';
import { handle, json, fail, readJson, clean, randomId, orderRef, paymentMode } from '../../server/util.js';
import { pickMethod, localDeliveryDistance } from '../../server/fulfil.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POSTCODE_RE = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;

function validateCustomer(c = {}, method = 'post') {
  const collect = method === 'collect';
  const v = {
    email: clean(c.email, 254).toLowerCase(), name: clean(c.name, 100), phone: clean(c.phone, 30),
    line1: clean(c.line1, 120), line2: clean(c.line2, 120), city: clean(c.city, 80),
    county: clean(c.county, 80), postcode: clean(c.postcode, 10).toUpperCase(),
  };
  const fields = {};
  if (!EMAIL_RE.test(v.email)) fields.email = 'Enter a valid email address, like name@example.com.';
  if (v.name.length < 2) fields.name = collect ? 'Enter the name of the person collecting.' : 'Enter the name for the delivery label.';
  if (!collect) {
    if (!v.line1) fields.line1 = 'Enter the first line of the address.';
    if (!v.city) fields.city = 'Enter the town or city.';
    if (!POSTCODE_RE.test(v.postcode)) fields.postcode = 'Enter a full UK postcode, like CH1 2AB.';
  } else { v.line1 = ''; v.line2 = ''; v.city = ''; v.county = ''; v.postcode = ''; }
  // A phone number is optional for post, but needed for a hand delivery or a
  // collection so the shop can get hold of the customer about the time.
  if (v.phone && !/^[\d+() -]{7,}$/.test(v.phone)) fields.phone = 'Enter a phone number using digits only' + (method === 'post' ? ', or leave it blank.' : '.');
  else if (!v.phone && method !== 'post') fields.phone = collect ? 'Enter a phone number so we can let you know when it is ready.' : 'Enter a phone number so we can reach you about the delivery.';
  if (c.country && c.country !== 'GB') fields.country = 'We currently deliver to UK addresses only.';
  if (POSTCODE_RE.test(v.postcode) && !v.postcode.includes(' ')) v.postcode = v.postcode.slice(0, -3) + ' ' + v.postcode.slice(-3);
  return { v, fields };
}

export const onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);

  // How the order reaches the customer. Anything not currently offered falls
  // back to a hard error rather than silently becoming post.
  const settings = await getSettings(db);
  const methodId = typeof body.method === 'string' ? body.method : 'post';
  const method = pickMethod(settings, methodId);
  if (!method) return fail(422, 'That delivery option is not available. Please choose another.', { fields: { method: 'Choose how you would like your order.' } });
  const slot = clean(body.slot, 80);
  if (method.slots.length && !method.slots.includes(slot)) {
    return fail(422, method.id === 'collect' ? 'Choose when you will collect.' : 'Choose a delivery time.', { fields: { slot: method.id === 'collect' ? 'Choose a collection time.' : 'Choose a delivery time.' } });
  }

  const { v, fields } = validateCustomer(body.customer, method.id);
  if (Object.keys(fields).length) return fail(422, 'Please check the highlighted details.', { fields });

  // Re-price everything from the database. Any totals the browser sends are ignored.
  const quote = await priceBasket(db, settings, body.items || [], method.id);
  if (!quote.lines.length) return fail(400, 'Your basket is empty.');
  if (!quote.ok) return fail(409, 'Some items in your basket have changed. Please review your basket.', { quote });

  // Local delivery: the address has to be within the radius of the shop.
  let distance = null;
  if (method.id === 'local') {
    distance = await localDeliveryDistance(env, settings, v.postcode);
    if (distance > method.radius_miles) {
      return fail(422, `Sorry, ${v.postcode} is about ${Math.round(distance)} miles away and local delivery covers ${method.radius_miles} miles${method.from ? ` of ${method.from}` : ''}. Please choose post instead.`,
        { fields: { method: `Local delivery covers ${method.radius_miles} miles. Choose post for this address.`, postcode: `About ${Math.round(distance)} miles away.` }, distance_miles: Math.round(distance * 10) / 10 });
    }
    distance = Math.round(distance * 10) / 10;
  }

  const mode = paymentMode(env);
  const id = randomId(16), token = randomId(24), ref = orderRef(), now = new Date().toISOString();
  const items = quote.lines.map((l) => ({
    variant_id: l.variant_id, product_id: l.product_id, name: l.name, label: l.label, shape: l.shape || '',
    unit_pence: l.unit_pence, qty: l.qty, line_pence: l.line_pence,
  }));
  const address = { line1: v.line1, line2: v.line2, city: v.city, county: v.county, postcode: v.postcode, country: 'GB' };

  await db.prepare(
    `INSERT INTO orders(id,ref,token,mode,status,email,name,phone,address,items,subtotal_pence,delivery_pence,total_pence,currency,created_at,discount_pence,deals,fulfil_method,fulfil_slot,distance_miles)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'gbp',?,?,?,?,?,?)`)
    .bind(id, ref, token, mode, mode === 'demo' ? 'demo' : 'pending', v.email, v.name, v.phone,
      JSON.stringify(address), JSON.stringify(items), quote.subtotal_pence, quote.delivery_pence, quote.total_pence, now,
      quote.discount_pence, JSON.stringify(quote.deals.filter((d) => d.saving_pence > 0).map(({ label, bundles, saving_pence }) => ({ label, bundles, saving_pence }))),
      method.id, slot, distance).run();

  const origin = new URL(request.url).origin;

  if (mode === 'demo') {
    // No Stripe keys configured: send to a clearly-labelled demo page. No payment
    // is taken or simulated, the order is never marked paid, and stock is untouched.
    return json({ mode, url: `${origin}/demo-checkout?token=${token}` });
  }

  let session;
  try {
  let discounts;
  if (quote.discount_pence > 0) {
    const names = quote.deals.filter((d) => d.saving_pence > 0).map((d) => d.label).join(', ');
    const coupon = await createDiscountCoupon(env, quote.discount_pence, `Multi-buy saving (${names})`.slice(0, 40), `coupon-${id}`);
    discounts = { 0: { coupon: coupon.id } };
  }
  session = await createCheckoutSession(env, {
    mode: 'payment',
    client_reference_id: id,
    customer_email: v.email,
    success_url: `${origin}/success?token=${token}`,
    cancel_url: `${origin}/cancelled?token=${token}`,
    expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
    metadata: { order_id: id, order_ref: ref },
    payment_intent_data: {
      description: `Order ${ref}${method.id === 'collect' ? ' (collection)' : method.id === 'local' ? ' (local delivery)' : ''}`,
      metadata: { order_id: id, order_ref: ref, fulfilment: method.id, slot },
      ...(method.id === 'collect' ? {} : { shipping: { name: v.name, phone: v.phone || undefined,
        address: { line1: v.line1, line2: v.line2 || undefined, city: v.city, state: v.county || undefined, postal_code: v.postcode, country: 'GB' } } }),
    },
    // payment_method_types is left unset on purpose: Stripe then offers cards plus
    // Apple Pay / Google Pay / Link where the customer's device is eligible.
    line_items: Object.fromEntries(items.map((it, i) => [i, {
      quantity: it.qty,
      price_data: { currency: 'gbp', unit_amount: it.unit_pence,
        product_data: { name: it.label ? `${it.name} – ${it.label}` : it.name } },
    }])),
    discounts,
    shipping_options: { 0: { shipping_rate_data: {
      type: 'fixed_amount', display_name: (method.id === 'collect' ? 'Collection' : method.id === 'local' ? 'Local delivery' : settings.delivery_name || 'UK delivery') + (slot ? ` (${slot})` : ''),
      fixed_amount: { amount: quote.delivery_pence, currency: 'gbp' } } } },
  }, `order-${id}`);
  } catch (err) {
    await db.prepare(`UPDATE orders SET status='failed', admin_note='Could not create Stripe session.' WHERE id=?`).bind(id).run();
    throw err;
  }

  await db.prepare(`UPDATE orders SET stripe_session_id=? WHERE id=?`).bind(session.id, id).run();
  return json({ mode, url: session.url });
});
