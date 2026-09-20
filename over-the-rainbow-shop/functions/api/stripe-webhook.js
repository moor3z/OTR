import { getDb } from '../../server/db.js';
import { verifyWebhook } from '../../server/stripe.js';
import { markOrderPaid, sendConfirmationOnce } from '../../server/orders.js';
import { handle, json, fail } from '../../server/util.js';

// Stripe → this endpoint. This is the ONLY place an order can become "paid".
export const onRequestPost = handle(async ({ env, request, waitUntil }) => {
  if (!env.STRIPE_WEBHOOK_SECRET) return fail(503, 'Webhook secret not configured.');
  const raw = await request.text();
  const event = await verifyWebhook(raw, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET);

  const db = await getDb(env);
  const session = event.data?.object || {};
  const now = new Date().toISOString();
  const logEvent = () => db.prepare(`INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)`).bind(event.id, event.type, now).run();

  const findOrder = () => db.prepare(`SELECT * FROM orders WHERE stripe_session_id=? OR id=?`)
    .bind(session.id || '', session.client_reference_id || session.metadata?.order_id || '').first();

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      if (session.payment_status !== 'paid') { await logEvent(); break; } // delayed method: wait for async_payment_succeeded
      const order = await findOrder();
      if (!order) { await logEvent(); console.error('Paid session with no matching order', session.id); break; }
      if ((order.mode === 'live') !== !!event.livemode) { await logEvent(); console.error('Live/test mode mismatch', order.ref); break; }
      const { changed } = await markOrderPaid(db, order, event, session);
      if (changed) waitUntil(sendConfirmationOnce(env, db, order.id));
      break;
    }
    case 'checkout.session.async_payment_failed':
    case 'checkout.session.expired': {
      const status = event.type.endsWith('expired') ? 'expired' : 'failed';
      const order = await findOrder();
      if (order) await db.prepare(`UPDATE orders SET status=? WHERE id=? AND status='pending'`).bind(status, order.id).run();
      await logEvent();
      break;
    }
    default:
      break; // ignore everything else
  }
  return json({ received: true });
});
