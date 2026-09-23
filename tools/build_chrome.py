#!/usr/bin/env python3
"""Writes the site header and footer into every public HTML page so the navigation is in the HTML itself
(crawlable, no JavaScript needed). site.js only wires up behaviour. Re-run after changing HEADER or FOOTER."""
import re, glob, os
ROOT = os.path.join(os.path.dirname(__file__), '..', 'public')
CATS = [('snap-bars', 'Snap Bars'), ('wax-melt-shapes', 'Melt Shapes'), ('sample-boxes', 'Sample Boxes'), ('gift-sets', 'Gift Sets'), ('accessories', 'Accessories'), ('seasonal', 'Seasonal')]
BASKET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9h14l-1.4 10.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 9Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>'
MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
tiles = ''.join(f'<a class="nav-tile" href="/shop?category={c}"><img src="/assets/img/cat/{c}.webp" alt="" loading="lazy" decoding="async"><span>{n}</span></a>' for c, n in CATS)
HEADER = f'''<!-- chrome:start -->
<a class="skip" href="#main">Skip to content</a>
<div id="announce"></div>
<header class="site-header"><div class="wrap">
  <div class="header-main">
    <a class="brand" href="/" aria-label="Over The Rainbow Wax Melts – home"><img src="/assets/img/logo-180.webp" srcset="/assets/img/logo-180.webp 1x, /assets/img/logo-360.webp 2x" width="180" height="204" alt="Over The Rainbow Wax Melts"></a>
    <button class="icon-btn basket-btn" type="button" id="basket-btn" aria-haspopup="dialog">{BASKET}<span class="basket-count" data-n="0" aria-hidden="true">0</span><span class="visually-hidden" id="basket-label">Basket, 0 items</span></button>
    <button class="icon-btn menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu"><span class="menu-icon when-closed">{MENU}</span><span class="menu-icon when-open">{CLOSE}</span><span class="visually-hidden">Menu</span></button>
  </div>
  <div class="site-menu" id="site-menu">
    <nav class="site-nav" aria-label="Shop">
      <a class="nav-home" href="/">Home</a>
      <div class="nav-grid">{tiles}</div>
      <div class="nav-more"><a href="/shop">All products</a><a href="/blog">Blog</a><a href="/faq">FAQs</a><a href="/delivery-returns">Delivery &amp; returns</a><a href="/contact">Contact</a></div>
    </nav>
  </div>
</div></header>
<!-- chrome:end -->'''
FOOTER = '''<!-- footer:start -->
<footer class="site-footer"><div class="wrap"><div class="footer-grid">
  <div><h2>Over The Rainbow</h2><p>Handmade wax melts, delivered across the UK.</p><p id="footer-contact"></p></div>
  <div><h2>Shop</h2><ul><li><a href="/shop">All products</a></li><li><a href="/shop?category=sample-boxes">Sample boxes</a></li><li><a href="/shop?category=gift-sets">Gift sets</a></li><li><a href="/shop?category=seasonal">Seasonal scents</a></li><li><a href="/blog">Blog</a></li><li><a href="/basket">Your basket</a></li></ul></div>
  <div><h2>Help</h2><ul><li><a href="/faq">FAQs</a></li><li><a href="/contact">Contact</a></li><li><a href="/delivery-returns">Delivery &amp; returns</a></li><li><a href="/privacy">Privacy policy</a></li><li><a href="/terms">Terms &amp; conditions</a></li></ul></div>
</div><p class="footer-base">© <span id="year"></span> Over The Rainbow. Prices in GBP. UK delivery only.</p></div></footer>
<!-- footer:end -->'''
for f in sorted(glob.glob(os.path.join(ROOT, '*.html'))):
    if os.path.basename(f) in ('404.html',) and '<main' not in open(f).read(): continue
    s = open(f).read()
    s = re.sub(r'<!-- chrome:start -->.*?<!-- chrome:end -->\n?', '', s, flags=re.S)
    s = re.sub(r'\n?<!-- footer:start -->.*?<!-- footer:end -->', '', s, flags=re.S)
    s = s.replace('<body>\n', '<body>\n' + HEADER + '\n', 1)
    s = s.replace('</main>\n', '</main>\n' + FOOTER + '\n', 1)
    assert '<!-- chrome:start -->' in s and '<!-- footer:start -->' in s, f
    open(f, 'w').write(s)
    print('chrome ->', os.path.basename(f))
