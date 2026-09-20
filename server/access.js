// Admin authentication = Cloudflare Access (Zero Trust). Access handles the
// login screen (email one-time PIN, Google, etc.) in front of /admin and
// /api/admin. This module then verifies the signed Access JWT on every admin
// API request, so the API is safe even if an Access path rule is misconfigured.
import { httpError } from './util.js';

let cachedKeys = null, cachedAt = 0;

async function getKeys(teamDomain) {
  if (cachedKeys && Date.now() - cachedAt < 60 * 60 * 1000) return cachedKeys;
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw httpError(503, 'Could not load Cloudflare Access signing keys.');
  cachedKeys = (await res.json()).keys || [];
  cachedAt = Date.now();
  return cachedKeys;
}

const b64urlToBytes = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const b64urlToJson = (s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));

export async function requireAdmin(request, env) {
  const url = new URL(request.url);
  const local = ['localhost', '127.0.0.1'].includes(url.hostname);
  if (env.ADMIN_DEV_BYPASS === 'true' && local) return { email: 'local-dev@localhost' };

  const team = (env.ACCESS_TEAM_DOMAIN || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  const aud = env.ACCESS_AUD || '';
  if (!team || !aud) throw httpError(503, 'Admin sign-in is not set up yet. Add ACCESS_TEAM_DOMAIN and ACCESS_AUD (see README).');

  const token = request.headers.get('cf-access-jwt-assertion');
  if (!token) throw httpError(401, 'Sign in required.');
  const parts = token.split('.');
  if (parts.length !== 3) throw httpError(401, 'Invalid sign-in token.');

  let header, payload;
  try { header = b64urlToJson(parts[0]); payload = b64urlToJson(parts[1]); } catch { throw httpError(401, 'Invalid sign-in token.'); }
  if (header.alg !== 'RS256') throw httpError(401, 'Invalid sign-in token.');

  const jwk = (await getKeys(team)).find((k) => k.kid === header.kid);
  if (!jwk) { cachedKeys = null; throw httpError(401, 'Unknown signing key.'); }
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlToBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!valid) throw httpError(401, 'Invalid sign-in token.');

  const now = Math.floor(Date.now() / 1000);
  const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!auds.includes(aud)) throw httpError(403, 'Token is for a different application.');
  if (payload.iss !== `https://${team}`) throw httpError(403, 'Token issuer mismatch.');
  if (!payload.exp || payload.exp < now) throw httpError(401, 'Sign-in expired. Reload the page.');
  if (!payload.email) throw httpError(403, 'Token has no email identity.');
  return { email: payload.email };
}
