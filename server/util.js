export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });

export const fail = (status, message, extra = {}) => json({ error: message, ...extra }, status);

// Wrap a handler so unexpected errors become tidy JSON rather than a stack trace.
export const handle = (fn) => async (ctx) => {
  try {
    return await fn(ctx);
  } catch (err) {
    if (err.status) return fail(err.status, err.message, err.extra || {});
    console.error(err);
    return fail(500, 'Something went wrong on our side. Please try again.');
  }
};

export function httpError(status, message, extra) {
  const e = new Error(message); e.status = status; e.extra = extra; return e;
}

export async function readJson(request, maxBytes = 64 * 1024) {
  const text = await request.text();
  if (text.length > maxBytes) throw httpError(413, 'Request too large.');
  try { return JSON.parse(text || '{}'); } catch { throw httpError(400, 'Invalid JSON.'); }
}

export const gbp = (pence) => '£' + (pence / 100).toFixed(2);

export function randomId(bytes = 16) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function orderRef() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no easily-confused characters
  const a = crypto.getRandomValues(new Uint8Array(7));
  return 'OTR-' + [...a].map((b) => alphabet[b % alphabet.length]).join('');
}

export const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Which checkout mode is this deployment in?
export function paymentMode(env) {
  const key = env.STRIPE_SECRET_KEY || '';
  if (!key || !env.STRIPE_WEBHOOK_SECRET) return 'demo';
  if (key.startsWith('sk_live_') || key.startsWith('rk_live_')) return 'live';
  return 'test';
}
