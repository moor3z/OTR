import { siteContext, breadcrumbs, postCardHtml, SITE } from '../server/seo.js';

export async function onRequestGet(ctx) {
  const { db, base, render } = await siteContext(ctx);
  const { results: posts } = await db.prepare(`SELECT slug,title,excerpt,image_url FROM posts WHERE published=1 ORDER BY published_at DESC`).all();
  const list = { '@type': 'ItemList', itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/blog/${p.slug}`, name: p.title })) };
  return render('blog.html', {
    title: 'Blog: wax melt tips and guides', description: 'How to use wax melts, choosing scents for every room, gift ideas and what is new at Over The Rainbow.', path: '/blog',
    jsonld: [...base, breadcrumbs([['Home', '/'], ['Blog', '/blog']]), list], inject: { '#blog-root': posts.length ? `<ul class="post-grid">${posts.map((p, i) => postCardHtml(p, i)).join('')}</ul>` : `<div class="empty"><p>No posts yet. Check back soon.</p></div>` },
  });
}
