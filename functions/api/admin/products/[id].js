import { getDb, loadProducts } from '../../../../server/db.js';
import { parseProduct, spreadDeal } from '../../../../server/product-input.js';
import { handle, json, fail, readJson } from '../../../../server/util.js';

export const onRequestPut = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const id = String(params.id);
  if (!(await db.prepare(`SELECT 1 FROM products WHERE id=?`).bind(id).first())) return fail(404, 'Product not found.');
  const { p, variants, newVariantId } = parseProduct(await readJson(request), id);

  const keepIds = variants.filter((v) => v.id).map((v) => v.id);
  const stmts = [db.prepare(
    `UPDATE products SET name=?,category=?,scents=?,short_desc=?,description=?,weight=?,usage=?,safety=?,image_url=?,option_name=?,hidden=?,sold_out=?,featured=?,sort=?,is_sample=0,deal_group=?,deal_qty=?,deal_pence=?,shape=? WHERE id=?`)
    .bind(p.name, p.category, p.scents.join(','), p.short_desc, p.description, p.weight, p.usage, p.safety,
      p.image_url, p.option_name, p.hidden, p.sold_out, p.featured, p.sort, p.deal_group, p.deal_qty, p.deal_pence, p.shape, id)];
  stmts.push(...spreadDeal(db, p, id, variants));
  stmts.push(keepIds.length
    ? db.prepare(`DELETE FROM variants WHERE product_id=? AND id NOT IN (${keepIds.map(() => '?').join(',')})`).bind(id, ...keepIds)
    : db.prepare(`DELETE FROM variants WHERE product_id=?`).bind(id));
  for (const v of variants) {
    stmts.push(v.id
      ? db.prepare(`UPDATE variants SET label=?,price_pence=?,stock=?,sort=?,deal_group=?,deal_qty=?,deal_pence=?,shape=? WHERE id=? AND product_id=?`).bind(v.label, v.price_pence, v.stock, v.sort, v.deal_group, v.deal_qty, v.deal_pence, v.shape || '', v.id, id)
      : db.prepare(`INSERT INTO variants(id,product_id,label,price_pence,stock,sort,deal_group,deal_qty,deal_pence,shape) VALUES(?,?,?,?,?,?,?,?,?,?)`).bind(newVariantId(id), id, v.label, v.price_pence, v.stock, v.sort, v.deal_group, v.deal_qty, v.deal_pence, v.shape || ''));
  }
  await db.batch(stmts);
  const [product] = await loadProducts(db, { includeHidden: true, id });
  return json({ product });
});

export const onRequestDelete = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const id = String(params.id);
  await db.batch([
    db.prepare(`DELETE FROM variants WHERE product_id=?`).bind(id),
    db.prepare(`DELETE FROM products WHERE id=?`).bind(id),
  ]);
  return json({ deleted: true });
});
