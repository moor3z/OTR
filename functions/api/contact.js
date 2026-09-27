import { getDb, getSettings } from '../../server/db.js';
import { handle, json, readJson, httpError } from '../../server/util.js';
import { sendContactEmail, emailConfigured } from '../../server/email.js';

const TOPICS = ['An order', 'A product or scent', 'Delivery', 'Wholesale or bulk', 'Something else'];
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max);

export const onRequestPost = handle(async ({ env, request }) => {
  const form = request.headers.get('content-type')?.includes('form') ? Object.fromEntries(await request.formData()) : await readJson(request);

  // Spam checks. "website" is a honeypot: it is hidden from people, so anything
  // typed in it came from a bot. "started" is when the page loaded; real people
  // take more than a couple of seconds to write a message.
  if (clean(form.website, 200)) return json({ ok: true }); // silently accept, send nothing
  const age = Date.now() - Number(form.started || 0);
  if (Number(form.started) && age >= 0 && age < 2500) throw httpError(400, 'That was too quick. Please try again.');

  const name = clean(form.name, 80);
  const email = clean(form.email, 120);
  const topic = TOPICS.includes(clean(form.topic, 40)) ? clean(form.topic, 40) : TOPICS[TOPICS.length - 1];
  const order = clean(form.order, 40);
  const message = clean(form.message, 4000);

  const errors = {};
  if (name.length < 2) errors.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please check your email address.';
  if (message.length < 10) errors.message = 'Please write a little more so we can help.';
  if (Object.keys(errors).length) throw httpError(422, 'Please check the form.', { errors });

  const db = await getDb(env);
  const settings = await getSettings(db);
  if (!emailConfigured(env)) throw httpError(503, 'Our contact form is not available right now. Please email us instead.');
  await sendContactEmail(env, { name, email, topic, order, message }, settings);
  return json({ ok: true });
});

// Without JavaScript the form posts normally; send people to a thank-you page.
export const onRequestGet = () => new Response(null, { status: 303, headers: { location: '/contact' } });
