"""Generates the sample product images in public/assets/ph/. Dev tool only —
real product photos are uploaded through the admin area."""
import os
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'ph')
C = {  # name: (wax colour, darker edge, pale backdrop)
  'pink':  ('#FF9AD2', '#F46DB4', '#FFEAF5'), 'peach': ('#FFC4A8', '#F59E78', '#FFF0E8'),
  'yellow':('#FFE88A', '#F2CB45', '#FFF9DC'), 'mint':  ('#A9F2BC', '#6FD68C', '#E8FBEE'),
  'lilac': ('#DDB8F8', '#BE8AE8', '#F5EAFD'), 'white': ('#FFFFFF', '#D9D2DE', '#F3EEF6'),
  'berry': ('#E58BB0', '#B9467C', '#FBE6EF'), 'spice': ('#F7B877', '#DB8B3A', '#FFF1E0'),
}
HEART = 'M0 -18 C -10 -42 -52 -34 -52 -2 C -52 26 -18 44 0 66 C 18 44 52 26 52 -2 C 52 -34 10 -42 0 -18 Z'

def snap(c):
    w, e, _ = C[c]; segs = ''
    for i in range(5):
        x = 150 + i * 102
        segs += f'<rect x="{x}" y="330" width="92" height="150" rx="22" fill="{w}" stroke="{e}" stroke-width="5"/>'
        segs += f'<rect x="{x+16}" y="346" width="60" height="22" rx="11" fill="#fff" opacity=".55"/>'
    return f'<g transform="rotate(-8 400 400)"><rect x="132" y="312" width="536" height="186" rx="34" fill="{e}" opacity=".35"/>{segs}</g>'

def hearts(c, c2=None):
    out = ''
    for (x, y, s, r, col) in [(300, 360, 2.2, -14, c), (500, 330, 1.7, 12, c2 or c), (430, 510, 1.4, -4, c), (250, 540, 1.0, 18, c2 or c), (585, 500, 1.1, -20, c)]:
        w, e, _ = C[col]
        out += f'<g transform="translate({x} {y}) rotate({r}) scale({s})"><path d="{HEART}" fill="{w}" stroke="{e}" stroke-width="{4/s:.1f}"/><path d="M-32 -8 C -32 -22 -20 -28 -12 -24" fill="none" stroke="#fff" stroke-width="{7/s:.1f}" stroke-linecap="round" opacity=".7"/></g>'
    return out

def box(cols, bow=False):
    e = '#CDBBD8'
    g = f'<rect x="170" y="250" width="460" height="330" rx="28" fill="#fff" stroke="{e}" stroke-width="6"/>'
    k = 0
    for r in range(2):
        for i in range(3):
            w, ed, _ = C[cols[k % len(cols)]]; k += 1
            g += f'<rect x="{205+i*135}" y="{285+r*140}" width="120" height="120" rx="26" fill="{w}" stroke="{ed}" stroke-width="4"/>'
    if bow:
        w, ed, _ = C['pink']
        g += f'<rect x="376" y="250" width="48" height="330" fill="{w}" opacity=".9"/><rect x="170" y="392" width="460" height="46" fill="{w}" opacity=".9"/>'
        g += f'<g transform="translate(400 236)"><path d="M0 0 C -30 -70 -120 -60 -96 -8 C -84 18 -30 14 0 0 Z M0 0 C 30 -70 120 -60 96 -8 C 84 18 30 14 0 0 Z" fill="{w}" stroke="{ed}" stroke-width="5"/><circle r="17" fill="{ed}"/></g>'
    return g

def burner():
    e = '#CDBBD8'
    return (f'<path d="M270 300 h260 l-18 56 h-224 z" fill="#fff" stroke="{e}" stroke-width="6" stroke-linejoin="round"/>'
            f'<ellipse cx="400" cy="300" rx="130" ry="20" fill="{C["lilac"][0]}" stroke="{e}" stroke-width="6"/>'
            f'<path d="M292 356 h216 v210 a26 26 0 0 1 -26 26 h-164 a26 26 0 0 1 -26 -26 z" fill="#fff" stroke="{e}" stroke-width="6"/>'
            f'<path d="M352 592 v-110 a48 48 0 0 1 96 0 v110" fill="#F3EEF6" stroke="{e}" stroke-width="6"/>'
            f'<path d="M400 500 c-16 22 -14 40 0 48 c14 -8 16 -26 0 -48z" fill="{C["yellow"][1]}"/>')

