import { CATEGORIES, SCENTS } from './db.js';
import { clean, httpError, randomId } from './util.js';

export const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

export const okImage = (u) => u === '' || /^\/(img|assets)\/[\w\-./]+$/.test(u) || /^https:\/\/[^\s"'<>]+$/.test(u);

export function parseProduct(body, productId) {
  const fields = {};
  const p = {
    name: clean(body.name, 120), category: clean(body.category, 40),
    scents: (Array.isArray(body.scents) ? body.scents : []).filter((s) => SCENTS.includes(s)),
    short_desc: clean(body.short_desc, 200),
    description: String(body.description ?? '').trim().slice(0, 4000),
    weight: clean(body.weight, 200),
    usage: String(body.usage ?? '').trim().slice(0, 4000),
    safety: String(body.safety ?? '').trim().slice(0, 4000),
    image_url: clean(body.image_url, 500), option_name: clean(body.option_name, 40),
    hidden: body.hidden ? 1 : 0, sold_out: body.sold_out ? 1 : 0, featured: body.featured ? 1 : 0,
    sort: Number.isInteger(body.sort) ? body.sort : 0,
    // Multi-buy: "any 2 hearts for £5". Group is a plain word like "hearts";
    // blank means the deal is for this product alone. Both numbers or neither.
    deal_group: clean(body.deal_group, 40).replace(/\s+/g, ' '),
    deal_qty: Number(body.deal_qty) || 0,
    deal_pence: Number(body.deal_pence) || 0,
  };
  if (p.deal_qty || p.deal_pence) {
    if (!Number.isInteger(p.deal_qty) || p.deal_qty < 2 || p.deal_qty > 20) fields.deal_qty = 'The deal quantity must be a whole number from 2 to 20 (e.g. 2 for "2 for £5").';
    if (!Number.isInteger(p.deal_pence) || p.deal_pence < 30 || p.deal_pence > 100000) fields.deal_pence = 'Enter the deal price in pounds, between £0.30 and £1,000.';
  } else {
    p.deal_group = '';
  }
  if (p.name.length < 2) fields.name = 'Enter a product name.';
  if (!CATEGORIES.some((c) => c.id === p.category)) fields.category = 'Choose a category.';
  if (!okImage(p.image_url)) fields.image_url = 'Image must be an uploaded image or an https:// address.';

  const raw = Array.isArray(body.variants) ? body.variants.slice(0, 20) : [];
  if (!raw.length) fields.variants = 'Add at least one price.';
  const variants = raw.map((v, i) => {
    const price = Number(v.price_pence), stock = Number(v.stock);
    if (!Number.isInteger(price) || price < 30 || price > 100000) fields.variants = 'Each price must be between £0.30 and £1,000.';
    if (!Number.isInteger(stock) || stock < 0 || stock > 100000) fields.variants = 'Stock must be a whole number, 0 or more.';
    const label = clean(v.label, 60) || (raw.length > 1 ? `Option ${i + 1}` : 'Default');
    const keep = typeof v.id === 'string' && productId && v.id.startsWith(productId + '--');
    return { id: keep ? v.id.slice(0, 120) : null, label, price_pence: price, stock, sort: i };
  });
  if (raw.length > 1 && !p.option_name) p.option_name = 'Option';
  if (Object.keys(fields).length) throw httpError(422, 'Please check the highlighted fields.', { fields });
  return { p, variants, newVariantId: (pid) => `${pid}--${randomId(4)}` };
}

// A deal group is one deal: "any 2 hearts for £5" has to mean the same on
// every heart. Saving a product with a group therefore sets the same quantity
// and price on every other product in that group, so Michelle changes the
// deal once rather than on each product in turn.
export function spreadDeal(db, p, id) {
  if (!p.deal_group || !p.deal_qty) return [];
  return [db.prepare(`UPDATE products SET deal_qty=?, deal_pence=? WHERE lower(deal_group)=lower(?) AND id<>?`)
    .bind(p.deal_qty, p.deal_pence, p.deal_group, id)];
}
