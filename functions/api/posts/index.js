import { getDb } from '../../../server/db.js';
import { handle, json } from '../../../server/util.js';

export const onRequestGet = handle(async ({ env }) => {
  const db = await getDb(env);
  const { results } = await db.prepare(
    `SELECT slug,title,excerpt,image_url,published_at FROM posts WHERE published=1 ORDER BY published_at DESC LIMIT 50`).all();
  return json({ posts: results }, 200, { 'cache-control': 'public, max-age=30' });
});
