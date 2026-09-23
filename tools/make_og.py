#!/usr/bin/env python3
"""Makes /assets/img/og-default.png (1200x630): the share image used when a page has no photo of its own."""
import os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets')
W, H = 1200, 630
im = Image.new('RGB', (W, H), '#2e1437')
d = ImageDraw.Draw(im)
# soft pink glow top-right, like the hero card
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((760, -260, 1400, 380), fill=(255, 137, 205, 70))
im.paste(Image.alpha_composite(im.convert('RGBA'), glow).convert('RGB'))
logo = Image.open(os.path.join(ROOT, 'img', 'logo-720.webp')).convert('RGBA')
lh = 440; lw = round(logo.width * lh / logo.height)
logo = logo.resize((lw, lh), Image.LANCZOS)
im.paste(logo, (110, (H - lh) // 2), logo)
try:
    big = ImageFont.truetype(os.path.join(ROOT, 'fonts', 'bricolage-grotesque-latin-wght-normal.woff2'), 64)
    small = ImageFont.truetype(os.path.join(ROOT, 'fonts', 'dm-sans-latin-wght-normal.woff2'), 30)
    big.set_variation_by_axes([700]); small.set_variation_by_axes([500])
except Exception:
    big = small = ImageFont.load_default()
x = 110 + lw + 70
d.text((x, 200), 'A little melt.', font=big, fill='#fff7ec')
d.text((x, 275), 'A lot of happiness.', font=big, fill='#ff89cd')
d.text((x, 390), 'Handmade wax melts, snap bars,', font=small, fill='#fff7ec')
d.text((x, 428), 'sample boxes and gift sets.', font=small, fill='#fff7ec')
d.text((x, 466), 'Delivered across the UK.', font=small, fill='#fff7ec')
out = os.path.join(ROOT, 'img', 'og-default.png')
im.save(out, optimize=True)
print(out, os.path.getsize(out) // 1024, 'KB')
