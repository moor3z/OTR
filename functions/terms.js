import { siteContext, breadcrumbs, formatBody, esc } from '../server/seo.js';
const SLUG = 'terms';
export async function onRequestGet(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug=?`).bind(SLUG).first();
  if (!page) return ctx.env.ASSETS.fetch(ctx.request);
  let extra = '';
  if (SLUG === 'contact') {
    const rows = [];
    if (settings.contact_email) rows.push(`<p><strong>Email</strong><br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>`);
    if (settings.contact_phone) rows.push(`<p><strong>Phone</strong><br><a href="tel:${esc(settings.contact_phone.replace(/\\s/g, ''))}">${esc(settings.contact_phone)}</a></p>`);
    if (settings.business_address) rows.push(`<p><strong>Address</strong><br>${esc(settings.business_address).replace(/\\n/g, '<br>')}</p>`);
    if (rows.length) extra = `<div class="intro" style="margin-top:1.5rem">${rows.join('')}</div>`;
  }
  return render(`${SLUG}.html`, {
    title: page.title, description: page.body, path: `/${SLUG}`,
    jsonld: [...base, breadcrumbs([['Home', '/'], [page.title, `/${SLUG}`]])], inject: { '#page-root': `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}` },
  });
}
