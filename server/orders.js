import { getSettings } from './db.js';
import { emailConfigured, sendOrderEmails } from './email.js';

// Mark an order paid and deduct stock — exactly once, however many times Stripe
// delivers the event. Everything runs in one D1 batch (a single transaction):
// each stock update only applies while orders.stock_deducted = 0, and the final
// statement flips that flag, so a repeat or concurrent delivery changes nothing.
export async function markOrderPaid(db, order, event, session) {
  const now = new Date().toISOString();
  const items = JSON.parse(order.items);

  const amountOk = session.amount_total === order.total_pence && (session.currency || '').toLowerCase() === order.currency;
  if (!amountOk) {
    // Should never happen (we set the amounts). Never treat as a normal paid order.
    await db.batch([
      db.prepare(`INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)`).bind(event.id, event.type, now),
      db.prepare(`UPDATE orders SET status='review', payment_intent=?, admin_note=admin_note || ? WHERE id=? AND status IN ('pending','expired','failed')`)
        .bind(session.payment_intent || null, `Amount mismatch: Stripe reported ${session.amount_total} ${session.currency}. `, order.id),
    ]);
    return { changed: false, review: true };
  }

  const stmts = [db.prepare(`INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)`).bind(event.id, event.type, now)];
  for (const it of items) {
    stmts.push(db.prepare(
      `UPDATE variants SET stock = MAX(stock - ?, 0)
        WHERE id = ? AND EXISTS (SELECT 1 FROM orders WHERE id = ? AND stock_deducted = 0)`)
      .bind(it.qty, it.variant_id, order.id));
  }
  stmts.push(db.prepare(
    `UPDATE orders SET status='paid', stock_deducted=1, paid_at=?, payment_intent=?
      WHERE id=? AND stock_deducted=0`).bind(now, session.payment_intent || null, order.id));
  const results = await db.batch(stmts);
  const changed = results[results.length - 1].meta.changes === 1;
  return { changed };
}

// Send the confirmation once. Claims the send first so parallel webhooks can't double-send.
export async function sendConfirmationOnce(env, db, orderId) {
  if (!emailConfigured(env)) return;
  const claim = await db.prepare(`UPDATE orders SET email_sent=1 WHERE id=? AND email_sent=0 AND status='paid'`).bind(orderId).run();
  if (claim.meta.changes !== 1) return;
  try {
    const order = await db.prepare(`SELECT * FROM orders WHERE id=?`).bind(orderId).first();
    await sendOrderEmails(env, order, await getSettings(db));
  } catch (err) {
    console.error('Confirmation email failed', err.message);
    await db.prepare(`UPDATE orders SET email_sent=0 WHERE id=?`).bind(orderId).run();
  }
}
