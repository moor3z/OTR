import { getDb } from '../../../../server/db.js';
import { handle, json, fail, readJson } from '../../../../server/util.js';

const FULFILMENT = ['unfulfilled', 'packed', 'dispatched', 'delivered', 'cancelled'];
const shape = (o) => ({ ...o, token: undefined, items: JSON.parse(o.items), address: JSON.parse(o.address) });

export const onRequestGet = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const o = await db.prepare(`SELECT * FROM orders WHERE id=?`).bind(String(params.id)).first();
  return o ? json({ order: shape(o) }) : fail(404, 'Order not found.');
});

// Only fulfilment status and the private note can be changed here.
// Payment status is set by verified Stripe webhooks and nothing else.
export const onRequestPut = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  if (!FULFILMENT.includes(body.fulfilment)) return fail(422, 'Choose a fulfilment status.');
  const note = String(body.admin_note ?? '').slice(0, 2000);
  const res = await db.prepare(`UPDATE orders SET fulfilment=?, admin_note=? WHERE id=?`).bind(body.fulfilment, note, String(params.id)).run();
  if (!res.meta.changes) return fail(404, 'Order not found.');
  const o = await db.prepare(`SELECT * FROM orders WHERE id=?`).bind(String(params.id)).first();
  return json({ order: shape(o) });
});

export const onRequestDelete = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const res = await db.prepare(`DELETE FROM orders WHERE id=?`).bind(String(params.id)).run();
  return res.meta.changes ? json({ deleted: true }) : fail(404, 'Order not found.');
});
