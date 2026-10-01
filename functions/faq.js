import { siteContext, breadcrumbs, formatBody, faqPairs, esc } from '../server/seo.js';

export async function onRequestGet(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug='faq'`).first();
  if (!page) return ctx.env.ASSETS.fetch(ctx.request);
  const faq = { '@type': 'FAQPage', mainEntity: faqPairs(page.body).map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return render('faq.html', {
    title: page.title, description: 'Answers to common questions about wax melts: how to use them, how long they last, safety, delivery and returns.', path: '/faq',
    jsonld: [...base, breadcrumbs([['Home', '/'], ['FAQs', '/faq']]), faq], inject: {
      '#page-root': `<h1>${esc(page.title)}</h1>${formatBody(page.body)}`,
      '#page-extra': `${settings.handmade_note ? `<h2>Handmade, so not perfect</h2><p>${esc(settings.handmade_note)}</p>` : ''}${settings.fragrance_note ? `<h2>About our fragrance names</h2><p>${esc(settings.fragrance_note)}</p>` : ''}`,
    },
  });
}
