import { siteContext, loadProducts, breadcrumbs, productCardHtml, esc, CATEGORIES, SITE } from '../server/seo.js';

const DESC = {
  all: 'Every Over The Rainbow wax melt in one place: snap bars, melt shapes, sample boxes, gift sets and burners, handmade in Cheshire.',
  'snap-bars': 'Highly scented wax melt snap bars, handmade in small batches. Snap off a piece, pop it in your burner and enjoy.',
  'wax-melt-shapes': 'Hearts, stars, flowers and more: wax melts in colourful shapes, made with premium fragrance oils.',
  'sample-boxes': 'Try before you commit. Sample boxes of our most popular wax melt scents, perfect for finding a favourite.',
  'gift-sets': 'Wax melt gift sets, boxed and ready to give. Birthdays, thank-yous and treats.',
  accessories: 'Wax melt burners, tealights and storage tins to go with your melts.',
  seasonal: 'Limited-edition seasonal wax melts: Halloween and autumn scents, Christmas and winter scents.',
};

export async function onRequestGet(ctx) {
  const url = new URL(ctx.request.url);
  const cat = url.searchParams.get('category') || 'all';
  const { db, base, render } = await siteContext(ctx);
  const all = await loadProducts(db);
  const seasonal = (p) => p.scents.includes('halloween') || p.scents.includes('christmas');
  const list = cat === 'all' ? all : cat === 'seasonal' ? all.filter(seasonal) : all.filter((p) => p.category === cat);
  const name = cat === 'all' ? 'All Products' : cat === 'seasonal' ? 'Seasonal' : CATEGORIES.find((c) => c.id === cat)?.name || 'All Products';
  const chips = [{ id: 'all', name: 'All Products' }, ...CATEGORIES, { id: 'seasonal', name: 'Seasonal' }]
    .map((c) => `<li><a class="chip" href="${c.id === 'all' ? '/shop' : `/shop?category=${c.id}`}" data-cat="${c.id}" aria-pressed="${c.id === cat}">${esc(c.name)}</a></li>`).join('');
  const grid = list.length ? `<ul class="grid">${list.map(productCardHtml).join('')}</ul>` : `<div class="empty"><p>Nothing here yet. Check back soon.</p></div>`;
  const itemList = { '@type': 'ItemList', name, itemListElement: list.slice(0, 50).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/products/${encodeURIComponent(p.id)}`, name: p.name })) };
  // Search engines index one page per category; the scent filter and sort variations point back to it.
  const path = cat === 'all' ? '/shop' : `/shop?category=${encodeURIComponent(cat)}`;
  return render('shop.html', {
    title: cat === 'all' ? 'Shop Wax Melts' : `${name} Wax Melts`, description: DESC[cat] || DESC.all, path,
    jsonld: [...base, breadcrumbs([['Home', '/'], ['Shop', '/shop'], ...(cat === 'all' ? [] : [[name, path]])]), itemList],
    inject: { '#shop-title': esc(name), '#cats': chips, '#results': grid, '#result-count': `${list.length} product${list.length === 1 ? '' : 's'}` },
  });
}
