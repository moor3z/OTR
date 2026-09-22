// ─────────────────────────────────────────────────────────────────────────────
//  SAMPLE DATA — NOT REAL PRODUCTS OR PRICES
//  Everything in this file is placeholder content inserted once, the first time
//  the site runs against an empty database. Every product below is flagged
//  is_sample = 1, shows a "Sample" badge in the admin area, and can be removed
//  in one click (Admin → Products → "Delete all sample products").
//  Replace via the admin area; you should not need to edit this file.
// ─────────────────────────────────────────────────────────────────────────────

import { DEFAULT_USAGE as USAGE, DEFAULT_SAFETY as SAFETY } from './content.js';

// price in pence. variants: [label, pricePence, stock]
const p = (id, name, category, scents, short, description, weight, variants, extra = {}) => ({
  id, name, category, scents, short_desc: short, description, weight,
  usage: USAGE, safety: SAFETY, image_url: `/assets/ph/${id}.svg`,
  option_name: extra.option_name || '', featured: extra.featured ? 1 : 0,
  sold_out: extra.sold_out ? 1 : 0, variants,
});

export const SAMPLE_PRODUCTS = [
  p('fresh-linen-snap-bar', 'Fresh Linen Snap Bar', 'snap-bars', ['fresh'],
    'Crisp, just-washed cotton with a soft airy finish.',
    'A clean laundry-day scent: crisp cotton up front with a light, airy finish. Snap off a piece or two and pop it in your burner.',
    'Sample weight: 50g', [['Default', 350, 24]], { featured: true }),
  p('lavender-dreams-snap-bar', 'Lavender Dreams Snap Bar', 'snap-bars', ['floral'],
    'Soft lavender with a gentle herbal edge.',
    'A calm, soft lavender with a gentle herbal edge. A nice one for the evening.',
    'Sample weight: 50g', [['Default', 350, 18]]),
  p('vanilla-cloud-snap-bar', 'Vanilla Cloud Snap Bar', 'snap-bars', ['sweet'],
    'Whipped vanilla, warm and creamy.',
    'Warm, creamy vanilla with a whipped, marshmallow-soft feel.',
    'Sample weight: 50g', [['Default', 350, 20]], { featured: true }),
  p('strawberry-sugar-hearts', 'Strawberry Sugar Hearts', 'wax-melt-shapes', ['fruity', 'sweet'],
    'Ripe strawberry dusted with sugar, in heart shapes.',
    'Heart-shaped melts scented with ripe strawberry and a dusting of sugar. Choose a small or large bag.',
    'Sample weights: 40g / 80g', [['Bag of 6', 400, 15], ['Bag of 12', 700, 10]], { option_name: 'Size', featured: true }),
  p('coconut-breeze-melts', 'Coconut Breeze Melts', 'wax-melt-shapes', ['fresh', 'fruity'],
    'Creamy coconut with a light sea-air freshness.',
    'Creamy coconut lifted by a light, breezy freshness. A holiday in a burner.',
    'Sample weight: 45g', [['Default', 400, 16]]),
  p('rainbow-sherbet-melts', 'Rainbow Sherbet Melts', 'wax-melt-shapes', ['sweet', 'fruity'],
    'Fizzy citrus sherbet with a sweet-shop twist.',
    'Fizzy, zingy citrus sherbet with a sweet-shop twist. Our most colourful melt.',
    'Sample weight: 45g', [['Default', 425, 22]], { featured: true }),
  p('clean-cotton-melts', 'Clean Cotton Melts', 'wax-melt-shapes', ['fresh'],
    'Light, powdery cotton. Simple and clean.',
    'A light, powdery cotton scent. Simple, clean and easy to live with.',
    'Sample weight: 45g', [['Default', 400, 0]]),
  p('rose-garden-melts', 'Rose Garden Melts', 'wax-melt-shapes', ['floral'],
    'Fresh-cut roses with a hint of green stem.',
    'Fresh-cut roses with a hint of green stem, like walking past a garden in June.',
    'Sample weight: 45g', [['Default', 400, 14]]),
  p('pumpkin-spice-melts', 'Pumpkin Spice Melts', 'wax-melt-shapes', ['halloween', 'sweet'],
    'Cinnamon, nutmeg and warm baked pumpkin.',
    'Cinnamon, nutmeg and warm baked pumpkin. Autumn, sorted.',
    'Sample weight: 45g', [['Default', 425, 12]]),
  p('winter-berries-melts', 'Winter Berries Melts', 'wax-melt-shapes', ['christmas', 'fruity'],
    'Dark berries with a frosty, festive sparkle.',
    'Dark, juicy berries with a frosty, festive sparkle.',
    'Sample weight: 45g', [['Default', 425, 12]]),
  p('sweet-scents-sample-box', 'Sweet Scents Sample Box', 'sample-boxes', ['sweet'],
    'Six of our sweetest scents to try.',
    'Not sure where to start? Six sample-size melts from the sweeter end of the range.',
    'Sample contents: 6 × 10g', [['Default', 650, 10]], { featured: true }),
  p('fresh-favourites-sample-box', 'Fresh Favourites Sample Box', 'sample-boxes', ['fresh'],
    'Six clean, fresh scents in one box.',
    'Six sample-size melts from the clean and fresh end of the range.',
    'Sample contents: 6 × 10g', [['Default', 650, 10]]),
  p('rainbow-gift-box', 'Rainbow Gift Box', 'gift-sets', ['sweet', 'fruity', 'floral'],
    'A bright mix of melts, boxed and ready to give.',
    'A bright mix of snap bars and shaped melts, boxed and ready to give.',
    'Sample contents: 2 snap bars + 2 bags of melts', [['Default', 1800, 8]], { featured: true }),
  p('mini-melt-gift-set', 'Mini Melt Gift Set', 'gift-sets', ['sweet', 'fresh', 'floral'],
    'A little set of minis. Pick your scent family.',
    'A small gift set of mini melts. Pick the scent family that suits them best.',
    'Sample contents: 8 × 10g', [['Sweet', 1000, 6], ['Fresh', 1000, 6], ['Floral', 1000, 0]], { option_name: 'Scent family' }),
  p('white-ceramic-wax-burner', 'White Ceramic Wax Burner', 'accessories', [],
    'A simple white burner that suits any room.',
    'A simple white ceramic burner for use with an unscented tealight.',
    'Sample size: 11cm tall', [['Default', 1200, 5]]),
  p('wax-melt-storage-tin', 'Wax Melt Storage Tin', 'accessories', [],
    'Keeps your melts tidy and their scent fresh.',
    'A lidded tin to keep your melts tidy and their scent fresh.',
    'Sample size: 10cm across', [['Default', 500, 9]], { sold_out: true }),
];

