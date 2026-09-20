import { getDb } from '../../../server/db.js';
import { handle, json } from '../../../server/util.js';

// Removes every product still flagged as sample data. Editing a product clears its flag.
export const onRequestDelete = handle(async ({ env }) => {
  const db = await getDb(env);
  const res = await db.batch([
    db.prepare(`DELETE FROM variants WHERE product_id IN (SELECT id FROM products WHERE is_sample=1)`),
    db.prepare(`DELETE FROM products WHERE is_sample=1`),
  ]);
  return json({ deleted: res[1].meta.changes });
});
