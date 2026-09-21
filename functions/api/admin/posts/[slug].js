import { getDb } from '../../../../server/db.js';
import { parsePost } from '../../../../server/post-input.js';
import { handle, json, fail, readJson } from '../../../../server/util.js';

export const onRequestPut = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const p = parsePost(await readJson(request, 256 * 1024));
  const res = await db.prepare(`UPDATE posts SET title=?,excerpt=?,body=?,image_url=?,published=?,published_at=?,updated_at=? WHERE slug=?`)
    .bind(p.title, p.excerpt, p.body, p.image_url, p.published, p.published_at, new Date().toISOString(), String(params.slug)).run();
  return res.meta.changes ? json({ saved: true }) : fail(404, 'Post not found.');
});

export const onRequestDelete = handle(async ({ env, params }) => {
  const db = await getDb(env);
  await db.prepare(`DELETE FROM posts WHERE slug=?`).bind(String(params.slug)).run();
  return json({ deleted: true });
});
