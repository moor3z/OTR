// Order confirmation emails via Resend (https://resend.com). Optional: if
// RESEND_API_KEY and EMAIL_FROM are not set, no email is sent and nothing breaks.
import { escapeHtml, gbp } from './util.js';

export const emailConfigured = (env) => !!(env.RESEND_API_KEY && env.EMAIL_FROM);
const API = 'https://api.resend.com';
const apiBase = (env) => env.RESEND_API_BASE || API; // RESEND_API_BASE exists only for tests

async function post(env, path, body) {
  const res = await fetch(apiBase(env) + path, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Resend ${res.status}: ${data?.message || data?.name || 'request failed'}`);
  return data;
}

// Sends one message, retrying once on a rate-limit reply (free plan: 2 requests/second).
async function sendOne(env, msg) {
  try { return await post(env, '/emails', msg); }
  catch (e) {
    if (!/^Resend 429/.test(e.message)) throw e;
    await new Promise((r) => setTimeout(r, 1200));
    return post(env, '/emails', msg);
  }
}

// Builds the customer confirmation and the shop alert, and sends both in ONE
// request via Resend's batch endpoint, so the two never trip the rate limit.
// Falls back to sending one at a time if batch is unavailable.
// Returns a list of problems (empty = all sent).
export async function sendOrderEmails(env, order, settings) {
  const items = JSON.parse(order.items);
  const addr = JSON.parse(order.address);
  const shop = settings.business_name || 'Over The Rainbow';
  const addrLines = [order.name, addr.line1, addr.line2, addr.city, addr.county, addr.postcode, 'United Kingdom'].filter(Boolean);
  const rows = items.map((i) =>
    `<tr><td style="padding:6px 0">${escapeHtml(i.name)}${i.label ? ' – ' + escapeHtml(i.label) : ''} × ${i.qty}</td>
     <td style="padding:6px 0;text-align:right">${gbp(i.line_pence)}</td></tr>`).join('');
  const body = (heading, intro) => `<div style="font-family:Arial,sans-serif;color:#2a2230;max-width:520px">
    <h1 style="font-size:20px">${heading}</h1>
    <p>${intro}</p>
    <table style="width:100%;border-collapse:collapse">${rows}
      <tr><td style="padding:6px 0;border-top:1px solid #ddd">Delivery</td><td style="padding:6px 0;border-top:1px solid #ddd;text-align:right">${order.delivery_pence ? gbp(order.delivery_pence) : 'Free'}</td></tr>
      <tr><td style="padding:6px 0"><strong>Total paid</strong></td><td style="padding:6px 0;text-align:right"><strong>${gbp(order.total_pence)}</strong></td></tr>
    </table>
    <p><strong>Delivering to</strong><br>${addrLines.map(escapeHtml).join('<br>')}</p>
    ${order.phone ? `<p><strong>Phone</strong><br>${escapeHtml(order.phone)}</p>` : ''}
    ${settings.dispatch_estimate ? `<p>${escapeHtml(settings.dispatch_estimate)}</p>` : ''}
    <p>${escapeHtml(shop)}</p></div>`;
  const text = (heading, intro) => [heading, '', intro, '',
    ...items.map((i) => `${i.name}${i.label ? ' – ' + i.label : ''} x ${i.qty}  ${gbp(i.line_pence)}`),
    `Delivery  ${order.delivery_pence ? gbp(order.delivery_pence) : 'Free'}`, `Total paid  ${gbp(order.total_pence)}`, '',
    'Delivering to:', ...addrLines, ...(order.phone ? ['', `Phone: ${order.phone}`] : []), '', settings.dispatch_estimate || '', shop].join('\n');

  const customerIntro = `Order <strong>${escapeHtml(order.ref)}</strong> is confirmed and paid.`;
  const messages = [{
    from: env.EMAIL_FROM, to: [order.email],
    ...(settings.contact_email ? { reply_to: settings.contact_email } : {}),
    subject: `Your ${shop} order ${order.ref}`,
    html: body('Thanks for your order', customerIntro), text: text('Thanks for your order', `Order ${order.ref} is confirmed and paid.`),
  }];
  if (settings.order_notify_email) {
    const alertIntro = `${escapeHtml(order.name)} (${escapeHtml(order.email)}) has paid for order <strong>${escapeHtml(order.ref)}</strong>. Open the admin area to update its status.`;
    messages.push({
      from: env.EMAIL_FROM, to: [settings.order_notify_email], reply_to: order.email,
      subject: `New paid order ${order.ref} – ${gbp(order.total_pence)}`,
      html: body('New paid order', alertIntro), text: text('New paid order', `${order.name} (${order.email}) has paid for order ${order.ref}.`),
    });
  }

  const problems = [];
  if (messages.length > 1) {
    try { await post(env, '/emails/batch', messages); return problems; }
    catch (e) { console.error('Batch send failed, sending individually', e.message); }
  }
  for (const msg of messages) {
    try { await sendOne(env, msg); }
    catch (e) { problems.push(`${msg.to[0]}: ${e.message}`); console.error('Email failed', msg.to[0], e.message); }
  }
  return problems;
}
