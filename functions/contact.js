import { siteContext, breadcrumbs, formatBody, esc, GOOGLE } from '../server/seo.js';
const SLUG = 'contact';
export async function onRequestGet(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug=?`).bind(SLUG).first();
  if (!page) return ctx.env.ASSETS.fetch(ctx.request);
  let extra = '';
  if (SLUG === 'contact') {
    const rows = [];
    if (settings.contact_email) rows.push(`<p><strong>Email</strong><br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>`);
    if (settings.contact_phone) rows.push(`<p><strong>Phone</strong><br><a href="tel:${esc(settings.contact_phone.replace(/\s/g, ''))}">${esc(settings.contact_phone)}</a></p>`);
    if (settings.business_address) rows.push(`<p><strong>Address</strong><br>${esc(settings.business_address).replace(/\n/g, '<br>')}</p>`);
    if (rows.length) extra = `<div class="intro" style="margin-top:1.5rem">${rows.join('')}</div>`;
  }
    // Google Business Profile: map (only loaded if the visitor asks, so Google sets no cookies before then) and review link.
  const gmap = `<section class="gmap">
    <h2>Find us on Google</h2>
    <p>We post and deliver across the UK, so there is no shop to visit, but you can find our Google listing here.</p>
    <div class="gmap-frame" data-map="${GOOGLE.lat},${GOOGLE.lng}">
      <button class="btn btn-ghost" type="button">Show map</button>
      <p class="small muted">The map comes from Google and loads only when you tap it.</p>
    </div>
    <p class="gmap-links"><a class="btn btn-ghost" href="${GOOGLE.profile}" target="_blank" rel="noopener">Our Google listing</a>
    <a class="btn btn-ghost" href="${GOOGLE.directions}" target="_blank" rel="noopener">Directions</a>
    <a class="btn btn-primary" href="${GOOGLE.review}" target="_blank" rel="noopener">Leave a review</a></p>
  </section>`;

  return render(`${SLUG}.html`, {
    title: page.title, description: page.body, path: `/${SLUG}`,
    jsonld: [...base, breadcrumbs([['Home', '/'], [page.title, `/${SLUG}`]])], inject: { '#page-root': `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}`, ...(SLUG === 'contact' ? { '#page-extra': gmap } : {}) },
  });
}
