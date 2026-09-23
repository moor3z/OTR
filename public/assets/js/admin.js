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
  const step = (title, items, id = '') => `<details class="help"${id ? ` id="${id}"` : ''}><summary>${title}</summary><ol>${items.map((i) => `<li>${i}</li>`).join('')}</ol></details>`;
  const tab = (name) => `<button type="button" class="linklike" data-tab="${name}"><strong>${name === 'settings' ? 'Delivery &amp; settings' : name[0].toUpperCase() + name.slice(1)}</strong></button>`;
  panel.innerHTML = `<div class="bar"><h1>How to run the shop</h1></div>
  <p class="muted">Everything is done in this admin area. When you click <strong>Save</strong> it is live on the shop straight away. There is no separate “publish” step.</p>

  <div class="panel-card">
    <h2>Your routine when an order comes in</h2>
    <ol class="routine">
      <li><span>1</span><div><strong>You get an email: “New paid order”.</strong><br>The customer gets their confirmation at the same time. Nothing to do yet.</div></li>
      <li><span>2</span><div><strong>Open ${tab('orders')} and click <em>Open</em> on the order.</strong><br>It shows what they bought and where to send it.</div></li>
      <li><span>3</span><div><strong>Click <em>Print packing slip</em> and <em>Print address label</em>.</strong><br>Packing slip goes in the parcel. The label is 6×4 inch, or print on plain paper and cut it out.</div></li>
      <li><span>4</span><div><strong>Post it, then set <em>Fulfilment status</em> to “dispatched” and click <em>Save order</em>.</strong><br>Pop the tracking number in the <em>Private note</em> if there is one. That’s it.</div></li>
    </ol>
    <p class="muted small">Only send orders that say <strong>paid</strong>. Anything under “Unpaid, expired and demo” was never paid for. Stock goes down by itself when someone buys.</p>
  </div>

  <div class="panel-card">
    <h2>I want to…</h2>
    <ul class="want">
      <li><a href="#h-price">change a price or stock number</a></li>
      <li><a href="#h-photo">add a photo or put a new scent on sale</a></li>
      <li><a href="#h-new">add a brand-new product</a></li>
      <li><a href="#h-soldout">mark something sold out or hide it</a></li>
      <li><a href="#h-refund">refund or cancel an order</a></li>
      <li><a href="#h-notice">put a notice on the shop (e.g. Christmas last order date)</a></li>
      <li><a href="#h-pages">change the wording on a page or the FAQ</a></li>
      <li><a href="#h-blog">write a blog post</a></li>
      <li><a href="#h-signin">sign in without problems</a></li>
      <li><a href="#h-wrong">fix something that looks wrong</a></li>
    </ul>
  </div>

  <div class="panel-card"><h2>Products</h2>
  ${step('Change a price or stock number', ['' + tab('products') + ' → find the product (type its name in the search box) → <strong>Edit</strong>.', 'Change the number. Prices are in pounds, so 3.50 is £3.50.', 'Click <strong>Save product</strong>.'], 'h-price')}
  ${step('Add a photo, or put a new scent on sale', ['' + tab('products') + ' → click the <strong>Needs price or photo</strong> filter. It lists everything not finished yet.', 'Click <strong>Edit</strong> on one.', 'Under Image click <strong>Choose file</strong> and pick a photo. Square photos look best. It resizes itself, so any phone photo is fine.', 'Type the price and how many you have.', 'Check the short description (one line, shown on the shop page) and the full description.', 'Untick <strong>Hide from shop</strong>. Click <strong>Save product</strong>. Done: it is on the shop now.'], 'h-photo')}
  ${step('Add a brand-new product', ['' + tab('products') + ' → <strong>Add product</strong>.', 'Name, then choose the category (Snap Bars, Wax Melt Shapes, Sample Boxes, Gift Sets or Accessories).', 'Tick the scent filters that fit (Fresh, Floral, Fruity, Sweet, Halloween, Christmas). Halloween and Christmas also put it in the Seasonal section.', 'Only if it comes in sizes or scents: type what the customer picks (for example <em>Size</em>) and click <strong>Add another option</strong> for each one, each with its own price and stock.', 'Add a photo, price, stock and descriptions, then <strong>Save product</strong>.'], 'h-new')}
  ${step('Mark something sold out, or take it off the shop', ['<strong>Edit</strong> the product.', 'Tick <strong>Mark as sold out</strong> to keep it on the shop with a Sold out label (good for “back soon”). Tick <strong>Hide from shop</strong> to remove it completely.', 'Untick the box when it is back. <strong>Save product</strong>.'], 'h-soldout')}
  ${step('Choose what shows on the homepage', ['<strong>Edit</strong> a product and tick <strong>Feature on homepage</strong>. The first eight featured products show on the front page.', 'The <strong>Position</strong> number sets the order everywhere. Lower numbers come first, so 1 is the top.'])}
  </div>

  <div class="panel-card"><h2>Orders</h2>
  ${step('Refund or cancel an order', [
    'Refunds happen in <strong>Stripe</strong> (the company that takes the card payments), not here. The money goes back to the card they paid with.',
    '' + tab('orders') + ' → <strong>Open</strong> the order → click <strong>Open payment in Stripe</strong>. It takes you straight to that payment.',
    'In Stripe click <strong>Refund</strong> (top right). Leave the amount as it is for a full refund, or change it for a partial one. Reason: <em>Requested by customer</em>. Click <strong>Refund</strong>.',
    'Back here, set <strong>Fulfilment status</strong> to <em>cancelled</em> if it is not being sent, write what you refunded in the <strong>Private note</strong>, and <strong>Save order</strong>.',
    'Email the customer. Refunds take 5–10 working days to appear on their statement.',
    'If the items are going back on the shelf, add them back to stock in ' + tab('products') + ' (stock is not put back automatically).',
  ], 'h-refund')}
  ${step('Delete an order', ['<strong>Open</strong> the order → <strong>Delete order</strong>. Use this for test orders and abandoned checkouts.', 'Keep real paid orders, even cancelled ones. Sales records normally have to be kept for tax.'])}
  ${step('Find a payment in Stripe', ['Search Stripe for the order number (OTR-…) or the customer’s email: <a href="https://dashboard.stripe.com/payments" target="_blank" rel="noopener">dashboard.stripe.com/payments</a>.', 'Payouts to your bank are under <a href="https://dashboard.stripe.com/balance" target="_blank" rel="noopener">dashboard.stripe.com/balance</a>. The <strong>Stripe Dashboard</strong> app on your phone shows the same without logging in through a browser.'])}
  </div>

  <div class="panel-card"><h2>Wording and pages</h2>
  ${step('Put a notice on the shop', ['' + tab('settings') + ' → <strong>Announcement bar</strong>. Type the message, for example “Last Christmas orders: 18 December”.', 'Click <strong>Save settings</strong>. It shows in the pink bar at the top of every page. Clear the box and Save to remove it.'], 'h-notice')}
  ${step('Change the delivery charge, homepage wording or business details', ['' + tab('settings') + '. Each section has a “Where does this appear on the shop?” link with a picture showing exactly what each box changes.', 'Edit, then <strong>Save settings</strong> at the bottom.'])}
  ${step('Edit the Contact, Delivery, Privacy, Terms or FAQ pages', ['' + tab('pages') + ' → <strong>Edit</strong>.', 'Leave a blank line between paragraphs.', 'Start a line with <code>## </code> for a heading, <code>- </code> for a bullet point.', 'On the FAQ page: <code>Q: </code> then the question, answer on the next line. The first five questions also show on the homepage.', 'Untick <strong>Still a placeholder</strong> once the page is finished. <strong>Save</strong>.'], 'h-pages')}
  ${step('Write a blog post', ['' + tab('blog') + ' → <strong>Add post</strong>.', 'Title, a one-line summary, a photo, and the post itself (same formatting as pages).', 'Untick <strong>Published</strong> to keep it as a draft and come back later. Tick it when it is ready.'], 'h-blog')}
  </div>

  <div class="panel-card"><h2>Signing in</h2>
  ${step('The easy way (do this once on your phone)', ['Open <strong>Chrome</strong> (not a link from a message or an app) and go to <strong>www.overtherainbowwaxmelts.co.uk/admin</strong>.', 'Tap the ⋮ menu → <strong>Add to Home screen</strong>. Use that icon from now on.', 'When asked to sign in, type your email and you will be sent a code. Type the code in. You stay signed in for 24 hours on that device.'], 'h-signin')}
  ${step('Getting a Google “401” or “error” page when signing in', ['This happens when the link was opened inside another app (Messages, WhatsApp, Facebook, Gmail). Google refuses to sign in from there.', 'Close it, open Chrome yourself and use the home-screen icon instead.', 'Still stuck? Choose <strong>email me a code</strong> instead of Google. It always works.'])}
  ${step('Who can sign in', ['Only the email addresses on the allowed list. Adding someone is done in Cloudflare (ask Steven), not here.', 'Click <strong>Sign out</strong> (top right) if you are on someone else’s computer.'])}
  </div>

  <div class="panel-card"><h2>Something looks wrong?</h2>
  ${step('My change is not showing on the shop', ['Did you click Save? A green “Saved” message appears at the top when it worked.', 'Reload the shop page (pull down on your phone, or F5 on a computer). Changes can take up to a minute to appear.', 'For products: check <strong>Hide from shop</strong> is unticked and the stock is not 0.'], 'h-wrong')}
  ${step('A print window did not open', ['Your browser blocked a pop-up. Look for a small icon in the address bar and choose “always allow” for this site, then click Print again.'])}
  ${step('A customer says they paid but there is no order', ['Check ' + tab('orders') + ' under “Unpaid, expired and demo”: if it is there, the payment did not go through.', 'Search Stripe for their email address. If Stripe shows the payment as succeeded, tell Steven.'])}
  ${step('Anything else', ['Nothing you do here can break the shop. Products, pages and settings can all be changed back. Orders you delete are gone though.', 'If in doubt, send Steven a screenshot.'])}
  </div>`;
  panel.querySelectorAll('.want a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); const d = $(a.getAttribute('href')); if (d) { d.open = true; d.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }));
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
