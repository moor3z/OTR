// Shared storefront code: header, footer, basket storage and the basket drawer.
const KEY = 'otr_basket_v1';

export const gbp = (pence) => '£' + (pence / 100).toFixed(2);
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);

export async function api(path, options = {}) {
  let res;
  try {
    res = await fetch(path, { ...options, headers: { 'content-type': 'application/json', ...(options.headers || {}) } });
  } catch {
    const e = new Error('We could not reach the shop. Check your connection and try again.'); e.network = true; throw e;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.error || 'Something went wrong. Please try again.'); e.status = res.status; e.data = data; throw e; }
  return data;
}

let configPromise;
export const getConfig = () => (configPromise ||= api('/api/config'));

/* ── Basket storage ─────────────────────────────────────────────────────────
   Only variant IDs and quantities matter; the cached name/price is just so the
   drawer can render instantly. Real prices always come back from /api/quote. */
export const basket = {
  read() {
    try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter((i) => i && i.variant_id && i.qty > 0) : []; }
    catch { return []; }
  },
  write(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* private mode: basket lasts for this page only */ }
    document.dispatchEvent(new CustomEvent('basket:change'));
  },
  count() { return this.read().reduce((n, i) => n + i.qty, 0); },
  add(item, qty = 1) {
    const items = this.read();
    const found = items.find((i) => i.variant_id === item.variant_id);
    if (found) found.qty = Math.min(found.qty + qty, 20); else items.push({ ...item, qty: Math.min(qty, 20) });
    this.write(items);
  },
  setQty(id, qty) {
    const items = this.read().map((i) => (i.variant_id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0);
    this.write(items);
  },
  remove(id) { this.write(this.read().filter((i) => i.variant_id !== id)); },
  clear() { this.write([]); },
  payload() { return this.read().map(({ variant_id, qty }) => ({ variant_id, qty })); },
};

export function toast(message) {
  document.querySelector('.toast')?.remove();
  const t = Object.assign(document.createElement('div'), { className: 'toast', textContent: message });
  t.setAttribute('role', 'status');
  document.body.append(t);
  setTimeout(() => t.remove(), 3500);
}

/* ── Product card (used on home, shop and related products) ───────────────── */
export function productCard(p) {
  const single = p.variants.length === 1;
  const price = single ? gbp(p.from_pence) : `From ${gbp(p.from_pence)}`;
  const href = `/products/${encodeURIComponent(p.id)}`;
  let action;
  if (!p.available) action = `<button class="btn" disabled>Sold out</button>`;
  else if (single) action = `<button class="btn btn-primary" data-add="${esc(p.id)}">Add to Basket</button>`;
  else action = `<a class="btn btn-ghost" href="${href}">Choose ${esc((p.option_name || 'option').toLowerCase())}</a>`;
  return `<li><article class="card${p.available ? '' : ' is-out'}">
    <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true">
      <img src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="" loading="lazy" decoding="async" width="400" height="400">
      ${p.available ? '' : '<span class="badge">Sold out</span>'}
    </a>
    <h3><a href="${href}">${esc(p.name)}</a></h3>
    <p class="card-desc">${esc(p.short_desc)}</p>
    <div class="card-foot"><p class="price">${price}</p>${action}</div>
  </article></li>`;
}

// One listener handles every "Add to Basket" button inside a product list.
export function wireAddButtons(root, getProduct) {
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    const p = getProduct(btn.dataset.add);
    const v = p?.variants.find((x) => x.available);
    if (!v) return;
    addToBasket(p, v, 1);
  });
}

export function addToBasket(p, v, qty) {
  basket.add({ variant_id: v.id, product_id: p.id, name: p.name, label: p.variants.length > 1 ? v.label : '', unit_pence: v.price_pence, image_url: p.image_url }, qty);
  openDrawer(`${p.name} added to your basket.`);
}

/* ── Header and footer ────────────────────────────────────────────────────── */
const ICON = {
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};
function renderChrome() {
  // Header and footer are in the HTML (tools/build_chrome.py); this only marks the current page and wires behaviour.
  const here = location.pathname.replace(/\/$/, '') || '/';
  const cat = new URLSearchParams(location.search).get('category');
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const u = new URL(a.href), c = u.searchParams.get('category');
    const current = u.pathname === '/' ? here === '/' : u.pathname === '/shop' ? here === '/shop' && (c || null) === cat : here === u.pathname;
    if (current) a.setAttribute('aria-current', 'page');
  });
  $('#year').textContent = new Date().getFullYear();

  // Phone/tablet menu: one button opens search + all links
  const toggle = $('.menu-toggle'), menu = $('#site-menu');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });
  document.addEventListener('click', (e) => { if (menu.classList.contains('is-open') && !e.composedPath().includes($('.site-header'))) setMenu(false); });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  $('#basket-btn').addEventListener('click', () => openDrawer());
  updateCount();
  document.addEventListener('basket:change', updateCount);
  window.addEventListener('storage', (e) => { if (e.key === KEY) updateCount(); });

  getConfig().then((c) => {
    const offer = c.announcement || (c.free_delivery_threshold_pence ? `Free UK delivery over ${gbp(c.free_delivery_threshold_pence).replace(/\.00$/, '')}` : '');
    if (offer) $('#announce').innerHTML = `<div class="announce"><span aria-hidden="true">♥</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>${esc(offer)}<span aria-hidden="true">♥</span></div>`;
    if (c.payment_mode === 'demo') { // no Stripe keys at all: warn shoppers. Test mode shows only in the admin Status box.
      const b = document.createElement('div'); b.className = 'test-banner';
      b.textContent = 'Demo mode: payments are not connected. No orders will be taken.';
      document.body.prepend(b);
    }
    if (c.contact_email) $('#footer-contact').innerHTML = `<a href="mailto:${esc(c.contact_email)}">${esc(c.contact_email)}</a>`;
  }).catch(() => {});
}

