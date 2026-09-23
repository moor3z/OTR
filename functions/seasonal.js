// Old /seasonal address → the Seasonal category on the shop page.
export const onRequestGet = () => new Response(null, { status: 301, headers: { location: '/shop?category=seasonal' } });
