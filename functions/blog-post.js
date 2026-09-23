// Old address /blog-post?slug=x → /blog/x
export const onRequestGet = ({ request }) => {
  const slug = new URL(request.url).searchParams.get('slug') || '';
  return new Response(null, { status: 301, headers: { location: slug ? `/blog/${encodeURIComponent(slug)}` : '/blog' } });
};
