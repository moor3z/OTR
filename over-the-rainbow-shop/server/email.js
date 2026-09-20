// Order confirmation emails via Resend (https://resend.com). Optional: if
// RESEND_API_KEY and EMAIL_FROM are not set, no email is sent and nothing breaks.
import { escapeHtml, gbp } from './util.js';

export const emailConfigured = (env) => !!(env.RESEND_API_KEY && env.EMAIL_FROM);

async function send(env, { to, subject, html, text }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: env.EMAIL_FROM, to: [to], subject, html, text }),
  });
  if (!res.ok) throw new Error(`Email provider returned ${res.status}`);
}

export async function sendOrderEmails(env, order, settings) {
  const items = JSON.parse(order.items);
  const addr = JSON.parse(order.address);
  const shop = settings.business_name || 'Over The Rainbow';
  const addrLines = [order.name, addr.line1, addr.line2, addr.city, addr.county, addr.postcode, 'United Kingdom'].filter(Boolean);
  const rows = items.map((i) =>
    `<tr><td style="padding:6px 0">${escapeHtml(i.name)}${i.label ? ' – ' + escapeHtml(i.label) : ''} × ${i.qty}</td>
     <td style="padding:6px 0;text-align:right">${gbp(i.line_pence)}</td></tr>`).join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#2a2230;max-width:520px">
    <h1 style="font-size:20px">Thanks for your order</h1>
    <p>Order <strong>${escapeHtml(order.ref)}</strong> is confirmed and paid.</p>
    <table style="width:100%;border-collapse:collapse">${rows}
      <tr><td style="padding:6px 0;border-top:1px solid #ddd">Delivery</td><td style="padding:6px 0;border-top:1px solid #ddd;text-align:right">${order.delivery_pence ? gbp(order.delivery_pence) : 'Free'}</td></tr>
      <tr><td style="padding:6px 0"><strong>Total paid</strong></td><td style="padding:6px 0;text-align:right"><strong>${gbp(order.total_pence)}</strong></td></tr>
    </table>
    <p><strong>Delivering to</strong><br>${addrLines.map(escapeHtml).join('<br>')}</p>
    ${settings.dispatch_estimate ? `<p>${escapeHtml(settings.dispatch_estimate)}</p>` : ''}
    <p>${escapeHtml(shop)}</p></div>`;
  const text = [`Thanks for your order. Order ${order.ref} is confirmed and paid.`, '',
    ...items.map((i) => `${i.name}${i.label ? ' – ' + i.label : ''} x ${i.qty}  ${gbp(i.line_pence)}`),
    `Delivery  ${order.delivery_pence ? gbp(order.delivery_pence) : 'Free'}`, `Total paid  ${gbp(order.total_pence)}`, '',
    'Delivering to:', ...addrLines, '', settings.dispatch_estimate || '', shop].join('\n');

  await send(env, { to: order.email, subject: `Your ${shop} order ${order.ref}`, html, text });
  if (settings.order_notify_email) {
    await send(env, { to: settings.order_notify_email, subject: `New paid order ${order.ref} – ${gbp(order.total_pence)}`, html, text })
      .catch((e) => console.error('Shop notification email failed', e.message));
  }
}
