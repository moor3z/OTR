import { siteContext, loadProducts, productCardHtml, postCardHtml, formatBody, esc, gbp } from '../server/seo.js';

export async function onRequestGet(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const [all, posts, faq] = await Promise.all([
    loadProducts(db),
    db.prepare(`SELECT slug,title,excerpt,image_url FROM posts WHERE published=1 ORDER BY published_at DESC LIMIT 3`).all().then((r) => r.results),
    db.prepare(`SELECT body FROM pages WHERE slug='faq'`).first(),
  ]);
  let featured = all.filter((p) => p.featured && p.available);
  featured = [...featured, ...all.filter((p) => p.available && !featured.includes(p))].slice(0, 8); // same picks as home.js
  const qs = faq ? faq.body.replace(/\r/g, '').split(/\n{2,}/).filter((b) => /^Q:\s*/i.test(b.trim())).slice(0, 5).join('\n\n') : '';
  const headline = (settings.hero_headline || 'A little melt. | A lot of happiness.').split(/\s*\|\s*|\n/).map(esc).join('<br>');
  const inject = {
    '#hero-headline': headline, '#hero-sub': esc(settings.hero_sub || ''),
    '#hero-note span': settings.free_delivery_threshold_pence ? `UK delivery, free over ${gbp(settings.free_delivery_threshold_pence).replace(/\.00$/, '')}` : 'UK delivery',
    '#featured': featured.length ? `<ul class="grid">${featured.map(productCardHtml).join('')}</ul>` : `<div class="empty"><p>Products are on their way. Check back soon.</p></div>`,
    '#intro-title': esc(settings.intro_title || ''), '#intro-text': esc(settings.intro_text || ''),
    '#home-posts': posts.map((p, i) => postCardHtml(p, i)).join(''), '#home-faq-list': formatBody(qs),
  };
  const unhide = [...(posts.length ? ['#home-blog'] : []), ...(qs ? ['#home-faq'] : [])];
  return render('index.html', {
    title: 'Handmade Wax Melts, Snap Bars & Gift Sets, UK', description: 'Handmade wax melts in bright, happy scents. Snap bars, melt shapes, sample boxes and gift sets, poured in small batches in Cheshire and delivered across the UK.', path: '/',
    jsonld: base, inject, unhide,
  });
}
