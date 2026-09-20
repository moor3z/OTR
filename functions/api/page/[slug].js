import { getDb } from '../../../server/db.js';
import { handle, json, fail } from '../../../server/util.js';

export const onRequestGet = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const page = await db.prepare(`SELECT slug,title,body,needs_review FROM pages WHERE slug=?`).bind(String(params.slug)).first();
  if (!page) return fail(404, 'Page not found.');
  return json({ page: { ...page, needs_review: !!page.needs_review } }, 200, { 'cache-control': 'public, max-age=30' });
});
