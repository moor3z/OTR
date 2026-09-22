// Admin area. All data comes from /api/admin/*, which only answers requests
// carrying a valid Cloudflare Access sign-in (verified on the server).
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const gbp = (p) => '£' + (p / 100).toFixed(2);
const toPence = (s) => { const n = Number(String(s).replace(/[£,\s]/g, '')); return Number.isFinite(n) ? Math.round(n * 100) : NaN; };
const when = (iso) => iso ? new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '';
const panel = $('#panel'), editor = $('#editor');
const CATEGORIES = [['snap-bars', 'Snap Bars'], ['wax-melt-shapes', 'Wax Melt Shapes'], ['sample-boxes', 'Sample Boxes'], ['gift-sets', 'Gift Sets'], ['accessories', 'Accessories']];
const SCENTS = ['fresh', 'floral', 'fruity', 'sweet', 'halloween', 'christmas'];
const FULFILMENT = ['unfulfilled', 'packed', 'dispatched', 'delivered', 'cancelled'];

async function api(path, { method = 'GET', body, raw, type } = {}) {
  const res = await fetch('/api/admin' + path, {
    method, redirect: 'manual',
    headers: { 'x-otr-admin': '1', ...(body ? { 'content-type': type || 'application/json' } : {}) },
    body: raw ? body : body ? JSON.stringify(body) : undefined,
  });
  if (res.type === 'opaqueredirect' || res.status === 302) { location.reload(); throw new Error('Signing in again…'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.error || `Request failed (${res.status}).`); e.status = res.status; e.fields = data.fields; throw e; }
  return data;
}
const fail = (e) => { panel.innerHTML = `<div class="notice notice-error" role="alert" style="margin-top:1.5rem"><h2>${e.status === 503 ? 'Admin is not ready yet' : e.status === 401 || e.status === 403 ? 'You are not signed in as an admin' : 'Something went wrong'}</h2><p>${esc(e.message)}</p></div>`; };
const flash = (msg) => { const t = Object.assign(document.createElement('div'), { className: 'toast', textContent: msg }); t.setAttribute('role', 'status'); document.body.append(t); setTimeout(() => t.remove(), 3000); };
const fieldErrors = (form, e) => {
  form.querySelectorAll('.field-error').forEach((n) => n.remove());
  $('.form-msg', form).innerHTML = `<div class="notice notice-error" role="alert"><p>${esc(e.message)}</p>${e.fields ? `<ul>${Object.values(e.fields).map((m) => `<li>${esc(m)}</li>`).join('')}</ul>` : ''}</div>`;
  $('.form-msg', form).scrollIntoView({ block: 'center' });
};

/* ── Orders ─────────────────────────────────────────────────────────────── */
let orderView = 'paid';
async function showOrders() {
  const { orders } = await api(`/orders?view=${orderView}`);
  panel.innerHTML = `<div class="bar"><h1>Orders</h1>
    <label class="visually-hidden" for="view">Show</label><select id="view" style="width:auto">
      <option value="paid">Paid orders</option><option value="other">Unpaid, expired and demo</option><option value="all">Everything</option></select></div>
    ${orders.length ? `<ul class="rows">${orders.map((o) => `<li class="row order">
      <div><span class="row-title">${esc(o.ref)}</span> ${statusTag(o)} <span class="tag">${esc(o.fulfilment)}</span>
        <p class="row-sub">${esc(o.name)}, ${o.item_count} item${o.item_count === 1 ? '' : 's'}, ${gbp(o.total_pence)}, ${when(o.paid_at || o.created_at)}</p></div>
      <button class="btn btn-ghost btn-sm" data-order="${esc(o.id)}">Open</button></li>`).join('')}</ul>`
      : `<div class="empty"><p>${orderView === 'paid' ? 'No paid orders yet. They appear here as soon as Stripe confirms a payment.' : 'Nothing to show.'}</p></div>`}`;
  $('#view').value = orderView;
  $('#view').onchange = (e) => { orderView = e.target.value; showOrders().catch(fail); };
}
const statusTag = (o) => `<span class="tag ${o.status === 'paid' ? 'paid' : o.status === 'review' || o.status === 'failed' ? 'warn' : ''}">${esc(o.status)}${o.mode === 'test' ? ' (test)' : ''}</span>`;

