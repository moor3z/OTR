import { json, paymentMode } from '../../../server/util.js';
import { emailConfigured } from '../../../server/email.js';
import { DEFAULT_USAGE, DEFAULT_SAFETY } from '../../../server/content.js';
export const onRequestGet = ({ data, env }) =>
  json({ email: data.admin.email, payment_mode: paymentMode(env), email_configured: emailConfigured(env), defaults: { usage: DEFAULT_USAGE, safety: DEFAULT_SAFETY } });
