// Server-side rendering for the public pages.
// Each page is still the static HTML template in /public; these helpers fill in the title, meta tags,
// canonical link, Open Graph tags, JSON-LD structured data and the main content BEFORE the page is sent,
// so search engines and AI crawlers see real content without running JavaScript. The page's own script
// then takes over for the interactive parts (basket, filters, options) exactly as before.
import { getDb, getSettings, loadProducts, CATEGORIES } from './db.js';

export const SITE = 'https://www.overtherainbowwaxmelts.co.uk';
// Google Business Profile. Place ID from the profile; used for the map, the "leave a review" link
// and to tell Google that this website and that listing are the same business.
export const GOOGLE = {
  placeId: 'ChIJUShLVxqHkqUR5CCTCbkYW0Y',
  lat: 53.2778293, lng: -2.9132642,
  profile: 'https://www.google.com/maps/place/?q=place_id:ChIJUShLVxqHkqUR5CCTCbkYW0Y',
  review: 'https://search.google.com/local/writereview?placeid=ChIJUShLVxqHkqUR5CCTCbkYW0Y',
  directions: 'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJUShLVxqHkqUR5CCTCbkYW0Y&destination=Over+The+Rainbow+Wax+Melts',
};
const SITE_NAME = 'Over The Rainbow Wax Melts';
const DEFAULT_OG = `${SITE}/assets/img/og-default.png`;

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const gbp = (p) => `£${(p / 100).toFixed(2)}`;
const strip = (s, n = 160) => { const t = String(s ?? '').replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n - 1).replace(/\s\S*$/, '') + '…' : t; };
const abs = (u) => (u && /^https?:/.test(u) ? u : `${SITE}${u || ''}`);
// Product photos are uploaded as webp/jpg; the sample placeholders are SVG, which social sites won't show.
const ogImageFor = (url) => (url && !url.endsWith('.svg') ? abs(url) : DEFAULT_OG);
const ldJson = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Same markup as the client-side format() in page.js, so the server-rendered page matches.
export function formatBody(body) {
  return String(body || '').replace(/\r/g, '').split(/\n{2,}/).map((block) => {
    const lines = block.split('\n').filter((l) => l.trim());
    if (!lines.length) return '';
    if (/^Q:\s*/i.test(lines[0])) return `<details class="info faq"><summary>${esc(lines[0].replace(/^Q:\s*/i, ''))}</summary><div>${lines.slice(1).map(esc).join('<br>')}</div></details>`;
    let html = '', list = [], para = [];
    const flush = () => { if (list.length) { html += `<ul>${list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`; list = []; } if (para.length) { html += `<p>${para.map(esc).join('<br>')}</p>`; para = []; } };
    for (const l of lines) {
      if (l.startsWith('## ')) { flush(); html += `<h2>${esc(l.slice(3))}</h2>`; }
      else if (/^[-*] /.test(l)) { if (para.length) flush(); list.push(l.slice(2)); }
      else { if (list.length) flush(); para.push(l); }
    }
    flush(); return html;
  }).join('');
}

// FAQ text → [{q, a}] for FAQPage schema
export function faqPairs(body) {
  return String(body || '').replace(/\r/g, '').split(/\n{2,}/).map((b) => b.split('\n').filter((l) => l.trim()))
    .filter((ls) => ls.length && /^Q:\s*/i.test(ls[0]))
    .map((ls) => ({ q: ls[0].replace(/^Q:\s*/i, '').trim(), a: ls.slice(1).join(' ').trim() }));
}

