import { getDb } from '../../../server/db.js';
import { handle, json, fail, randomId } from '../../../server/util.js';

const TYPES = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };
const MAX = 900 * 1024; // the admin page resizes to ~1200px WebP first, typically 60–200 KB

export const onRequestPost = handle(async ({ env, request }) => {
  const mime = (request.headers.get('content-type') || '').split(';')[0];
  if (!TYPES[mime]) return fail(415, 'Upload a JPG, PNG or WebP image.');
  const buf = await request.arrayBuffer();
  if (!buf.byteLength) return fail(400, 'Empty upload.');
  if (buf.byteLength > MAX) return fail(413, 'Image is too large after resizing. Try a smaller photo.');
  const db = await getDb(env);
  const id = randomId(10);
  await db.prepare(`INSERT INTO images(id,mime,data,created_at) VALUES(?,?,?,?)`).bind(id, mime, buf, new Date().toISOString()).run();
  return json({ url: `/img/${id}.${TYPES[mime]}` }, 201);
});
