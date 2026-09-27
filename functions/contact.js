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
    extra = '';
  }
    // Google Business Profile: map (only loaded if the visitor asks, so Google sets no cookies before then) and review link.
  const TOPICS = ['An order', 'A product or scent', 'Delivery', 'Wholesale or bulk', 'Something else'];
  const form = `<section class="contact-grid">
    <div class="contact-form-box">
      <h2>Send us a message</h2>
      <p class="small muted">Every message is read and answered by Michelle herself, usually within one working day.</p>
      <form id="contact-form" method="post" action="/api/contact" novalidate>
        <div class="row-2">
          <div class="field"><label for="c-name">Your name</label><input type="text" id="c-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="c-email">Email address</label><input type="email" id="c-email" name="email" autocomplete="email" required></div>
        </div>
        <div class="field"><label for="c-topic">What is it about?</label>
          <select id="c-topic" name="topic">${TOPICS.map((t) => `<option>${esc(t)}</option>`).join('')}</select></div>
        <div class="field"><label for="c-order">Order number <span class="hint">Optional. It starts with OTR- and is on your confirmation email.</span></label>
          <input type="text" id="c-order" name="order" autocomplete="off"></div>
        <div class="field"><label for="c-message">Your message</label><textarea id="c-message" name="message" required></textarea></div>
        <div class="hp" aria-hidden="true"><label for="c-website">Leave this empty</label><input type="text" id="c-website" name="website" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="started" value="">
        <button class="btn btn-primary btn-block" type="submit">Send message</button>
        <p class="small muted" style="margin:.75rem 0 0">We only use your details to reply to you. Nothing else. See our <a href="/privacy">privacy policy</a>.</p>
      </form>
    </div>
    <aside class="contact-side">
      <h2>Quicker answers</h2>
      <p class="small muted">Most questions are already answered here, and you will not have to wait for a reply.</p>
      <ul class="contact-links">
        <li><a href="/delivery-returns"><strong>Where is my order?</strong><span>Delivery times, postage and tracking</span></a></li>
        <li><a href="/faq"><strong>How do I use a wax melt?</strong><span>Burners, how much to use, how long it lasts</span></a></li>
        <li><a href="/delivery-returns"><strong>I want to return something</strong><span>Returns, damaged parcels and refunds</span></a></li>
        <li><a href="/faq"><strong>Are they safe around pets and children?</strong><span>Safety and CLP labelling</span></a></li>
      </ul>
      ${settings.contact_email ? `<p class="contact-direct">Prefer email? Write to<br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>` : ''}
    </aside>
  </section>`;
  const detail = (label, value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  const details = [
    settings.business_name ? detail('Business name', esc(settings.business_name)) : '',
    settings.contact_email ? detail('Email', `<a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a>`) : '',
    settings.contact_phone ? detail('Phone', `<a href="tel:${esc(settings.contact_phone.replace(/\s/g, ''))}">${esc(settings.contact_phone)}</a>`) : '',
    settings.business_address ? detail('Address', esc(settings.business_address).replace(/\n/g, '<br>')) : '',
  ].filter(Boolean).join('');
  const detailsBox = details ? `<section class="business-details"><h2>Business details</h2>
    <p class="small muted">Who you are buying from, as required of UK online sellers.</p><dl>${details}</dl></section>` : '';
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
    jsonld: [...base, breadcrumbs([['Home', '/'], [page.title, `/${SLUG}`]])], inject: { '#page-root': `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}`, ...(SLUG === 'contact' ? { '#page-extra': form + detailsBox + gmap } : {}) },
  });
}