// Same markup as productCard() in site.js
export function productCardHtml(p) {
  const single = p.variants.length === 1;
  const price = single ? gbp(p.from_pence) : `From ${gbp(p.from_pence)}`;
  const href = `/products/${encodeURIComponent(p.id)}`;
  let action;
  if (!p.available) action = `<button class="btn" disabled>Sold out</button>`;
  else if (single) action = `<button class="btn btn-primary" data-add="${esc(p.id)}">Add to Basket</button>`;
  else action = `<a class="btn btn-ghost" href="${href}">Choose ${esc((p.option_name || 'option').toLowerCase())}</a>`;
  return `<li><article class="card${p.available ? '' : ' is-out'}">
    <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true"><img src="${esc(p.image_url || '/assets/ph/blank.svg')}" alt="" loading="lazy" decoding="async" width="400" height="400">${p.available ? '' : '<span class="badge">Sold out</span>'}</a>
    <h3><a href="${href}">${esc(p.name)}</a></h3>
    <p class="card-desc">${esc(p.short_desc)}</p>
    <div class="card-foot"><p class="price">${price}</p>${action}</div>
  </article></li>`;
}

const TINTS = ['var(--lilac)', 'var(--yellow)', 'var(--peach)', 'var(--pink)', 'var(--mint)'];
// Same markup as postCard() in blog.js
export function postCardHtml(p, i = 0) {
  const href = `/blog/${encodeURIComponent(p.slug)}`;
  return `<li><article class="post-card">
    <a class="post-media" href="${href}" tabindex="-1" aria-hidden="true" style="background:${TINTS[i % TINTS.length]}">${p.image_url ? `<img src="${esc(p.image_url)}" alt="" decoding="async">` : ''}</a>
    <h3><a href="${href}">${esc(p.title)}</a></h3><p class="card-desc">${esc(p.excerpt)}</p>
    <a class="post-more" href="${href}">Read more<span class="visually-hidden">: ${esc(p.title)}</span></a></article></li>`;
}

// Organisation / shop schema used on every page
export function orgSchema(s) {
  const lines = String(s.business_address || '').split(/\n/).map((l) => l.trim()).filter(Boolean);
  const postcode = lines.find((l) => /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(l));
  const org = {
    '@type': ['Organization', 'OnlineStore'], '@id': `${SITE}/#org`, name: s.business_name || SITE_NAME, url: SITE,
    logo: { '@type': 'ImageObject', url: `${SITE}/assets/img/logo-720.webp` }, image: DEFAULT_OG,
    description: 'Handmade wax melts, snap bars, sample boxes and gift sets, poured in small batches in Cheshire and delivered across the UK.',
    areaServed: { '@type': 'Country', name: 'United Kingdom' }, currenciesAccepted: 'GBP', paymentAccepted: 'Card, Apple Pay, Google Pay',
  };
  org.sameAs = [GOOGLE.profile];
  org.hasMap = GOOGLE.profile;
  org.geo = { '@type': 'GeoCoordinates', latitude: GOOGLE.lat, longitude: GOOGLE.lng };
  if (s.contact_email) org.email = s.contact_email;
  if (s.contact_phone) org.telephone = s.contact_phone;
  if (lines.length) {
    org.address = { '@type': 'PostalAddress', addressCountry: 'GB', streetAddress: lines.filter((l) => l !== postcode).slice(0, -1).join(', ') || lines[0], addressLocality: lines.filter((l) => l !== postcode).slice(-1)[0] || '' };
    if (postcode) org.address.postalCode = postcode;
  }
  return org;
}

export const websiteSchema = () => ({ '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: SITE_NAME, publisher: { '@id': `${SITE}/#org` }, inLanguage: 'en-GB' });
export const breadcrumbs = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(url) })) });

