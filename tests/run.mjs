// End-to-end API tests. Run against `wrangler pages dev` started with:
//   -b STRIPE_SECRET_KEY=sk_test_mock -b STRIPE_WEBHOOK_SECRET=whsec_mock -b STRIPE_API_BASE=http://localhost:8799
//   -b RESEND_API_KEY=re_mock -b "EMAIL_FROM=Shop <test@local>" -b RESEND_API_BASE=http://localhost:8798 -b ADMIN_DEV_BYPASS=true
// The stand-in Stripe and Resend servers are started by this file, so nothing else needs running.
import { createHmac } from 'node:crypto';
import './mock-stripe.mjs';
import './mock-resend.mjs';
import { sessions } from './mock-stripe.mjs';

const BASE = process.env.BASE || 'http://localhost:8788', SECRET = 'whsec_mock';
let pass = 0, failN = 0;
const ok = (name, cond, extra = '') => { cond ? pass++ : failN++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : '  ' + extra}`); };
const j = async (path, opt = {}) => { const r = await fetch(BASE + path, { ...opt, headers: { 'content-type': 'application/json', 'x-otr-admin': '1', ...(opt.headers || {}) } }); return { status: r.status, body: await r.json().catch(() => ({})) }; };
const post = (path, body) => j(path, { method: 'POST', body: JSON.stringify(body) });
const customer = { email: 'test@example.com', name: 'Test Person', line1: '1 Test Street', city: 'Chester', postcode: 'ch11aa', country: 'GB' };
const stock = async (vid) => (await j('/api/admin/products')).body.products.flatMap((p) => p.variants).find((v) => v.id === vid).stock;
const orderByRef = async (id) => (await j(`/api/admin/orders/${id}`)).body.order;
async function webhook(event, { secret = SECRET, t = Math.floor(Date.now() / 1000) } = {}) {
  const payload = JSON.stringify(event);
  const sig = createHmac('sha256', secret).update(`${t}.${payload}`).digest('hex');
  const r = await fetch(BASE + '/api/stripe-webhook', { method: 'POST', body: payload, headers: { 'stripe-signature': `t=${t},v1=${sig}` } });
  return r.status;
}
const paidEvent = (id, s, over = {}) => ({ id, type: 'checkout.session.completed', livemode: false, data: { object: { id: s.id, client_reference_id: s.client_reference_id, payment_status: 'paid', amount_total: s.amount_total, currency: 'gbp', payment_intent: 'pi_test_1', ...over } } });

const V = 'fresh-linen-snap-bar--1';

// Pricing and validation
let r = await post('/api/quote', { items: [{ variant_id: V, qty: 2, unit_pence: 1, price: 0.01 }] });
ok('quote ignores browser-supplied prices', r.body.subtotal_pence === 700 && r.body.delivery_pence === 395 && r.body.total_pence === 1095, JSON.stringify(r.body));
r = await post('/api/quote', { items: [{ variant_id: 'rainbow-gift-box--1', qty: 2 }] });
ok('free delivery applies over threshold', r.body.free_delivery && r.body.delivery_pence === 0 && r.body.total_pence === 3600);
r = await post('/api/checkout', { customer, items: [{ variant_id: 'clean-cotton-melts--1', qty: 1 }] });
ok('out-of-stock item cannot be bought', r.status === 409);
r = await post('/api/checkout', { customer, items: [{ variant_id: 'wax-melt-storage-tin--1', qty: 1 }] });
ok('item marked sold out cannot be bought', r.status === 409);
r = await post('/api/checkout', { customer, items: [{ variant_id: V, qty: 999 }] });
ok('quantity above stock is rejected', r.status === 409);
r = await post('/api/checkout', { customer, items: [{ variant_id: V, qty: -1 }] });
ok('negative quantity is rejected', r.status === 400);
r = await post('/api/checkout', { customer, items: [{ variant_id: 'made-up', qty: 1 }] });
ok('unknown product ID is rejected', r.status === 409);
r = await post('/api/checkout', { customer: { ...customer, email: 'nope', postcode: '12345' }, items: [{ variant_id: V, qty: 1 }] });
ok('bad email and postcode give field errors', r.status === 422 && r.body.fields.email && r.body.fields.postcode);
r = await post('/api/checkout', { customer: { ...customer, country: 'FR' }, items: [{ variant_id: V, qty: 1 }] });
ok('non-UK delivery is rejected', r.status === 422 && r.body.fields.country);
const pid = (await j('/api/admin/products')).body.products.find((p) => p.id === 'rose-garden-melts');
await j('/api/admin/products/rose-garden-melts', { method: 'PUT', body: JSON.stringify({ ...pid, hidden: true }) });
r = await post('/api/checkout', { customer, items: [{ variant_id: 'rose-garden-melts--1', qty: 1 }] });
ok('hidden product cannot be bought', r.status === 409);
ok('hidden product is not in the public catalogue', !(await j('/api/products')).body.products.some((p) => p.id === 'rose-garden-melts'));

// Checkout → Stripe session (mock) with a manipulated total
const before = await stock(V);
r = await post('/api/checkout', { customer, items: [{ variant_id: V, qty: 2, unit_pence: 1 }], total_pence: 1, delivery_pence: 0 });
const s = sessions.at(-1);
ok('checkout creates a Stripe session', r.status === 200 && r.body.mode === 'test' && !!s);
ok('Stripe is sent server prices, not browser prices', s.amount_total === 1095 && s.form['line_items[0][price_data][unit_amount]'] === '350', JSON.stringify(s.form));
ok('secret key is sent only server-side to Stripe', s.auth === 'Bearer sk_test_mock' && !JSON.stringify(r.body).includes('sk_test'));
const token = new URL(r.body.url).searchParams.get('token');
r = await j(`/api/order-status?token=${token}`);
ok('visiting the success URL alone does not mark the order paid', r.body.status === 'pending');
ok('order status exposes no address or full email', !JSON.stringify(r.body).includes('Test Street') && !JSON.stringify(r.body).includes('test@example.com'));
ok('stock is untouched before payment', (await stock(V)) === before);

// Webhooks
ok('unsigned/forged webhook is rejected', (await webhook(paidEvent('evt_forged', s), { secret: 'whsec_wrong' })) === 400);
ok('stale webhook timestamp is rejected', (await webhook(paidEvent('evt_old', s), { t: Math.floor(Date.now() / 1000) - 3600 })) === 400);
ok('forged webhook changed nothing', (await j(`/api/order-status?token=${token}`)).body.status === 'pending');
ok('verified webhook is accepted', (await webhook(paidEvent('evt_1', s))) === 200);
ok('order is now paid', (await j(`/api/order-status?token=${token}`)).body.status === 'paid');
ok('stock deducted once', (await stock(V)) === before - 2);
await Promise.all([webhook(paidEvent('evt_1', s)), webhook(paidEvent('evt_1', s)), webhook(paidEvent('evt_2', s)), webhook({ ...paidEvent('evt_3', s), type: 'checkout.session.async_payment_succeeded' })]);
ok('repeated and parallel webhooks do not deduct stock again', (await stock(V)) === before - 2, `stock=${await stock(V)}`);
// Contact form
ok('contact form rejects a bad email', (await post('/api/contact', { name: 'Jo Smith', email: 'nope', message: 'Hello there, is this in stock?' })).status === 422);
ok('contact form rejects a short message', (await post('/api/contact', { name: 'Jo Smith', email: 'jo@example.com', message: 'hi' })).status === 422);
ok('contact form swallows the honeypot', (await post('/api/contact', { name: 'Bot', email: 'b@b.com', message: 'cheap watches for sale here', website: 'http://spam' })).status === 200);
const sent = await post('/api/contact', { name: 'Jo Smith', email: 'jo@example.com', topic: 'Delivery', message: 'Do you post to the Isle of Man?' });
ok('contact form accepts a real message', sent.status === 200, sent.status === 503 ? 'email not configured: add the RESEND_* bindings above' : `status=${sent.status}`);

const paid = (await j('/api/admin/orders?view=paid')).body.orders.filter((o) => o.ref);
ok('exactly one paid order exists for the payment', paid.length === 1, `count=${paid.length}`);
const full = await orderByRef(paid[0].id);
ok('order stores items, totals, delivery details and payment status', full.items[0].qty === 2 && full.total_pence === 1095 && full.address.postcode === 'CH1 1AA' && full.status === 'paid' && full.payment_intent === 'pi_test_1');

// Amount mismatch, expiry, failure
r = await post('/api/checkout', { customer, items: [{ variant_id: V, qty: 1 }] }); let s2 = sessions.at(-1); let t2 = new URL(r.body.url).searchParams.get('token');
await webhook(paidEvent('evt_4', s2, { amount_total: 1 }));
ok('payment with the wrong amount is held for review, not marked paid', (await j(`/api/order-status?token=${t2}`)).body.status === 'review' && (await stock(V)) === before - 2);
r = await post('/api/checkout', { customer, items: [{ variant_id: V, qty: 1 }] }); s2 = sessions.at(-1); t2 = new URL(r.body.url).searchParams.get('token');
await webhook({ id: 'evt_5', type: 'checkout.session.expired', livemode: false, data: { object: { id: s2.id, client_reference_id: s2.client_reference_id } } });
ok('abandoned checkout becomes expired', (await j(`/api/order-status?token=${t2}`)).body.status === 'expired');
await webhook({ id: 'evt_6', type: 'checkout.session.completed', livemode: false, data: { object: { id: s2.id, client_reference_id: s2.client_reference_id, payment_status: 'unpaid' } } });
ok('completed-but-unpaid session is not marked paid', (await j(`/api/order-status?token=${t2}`)).body.status === 'expired');
ok('livemode event cannot pay a test order', (await webhook({ ...paidEvent('evt_7', s2), livemode: true })) === 200 && (await j(`/api/order-status?token=${t2}`)).body.status === 'expired');

// Admin
r = await j(`/api/admin/orders/${paid[0].id}`, { method: 'PUT', body: JSON.stringify({ fulfilment: 'dispatched', admin_note: 'Sent 1st class', status: 'pending' }) });
ok('admin can update fulfilment but not payment status', r.body.order.fulfilment === 'dispatched' && r.body.order.status === 'paid');
r = await j('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ delivery_pence: '450', free_delivery_threshold_pence: '' }) });
r = await post('/api/quote', { items: [{ variant_id: 'rainbow-gift-box--1', qty: 2 }] });
ok('delivery settings take effect', r.body.delivery_pence === 450 && !r.body.free_delivery);
await j('/api/admin/settings', { method: 'PUT', body: JSON.stringify({ delivery_pence: '395', free_delivery_threshold_pence: '3000' }) });
r = await fetch(BASE + '/api/admin/settings', { method: 'PUT', body: '{}', headers: { 'content-type': 'application/json' } });
ok('admin writes without the CSRF header are blocked', r.status === 403);
r = await fetch(BASE + '/api/admin/settings', { method: 'PUT', body: '{}', headers: { 'content-type': 'application/json', 'x-otr-admin': '1', origin: 'https://evil.example' } });
ok('cross-origin admin writes are blocked', r.status === 403);
await j('/api/admin/products/rose-garden-melts', { method: 'PUT', body: JSON.stringify({ ...pid, hidden: false }) });

r = await j(`/api/admin/orders/${paid[0].id}`, { method: 'DELETE' });
ok('admin can delete an order', r.status === 200 && (await j(`/api/admin/orders/${paid[0].id}`)).status === 404);

// CLP labels. The hazard wording is legally binding, so the point of these is
// that nothing on the way in rewrites it and nothing invalid gets stored.
r = await j('/api/admin/clp');
const clp = r.body;
ok('the 59 CLP labels are seeded', clp.labels.length === 59, `got ${clp.labels.length}`);
ok('CLP business details are seeded without a phone number', clp.business.name === 'Over The Rainbow Wax Melts' && clp.business.phone === '');
ok('most labels correctly carry no pictogram', clp.labels.filter((l) => !l.pictos.length).length === 36);
const cotton = clp.labels.find((l) => l.name === 'Clean Cotton');
ok('a sensitiser label keeps its wording', cotton && cotton.signal === 'Warning'
  && cotton.h.join() === 'H317,H411' && cotton.pictos.join() === 'GHS07,GHS09' && cotton.contains.length > 0, JSON.stringify(cotton));

r = await post('/api/admin/clp', { label: { id: 'test-label', name: 'Test', signal: 'Warning', pictos: ['GHS07'], h: ['H317'], p: ['P280'], hx: 'one\ntwo' } });
ok('a label can be saved and keeps its line breaks', r.status === 200 && r.body.label.hx === 'one\ntwo');
r = await post('/api/admin/clp', { label: { id: 'bad id!', name: 'X' } });
ok('a label with an invalid id is rejected', r.status === 422);
r = await post('/api/admin/clp', { label: { id: 'test-label', signal: 'SHOUT', pictos: ['GHS99', 'GHS05'], h: ['<script>', 'h412'] } });
ok('invented signal words and pictograms are dropped', r.body.label.signal === '' && r.body.label.pictos.join() === 'GHS05' && r.body.label.h.join() === 'H412', JSON.stringify(r.body.label));
r = await j('/api/admin/clp', { method: 'DELETE', body: JSON.stringify({ id: 'test-label' }) });
ok('a label can be deleted', r.status === 200 && (await j('/api/admin/clp')).body.labels.length === 59);
r = await fetch(BASE + '/api/admin/clp', { method: 'POST', body: '{}', headers: { 'content-type': 'application/json' } });
ok('CLP writes without the CSRF header are blocked', r.status === 403);

// Multi-buy deals: "any 2 for £5" across a group, odd one at full price, and
// the saving carried through checkout, Stripe and the webhook unchanged.
const prodById = async (id) => (await j('/api/admin/products')).body.products.find((p) => p.id === id);
const putProduct = async (id, over) => j(`/api/admin/products/${id}`, { method: 'PUT', body: JSON.stringify({ ...(await prodById(id)), ...over }) });
r = await putProduct('coconut-breeze-melts', { deal_group: 'melts', deal_qty: 2, deal_pence: 500 });
ok('a deal can be set on a product', r.status === 200 && r.body.product.deal?.label === 'Any 2 melts for £5', JSON.stringify(r.body));
r = await putProduct('rose-garden-melts', { deal_group: 'Melts', deal_qty: 2, deal_pence: 999 });
const coconut = await prodById('coconut-breeze-melts');
ok('saving one product in a group updates the whole group', r.body.product.deal.pence === 999 && coconut.deal.pence === 999, JSON.stringify(coconut.deal));
await putProduct('rose-garden-melts', { deal_group: 'melts', deal_qty: 2, deal_pence: 500 });
r = await putProduct('vanilla-cloud-snap-bar', { deal_qty: 1, deal_pence: 500 });
ok('a deal quantity under 2 is rejected', r.status === 422 && r.body.fields?.deal_qty);

r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 1 }] });
ok('one unit: no saving, but the basket is told what it would take', r.body.discount_pence === 0 && r.body.subtotal_pence === 400 && r.body.deals[0]?.need === 1, JSON.stringify(r.body.deals));
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 2 }] });
ok('two of the same: charged the deal price', r.body.items_pence === 800 && r.body.discount_pence === 300 && r.body.subtotal_pence === 500, JSON.stringify(r.body));
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 1 }, { variant_id: 'rose-garden-melts--1', qty: 1 }] });
ok('mix and match across the group', r.body.subtotal_pence === 500 && r.body.deals[0].bundles === 1 && r.body.deals[0].need === 0);
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 2 }, { variant_id: 'rose-garden-melts--1', qty: 1 }] });
ok('three: one deal plus one at full price', r.body.subtotal_pence === 900 && r.body.deals[0].need === 1);
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 1 }, { variant_id: 'fresh-linen-snap-bar--1', qty: 1 }] });
ok('a product outside the group does not count towards it', r.body.discount_pence === 0 && r.body.subtotal_pence === 750);
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 2 }, { variant_id: 'rainbow-gift-box--1', qty: 2 }] });
ok('free delivery is judged on the discounted subtotal', r.body.subtotal_pence === 4100 && r.body.free_delivery);
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 1 }, { variant_id: 'clean-cotton-melts--1', qty: 1 }] });
ok('a sold-out line never counts towards a deal', r.body.discount_pence === 0 && r.body.deals[0]?.need === 1);

const dealStock = await stock('coconut-breeze-melts--1');
r = await post('/api/checkout', { customer, items: [{ variant_id: 'coconut-breeze-melts--1', qty: 2 }, { variant_id: 'rose-garden-melts--1', qty: 1 }] });
const dealSession = sessions[sessions.length - 1];
ok('checkout stores the saving on the order and sends Stripe a coupon', r.status === 200 && dealSession.form['discounts[0][coupon]'] && dealSession.amount_total === 900 + 395, JSON.stringify({ status: r.status, amount: dealSession.amount_total }));
ok('Stripe line items stay at full price', dealSession.form['line_items[0][price_data][unit_amount]'] === '400');
ok('verified webhook pays a discounted order', await webhook(paidEvent('evt_deal_1', dealSession)) === 200);
const dealOrder = (await j('/api/admin/orders?view=paid')).body.orders.find((o) => o.id === dealSession.client_reference_id);
const dealFull = await orderByRef(dealOrder.id);
ok('the paid order records the deal, its total and the stock movement', dealFull.status === 'paid' && dealFull.total_pence === 1295 && dealFull.discount_pence === 300 && dealFull.deals[0].label === 'Any 2 melts for £5' && (await stock('coconut-breeze-melts--1')) === dealStock - 2, JSON.stringify({ status: dealFull.status, total: dealFull.total_pence, discount: dealFull.discount_pence }));
await j(`/api/admin/orders/${dealOrder.id}`, { method: 'DELETE' });
await putProduct('coconut-breeze-melts', { deal_group: '', deal_qty: 0, deal_pence: 0 });
await putProduct('rose-garden-melts', { deal_group: '', deal_qty: 0, deal_pence: 0 });
r = await post('/api/quote', { items: [{ variant_id: 'coconut-breeze-melts--1', qty: 2 }] });
ok('clearing the deal clears it', r.body.discount_pence === 0 && r.body.deals.length === 0);

// Deals on an option: Heart is a shape inside each scent, and "any 2 hearts
// for £5" has to work across scents while the Square option stays full price.
const mk = (label, price, deal = {}) => ({ label, price_pence: price, stock: 10, ...deal });
r = await putProduct('vanilla-cloud-snap-bar', { option_name: 'Shape', variants: [mk('Square', 350), mk('Heart', 300, { deal_group: 'hearts', deal_qty: 2, deal_pence: 500 }), mk('Rectangle', 350)] });
ok('shapes with a deal on one option can be saved', r.status === 200 && r.body.product.variants.length === 3 && r.body.product.variants[1].deal?.label === 'Any 2 hearts for £5' && !r.body.product.variants[0].deal, JSON.stringify(r.body.product.variants));
ok('the card line comes from the option deals', r.body.product.deal_labels.join() === 'Any 2 hearts for £5');
const vanilla = r.body.product.variants;
r = await putProduct('lavender-dreams-snap-bar', { option_name: 'Shape', variants: [mk('Square', 350), mk('Heart', 300, { deal_group: 'Hearts', deal_qty: 2, deal_pence: 450 })] });
const vanillaNow = await prodById('vanilla-cloud-snap-bar');
ok('saving a group on an option updates that group on other products\' options', r.body.product.variants[1].deal.pence === 450 && vanillaNow.variants[1].deal.pence === 450 && !vanillaNow.variants[0].deal);
await putProduct('lavender-dreams-snap-bar', { option_name: 'Shape', variants: [mk('Square', 350), mk('Heart', 300, { deal_group: 'hearts', deal_qty: 2, deal_pence: 500 })] });
const lav = (await prodById('lavender-dreams-snap-bar')).variants;
r = await post('/api/quote', { items: [{ variant_id: vanilla[1].id, qty: 1 }, { variant_id: lav[1].id, qty: 1 }] });
ok('a vanilla heart and a lavender heart make the deal', r.body.subtotal_pence === 500 && r.body.discount_pence === 100, JSON.stringify(r.body.deals));
r = await post('/api/quote', { items: [{ variant_id: vanilla[1].id, qty: 1 }, { variant_id: vanilla[0].id, qty: 1 }] });
ok('a heart and a square do not', r.body.discount_pence === 0 && r.body.subtotal_pence === 650);
r = await putProduct('vanilla-cloud-snap-bar', { option_name: 'Shape', variants: [mk('Square', 350), mk('Heart', 300, { deal_qty: 1, deal_pence: 500 })] });
ok('a bad option deal is rejected with the option named', r.status === 422 && /Heart/.test(r.body.fields?.variants || ''), JSON.stringify(r.body));
await putProduct('vanilla-cloud-snap-bar', { option_name: '', variants: [mk('Default', 350)] });
await putProduct('lavender-dreams-snap-bar', { option_name: '', variants: [mk('Default', 350)] });

// Shape on a snap bar: one of the known shapes, and only on snap bars.
r = await putProduct('fresh-linen-snap-bar', { shape: 'hearts' });
ok('a snap bar can be given a shape', r.status === 200 && r.body.product.shape === 'hearts');
r = await putProduct('fresh-linen-snap-bar', { shape: 'triangle' });
ok('an unknown shape is dropped', r.status === 200 && r.body.product.shape === '');
r = await putProduct('coconut-breeze-melts', { shape: 'hearts' });
ok('a shape on a non-snap-bar is dropped', r.status === 200 && r.body.product.shape === '');
r = await j('/api/config');
ok('the shop is told the shapes', r.body.shapes?.length === 4 && r.body.shape_category === 'snap-bars');
await putProduct('fresh-linen-snap-bar', { shape: '' });

// Sample packs: a list of label ids plus a panel size, saved as a whole.
const ids = clp.labels.slice(0, 3).map((l) => l.id);
r = await j('/api/admin/clp', { method: 'PUT', body: JSON.stringify({ packs: [{ id: 'pack-a', name: 'Trio', qty: '3 × 10 g', scents: [...ids, 'no such label', 'bad id!'], w: 70, h: 95, fs: 7 }] }) });
ok('a sample pack is saved with its fragrances in order', r.status === 200 && r.body.packs.length === 1 && r.body.packs[0].scents.join() === ids.join(), JSON.stringify(r.body.packs));
ok('an invalid fragrance id in a pack is dropped', r.body.packs[0].scents.length === 3);
r = await j('/api/admin/clp', { method: 'PUT', body: JSON.stringify({ packs: [{ id: 'pack-a', name: 'Huge', scents: ids, w: 9999, h: -5, fs: 40 }] }) });
ok('pack panel sizes are clamped to sane values', r.body.packs[0].w === 150 && r.body.packs[0].h === 30 && r.body.packs[0].fs === 10, JSON.stringify(r.body.packs[0]));
r = await j('/api/admin/clp', { method: 'PUT', body: JSON.stringify({ packs: [{ id: 'x', scents: [] }, { id: 'x', scents: [] }] }) });
ok('two packs with the same id are rejected', r.status === 422);
r = await j('/api/admin/clp', { method: 'PUT', body: JSON.stringify({ packs: [] }) });
ok('the pack list can be cleared', r.status === 200 && r.body.packs.length === 0 && r.body.labels.length === 59);

console.log(`\n${pass} passed, ${failN} failed`);
process.exit(failN ? 1 : 0);
