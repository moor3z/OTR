// End-to-end API tests. Run against `wrangler pages dev` started with:
//   -b STRIPE_SECRET_KEY=sk_test_mock -b STRIPE_WEBHOOK_SECRET=whsec_mock -b STRIPE_API_BASE=http://localhost:8799 -b ADMIN_DEV_BYPASS=true
import { createHmac } from 'node:crypto';
import './mock-stripe.mjs';
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
console.log(`\n${pass} passed, ${failN} failed`);
process.exit(failN ? 1 : 0);
