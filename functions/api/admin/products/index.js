import { getDb, loadProducts } from '../../../../server/db.js';
import { parseProduct, slugify } from '../../../../server/product-input.js';
import { handle, json, readJson, randomId } from '../../../../server/util.js';

export const onRequestGet = handle(async ({ env }) => {
  const db = await getDb(env);
  return json({ products: await loadProducts(db, { includeHidden: true }) });
});

export const onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const { p, variants, newVariantId } = parseProduct(await readJson(request), null);
  let id = slugify(p.name) || 'product';
  if (await db.prepare(`SELECT 1 FROM products WHERE id=?`).bind(id).first()) id += '-' + randomId(2);
  const stmts = [db.prepare(
    `INSERT INTO products(id,name,category,scents,short_desc,description,weight,usage,safety,image_url,option_name,hidden,sold_out,featured,is_sample,sort,created_at)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?)`)
    .bind(id, p.name, p.category, p.scents.join(','), p.short_desc, p.description, p.weight, p.usage, p.safety,
      p.image_url, p.option_name, p.hidden, p.sold_out, p.featured, p.sort, new Date().toISOString())];
  for (const v of variants)
    stmts.push(db.prepare(`INSERT INTO variants(id,product_id,label,price_pence,stock,sort) VALUES(?,?,?,?,?,?)`)
      .bind(newVariantId(id), id, v.label, v.price_pence, v.stock, v.sort));
  await db.batch(stmts);
  const [product] = await loadProducts(db, { includeHidden: true, id });
  return json({ product }, 201);
});
