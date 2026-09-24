import { api, esc, $ } from './site.js?v=31';

const TINTS = ['var(--lilac)', 'var(--yellow)', 'var(--peach)', 'var(--pink)', 'var(--mint)'];
export const postDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function postCard(p, i = 0) {
  const href = `/blog/${encodeURIComponent(p.slug)}`;
  return `<li><article class="post-card">
    <a class="post-media" href="${href}" tabindex="-1" aria-hidden="true" style="background:${TINTS[i % TINTS.length]}">
      ${p.image_url ? `<img src="${esc(p.image_url)}" alt="" decoding="async">` : ''}</a>
    <h3><a href="${href}">${esc(p.title)}</a></h3>
    <p class="card-desc">${esc(p.excerpt)}</p>
    <a class="post-more" href="${href}">Read more<span class="visually-hidden">: ${esc(p.title)}</span></a>
  </article></li>`;
}

const root = $('#blog-root');
if (root) api('/api/posts').then(({ posts }) => {
  root.innerHTML = posts.length ? `<ul class="post-grid">${posts.map(postCard).join('')}</ul>`
    : `<div class="empty"><p>No posts yet. Check back soon.</p></div>`;
}).catch((e) => { root.innerHTML = `<div class="notice notice-error" role="alert"><p>${esc(e.message)}</p><button class="btn btn-ghost btn-sm" data-reload>Try again</button></div>`; });
