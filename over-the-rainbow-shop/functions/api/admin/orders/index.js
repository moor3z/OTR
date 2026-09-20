import { getDb } from '../../../../server/db.js';
import { handle, json } from '../../../../server/util.js';

export const onRequestGet = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const view = new URL(request.url).searchParams.get('view') || 'paid';
  const where = view === 'all' ? '' : view === 'other' ? `WHERE status != 'paid'` : `WHERE status = 'paid'`;
  const { results } = await db.prepare(
    `SELECT id,ref,mode,status,fulfilment,email,name,total_pence,created_at,paid_at,items FROM orders ${where} ORDER BY created_at DESC LIMIT 200`).all();
  return json({ orders: results.map((o) => ({ ...o, items: undefined, item_count: JSON.parse(o.items).reduce((n, i) => n + i.qty, 0) })) });
});
