import { api, basket, lineHtml, wireLines, gbp, esc, $ } from './site.js?v=62';

const root = $('#basket-root');
let seq = 0;

export function totalsHtml(q) {
  const saving = q.discount_pence > 0;
  return `<dl class="totals">
    ${saving ? `<div><dt>Items</dt><dd>${gbp(q.items_pence)}</dd></div>
    <div class="saving"><dt>Multi-buy saving</dt><dd>&minus;${gbp(q.discount_pence)}</dd></div>` : ''}
    <div><dt>Subtotal</dt><dd>${gbp(q.subtotal_pence)}</dd></div>
    <div><dt>${esc(q.delivery_name || 'Delivery')}</dt><dd>${q.delivery_pence ? gbp(q.delivery_pence) : 'Free'}</dd></div>
    <div class="grand"><dt>Total</dt><dd>${gbp(q.total_pence)}</dd></div></dl>`;
}

// "Any 2 hearts for £5 — add 1 more" / "applied, saving £1.00". One line per deal in the basket.
export function dealHints(q) {
  return (q.deals || []).map((d) => {
    const thing = d.group ? `of the ${esc(d.group)}` : 'of these';
    if (d.need) return `<p class="deal-hint"><strong>${esc(d.label)}</strong> — add ${d.need} more ${thing} to get it${d.bundles ? ` again` : ''}.</p>`;
    return `<p class="deal-hint is-on"><strong>${esc(d.label)}</strong> applied — you save ${gbp(d.saving_pence)}.</p>`;
  }).join('');
}

// "Or collect for free / local delivery £4" — the choice itself is made at checkout.
function otherWays(q) {
  const opts = (q.options || []).filter((o) => o.id !== 'post');
  if (!opts.length) return '';
  const bits = opts.map((o) => o.id === 'collect' ? 'collect for free' : `local delivery ${o.pence ? gbp(o.pence) : 'free'} within ${o.radius_miles} miles${o.from ? ' of ' + esc(o.from) : ''}`);
  return `<p class="small muted" style="margin:.75rem 0 0">Nearby? You can ${bits.join(', or ')}. Choose at checkout.</p>`;
}

async function render() {
  const items = basket.read();
  if (!items.length) {
    root.innerHTML = `<div class="empty"><h2>Your basket is empty</h2><p>Pick a scent and it will show up here.</p><a class="btn btn-primary" href="/shop">Shop Wax Melts</a></div>`;
    return;
  }
  const mine = ++seq;
  let q;
  try { q = await api('/api/quote', { method: 'POST', body: JSON.stringify({ items: basket.payload() }) }); }
  catch (e) { root.innerHTML = `<div class="notice notice-error" role="alert"><p>${esc(e.message)}</p><button class="btn btn-ghost btn-sm" id="retry">Try again</button></div>`; $('#retry').onclick = render; return; }
  if (mine !== seq) return; // a newer change is already rendering

  // Refresh the cached names/prices so the drawer matches the server
  const cached = basket.read();
  let changed = false;
  for (const l of q.lines) { const c = cached.find((i) => i.variant_id === l.variant_id); if (c && l.name && c.unit_pence !== l.unit_pence) { c.unit_pence = l.unit_pence; changed = true; } }
  if (changed) try { localStorage.setItem('otr_basket_v1', JSON.stringify(cached)); } catch {}

  const problems = q.lines.filter((l) => !l.ok);
  root.innerHTML = `<div class="two-col"><div>
      ${problems.length ? `<div class="notice notice-error" role="alert"><h2>Some items need your attention</h2><p>Remove them or lower the quantity to continue.</p></div>` : ''}
      <ul class="lines">${q.lines.map((l) => lineHtml(l, { problem: l.ok ? '' : l.message })).join('')}</ul>
      <p style="margin-top:1rem"><a href="/shop">Continue shopping</a></p>
    </div>
    <aside class="summary-box" aria-labelledby="sum-title"><h2 id="sum-title">Summary</h2>
      ${dealHints(q)}
      ${q.to_free_delivery_pence > 0 ? `<p class="free-hint">Spend ${gbp(q.to_free_delivery_pence)} more for free UK delivery.</p>` : q.free_delivery ? `<p class="free-hint">You have free UK delivery.</p>` : ''}
      ${totalsHtml(q)}
      ${otherWays(q)}
      ${q.ok ? `<a class="btn btn-primary btn-block" href="/checkout">Checkout</a>` : `<button class="btn btn-block" disabled>Checkout</button>`}
      <p class="small muted" style="margin:.75rem 0 0">No account needed. UK delivery only.</p>
    </aside></div>`;
}

if (root) { wireLines(root, render); document.addEventListener('basket:change', render); render(); }
