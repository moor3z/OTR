// Local stand-in for api.postcodes.io used by tests/run.mjs. Knows a handful of
// postcodes; anything else comes back as not found, like the real service.
import http from 'node:http';
const KNOWN = {
  CH657DN: [53.2869, -2.9033],  // the shop, Whitby, Ellesmere Port
  CH11AA: [53.1909, -2.8906],   // Chester centre, about 7 miles
  CH659AA: [53.2800, -2.9100],  // round the corner
  L11AA: [53.4070, -2.9870],    // Liverpool centre, about 10 miles
  M11AA: [53.4794, -2.2451],    // Manchester, about 30 miles
  SW1A1AA: [51.5010, -0.1416],  // London
};
export let fail = false;
export const setFail = (v) => { fail = v; };
http.createServer((req, res) => {
  let body = ''; req.on('data', (c) => (body += c));
  req.on('end', () => {
    if (fail) { res.writeHead(503); return res.end('down'); }
    const { postcodes = [] } = JSON.parse(body || '{}');
    const result = postcodes.map((q) => {
      const k = String(q).replace(/\s+/g, '').toUpperCase();
      return { query: q, result: KNOWN[k] ? { postcode: k, latitude: KNOWN[k][0], longitude: KNOWN[k][1] } : null };
    });
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 200, result }));
  });
}).listen(8797, () => console.log('mock postcodes on 8797'));
