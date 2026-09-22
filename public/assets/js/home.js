import { postCard } from './blog.js?v=27';
import { format } from './page.js?v=27';
import { api, getConfig, productCard, wireAddButtons, gbp, esc, $ } from './site.js?v=27';

getConfig().then((c) => {
  if (c.hero_headline) $('#hero-headline').innerHTML = c.hero_headline.split(/\s*\|\s*|\n/).map(esc).join('<br>'); // "|" or a new line = line break
  if (c.hero_sub) $('#hero-sub').textContent = c.hero_sub;
  if (c.intro_title) $('#intro-title').textContent = c.intro_title;
  $('#intro-text').textContent = c.intro_text || '';
  $('#hero-note span').textContent = c.free_delivery_threshold_pence ? `UK delivery, free over ${gbp(c.free_delivery_threshold_pence).replace(/\.00$/, '')}` : c.delivery_pence ? `UK delivery ${gbp(c.delivery_pence)}` : 'UK delivery';
}).catch(() => {});

const root = $('#featured');
api('/api/products').then(({ products }) => {
  let picks = products.filter((p) => p.featured && p.available);
  picks = [...picks, ...products.filter((p) => p.available && !picks.includes(p))]; // top up so the grid fills evenly
  picks = picks.slice(0, 8);
  root.innerHTML = picks.length ? `<ul class="grid">${picks.map(productCard).join('')}</ul>`
    : `<div class="empty"><p>Products are on their way. Check back soon.</p></div>`;
  wireAddButtons(root, (id) => products.find((p) => p.id === id));
}).catch((e) => { root.innerHTML = `<div class="notice notice-error" role="alert"><p>${e.message}</p><button class="btn btn-ghost btn-sm" data-reload>Try again</button></div>`; });

api('/api/posts').then(({ posts }) => {
  if (!posts.length) return;
  $('#home-blog').hidden = false;
  $('#home-posts').innerHTML = posts.slice(0, 4).map(postCard).join('');
}).catch(() => {});

// A handful of FAQs under the blog. Pulls the first questions from the FAQ page so they stay in sync.
api('/api/page/faq').then(({ page }) => {
  const qs = page.body.replace(/\r/g, '').split(/\n{2,}/).filter((b) => /^Q:\s*/i.test(b.trim()));
  if (!qs.length) return;
  $('#home-faq').hidden = false;
  $('#home-faq-list').innerHTML = format(qs.slice(0, 5).join('\n\n'));
}).catch(() => {});
