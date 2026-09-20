// Minimal Stripe client using fetch — no npm dependencies, so the site deploys
// without a build step. Only the two things this shop needs: create a Checkout
// Session, and verify webhook signatures.
import { httpError } from './util.js';

function encodeForm(obj, prefix, out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') encodeForm(v, key, out);
    else out.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(v)));
  }
  return out;
}

export async function createCheckoutSession(env, params, idempotencyKey) {
  // STRIPE_API_BASE exists only so the automated tests can point at a local mock.
  const base = env.STRIPE_API_BASE || 'https://api.stripe.com';
  const res = await fetch(`${base}/v1/checkout/sessions`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
      'idempotency-key': idempotencyKey,
    },
    body: encodeForm(params).join('&'),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Stripe error', res.status, data?.error?.message);
    throw httpError(502, 'We could not start the payment. Please try again in a moment.');
  }
  return data;
}

const enc = new TextEncoder();
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signPayload(secret, timestamp, payload) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(`${timestamp}.${payload}`)));
}

// Verifies the Stripe-Signature header against the raw request body.
// Returns the parsed event, or throws a 400.
export async function verifyWebhook(rawBody, header, secret, toleranceSeconds = 300) {
  if (!header) throw httpError(400, 'Missing signature.');
  let t = '';
  const sigs = [];
  for (const part of header.split(',')) {
    const [k, v] = part.split('=');
    if (k === 't') t = v;
    if (k === 'v1') sigs.push(v);
  }
  if (!t || !sigs.length) throw httpError(400, 'Malformed signature.');
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSeconds) throw httpError(400, 'Signature timestamp outside tolerance.');
  const expected = await signPayload(secret, t, rawBody);
  if (!sigs.some((s) => timingSafeEqual(s, expected))) throw httpError(400, 'Signature mismatch.');
  try { return JSON.parse(rawBody); } catch { throw httpError(400, 'Invalid payload.'); }
}
