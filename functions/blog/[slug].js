import { siteContext, breadcrumbs, postCardHtml, formatBody, esc, SITE } from '../../server/seo.js';

export async function onRequestGet(ctx) {
  const slug = decodeURIComponent(ctx.params.slug || '').slice(0, 120);
  const { db, base, render } = await siteContext(ctx);
  const post = await db.prepare(`SELECT slug,title,excerpt,body,image_url,published_at,updated_at FROM posts WHERE slug=? AND published=1`).bind(slug).first();
  if (!post) return render('404.html', { title: 'Post not found', noindex: true, status: 404, cache: 'no-store' });
  const { results: others } = await db.prepare(`SELECT slug,title,excerpt,image_url FROM posts WHERE published=1 AND slug<>? ORDER BY published_at DESC LIMIT 3`).bind(slug).all();
  const img = post.image_url && !post.image_url.endsWith('.svg') ? `${SITE}${post.image_url}` : undefined;
  const body = `<header class="post-head"><h1>${esc(post.title)}</h1>${post.excerpt ? `<p class="post-lede">${esc(post.excerpt)}</p>` : ''}</header>
    ${post.image_url ? `<div class="post-hero"><img src="${esc(post.image_url)}" alt="" width="640" height="480"></div>` : ''}
    <div class="prose">${formatBody(post.body)}</div>
    <p style="margin-top:2rem"><a class="btn btn-primary" href="/shop">Shop Wax Melts</a></p>`;
  const article = { '@type': 'BlogPosting', headline: post.title, description: post.excerpt, url: `${SITE}/blog/${post.slug}`, datePublished: post.published_at, dateModified: post.updated_at || post.published_at,
    author: { '@id': `${SITE}/#org` }, publisher: { '@id': `${SITE}/#org` }, mainEntityOfPage: `${SITE}/blog/${post.slug}`, inLanguage: 'en-GB', ...(img ? { image: img } : {}) };
  return render('blog-post.html', {
    title: post.title, description: post.excerpt || post.title, path: `/blog/${encodeURIComponent(post.slug)}`, type: 'article', ogImage: img,
    jsonld: [...base, article, breadcrumbs([['Home', '/'], ['Blog', '/blog'], [post.title, `/blog/${post.slug}`]])],
    inject: { '#post-root': body, '#more-posts': others.map((p, i) => postCardHtml(p, i + 1)).join('') }, unhide: others.length ? ['#more-section'] : [],
  });
}
