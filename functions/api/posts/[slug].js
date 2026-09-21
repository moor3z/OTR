import { getDb } from '../../../server/db.js';
import { handle, json, fail } from '../../../server/util.js';

export const onRequestGet = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const post = await db.prepare(`SELECT slug,title,excerpt,body,image_url,published_at FROM posts WHERE slug=? AND published=1`)
    .bind(String(params.slug).slice(0, 120)).first();
  return post ? json({ post }, 200, { 'cache-control': 'public, max-age=30' }) : fail(404, 'Post not found.');
});