def tin():
    e = '#B7A9C4'
    return (f'<path d="M210 380 v150 a190 56 0 0 0 380 0 v-150" fill="#E9E2EF" stroke="{e}" stroke-width="6"/>'
            f'<ellipse cx="400" cy="380" rx="190" ry="56" fill="#F7F3FA" stroke="{e}" stroke-width="6"/>'
            f'<ellipse cx="400" cy="372" rx="150" ry="40" fill="none" stroke="{e}" stroke-width="4" opacity=".6"/>'
            f'<g transform="translate(400 470) scale(.8)"><path d="{HEART}" fill="{C["pink"][0]}"/></g>')

def svg(name, art, backdrop):
    bg = C[backdrop][2]
    body = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="Sample image for {name}">'
            f'<rect width="800" height="800" fill="{bg}"/><ellipse cx="400" cy="640" rx="250" ry="26" fill="#2E1437" opacity=".07"/>{art}'
            f'<text x="400" y="742" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#2E1437" opacity=".45">Sample image</text></svg>')
    return body

ITEMS = {
  'fresh-linen-snap-bar': ('Fresh Linen Snap Bar', snap('white'), 'mint'),
  'lavender-dreams-snap-bar': ('Lavender Dreams Snap Bar', snap('lilac'), 'lilac'),
  'vanilla-cloud-snap-bar': ('Vanilla Cloud Snap Bar', snap('yellow'), 'yellow'),
  'strawberry-sugar-hearts': ('Strawberry Sugar Hearts', hearts('pink'), 'pink'),
  'coconut-breeze-melts': ('Coconut Breeze Melts', hearts('white', 'mint'), 'mint'),
  'rainbow-sherbet-melts': ('Rainbow Sherbet Melts', hearts('yellow', 'pink'), 'peach'),
  'clean-cotton-melts': ('Clean Cotton Melts', hearts('white'), 'lilac'),
  'rose-garden-melts': ('Rose Garden Melts', hearts('berry', 'pink'), 'pink'),
  'pumpkin-spice-melts': ('Pumpkin Spice Melts', hearts('spice', 'peach'), 'spice'),
  'winter-berries-melts': ('Winter Berries Melts', hearts('berry', 'lilac'), 'berry'),
  'sweet-scents-sample-box': ('Sweet Scents Sample Box', box(['pink', 'yellow', 'peach', 'lilac', 'pink', 'yellow']), 'yellow'),
  'fresh-favourites-sample-box': ('Fresh Favourites Sample Box', box(['mint', 'white', 'lilac', 'white', 'mint', 'lilac']), 'mint'),
  'rainbow-gift-box': ('Rainbow Gift Box', box(['pink', 'peach', 'yellow', 'mint', 'lilac', 'pink'], bow=True), 'lilac'),
  'mini-melt-gift-set': ('Mini Melt Gift Set', box(['peach', 'mint', 'lilac', 'yellow', 'pink', 'mint'], bow=True), 'peach'),
  'white-ceramic-wax-burner': ('White Ceramic Wax Burner', burner(), 'peach'),
  'wax-melt-storage-tin': ('Wax Melt Storage Tin', tin(), 'yellow'),
}
os.makedirs(OUT, exist_ok=True)
for slug, (name, art, bg) in ITEMS.items():
    open(os.path.join(OUT, slug + '.svg'), 'w').write(svg(name, art, bg))
open(os.path.join(OUT, 'blank.svg'), 'w').write(svg('product', hearts('lilac', 'pink'), 'white').replace('Sample image', 'No image yet'))
print(len(ITEMS) + 1, 'placeholders written')