async function openOrder(id) {
  const { order: o } = await api(`/orders/${id}`);
  const a = o.address;
  editor.innerHTML = `<form method="dialog" id="order-form"><h2 id="editor-title">Order ${esc(o.ref)}</h2><div class="form-msg"></div>
    <p>${statusTag(o)} ${o.status === 'paid' ? `Paid ${when(o.paid_at)}` : `Created ${when(o.created_at)}. Not paid, do not send.`}</p>
    <dl class="kv"><dt>Customer</dt><dd>${esc(o.name)}<br><a href="mailto:${esc(o.email)}">${esc(o.email)}</a>${o.phone ? `<br>${esc(o.phone)}` : ''}</dd>
      <dt>Deliver to</dt><dd>${[o.name, a.line1, a.line2, a.city, a.county, a.postcode].filter(Boolean).map(esc).join('<br>')}</dd>
      ${o.payment_intent ? `<dt>Stripe ref</dt><dd>${esc(o.payment_intent)}<br><a class="btn btn-ghost btn-sm" style="margin-top:.375rem" href="https://dashboard.stripe.com/${o.mode === 'live' ? '' : 'test/'}payments/${encodeURIComponent(o.payment_intent)}" target="_blank" rel="noopener">Open payment in Stripe</a></dd>` : ''}</dl>
    <ul class="rows">${o.items.map((i) => `<li class="row order"><div><span class="row-title">${esc(i.name)}${i.label ? ` (${esc(i.label)})` : ''}</span><p class="row-sub">${i.qty} × ${gbp(i.unit_pence)}</p></div><strong>${gbp(i.line_pence)}</strong></li>`).join('')}</ul>
    <dl class="kv"><dt>Subtotal</dt><dd>${gbp(o.subtotal_pence)}</dd><dt>Delivery</dt><dd>${gbp(o.delivery_pence)}</dd><dt><strong>Total</strong></dt><dd><strong>${gbp(o.total_pence)}</strong></dd></dl>
    <div class="field"><label for="fulfilment">Fulfilment status</label><select id="fulfilment">${FULFILMENT.map((f) => `<option${f === o.fulfilment ? ' selected' : ''}>${f}</option>`).join('')}</select></div>
    <div class="field"><label for="note">Private note</label><textarea id="note">${esc(o.admin_note)}</textarea></div>
    <div class="editor-actions"><button class="btn btn-primary" type="submit" value="save">Save order</button><button class="btn btn-ghost" type="button" data-close>Close</button>
      <button class="btn btn-ghost" type="button" id="o-label">Print address label</button><button class="btn btn-ghost" type="button" id="o-slip">Print packing slip</button>
      <button class="link-btn" type="button" id="o-delete" style="margin-left:auto;color:var(--danger)">Delete order</button></div></form>`;
  editor.showModal();
  $('#o-label').onclick = () => printOrder(o, 'label');
  $('#o-slip').onclick = () => printOrder(o, 'slip');
  $('#o-delete').onclick = async () => {
    const warn = o.status === 'paid' && o.mode === 'live'
      ? `Delete PAID order ${o.ref}?\n\nThis is a real customer order. Deleting it removes your only record of the sale here, and sales records normally have to be kept for tax. Only do this if you are sure.`
      : `Delete order ${o.ref}? This cannot be undone.`;
    if (!confirm(warn)) return;
    try { await api(`/orders/${id}`, { method: 'DELETE' }); editor.close(); flash('Order deleted'); showOrders(); } catch (err) { fieldErrors($('#order-form'), err); }
  };
  $('#order-form').onsubmit = async (e) => {
    e.preventDefault();
    try { await api(`/orders/${id}`, { method: 'PUT', body: { fulfilment: $('#fulfilment').value, admin_note: $('#note').value } }); editor.close(); flash('Order saved'); showOrders(); }
    catch (err) { fieldErrors(e.target, err); }
  };
}


