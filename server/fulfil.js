// How an order reaches the customer: posted (the default), delivered locally by
// hand within a set number of miles of the shop, or collected from the shop.
// Everything here is driven by settings (Admin → Delivery & settings) so the
// times, charge, radius and address can change without a code change.
import { httpError } from './util.js';

export const METHODS = ['post', 'local', 'collect'];

// Split a "times" setting (one slot per line) into clean labels.
export const slotList = (text) => String(text || '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(0, 20);

const on = (v) => v === '1' || v === 'true' || v === 'on';

// What the shop offers right now, as the basket and checkout pages need it.
export function fulfilmentOptions(settings) {
  const opts = [{
    id: 'post', name: settings.delivery_name || 'UK delivery',
    pence: Math.max(0, parseInt(settings.delivery_pence, 10) || 0),
    free_over_pence: parseInt(settings.free_delivery_threshold_pence, 10) || 0,
    slots: [],
  }];
  if (on(settings.local_enabled)) {
    opts.push({
      id: 'local', name: 'Local delivery',
      pence: Math.max(0, parseInt(settings.local_pence, 10) || 0),
      radius_miles: Math.max(0, Number(settings.local_radius_miles) || 0),
      from: settings.local_area || '',
      slots: slotList(settings.local_times), note: settings.local_note || '',
    });
  }
  if (on(settings.collection_enabled)) {
    opts.push({
      id: 'collect', name: 'Collection', pence: 0,
      address: settings.collection_address || '',
      slots: slotList(settings.collection_times), note: settings.collection_note || '',
    });
  }
  return opts;
}

export const pickMethod = (settings, id) => fulfilmentOptions(settings).find((o) => o.id === id) || null;

// ── Distance check ──────────────────────────────────────────────────────────
// Uses postcodes.io (free, no key) to turn two postcodes into coordinates, then
// measures the straight-line distance. POSTCODES_API_BASE exists only so tests
// can point it at a stand-in.
const API = 'https://api.postcodes.io';
const toRad = (d) => (d * Math.PI) / 180;
export function milesBetween(a, b) {
  const R = 3958.8, dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export async function lookupPostcodes(env, postcodes) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 6000);
  try {
    const res = await fetch(`${env.POSTCODES_API_BASE || API}/postcodes`, {
      method: 'POST', signal: ctl.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ postcodes }),
    });
    if (!res.ok) throw new Error(`postcodes.io ${res.status}`);
    const data = await res.json();
    const out = {};
    for (const r of data.result || []) {
      if (r.result) out[r.query.replace(/\s+/g, '').toUpperCase()] = { lat: r.result.latitude, lon: r.result.longitude };
    }
    return out;
  } finally { clearTimeout(timer); }
}

// Returns the distance in miles, or throws a 422 the checkout can show against
// the postcode field. If the lookup service cannot be reached we refuse local
// delivery rather than guess, and tell the customer to pick post or try again.
export async function localDeliveryDistance(env, settings, customerPostcode) {
  const from = String(settings.local_postcode || '').replace(/\s+/g, '').toUpperCase();
  const to = String(customerPostcode || '').replace(/\s+/g, '').toUpperCase();
  if (!from) throw httpError(422, 'Local delivery is not set up yet. Please choose post instead.', { fields: { method: 'Local delivery is not available right now.' } });
  let found;
  try { found = await lookupPostcodes(env, [from, to]); }
  catch (e) {
    console.error('Postcode lookup failed', e.message);
    throw httpError(422, 'We could not check your postcode for local delivery just now. Please try again in a moment, or choose post.', { fields: { method: 'Could not check the distance right now.' } });
  }
  if (!found[from]) throw httpError(422, 'Local delivery is not set up correctly (the shop postcode was not recognised). Please choose post.', { fields: { method: 'Local delivery is not available right now.' } });
  if (!found[to]) throw httpError(422, 'We do not recognise that postcode. Please check it, or choose post.', { fields: { postcode: 'We do not recognise this postcode.' } });
  return milesBetween(found[from], found[to]);
}
