import { getDb } from '../../../../server/db.js';
import { parsePost, slugify } from '../../../../server/post-input.js';
import { handle, json, readJson, randomId } from '../../../../server/util.js';

export const onRequestGet = handle(async ({ env }) => {
  const db = await getDb(env);
  const { results } = await db.prepare(`SELECT * FROM posts ORDER BY published_at DESC`).all();
  return json({ posts: results.map((p) => ({ ...p, published: !!p.published })) });
});

export const onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const p = parsePost(await readJson(request, 256 * 1024));
  let slug = slugify(p.title) || 'post';
  if (await db.prepare(`SELECT 1 FROM posts WHERE slug=?`).bind(slug).first()) slug += '-' + randomId(2);
  await db.prepare(`INSERT INTO posts(slug,title,excerpt,body,image_url,published,published_at,updated_at) VALUES(?,?,?,?,?,?,?,?)`)
    .bind(slug, p.title, p.excerpt, p.body, p.image_url, p.published, p.published_at, new Date().toISOString()).run();
  return json({ slug }, 201);
});
