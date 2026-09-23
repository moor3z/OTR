import { api, esc, $ } from './site.js?v=30';
import { format } from './page.js?v=30';
import { postCard, postDate } from './blog.js?v=30';

const slug = decodeURIComponent(location.pathname.split('/')[2] || '') || new URLSearchParams(location.search).get('slug') || '';
const root = $('#post-root');

Promise.all([api(`/api/posts/${encodeURIComponent(slug)}`), api('/api/posts')]).then(([{ post }, { posts }]) => {
  document.title = `${post.title} | Over The Rainbow`;
  document.querySelector('meta[name="description"]').content = post.excerpt || post.title;
  root.innerHTML = `<header class="post-head">
      <h1>${esc(post.title)}</h1>
      ${post.excerpt ? `<p class="post-lede">${esc(post.excerpt)}</p>` : ''}
    </header>
    ${post.image_url ? `<div class="post-hero"><img src="${esc(post.image_url)}" alt="" width="640" height="480"></div>` : ''}
    <div class="prose">${format(post.body)}</div>
    <p style="margin-top:2rem"><a class="btn btn-primary" href="/shop">Shop Wax Melts</a></p>`;
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  if (others.length) { $('#more-section').hidden = false; $('#more-posts').innerHTML = others.map((p, i) => postCard(p, i + 1)).join(''); }
}).catch((e) => {
  root.innerHTML = e.status === 404
    ? `<div class="empty" style="margin-top:1.5rem"><h1>We can't find that post</h1><a class="btn btn-primary" href="/blog">Back to the blog</a></div>`
    : `<div class="notice notice-error" role="alert" style="margin-top:1.5rem"><p>${esc(e.message)}</p><button class="btn btn-ghost btn-sm" data-reload>Try again</button></div>`;
});
