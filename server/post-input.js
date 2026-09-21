import { okImage, slugify } from './product-input.js';
import { clean, httpError } from './util.js';

export { slugify };
export function parsePost(body) {
  const fields = {};
  const p = {
    title: clean(body.title, 140), excerpt: clean(body.excerpt, 300),
    body: String(body.body ?? '').trim().slice(0, 60000), image_url: clean(body.image_url, 500),
    published: body.published ? 1 : 0,
  };
  const d = body.published_at ? new Date(body.published_at) : new Date();
  p.published_at = Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  if (p.title.length < 3) fields.title = 'Enter a title.';
  if (!p.body) fields.body = 'Write the post before saving.';
  if (!okImage(p.image_url)) fields.image_url = 'Image must be an uploaded image or an https:// address.';
  if (Object.keys(fields).length) throw httpError(422, 'Please check the highlighted fields.', { fields });
  return p;
}
