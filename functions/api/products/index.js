import { getDb, loadProducts } from '../../../server/db.js';
import { handle, json } from '../../../server/util.js';

export const onRequestGet = handle(async ({ env }) => {
  const db = await getDb(env);
  return json({ products: await loadProducts(db) }, 200, { 'cache-control': 'public, max-age=15' });
});
