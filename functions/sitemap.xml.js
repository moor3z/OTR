import { siteContext, loadProducts, CATEGORIES, SITE } from '../server/seo.js';

export async function onRequestGet(ctx) {
  const { db } = await siteContext(ctx);
  const [products, posts] = await Promise.all([loadProducts(db), db.prepare(`SELECT slug,updated_at,published_at FROM posts WHERE published=1`).all().then((r) => r.results)]);
  const u = (loc, extra = '') => `<url><loc>${SITE}${loc}</loc>${extra}</url>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[u('/', '<changefreq>weekly</changefreq><priority>1.0</priority>'), u('/shop', '<changefreq>weekly</changefreq><priority>0.9</priority>'),
  ...CATEGORIES.map((c) => u(`/shop?category=${c.id}`, '<changefreq>weekly</changefreq><priority>0.8</priority>')), u('/shop?category=seasonal', '<changefreq>weekly</changefreq><priority>0.8</priority>'),
  ...products.map((p) => u(`/products/${encodeURIComponent(p.id)}`, '<changefreq>weekly</changefreq><priority>0.7</priority>')),
  u('/blog', '<changefreq>weekly</changefreq>'), ...posts.map((p) => u(`/blog/${encodeURIComponent(p.slug)}`, `<lastmod>${(p.updated_at || p.published_at || '').slice(0, 10)}</lastmod>`)),
  u('/faq'), u('/contact'), u('/delivery-returns'), u('/privacy'), u('/terms')].join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=600' } });
}
