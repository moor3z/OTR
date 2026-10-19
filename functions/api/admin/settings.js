import { getDb, getSettings } from '../../../server/db.js';
import { DEFAULT_SETTINGS } from '../../../server/seed.js';
import { handle, json, fail, readJson } from '../../../server/util.js';

const MONEY = ['delivery_pence', 'free_delivery_threshold_pence', 'local_pence'];
const FLAGS = ['local_enabled', 'collection_enabled'];
const POSTCODE_RE = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;

export const onRequestGet = handle(async ({ env }) => json({ settings: await getSettings(await getDb(env)) }));

export const onRequestPut = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  const fields = {}, stmts = [];
  for (const key of Object.keys(DEFAULT_SETTINGS)) {
    if (!(key in body)) continue;
    let val = String(body[key] ?? '').trim().slice(0, 2000);
    if (MONEY.includes(key)) {
      const n = val === '' ? 0 : Number(val);
      if (!Number.isInteger(n) || n < 0 || n > 100000) { fields[key] = 'Enter an amount between £0 and £1,000.'; continue; }
      val = String(n);
    }
    if (FLAGS.includes(key)) val = val === '1' || val === 'true' || val === 'on' ? '1' : '0';
    if (key === 'local_radius_miles') {
      const n = val === '' ? 0 : Number(val);
      if (!(n >= 0 && n <= 200)) { fields[key] = 'Enter a distance in miles, up to 200.'; continue; }
      val = String(n);
    }
    if (key === 'local_postcode') {
      val = val.toUpperCase().replace(/\s+/g, '');
      if (val && !POSTCODE_RE.test(val)) { fields[key] = 'Enter a full UK postcode, like CH65 7DN.'; continue; }
      if (val) val = val.slice(0, -3) + ' ' + val.slice(-3);
    }
    if (key.endsWith('_email') && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) { fields[key] = 'Enter a valid email address.'; continue; }
    stmts.push(db.prepare(`INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`).bind(key, val));
  }
  if (Object.keys(fields).length) return fail(422, 'Please check the highlighted fields.', { fields });
  if (stmts.length) await db.batch(stmts);
  const s = await getSettings(db);
  if (s.local_enabled === '1' && !s.local_postcode) {
    await db.prepare(`INSERT INTO settings(key,value) VALUES('local_enabled','0') ON CONFLICT(key) DO UPDATE SET value='0'`).run();
    return fail(422, 'Local delivery needs the postcode you deliver from, so the distance can be checked.', { fields: { local_postcode: 'Enter the postcode you deliver from.' } });
  }
  if (s.collection_enabled === '1' && !s.collection_address.trim()) {
    await db.prepare(`INSERT INTO settings(key,value) VALUES('collection_enabled','0') ON CONFLICT(key) DO UPDATE SET value='0'`).run();
    return fail(422, 'Collection needs the address customers collect from.', { fields: { collection_address: 'Enter the collection address.' } });
  }
  return json({ settings: s });
});
