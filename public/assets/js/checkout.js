import { api, basket, gbp, esc, $ } from './site.js?v=61';
import { totalsHtml, dealHints } from './basket.js?v=61';

const form = $('#checkout-form'), btn = $('#pay-btn'), errBox = $('#form-error');
const SAVED = 'otr_checkout_details';

// How the order reaches the customer: post, local delivery or collection.
// The options (and prices) come from the server; the chosen one re-prices the summary.
let options = [], method = 'post', quoteSeq = 0;
const chosen = () => options.find((o) => o.id === method) || options[0];

if (!basket.read().length) {
  $('#checkout-root').innerHTML = `<div class="empty"><h2>Your basket is empty</h2><p>Add something to your basket before checking out.</p><a class="btn btn-primary" href="/shop">Shop Wax Melts</a></div>`;
} else {
  // Restore details if the customer comes back from a cancelled payment (this tab only)
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem(SAVED) || '{}'); for (const [k, v] of Object.entries(saved)) if (form[k] && k !== 'slot') form[k].value = v; } catch {}

  api('/api/config').then((c) => {
    if (c.payment_mode === 'demo') { btn.textContent = 'Continue to demo checkout'; $('#pay-note').textContent = 'Demo mode: payments are not connected, so no payment will be taken and no order will be placed.'; }
    options = Array.isArray(c.fulfilment) ? c.fulfilment : [];
    if (options.length > 1) {
      if (options.some((o) => o.id === saved.method)) method = saved.method;
      renderOptions(saved.slot);
    }
    refreshSummary();
  }).catch(() => refreshSummary());

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();
    const customer = Object.fromEntries(new FormData(form)); customer.country = 'GB';
    const slot = $('#slot-field').hidden ? '' : $('#slot').value;
    delete customer.slot;
    try { sessionStorage.setItem(SAVED, JSON.stringify({ ...customer, method, slot })); } catch {}
    btn.classList.add('is-loading'); btn.disabled = true;
    try {
      const out = await api('/api/checkout', { method: 'POST', body: JSON.stringify({ customer, items: basket.payload(), method, slot }) });
      location.assign(out.url);
    } catch (err) {
      btn.classList.remove('is-loading'); btn.disabled = false;
      if (err.status === 409) { location.assign('/basket'); return; }
      showErrors(err.message, err.data?.fields || {});
    }
  });
}

function optionHtml(o) {
  const price = o.id === 'post'
    ? (o.free_over_pence ? `${gbp(o.pence)}<span class="hint" style="font-weight:400">free over ${gbp(o.free_over_pence).replace(/\.00$/, '')}</span>` : gbp(o.pence))
    : o.pence ? gbp(o.pence) : 'Free';
  const sub = o.id === 'local'
    ? `Delivered by hand within <b>${esc(String(o.radius_miles))} miles${o.from ? ' of ' + esc(o.from) : ''}</b>${o.slots.length ? `. ${esc(o.slots.join(' · '))}` : ''}`
    : o.id === 'collect'
      ? `Pick up from <b>${esc(o.address.split(/\r?\n/)[0])}</b>${o.slots.length ? `. ${esc(o.slots.join(' · '))}` : ''}`
      : 'Posted to any UK address';
  return `<label class="how-opt"><input type="radio" name="method" value="${o.id}"${o.id === method ? ' checked' : ''}><span class="how-name">${esc(o.name)}</span><span class="how-price">${price}</span><span class="how-sub">${sub}</span></label>`;
}

function renderOptions(savedSlot) {
  $('#how').hidden = false;
  $('#how-options').innerHTML = options.map(optionHtml).join('');
  $('#how-options').addEventListener('change', (e) => { if (e.target.name === 'method') { method = e.target.value; applyMethod(); refreshSummary(); } });
  applyMethod(savedSlot);
}

// Show the right fields for the chosen option: a time to pick, no address for
// collection, and a phone number that is needed for anything hand-delivered.
function applyMethod(savedSlot) {
  const o = chosen(); if (!o) return;
  const collect = o.id === 'collect';
  const slotField = $('#slot-field'), slot = $('#slot');
  if (o.slots.length) {
    const current = savedSlot || slot.value;
    slot.innerHTML = o.slots.map((s) => `<option${s === current ? ' selected' : ''}>${esc(s)}</option>`).join('');
    $('#slot-label').textContent = collect ? 'When will you collect?' : 'Which delivery time suits you?';
    slotField.hidden = false;
  } else slotField.hidden = true;
  const note = $('#how-note'); note.textContent = o.note || ''; note.hidden = !o.note;
  $('#addr-title').textContent = collect ? 'Your details' : o.id === 'local' ? 'Delivery address' : 'Delivery address';
  $('#name-label').textContent = collect ? 'Name of the person collecting' : 'Full name';
  $('#addr-fields').hidden = collect;
  $('#addr-fields').querySelectorAll('input').forEach((i) => { i.disabled = collect; });
  $('#phone-hint').textContent = collect ? 'So we can tell you when it is ready' : o.id === 'local' ? 'So we can reach you about the delivery' : 'Optional, only used if there is a delivery problem';
  $('#phone').required = !(o.id === 'post');
}

function refreshSummary() {
  const mine = ++quoteSeq;
  api('/api/quote', { method: 'POST', body: JSON.stringify({ items: basket.payload(), method }) }).then((q) => {
    if (mine !== quoteSeq) return;
    if (!q.ok) { location.replace('/basket'); return; }
    $('#summary').innerHTML = `<ul class="lines">${q.lines.map((l) => `<li style="display:flex;justify-content:space-between;gap:1rem;padding:.5rem 0"><span>${esc(l.name)}${l.label ? ` <span class="muted">(${esc(l.label)})</span>` : ''} × ${l.qty}</span><strong>${gbp(l.line_pence)}</strong></li>`).join('')}</ul>${dealHints(q)}${totalsHtml(q)}`;
  }).catch((e) => { $('#summary').innerHTML = `<p class="field-error">${esc(e.message)}</p>`; });
}

function clearErrors() {
  errBox.innerHTML = '';
  form.querySelectorAll('.field-error').forEach((n) => n.remove());
  form.querySelectorAll('[aria-invalid]').forEach((n) => { n.removeAttribute('aria-invalid'); n.removeAttribute('aria-describedby'); });
}
function showErrors(message, fields) {
  const names = Object.keys(fields);
  errBox.innerHTML = `<div class="notice notice-error"><h2>${esc(message)}</h2>${names.length ? `<ul style="margin:0;padding-left:1.25rem">${names.map((n) => `<li><a href="#${n === 'method' ? 'how' : n}">${esc(fields[n])}</a></li>`).join('')}</ul>` : ''}</div>`;
  for (const n of names) {
    const input = n === 'method' ? $('#how-options') : form[n]; if (!input) continue;
    if (n !== 'method') { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', `${n}-error`); }
    input.insertAdjacentHTML('afterend', `<p class="field-error" id="${n}-error">${esc(fields[n])}</p>`);
  }
  errBox.focus(); errBox.scrollIntoView({ block: 'center' });
}
