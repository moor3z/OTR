import { requireAdmin } from '../../../server/access.js';
import { handle, httpError } from '../../../server/util.js';

// Every /api/admin/* request must carry a valid Cloudflare Access identity.
export const onRequest = handle(async (ctx) => {
  const { request, env } = ctx;
  ctx.data.admin = await requireAdmin(request, env);

  if (!['GET', 'HEAD'].includes(request.method)) {
    // CSRF defence: same-origin only, plus a custom header a cross-site form can't send.
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) throw httpError(403, 'Cross-site request blocked.');
    if (request.headers.get('x-otr-admin') !== '1') throw httpError(403, 'Missing admin request header.');
  }
  const res = await ctx.next();
  const out = new Response(res.body, res);
  out.headers.set('cache-control', 'no-store');
  out.headers.set('x-robots-tag', 'noindex');
  return out;
});
