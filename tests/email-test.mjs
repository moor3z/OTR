import { sendOrderEmails } from '../server/email.js';
import { received } from './mock-resend.mjs';
const env = { RESEND_API_KEY: 're_mock', EMAIL_FROM: 'Shop <orders@send.example>', RESEND_API_BASE: 'http://localhost:8798' };
const order = { ref: 'OTR-TEST', email: 'cust@example.com', name: 'Cust', phone: '', items: JSON.stringify([{ name: 'Bar', label: '', qty: 1, line_pence: 350 }]),
  address: JSON.stringify({ line1: '1 St', city: 'Chester', postcode: 'CH1 1AA' }), delivery_pence: 395, total_pence: 745 };
const settings = { business_name: 'OTR', contact_email: 'michelle@example', order_notify_email: 'michelle@example', dispatch_estimate: '' };
await new Promise((r) => setTimeout(r, 300));
const problems = await sendOrderEmails(env, order, settings);
console.log(process.env.MODE, '→ problems:', problems, '| delivered:', received.map((m) => m.to[0] + ' "' + m.subject + '"' + (m.reply_to ? ' reply_to=' + m.reply_to : '')));
process.exit(0);
