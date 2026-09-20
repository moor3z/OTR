// Local stand-in for api.stripe.com, used ONLY by tests/run.mjs.
import http from 'node:http';
export const sessions = [];
http.createServer((req, res) => {
  let body = ''; req.on('data', (c) => (body += c));
  req.on('end', () => {
    const f = new URLSearchParams(body);
    const amount = [...f.keys()].filter((k) => /^line_items\[\d+\]\[quantity\]$/.test(k)).reduce((n, k) => {
      const i = k.match(/\d+/)[0]; return n + Number(f.get(k)) * Number(f.get(`line_items[${i}][price_data][unit_amount]`)); }, 0)
      + Number(f.get('shipping_options[0][shipping_rate_data][fixed_amount][amount]'));
    const s = { id: 'cs_test_' + Math.random().toString(36).slice(2), url: f.get('success_url'), cancel_url: f.get('cancel_url'), amount_total: amount,
      client_reference_id: f.get('client_reference_id'), auth: req.headers.authorization, form: Object.fromEntries(f) };
    sessions.push(s);
    res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify(s));
  });
}).listen(8799, () => console.log('mock stripe on 8799'));
