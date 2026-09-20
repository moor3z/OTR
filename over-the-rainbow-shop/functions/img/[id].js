import { getDb } from '../../server/db.js';

// Serves product images uploaded through the admin area.
export async function onRequestGet({ env, params }) {
  try {
    const db = await getDb(env);
    const row = await db.prepare(`SELECT mime,data FROM images WHERE id=?`).bind(String(params.id).replace(/\.\w+$/, '')).first();
    if (!row) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(row.data), {
      headers: { 'content-type': row.mime, 'cache-control': 'public, max-age=31536000, immutable', 'x-content-type-options': 'nosniff' },
    });
  } catch { return new Response('Unavailable', { status: 503 }); }
}
