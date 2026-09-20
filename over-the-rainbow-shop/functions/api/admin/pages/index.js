import { getDb } from '../../../../server/db.js';
import { handle, json } from '../../../../server/util.js';
export const onRequestGet = handle(async ({ env }) => {
  const db = await getDb(env);
  const { results } = await db.prepare(`SELECT slug,title,body,needs_review,updated_at FROM pages ORDER BY slug`).all();
  return json({ pages: results.map((p) => ({ ...p, needs_review: !!p.needs_review })) });
});
