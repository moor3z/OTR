import { json, paymentMode } from '../../../server/util.js';
import { emailConfigured } from '../../../server/email.js';
export const onRequestGet = ({ data, env }) =>
  json({ email: data.admin.email, payment_mode: paymentMode(env), email_configured: emailConfigured(env) });
