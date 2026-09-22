import { api, productCard, wireAddButtons, esc, $ } from './site.js?v=22';

api('/api/products').then(({ products }) => {
  for (const [tag, id, empty] of [['halloween', '#halloween', 'Our Halloween and autumn scents are coming soon.'], ['christmas', '#christmas', 'Our Christmas and winter scents are coming soon.']]) {
    const list = products.filter((p) => p.scents.includes(tag));
    const root = $(id);
    root.innerHTML = list.length ? `<ul class="grid">${list.map(productCard).join('')}</ul>` : `<div class="empty"><p>${empty}</p></div>`;
    wireAddButtons(root, (pid) => products.find((p) => p.id === pid));
  }
}).catch((e) => { for (const id of ['#halloween', '#christmas']) $(id).innerHTML = `<div class="notice notice-error" role="alert"><p>${esc(e.message)}</p><button class="btn btn-ghost btn-sm" data-reload>Try again</button></div>`; });