function updateCount() {
  const n = basket.count();
  const el = $('.basket-count'); if (!el) return;
  el.textContent = n > 99 ? '99+' : n; el.dataset.n = n;
  $('#basket-label').textContent = `Basket, ${n} item${n === 1 ? '' : 's'}`;
}

/* ── Basket drawer ────────────────────────────────────────────────────────── */
let drawer;
export function lineHtml(l, { problem } = {}) {
  const max = Math.min(l.max ?? 20, 20);
  return `<li class="line" data-id="${esc(l.variant_id)}">
    <img src="${esc(l.image_url || '/assets/ph/blank.svg')}" alt="" width="76" height="76" loading="lazy">
    <div>
      <div class="line-top">
        <div><a class="line-name" href="/products/${encodeURIComponent(l.product_id || '')}">${esc(l.name || 'Unavailable item')}</a>
          ${l.label ? `<p class="line-meta">${esc(l.label)}</p>` : ''}</div>
        <strong>${l.unit_pence != null ? gbp(l.unit_pence * l.qty) : ''}</strong>
      </div>
      ${problem ? `<p class="line-problem">${esc(problem)}</p>` : ''}
      <div class="line-actions">
        <div class="qty" role="group" aria-label="Quantity of ${esc(l.name || 'item')}">
          <button type="button" data-step="-1" aria-label="Decrease quantity"${l.qty <= 1 ? ' disabled' : ''}>−</button>
          <output aria-live="polite">${l.qty}</output>
          <button type="button" data-step="1" aria-label="Increase quantity"${l.qty >= max ? ' disabled' : ''}>+</button>
        </div>
        <button type="button" class="link-btn" data-remove>Remove<span class="visually-hidden"> ${esc(l.name || 'item')}</span></button>
      </div>
    </div></li>`;
}

// Shared by the drawer and the basket page
export function wireLines(root, onChange) {
  root.addEventListener('click', (e) => {
    const li = e.target.closest('.line'); if (!li) return;
    const id = li.dataset.id;
    const step = e.target.closest('[data-step]');
    if (step) {
      const item = basket.read().find((i) => i.variant_id === id); if (!item) return;
      basket.setQty(id, Math.max(1, Math.min(20, item.qty + Number(step.dataset.step)))); onChange();
    } else if (e.target.closest('[data-remove]')) { basket.remove(id); onChange(); }
  });
}

function renderDrawer(note) {
  const items = basket.read();
  const body = $('.drawer-body', drawer), foot = $('.drawer-foot', drawer);
  if (!items.length) {
    body.innerHTML = `<div class="empty" style="margin-top:1.25rem"><h3>Your basket is empty</h3><p>Pick a scent and it will show up here.</p></div>`;
    foot.innerHTML = `<a class="btn btn-primary btn-block" href="/shop">Shop Wax Melts</a>`;
    return;
  }
  const sub = items.reduce((n, i) => n + (i.unit_pence || 0) * i.qty, 0);
  body.innerHTML = `${note ? `<p class="free-hint" role="status" style="margin-top:1rem">${esc(note)}</p>` : ''}<ul class="lines">${items.map((i) => lineHtml(i)).join('')}</ul>`;
  foot.innerHTML = `<div class="sub"><span>Subtotal</span><span>${gbp(sub)}</span></div>
    <p class="small muted" style="margin:0">Delivery is added at the next step.</p>
    <a class="btn btn-primary btn-block" href="/checkout">Checkout</a>
    <a class="btn btn-ghost btn-block btn-sm" href="/basket">View basket</a>`;
}

export function openDrawer(note) {
  if (!drawer) {
    drawer = document.createElement('dialog');
    drawer.className = 'drawer'; drawer.setAttribute('aria-labelledby', 'drawer-title');
    drawer.innerHTML = `<div class="drawer-head"><h2 id="drawer-title">Your basket</h2>
      <button class="icon-btn" type="button" data-close aria-label="Close basket">${ICON.close}</button></div>
      <div class="drawer-body"></div><div class="drawer-foot"></div>`;
    document.body.append(drawer);
    drawer.addEventListener('click', (e) => { if (e.target === drawer || e.target.closest('[data-close]')) drawer.close(); });
    wireLines(drawer, () => renderDrawer());
  }
  renderDrawer(note);
  if (!drawer.open) drawer.showModal();
}

renderChrome();

document.addEventListener('click', (e) => { if (e.target.closest('[data-reload]')) location.reload(); });
