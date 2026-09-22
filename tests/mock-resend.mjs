// Local stand-in for api.resend.com used by tests/email-test.mjs. Set MODE to
// 'ok' (batch works), 'nobatch' (batch 404, singles ok), or 'ratelimit' (2nd single gets 429 once).
import http from 'node:http';
export const received = [];
let singles = 0;
http.createServer((req, res) => {
  let body = ''; req.on('data', (c) => (body += c));
  req.on('end', () => {
    const mode = process.env.MODE || 'ok';
    const data = JSON.parse(body || '[]');
    const reply = (code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };
    if (req.url === '/emails/batch') {
      if (mode !== 'ok') return reply(404, { name: 'not_found', message: 'batch off' });
      received.push(...data); return reply(200, { data: data.map((_, i) => ({ id: 'b' + i })) });
    }
    singles++;
    if (mode === 'ratelimit' && singles === 2) return reply(429, { name: 'rate_limit_exceeded', message: 'Too many requests' });
    received.push(data); reply(200, { id: 's' + singles });
  });
}).listen(8798, () => console.log('mock resend on 8798'));
