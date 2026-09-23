import { siteContext, loadProducts, productSchema, breadcrumbs, productCardHtml, esc, gbp, CATEGORIES } from '../../server/seo.js';

const info = (title, text, open) => text ? `<details class="info"${open ? ' open' : ''}><summary>${title}</summary><div>${esc(text)}</div></details>` : '';

export async function onRequestGet(ctx) {
  const id = decodeURIComponent(ctx.params.slug || '').slice(0, 120);
  const { db, settings, base, render } = await siteContext(ctx);
  const [p] = await loadProducts(db, { id });
  if (!p) return render('404.html', { title: 'Product not found', noindex: true, status: 404, cache: 'no-store' });
  const cat = CATEGORIES.find((c) => c.id === p.category);
  const all = await loadProducts(db);
  const related = all.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 4);
  const price = p.variants.length === 1 ? gbp(p.from_pence) : `From ${gbp(p.from_pence)}`;
  // Static version of the product panel; product.js replaces it with the interactive one.
  const body = `<div class="product">
    <div class="product-media"><img src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="${esc(p.name)}" width="800" height="800" fetchpriority="high"></div>
    <div><h1>${esc(p.name)}</h1><p class="price">${price}</p><p>${esc(p.short_desc)}</p>
      ${p.variants.length > 1 ? `<p class="small muted">${esc(p.option_name || 'Options')}: ${p.variants.map((v) => `${esc(v.label)} ${gbp(v.price_pence)}${v.available ? '' : ' (sold out)'}`).join(', ')}</p>` : ''}
      <p class="small muted">${p.available ? esc(settings.dispatch_estimate || '') : 'Sold out'}</p>
      <div style="margin-top:1.5rem">${info('About this scent', p.description, true)}${info('Weight and size', p.weight)}${info('How to use', p.usage)}${info('Safety information', p.safety)}</div>
    </div></div>`;
  return render('product.html', {
    title: p.name, description: p.short_desc || p.description, path: `/products/${encodeURIComponent(p.id)}`, type: 'product',
    ogImage: p.image_url && !p.image_url.endsWith('.svg') ? `https://www.overtherainbowwaxmelts.co.uk${p.image_url}` : undefined,
    jsonld: [...base, productSchema(p, settings), breadcrumbs([['Home', '/'], ['Shop', '/shop'], ...(cat ? [[cat.name, `/shop?category=${cat.id}`]] : []), [p.name, `/products/${p.id}`]])],
    inject: { '#crumb-cat': cat ? `<a href="/shop?category=${cat.id}">${esc(cat.name)}</a>` : '', '#product-root': body, '#related': related.map(productCardHtml).join('') },
    unhide: related.length ? ['#related-section'] : [],
  });
}