export function productSchema(p, s) {
  const url = `${SITE}/products/${encodeURIComponent(p.id)}`;
  const offers = p.variants.map((v) => ({
    '@type': 'Offer', url, price: (v.price_pence / 100).toFixed(2), priceCurrency: 'GBP',
    availability: v.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', itemCondition: 'https://schema.org/NewCondition',
    ...(p.variants.length > 1 ? { name: v.label } : {}),
    shippingDetails: { '@type': 'OfferShippingDetails', shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' } },
  }));
  return {
    '@type': 'Product', '@id': `${url}#product`, name: p.name, url, sku: p.id, image: ogImageFor(p.image_url),
    description: strip(p.description || p.short_desc, 500), category: CATEGORIES.find((c) => c.id === p.category)?.name || p.category,
    brand: { '@type': 'Brand', name: s.business_name || SITE_NAME },
    offers: offers.length === 1 ? offers[0] : { '@type': 'AggregateOffer', url, priceCurrency: 'GBP', lowPrice: (p.from_pence / 100).toFixed(2), highPrice: (Math.max(...p.variants.map((v) => v.price_pence)) / 100).toFixed(2), offerCount: offers.length, offers },
  };
}

// Render a template from /public with the SEO fields and content filled in.
// opts: { title, description, path, ogImage, type, jsonld: [...], inject: { '#selector': html }, unhide: ['#selector'], noindex, status, cache }
export async function renderPage(ctx, template, opts) {
  const url = new URL(ctx.request.url);
  const res = await ctx.env.ASSETS.fetch(new Request(`${url.origin}/${template}`));
  if (!res.ok) return res;
  const canonical = `${SITE}${opts.path || url.pathname}`;
  const title = opts.title ? `${opts.title} | Over The Rainbow` : `${SITE_NAME}`;
  const description = strip(opts.description || 'Handmade wax melts in bright, happy scents. Snap bars, melt shapes, sample boxes and gift sets, delivered across the UK.');
  const graph = { '@context': 'https://schema.org', '@graph': [...(opts.jsonld || [])] };
  const head = `<link rel="canonical" href="${esc(canonical)}">
<meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(opts.ogImage || DEFAULT_OG)}"><meta property="og:site_name" content="${SITE_NAME}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(opts.ogImage || DEFAULT_OG)}">
${opts.noindex ? '<meta name="robots" content="noindex">' : ''}${graph['@graph'].length ? ldJson(graph) : ''}`;
  let rw = new HTMLRewriter()
    .on('title', { element(e) { e.setInnerContent(title); } })
    .on('meta[name="description"]', { element(e) { e.setAttribute('content', description); } })
    .on('meta[property="og:title"]', { element(e) { e.setAttribute('content', title); } })
    .on('meta[property="og:description"]', { element(e) { e.setAttribute('content', description); } })
    .on('meta[property="og:type"]', { element(e) { e.setAttribute('content', opts.type || 'website'); } })
    .on('head', { element(e) { e.append(head, { html: true }); } });
  const inject = { '#year': String(new Date().getFullYear()), ...(opts.inject || {}) };
  if (opts.settings) { // announcement bar and footer email, same markup as site.js
    const s = opts.settings, offer = s.announcement || (s.free_delivery_threshold_pence ? `Free UK delivery over ${gbp(s.free_delivery_threshold_pence).replace(/\.00$/, '')}` : '');
    if (offer) inject['#announce'] = `<div class="announce"><span aria-hidden="true">♥</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>${esc(offer)}<span aria-hidden="true">♥</span></div>`;
    if (s.contact_email) inject['#footer-contact'] = `<a href="mailto:${esc(s.contact_email)}">${esc(s.contact_email)}</a>`;
  }
  for (const [sel, html] of Object.entries(inject)) rw = rw.on(sel, { element(e) { e.setInnerContent(html, { html: true }); } });
  for (const sel of opts.unhide || []) rw = rw.on(sel, { element(e) { e.removeAttribute('hidden'); } });
  const out = rw.transform(res);
  const headers = new Headers(out.headers);
  headers.set('cache-control', opts.cache || 'public, max-age=60, s-maxage=120');
  headers.set('content-type', 'text/html; charset=utf-8');
  return new Response(out.body, { status: opts.status || 200, headers });
}

// Loads settings once per request and gives back a render() bound to the request with the settings included.
export async function siteContext(ctx) {
  const db = await getDb(ctx.env);
  const settings = await getSettings(db);
  const render = (template, opts) => renderPage(ctx, template, { settings, ...opts });
  return { db, settings, base: [orgSchema(settings), websiteSchema()], render };
}

export { loadProducts, CATEGORIES };