// Opens a print-ready page for an order: a 6x4in address label, or an A5 packing slip.
let shopSettings = null;
async function printOrder(o, mode) {
  if (!shopSettings) { try { shopSettings = (await api('/settings')).settings; } catch { shopSettings = {}; } }
  const a = o.address;
  const to = [o.name, a.line1, a.line2, a.city, a.county, a.postcode].filter(Boolean).map(esc);
  const from = [shopSettings.business_name, ...(shopSettings.business_address || '').split(/\n/)].filter(Boolean).map(esc);
  const win = window.open('', '_blank', 'width=800,height=700');
  if (!win) { flash('Allow pop-ups for this site to print.'); return; }
  const label = `<div class="label"><div class="to">${to.join('<br>')}</div><div class="foot"><span>Order ${esc(o.ref)}</span>${from.length ? `<span>From: ${from.join(', ')}</span>` : ''}</div></div>`;
  const slip = `<div class="slip"><div class="head"><div><h1>${esc(shopSettings.business_name || 'Over The Rainbow')}</h1>${from.slice(1).length ? `<p>${from.slice(1).join('<br>')}</p>` : ''}</div>
      <div class="right"><strong>Order ${esc(o.ref)}</strong><br>${when(o.paid_at || o.created_at)}</div></div>
    <h2>Deliver to</h2><p>${to.join('<br>')}${o.phone ? `<br>${esc(o.phone)}` : ''}</p>
    <h2>Items</h2><table><tr><th>Item</th><th>Qty</th><th class="r">Price</th></tr>
      ${o.items.map((i) => `<tr><td>${esc(i.name)}${i.label ? ` – ${esc(i.label)}` : ''}</td><td>${i.qty}</td><td class="r">${gbp(i.line_pence)}</td></tr>`).join('')}
      <tr class="tot"><td colspan="2">Delivery</td><td class="r">${o.delivery_pence ? gbp(o.delivery_pence) : 'Free'}</td></tr>
      <tr class="tot"><td colspan="2"><strong>Total paid</strong></td><td class="r"><strong>${gbp(o.total_pence)}</strong></td></tr></table>
    <p class="thanks">Thank you for your order! Any problems, email ${esc(shopSettings.contact_email || '')}.</p></div>`;
  win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${mode === 'label' ? 'Label' : 'Packing slip'} ${esc(o.ref)}</title><style>
    body { font-family: Arial, sans-serif; color: #000; margin: 0; padding: 0; }
    @page { margin: 0; ${mode === 'label' ? 'size: 6in 4in;' : 'size: A5;'} }
    .label { width: 6in; height: 4in; box-sizing: border-box; padding: .4in .5in; display: flex; flex-direction: column; justify-content: center; }
    .to { font-size: 26pt; line-height: 1.3; font-weight: 700; }
    .foot { margin-top: auto; display: flex; justify-content: space-between; gap: 1em; font-size: 9pt; color: #333; }
    .slip { width: 148mm; box-sizing: border-box; padding: 12mm; font-size: 11pt; }
    .head { display: flex; justify-content: space-between; gap: 1em; border-bottom: 2px solid #000; padding-bottom: 6mm; margin-bottom: 6mm; } .head h1 { font-size: 16pt; margin: 0 0 2mm; } .head p { margin: 0; font-size: 9pt; } .right { text-align: right; }
    h2 { font-size: 11pt; margin: 6mm 0 2mm; text-transform: uppercase; letter-spacing: .05em; }
    table { width: 100%; border-collapse: collapse; } th, td { text-align: left; padding: 2mm 0; border-bottom: 1px solid #ccc; vertical-align: top; } th { font-size: 9pt; } .r { text-align: right; } .tot td { border: 0; }
    .thanks { margin-top: 10mm; font-size: 10pt; }
    @media screen { body { background: #888; padding: 20px; } .label, .slip { background: #fff; margin: 0 auto; box-shadow: 0 2px 12px rgba(0,0,0,.4); } .bar { text-align: center; margin-bottom: 16px; } .bar button { font: 600 15px Arial; padding: 10px 22px; border-radius: 999px; border: 0; background: #ff89cd; cursor: pointer; } }
    @media print { .bar { display: none; } }
  </style></head><body><div class="bar"><button onclick="print()">Print</button></div>${mode === 'label' ? label : slip}</body></html>`);
  win.document.close();
}

/* ── Products ───────────────────────────────────────────────────────────── */
let products = [];
const pf = { scent: 'all', status: 'all', q: '' }; // product list filters, kept while you edit
function showProducts(reload = true) {
  return (reload ? api('/products').then((d) => (products = d.products)) : Promise.resolve()).then(() => {
    const samples = products.filter((p) => p.is_sample).length;
    const q = pf.q.toLowerCase();
    const list = products.filter((p) =>
      (pf.scent === 'all' || (pf.scent === 'allyear' ? !p.scents.includes('halloween') && !p.scents.includes('christmas') : p.scents.includes(pf.scent))) &&
      (pf.status === 'all' || (pf.status === 'live' ? !p.hidden && p.available : pf.status === 'hidden' ? p.hidden : pf.status === 'todo' ? p.variants.some((v) => !v.price_pence) || !p.image_url : pf.status === 'soldout' ? !p.hidden && (p.sold_out || !p.available) : true)) &&
      (!q || p.name.toLowerCase().includes(q)));
    const chip = (group, value, label) => `<button type="button" class="chip" data-pf="${group}" data-v="${value}" aria-pressed="${pf[group] === value}">${label}</button>`;
    panel.innerHTML = `<div class="bar"><h1>Products</h1><button class="btn btn-primary btn-sm" data-new-product>Add product</button></div>
      ${samples ? `<div class="notice notice-demo"><p><strong>${samples} sample product${samples === 1 ? '' : 's'} with made-up prices.</strong> Edit them into real products (saving removes the Sample tag) or clear them out.</p><button class="btn btn-ghost btn-sm" data-delete-samples>Delete all sample products</button></div>` : ''}
      <div class="panel-card" style="padding:1rem">
        <input type="search" id="pf-q" placeholder="Search by name" value="${esc(pf.q)}" style="margin-bottom:.75rem">
        <p class="filter-label">Scent</p><div class="chips" style="margin:0 0 .75rem;padding:4px 0">${[['all', 'All'], ['allyear', 'All year round'], ['halloween', 'Halloween & Autumn'], ['christmas', 'Christmas & Winter'], ['fresh', 'Fresh'], ['floral', 'Floral'], ['fruity', 'Fruity'], ['sweet', 'Sweet']].map(([v, l]) => chip('scent', v, l)).join('')}</div>
        <p class="filter-label">Status</p><div class="chips" style="margin:0;padding:4px 0">${[['all', 'All'], ['live', 'On sale'], ['soldout', 'Sold out'], ['hidden', 'Hidden'], ['todo', 'Needs price or photo']].map(([v, l]) => chip('status', v, l)).join('')}</div>
      </div>
      <p class="muted small" role="status">${list.length} of ${products.length} products</p>
      ${list.length ? `<ul class="rows">${list.map((p) => `<li class="row"><img src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="">
        <div><span class="row-title">${esc(p.name)}</span> ${p.is_sample ? '<span class="tag sample">Sample</span>' : ''}${p.hidden ? '<span class="tag hidden">Hidden</span>' : ''}${p.variants.some((v) => !v.price_pence) ? '<span class="tag warn">Needs price</span>' : ''}${!p.image_url ? '<span class="tag">No photo</span>' : ''}${p.sold_out ? '<span class="tag warn">Marked sold out</span>' : !p.available ? '<span class="tag warn">Out of stock</span>' : ''}${p.scents.filter((s) => s === 'halloween' || s === 'christmas').map((s) => `<span class="tag">${s[0].toUpperCase() + s.slice(1)}</span>`).join('')}
          <p class="row-sub">${p.variants.map((v) => `${p.variants.length > 1 ? esc(v.label) + ' ' : ''}${gbp(v.price_pence)}, ${v.stock} in stock`).join(' | ')}</p></div>
        <button class="btn btn-ghost btn-sm" data-product="${esc(p.id)}">Edit</button></li>`).join('')}</ul>` : `<div class="empty"><p>${products.length ? 'No products match those filters.' : 'No products yet. Add your first one.'}</p></div>`}`;
    const search = $('#pf-q');
    search.oninput = () => { const pos = search.selectionStart; pf.q = search.value; showProducts(false).then(() => { const n = $('#pf-q'); n.focus(); n.setSelectionRange(pos, pos); }); };
  });
}

const variantRow = (v = {}, multi = false) => `<div class="variant${multi ? '' : ' single'}" data-vid="${esc(v.id || '')}">
  <div class="v-label"><label>Option name <span class="hint">e.g. Bag of 6, Large</span><input type="text" data-v="label" value="${esc(v.label && v.label !== 'Default' ? v.label : '')}" placeholder="e.g. Bag of 6"></label></div>
  <div><label>Price (£)<input type="text" inputmode="decimal" data-v="price" value="${v.price_pence != null && v.price_pence ? (v.price_pence / 100).toFixed(2) : ''}" placeholder="3.50" required></label></div>
  <div><label>In stock<input type="number" min="0" step="1" data-v="stock" value="${v.stock ?? 0}" required></label></div>
  <button type="button" class="link-btn v-remove" data-remove-variant aria-label="Remove this option">Remove</button></div>`;

let adminDefaults = { usage: '', safety: '' };
function openProduct(p) {
  const isNew = !p; p = p || { scents: [], variants: [{}], image_url: '', usage: adminDefaults.usage, safety: adminDefaults.safety, hidden: true };
  const multi = p.variants.length > 1 || !!p.option_name;
  const field = (id, label, hint, control) => `<div class="field"><label for="${id}">${label}${hint ? ` <span class="hint">${hint}</span>` : ''}</label>${control}</div>`;
  editor.innerHTML = `<form id="product-form"><h2 id="editor-title">${isNew ? 'Add product' : 'Edit product'}</h2><div class="form-msg"></div>
    <details class="help" style="margin-bottom:1.25rem"><summary>Quick guide: what each box does</summary><ol>
      <li><strong>Name, category and photo</strong> are what customers see first. Square photos on a plain background look best.</li>
      <li><strong>Price and stock</strong>: type the price in pounds (3.50, not £3.50). Stock counts down as people buy, and the product shows as sold out at 0.</li>
      <li><strong>Short description</strong> is one line under the name on the shop page. <strong>Full description</strong> is the “About this scent” text on the product page.</li>
      <li><strong>Seasonal?</strong> puts the product on the Seasonal page as well as its category. <strong>More details</strong> holds the weight and the usage and safety text. The usage and safety text is already filled in with our standard wording. Add anything specific to this scent from its CLP label.</li>
      <li>A new product starts <strong>hidden</strong>. Untick “Hide from shop” when it is ready to sell.</li></ol></details>

    <h3 class="form-section">1. The basics</h3>
    ${field('p-name', 'Product name', '', `<input id="p-name" type="text" value="${esc(p.name)}" required placeholder="e.g. Cherry Vanilla Snap Bar">`)}
    ${field('p-cat', 'Category', 'Which shop section it appears in', `<select id="p-cat">${CATEGORIES.map(([id, n]) => `<option value="${id}"${id === p.category ? ' selected' : ''}>${n}</option>`).join('')}</select>`)}
    <fieldset class="field" style="border:0;padding:0"><legend>Seasonal? <span class="hint">Tick one to put it on the Seasonal page as well. It stays in its category too.</span></legend><div class="checks">
      <label><input type="checkbox" name="scent" value="halloween"${p.scents.includes('halloween') ? ' checked' : ''}>Halloween &amp; Autumn</label>
      <label><input type="checkbox" name="scent" value="christmas"${p.scents.includes('christmas') ? ' checked' : ''}>Christmas &amp; Winter</label></div></fieldset>
    <fieldset class="field" style="border:0;padding:0"><legend>Scent type <span class="hint">Tick all that apply. Customers use these to filter the shop.</span></legend><div class="checks">${['fresh', 'floral', 'fruity', 'sweet'].map((s) => `<label><input type="checkbox" name="scent" value="${s}"${p.scents.includes(s) ? ' checked' : ''}>${s[0].toUpperCase() + s.slice(1)}</label>`).join('')}</div></fieldset>
    <div class="field"><label>Photo</label><div class="img-pick"><img id="p-img" src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="Current image">
      <div><input type="file" id="p-file" accept="image/jpeg,image/png,image/webp"><span class="hint" id="p-file-note">Choose a photo from your phone or computer. It is resized automatically.</span></div></div><input type="hidden" id="p-image-url" value="${esc(p.image_url)}"></div>

    <h3 class="form-section">2. Price and stock</h3>
    <div class="checks field"><label><input type="checkbox" id="p-multi"${multi ? ' checked' : ''}>This product comes in more than one size or option</label></div>
    <div id="multi-wrap"${multi ? '' : ' hidden'}>${field('p-option', 'What the customer chooses between', 'e.g. Size, Scent, Bag size', `<input id="p-option" type="text" value="${esc(p.option_name)}" placeholder="Size">`)}</div>
    <div id="variants">${p.variants.map((v) => variantRow(v, multi)).join('')}</div>
    <button type="button" class="btn btn-ghost btn-sm" id="add-variant"${multi ? '' : ' hidden'}>Add another option</button>

    <h3 class="form-section">3. Descriptions</h3>
    ${field('p-short', 'Short description', 'One line, shown under the name on the shop page', `<input id="p-short" type="text" maxlength="200" value="${esc(p.short_desc)}" placeholder="e.g. Sweet cherries with a creamy vanilla finish.">`)}
    ${field('p-desc', 'Full description', 'Shown on the product page under “About this scent”', `<textarea id="p-desc" placeholder="A few sentences about the scent, when it suits, and what makes it special.">${esc(p.description)}</textarea>`)}

    <details class="help" id="more-details"><summary>4. More details (weight, usage, safety, position)</summary>
      ${field('p-weight', 'Weight or size', 'Shown on the product page, e.g. 50g snap bar or Bag of 6 hearts, 45g', `<input id="p-weight" type="text" value="${esc(p.weight)}">`)}
      ${field('p-usage', 'Usage instructions', 'Standard wording is filled in. Change it only if this product is used differently.', `<textarea id="p-usage">${esc(p.usage)}</textarea>`)}
      ${field('p-safety', 'Safety information', 'Standard wording is filled in. Add any warnings or allergens specific to this scent from its CLP label.', `<textarea id="p-safety">${esc(p.safety)}</textarea>`)}
      ${field('p-sort', 'Position in lists', 'Lower numbers show first. Leave as is unless you want to move it.', `<input id="p-sort" type="number" step="1" value="${p.sort ?? 0}">`)}
      <details class="where"><summary>What does Position do?</summary>
        <p class="small">Products are laid out in order of their Position number, lowest first, on the shop page and the homepage. Two products with the same number are sorted by name. Give a product a low number, such as 1, to push it to the front, or a high number, such as 900, to send it to the back. Customers can still re-sort by price or name.</p>
        <img src="/assets/img/help/positions.webp" alt="" loading="lazy"></details>
    </details>

    <h3 class="form-section">5. Visibility</h3>
    <div class="checks field" style="flex-direction:column;align-items:flex-start;gap:.25rem">
      <label><input type="checkbox" id="p-hidden"${p.hidden ? ' checked' : ''}>Hide from shop <span class="hint">Customers cannot see it at all</span></label>
      <label><input type="checkbox" id="p-soldout"${p.sold_out ? ' checked' : ''}>Mark as sold out <span class="hint">Stays visible with a Sold out label</span></label>
      <label><input type="checkbox" id="p-featured"${p.featured ? ' checked' : ''}>Feature on homepage <span class="hint">Shows in “A few scents to start with”</span></label>
    </div>
    <div class="editor-actions"><button class="btn btn-primary" type="submit">Save product</button><button class="btn btn-ghost" type="button" data-close>Cancel</button>${isNew ? '' : '<button class="link-btn" type="button" id="p-delete" style="margin-left:auto;color:var(--danger)">Delete product</button>'}</div></form>`;
  editor.showModal();
  const form = $('#product-form');
  const setMulti = (on) => { $('#multi-wrap').hidden = !on; $('#add-variant').hidden = !on; $('#variants').classList.toggle('is-multi', on); form.querySelectorAll('.variant').forEach((r) => r.classList.toggle('single', !on)); };
  $('#p-multi').onchange = (e) => { setMulti(e.target.checked); if (e.target.checked && $('#variants').children.length === 1) $('#variants').insertAdjacentHTML('beforeend', variantRow({}, true)); };
  $('#add-variant').onclick = () => $('#variants').insertAdjacentHTML('beforeend', variantRow({}, true));
  $('#variants').onclick = (e) => { if (e.target.closest('[data-remove-variant]') && $('#variants').children.length > 1) e.target.closest('.variant').remove(); };
  if (!p.usage && !p.safety && !isNew) $('#more-details').open = true;
  $('#p-file').onchange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const note = $('#p-file-note'); note.textContent = 'Uploading…';
    try { const blob = await shrink(file); const { url } = await api('/images', { method: 'POST', body: blob, raw: true, type: blob.type }); $('#p-image-url').value = url; $('#p-img').src = url; note.textContent = `Uploaded. Click Save product to keep it.`; }
    catch (err) { note.textContent = err.message; }
  };
  if (!isNew) $('#p-delete').onclick = async () => { if (!confirm(`Delete “${p.name}”? This cannot be undone. Past orders keep their record of it.`)) return; try { await api(`/products/${p.id}`, { method: 'DELETE' }); editor.close(); flash('Product deleted'); showProducts(); } catch (err) { fieldErrors(form, err); } };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const isMulti = $('#p-multi').checked;
    const rows = [...$('#variants').children];
    const body = {
      name: $('#p-name').value, category: $('#p-cat').value, sort: parseInt($('#p-sort').value, 10) || 0,
      scents: [...form.querySelectorAll('[name=scent]:checked')].map((c) => c.value), image_url: $('#p-image-url').value,
      short_desc: $('#p-short').value, description: $('#p-desc').value, option_name: isMulti ? $('#p-option').value : '', weight: $('#p-weight').value,
      usage: $('#p-usage').value, safety: $('#p-safety').value, featured: $('#p-featured').checked, sold_out: $('#p-soldout').checked, hidden: $('#p-hidden').checked,
      variants: (isMulti ? rows : rows.slice(0, 1)).map((row) => ({ id: row.dataset.vid || undefined, label: isMulti ? $('[data-v=label]', row).value : 'Default', price_pence: toPence($('[data-v=price]', row).value), stock: parseInt($('[data-v=stock]', row).value, 10) })),
    };
    try { await api(isNew ? '/products' : `/products/${p.id}`, { method: isNew ? 'POST' : 'PUT', body }); editor.close(); flash('Product saved'); showProducts(); }
    catch (err) { fieldErrors(form, err); }
  };
}

// Resize to max 1200px and re-encode as WebP (falls back to JPEG) so uploads stay small.
async function shrink(file) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
  const c = Object.assign(document.createElement('canvas'), { width: Math.round(bmp.width * scale), height: Math.round(bmp.height * scale) });
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  const blob = (type, q) => new Promise((r) => c.toBlob(r, type, q));
  let out = await blob('image/webp', 0.82);
  if (!out || out.type !== 'image/webp') out = await blob('image/jpeg', 0.85);
  return out;
}


// Collapsible "Where does this appear?" panel with an annotated screenshot of the shop.
const where = (imgs, legend) => `<details class="where"><summary>Where does this appear on the shop?</summary>
  <ol class="where-legend">${legend.map((l) => `<li>${l}</li>`).join('')}</ol>
  ${imgs.map((i) => `<img src="/assets/img/help/${i}.webp" alt="" loading="lazy">`).join('')}</details>`;

/* ── Settings ───────────────────────────────────────────────────────────── */
async function showSettings() {
  const [{ settings: s }, me] = await Promise.all([api('/settings'), api('/me')]);
  const text = (k, label, hint = '', area = false) => `<div class="field"><label for="s-${k}">${label}${hint ? ` <span class="hint">${hint}</span>` : ''}</label>${area ? `<textarea id="s-${k}" data-k="${k}">${esc(s[k])}</textarea>` : `<input id="s-${k}" data-k="${k}" type="text" value="${esc(s[k])}">`}</div>`;
  const money = (k, label, hint) => `<div class="field"><label for="s-${k}">${label} <span class="hint">${hint}</span></label><input id="s-${k}" data-money="${k}" type="text" inputmode="decimal" value="${s[k] && s[k] !== '0' ? (s[k] / 100).toFixed(2) : ''}"></div>`;
  panel.innerHTML = `<div class="bar"><h1>Delivery &amp; settings</h1></div><form id="settings-form"><div class="form-msg"></div>
    <div class="panel-card"><h2>Status</h2><dl class="kv"><dt>Payments</dt><dd>${{ demo: 'Demo mode. Stripe keys are not set, so no payments can be taken.', test: 'Stripe TEST mode. Only test cards work; no real money moves.', live: 'Stripe LIVE mode. Real payments.' }[me.payment_mode]}</dd>
      <dt>Order emails</dt><dd>${me.email_configured ? 'On' : 'Off. No email provider is configured.'}</dd></dl></div>
    <div class="panel-card"><h2>Delivery (UK only)</h2>${where(['delivery-1', 'delivery-2'], ['Delivery name and charge, in the basket and at checkout', 'Free delivery message (only shown when a threshold is set)', 'Dispatch estimate, on every product page and in order emails'])}<div class="row-2">${money('delivery_pence', 'Delivery charge (£)', 'Flat rate per order')}${money('free_delivery_threshold_pence', 'Free delivery over (£)', 'Leave blank for no free delivery')}</div>
      ${text('delivery_name', 'Delivery name', 'Shown in the basket and on Stripe')}${text('dispatch_estimate', 'Dispatch estimate', 'Shown on product pages and confirmations')}</div>
    <div class="panel-card"><h2>Homepage wording</h2>${where(['wording-1', 'wording-2'], ['Announcement bar, across the top of every page (blank = hidden)', 'Headline', 'Line under the headline', 'About section title', 'About section text'])}${text('announcement', 'Announcement bar', 'Leave blank to hide')}${text('hero_headline', 'Headline', 'Use | where you want a new line')}${text('hero_sub', 'Line under the headline')}${text('intro_title', 'About section title')}${text('intro_text', 'About section text', '', true)}</div>
    <div class="panel-card"><h2>Business details</h2>${where(['business-1', 'business-2'], ['Contact page: email, phone and address', 'Footer on every page: contact email'])}
      ${text('business_name', 'Business name')}${text('contact_email', 'Public contact email')}${text('contact_phone', 'Public phone number', 'Optional')}${text('business_address', 'Business address', '', true)}${text('order_notify_email', 'Send new-order alerts to', 'Needs an email provider')}</div>
    <button class="btn btn-primary" type="submit">Save settings</button></form>`;
  $('#settings-form').onsubmit = async (e) => {
    e.preventDefault();
    const body = {};
    panel.querySelectorAll('[data-k]').forEach((i) => (body[i.dataset.k] = i.value));
    for (const i of panel.querySelectorAll('[data-money]')) { const p = i.value.trim() === '' ? 0 : toPence(i.value); body[i.dataset.money] = Number.isNaN(p) ? 'x' : String(p); }
    try { await api('/settings', { method: 'PUT', body }); flash('Settings saved'); showSettings(); } catch (err) { fieldErrors(e.target, err); }
  };
}

/* ── Pages ──────────────────────────────────────────────────────────────── */
async function showPages() {
  const { pages } = await api('/pages');
  panel.innerHTML = `<div class="bar"><h1>Pages</h1></div><ul class="rows">${pages.map((p) => `<li class="row order"><div><span class="row-title">${esc(p.title)}</span> ${p.needs_review ? '<span class="tag sample">Placeholder, needs completing</span>' : '<span class="tag paid">Ready</span>'}<p class="row-sub">/${esc(p.slug)}, updated ${when(p.updated_at)}</p></div><button class="btn btn-ghost btn-sm" data-page="${esc(p.slug)}">Edit</button></li>`).join('')}</ul>`;
  panel.onclick = null;
  panel.querySelectorAll('[data-page]').forEach((b) => (b.onclick = () => {
    const p = pages.find((x) => x.slug === b.dataset.page);
    editor.innerHTML = `<form id="page-form"><h2 id="editor-title">Edit ${esc(p.title)}</h2><div class="form-msg"></div>
      <div class="field"><label for="pg-title">Title</label><input id="pg-title" type="text" value="${esc(p.title)}"></div>
      <div class="field"><label for="pg-body">Content <span class="hint">Blank line = new paragraph. Start a line with ## for a heading or - for a bullet. On the FAQ page, start a line with Q: for a question and put the answer on the line below.</span></label><textarea id="pg-body" class="tall">${esc(p.body)}</textarea></div>
      <div class="checks field"><label><input type="checkbox" id="pg-review"${p.needs_review ? ' checked' : ''}>Still a placeholder (shows a notice on the page)</label></div>
      <div class="editor-actions"><button class="btn btn-primary" type="submit">Save page</button><button class="btn btn-ghost" type="button" data-close>Cancel</button></div></form>`;
    editor.showModal();
    $('#page-form').onsubmit = async (e) => { e.preventDefault(); try { await api(`/pages/${p.slug}`, { method: 'PUT', body: { title: $('#pg-title').value, body: $('#pg-body').value, needs_review: $('#pg-review').checked } }); editor.close(); flash('Page saved'); showPages(); } catch (err) { fieldErrors(e.target, err); } };
  }));
}

/* ── Blog ───────────────────────────────────────────────────────────────── */
let posts = [];
async function showBlog() {
  ({ posts } = await api('/posts'));
  panel.innerHTML = `<div class="bar"><h1>Blog</h1><button class="btn btn-primary btn-sm" data-new-post>Add post</button></div>
    ${posts.length ? `<ul class="rows">${posts.map((p) => `<li class="row"><img src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="" style="object-fit:contain">
      <div><span class="row-title">${esc(p.title)}</span> ${p.published ? '<span class="tag paid">Published</span>' : '<span class="tag hidden">Draft</span>'}
        <p class="row-sub">${when(p.published_at)}</p></div>
      <button class="btn btn-ghost btn-sm" data-post="${esc(p.slug)}">Edit</button></li>`).join('')}</ul>` : `<div class="empty"><p>No posts yet.</p></div>`}`;
}

function openPost(p) {
  const isNew = !p; p = p || { published: true, image_url: '' };
  editor.innerHTML = `<form id="post-form"><h2 id="editor-title">${isNew ? 'Add post' : 'Edit post'}</h2><div class="form-msg"></div>
    <div class="field"><label for="b-title">Title</label><input id="b-title" type="text" value="${esc(p.title)}" required></div>
    <div class="field"><label for="b-excerpt">Short summary <span class="hint">Shown on the blog list and under the title</span></label><textarea id="b-excerpt" style="min-height:80px" maxlength="300">${esc(p.excerpt)}</textarea></div>
    <div class="field"><label>Image</label><div class="img-pick"><img id="b-img" src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="Current image" style="object-fit:contain">
      <div><input type="file" id="b-file" accept="image/jpeg,image/png,image/webp"><span class="hint" id="b-file-note">Photos are resized and compressed automatically before upload.</span></div></div><input type="hidden" id="b-image-url" value="${esc(p.image_url)}"></div>
    <div class="field"><label for="b-body">Post <span class="hint">Blank line = new paragraph. Start a line with ## for a heading or - for a bullet.</span></label><textarea id="b-body" class="tall">${esc(p.body)}</textarea></div>
    <div class="checks field"><label><input type="checkbox" id="b-published"${p.published ? ' checked' : ''}>Published (untick to keep as a draft)</label></div>
    <div class="editor-actions"><button class="btn btn-primary" type="submit">Save post</button><button class="btn btn-ghost" type="button" data-close>Cancel</button>${isNew ? '' : '<button class="link-btn" type="button" id="b-delete" style="margin-left:auto;color:var(--danger)">Delete post</button>'}</div></form>`;
  editor.showModal();
  const form = $('#post-form');
  $('#b-file').onchange = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const note = $('#b-file-note'); note.textContent = 'Uploading…';
    try { const blob = await shrink(file); const { url } = await api('/images', { method: 'POST', body: blob, raw: true, type: blob.type }); $('#b-image-url').value = url; $('#b-img').src = url; note.textContent = 'Uploaded. Save the post to keep it.'; }
    catch (err) { note.textContent = err.message; }
  };
  if (!isNew) $('#b-delete').onclick = async () => { if (!confirm(`Delete “${p.title}”? This cannot be undone.`)) return; try { await api(`/posts/${p.slug}`, { method: 'DELETE' }); editor.close(); flash('Post deleted'); showBlog(); } catch (err) { fieldErrors(form, err); } };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const body = { title: $('#b-title').value, excerpt: $('#b-excerpt').value, body: $('#b-body').value, image_url: $('#b-image-url').value, published: $('#b-published').checked, published_at: p.published_at };
    try { await api(isNew ? '/posts' : `/posts/${p.slug}`, { method: isNew ? 'POST' : 'PUT', body }); editor.close(); flash('Post saved'); showBlog(); }
    catch (err) { fieldErrors(form, err); }
  };
}

/* ── Help ───────────────────────────────────────────────────────────────── */
function showHelp() {
  const step = (title, items) => `<details class="help"><summary>${title}</summary><ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol></details>`;
  panel.innerHTML = `<div class="bar"><h1>How to run the shop</h1></div>
  <p class="muted">Everything here is done in this admin area. Changes go live as soon as you click Save, so there is nothing else to publish. If something looks wrong on the shop after a change, reload the page first.</p>
  <div class="panel-card"><h2>Products</h2>
  ${step('Put a new scent on sale', ['Open the <strong>Products</strong> tab and use the filters to find it (the <em>Needs price or photo</em> button lists everything not yet finished).', 'Click <strong>Edit</strong>. Type the price in pounds (for example 3.50) and how many you have in stock.', 'Click <strong>Choose File</strong> under Image and pick a photo from your phone or computer. Square photos look best.', 'Fill in the short description (shown on the shop page), the full description, and the usage and safety text from the CLP label.', 'Untick <strong>Hide from shop</strong>, then click <strong>Save product</strong>.'])}
  ${step('Add a brand-new product', ['Products tab → <strong>Add product</strong>.', 'Give it a name, choose the category (Snap Bars, Wax Melt Shapes, Sample Boxes, Gift Sets or Accessories) and tick the scent filters that apply.', 'If it comes in sizes or scents, type what the customer chooses between (for example <em>Size</em>) and click <strong>Add another option</strong> for each one, with its own price and stock.', 'Add a photo, price, stock and descriptions, then Save.'])}
  ${step('Change a price or stock level', ['Products tab → search for the product → <strong>Edit</strong>.', 'Change the price or stock number and click <strong>Save product</strong>. Stock goes down by itself when customers buy.'])}
  ${step('Mark something as sold out, or take it off the shop', ['Edit the product.', '<strong>Mark as sold out</strong> keeps it visible with a Sold out label. <strong>Hide from shop</strong> removes it completely.', 'Untick the box again when it is back.'])}
  ${step('Feature a product on the homepage', ['Edit the product and tick <strong>Feature on homepage</strong>. The first eight featured products show in the “A few scents to start with” section.', 'The <strong>Position</strong> number decides the order everywhere. Lower numbers show first.'])}
  </div>
  <div class="panel-card"><h2>Orders</h2>
  ${step('When an order comes in', ['You get an email headed <em>New paid order</em>. The customer gets a confirmation at the same time.', 'Open the <strong>Orders</strong> tab. Paid orders are listed newest first. Click <strong>Open</strong> to see what was bought and the delivery address.', 'Click <strong>Print packing slip</strong> to print a note to go in the parcel, and <strong>Print address label</strong> for a 6×4 inch label (or plain paper). Both open in a new window with a Print button; if nothing opens, allow pop-ups for this site.', 'Pack it, then change <strong>Fulfilment status</strong> to <em>dispatched</em> and click <strong>Save order</strong>. Use the Private note for tracking numbers or anything to remember.', 'Only orders marked <strong>paid</strong> should be sent. Anything under “Unpaid, expired and demo” was never paid for.', 'To remove an order completely, open it and click <strong>Delete order</strong>. Use this for test orders and abandoned checkouts. Keep real paid orders, even cancelled ones, because sales records normally have to be kept for tax.'])}
  ${step('Refund a customer', [
    'Refunds are made in Stripe, the company that takes the card payments. The money goes back to the card the customer paid with; you cannot refund to a different card or by bank transfer.',
    'In the <strong>Orders</strong> tab, click <strong>Open</strong> on the order and click the <strong>Open payment in Stripe</strong> button. It takes you straight to that payment. If Stripe asks you to log in, use the Stripe account details (<a href="https://dashboard.stripe.com/login" target="_blank" rel="noopener">dashboard.stripe.com/login</a>).',
    'On the payment page click <strong>Refund</strong> at the top right. For a full refund leave the amount as it is. For a partial refund, for example one item out of three, change the amount to what you are giving back.',
    'Pick a reason (<em>Requested by customer</em> is the usual one) and click <strong>Refund</strong>. Stripe shows the payment as Refunded or Partially refunded within a few seconds.',
    'Back in this admin area, set the order’s <strong>Fulfilment status</strong> to <em>cancelled</em> if it is not being sent, and write what you refunded and why in the <strong>Private note</strong>. Click <strong>Save order</strong>.',
    'Tell the customer by email. Refunds take 5 to 10 working days to show on their statement, and Stripe’s card fees are not returned to you, so a refund costs you a small amount even when the item comes back.',
    'If you cannot find the payment, search Stripe for the order number (OTR-…) or the customer’s email address: <a href="https://dashboard.stripe.com/payments" target="_blank" rel="noopener">dashboard.stripe.com/payments</a>. Test-mode orders are under <a href="https://dashboard.stripe.com/test/payments" target="_blank" rel="noopener">dashboard.stripe.com/test/payments</a>.',
  ])}
  ${step('Cancel an order before it is sent', ['Refund it in Stripe as above, then set the fulfilment status to <em>cancelled</em> here. Stock is not put back automatically, so add the items back to stock in the Products tab if they are going back on the shelf.'])}
  </div>
  <div class="panel-card"><h2>Wording and pages</h2>
  ${step('Change the homepage wording, delivery charge or business details', ['Open <strong>Delivery &amp; settings</strong>. Each section has a “Where does this appear on the shop?” link showing exactly what each box changes.', 'Edit the boxes and click <strong>Save settings</strong> at the bottom.', 'The announcement bar is handy for “Christmas orders by 18 December” type notices. Leave it blank to hide it.'])}
  ${step('Edit the Contact, Delivery, Privacy, Terms or FAQ pages', ['Open <strong>Pages</strong> and click <strong>Edit</strong>.', 'Leave a blank line between paragraphs. Start a line with <code>## </code> for a heading, <code>- </code> for a bullet, or <code>Q: </code> for an FAQ question (answer on the next line).', 'Untick <strong>Still a placeholder</strong> once the page is finished, then Save.'])}
  ${step('Write a blog post', ['Open <strong>Blog</strong> → <strong>Add post</strong>.', 'Add a title, a one-line summary, a photo and the post itself (same formatting rules as pages).', 'Untick <strong>Published</strong> to save it as a draft and come back later.'])}
  </div>
  <div class="panel-card"><h2>Signing in</h2>
  ${step('Getting in and out', ['Go to <strong>https://www.overtherainbowwaxmelts.co.uk/admin/</strong>. Sign in with Google, or ask for a code to be emailed to you.', 'You stay signed in for 24 hours on that device. Click <strong>Sign out</strong> at the top right if you are on a shared computer.', 'Only email addresses on the allowed list can get in. Adding someone new is done in Cloudflare, not here.'])}
  </div>`;
  return Promise.resolve();
}

/* ── Wiring ─────────────────────────────────────────────────────────────── */
const TABS = { orders: showOrders, products: showProducts, settings: showSettings, pages: showPages, blog: showBlog, help: showHelp };
function go(tab) {
  document.querySelectorAll('[role=tab]').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === tab)));
  panel.setAttribute('aria-labelledby', `tab-${tab}`);
  history.replaceState(null, '', `#${tab}`);
  TABS[tab]().catch(fail);
}
document.addEventListener('click', (e) => {
  const t = e.target;
  if (t.closest('[data-pf]')) { const c = t.closest('[data-pf]'); pf[c.dataset.pf] = c.dataset.v; showProducts(false); }
  else if (t.closest('[data-tab]')) go(t.closest('[data-tab]').dataset.tab);
  else if (t.closest('[data-close]')) editor.close();
  else if (t.closest('[data-order]')) openOrder(t.closest('[data-order]').dataset.order).catch(fail);
  else if (t.closest('[data-product]')) openProduct(products.find((p) => p.id === t.closest('[data-product]').dataset.product));
  else if (t.closest('[data-new-product]')) openProduct(null);
  else if (t.closest('[data-post]')) openPost(posts.find((p) => p.slug === t.closest('[data-post]').dataset.post));
  else if (t.closest('[data-new-post]')) openPost(null);
  else if (t.closest('[data-delete-samples]')) { if (confirm('Delete every product still tagged Sample?')) api('/sample', { method: 'DELETE' }).then((r) => { flash(`${r.deleted} sample products deleted`); showProducts(); }).catch(fail); }
});
api('/me').then((me) => { adminDefaults = me.defaults || adminDefaults; $('#who').textContent = `Signed in as ${me.email}`; go(TABS[location.hash.slice(1)] ? location.hash.slice(1) : 'orders'); }).catch(fail);
