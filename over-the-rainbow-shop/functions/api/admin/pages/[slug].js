import { getDb } from '../../../../server/db.js';
import { handle, json, fail, readJson, clean } from '../../../../server/util.js';
export const onRequestPut = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const body = await readJson(request, 256 * 1024);
  const title = clean(body.title, 120);
  if (!title) return fail(422, 'Enter a page title.', { fields: { title: 'Enter a page title.' } });
  const res = await db.prepare(`UPDATE pages SET title=?, body=?, needs_review=?, updated_at=? WHERE slug=?`)
    .bind(title, String(body.body ?? '').slice(0, 60000), body.needs_review ? 1 : 0, new Date().toISOString(), String(params.slug)).run();
  return res.meta.changes ? json({ saved: true }) : fail(404, 'Page not found.');
});
