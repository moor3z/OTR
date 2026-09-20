import { getDb, getSettings } from '../../server/db.js';
import { handle, json, fail } from '../../server/util.js';

// Lets the success / cancelled / demo pages show the real state of an order.
// Looked up by an unguessable per-order token. Returns no address or full email.
export const onRequestGet = handle(async ({ env, request }) => {
  const token = new URL(request.url).searchParams.get('token') || '';
  if (!/^[a-f0-9]{48}$/.test(token)) return fail(400, 'Missing or invalid order link.');
  const db = await getDb(env);
  const o = await db.prepare(`SELECT ref,mode,status,email,items,subtotal_pence,delivery_pence,total_pence FROM orders WHERE token=?`).bind(token).first();
  if (!o) return fail(404, 'Order not found.');
  const [user, domain] = o.email.split('@');
  const s = await getSettings(db);
  return json({
    ref: o.ref, mode: o.mode, status: o.status,
    email_hint: `${user.slice(0, 2)}…@${domain}`,
    items: JSON.parse(o.items).map(({ name, label, qty, line_pence }) => ({ name, label, qty, line_pence })),
    subtotal_pence: o.subtotal_pence, delivery_pence: o.delivery_pence, total_pence: o.total_pence,
    dispatch_estimate: s.dispatch_estimate,
  });
});
