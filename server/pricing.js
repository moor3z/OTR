// Server-side basket pricing. The browser only ever sends variant IDs and
// quantities; names, prices, availability and totals all come from the database.
import { httpError } from './util.js';

export const MAX_LINES = 40;
export const MAX_QTY = 20;

export async function priceBasket(db, settings, rawItems) {
  if (!Array.isArray(rawItems)) throw httpError(400, 'Basket must be a list of items.');
  if (rawItems.length > MAX_LINES) throw httpError(400, 'Too many different items in the basket.');

  // Merge duplicate lines, validate shapes
  const wanted = new Map();
  for (const it of rawItems) {
    const id = typeof it?.variant_id === 'string' ? it.variant_id.slice(0, 120) : '';
    const qty = Number(it?.qty);
    if (!id || !Number.isInteger(qty) || qty < 1) throw httpError(400, 'Invalid basket item.');
    wanted.set(id, (wanted.get(id) || 0) + qty);
  }

  const ids = [...wanted.keys()];
  let rows = [];
  if (ids.length) {
    const marks = ids.map(() => '?').join(',');
    const res = await db.prepare(
      `SELECT v.id AS variant_id, v.label, v.price_pence, v.stock,
              p.id AS product_id, p.name, p.image_url, p.hidden, p.sold_out,
              (SELECT COUNT(*) FROM variants x WHERE x.product_id = p.id) AS variant_count
         FROM variants v JOIN products p ON p.id = v.product_id
        WHERE v.id IN (${marks})`).bind(...ids).all();
    rows = res.results;
  }
  const found = new Map(rows.map((r) => [r.variant_id, r]));

  const lines = [];
  let subtotal = 0;
  for (const [id, qty] of wanted) {
    const r = found.get(id);
    if (!r || r.hidden) {
      lines.push({ variant_id: id, qty, ok: false, problem: 'gone', message: 'This item is no longer available.' });
      continue;
    }
    const line = {
      variant_id: id, product_id: r.product_id, name: r.name,
      label: r.variant_count > 1 ? r.label : '',
      image_url: r.image_url, unit_pence: r.price_pence, qty, ok: true,
    };
    if (r.sold_out || r.stock <= 0) {
      Object.assign(line, { ok: false, problem: 'sold_out', message: 'Sold out.' });
    } else if (qty > Math.min(r.stock, MAX_QTY)) {
      const max = Math.min(r.stock, MAX_QTY);
      Object.assign(line, { ok: false, problem: 'too_many', max, message: `Only ${max} available.` });
    }
    line.line_pence = line.unit_pence * qty;
    if (line.ok) subtotal += line.line_pence;
    lines.push(line);
  }

  const threshold = parseInt(settings.free_delivery_threshold_pence, 10) || 0;
  const rate = Math.max(0, parseInt(settings.delivery_pence, 10) || 0);
  const free = threshold > 0 && subtotal >= threshold;
  const delivery = subtotal === 0 ? 0 : free ? 0 : rate;

  return {
    lines, ok: lines.length > 0 && lines.every((l) => l.ok),
    subtotal_pence: subtotal, delivery_pence: delivery, total_pence: subtotal + delivery,
    delivery_name: settings.delivery_name, free_delivery: free,
    free_delivery_threshold_pence: threshold,
    to_free_delivery_pence: threshold > 0 && !free ? threshold - subtotal : 0,
  };
}
