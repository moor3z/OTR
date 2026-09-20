import { getDb, loadProducts } from '../../../server/db.js';
import { handle, json, fail } from '../../../server/util.js';

export const onRequestGet = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const [product] = await loadProducts(db, { id: String(params.id).slice(0, 120) });
  if (!product) return fail(404, 'Product not found.');
  return json({ product }, 200, { 'cache-control': 'public, max-age=15' });
});
