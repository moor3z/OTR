import { getDb, getSettings } from '../../../server/db.js';
import { DEFAULT_SETTINGS } from '../../../server/seed.js';
import { handle, json, fail, readJson } from '../../../server/util.js';

const MONEY = ['delivery_pence', 'free_delivery_threshold_pence'];

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
    if (key.endsWith('_email') && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) { fields[key] = 'Enter a valid email address.'; continue; }
    stmts.push(db.prepare(`INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`).bind(key, val));
  }
  if (Object.keys(fields).length) return fail(422, 'Please check the highlighted fields.', { fields });
  if (stmts.length) await db.batch(stmts);
  return json({ settings: await getSettings(db) });
});
