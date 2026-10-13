// CLP labels for the wax melts. Admin only (see _middleware.js).
//
//   GET                      -> { business, labels }
//   POST   { label }         -> add or replace one label
//   DELETE { id }            -> remove one label
//   PUT    { business?, labels? } -> save the business block, and/or replace the
//                               whole list (used by the import box on the page)
//
// The hazard wording is legally binding, so nothing here rewrites it: fields are
// length-capped and checked for shape, then stored exactly as sent.
import { getDb } from '../../../server/db.js';
import { handle, json, fail, readJson, httpError } from '../../../server/util.js';

const PICTOS = ['GHS02', 'GHS05', 'GHS07', 'GHS08', 'GHS09'];
const SIGNALS = ['', 'Warning', 'Danger'];
const MAX_LABELS = 400;

// One-line text: drop control characters, keep everything else as written.
const line = (v, max = 300) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
// Multi-line text: newlines are meaningful (addresses, extra hazard wording).
const block = (v, max = 2000) =>
  String(v ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);

const codes = (v, max = 40) => (Array.isArray(v) ? v : [])
  .map((c) => line(c, 24).toUpperCase())
  .filter((c) => /^[A-Z]{1,4}[0-9][0-9+A-Z]{0,20}$/.test(c))
  .slice(0, max);

function shapeLabel(raw) {
  if (!raw || typeof raw !== 'object') throw httpError(422, 'No label was sent.');
  const id = line(raw.id, 40);
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(id)) throw httpError(422, 'That label has a missing or invalid id.');
  const signal = SIGNALS.includes(raw.signal) ? raw.signal : '';
  return {
    id,
    name: line(raw.name, 120),
    signal,
    pictos: (Array.isArray(raw.pictos) ? raw.pictos : []).filter((p) => PICTOS.includes(p)).slice(0, 5),
    h: codes(raw.h),
    hx: block(raw.hx),
    p: codes(raw.p),
    px: block(raw.px),
    allergens: block(raw.allergens, 1000),
    contains: line(raw.contains, 300),
    qty: line(raw.qty, 80),
    batch: line(raw.batch, 60),
    extra: block(raw.extra, 600),
    source: line(raw.source, 200),
  };
}

const shapeBusiness = (raw = {}) => ({
  name: line(raw.name, 120),
  addr: block(raw.addr, 400),
  phone: line(raw.phone, 40),
  email: line(raw.email, 120),
});

const DEFAULT_BUSINESS = { name: '', addr: '', phone: '', email: '' };

async function readAll(db) {
  const [labels, settings] = await db.batch([
    db.prepare(`SELECT data FROM clp_labels ORDER BY id`),
    db.prepare(`SELECT value FROM clp_settings WHERE key='business'`),
  ]);
  const out = [];
  for (const row of labels.results) {
    try { out.push(JSON.parse(row.data)); } catch { /* skip a corrupt row rather than fail the page */ }
  }
  let business = DEFAULT_BUSINESS;
  try { business = { ...DEFAULT_BUSINESS, ...JSON.parse(settings.results[0]?.value || '{}') }; } catch { /* keep the default */ }
  out.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'en-GB'));
  return { business, labels: out };
}

export const onRequestGet = handle(async ({ env }) => json(await readAll(await getDb(env))));

export const onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const label = shapeLabel((await readJson(request)).label);
  const count = await db.prepare(`SELECT COUNT(*) AS n FROM clp_labels WHERE id<>?`).bind(label.id).first();
  if (Number(count?.n || 0) >= MAX_LABELS) return fail(422, `There is a limit of ${MAX_LABELS} labels.`);
  await db.prepare(
    `INSERT INTO clp_labels(id,data,updated_at) VALUES(?,?,?)
     ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at`)
    .bind(label.id, JSON.stringify(label), new Date().toISOString()).run();
  return json({ label });
});

export const onRequestDelete = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const id = line((await readJson(request)).id, 40);
  if (!id) return fail(422, 'No label id was sent.');
  await db.prepare(`DELETE FROM clp_labels WHERE id=?`).bind(id).run();
  return json({ deleted: id });
});

export const onRequestPut = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request, 512 * 1024);
  const stmts = [];
  const now = new Date().toISOString();

  if (body.business) {
    stmts.push(db.prepare(`INSERT INTO clp_settings(key,value) VALUES('business',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`)
      .bind(JSON.stringify(shapeBusiness(body.business))));
  }
  if (Array.isArray(body.labels)) {
    if (body.labels.length > MAX_LABELS) return fail(422, `There is a limit of ${MAX_LABELS} labels.`);
    const shaped = body.labels.map(shapeLabel);
    const seen = new Set();
    for (const l of shaped) {
      if (seen.has(l.id)) return fail(422, 'Two labels in that list share the same id.');
      seen.add(l.id);
    }
    // Replacing the list is what the import box means, so clear first.
    stmts.push(db.prepare(`DELETE FROM clp_labels`));
    for (const l of shaped)
      stmts.push(db.prepare(`INSERT INTO clp_labels(id,data,updated_at) VALUES(?,?,?)`).bind(l.id, JSON.stringify(l), now));
  }
  if (!stmts.length) return fail(422, 'Nothing to save.');
  await db.batch(stmts);
  return json(await readAll(db));
});
