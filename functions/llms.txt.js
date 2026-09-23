// A plain-text summary of the shop for AI assistants and crawlers (llms.txt convention).
import { siteContext, loadProducts, CATEGORIES, SITE, gbp } from '../server/seo.js';

export async function onRequestGet(ctx) {
  const { db, settings } = await siteContext(ctx);
  const [products, posts, faq] = await Promise.all([loadProducts(db), db.prepare(`SELECT slug,title,excerpt FROM posts WHERE published=1 ORDER BY published_at DESC`).all().then((r) => r.results), db.prepare(`SELECT body FROM pages WHERE slug='faq'`).first()]);
  const byCat = (id) => products.filter((p) => p.category === id);
  const lines = [`# ${settings.business_name || 'Over The Rainbow Wax Melts'}`, '',
    `> Handmade wax melts, snap bars, sample boxes and gift sets, poured in small batches in Cheshire, England, and delivered across the UK. Website: ${SITE}`, '',
    `Delivery: ${settings.delivery_name || 'UK delivery'} ${settings.delivery_pence ? gbp(settings.delivery_pence) : ''}${settings.free_delivery_threshold_pence ? `, free on orders over ${gbp(settings.free_delivery_threshold_pence)}` : ''}. ${settings.dispatch_estimate || ''}`.trim(),
    `Contact: ${settings.contact_email || ''}`, '', '## Products', ''];
  for (const c of CATEGORIES) { const ps = byCat(c.id); if (ps.length) { lines.push(`### ${c.name}`); for (const p of ps) lines.push(`- [${p.name}](${SITE}/products/${encodeURIComponent(p.id)}): ${p.short_desc || ''} ${p.variants.length === 1 ? gbp(p.from_pence) : `from ${gbp(p.from_pence)}`}${p.available ? '' : ' (sold out)'}`); lines.push(''); } }
  if (posts.length) { lines.push('## Blog', ''); for (const p of posts) lines.push(`- [${p.title}](${SITE}/blog/${p.slug}): ${p.excerpt || ''}`); lines.push(''); }
  if (faq) { lines.push('## FAQs', ''); for (const b of faq.body.replace(/\r/g, '').split(/\n{2,}/)) { const ls = b.split('\n').filter((l) => l.trim()); if (ls.length && /^Q:/i.test(ls[0])) lines.push(`- **${ls[0].replace(/^Q:\s*/i, '')}** ${ls.slice(1).join(' ')}`); } lines.push(''); }
  lines.push('## Pages', '', `- [FAQs](${SITE}/faq)`, `- [Delivery & returns](${SITE}/delivery-returns)`, `- [Contact](${SITE}/contact)`, `- [Privacy](${SITE}/privacy)`, `- [Terms](${SITE}/terms)`);
  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=600' } });
}
