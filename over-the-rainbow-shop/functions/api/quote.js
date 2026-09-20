import { getDb, getSettings } from '../../server/db.js';
import { priceBasket } from '../../server/pricing.js';
import { handle, json, readJson } from '../../server/util.js';

// Prices a basket. Used by the basket and checkout pages so that what the
// customer sees is always the server's current price and availability.
export const onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  return json(await priceBasket(db, await getSettings(db), body.items || []));
});
