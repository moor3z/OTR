// Server-side basket pricing. The browser only ever sends variant IDs and
// quantities; names, prices, availability and totals all come from the database.
import { httpError } from './util.js';
import { dealFor, SHAPES } from './db.js';

export const MAX_LINES = 40;
export const MAX_QTY = 20;

export async function priceBasket(db, settings, rawItems) {
  if (!Array.isArray(rawItems)) throw httpError(400, 'Basket must be a list of items.');
  if (rawItems.length > MAX_LINES) throw httpError(400, 'Too many different items in the basket.');

  // Merge duplicate lines, validate shapes. A line is a variant plus the shape
  // the customer picked (snap bars only), so two shapes of one scent are two
  // lines that share the scent's stock.
  const wanted = new Map();
  for (const it of rawItems) {
    const id = typeof it?.variant_id === 'string' ? it.variant_id.slice(0, 120) : '';
    const qty = Number(it?.qty);
    const shape = typeof it?.shape === 'string' ? it.shape.slice(0, 40) : '';
    if (!id || !Number.isInteger(qty) || qty < 1) throw httpError(400, 'Invalid basket item.');
    const k = `${id}\u0000${shape}`;
    wanted.set(k, { id, shape, qty: (wanted.get(k)?.qty || 0) + qty });
  }
  const perVariant = new Map();
  for (const w of wanted.values()) perVariant.set(w.id, (perVariant.get(w.id) || 0) + w.qty);

  const ids = [...perVariant.keys()];
  let rows = [];
  if (ids.length) {
    const marks = ids.map(() => '?').join(',');
    const res = await db.prepare(
      `SELECT v.id AS variant_id, v.label, v.price_pence, v.stock,
              v.deal_group AS v_deal_group, v.deal_qty AS v_deal_qty, v.deal_pence AS v_deal_pence,
              p.id AS product_id, p.name, p.image_url, p.hidden, p.sold_out,
              p.deal_group, p.deal_qty, p.deal_pence, p.shape AS shapes,
              (SELECT COUNT(*) FROM variants x WHERE x.product_id = p.id) AS variant_count
         FROM variants v JOIN products p ON p.id = v.product_id
        WHERE v.id IN (${marks})`).bind(...ids).all();
    rows = res.results;
  }
  const found = new Map(rows.map((r) => [r.variant_id, r]));

  const lines = [];
  let subtotal = 0;
  for (const { id, shape, qty } of wanted.values()) {
    const r = found.get(id);
    if (!r || r.hidden) {
      lines.push({ variant_id: id, shape, qty, ok: false, problem: 'gone', message: 'This item is no longer available.' });
      continue;
    }
    const shapeName = shape ? (SHAPES.find((s) => s.id === shape) || {}).name : '';
    const shapeOk = !shape || ((r.shapes || '').split(',').includes(shape) && shapeName);
    const deal = dealFor({ id: r.variant_id, deal_group: r.v_deal_group, deal_qty: r.v_deal_qty, deal_pence: r.v_deal_pence },
                         { id: r.product_id, deal_group: r.deal_group, deal_qty: r.deal_qty, deal_pence: r.deal_pence });
    const line = {
      variant_id: id, product_id: r.product_id, name: r.name,
      label: [r.variant_count > 1 ? r.label : '', shapeName].filter(Boolean).join(' · '),
      shape, shape_name: shapeName || '',
      image_url: r.image_url, unit_pence: r.price_pence, qty, ok: true,
      deal_key: deal ? deal.key : '', deal_label: deal ? deal.label : '',
    };
    if (deal) line._deal = deal;
    const total = perVariant.get(id); // all shapes of this scent draw on the same stock
    if (!shapeOk) {
      Object.assign(line, { ok: false, problem: 'gone', message: 'That shape is no longer available for this scent.' });
    } else if (r.sold_out || r.stock <= 0) {
      Object.assign(line, { ok: false, problem: 'sold_out', message: 'Sold out.' });
    } else if (qty > MAX_QTY || total > r.stock) {
      const max = Math.max(0, Math.min(r.stock - (total - qty), MAX_QTY));
      Object.assign(line, { ok: false, problem: 'too_many', max, message: total > r.stock && total !== qty ? `Only ${r.stock} of this scent available across all shapes.` : `Only ${max} available.` });
    }
    line.line_pence = line.unit_pence * qty;
    if (line.ok) subtotal += line.line_pence;
    lines.push(line);
  }

  const { deals, discount } = applyDeals(lines);
  const itemsTotal = subtotal;
  subtotal -= discount;

  const threshold = parseInt(settings.free_delivery_threshold_pence, 10) || 0;
  const rate = Math.max(0, parseInt(settings.delivery_pence, 10) || 0);
  const free = threshold > 0 && subtotal >= threshold;
  const delivery = subtotal === 0 ? 0 : free ? 0 : rate;

  return {
    lines, ok: lines.length > 0 && lines.every((l) => l.ok),
    items_pence: itemsTotal, discount_pence: discount, deals,
    subtotal_pence: subtotal, delivery_pence: delivery, total_pence: subtotal + delivery,
    delivery_name: settings.delivery_name, free_delivery: free,
    free_delivery_threshold_pence: threshold,
    to_free_delivery_pence: threshold > 0 && !free ? threshold - subtotal : 0,
  };
}

// Multi-buy deals ("any 2 hearts for £5"). Lines are priced in full above;
// this works out the saving per deal group and never touches a line that has
// a problem. Where a group mixes prices, the dearest units go into the deal
// and the cheapest are the odd ones out, which is the customer-favourable
// reading of "any N for £X". A deal that would cost more than full price is
// simply not applied.
export function applyDeals(lines) {
  const groups = new Map();
  for (const l of lines) {
    if (!l.ok || !l._deal) continue;
    const g = groups.get(l._deal.key) || { deal: l._deal, units: [] };
    for (let i = 0; i < l.qty; i++) g.units.push(l.unit_pence);
    groups.set(l._deal.key, g);
  }
  const deals = [];
  let discount = 0;
  for (const g of groups.values()) {
    const { qty, pence, label, key, group } = g.deal;
    const units = g.units.sort((a, b) => b - a);
    const bundles = Math.floor(units.length / qty);
    const inDeal = units.slice(0, bundles * qty).reduce((n, u) => n + u, 0);
    const saving = Math.max(0, inDeal - bundles * pence);
    const need = units.length % qty ? qty - (units.length % qty) : 0;
    deals.push({ key, group, label, qty, pence, units: units.length, bundles, saving_pence: saving, need });
    discount += saving;
  }
  for (const l of lines) delete l._deal;
  return { deals, discount };
}
