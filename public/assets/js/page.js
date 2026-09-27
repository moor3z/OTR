import { api, esc, $ } from './site.js?v=36';

// Tiny safe formatter for the editable pages: "## Heading", "- list item",
// blank line = new paragraph. Everything is escaped first; no HTML is allowed in.
export function format(body) {
  const mark = (t) => esc(t).replace(/\[TO COMPLETE BEFORE LAUNCH:([^\]]*)\]/g, '<span class="todo">To complete before launch:$1</span>');
  return body.replace(/\r/g, '').split(/\n{2,}/).map((block) => {
    const lines = block.split('\n').filter((l) => l.trim());
    if (!lines.length) return '';
    // "Q: question" followed by the answer lines becomes a tap-to-open FAQ item
    if (/^Q:\s*/i.test(lines[0])) return `<details class="info faq"><summary>${mark(lines[0].replace(/^Q:\s*/i, ''))}</summary><div>${lines.slice(1).map(mark).join('<br>')}</div></details>`;
    let html = '', list = [], para = [];
    const flush = () => { if (list.length) { html += `<ul>${list.map((l) => `<li>${mark(l)}</li>`).join('')}</ul>`; list = []; } if (para.length) { html += `<p>${para.map(mark).join('<br>')}</p>`; para = []; } };
    for (const l of lines) {
      if (l.startsWith('## ')) { flush(); html += `<h2>${mark(l.slice(3))}</h2>`; }
      else if (/^[-*] /.test(l)) { if (para.length) flush(); list.push(l.slice(2)); }
      else { if (list.length) flush(); para.push(l); }
    }
    flush(); return html;
  }).join('');
}

const root = $('#page-root');
if (root) api(`/api/page/${root.dataset.slug}`).then(({ page }) => {
  document.title = `${page.title} | Over The Rainbow`;
  root.innerHTML = `<h1>${esc(page.title)}</h1>
    ${page.needs_review ? `<div class="notice notice-demo"><p><strong>Placeholder page.</strong> This content still needs completing before launch. Edit it in Admin → Pages.</p></div>` : ''}
    ${format(page.body)}`;
}).catch((e) => { root.innerHTML = `<h1>Page unavailable</h1><div class="notice notice-error" role="alert"><p>${esc(e.message)}</p></div>`; });

// Contact form: send it in the background so the person stays on the page.
// Without JavaScript the form posts normally and still works.
const cform = document.querySelector('#contact-form');
if (cform) {
  cform.querySelector('[name=started]').value = String(Date.now());
  cform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = cform.querySelector('button[type=submit]');
    cform.querySelectorAll('.field-error').forEach((n) => n.remove());
    cform.querySelectorAll('[aria-invalid]').forEach((n) => n.removeAttribute('aria-invalid'));
    btn.classList.add('is-loading'); btn.disabled = true;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(cform))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) {
          for (const [field, msg] of Object.entries(data.errors)) {
            const input = cform.querySelector(`[name=${field}]`);
            if (!input) continue;
            input.setAttribute('aria-invalid', 'true');
            input.insertAdjacentHTML('afterend', `<p class="field-error">${esc(msg)}</p>`);
          }
          cform.querySelector('[aria-invalid]')?.focus();
          throw new Error('');
        }
        throw new Error(data.error || 'Sorry, that did not send. Please email us instead.');
      }
      cform.closest('.contact-form-box').innerHTML = `<div class="form-done">
        <div class="status-icon" aria-hidden="true">✓</div>
        <h2>Thank you, we have got it</h2>
        <p>We will reply to the email address you gave us, usually within one working day. Do check your spam folder if you do not hear from us.</p></div>`;
    } catch (err) {
      if (err.message) cform.insertAdjacentHTML('afterbegin', `<div class="notice notice-error" role="alert"><p>${esc(err.message)}</p></div>`);
    } finally { btn.classList.remove('is-loading'); btn.disabled = false; }
  });
}
