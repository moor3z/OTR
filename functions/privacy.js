import { siteContext, breadcrumbs, formatBody, esc, GOOGLE } from '../server/seo.js';
const SLUG = 'privacy';
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
  if (SLUG === 'privacy') extra += `<section class="cookie-info"><h2>Cookies</h2>
    <p>We keep this simple. The shop stores two things in your browser, and neither of them tracks you:</p>
    <ul>
      <li><strong>Your basket</strong> — what you have added, so it is still there when you come back. The shop cannot work without it.</li>
      <li><strong>Your cookie choice</strong> — so we do not ask you again.</li>
    </ul>
    <p>We do not use advertising cookies and we do not track you around the web.</p>
    <p>The one thing that comes from somewhere else is the map on our <a href="/contact">contact page</a>, which is provided by Google and sets cookies of its own. It only loads if you say yes, and you can change your mind at any time using the <strong>Cookie choices</strong> link at the bottom of any page.</p>
    <p>When you pay, you are handed over to Stripe, who handle the card details and set their own cookies to spot fraud. Their privacy notice covers that part.</p></section>`;
  return render(`${SLUG}.html`, {
    title: page.title, description: page.body, path: `/${SLUG}`,
    jsonld: [...base, breadcrumbs([['Home', '/'], [page.title, `/${SLUG}`]])], inject: { '#page-root': `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}` },
  });
}
