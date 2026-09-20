import { getDb, getSettings, CATEGORIES, SCENTS } from '../../server/db.js';
import { handle, json, paymentMode } from '../../server/util.js';

export const onRequestGet = handle(async ({ env }) => {
  const db = await getDb(env);
  const s = await getSettings(db);
  return json({
    payment_mode: paymentMode(env), // 'demo' | 'test' | 'live'
    categories: CATEGORIES, scents: SCENTS,
    delivery_pence: parseInt(s.delivery_pence, 10) || 0,
    free_delivery_threshold_pence: parseInt(s.free_delivery_threshold_pence, 10) || 0,
    delivery_name: s.delivery_name, dispatch_estimate: s.dispatch_estimate,
    announcement: s.announcement, hero_headline: s.hero_headline, hero_sub: s.hero_sub,
    intro_title: s.intro_title, intro_text: s.intro_text,
    business_name: s.business_name, contact_email: s.contact_email,
    contact_phone: s.contact_phone, business_address: s.business_address,
  }, 200, { 'cache-control': 'public, max-age=30' });
});
