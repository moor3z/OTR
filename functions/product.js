// Old address /product?id=x → /products/x
export const onRequestGet = ({ request }) => {
  const id = new URL(request.url).searchParams.get('id') || '';
  return new Response(null, { status: 301, headers: { location: id ? `/products/${encodeURIComponent(id)}` : '/shop' } });
};