export const DEFAULT_SETTINGS = {
  // Delivery — PLACEHOLDER figures, change in Admin → Delivery & settings
  delivery_pence: '395',
  free_delivery_threshold_pence: '3000', // '' or '0' = no free-delivery offer
  delivery_name: 'UK standard delivery',
  dispatch_estimate: 'Sample estimate: dispatched within 2–3 working days',
  // Homepage copy
  announcement: '',
  hero_headline: 'A little melt. | A lot of happiness.',
  hero_sub: 'Discover colourful wax melts and find your next favourite scent.',
  intro_title: 'Hello from Over The Rainbow',
  intro_text:
    'PLACEHOLDER COPY — replace in Admin → Delivery & settings. A couple of sentences about who makes the melts, where you are based and what makes your scents worth trying.',
  // Business details — deliberately blank. Fill these in before launch.
  business_name: 'Over The Rainbow',
  contact_email: '',
  contact_phone: '',
  business_address: '',
  order_notify_email: '',
};

const TODO = (what) => `[TO COMPLETE BEFORE LAUNCH: ${what}]`;

export const DEFAULT_PAGES = [
  { slug: 'contact', title: 'Contact us', body:
`Questions about an order or a scent? Get in touch and we will get back to you as soon as we can.

${TODO('your contact email address, and a phone number if you want to offer one. These are set in Admin → Delivery & settings and shown automatically below.')}

## Business details
${TODO('trading name / legal name of the business and its geographic address. UK online sellers must show these.')}` },
  { slug: 'delivery-returns', title: 'Delivery & returns', body:
`## Delivery
We currently deliver to UK addresses only. The delivery charge is shown in your basket before you pay.

${TODO('which courier or postal service you use, your real dispatch times, and cut-off times if any.')}

## Returns and cancellations
${TODO('your returns and cancellation policy. Include how customers cancel an order, how long they have, who pays return postage, how refunds are made, and what happens with damaged or faulty items. UK distance-selling rules give consumers cancellation rights, so check your wording against current guidance.')}` },
  { slug: 'privacy', title: 'Privacy policy', body:
`${TODO('your privacy policy. The points below describe what this website actually does, to help you write it.')}

## What this website collects
- When you place an order: your name, email address, delivery address and optional phone number, plus what you ordered.
- Card payments are handled by Stripe. Card details are entered on Stripe's page and never reach this website.
- Your basket is stored in your own browser. This site sets no advertising or tracking cookies.

## Still needed
${TODO('who the data controller is and how to contact them, how long order records are kept, who data is shared with (payment provider, email provider, courier), and how customers can ask for a copy or deletion of their data.')}` },
  { slug: 'terms', title: 'Terms & conditions', body:
`${TODO('your terms of sale. Typical sections: who you are, how orders are accepted, prices and payment, delivery, cancellations and returns, faulty goods, product safety and use, liability, governing law.')}

Prices are shown in pounds sterling (GBP).

${TODO('whether your prices include VAT, and your VAT number if you are registered. This site makes no statement about VAT until you add one.')}` },
];
