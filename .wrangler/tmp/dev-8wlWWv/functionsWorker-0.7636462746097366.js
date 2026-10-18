var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-fBRSuf/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init2) {
  const request = new Request(input, init2);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// .wrangler/tmp/pages-tDM8tr/functionsWorker-0.7636462746097366.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function stripCfConnectingIPHeader2(input, init2) {
  const request = new Request(input, init2);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader2, "stripCfConnectingIPHeader");
__name2(stripCfConnectingIPHeader2, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader2.apply(null, argArray)
    ]);
  }
});
var FAQ_PAGE = {
  slug: "faq",
  title: "Frequently asked questions",
  body: `## Using wax melts

Q: How do I use a wax melt?
Break off one or two pieces and place them in the dish of your burner. Light an unscented tealight underneath, or switch on your electric warmer, and the wax will melt and release its fragrance. Never add water to the dish, and always follow the instructions that came with your burner.

Q: How much wax should I use?
Start with one or two pieces. For a larger room or a stronger scent, add another piece. Do not overfill the dish.

Q: How long does the scent last?
It varies with the fragrance, your burner and the size of the room. The wax itself does not evaporate, only the fragrance does, so when you can no longer smell it, it is time to swap the wax for a fresh piece.

Q: How do I change the wax?
While the wax is warm and liquid, soak it up with a couple of cotton pads or kitchen roll and wipe the dish clean. Or let it cool and set fully, then gently push it and it should pop out in one piece. Never pour wax down the sink.

Q: How should I store my melts?
Somewhere cool, dry and out of direct sunlight, ideally in a tin or sealed bag. This keeps the fragrance stronger for longer.

## Our products

Q: Are your wax melts handmade?
Yes. Every melt is handmade in small batches in Cheshire by Michelle.

Q: Are your products cruelty free?
Yes, our products are cruelty free.

Q: What is the label on my wax melts for?
Products that contain fragrance carry a CLP label. It lists the allergens in that particular scent and any safety information you need. Please read it before use, especially if you or anyone in your home has allergies or sensitivities.

Q: Are wax melts safe around children and pets?
Wax melts are not food, and burners get hot. Keep melts and burners out of reach of children and pets, and never leave a lit burner unattended. If you have concerns about a particular fragrance and your pet, check the label and speak to your vet.

Q: Do you add new scents?
All the time. Check back regularly to see what is new.

## Orders and delivery

Q: Do I need an account to order?
No. You can check out as a guest with just your email address and delivery address.

Q: How can I pay?
By debit or credit card, and with Apple Pay or Google Pay where your device supports it. Payments are handled securely by Stripe, and we never see your card details.

Q: How much is delivery?
The delivery charge is shown in your basket before you pay, and any free delivery offer is applied automatically.

Q: Who delivers my order?
We send orders with Royal Mail, Evri or DPD, depending on the size and weight of your parcel. Dispatch times are on our Delivery and returns page.

Q: Do you deliver outside the UK?
Not at the moment. We currently deliver to UK addresses only.

Q: My order has not arrived. What should I do?
If it has been more than 10 working days since dispatch, contact us with your order number, which starts with OTR, and we will chase it with the courier.

## Returns

Q: Can I return my order?
Yes. You can cancel within 14 days of receiving your order, as long as the items are unused and in their original packaging. Full details are on our Delivery and returns page.

Q: Something arrived damaged or is not what I ordered. What now?
Contact us within 30 days with your order number and a photo. We will replace it or refund you, and you will not pay return postage.

Q: I have a question that is not answered here.
Get in touch using the details on our Contact page and we will be happy to help.`
};
var BLOG_POSTS = [
  {
    slug: "how-to-use-wax-melts-beginners-guide",
    title: "How to use wax melts: a beginner's guide",
    image_url: "/assets/img/cat/accessories.webp",
    excerpt: "New to wax melts? Here is everything you need to get started, from choosing a burner to changing your wax without the mess.",
    body: `If you have never used wax melts before, they are one of the easiest ways to fragrance your home. There is no wick and no flame in the wax itself, just scented wax that you warm gently until it releases its fragrance.

## What you need
- A wax burner. This can be a ceramic burner that uses a tealight, or an electric warmer.
- Unscented tealights, if your burner uses them. Scented tealights will compete with your melt.
- Your wax melts.

## Step by step
- Place your burner on a flat, heat-resistant surface, away from draughts and anything that could catch fire.
- Break off one or two pieces of wax and pop them in the dish on top. Do not add water.
- Light the tealight underneath, or switch your warmer on.
- Within a few minutes the wax will start to melt and the scent will begin to fill the room.

## When the scent fades
The wax does not disappear as you use it, only the fragrance does. When you can no longer smell it, it is time for a change. While the wax is still warm and liquid, soak it up with a couple of cotton pads and wipe the dish. If it has already set, a gentle push at the edge will usually pop it out in one piece.

## A few sensible rules
Never leave a lit burner unattended, keep it out of reach of children and pets, and always read the label that comes with your melts. Follow the instructions for your own burner too, as they do vary.

That is all there is to it. Pick a scent, pop it in and enjoy.`
  },
  {
    slug: "snap-bars-shapes-or-sample-boxes",
    title: "Snap bars, shapes or sample boxes: which should you choose?",
    image_url: "/assets/img/cat/sample-boxes.webp",
    excerpt: "Not sure where to start? Here is a quick guide to our different types of wax melt and who each one suits best.",
    body: `We make our melts in a few different forms. They all work the same way in your burner, so the choice comes down to how you like to use them.

## Snap bars
A snap bar is a bar of scented wax divided into segments, a bit like a chocolate bar. You snap off a piece or two when you need them and keep the rest for later. They are tidy to store, easy to portion and a good choice once you have found a scent you love.

## Wax melt shapes
Hearts, stars, flowers and more. Shaped melts are the same lovely wax in a prettier form, often finished with botanicals. One shape is usually one use, so there is nothing to snap or measure. They make a sweet little gift too.

## Sample boxes
If you are new to wax melts, or just like variety, start here. A sample box gives you a selection of scents in smaller sizes, so you can find your favourites before committing to a full bar. It is the easiest way to discover something you would never have picked from a description alone.

## Gift sets
Ready-made sets that bring our products together in a gift box. Ideal for birthdays, thank yous and anyone who deserves a treat.

## Still not sure?
Go for a sample box first. Once you know which scents you keep reaching for, move on to snap bars of your favourites.`
  },
  {
    slug: "choosing-a-scent-for-every-room",
    title: "Choosing a scent for every room",
    image_url: "/assets/img/cat/wax-melt-shapes.webp",
    excerpt: "Fresh in the kitchen, floral in the bedroom, something sweet in the lounge. A simple guide to matching scents to spaces.",
    body: `The right scent can change how a room feels. There are no rules, but if you are not sure where to begin, here is how we like to match scent families to different spaces.

## Kitchen: fresh and fruity
Kitchens collect cooking smells, so clean, bright scents work well here. Think fresh linen, citrus and crisp fruity fragrances that lift the room without clashing with food.

## Living room: sweet and welcoming
This is where you relax and where guests gather, so go for something warm and inviting. Sweet scents like vanilla and bakery-style fragrances make a room feel cosy.

## Bedroom: soft florals
Gentle floral scents such as lavender and rose suit a room that is all about winding down. Keep it light, and remember to blow out your tealight before you go to sleep.

## Bathroom: clean and spa-like
Fresh cotton, sea-breeze and other clean scents give a bathroom that just-cleaned, spa feeling.

## Hallway: your signature scent
The hallway is the first thing people notice when they walk in. Choose the scent you love most and make it the one people remember your home by.

## And for the seasons
Swapping scents with the seasons is half the fun. Pumpkin and spiced fragrances for Halloween, pine and candy cane for Christmas, fresh florals in spring, and fruity, tropical scents for summer.

Our shop lets you filter by scent family, so you can browse Fresh, Floral, Fruity, Sweet, Halloween and Christmas and find a match for every room.`
  },
  {
    slug: "how-to-store-wax-melts",
    title: "How to store wax melts so they stay beautifully scented",
    image_url: "/assets/img/cat/snap-bars.webp",
    excerpt: "A few simple storage habits will keep your melts smelling their best for longer.",
    body: `Wax melts are easy to look after, but a little care goes a long way. Fragrance fades faster when wax is exposed to heat, light and air, so good storage keeps your melts smelling just as they should.

## Keep them cool
Store your melts somewhere cool, away from radiators, sunny windowsills and warm appliances. Wax softens in heat, and warmth encourages the fragrance to escape before you have had the chance to enjoy it.

## Keep them out of the light
Direct sunlight can fade the colour of your melts as well as the scent. A cupboard or drawer is ideal.

## Keep them sealed
Air is the enemy of fragrance. Keep melts in their original packaging until you use them, or pop them in a lidded tin. A storage tin also stops different scents mingling with each other.

## Keep scents apart
Strong fragrances can transfer between melts stored loose together. If you have a collection, keep each scent in its own bag or compartment.

## Use them, do not save them
Wax melts are made to be enjoyed. They are at their best when fresh, so there is no need to keep them for a special occasion. Buy what you will use over the next few months and treat yourself regularly.`
  }
];
var ABOUT_COPY = {
  "intro_title": "Handmade in Cheshire by Michelle",
  "intro_text": "Every Over The Rainbow wax melt is homemade, cruelty free and poured by hand in small batches here in Cheshire. We're passionate about premium quality, and it shows: luxurious, highly scented melts with an excellent scent throw that fills the room.\n\nWhat makes us really special is the variety. Our scent-sational range runs from fresh and floral to fruity and sweet, plus Halloween and Christmas specials, and every fragrance is tested before it goes on sale and labelled to CLP requirements.\n\nNew scents are added all the time, so be sure to check back regularly!"
};
var POLICY_PAGES = [
  { slug: "privacy", stillPlaceholder: "LAUNCH: your privacy policy. The points below", body: "This policy explains what personal information Over The Rainbow collects when you use this website, why we collect it and what your rights are. We keep it to what we need to send your order.\n\n## Who we are\n[TO COMPLETE BEFORE LAUNCH: the legal name of the business or person who runs the shop, and the business address.] We are the data controller for the information described below.\n\nIf you have any questions about your data, contact us at [TO COMPLETE BEFORE LAUNCH: contact email address].\n\n## What we collect\n- When you place an order: your name, email address, delivery address, phone number if you choose to give one, and what you ordered.\n- When you contact us: your email address and whatever you tell us in your message.\n- Technical information: our hosting provider records standard details such as IP address and browser type to keep the site secure and working.\n\nWe do not see or store your card details. Payments are taken on Stripe's secure payment page.\n\n## Why we use it\n- To process, deliver and support your order. The legal basis is our contract with you.\n- To keep order and tax records. The legal basis is our legal obligations.\n- To keep the website secure and prevent fraud. The legal basis is our legitimate interests.\n\nWe do not sell your information and we do not send marketing emails unless you have asked for them.\n\n## Who we share it with\nWe only share what each provider needs to do its job:\n- Stripe, to take your payment.\n- Cloudflare, which hosts this website and stores order records.\n- Our email provider, to send your order confirmation.\n- [TO COMPLETE BEFORE LAUNCH: the courier or postal service you use], to deliver your parcel.\n\nSome of these providers are based outside the UK. Where information is transferred abroad, it is protected by safeguards recognised under UK data protection law.\n\n## Cookies and browser storage\nThis website does not use advertising or tracking cookies. Your basket is saved in your own browser so it is still there if you refresh the page, and the details you type at checkout are held in your browser only until you close the tab. Stripe may set its own cookies on its payment page to prevent fraud.\n\n## How long we keep it\nWe keep order records for up to six years after the end of the tax year of your order, because tax rules require us to keep sales records. Messages you send us are kept for up to two years. After that the information is deleted.\n\n## Your rights\nUnder UK data protection law you can ask us to:\n- give you a copy of the information we hold about you\n- correct anything that is wrong\n- delete your information, where we are not required by law to keep it\n- stop or limit how we use it\n\nTo use any of these rights, email us at the address above. We will reply within one month. If you are unhappy with how we have handled your information, you can complain to the Information Commissioner's Office at ico.org.uk or on 0303 123 1113.\n\n## Changes to this policy\nWe may update this policy from time to time. The latest version will always be on this page.\n\nLast updated: [TO COMPLETE BEFORE LAUNCH: date you publish this]." },
  { slug: "delivery-returns", stillPlaceholder: "which courier or postal service you use, your real", body: '## Delivery\nWe deliver to UK addresses only. The delivery charge is shown in your basket before you pay, and any free delivery offer is applied automatically.\n\nOrders are sent with Royal Mail, Evri or DPD. We choose the service that best suits the size and weight of your parcel. Where the service includes tracking, the courier will send updates to the email address or phone number you gave at checkout.\n\n## Dispatch and delivery times\n[TO COMPLETE BEFORE LAUNCH: your dispatch time, for example "Our melts are made in small batches, so orders are dispatched within 3 working days."]\n\nMost parcels arrive within a few working days of dispatch. Delivery times are estimates from the couriers and are not guaranteed, especially around Christmas and other busy periods.\n\nPlease check your address carefully at checkout. If you spot a mistake, contact us straight away and we will correct it if your order has not yet been sent.\n\n## If your parcel does not arrive\nIf your order has not arrived within 10 working days of dispatch, contact us with your order number and we will chase it with the courier. If it cannot be found, we will send a replacement or refund you.\n\n## Changed your mind\nYou can cancel your order for any reason up to 14 days after the day you receive it. Tell us by email, then send the items back within 14 days of telling us. Items should be unused and in their original packaging.\n\nYou will need to pay the return postage, and we recommend a tracked service as we cannot refund parcels that do not reach us. Once we receive the items we will refund what you paid for them, plus the standard delivery charge, to your original payment method within 14 days.\n\nIf you want to cancel before your order has been dispatched, contact us and we will cancel and refund it in full.\n\n## Damaged, faulty or wrong items\nIf something arrives damaged, faulty or is not what you ordered, contact us within 30 days with your order number and a photo. We will send a replacement or give you a full refund, whichever you prefer, and you will not pay any return postage.\n\n## How to contact us\nUse the details on our Contact page and include your order number, which starts with OTR. We aim to reply within [TO COMPLETE BEFORE LAUNCH: your reply time, for example "2 working days"].\n\nNothing in this policy affects your legal rights as a consumer.' },
  { slug: "terms", stillPlaceholder: "LAUNCH: your terms of sale. Typical sections", body: 'These terms apply when you buy from this website. Please read them before you order. By placing an order you agree to them.\n\n## Who we are\nOver The Rainbow is run by [TO COMPLETE BEFORE LAUNCH: the legal name of the business or person who runs the shop, and the business address]. You can reach us using the details on our Contact page.\n\n## Ordering\n- You must be 18 or over to order.\n- When you pay, you are making an offer to buy. Your order is accepted, and a contract is formed, when your payment is confirmed and we send your order confirmation.\n- We sell to consumers for personal use. If you would like to buy wholesale, please contact us first.\n- If we cannot supply something you have paid for, for example because of a stock or pricing error, we will tell you as soon as we can and refund you in full.\n\n## Prices and payment\n- Prices are shown in pounds sterling (GBP). [TO COMPLETE BEFORE LAUNCH: your VAT statement. Either "We are not VAT registered, so no VAT is charged." or "Prices include VAT. Our VAT number is ..."]\n- The delivery charge is shown in your basket before you pay.\n- Payment is taken securely by Stripe when you order. We never see or store your card details.\n- Prices can change at any time, but changes never affect an order you have already paid for.\n\n## Our products\n- Every item is made by hand, so colours, shapes and decorations may vary slightly from the photos.\n- Scent is personal, and how strongly a melt fragrances a room depends on the burner, the room and the amount used.\n- Photos of burners and accessories in product pictures are for illustration and are only included where the description says so.\n\n## Using our products safely\nWax melts are for home fragrance only and are not food. Always read and follow the safety label and instructions supplied with each product, and the instructions for your burner. Never leave a lit burner unattended, and keep burners and melts out of reach of children and pets.\n\n## Delivery\nWe deliver to UK addresses only. Details of couriers, dispatch times and what happens if a parcel goes missing are on our Delivery and returns page, which forms part of these terms.\n\n## Cancellations, returns and faulty items\nYou can cancel within 14 days of receiving your order, and you have rights if anything arrives damaged, faulty or not as described. How to do this, and how refunds are made, is explained on our Delivery and returns page.\n\n## Our responsibility to you\n- If we fail to comply with these terms, we are responsible for loss or damage you suffer that is a foreseeable result of our failure.\n- We are not responsible for loss caused by products being used other than as instructed, or for delays outside our control, such as courier strikes or severe weather.\n- We supply products for domestic and private use only and have no liability for loss of profit or business.\n- Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for any of your legal rights as a consumer.\n\n## This website\nThe content, photos and branding on this website belong to Over The Rainbow and must not be copied without our permission. We try to keep the site accurate and available, but we cannot promise it will always be free from errors or interruptions.\n\n## Your information\nWe use your personal information only as set out in our Privacy policy.\n\n## Complaints and the law that applies\nIf you have a problem, please contact us first and we will do our best to put it right. These terms are governed by the law of England and Wales. You can bring legal proceedings in the courts of England and Wales, or in Scotland or Northern Ireland if you live there.\n\n## Changes to these terms\nWe may update these terms from time to time. The terms that apply to your order are the ones shown on this page on the day you ordered.\n\nLast updated: [TO COMPLETE BEFORE LAUNCH: date you publish this].' }
];
var SHOP_EMAIL = "michelle@overtherainbowwaxmelts.co.uk";
var SCENT_PRODUCTS = [
  [
    "Clean Cotton",
    "snap-bars",
    [
      "fresh"
    ]
  ],
  [
    "Spring Awakening",
    "snap-bars",
    [
      "fresh",
      "floral"
    ]
  ],
  [
    "Toasted Marshmallow",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Detol",
    "snap-bars",
    [
      "fresh"
    ]
  ],
  [
    "Flashy Lemon",
    "snap-bars",
    [
      "fresh",
      "fruity"
    ]
  ],
  [
    "Lemon Lavender",
    "snap-bars",
    [
      "floral",
      "fresh"
    ]
  ],
  [
    "Lenora Blue",
    "snap-bars",
    [
      "fresh"
    ]
  ],
  [
    "Lemon & Lime Fizz",
    "snap-bars",
    [
      "fruity"
    ]
  ],
  [
    "Pink Lemonade",
    "snap-bars",
    [
      "fruity",
      "sweet"
    ]
  ],
  [
    "Blue Raspberry Slushy",
    "snap-bars",
    [
      "fruity",
      "sweet"
    ]
  ],
  [
    "White Musk & Golden Maple",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Fluffy Towels",
    "snap-bars",
    [
      "fresh"
    ]
  ],
  [
    "Ghosts",
    "snap-bars",
    [
      "floral"
    ]
  ],
  [
    "Black Opium",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Savage",
    "snap-bars",
    [
      "fresh"
    ]
  ],
  [
    "Amber & Sandalwood",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Dragons Blood",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Cherry Vanilla",
    "snap-bars",
    [
      "fruity",
      "sweet"
    ]
  ],
  [
    "Cherry",
    "snap-bars",
    [
      "fruity"
    ]
  ],
  [
    "Angels",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Oud Wood",
    "snap-bars",
    []
  ],
  [
    "Vanilla Perfume",
    "snap-bars",
    [
      "sweet"
    ]
  ],
  [
    "Troll's Breath",
    "snap-bars",
    [
      "sweet",
      "halloween"
    ]
  ],
  [
    "Spooktacular",
    "snap-bars",
    [
      "sweet",
      "halloween"
    ]
  ],
  [
    "Trick or Treat",
    "snap-bars",
    [
      "sweet",
      "halloween"
    ]
  ],
  [
    "Witches Brew",
    "snap-bars",
    [
      "halloween"
    ]
  ],
  [
    "Spooky Pumpkin",
    "snap-bars",
    [
      "halloween"
    ]
  ],
  [
    "Vanilla Pumpkin",
    "snap-bars",
    [
      "sweet",
      "halloween"
    ]
  ],
  [
    "The Headless Horseman",
    "snap-bars",
    [
      "halloween"
    ]
  ],
  [
    "Candy Cane",
    "snap-bars",
    [
      "sweet",
      "christmas"
    ]
  ],
  [
    "Forest Pine & Cedarwood",
    "snap-bars",
    [
      "fresh",
      "christmas"
    ]
  ],
  [
    "Orange & Cinnamon",
    "snap-bars",
    [
      "fruity",
      "christmas"
    ]
  ]
];
var DEFAULT_USAGE = `Break off one or two pieces and place them in the dish of your burner. Light an unscented tealight underneath, or switch on your electric warmer, and the wax will melt and release its fragrance. Never add water to the dish.

The wax does not evaporate, only the fragrance does. When you can no longer smell it, let the wax cool and set, pop it out and replace it with a fresh piece. Never pour wax down the sink.

Store your melts somewhere cool and dry, out of direct sunlight, ideally in a tin or sealed bag.`;
var DEFAULT_SAFETY = `For home fragrance only. Not for eating. Keep melts and burners out of reach of children and pets.

Never leave a lit burner unattended. Place it on a flat, heat-resistant surface, away from draughts, curtains and anything that could catch fire, and always follow the instructions that came with your burner. The dish and the melted wax get hot, so let them cool before handling.

Read the CLP label on the packaging before use. It lists the allergens in this particular scent and any warnings that apply to it. If you or anyone in your home has allergies or sensitivities, check the label first.`;
var MORE_SCENTS = [
  [
    "Vanilla Blossom",
    "snap-bars",
    [
      "sweet",
      "floral"
    ],
    "Soft vanilla with a light floral lift.",
    "Creamy vanilla softened with white flowers, so it is warm without being sugary. A gentle everyday scent for a bedroom or living room."
  ],
  [
    "Watermelon",
    "snap-bars",
    [
      "fruity"
    ],
    "Juicy watermelon, cool and refreshing.",
    "Fresh-cut watermelon: sweet, watery and clean. Lovely through spring and summer, and in a kitchen or bathroom all year round."
  ],
  [
    "Sweet Orange",
    "snap-bars",
    [
      "fruity",
      "fresh"
    ],
    "Bright, zesty orange peel.",
    "Freshly peeled oranges, sharp and sunny with a soft sweetness underneath. A good pick-me-up for mornings and kitchens."
  ],
  [
    "Juicy Strawberry",
    "snap-bars",
    [
      "fruity"
    ],
    "Ripe strawberries, sweet and fresh.",
    "Sun-warmed strawberries picked at their best. Fruity and juicy rather than sugary, and a real favourite with children."
  ],
  [
    "Pineapple",
    "snap-bars",
    [
      "fruity"
    ],
    "Sharp, tropical pineapple.",
    "Golden pineapple with a tangy edge and a sweet finish. Fresh and tropical, perfect for brightening a dull day."
  ],
  [
    "Strawberry Bon Bon",
    "snap-bars",
    [
      "fruity",
      "sweet"
    ],
    "Old-fashioned strawberry sweet-shop.",
    "Chewy strawberry bon bons dusted with sugar. Proper sweet-shop nostalgia, sweeter and more sugary than our fresh strawberry."
  ],
  [
    "Bubblegum",
    "snap-bars",
    [
      "sweet"
    ],
    "Pink bubblegum, straight from the sweet shop.",
    "Sugary pink bubblegum with a fruity fizz. Playful and unmistakable, and always popular with younger noses."
  ],
  [
    "Lime, Basil & Mandarin",
    "snap-bars",
    [
      "fresh",
      "fruity"
    ],
    "Zesty lime and mandarin over garden herbs.",
    "Sharp lime and juicy mandarin lifted with peppery basil. Crisp, smart and fresh, and a firm favourite in hallways and living rooms."
  ],
  [
    "Vanilla Spice",
    "snap-bars",
    [
      "sweet"
    ],
    "Warm vanilla with cinnamon and orange blossom.",
    "Sweet vanilla wrapped in cinnamon and soft orange blossom, finished with amber. Cosy and grown-up, lovely on a cold evening."
  ],
  [
    "Pear & Orchid",
    "snap-bars",
    [
      "floral",
      "fruity"
    ],
    "Ripe pear, orchid and a toffee finish.",
    "Juicy pear over creamy orchid, with toffee and soft patchouli underneath. A modern, perfume-style scent for a bedroom or hallway."
  ],
  [
    "Violet & Leather",
    "snap-bars",
    [
      "floral"
    ],
    "Violet leaf over soft leather and woods.",
    "Green violet leaf against warm leather and cedar. Smart and slightly smoky, a departure from the usual sweet melts."
  ],
  [
    "Timeless Florals",
    "snap-bars",
    [
      "floral"
    ],
    "A classic bouquet of rose, jasmine and ylang.",
    "Rose, jasmine and ylang-ylang over a powdery, sandalwood base. The elegant, old-fashioned perfume scent, warm and comforting."
  ],
  [
    "Amber & Spice",
    "snap-bars",
    [
      "sweet"
    ],
    "Rich amber with warm spice and vanilla.",
    "Deep amber and spice softened with vanilla and a hint of orange. Warm and luxurious, made for autumn and winter evenings."
  ],
  [
    "Rose & Patchouli",
    "snap-bars",
    [
      "floral"
    ],
    "Fresh rose with orange and earthy patchouli.",
    "Bright orange and rose over patchouli and musk. Feminine and modern, and it fills a room beautifully."
  ],
  [
    "Blackcurrant & Birch",
    "snap-bars",
    [
      "fruity"
    ],
    "Blackcurrant and pineapple over smoky birch.",
    "Fruity blackcurrant and pineapple with birch and oakmoss underneath. Fresh and confident, one of our most grown-up fruity scents."
  ],
  [
    "Grapefruit & Sea Salt",
    "snap-bars",
    [
      "fresh"
    ],
    "Pink grapefruit with a salty sea breeze.",
    "Sharp grapefruit and bay leaf over a clean marine base. Crisp, sporty and refreshing, ideal for bathrooms and kitchens."
  ],
  [
    "Wild Violet & Jasmine",
    "snap-bars",
    [
      "floral"
    ],
    "Violet, jasmine and a touch of strawberry.",
    "Soft violet and jasmine brightened with wild strawberry, on a base of pale woods. Light, pretty and easy to live with."
  ],
  [
    "Washing Day",
    "snap-bars",
    [
      "fresh"
    ],
    "Clean laundry, just off the line.",
    "That unmistakable fresh-washing smell: soap, cotton and a hint of citrus. Makes the whole house smell freshly cleaned."
  ],
  [
    "Mandarin & Amber",
    "snap-bars",
    [
      "fruity",
      "sweet"
    ],
    "Blood mandarin with cinnamon, leather and amber.",
    "Juicy mandarin and cinnamon over leather and warm amber. Bold and long-lasting, a proper statement scent."
  ]
];
var CONTACT_COPY = {
  stillPlaceholder: "TO COMPLETE BEFORE LAUNCH",
  body: `Questions about an order, a scent, or anything else? Send us a message using the form below and we will come straight back to you.

We are a small handmade business, so your message is read and answered by Michelle herself, usually within one working day (Monday to Friday). If you are asking about an order, pop the order number in and it saves us both an email.`
};
var p = /* @__PURE__ */ __name2((id, name, category, scents, short, description, weight, variants, extra = {}) => ({
  id,
  name,
  category,
  scents,
  short_desc: short,
  description,
  weight,
  usage: DEFAULT_USAGE,
  safety: DEFAULT_SAFETY,
  image_url: `/assets/ph/${id}.svg`,
  option_name: extra.option_name || "",
  featured: extra.featured ? 1 : 0,
  sold_out: extra.sold_out ? 1 : 0,
  variants
}), "p");
var SAMPLE_PRODUCTS = [
  p(
    "fresh-linen-snap-bar",
    "Fresh Linen Snap Bar",
    "snap-bars",
    ["fresh"],
    "Crisp, just-washed cotton with a soft airy finish.",
    "A clean laundry-day scent: crisp cotton up front with a light, airy finish. Snap off a piece or two and pop it in your burner.",
    "Sample weight: 50g",
    [["Default", 350, 24]],
    { featured: true }
  ),
  p(
    "lavender-dreams-snap-bar",
    "Lavender Dreams Snap Bar",
    "snap-bars",
    ["floral"],
    "Soft lavender with a gentle herbal edge.",
    "A calm, soft lavender with a gentle herbal edge. A nice one for the evening.",
    "Sample weight: 50g",
    [["Default", 350, 18]]
  ),
  p(
    "vanilla-cloud-snap-bar",
    "Vanilla Cloud Snap Bar",
    "snap-bars",
    ["sweet"],
    "Whipped vanilla, warm and creamy.",
    "Warm, creamy vanilla with a whipped, marshmallow-soft feel.",
    "Sample weight: 50g",
    [["Default", 350, 20]],
    { featured: true }
  ),
  p(
    "strawberry-sugar-hearts",
    "Strawberry Sugar Hearts",
    "wax-melt-shapes",
    ["fruity", "sweet"],
    "Ripe strawberry dusted with sugar, in heart shapes.",
    "Heart-shaped melts scented with ripe strawberry and a dusting of sugar. Choose a small or large bag.",
    "Sample weights: 40g / 80g",
    [["Bag of 6", 400, 15], ["Bag of 12", 700, 10]],
    { option_name: "Size", featured: true }
  ),
  p(
    "coconut-breeze-melts",
    "Coconut Breeze Melts",
    "wax-melt-shapes",
    ["fresh", "fruity"],
    "Creamy coconut with a light sea-air freshness.",
    "Creamy coconut lifted by a light, breezy freshness. A holiday in a burner.",
    "Sample weight: 45g",
    [["Default", 400, 16]]
  ),
  p(
    "rainbow-sherbet-melts",
    "Rainbow Sherbet Melts",
    "wax-melt-shapes",
    ["sweet", "fruity"],
    "Fizzy citrus sherbet with a sweet-shop twist.",
    "Fizzy, zingy citrus sherbet with a sweet-shop twist. Our most colourful melt.",
    "Sample weight: 45g",
    [["Default", 425, 22]],
    { featured: true }
  ),
  p(
    "clean-cotton-melts",
    "Clean Cotton Melts",
    "wax-melt-shapes",
    ["fresh"],
    "Light, powdery cotton. Simple and clean.",
    "A light, powdery cotton scent. Simple, clean and easy to live with.",
    "Sample weight: 45g",
    [["Default", 400, 0]]
  ),
  p(
    "rose-garden-melts",
    "Rose Garden Melts",
    "wax-melt-shapes",
    ["floral"],
    "Fresh-cut roses with a hint of green stem.",
    "Fresh-cut roses with a hint of green stem, like walking past a garden in June.",
    "Sample weight: 45g",
    [["Default", 400, 14]]
  ),
  p(
    "pumpkin-spice-melts",
    "Pumpkin Spice Melts",
    "wax-melt-shapes",
    ["halloween", "sweet"],
    "Cinnamon, nutmeg and warm baked pumpkin.",
    "Cinnamon, nutmeg and warm baked pumpkin. Autumn, sorted.",
    "Sample weight: 45g",
    [["Default", 425, 12]]
  ),
  p(
    "winter-berries-melts",
    "Winter Berries Melts",
    "wax-melt-shapes",
    ["christmas", "fruity"],
    "Dark berries with a frosty, festive sparkle.",
    "Dark, juicy berries with a frosty, festive sparkle.",
    "Sample weight: 45g",
    [["Default", 425, 12]]
  ),
  p(
    "sweet-scents-sample-box",
    "Sweet Scents Sample Box",
    "sample-boxes",
    ["sweet"],
    "Six of our sweetest scents to try.",
    "Not sure where to start? Six sample-size melts from the sweeter end of the range.",
    "Sample contents: 6 \xD7 10g",
    [["Default", 650, 10]],
    { featured: true }
  ),
  p(
    "fresh-favourites-sample-box",
    "Fresh Favourites Sample Box",
    "sample-boxes",
    ["fresh"],
    "Six clean, fresh scents in one box.",
    "Six sample-size melts from the clean and fresh end of the range.",
    "Sample contents: 6 \xD7 10g",
    [["Default", 650, 10]]
  ),
  p(
    "rainbow-gift-box",
    "Rainbow Gift Box",
    "gift-sets",
    ["sweet", "fruity", "floral"],
    "A bright mix of melts, boxed and ready to give.",
    "A bright mix of snap bars and shaped melts, boxed and ready to give.",
    "Sample contents: 2 snap bars + 2 bags of melts",
    [["Default", 1800, 8]],
    { featured: true }
  ),
  p(
    "mini-melt-gift-set",
    "Mini Melt Gift Set",
    "gift-sets",
    ["sweet", "fresh", "floral"],
    "A little set of minis. Pick your scent family.",
    "A small gift set of mini melts. Pick the scent family that suits them best.",
    "Sample contents: 8 \xD7 10g",
    [["Sweet", 1e3, 6], ["Fresh", 1e3, 6], ["Floral", 1e3, 0]],
    { option_name: "Scent family" }
  ),
  p(
    "white-ceramic-wax-burner",
    "White Ceramic Wax Burner",
    "accessories",
    [],
    "A simple white burner that suits any room.",
    "A simple white ceramic burner for use with an unscented tealight.",
    "Sample size: 11cm tall",
    [["Default", 1200, 5]]
  ),
  p(
    "wax-melt-storage-tin",
    "Wax Melt Storage Tin",
    "accessories",
    [],
    "Keeps your melts tidy and their scent fresh.",
    "A lidded tin to keep your melts tidy and their scent fresh.",
    "Sample size: 10cm across",
    [["Default", 500, 9]],
    { sold_out: true }
  )
];
var DEFAULT_SETTINGS = {
  // Delivery — PLACEHOLDER figures, change in Admin → Delivery & settings
  delivery_pence: "395",
  free_delivery_threshold_pence: "3000",
  // '' or '0' = no free-delivery offer
  delivery_name: "UK standard delivery",
  dispatch_estimate: "Sample estimate: dispatched within 2\u20133 working days",
  // Homepage copy
  announcement: "",
  hero_headline: "A little melt. | A lot of happiness.",
  hero_sub: "Discover colourful wax melts and find your next favourite scent.",
  intro_title: "Hello from Over The Rainbow",
  intro_text: "PLACEHOLDER COPY \u2014 replace in Admin \u2192 Delivery & settings. A couple of sentences about who makes the melts, where you are based and what makes your scents worth trying.",
  // Business details — deliberately blank. Fill these in before launch.
  business_name: "Over The Rainbow",
  contact_email: "",
  contact_phone: "",
  business_address: "",
  order_notify_email: "",
  // Notices shown on every product page and on the FAQ page. Editable in
  // Admin → Delivery & settings.
  handmade_note: "Every melt is poured, cut and packed by hand in small batches, so no two are identical. Colours vary a little between batches, shapes are not machine-perfect, and you may find a small amount of wax on the edge of the plastic casing or a slightly uneven surface. That is normal for handmade wax and does not affect the scent or how it burns. If something arrives damaged or is not what you ordered, contact us and we will put it right.",
  fragrance_note: "All our melts are made with original fragrance oils blended for us. Where a designer brand or product name is mentioned anywhere on this site, it is used only to describe the style and character of a fragrance, so you know roughly what to expect. It does not mean the scents are the same, equivalent or connected in any way. Over The Rainbow is not affiliated with, endorsed by or associated with any of the brands named. All trademarks and brand names remain the property of their owners."
};
var TODO = /* @__PURE__ */ __name2((what) => `[TO COMPLETE BEFORE LAUNCH: ${what}]`, "TODO");
var DEFAULT_PAGES = [
  { slug: "contact", title: "Contact us", body: `Questions about an order or a scent? Get in touch and we will get back to you as soon as we can.

${TODO("your contact email address, and a phone number if you want to offer one. These are set in Admin \u2192 Delivery & settings and shown automatically below.")}

## Business details
${TODO("trading name / legal name of the business and its geographic address. UK online sellers must show these.")}` },
  { slug: "delivery-returns", title: "Delivery & returns", body: `## Delivery
We currently deliver to UK addresses only. The delivery charge is shown in your basket before you pay.

${TODO("which courier or postal service you use, your real dispatch times, and cut-off times if any.")}

## Returns and cancellations
${TODO("your returns and cancellation policy. Include how customers cancel an order, how long they have, who pays return postage, how refunds are made, and what happens with damaged or faulty items. UK distance-selling rules give consumers cancellation rights, so check your wording against current guidance.")}` },
  { slug: "privacy", title: "Privacy policy", body: `${TODO("your privacy policy. The points below describe what this website actually does, to help you write it.")}

## What this website collects
- When you place an order: your name, email address, delivery address and optional phone number, plus what you ordered.
- Card payments are handled by Stripe. Card details are entered on Stripe's page and never reach this website.
- Your basket is stored in your own browser. This site sets no advertising or tracking cookies.

## Still needed
${TODO("who the data controller is and how to contact them, how long order records are kept, who data is shared with (payment provider, email provider, courier), and how customers can ask for a copy or deletion of their data.")}` },
  { slug: "terms", title: "Terms & conditions", body: `${TODO("your terms of sale. Typical sections: who you are, how orders are accepted, prices and payment, delivery, cancellations and returns, faulty goods, product safety and use, liability, governing law.")}

Prices are shown in pounds sterling (GBP).

${TODO("whether your prices include VAT, and your VAT number if you are registered. This site makes no statement about VAT until you add one.")}` }
];
var CLP_LABELS = [
  { "id": "fw164", "name": "1881", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 4-tert-Butylcyclohexyl acetate, Formaldehyde cyclododecyl ethyl acetal, alpha-Hexylcinnamaldehyde", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz 1881 (164) \u2014 10% in non-hazardous base" },
  { "id": "fw45", "name": "Aliens", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 3,7-Dimethyl-1,6-nonadien-3-ol, Benzyl salicylate, Cedryl methyl ether, Coumarin, Piperonal, alpha-Hexylcinnamaldehyde, alpha-Methyl-1,3-benzodioxole-5-propionaldehyde", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Aliens (45) \u2014 10% in non-hazardous base" },
  { "id": "fw384", "name": "Amber & Sandalwood", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Benzyl salicylate, Coumarin, Linalool, Linalyl acetate, alpha-Hexylcinnamaldehyde, alpha-iso-Methylionone", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Amber & Sandalwood (384) \u2014 10% in non-hazardous base" },
  { "id": "fw314", "name": "Amber & Spice", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Benzyl salicylate, Coumarin, Geraniol, Linalool, Linalyl acetate, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Coco Original (314) \u2014 10% in non-hazardous base" },
  { "id": "fw46", "name": "Angels", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "Linalool, Linalyl acetate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Angels (46) \u2014 10% in non-hazardous base" },
  { "id": "fw16", "name": "Baby Powder", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "Benzyl salicylate, Coumarin, Geraniol, Linalool, Linalyl acetate, Methyl cinnamate, Nerol, Piperonal, alpha-iso-Methylionone, dl-Citronellol, p-Anisyl acetate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Baby Powder (16) \u2014 10% in non-hazardous base" },
  { "id": "fw83", "name": "Black Opium", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 3,7-Dimethyl-1,6-nonadien-3-ol, Benzyl salicylate, Hexyl salicylate, Hydroxycitronellal, Linalool, Linalyl acetate, Methyl 2,6,10-trimethylcyclododeca-2,5,9-trien-1-yl ketone", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Black Opium (83) \u2014 10% in non-hazardous base" },
  { "id": "fw89", "name": "Blackcurrant & Birch", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Linalool, Linalyl acetate, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz C.Aventos (89) \u2014 10% in non-hazardous base" },
  { "id": "fw177", "name": "Blue Raspberry Slushy", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "4-Hydroxy-2,5-dimethyl-3(2H)-furanone, Ethyl methylphenylglycidate, Linalool, Linalyl acetate, alpha-Hexylcinnamaldehyde, d-Limonene, delta-1-(2,6,6-Trimethyl-3-cyclohexen-1-yl)-2-buten-1-one", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Blue Raspberry Slushy (177) \u2014 10% in non-hazardous base" },
  { "id": "fw21", "name": "Bubblegum", "signal": "", "pictos": ["GHS09"], "h": ["H411"], "hx": "", "p": ["P273", "P391", "P501"], "px": "", "allergens": "Allyl cyclohexanepropionate, Ethyl methylphenylglycidate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Bubblegum (21) \u2014 10% in non-hazardous base" },
  { "id": "fw189", "name": "Candy Cane", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "l-Menthone", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Candy Cane (189) \u2014 10% in non-hazardous base" },
  { "id": "fw26", "name": "Cherry", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "Ethyl methylphenylglycidate", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Cherry (26) \u2014 10% in non-hazardous base" },
  { "id": "fw105", "name": "Cherry Vanilla", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "Benzyl salicylate, Coumarin, Piperonal, omega-Pentadecalactone, p-Anisyl acetate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Cherry Vanilla (105) \u2014 10% in non-hazardous base" },
  { "id": "fw301", "name": "Clean Cotton", "signal": "Warning", "pictos": ["GHS07", "GHS09"], "h": ["H317", "H411"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P391", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 2-Methyl-3-tolylpropionaldehyde, 3-(o-Ethylphenyl)-2,2-dimethylpropionaldehyde, Cedryl methyl ether, Hexyl salicylate, Linalyl acetate, Reaction Mass of (3E)-3-methyl-4-(2,6,6-trimethyl-2-cyclohexen-1-yl)-3-buten-2-one and (1E)-1-(2,6,6-trimethyl-2-cyclohexen-1-yl)-1-penten-3-one, alpha-iso-Methylionone", "contains": "4-tert-Butylcyclohexyl acetate, alpha-Hexylcinnamaldehyde", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Clean Cotton (301) \u2014 10% in non-hazardous base" },
  { "id": "fw327", "name": "Detol", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "2-Methylundecanal, Citral, Dimethylcyclohex-3-ene-1-carbaldehyde (isomer unspecified), Reaction mass of 1-isopropyl-4-methyl-7-oxabicyclo[2.2.1]heptane and 1,3,3-trimethyl-2-oxabicyclo[2.2.2]octane, alpha-Pinene, d-Limonene, l-.beta.-Pinene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Detol (327) \u2014 10% in non-hazardous base" },
  { "id": "fw178", "name": "Dragons Blood", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Ethyl methylphenylglycidate, Linalyl acetate, p-Anisyl acetate", "contains": "d-Limonene", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Dragons Blood (178) \u2014 10% in non-hazardous base" },
  { "id": "fw110", "name": "Flashy Lemon", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "Citral, Geraniol, Linalyl acetate, Nerol, Reaction mass of 1-isopropyl-4-methyl-7-oxabicyclo[2.2.1]heptane and 1,3,3-trimethyl-2-oxabicyclo[2.2.2]octane, Tetrahydrolinalool, alpha-Hexylcinnamaldehyde, alpha-Pinene, d-Limonene, dl-Citronellol", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Flashy Lemon (110) \u2014 10% in non-hazardous base" },
  { "id": "fw71", "name": "Fluffy Towels", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317", "H412"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 4-tert-Butylcyclohexyl acetate, Benzyl salicylate, alpha-iso-Methylionone", "contains": "alpha-Hexylcinnamaldehyde", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Fluffy Towels (71) \u2014 10% in non-hazardous base" },
  { "id": "fw387", "name": "Forest Pine & Cedarwood", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Coumarin, Ethyl methylphenylglycidate, Eucalyptol, Linalyl acetate", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Forest Pine & Cedarwood (387) \u2014 10% in non-hazardous base" },
  { "id": "fw18", "name": "Fresh Linen", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317", "H412"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Geraniol", "contains": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 4-tert-Butylcyclohexyl acetate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Fresh Linen (18) \u2014 10% in non-hazardous base" },
  { "id": "fw44", "name": "Ghosts", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "Geraniol, Linalyl acetate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Ghosts (44) \u2014 10% in non-hazardous base" },
  { "id": "fw98", "name": "Grapefruit & Sea Salt", "signal": "Warning", "pictos": ["GHS07", "GHS09"], "h": ["H317", "H411"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P391", "P501"], "px": "", "allergens": "Acetyl cedrene, Linalool, Linalyl acetate", "contains": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Cedryl methyl ether", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Invictus (98) \u2014 10% in non-hazardous base" },
  { "id": "fw119", "name": "Juicy Strawberry", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "4-Hydroxy-2,5-dimethyl-3(2H)-furanone", "contains": "Ethyl methylphenylglycidate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Juicy Strawberry (119) \u2014 10% in non-hazardous base" },
  { "id": "fw92", "name": "Lemon & Lime Fizz", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "2,6-Octadienal, 3,7-dimethyl-, reaction products with Et alc., Allyl cyclohexanepropionate, Ethyl methylphenylglycidate, Piperonal", "contains": "Nerol", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Lemon & Lime Fizz (92) \u2014 10% in non-hazardous base" },
  { "id": "fw127", "name": "Lemon Lavender", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Citral, Coumarin, Tetrahydrolinalool, l-Limonene", "contains": "Reaction mass of 1-isopropyl-4-methyl-7-oxabicyclo[2.2.1]heptane and 1,3,3-trimethyl-2-oxabicyclo[2.2.2]octane", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Lemon Lavender (127) \u2014 10% in non-hazardous base" },
  { "id": "fw173", "name": "Lenora Blue", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317", "H412"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Benzyl salicylate, Reaction Mass of (3E)-3-methyl-4-(2,6,6-trimethyl-2-cyclohexen-1-yl)-3-buten-2-one and (1E)-1-(2,6,6-trimethyl-2-cyclohexen-1-yl)-1-penten-3-one, Tetrahydrolinalool, alpha-iso-Methylionone, dl-Citronellol", "contains": "4-tert-Butylcyclohexyl acetate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Lenora Blue (173) \u2014 10% in non-hazardous base" },
  { "id": "fw54", "name": "Lime, Basil & Mandarin", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "Linalyl acetate, Tetrahydrolinalool, alpha-Hexylcinnamaldehyde, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Lime Basil Mandarine (54) \u2014 10% in non-hazardous base" },
  { "id": "fw81", "name": "Mandarin & Amber", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Cinnamaldehyde, Coumarin, Formaldehyde cyclododecyl ethyl acetal, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz One Million (81) \u2014 10% in non-hazardous base" },
  { "id": "fw51", "name": "Orange & Cinnamon", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Eugenol", "contains": "Cinnamaldehyde, alpha-Methylcinnamaldehyde, d-Limonene", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Orange And Cinnamon (51) \u2014 10% in non-hazardous base" },
  { "id": "fw93", "name": "Oud & Bergamot", "signal": "Warning", "pictos": ["GHS07", "GHS09"], "h": ["H317", "H411"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P391", "P501"], "px": "", "allergens": "Acetyl cedrene, TETRAMETHYLTRICYCLOPROPANOL", "contains": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 4-tert-Butylcyclohexyl acetate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Oud & Bergamot (93) \u2014 10% in non-hazardous base" },
  { "id": "fw128", "name": "Oud Wood", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 4-tert-Butylcyclohexyl acetate, Linalool, Linalyl acetate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Oud Wood (128) \u2014 10% in non-hazardous base" },
  { "id": "fw34", "name": "Pear & Orchid", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz J Choo (34) \u2014 10% in non-hazardous base" },
  { "id": "fw52", "name": "Pineapple", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "Allyl cyclohexanepropionate, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Pineapple (52) \u2014 10% in non-hazardous base" },
  { "id": "fw157", "name": "Pink Lemonade", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "Citral, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Pink Lemonade (157) \u2014 10% in non-hazardous base" },
  { "id": "fw175", "name": "Plum & Rhubarb", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Ethyl methylphenylglycidate, Linalyl acetate, Tetrahydrolinalool, delta-1-(2,6,6-Trimethyl-3-cyclohexen-1-yl)-2-buten-1-one", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Plum & Rhubarb (175) \u2014 10% in non-hazardous base" },
  { "id": "fw106", "name": "Rhubarb & Custard", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "Linalool, Linalyl acetate", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Rhubarb & Custard (106) \u2014 10% in non-hazardous base" },
  { "id": "fw29", "name": "Rose & Patchouli", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 3,7-Dimethyl-1,6-nonadien-3-yl acetate, Benzyl salicylate, Linalool, alpha-Hexylcinnamaldehyde, alpha-Methyl-1,3-benzodioxole-5-propionaldehyde, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Mademoiselle (29) \u2014 10% in non-hazardous base" },
  { "id": "fw101", "name": "Savage", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Acetylcedrene, Linalool, Linalyl acetate, d-Limonene", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Savage (101) \u2014 10% in non-hazardous base" },
  { "id": "fw345", "name": "Spooktacular", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Coumarin, Eugenol, Geranial", "contains": "Cinnamaldehyde", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Spooktacular (345) \u2014 10% in non-hazardous base" },
  { "id": "fw346", "name": "Spooky Pumpkin", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Ethyl methylphenylglycidate, Eugenol, trans-Anethole", "contains": "Cinnamaldehyde", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Spooky Pumpkin (346) \u2014 10% in non-hazardous base" },
  { "id": "fw72", "name": "Spring Awakening", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 2,4-Dimethyl-3-cyclohexen-1-carboxaldehyde, Benzyl salicylate, Hexyl salicylate, alpha-Hexylcinnamaldehyde, d-Limonene, dl-Citronellol", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Spring Awakening (72) \u2014 10% in non-hazardous base" },
  { "id": "fw3", "name": "Strawberry Bon Bon", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Strawberry Bon Bon (3) \u2014 10% in non-hazardous base" },
  { "id": "fw20", "name": "Sweet Orange", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Citral, Linalool", "contains": "d-Limonene", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Sweet Orange (20) \u2014 10% in non-hazardous base" },
  { "id": "fw352", "name": "The Headless Horseman", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317", "H412"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "4-tert-Butylcyclohexyl acetate, 1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Eucalyptol, Methyl atrarate, alpha-Pinene, d-Limonene, l-.beta.-Pinene", "contains": "4-tert-Butylcyclohexyl acetate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz The Headless Horseman (352) \u2014 10% in non-hazardous base" },
  { "id": "fw183", "name": "Timeless Florals", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 4-tert-Butylcyclohexyl acetate, Cinnamyl alcohol, Coumarin, Geraniol, Isoeugenol, Linalool, Nerol, alpha-iso-Methylionone, dl-Citronellol", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz No 5 (183) \u2014 10% in non-hazardous base" },
  { "id": "fw11", "name": "Toasted Marshmallow", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "4-Hydroxy-2,5-dimethyl-3(2H)-furanone", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Toasted Marshmallow (11) \u2014 10% in non-hazardous base" },
  { "id": "fw342", "name": "Troll's Breath", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 3,7-Dimethyl-1,6-nonadien-3-ol, Cedryl methyl ether, Linalyl acetate", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Troll's Breath (342) \u2014 10% in non-hazardous base" },
  { "id": "fw116", "name": "Unicorn Farts", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "alpha-Hexylcinnamaldehyde, d-Limonene", "contains": "delta-1-(2,6,6-Trimethyl-3-cyclohexen-1-yl)-2-buten-1-one", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Unicorn Farts (116) \u2014 10% in non-hazardous base" },
  { "id": "fw336", "name": "Vanilla Blossom", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 3-(o-Ethylphenyl)-2,2-dimethylpropionaldehyde, 4-tert-Butylcyclohexyl acetate, Benzyl salicylate, Cedryl methyl ether, Formaldehyde cyclododecyl ethyl acetal, Hexyl salicylate, Linalool, alpha-Hexylcinnamaldehyde", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Vanilla Blossom (336) \u2014 10% in non-hazardous base" },
  { "id": "fw295", "name": "Vanilla Perfume", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 3,7-Dimethyl-1,6-nonadien-3-ol", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Vanilla Perfume (295) \u2014 10% in non-hazardous base" },
  { "id": "fw344", "name": "Vanilla Pumpkin", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317"], "hx": "", "p": ["P261", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "Citral, Coumarin, Eugenol, alpha-Methylcinnamaldehyde", "contains": "Cinnamaldehyde", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Vanilla Pumpkin (344) \u2014 10% in non-hazardous base" },
  { "id": "fw90", "name": "Vanilla Spice", "signal": "Warning", "pictos": ["GHS07", "GHS09"], "h": ["H317", "H411"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P391", "P501"], "px": "", "allergens": "Acetyl cedrene, Coumarin, Hydroxycitronellal, Linalool, Linalyl acetate, alpha-iso-Methylionone, d-Limonene", "contains": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Joup (90) \u2014 10% in non-hazardous base" },
  { "id": "fw65", "name": "Violet & Leather", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317", "H412"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Acetylcedrene, Linalool, Linalyl acetate, d-Limonene", "contains": "4-tert-Butylcyclohexyl acetate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Farenheight (65) \u2014 10% in non-hazardous base" },
  { "id": "fw262", "name": "Washing Day", "signal": "Warning", "pictos": ["GHS07"], "h": ["H317", "H412"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, 2,4-Dimethyl-3-cyclohexen-1-carboxaldehyde, 2-Methylundecanal, 4-tert-Butylcyclohexyl acetate, Tetrahydrolinalool, delta-1-(2,6,6-Trimethyl-3-cyclohexen-1-yl)-2-buten-1-one", "contains": "Hexyl salicylate", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Fairy Fresh (262) \u2014 10% in non-hazardous base" },
  { "id": "fw48", "name": "Watermelon", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "2,6-Dimethyl-5-heptenal, Ethyl methylphenylglycidate, Linalool", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Watermelon (48) \u2014 10% in non-hazardous base" },
  { "id": "fw250", "name": "White Musk", "signal": "", "pictos": ["GHS09"], "h": ["H411"], "hx": "", "p": ["P273", "P391", "P501"], "px": "", "allergens": "Hydroxycitronellal, Linalool, alpha-Hexylcinnamaldehyde", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz White Musk (250) \u2014 10% in non-hazardous base" },
  { "id": "fw332", "name": "White Musk & Golden Maple", "signal": "", "pictos": [], "h": ["H412"], "hx": "", "p": ["P273", "P501"], "px": "", "allergens": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone, Hydroxycitronellal, Linalool, alpha-Hexylcinnamaldehyde, alpha-iso-Methylionone", "contains": "", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz White Musk & Golden Maple (332) \u2014 10% in non-hazardous base" },
  { "id": "fw47", "name": "Wild Violet & Jasmine", "signal": "Warning", "pictos": ["GHS07", "GHS09"], "h": ["H317", "H411"], "hx": "", "p": ["P261", "P273", "P280", "P302+P352", "P333+P313", "P391", "P501"], "px": "", "allergens": "Linalool, Linalyl acetate, alpha-Hexylcinnamaldehyde, alpha-iso-Methylionone, dl-Citronellol", "contains": "1-(1,2,3,4,5,6,7,8-Octahydro-2,3,8,8-tetramethyl-2-naphthalenyl)ethanone", "qty": "", "batch": "", "extra": "", "source": "FizzyWhiz Daisys (47) \u2014 10% in non-hazardous base" },
  { "id": "fw350", "name": "Witches Brew", "signal": "", "pictos": [], "h": [], "hx": "", "p": [], "px": "", "allergens": "Ethyl methylphenylglycidate", "contains": "", "qty": "", "batch": "", "extra": "Safety data sheet available on request.", "source": "FizzyWhiz Witches Brew (350) \u2014 10% in non-hazardous base" }
];
var CLP_BUSINESS = {
  name: "Over The Rainbow Wax Melts",
  addr: "18 Sutton Way\nEllesmere Port\nCH65 7DN",
  phone: "",
  email: ""
};
var SCHEMA = [
  `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS products (
     id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL,
     scents TEXT NOT NULL DEFAULT '', short_desc TEXT NOT NULL DEFAULT '',
     description TEXT NOT NULL DEFAULT '', weight TEXT NOT NULL DEFAULT '',
     usage TEXT NOT NULL DEFAULT '', safety TEXT NOT NULL DEFAULT '',
     image_url TEXT NOT NULL DEFAULT '', option_name TEXT NOT NULL DEFAULT '',
     hidden INTEGER NOT NULL DEFAULT 0, sold_out INTEGER NOT NULL DEFAULT 0,
     featured INTEGER NOT NULL DEFAULT 0, is_sample INTEGER NOT NULL DEFAULT 0,
     sort INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL,
     deal_group TEXT NOT NULL DEFAULT '', deal_qty INTEGER NOT NULL DEFAULT 0, deal_pence INTEGER NOT NULL DEFAULT 0,
     shape TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT '')`,
  `CREATE TABLE IF NOT EXISTS variants (
     id TEXT PRIMARY KEY, product_id TEXT NOT NULL, label TEXT NOT NULL,
     price_pence INTEGER NOT NULL, stock INTEGER NOT NULL DEFAULT 0,
     sort INTEGER NOT NULL DEFAULT 0,
     deal_group TEXT NOT NULL DEFAULT '', deal_qty INTEGER NOT NULL DEFAULT 0, deal_pence INTEGER NOT NULL DEFAULT 0,
     shape TEXT NOT NULL DEFAULT '')`,
  `CREATE INDEX IF NOT EXISTS idx_variants_product ON variants(product_id)`,
  `CREATE TABLE IF NOT EXISTS images (
     id TEXT PRIMARY KEY, mime TEXT NOT NULL, data BLOB NOT NULL, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS orders (
     id TEXT PRIMARY KEY, ref TEXT NOT NULL UNIQUE, token TEXT NOT NULL UNIQUE,
     mode TEXT NOT NULL,                      -- 'test' | 'live' | 'demo'
     status TEXT NOT NULL,                    -- pending | paid | failed | expired | review | demo
     fulfilment TEXT NOT NULL DEFAULT 'unfulfilled',
     stripe_session_id TEXT UNIQUE, payment_intent TEXT,
     email TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '',
     address TEXT NOT NULL,                   -- JSON
     items TEXT NOT NULL,                     -- JSON snapshot of purchased lines
     subtotal_pence INTEGER NOT NULL, delivery_pence INTEGER NOT NULL, total_pence INTEGER NOT NULL,
     currency TEXT NOT NULL DEFAULT 'gbp',
     stock_deducted INTEGER NOT NULL DEFAULT 0, email_sent INTEGER NOT NULL DEFAULT 0,
     admin_note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, paid_at TEXT,
     discount_pence INTEGER NOT NULL DEFAULT 0, deals TEXT NOT NULL DEFAULT '[]')`,
  `CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at)`,
  `CREATE TABLE IF NOT EXISTS stripe_events (id TEXT PRIMARY KEY, type TEXT NOT NULL, received_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS pages (
     slug TEXT PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL,
     needs_review INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS posts (
     slug TEXT PRIMARY KEY, title TEXT NOT NULL, excerpt TEXT NOT NULL DEFAULT '',
     body TEXT NOT NULL DEFAULT '', image_url TEXT NOT NULL DEFAULT '',
     published INTEGER NOT NULL DEFAULT 1, published_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  // CLP labels. Kept in their own tables, not in `settings`, because the business
  // block holds a personal phone number and `settings` is read by public pages.
  `CREATE TABLE IF NOT EXISTS clp_labels (
     id TEXT PRIMARY KEY, data TEXT NOT NULL, updated_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS clp_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`
];
var ready = null;
function getDb(env) {
  if (!env.DB) {
    const e = new Error('Database binding "DB" is missing. Add a D1 binding named DB (see README).');
    e.status = 503;
    throw e;
  }
  if (!ready)
    ready = init(env.DB).catch((err) => {
      ready = null;
      throw err;
    });
  return ready.then(() => env.DB);
}
__name(getDb, "getDb");
__name2(getDb, "getDb");
async function init(db) {
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  await addColumns(db);
  const seeded = await db.prepare(`SELECT value FROM settings WHERE key='seeded'`).first();
  if (!seeded)
    await seed(db);
  await migrateContent(db);
}
__name(init, "init");
__name2(init, "init");
var ADDED_COLUMNS = [
  ["products", "deal_group", `TEXT NOT NULL DEFAULT ''`],
  ["products", "deal_qty", `INTEGER NOT NULL DEFAULT 0`],
  ["products", "deal_pence", `INTEGER NOT NULL DEFAULT 0`],
  ["products", "shape", `TEXT NOT NULL DEFAULT ''`],
  ["products", "updated_at", `TEXT NOT NULL DEFAULT ''`],
  ["variants", "deal_group", `TEXT NOT NULL DEFAULT ''`],
  ["variants", "deal_qty", `INTEGER NOT NULL DEFAULT 0`],
  ["variants", "deal_pence", `INTEGER NOT NULL DEFAULT 0`],
  ["variants", "shape", `TEXT NOT NULL DEFAULT ''`],
  ["orders", "discount_pence", `INTEGER NOT NULL DEFAULT 0`],
  ["orders", "deals", `TEXT NOT NULL DEFAULT '[]'`]
];
async function addColumns(db) {
  const have = {};
  for (const table of [...new Set(ADDED_COLUMNS.map((c) => c[0]))]) {
    const { results } = await db.prepare(`PRAGMA table_info(${table})`).all();
    have[table] = new Set(results.map((r) => r.name));
  }
  const stmts = ADDED_COLUMNS.filter(([t, c]) => !have[t].has(c)).map(([t, c, def]) => db.prepare(`ALTER TABLE ${t} ADD COLUMN ${c} ${def}`));
  if (stmts.length)
    await db.batch(stmts);
}
__name(addColumns, "addColumns");
__name2(addColumns, "addColumns");
async function migrateContent(db) {
  const row = await db.prepare(`SELECT value FROM settings WHERE key='content_version'`).first();
  const have = Number(row?.value || 0);
  if (have >= 11)
    return;
  const now = /* @__PURE__ */ new Date();
  const stmts = [];
  if (have < 2) {
    stmts.push(db.prepare(`INSERT OR IGNORE INTO pages(slug,title,body,needs_review,updated_at) VALUES(?,?,?,0,?)`).bind(FAQ_PAGE.slug, FAQ_PAGE.title, FAQ_PAGE.body, now.toISOString()));
    BLOG_POSTS.forEach((p2, i) => {
      const when = new Date(now.getTime() - i * 6e4).toISOString();
      stmts.push(db.prepare(`INSERT OR IGNORE INTO posts(slug,title,excerpt,body,image_url,published,published_at,updated_at) VALUES(?,?,?,?,?,1,?,?)`).bind(p2.slug, p2.title, p2.excerpt, p2.body, p2.image_url, when, when));
    });
  }
  if (have < 3) {
    stmts.push(db.prepare(`UPDATE settings SET value=? WHERE key='intro_text' AND substr(value,1,16)='PLACEHOLDER COPY'`).bind(ABOUT_COPY.intro_text));
    stmts.push(db.prepare(`UPDATE settings SET value=? WHERE key='intro_title' AND value='Hello from Over The Rainbow'`).bind(ABOUT_COPY.intro_title));
    for (const pg of POLICY_PAGES)
      stmts.push(db.prepare(`UPDATE pages SET body=?, updated_at=? WHERE slug=? AND instr(body, ?) > 0`).bind(pg.body, now.toISOString(), pg.slug, pg.stillPlaceholder));
  }
  if (have < 4) {
    for (const key of ["contact_email", "order_notify_email"])
      stmts.push(db.prepare(`INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value WHERE settings.value=''`).bind(key, SHOP_EMAIL));
    stmts.push(db.prepare(`UPDATE pages SET body=replace(body, '[TO COMPLETE BEFORE LAUNCH: contact email address]', ?) WHERE slug='privacy'`).bind(SHOP_EMAIL));
  }
  if (have < 5) {
    const TODO2 = DEFAULT_USAGE, TODO22 = DEFAULT_SAFETY;
    SCENT_PRODUCTS.forEach(([name, category, tags], i) => {
      const id = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      stmts.push(db.prepare(
        `INSERT OR IGNORE INTO products(id,name,category,scents,short_desc,description,weight,usage,safety,image_url,option_name,hidden,sold_out,featured,is_sample,sort,created_at)
         VALUES(?,?,?,?,'','','',?,?,'','',1,0,0,0,?,?)`
      ).bind(id, name, category, tags.join(","), TODO2, TODO22, 100 + i, now.toISOString()));
      stmts.push(db.prepare(`INSERT OR IGNORE INTO variants(id,product_id,label,price_pence,stock,sort) VALUES(?,?,'Default',0,0,0)`).bind(`${id}--1`, id));
    });
  }
  if (have < 6) {
    SCENT_PRODUCTS.forEach(([name, , tags], i) => {
      const id = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      stmts.push(db.prepare(`UPDATE products SET scents=?, sort=? WHERE id=?`).bind(tags.join(","), 100 + i, id));
    });
    stmts.push(db.prepare(`UPDATE products SET scents=replace(scents,'seasonal','halloween') WHERE id='pumpkin-spice-melts'`));
    stmts.push(db.prepare(`UPDATE products SET scents=replace(scents,'seasonal','christmas') WHERE id='winter-berries-melts'`));
    stmts.push(db.prepare(`UPDATE products SET scents=replace(replace(scents,',seasonal',''),'seasonal','') WHERE scents LIKE '%seasonal%'`));
    stmts.push(db.prepare(`UPDATE posts SET body=replace(body,'browse Fresh, Floral, Fruity, Sweet and Seasonal','browse Fresh, Floral, Fruity, Sweet, Halloween and Christmas') WHERE slug='choosing-a-scent-for-every-room'`));
  }
  if (have < 7) {
    stmts.push(db.prepare(`UPDATE products SET usage=? WHERE usage='' OR substr(usage,1,12)='TO COMPLETE:' OR substr(usage,1,11)='PLACEHOLDER'`).bind(DEFAULT_USAGE));
    stmts.push(db.prepare(`UPDATE products SET safety=? WHERE safety='' OR substr(safety,1,12)='TO COMPLETE:' OR substr(safety,1,11)='PLACEHOLDER'`).bind(DEFAULT_SAFETY));
  }
  if (have < 8) {
    stmts.push(db.prepare(`UPDATE settings SET value='A little melt. | A lot of happiness.' WHERE key='hero_headline' AND value='Find your next favourite scent'`));
    stmts.push(db.prepare(`UPDATE settings SET value='Discover colourful wax melts and find your next favourite scent.' WHERE key='hero_sub' AND value='Wax melts in bright, happy scents. Pick one, pop it in your burner, enjoy.'`));
  }
  if (have < 9) {
    MORE_SCENTS.forEach(([name, category, tags, short, desc], i) => {
      const id = name.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      stmts.push(db.prepare(
        `INSERT OR IGNORE INTO products(id,name,category,scents,short_desc,description,weight,usage,safety,image_url,option_name,hidden,sold_out,featured,is_sample,sort,created_at)
         VALUES(?,?,?,?,?,?,'',?,?,'','',1,0,0,0,?,?)`
      ).bind(id, name, category, tags.join(","), short, desc, DEFAULT_USAGE, DEFAULT_SAFETY, 200 + i, now.toISOString()));
      stmts.push(db.prepare(`INSERT OR IGNORE INTO variants(id,product_id,label,price_pence,stock,sort) VALUES(?,?,'Default',150,20,0)`).bind(`${id}--1`, id));
    });
  }
  if (have < 10) {
    stmts.push(db.prepare(`UPDATE pages SET body=?, needs_review=0, updated_at=? WHERE slug='contact' AND instr(body, ?) > 0`).bind(CONTACT_COPY.body, now.toISOString(), CONTACT_COPY.stillPlaceholder));
  }
  if (have < 11) {
    const iso = now.toISOString();
    for (const label of CLP_LABELS)
      stmts.push(db.prepare(`INSERT OR IGNORE INTO clp_labels(id,data,updated_at) VALUES(?,?,?)`).bind(label.id, JSON.stringify(label), iso));
    stmts.push(db.prepare(`INSERT OR IGNORE INTO clp_settings(key,value) VALUES('business',?)`).bind(JSON.stringify(CLP_BUSINESS)));
  }
  stmts.push(db.prepare(`INSERT INTO settings(key,value) VALUES('content_version','11') ON CONFLICT(key) DO UPDATE SET value='11'`));
  await db.batch(stmts);
}
__name(migrateContent, "migrateContent");
__name2(migrateContent, "migrateContent");
async function seed(db) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const stmts = [];
  for (const [k, v] of Object.entries(DEFAULT_SETTINGS))
    stmts.push(db.prepare(`INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)`).bind(k, v));
  for (const pg of DEFAULT_PAGES)
    stmts.push(db.prepare(`INSERT OR IGNORE INTO pages(slug,title,body,needs_review,updated_at) VALUES(?,?,?,1,?)`).bind(pg.slug, pg.title, pg.body, now));
  SAMPLE_PRODUCTS.forEach((p2, i) => {
    stmts.push(db.prepare(
      `INSERT OR IGNORE INTO products(id,name,category,scents,short_desc,description,weight,usage,safety,image_url,option_name,hidden,sold_out,featured,is_sample,sort,created_at)
       VALUES(?,?,?,?,?,?,?,?,?,?,?,0,?,?,1,?,?)`
    ).bind(
      p2.id,
      p2.name,
      p2.category,
      p2.scents.join(","),
      p2.short_desc,
      p2.description,
      p2.weight,
      p2.usage,
      p2.safety,
      p2.image_url,
      p2.option_name,
      p2.sold_out,
      p2.featured,
      i,
      now
    ));
    p2.variants.forEach(([label, price, stock], j) => stmts.push(db.prepare(`INSERT OR IGNORE INTO variants(id,product_id,label,price_pence,stock,sort) VALUES(?,?,?,?,?,?)`).bind(`${p2.id}--${j + 1}`, p2.id, label, price, stock, j)));
  });
  stmts.push(db.prepare(`INSERT OR IGNORE INTO settings(key,value) VALUES('seeded',?)`).bind(now));
  await db.batch(stmts);
}
__name(seed, "seed");
__name2(seed, "seed");
async function getSettings(db) {
  const { results } = await db.prepare(`SELECT key,value FROM settings`).all();
  const s = { ...DEFAULT_SETTINGS };
  for (const r of results)
    s[r.key] = r.value;
  return s;
}
__name(getSettings, "getSettings");
__name2(getSettings, "getSettings");
var CATEGORIES = [
  { id: "snap-bars", name: "Snap Bars" },
  { id: "wax-melt-shapes", name: "Wax Melt Shapes" },
  { id: "sample-boxes", name: "Sample Boxes" },
  { id: "gift-sets", name: "Gift Sets" },
  { id: "accessories", name: "Accessories" },
  { id: "broken-biscuits", name: "Broken Biscuits" }
];
var SCENTS = ["fresh", "floral", "fruity", "sweet", "halloween", "christmas"];
var SHAPES = [
  { id: "hearts", name: "Hearts" },
  { id: "5-piece", name: "5 piece snap bar" },
  { id: "square", name: "Square" },
  { id: "circle", name: "Circle" }
];
var SHAPE_CATEGORY = "snap-bars";
async function loadProducts(db, { includeHidden = false, id = null } = {}) {
  let sql = `SELECT * FROM products`;
  const where = [], args = [];
  if (!includeHidden)
    where.push(`hidden=0`);
  if (id) {
    where.push(`id=?`);
    args.push(id);
  }
  if (where.length)
    sql += ` WHERE ` + where.join(" AND ");
  sql += ` ORDER BY CASE WHEN sort > 0 THEN 0 ELSE 1 END, sort, name`;
  const [prods, vars] = await db.batch([
    db.prepare(sql).bind(...args),
    id ? db.prepare(`SELECT * FROM variants WHERE product_id=? ORDER BY sort`).bind(id) : db.prepare(`SELECT * FROM variants ORDER BY sort`)
  ]);
  const byProduct = {};
  for (const v of vars.results)
    (byProduct[v.product_id] ||= []).push(v);
  return prods.results.map((p2) => shapeProduct(p2, byProduct[p2.id] || [], includeHidden));
}
__name(loadProducts, "loadProducts");
__name2(loadProducts, "loadProducts");
function dealOf(row, prefix = "p") {
  const qty = Number(row.deal_qty) || 0, pence = Number(row.deal_pence) || 0;
  if (qty < 2 || pence <= 0)
    return null;
  const group = String(row.deal_group || "").trim();
  const price = pence % 100 ? "\xA3" + (pence / 100).toFixed(2) : "\xA3" + pence / 100;
  return {
    key: group ? "g:" + group.toLowerCase() : prefix + ":" + row.id,
    group,
    qty,
    pence,
    label: group ? `Any ${qty} ${group} for ${price}` : `${qty} for ${price}`
  };
}
__name(dealOf, "dealOf");
__name2(dealOf, "dealOf");
var dealFor = /* @__PURE__ */ __name2((variant, product) => dealOf(variant, "v") || dealOf(product, "p"), "dealFor");
function shapeProduct(p2, variants, admin) {
  const vs = variants.map((v) => ({
    id: v.id,
    label: v.label,
    price_pence: v.price_pence,
    shape: v.shape || "",
    available: !p2.sold_out && v.stock > 0,
    deal: dealFor(v, p2),
    ...admin ? { stock: v.stock, own_deal: dealOf(v, "v") } : { low_stock: v.stock > 0 && v.stock <= 3 }
  }));
  const dealLabels = [...new Set(vs.map((v) => v.deal && v.deal.label).filter(Boolean))];
  const out = {
    id: p2.id,
    name: p2.name,
    category: p2.category,
    scents: p2.scents ? p2.scents.split(",").filter(Boolean) : [],
    deal: dealOf(p2),
    deal_labels: dealLabels,
    // Shapes: one option per shape, each with its own price and stock. Older
    // rows may still carry shapes on the product with a single price.
    shapes: [.../* @__PURE__ */ new Set([...vs.map((v) => v.shape).filter(Boolean), ...p2.shape ? p2.shape.split(",").filter(Boolean) : []])],
    shapes_priced: vs.some((v) => v.shape),
    short_desc: p2.short_desc,
    description: p2.description,
    weight: p2.weight,
    usage: p2.usage,
    safety: p2.safety,
    image_url: p2.image_url,
    option_name: p2.option_name,
    featured: !!p2.featured,
    sold_out: !!p2.sold_out,
    available: vs.some((v) => v.available),
    from_pence: vs.length ? Math.min(...vs.map((v) => v.price_pence)) : 0,
    variants: vs
  };
  if (admin)
    Object.assign(out, { hidden: !!p2.hidden, is_sample: !!p2.is_sample, sort: p2.sort, created_at: p2.created_at, updated_at: p2.updated_at || "" });
  return out;
}
__name(shapeProduct, "shapeProduct");
__name2(shapeProduct, "shapeProduct");
var json = /* @__PURE__ */ __name2((data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers }
}), "json");
var fail = /* @__PURE__ */ __name2((status, message, extra = {}) => json({ error: message, ...extra }, status), "fail");
var handle = /* @__PURE__ */ __name2((fn) => async (ctx) => {
  try {
    return await fn(ctx);
  } catch (err) {
    if (err.status)
      return fail(err.status, err.message, err.extra || {});
    console.error(err);
    return fail(500, "Something went wrong on our side. Please try again.");
  }
}, "handle");
function httpError(status, message, extra) {
  const e = new Error(message);
  e.status = status;
  e.extra = extra;
  return e;
}
__name(httpError, "httpError");
__name2(httpError, "httpError");
async function readJson(request, maxBytes = 64 * 1024) {
  const text = await request.text();
  if (text.length > maxBytes)
    throw httpError(413, "Request too large.");
  try {
    return JSON.parse(text || "{}");
  } catch {
    throw httpError(400, "Invalid JSON.");
  }
}
__name(readJson, "readJson");
__name2(readJson, "readJson");
var gbp = /* @__PURE__ */ __name2((pence) => "\xA3" + (pence / 100).toFixed(2), "gbp");
function randomId(bytes = 16) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(randomId, "randomId");
__name2(randomId, "randomId");
function orderRef() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const a = crypto.getRandomValues(new Uint8Array(7));
  return "OTR-" + [...a].map((b) => alphabet[b % alphabet.length]).join("");
}
__name(orderRef, "orderRef");
__name2(orderRef, "orderRef");
var clean = /* @__PURE__ */ __name2((v, max = 200) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max), "clean");
var escapeHtml = /* @__PURE__ */ __name2((s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]), "escapeHtml");
function paymentMode(env) {
  const key = env.STRIPE_SECRET_KEY || "";
  if (!key || !env.STRIPE_WEBHOOK_SECRET)
    return "demo";
  if (key.startsWith("sk_live_") || key.startsWith("rk_live_"))
    return "live";
  return "test";
}
__name(paymentMode, "paymentMode");
__name2(paymentMode, "paymentMode");
var FULFILMENT = ["unfulfilled", "packed", "dispatched", "delivered", "cancelled"];
var safeDeals = /* @__PURE__ */ __name2((s) => {
  try {
    const d = JSON.parse(s || "[]");
    return Array.isArray(d) ? d : [];
  } catch {
    return [];
  }
}, "safeDeals");
var shape = /* @__PURE__ */ __name2((o) => ({ ...o, token: void 0, items: JSON.parse(o.items), address: JSON.parse(o.address), deals: safeDeals(o.deals), discount_pence: o.discount_pence || 0 }), "shape");
var onRequestGet = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const o = await db.prepare(`SELECT * FROM orders WHERE id=?`).bind(String(params.id)).first();
  return o ? json({ order: shape(o) }) : fail(404, "Order not found.");
});
var onRequestPut = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  if (!FULFILMENT.includes(body.fulfilment))
    return fail(422, "Choose a fulfilment status.");
  const note = String(body.admin_note ?? "").slice(0, 2e3);
  const res = await db.prepare(`UPDATE orders SET fulfilment=?, admin_note=? WHERE id=?`).bind(body.fulfilment, note, String(params.id)).run();
  if (!res.meta.changes)
    return fail(404, "Order not found.");
  const o = await db.prepare(`SELECT * FROM orders WHERE id=?`).bind(String(params.id)).first();
  return json({ order: shape(o) });
});
var onRequestDelete = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const res = await db.prepare(`DELETE FROM orders WHERE id=?`).bind(String(params.id)).run();
  return res.meta.changes ? json({ deleted: true }) : fail(404, "Order not found.");
});
var onRequestPut2 = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const body = await readJson(request, 256 * 1024);
  const title = clean(body.title, 120);
  if (!title)
    return fail(422, "Enter a page title.", { fields: { title: "Enter a page title." } });
  const res = await db.prepare(`UPDATE pages SET title=?, body=?, needs_review=?, updated_at=? WHERE slug=?`).bind(title, String(body.body ?? "").slice(0, 6e4), body.needs_review ? 1 : 0, (/* @__PURE__ */ new Date()).toISOString(), String(params.slug)).run();
  return res.meta.changes ? json({ saved: true }) : fail(404, "Page not found.");
});
var slugify = /* @__PURE__ */ __name2((s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80), "slugify");
var okImage = /* @__PURE__ */ __name2((u) => u === "" || /^\/(img|assets)\/[\w\-./]+$/.test(u) || /^https:\/\/[^\s"'<>]+$/.test(u), "okImage");
function parseProduct(body, productId) {
  const fields = {};
  const p2 = {
    name: clean(body.name, 120),
    category: clean(body.category, 40),
    scents: (Array.isArray(body.scents) ? body.scents : []).filter((s) => SCENTS.includes(s)),
    short_desc: clean(body.short_desc, 200),
    description: String(body.description ?? "").trim().slice(0, 4e3),
    weight: clean(body.weight, 200),
    usage: String(body.usage ?? "").trim().slice(0, 4e3),
    safety: String(body.safety ?? "").trim().slice(0, 4e3),
    image_url: clean(body.image_url, 500),
    option_name: clean(body.option_name, 40),
    hidden: body.hidden ? 1 : 0,
    sold_out: body.sold_out ? 1 : 0,
    featured: body.featured ? 1 : 0,
    sort: Number.isInteger(body.sort) ? body.sort : 0,
    // Shapes a snap bar comes in, stored comma-separated like scents.
    shapes: (Array.isArray(body.shapes) ? body.shapes : typeof body.shape === "string" ? [body.shape] : []).map((s) => clean(s, 40)),
    // Multi-buy: "any 2 hearts for £5". Group is a plain word like "hearts";
    // blank means the deal is for this product alone. Both numbers or neither.
    deal_group: clean(body.deal_group, 40).replace(/\s+/g, " "),
    deal_qty: Number(body.deal_qty) || 0,
    deal_pence: Number(body.deal_pence) || 0
  };
  if (p2.deal_qty || p2.deal_pence) {
    if (!Number.isInteger(p2.deal_qty) || p2.deal_qty < 2 || p2.deal_qty > 20)
      fields.deal_qty = 'The deal quantity must be a whole number from 2 to 20 (e.g. 2 for "2 for \xA35").';
    if (!Number.isInteger(p2.deal_pence) || p2.deal_pence < 30 || p2.deal_pence > 1e5)
      fields.deal_pence = "Enter the deal price in pounds, between \xA30.30 and \xA31,000.";
  } else {
    p2.deal_group = "";
  }
  p2.shapes = p2.category === SHAPE_CATEGORY ? SHAPES.map((s) => s.id).filter((id) => p2.shapes.includes(id)) : [];
  p2.shape = p2.shapes.join(",");
  if (p2.shapes.length) {
    const rows = Array.isArray(body.variants) ? body.variants : [];
    body = { ...body, option_name: "Shape", variants: p2.shapes.map((id) => {
      const row = rows.find((v) => v && v.shape === id) || {};
      return { ...row, shape: id, label: SHAPES.find((s) => s.id === id).name };
    }) };
    p2.option_name = "Shape";
  }
  if (p2.name.length < 2)
    fields.name = "Enter a product name.";
  if (!CATEGORIES.some((c) => c.id === p2.category))
    fields.category = "Choose a category.";
  if (!okImage(p2.image_url))
    fields.image_url = "Image must be an uploaded image or an https:// address.";
  const raw = Array.isArray(body.variants) ? body.variants.slice(0, 20) : [];
  if (!raw.length)
    fields.variants = "Add at least one price.";
  const variants = raw.map((v, i) => {
    const price = Number(v.price_pence), stock = Number(v.stock);
    if (!Number.isInteger(price) || price < 30 || price > 1e5)
      fields.variants = "Each price must be between \xA30.30 and \xA31,000.";
    if (!Number.isInteger(stock) || stock < 0 || stock > 1e5)
      fields.variants = "Stock must be a whole number, 0 or more.";
    const label = clean(v.label, 60) || (raw.length > 1 ? `Option ${i + 1}` : "Default");
    const keep = typeof v.id === "string" && productId && v.id.startsWith(productId + "--");
    const d = { deal_group: clean(v.deal_group, 40).replace(/\s+/g, " "), deal_qty: Number(v.deal_qty) || 0, deal_pence: Number(v.deal_pence) || 0 };
    if (d.deal_qty || d.deal_pence) {
      if (!Number.isInteger(d.deal_qty) || d.deal_qty < 2 || d.deal_qty > 20)
        fields.variants = `The deal quantity on "${label}" must be a whole number from 2 to 20.`;
      if (!Number.isInteger(d.deal_pence) || d.deal_pence < 30 || d.deal_pence > 1e5)
        fields.variants = `The deal price on "${label}" must be between \xA30.30 and \xA31,000.`;
    } else
      d.deal_group = "";
    const shape2 = p2.shapes.length ? clean(v.shape, 40) : "";
    if (p2.shapes.length && !Number.isInteger(price))
      fields.variants = `Give the ${label} shape a price.`;
    return { id: keep ? v.id.slice(0, 120) : null, label, price_pence: price, stock, sort: i, shape: shape2, ...d };
  });
  if (raw.length > 1 && !p2.option_name)
    p2.option_name = "Option";
  if (Object.keys(fields).length)
    throw httpError(422, "Please check the highlighted fields.", { fields });
  return { p: p2, variants, newVariantId: (pid) => `${pid}--${randomId(4)}` };
}
__name(parseProduct, "parseProduct");
__name2(parseProduct, "parseProduct");
function spreadDeal(db, p2, id, variants = []) {
  const stmts = [];
  const seen = /* @__PURE__ */ new Set();
  const groups = [p2, ...variants].filter((d) => d.deal_group && d.deal_qty);
  for (const d of groups) {
    const k = d.deal_group.toLowerCase();
    if (seen.has(k))
      continue;
    seen.add(k);
    stmts.push(db.prepare(`UPDATE products SET deal_qty=?, deal_pence=? WHERE lower(deal_group)=? AND id<>?`).bind(d.deal_qty, d.deal_pence, k, id));
    stmts.push(db.prepare(`UPDATE variants SET deal_qty=?, deal_pence=? WHERE lower(deal_group)=? AND product_id<>?`).bind(d.deal_qty, d.deal_pence, k, id));
  }
  return stmts;
}
__name(spreadDeal, "spreadDeal");
__name2(spreadDeal, "spreadDeal");
function parsePost(body) {
  const fields = {};
  const p2 = {
    title: clean(body.title, 140),
    excerpt: clean(body.excerpt, 300),
    body: String(body.body ?? "").trim().slice(0, 6e4),
    image_url: clean(body.image_url, 500),
    published: body.published ? 1 : 0
  };
  const d = body.published_at ? new Date(body.published_at) : /* @__PURE__ */ new Date();
  p2.published_at = Number.isNaN(d.getTime()) ? (/* @__PURE__ */ new Date()).toISOString() : d.toISOString();
  if (p2.title.length < 3)
    fields.title = "Enter a title.";
  if (!p2.body)
    fields.body = "Write the post before saving.";
  if (!okImage(p2.image_url))
    fields.image_url = "Image must be an uploaded image or an https:// address.";
  if (Object.keys(fields).length)
    throw httpError(422, "Please check the highlighted fields.", { fields });
  return p2;
}
__name(parsePost, "parsePost");
__name2(parsePost, "parsePost");
var onRequestPut3 = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const p2 = parsePost(await readJson(request, 256 * 1024));
  const res = await db.prepare(`UPDATE posts SET title=?,excerpt=?,body=?,image_url=?,published=?,published_at=?,updated_at=? WHERE slug=?`).bind(p2.title, p2.excerpt, p2.body, p2.image_url, p2.published, p2.published_at, (/* @__PURE__ */ new Date()).toISOString(), String(params.slug)).run();
  return res.meta.changes ? json({ saved: true }) : fail(404, "Post not found.");
});
var onRequestDelete2 = handle(async ({ env, params }) => {
  const db = await getDb(env);
  await db.prepare(`DELETE FROM posts WHERE slug=?`).bind(String(params.slug)).run();
  return json({ deleted: true });
});
var onRequestPut4 = handle(async ({ env, request, params }) => {
  const db = await getDb(env);
  const id = String(params.id);
  if (!await db.prepare(`SELECT 1 FROM products WHERE id=?`).bind(id).first())
    return fail(404, "Product not found.");
  const { p: p2, variants, newVariantId } = parseProduct(await readJson(request), id);
  const keepIds = variants.filter((v) => v.id).map((v) => v.id);
  const stmts = [db.prepare(
    `UPDATE products SET name=?,category=?,scents=?,short_desc=?,description=?,weight=?,usage=?,safety=?,image_url=?,option_name=?,hidden=?,sold_out=?,featured=?,sort=?,is_sample=0,deal_group=?,deal_qty=?,deal_pence=?,shape=?,updated_at=? WHERE id=?`
  ).bind(
    p2.name,
    p2.category,
    p2.scents.join(","),
    p2.short_desc,
    p2.description,
    p2.weight,
    p2.usage,
    p2.safety,
    p2.image_url,
    p2.option_name,
    p2.hidden,
    p2.sold_out,
    p2.featured,
    p2.sort,
    p2.deal_group,
    p2.deal_qty,
    p2.deal_pence,
    p2.shape,
    (/* @__PURE__ */ new Date()).toISOString(),
    id
  )];
  stmts.push(...spreadDeal(db, p2, id, variants));
  stmts.push(keepIds.length ? db.prepare(`DELETE FROM variants WHERE product_id=? AND id NOT IN (${keepIds.map(() => "?").join(",")})`).bind(id, ...keepIds) : db.prepare(`DELETE FROM variants WHERE product_id=?`).bind(id));
  for (const v of variants) {
    stmts.push(v.id ? db.prepare(`UPDATE variants SET label=?,price_pence=?,stock=?,sort=?,deal_group=?,deal_qty=?,deal_pence=?,shape=? WHERE id=? AND product_id=?`).bind(v.label, v.price_pence, v.stock, v.sort, v.deal_group, v.deal_qty, v.deal_pence, v.shape || "", v.id, id) : db.prepare(`INSERT INTO variants(id,product_id,label,price_pence,stock,sort,deal_group,deal_qty,deal_pence,shape) VALUES(?,?,?,?,?,?,?,?,?,?)`).bind(newVariantId(id), id, v.label, v.price_pence, v.stock, v.sort, v.deal_group, v.deal_qty, v.deal_pence, v.shape || ""));
  }
  await db.batch(stmts);
  const [product] = await loadProducts(db, { includeHidden: true, id });
  return json({ product });
});
var onRequestDelete3 = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const id = String(params.id);
  await db.batch([
    db.prepare(`DELETE FROM variants WHERE product_id=?`).bind(id),
    db.prepare(`DELETE FROM products WHERE id=?`).bind(id)
  ]);
  return json({ deleted: true });
});
var PICTOS = ["GHS02", "GHS05", "GHS07", "GHS08", "GHS09"];
var SIGNALS = ["", "Warning", "Danger"];
var MAX_LABELS = 400;
var line = /* @__PURE__ */ __name2((v, max = 300) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max), "line");
var block = /* @__PURE__ */ __name2((v, max = 2e3) => String(v ?? "").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ").trim().slice(0, max), "block");
var codes = /* @__PURE__ */ __name2((v, max = 40) => (Array.isArray(v) ? v : []).map((c) => line(c, 24).toUpperCase()).filter((c) => /^[A-Z]{1,4}[0-9][0-9+A-Z]{0,20}$/.test(c)).slice(0, max), "codes");
function shapeLabel(raw) {
  if (!raw || typeof raw !== "object")
    throw httpError(422, "No label was sent.");
  const id = line(raw.id, 40);
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(id))
    throw httpError(422, "That label has a missing or invalid id.");
  const signal = SIGNALS.includes(raw.signal) ? raw.signal : "";
  return {
    id,
    name: line(raw.name, 120),
    signal,
    pictos: (Array.isArray(raw.pictos) ? raw.pictos : []).filter((p2) => PICTOS.includes(p2)).slice(0, 5),
    h: codes(raw.h),
    hx: block(raw.hx),
    p: codes(raw.p),
    px: block(raw.px),
    allergens: block(raw.allergens, 1e3),
    contains: line(raw.contains, 300),
    qty: line(raw.qty, 80),
    batch: line(raw.batch, 60),
    extra: block(raw.extra, 600),
    source: line(raw.source, 200)
  };
}
__name(shapeLabel, "shapeLabel");
__name2(shapeLabel, "shapeLabel");
var shapeBusiness = /* @__PURE__ */ __name2((raw = {}) => ({
  name: line(raw.name, 120),
  addr: block(raw.addr, 400),
  phone: line(raw.phone, 40),
  email: line(raw.email, 120)
}), "shapeBusiness");
var DEFAULT_BUSINESS = { name: "", addr: "", phone: "", email: "" };
var MAX_PACKS = 100;
var MAX_PACK_SCENTS = 30;
var num = /* @__PURE__ */ __name2((v, lo, hi, dflt) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, Math.round(n * 10) / 10)) : dflt;
}, "num");
function shapePack(raw) {
  if (!raw || typeof raw !== "object")
    throw httpError(422, "No pack was sent.");
  const id = line(raw.id, 40);
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(id))
    throw httpError(422, "That pack has a missing or invalid id.");
  return {
    id,
    name: line(raw.name, 120),
    qty: line(raw.qty, 80),
    scents: (Array.isArray(raw.scents) ? raw.scents : []).map((s) => line(s, 40)).filter((s) => /^[A-Za-z0-9_-]{1,40}$/.test(s)).slice(0, MAX_PACK_SCENTS),
    w: num(raw.w, 30, 150, 70),
    h: num(raw.h, 30, 200, 95),
    fs: num(raw.fs, 5, 10, 7)
  };
}
__name(shapePack, "shapePack");
__name2(shapePack, "shapePack");
async function readAll(db) {
  const [labels, settings] = await db.batch([
    db.prepare(`SELECT data FROM clp_labels ORDER BY id`),
    db.prepare(`SELECT key, value FROM clp_settings WHERE key IN ('business','packs')`)
  ]);
  const out = [];
  for (const row of labels.results) {
    try {
      out.push(JSON.parse(row.data));
    } catch {
    }
  }
  const kv = Object.fromEntries(settings.results.map((r) => [r.key, r.value]));
  let business = DEFAULT_BUSINESS, packs = [];
  try {
    business = { ...DEFAULT_BUSINESS, ...JSON.parse(kv.business || "{}") };
  } catch {
  }
  try {
    packs = JSON.parse(kv.packs || "[]");
    if (!Array.isArray(packs))
      packs = [];
  } catch {
    packs = [];
  }
  out.sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "en-GB"));
  return { business, labels: out, packs };
}
__name(readAll, "readAll");
__name2(readAll, "readAll");
var onRequestGet2 = handle(async ({ env }) => json(await readAll(await getDb(env))));
var onRequestPost = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const label = shapeLabel((await readJson(request)).label);
  const count = await db.prepare(`SELECT COUNT(*) AS n FROM clp_labels WHERE id<>?`).bind(label.id).first();
  if (Number(count?.n || 0) >= MAX_LABELS)
    return fail(422, `There is a limit of ${MAX_LABELS} labels.`);
  await db.prepare(
    `INSERT INTO clp_labels(id,data,updated_at) VALUES(?,?,?)
     ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at`
  ).bind(label.id, JSON.stringify(label), (/* @__PURE__ */ new Date()).toISOString()).run();
  return json({ label });
});
var onRequestDelete4 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const id = line((await readJson(request)).id, 40);
  if (!id)
    return fail(422, "No label id was sent.");
  await db.prepare(`DELETE FROM clp_labels WHERE id=?`).bind(id).run();
  return json({ deleted: id });
});
var onRequestPut5 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request, 512 * 1024);
  const stmts = [];
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (body.business) {
    stmts.push(db.prepare(`INSERT INTO clp_settings(key,value) VALUES('business',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`).bind(JSON.stringify(shapeBusiness(body.business))));
  }
  if (Array.isArray(body.packs)) {
    if (body.packs.length > MAX_PACKS)
      return fail(422, `There is a limit of ${MAX_PACKS} sample packs.`);
    const packs = body.packs.map(shapePack);
    if (new Set(packs.map((p2) => p2.id)).size !== packs.length)
      return fail(422, "Two packs in that list share the same id.");
    stmts.push(db.prepare(`INSERT INTO clp_settings(key,value) VALUES('packs',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`).bind(JSON.stringify(packs)));
  }
  if (Array.isArray(body.labels)) {
    if (body.labels.length > MAX_LABELS)
      return fail(422, `There is a limit of ${MAX_LABELS} labels.`);
    const shaped = body.labels.map(shapeLabel);
    const seen = /* @__PURE__ */ new Set();
    for (const l of shaped) {
      if (seen.has(l.id))
        return fail(422, "Two labels in that list share the same id.");
      seen.add(l.id);
    }
    stmts.push(db.prepare(`DELETE FROM clp_labels`));
    for (const l of shaped)
      stmts.push(db.prepare(`INSERT INTO clp_labels(id,data,updated_at) VALUES(?,?,?)`).bind(l.id, JSON.stringify(l), now));
  }
  if (!stmts.length)
    return fail(422, "Nothing to save.");
  await db.batch(stmts);
  return json(await readAll(db));
});
var TYPES = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };
var MAX = 900 * 1024;
var onRequestPost2 = handle(async ({ env, request }) => {
  const mime = (request.headers.get("content-type") || "").split(";")[0];
  if (!TYPES[mime])
    return fail(415, "Upload a JPG, PNG or WebP image.");
  const buf = await request.arrayBuffer();
  if (!buf.byteLength)
    return fail(400, "Empty upload.");
  if (buf.byteLength > MAX)
    return fail(413, "Image is too large after resizing. Try a smaller photo.");
  const db = await getDb(env);
  const id = randomId(10);
  await db.prepare(`INSERT INTO images(id,mime,data,created_at) VALUES(?,?,?,?)`).bind(id, mime, buf, (/* @__PURE__ */ new Date()).toISOString()).run();
  return json({ url: `/img/${id}.${TYPES[mime]}` }, 201);
});
var emailConfigured = /* @__PURE__ */ __name2((env) => !!(env.RESEND_API_KEY && env.EMAIL_FROM), "emailConfigured");
var API = "https://api.resend.com";
var apiBase = /* @__PURE__ */ __name2((env) => env.RESEND_API_BASE || API, "apiBase");
async function post(env, path, body) {
  const res = await fetch(apiBase(env) + path, {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(`Resend ${res.status}: ${data?.message || data?.name || "request failed"}`);
  return data;
}
__name(post, "post");
__name2(post, "post");
async function sendOne(env, msg) {
  try {
    return await post(env, "/emails", msg);
  } catch (e) {
    if (!/^Resend 429/.test(e.message))
      throw e;
    await new Promise((r) => setTimeout(r, 1200));
    return post(env, "/emails", msg);
  }
}
__name(sendOne, "sendOne");
__name2(sendOne, "sendOne");
async function sendOrderEmails(env, order, settings) {
  const items = JSON.parse(order.items);
  const addr = JSON.parse(order.address);
  const shop = settings.business_name || "Over The Rainbow";
  const addrLines = [order.name, addr.line1, addr.line2, addr.city, addr.county, addr.postcode, "United Kingdom"].filter(Boolean);
  let dealNames = "";
  try {
    dealNames = JSON.parse(order.deals || "[]").map((d) => d.label).join(", ");
  } catch {
  }
  const rows = items.map((i) => `<tr><td style="padding:6px 0">${escapeHtml(i.name)}${i.label ? " \u2013 " + escapeHtml(i.label) : ""} \xD7 ${i.qty}</td>
     <td style="padding:6px 0;text-align:right">${gbp(i.line_pence)}</td></tr>`).join("");
  const body = /* @__PURE__ */ __name2((heading, intro) => `<div style="font-family:Arial,sans-serif;color:#2a2230;max-width:520px">
    <h1 style="font-size:20px">${heading}</h1>
    <p>${intro}</p>
    <table style="width:100%;border-collapse:collapse">${rows}
      ${order.discount_pence > 0 ? `<tr><td style="padding:6px 0;border-top:1px solid #ddd">Multi-buy saving${dealNames ? " (" + escapeHtml(dealNames) + ")" : ""}</td><td style="padding:6px 0;border-top:1px solid #ddd;text-align:right">&minus;${gbp(order.discount_pence)}</td></tr>` : ""}
      <tr><td style="padding:6px 0;border-top:1px solid #ddd">Delivery</td><td style="padding:6px 0;border-top:1px solid #ddd;text-align:right">${order.delivery_pence ? gbp(order.delivery_pence) : "Free"}</td></tr>
      <tr><td style="padding:6px 0"><strong>Total paid</strong></td><td style="padding:6px 0;text-align:right"><strong>${gbp(order.total_pence)}</strong></td></tr>
    </table>
    <p><strong>Delivering to</strong><br>${addrLines.map(escapeHtml).join("<br>")}</p>
    ${order.phone ? `<p><strong>Phone</strong><br>${escapeHtml(order.phone)}</p>` : ""}
    ${settings.dispatch_estimate ? `<p>${escapeHtml(settings.dispatch_estimate)}</p>` : ""}
    <p>${escapeHtml(shop)}</p></div>`, "body");
  const text = /* @__PURE__ */ __name2((heading, intro) => [
    heading,
    "",
    intro,
    "",
    ...items.map((i) => `${i.name}${i.label ? " \u2013 " + i.label : ""} x ${i.qty}  ${gbp(i.line_pence)}`),
    ...order.discount_pence > 0 ? [`Multi-buy saving${dealNames ? " (" + dealNames + ")" : ""}  -${gbp(order.discount_pence)}`] : [],
    `Delivery  ${order.delivery_pence ? gbp(order.delivery_pence) : "Free"}`,
    `Total paid  ${gbp(order.total_pence)}`,
    "",
    "Delivering to:",
    ...addrLines,
    ...order.phone ? ["", `Phone: ${order.phone}`] : [],
    "",
    settings.dispatch_estimate || "",
    shop
  ].join("\n"), "text");
  const customerIntro = `Order <strong>${escapeHtml(order.ref)}</strong> is confirmed and paid.`;
  const messages = [{
    from: env.EMAIL_FROM,
    to: [order.email],
    ...settings.contact_email ? { reply_to: settings.contact_email } : {},
    subject: `Your ${shop} order ${order.ref}`,
    html: body("Thanks for your order", customerIntro),
    text: text("Thanks for your order", `Order ${order.ref} is confirmed and paid.`)
  }];
  if (settings.order_notify_email) {
    const alertIntro = `${escapeHtml(order.name)} (${escapeHtml(order.email)}) has paid for order <strong>${escapeHtml(order.ref)}</strong>. Open the admin area to update its status.`;
    messages.push({
      from: env.EMAIL_FROM,
      to: [settings.order_notify_email],
      reply_to: order.email,
      subject: `New paid order ${order.ref} \u2013 ${gbp(order.total_pence)}`,
      html: body("New paid order", alertIntro),
      text: text("New paid order", `${order.name} (${order.email}) has paid for order ${order.ref}.`)
    });
  }
  const problems = [];
  if (messages.length > 1) {
    try {
      await post(env, "/emails/batch", messages);
      return problems;
    } catch (e) {
      console.error("Batch send failed, sending individually", e.message);
    }
  }
  for (const msg of messages) {
    try {
      await sendOne(env, msg);
    } catch (e) {
      problems.push(`${msg.to[0]}: ${e.message}`);
      console.error("Email failed", msg.to[0], e.message);
    }
  }
  return problems;
}
__name(sendOrderEmails, "sendOrderEmails");
__name2(sendOrderEmails, "sendOrderEmails");
async function sendContactEmail(env, msg, settings) {
  const to = settings.contact_email || settings.order_notify_email;
  if (!to)
    throw new Error("No contact email address is set.");
  const rows = [["From", `${msg.name} <${msg.email}>`], ["About", msg.topic], ...msg.order ? [["Order number", msg.order]] : []];
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#2a2230">
    <h2 style="font-family:Georgia,serif;color:#2e1437">Message from the website</h2>
    <table style="border-collapse:collapse;margin-bottom:16px">${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#675b6f">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}</table>
    <div style="white-space:pre-wrap;border-left:4px solid #ff89cd;padding:8px 0 8px 14px">${escapeHtml(msg.message)}</div>
    <p style="color:#675b6f;font-size:13px;margin-top:20px">Reply to this email and it goes straight back to them.</p></div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}

${msg.message}
`;
  return sendOne(env, { from: env.EMAIL_FROM, to: [to], reply_to: msg.email, subject: `Website enquiry: ${msg.topic}${msg.order ? ` (${msg.order})` : ""}`, html, text });
}
__name(sendContactEmail, "sendContactEmail");
__name2(sendContactEmail, "sendContactEmail");
var onRequestGet3 = /* @__PURE__ */ __name2(({ data, env }) => json({ email: data.admin.email, payment_mode: paymentMode(env), email_configured: emailConfigured(env), defaults: { usage: DEFAULT_USAGE, safety: DEFAULT_SAFETY } }), "onRequestGet");
var onRequestGet4 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const view = new URL(request.url).searchParams.get("view") || "paid";
  const where = view === "all" ? "" : view === "other" ? `WHERE status != 'paid'` : `WHERE status = 'paid'`;
  const { results } = await db.prepare(
    `SELECT id,ref,mode,status,fulfilment,email,name,total_pence,created_at,paid_at,items FROM orders ${where} ORDER BY created_at DESC LIMIT 200`
  ).all();
  return json({ orders: results.map((o) => ({ ...o, items: void 0, item_count: JSON.parse(o.items).reduce((n, i) => n + i.qty, 0) })) });
});
var onRequestGet5 = handle(async ({ env }) => {
  const db = await getDb(env);
  const { results } = await db.prepare(`SELECT slug,title,body,needs_review,updated_at FROM pages ORDER BY slug`).all();
  return json({ pages: results.map((p2) => ({ ...p2, needs_review: !!p2.needs_review })) });
});
var onRequestGet6 = handle(async ({ env }) => {
  const db = await getDb(env);
  const { results } = await db.prepare(`SELECT * FROM posts ORDER BY published_at DESC`).all();
  return json({ posts: results.map((p2) => ({ ...p2, published: !!p2.published })) });
});
var onRequestPost3 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const p2 = parsePost(await readJson(request, 256 * 1024));
  let slug = slugify(p2.title) || "post";
  if (await db.prepare(`SELECT 1 FROM posts WHERE slug=?`).bind(slug).first())
    slug += "-" + randomId(2);
  await db.prepare(`INSERT INTO posts(slug,title,excerpt,body,image_url,published,published_at,updated_at) VALUES(?,?,?,?,?,?,?,?)`).bind(slug, p2.title, p2.excerpt, p2.body, p2.image_url, p2.published, p2.published_at, (/* @__PURE__ */ new Date()).toISOString()).run();
  return json({ slug }, 201);
});
var onRequestGet7 = handle(async ({ env }) => {
  const db = await getDb(env);
  return json({ products: await loadProducts(db, { includeHidden: true }) });
});
var onRequestPost4 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const { p: p2, variants, newVariantId } = parseProduct(await readJson(request), null);
  let id = slugify(p2.name) || "product";
  if (await db.prepare(`SELECT 1 FROM products WHERE id=?`).bind(id).first())
    id += "-" + randomId(2);
  const stmts = [db.prepare(
    `INSERT INTO products(id,name,category,scents,short_desc,description,weight,usage,safety,image_url,option_name,hidden,sold_out,featured,is_sample,sort,created_at,deal_group,deal_qty,deal_pence,shape,updated_at)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?,?,?,?,?,?)`
  ).bind(
    id,
    p2.name,
    p2.category,
    p2.scents.join(","),
    p2.short_desc,
    p2.description,
    p2.weight,
    p2.usage,
    p2.safety,
    p2.image_url,
    p2.option_name,
    p2.hidden,
    p2.sold_out,
    p2.featured,
    p2.sort,
    (/* @__PURE__ */ new Date()).toISOString(),
    p2.deal_group,
    p2.deal_qty,
    p2.deal_pence,
    p2.shape,
    (/* @__PURE__ */ new Date()).toISOString()
  )];
  stmts.push(...spreadDeal(db, p2, id, variants));
  for (const v of variants)
    stmts.push(db.prepare(`INSERT INTO variants(id,product_id,label,price_pence,stock,sort,deal_group,deal_qty,deal_pence,shape) VALUES(?,?,?,?,?,?,?,?,?,?)`).bind(newVariantId(id), id, v.label, v.price_pence, v.stock, v.sort, v.deal_group, v.deal_qty, v.deal_pence, v.shape || ""));
  await db.batch(stmts);
  const [product] = await loadProducts(db, { includeHidden: true, id });
  return json({ product }, 201);
});
var onRequestDelete5 = handle(async ({ env }) => {
  const db = await getDb(env);
  const res = await db.batch([
    db.prepare(`DELETE FROM variants WHERE product_id IN (SELECT id FROM products WHERE is_sample=1)`),
    db.prepare(`DELETE FROM products WHERE is_sample=1`)
  ]);
  return json({ deleted: res[1].meta.changes });
});
var MONEY = ["delivery_pence", "free_delivery_threshold_pence"];
var onRequestGet8 = handle(async ({ env }) => json({ settings: await getSettings(await getDb(env)) }));
var onRequestPut6 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  const fields = {}, stmts = [];
  for (const key of Object.keys(DEFAULT_SETTINGS)) {
    if (!(key in body))
      continue;
    let val = String(body[key] ?? "").trim().slice(0, 2e3);
    if (MONEY.includes(key)) {
      const n = val === "" ? 0 : Number(val);
      if (!Number.isInteger(n) || n < 0 || n > 1e5) {
        fields[key] = "Enter an amount between \xA30 and \xA31,000.";
        continue;
      }
      val = String(n);
    }
    if (key.endsWith("_email") && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
      fields[key] = "Enter a valid email address.";
      continue;
    }
    stmts.push(db.prepare(`INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`).bind(key, val));
  }
  if (Object.keys(fields).length)
    return fail(422, "Please check the highlighted fields.", { fields });
  if (stmts.length)
    await db.batch(stmts);
  return json({ settings: await getSettings(db) });
});
var onRequestGet9 = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const page = await db.prepare(`SELECT slug,title,body,needs_review FROM pages WHERE slug=?`).bind(String(params.slug)).first();
  if (!page)
    return fail(404, "Page not found.");
  return json({ page: { ...page, needs_review: !!page.needs_review } }, 200, { "cache-control": "public, max-age=30" });
});
var onRequestGet10 = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const post3 = await db.prepare(`SELECT slug,title,excerpt,body,image_url,published_at FROM posts WHERE slug=? AND published=1`).bind(String(params.slug).slice(0, 120)).first();
  return post3 ? json({ post: post3 }, 200, { "cache-control": "public, max-age=30" }) : fail(404, "Post not found.");
});
var onRequestGet11 = handle(async ({ env, params }) => {
  const db = await getDb(env);
  const [product] = await loadProducts(db, { id: String(params.id).slice(0, 120) });
  if (!product)
    return fail(404, "Product not found.");
  return json({ product }, 200, { "cache-control": "public, max-age=15" });
});
var MAX_LINES = 40;
var MAX_QTY = 20;
async function priceBasket(db, settings, rawItems) {
  if (!Array.isArray(rawItems))
    throw httpError(400, "Basket must be a list of items.");
  if (rawItems.length > MAX_LINES)
    throw httpError(400, "Too many different items in the basket.");
  const wanted = /* @__PURE__ */ new Map();
  for (const it of rawItems) {
    const id = typeof it?.variant_id === "string" ? it.variant_id.slice(0, 120) : "";
    const qty = Number(it?.qty);
    const shape2 = typeof it?.shape === "string" ? it.shape.slice(0, 40) : "";
    if (!id || !Number.isInteger(qty) || qty < 1)
      throw httpError(400, "Invalid basket item.");
    const k = `${id}\0${shape2}`;
    wanted.set(k, { id, shape: shape2, qty: (wanted.get(k)?.qty || 0) + qty });
  }
  const perVariant = /* @__PURE__ */ new Map();
  for (const w of wanted.values())
    perVariant.set(w.id, (perVariant.get(w.id) || 0) + w.qty);
  const ids = [...perVariant.keys()];
  let rows = [];
  if (ids.length) {
    const marks = ids.map(() => "?").join(",");
    const res = await db.prepare(
      `SELECT v.id AS variant_id, v.label, v.price_pence, v.stock, v.shape AS v_shape,
              v.deal_group AS v_deal_group, v.deal_qty AS v_deal_qty, v.deal_pence AS v_deal_pence,
              p.id AS product_id, p.name, p.image_url, p.hidden, p.sold_out,
              p.deal_group, p.deal_qty, p.deal_pence, p.shape AS shapes,
              (SELECT COUNT(*) FROM variants x WHERE x.product_id = p.id) AS variant_count
         FROM variants v JOIN products p ON p.id = v.product_id
        WHERE v.id IN (${marks})`
    ).bind(...ids).all();
    rows = res.results;
  }
  const found = new Map(rows.map((r) => [r.variant_id, r]));
  const lines = [];
  let subtotal = 0;
  for (const { id, shape: shape2, qty } of wanted.values()) {
    const r = found.get(id);
    if (!r || r.hidden) {
      lines.push({ variant_id: id, shape: shape2, qty, ok: false, problem: "gone", message: "This item is no longer available." });
      continue;
    }
    const lineShape = r.v_shape ? "" : shape2;
    const shapeName = lineShape ? (SHAPES.find((s) => s.id === lineShape) || {}).name : "";
    const shapeOk = !lineShape || (r.shapes || "").split(",").includes(lineShape) && shapeName;
    const deal = dealFor(
      { id: r.variant_id, deal_group: r.v_deal_group, deal_qty: r.v_deal_qty, deal_pence: r.v_deal_pence },
      { id: r.product_id, deal_group: r.deal_group, deal_qty: r.deal_qty, deal_pence: r.deal_pence }
    );
    const line2 = {
      variant_id: id,
      product_id: r.product_id,
      name: r.name,
      label: [r.variant_count > 1 ? r.label : "", shapeName].filter(Boolean).join(" \xB7 "),
      shape: lineShape,
      shape_name: shapeName || "",
      image_url: r.image_url,
      unit_pence: r.price_pence,
      qty,
      ok: true,
      deal_key: deal ? deal.key : "",
      deal_label: deal ? deal.label : ""
    };
    if (deal)
      line2._deal = deal;
    const total = perVariant.get(id);
    if (!shapeOk) {
      Object.assign(line2, { ok: false, problem: "gone", message: "That shape is no longer available for this scent." });
    } else if (r.sold_out || r.stock <= 0) {
      Object.assign(line2, { ok: false, problem: "sold_out", message: "Sold out." });
    } else if (qty > MAX_QTY || total > r.stock) {
      const max = Math.max(0, Math.min(r.stock - (total - qty), MAX_QTY));
      Object.assign(line2, { ok: false, problem: "too_many", max, message: total > r.stock && total !== qty ? `Only ${r.stock} of this scent available across all shapes.` : `Only ${max} available.` });
    }
    line2.line_pence = line2.unit_pence * qty;
    if (line2.ok)
      subtotal += line2.line_pence;
    lines.push(line2);
  }
  const { deals, discount } = applyDeals(lines);
  const itemsTotal = subtotal;
  subtotal -= discount;
  const threshold = parseInt(settings.free_delivery_threshold_pence, 10) || 0;
  const rate = Math.max(0, parseInt(settings.delivery_pence, 10) || 0);
  const free = threshold > 0 && subtotal >= threshold;
  const delivery = subtotal === 0 ? 0 : free ? 0 : rate;
  return {
    lines,
    ok: lines.length > 0 && lines.every((l) => l.ok),
    items_pence: itemsTotal,
    discount_pence: discount,
    deals,
    subtotal_pence: subtotal,
    delivery_pence: delivery,
    total_pence: subtotal + delivery,
    delivery_name: settings.delivery_name,
    free_delivery: free,
    free_delivery_threshold_pence: threshold,
    to_free_delivery_pence: threshold > 0 && !free ? threshold - subtotal : 0
  };
}
__name(priceBasket, "priceBasket");
__name2(priceBasket, "priceBasket");
function applyDeals(lines) {
  const groups = /* @__PURE__ */ new Map();
  for (const l of lines) {
    if (!l.ok || !l._deal)
      continue;
    const g = groups.get(l._deal.key) || { deal: l._deal, units: [] };
    for (let i = 0; i < l.qty; i++)
      g.units.push(l.unit_pence);
    groups.set(l._deal.key, g);
  }
  const deals = [];
  let discount = 0;
  for (const g of groups.values()) {
    const { qty, pence, label, key, group } = g.deal;
    const units = g.units.sort((a, b) => b - a);
    const bundles = Math.floor(units.length / qty);
    const inDeal = units.slice(0, bundles * qty).reduce((n, u) => n + u, 0);
    const saving = Math.max(0, inDeal - bundles * pence);
    const need = units.length % qty ? qty - units.length % qty : 0;
    deals.push({ key, group, label, qty, pence, units: units.length, bundles, saving_pence: saving, need });
    discount += saving;
  }
  for (const l of lines)
    delete l._deal;
  return { deals, discount };
}
__name(applyDeals, "applyDeals");
__name2(applyDeals, "applyDeals");
function encodeForm(obj, prefix, out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === void 0 || v === null)
      continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === "object")
      encodeForm(v, key, out);
    else
      out.push(encodeURIComponent(key) + "=" + encodeURIComponent(String(v)));
  }
  return out;
}
__name(encodeForm, "encodeForm");
__name2(encodeForm, "encodeForm");
async function post2(env, path, params, idempotencyKey) {
  const base = env.STRIPE_API_BASE || "https://api.stripe.com";
  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "content-type": "application/x-www-form-urlencoded",
      "idempotency-key": idempotencyKey
    },
    body: encodeForm(params).join("&")
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Stripe error", res.status, data?.error?.message);
    throw httpError(502, "We could not start the payment. Please try again in a moment.");
  }
  return data;
}
__name(post2, "post2");
__name2(post2, "post");
var createCheckoutSession = /* @__PURE__ */ __name2((env, params, idempotencyKey) => post2(env, "/v1/checkout/sessions", params, idempotencyKey), "createCheckoutSession");
var createDiscountCoupon = /* @__PURE__ */ __name2((env, amountPence, name, idempotencyKey) => post2(env, "/v1/coupons", { amount_off: amountPence, currency: "gbp", duration: "once", name, max_redemptions: 1 }, idempotencyKey), "createDiscountCoupon");
var enc = new TextEncoder();
var hex = /* @__PURE__ */ __name2((buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join(""), "hex");
function timingSafeEqual(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
__name2(timingSafeEqual, "timingSafeEqual");
async function signPayload(secret, timestamp, payload) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(`${timestamp}.${payload}`)));
}
__name(signPayload, "signPayload");
__name2(signPayload, "signPayload");
async function verifyWebhook(rawBody, header, secret, toleranceSeconds = 300) {
  if (!header)
    throw httpError(400, "Missing signature.");
  let t = "";
  const sigs = [];
  for (const part of header.split(",")) {
    const [k, v] = part.split("=");
    if (k === "t")
      t = v;
    if (k === "v1")
      sigs.push(v);
  }
  if (!t || !sigs.length)
    throw httpError(400, "Malformed signature.");
  if (Math.abs(Date.now() / 1e3 - Number(t)) > toleranceSeconds)
    throw httpError(400, "Signature timestamp outside tolerance.");
  const expected = await signPayload(secret, t, rawBody);
  if (!sigs.some((s) => timingSafeEqual(s, expected)))
    throw httpError(400, "Signature mismatch.");
  try {
    return JSON.parse(rawBody);
  } catch {
    throw httpError(400, "Invalid payload.");
  }
}
__name(verifyWebhook, "verifyWebhook");
__name2(verifyWebhook, "verifyWebhook");
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var POSTCODE_RE = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;
function validateCustomer(c = {}) {
  const v = {
    email: clean(c.email, 254).toLowerCase(),
    name: clean(c.name, 100),
    phone: clean(c.phone, 30),
    line1: clean(c.line1, 120),
    line2: clean(c.line2, 120),
    city: clean(c.city, 80),
    county: clean(c.county, 80),
    postcode: clean(c.postcode, 10).toUpperCase()
  };
  const fields = {};
  if (!EMAIL_RE.test(v.email))
    fields.email = "Enter a valid email address, like name@example.com.";
  if (v.name.length < 2)
    fields.name = "Enter the name for the delivery label.";
  if (!v.line1)
    fields.line1 = "Enter the first line of the address.";
  if (!v.city)
    fields.city = "Enter the town or city.";
  if (!POSTCODE_RE.test(v.postcode))
    fields.postcode = "Enter a full UK postcode, like CH1 2AB.";
  if (v.phone && !/^[\d+() -]{7,}$/.test(v.phone))
    fields.phone = "Enter a phone number using digits only, or leave it blank.";
  if (c.country && c.country !== "GB")
    fields.country = "We currently deliver to UK addresses only.";
  if (POSTCODE_RE.test(v.postcode) && !v.postcode.includes(" "))
    v.postcode = v.postcode.slice(0, -3) + " " + v.postcode.slice(-3);
  return { v, fields };
}
__name(validateCustomer, "validateCustomer");
__name2(validateCustomer, "validateCustomer");
var onRequestPost5 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  const { v, fields } = validateCustomer(body.customer);
  if (Object.keys(fields).length)
    return fail(422, "Please check the highlighted details.", { fields });
  const settings = await getSettings(db);
  const quote = await priceBasket(db, settings, body.items || []);
  if (!quote.lines.length)
    return fail(400, "Your basket is empty.");
  if (!quote.ok)
    return fail(409, "Some items in your basket have changed. Please review your basket.", { quote });
  const mode = paymentMode(env);
  const id = randomId(16), token = randomId(24), ref = orderRef(), now = (/* @__PURE__ */ new Date()).toISOString();
  const items = quote.lines.map((l) => ({
    variant_id: l.variant_id,
    product_id: l.product_id,
    name: l.name,
    label: l.label,
    shape: l.shape || "",
    unit_pence: l.unit_pence,
    qty: l.qty,
    line_pence: l.line_pence
  }));
  const address = { line1: v.line1, line2: v.line2, city: v.city, county: v.county, postcode: v.postcode, country: "GB" };
  await db.prepare(
    `INSERT INTO orders(id,ref,token,mode,status,email,name,phone,address,items,subtotal_pence,delivery_pence,total_pence,currency,created_at,discount_pence,deals)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'gbp',?,?,?)`
  ).bind(
    id,
    ref,
    token,
    mode,
    mode === "demo" ? "demo" : "pending",
    v.email,
    v.name,
    v.phone,
    JSON.stringify(address),
    JSON.stringify(items),
    quote.subtotal_pence,
    quote.delivery_pence,
    quote.total_pence,
    now,
    quote.discount_pence,
    JSON.stringify(quote.deals.filter((d) => d.saving_pence > 0).map(({ label, bundles, saving_pence }) => ({ label, bundles, saving_pence })))
  ).run();
  const origin = new URL(request.url).origin;
  if (mode === "demo") {
    return json({ mode, url: `${origin}/demo-checkout?token=${token}` });
  }
  let session;
  try {
    let discounts;
    if (quote.discount_pence > 0) {
      const names = quote.deals.filter((d) => d.saving_pence > 0).map((d) => d.label).join(", ");
      const coupon = await createDiscountCoupon(env, quote.discount_pence, `Multi-buy saving (${names})`.slice(0, 40), `coupon-${id}`);
      discounts = { 0: { coupon: coupon.id } };
    }
    session = await createCheckoutSession(env, {
      mode: "payment",
      client_reference_id: id,
      customer_email: v.email,
      success_url: `${origin}/success?token=${token}`,
      cancel_url: `${origin}/cancelled?token=${token}`,
      expires_at: Math.floor(Date.now() / 1e3) + 31 * 60,
      metadata: { order_id: id, order_ref: ref },
      payment_intent_data: {
        description: `Order ${ref}`,
        metadata: { order_id: id, order_ref: ref },
        shipping: {
          name: v.name,
          phone: v.phone || void 0,
          address: { line1: v.line1, line2: v.line2 || void 0, city: v.city, state: v.county || void 0, postal_code: v.postcode, country: "GB" }
        }
      },
      // payment_method_types is left unset on purpose: Stripe then offers cards plus
      // Apple Pay / Google Pay / Link where the customer's device is eligible.
      line_items: Object.fromEntries(items.map((it, i) => [i, {
        quantity: it.qty,
        price_data: {
          currency: "gbp",
          unit_amount: it.unit_pence,
          product_data: { name: it.label ? `${it.name} \u2013 ${it.label}` : it.name }
        }
      }])),
      discounts,
      shipping_options: { 0: { shipping_rate_data: {
        type: "fixed_amount",
        display_name: settings.delivery_name || "UK delivery",
        fixed_amount: { amount: quote.delivery_pence, currency: "gbp" }
      } } }
    }, `order-${id}`);
  } catch (err) {
    await db.prepare(`UPDATE orders SET status='failed', admin_note='Could not create Stripe session.' WHERE id=?`).bind(id).run();
    throw err;
  }
  await db.prepare(`UPDATE orders SET stripe_session_id=? WHERE id=?`).bind(session.id, id).run();
  return json({ mode, url: session.url });
});
var onRequestGet12 = handle(async ({ env }) => {
  const db = await getDb(env);
  const s = await getSettings(db);
  return json({
    payment_mode: paymentMode(env),
    // 'demo' | 'test' | 'live'
    categories: CATEGORIES,
    scents: SCENTS,
    shapes: SHAPES,
    shape_category: SHAPE_CATEGORY,
    delivery_pence: parseInt(s.delivery_pence, 10) || 0,
    free_delivery_threshold_pence: parseInt(s.free_delivery_threshold_pence, 10) || 0,
    delivery_name: s.delivery_name,
    dispatch_estimate: s.dispatch_estimate,
    handmade_note: s.handmade_note,
    fragrance_note: s.fragrance_note,
    announcement: s.announcement,
    hero_headline: s.hero_headline,
    hero_sub: s.hero_sub,
    intro_title: s.intro_title,
    intro_text: s.intro_text,
    business_name: s.business_name,
    contact_email: s.contact_email,
    contact_phone: s.contact_phone,
    business_address: s.business_address
  }, 200, { "cache-control": "public, max-age=30" });
});
var TOPICS = ["An order", "A product or scent", "Delivery", "Wholesale or bulk", "Something else"];
var clean2 = /* @__PURE__ */ __name2((v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max), "clean");
var onRequestPost6 = handle(async ({ env, request }) => {
  const form = request.headers.get("content-type")?.includes("form") ? Object.fromEntries(await request.formData()) : await readJson(request);
  if (clean2(form.website, 200))
    return json({ ok: true });
  const age = Date.now() - Number(form.started || 0);
  if (Number(form.started) && age >= 0 && age < 2500)
    throw httpError(400, "That was too quick. Please try again.");
  const name = clean2(form.name, 80);
  const email = clean2(form.email, 120);
  const topic = TOPICS.includes(clean2(form.topic, 40)) ? clean2(form.topic, 40) : TOPICS[TOPICS.length - 1];
  const order = clean2(form.order, 40);
  const message = clean2(form.message, 4e3);
  const errors = {};
  if (name.length < 2)
    errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Please check your email address.";
  if (message.length < 10)
    errors.message = "Please write a little more so we can help.";
  if (Object.keys(errors).length)
    throw httpError(422, "Please check the form.", { errors });
  const db = await getDb(env);
  const settings = await getSettings(db);
  if (!emailConfigured(env))
    throw httpError(503, "Our contact form is not available right now. Please email us instead.");
  await sendContactEmail(env, { name, email, topic, order, message }, settings);
  return json({ ok: true });
});
var onRequestGet13 = /* @__PURE__ */ __name2(() => new Response(null, { status: 303, headers: { location: "/contact" } }), "onRequestGet");
var safeDeals2 = /* @__PURE__ */ __name2((s) => {
  try {
    const d = JSON.parse(s || "[]");
    return Array.isArray(d) ? d : [];
  } catch {
    return [];
  }
}, "safeDeals");
var onRequestGet14 = handle(async ({ env, request }) => {
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!/^[a-f0-9]{48}$/.test(token))
    return fail(400, "Missing or invalid order link.");
  const db = await getDb(env);
  const o = await db.prepare(`SELECT ref,mode,status,email,items,subtotal_pence,delivery_pence,total_pence,discount_pence,deals FROM orders WHERE token=?`).bind(token).first();
  if (!o)
    return fail(404, "Order not found.");
  const [user, domain] = o.email.split("@");
  const s = await getSettings(db);
  return json({
    ref: o.ref,
    mode: o.mode,
    status: o.status,
    email_hint: `${user.slice(0, 2)}\u2026@${domain}`,
    items: JSON.parse(o.items).map(({ name, label, qty, line_pence }) => ({ name, label, qty, line_pence })),
    subtotal_pence: o.subtotal_pence,
    delivery_pence: o.delivery_pence,
    total_pence: o.total_pence,
    discount_pence: o.discount_pence || 0,
    deals: safeDeals2(o.deals),
    dispatch_estimate: s.dispatch_estimate
  });
});
var onRequestGet15 = handle(async ({ env }) => {
  const db = await getDb(env);
  const { results } = await db.prepare(
    `SELECT slug,title,excerpt,image_url,published_at FROM posts WHERE published=1 ORDER BY published_at DESC LIMIT 50`
  ).all();
  return json({ posts: results }, 200, { "cache-control": "public, max-age=30" });
});
var onRequestGet16 = handle(async ({ env }) => {
  const db = await getDb(env);
  return json({ products: await loadProducts(db) }, 200, { "cache-control": "public, max-age=15" });
});
var onRequestPost7 = handle(async ({ env, request }) => {
  const db = await getDb(env);
  const body = await readJson(request);
  return json(await priceBasket(db, await getSettings(db), body.items || []));
});
async function markOrderPaid(db, order, event, session) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const items = JSON.parse(order.items);
  const amountOk = session.amount_total === order.total_pence && (session.currency || "").toLowerCase() === order.currency;
  if (!amountOk) {
    await db.batch([
      db.prepare(`INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)`).bind(event.id, event.type, now),
      db.prepare(`UPDATE orders SET status='review', payment_intent=?, admin_note=admin_note || ? WHERE id=? AND status IN ('pending','expired','failed')`).bind(session.payment_intent || null, `Amount mismatch: Stripe reported ${session.amount_total} ${session.currency}. `, order.id)
    ]);
    return { changed: false, review: true };
  }
  const stmts = [db.prepare(`INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)`).bind(event.id, event.type, now)];
  for (const it of items) {
    stmts.push(db.prepare(
      `UPDATE variants SET stock = MAX(stock - ?, 0)
        WHERE id = ? AND EXISTS (SELECT 1 FROM orders WHERE id = ? AND stock_deducted = 0)`
    ).bind(it.qty, it.variant_id, order.id));
  }
  stmts.push(db.prepare(
    `UPDATE orders SET status='paid', stock_deducted=1, paid_at=?, payment_intent=?
      WHERE id=? AND stock_deducted=0`
  ).bind(now, session.payment_intent || null, order.id));
  const results = await db.batch(stmts);
  const changed = results[results.length - 1].meta.changes === 1;
  return { changed };
}
__name(markOrderPaid, "markOrderPaid");
__name2(markOrderPaid, "markOrderPaid");
async function sendConfirmationOnce(env, db, orderId) {
  if (!emailConfigured(env))
    return;
  const claim = await db.prepare(`UPDATE orders SET email_sent=1 WHERE id=? AND email_sent=0 AND status='paid'`).bind(orderId).run();
  if (claim.meta.changes !== 1)
    return;
  let problems;
  try {
    const order = await db.prepare(`SELECT * FROM orders WHERE id=?`).bind(orderId).first();
    problems = await sendOrderEmails(env, order, await getSettings(db));
  } catch (err) {
    problems = [err.message];
  }
  if (problems.length) {
    console.error("Confirmation email problems", problems);
    await db.prepare(`UPDATE orders SET email_sent=0, admin_note = admin_note || ? WHERE id=?`).bind(`Email not sent (${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace("T", " ")}): ${problems.join("; ")}
`, orderId).run();
  }
}
__name(sendConfirmationOnce, "sendConfirmationOnce");
__name2(sendConfirmationOnce, "sendConfirmationOnce");
var onRequestPost8 = handle(async ({ env, request, waitUntil }) => {
  if (!env.STRIPE_WEBHOOK_SECRET)
    return fail(503, "Webhook secret not configured.");
  const raw = await request.text();
  const event = await verifyWebhook(raw, request.headers.get("stripe-signature"), env.STRIPE_WEBHOOK_SECRET);
  const db = await getDb(env);
  const session = event.data?.object || {};
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const logEvent = /* @__PURE__ */ __name2(() => db.prepare(`INSERT OR IGNORE INTO stripe_events(id,type,received_at) VALUES(?,?,?)`).bind(event.id, event.type, now).run(), "logEvent");
  const findOrder = /* @__PURE__ */ __name2(() => db.prepare(`SELECT * FROM orders WHERE stripe_session_id=? OR id=?`).bind(session.id || "", session.client_reference_id || session.metadata?.order_id || "").first(), "findOrder");
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      if (session.payment_status !== "paid") {
        await logEvent();
        break;
      }
      const order = await findOrder();
      if (!order) {
        await logEvent();
        console.error("Paid session with no matching order", session.id);
        break;
      }
      if (order.mode === "live" !== !!event.livemode) {
        await logEvent();
        console.error("Live/test mode mismatch", order.ref);
        break;
      }
      const { changed } = await markOrderPaid(db, order, event, session);
      if (changed)
        waitUntil(sendConfirmationOnce(env, db, order.id));
      break;
    }
    case "checkout.session.async_payment_failed":
    case "checkout.session.expired": {
      const status = event.type.endsWith("expired") ? "expired" : "failed";
      const order = await findOrder();
      if (order)
        await db.prepare(`UPDATE orders SET status=? WHERE id=? AND status='pending'`).bind(status, order.id).run();
      await logEvent();
      break;
    }
    default:
      break;
  }
  return json({ received: true });
});
var cachedKeys = null;
var cachedAt = 0;
async function getKeys(teamDomain) {
  if (cachedKeys && Date.now() - cachedAt < 60 * 60 * 1e3)
    return cachedKeys;
  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok)
    throw httpError(503, "Could not load Cloudflare Access signing keys.");
  cachedKeys = (await res.json()).keys || [];
  cachedAt = Date.now();
  return cachedKeys;
}
__name(getKeys, "getKeys");
__name2(getKeys, "getKeys");
var b64urlToBytes = /* @__PURE__ */ __name2((s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)), "b64urlToBytes");
var b64urlToJson = /* @__PURE__ */ __name2((s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s))), "b64urlToJson");
async function requireAdmin(request, env) {
  const url = new URL(request.url);
  const local = ["localhost", "127.0.0.1"].includes(url.hostname);
  if (env.ADMIN_DEV_BYPASS === "true" && local)
    return { email: "local-dev@localhost" };
  const team = (env.ACCESS_TEAM_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const aud = env.ACCESS_AUD || "";
  if (!team || !aud)
    throw httpError(503, "Admin sign-in is not set up yet. Add ACCESS_TEAM_DOMAIN and ACCESS_AUD (see README).");
  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token)
    throw httpError(401, "Sign in required.");
  const parts = token.split(".");
  if (parts.length !== 3)
    throw httpError(401, "Invalid sign-in token.");
  let header, payload;
  try {
    header = b64urlToJson(parts[0]);
    payload = b64urlToJson(parts[1]);
  } catch {
    throw httpError(401, "Invalid sign-in token.");
  }
  if (header.alg !== "RS256")
    throw httpError(401, "Invalid sign-in token.");
  const jwk = (await getKeys(team)).find((k) => k.kid === header.kid);
  if (!jwk) {
    cachedKeys = null;
    throw httpError(401, "Unknown signing key.");
  }
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    b64urlToBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );
  if (!valid)
    throw httpError(401, "Invalid sign-in token.");
  const now = Math.floor(Date.now() / 1e3);
  const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!auds.includes(aud))
    throw httpError(403, "Token is for a different application.");
  if (payload.iss !== `https://${team}`)
    throw httpError(403, "Token issuer mismatch.");
  if (!payload.exp || payload.exp < now)
    throw httpError(401, "Sign-in expired. Reload the page.");
  if (!payload.email)
    throw httpError(403, "Token has no email identity.");
  return { email: payload.email };
}
__name(requireAdmin, "requireAdmin");
__name2(requireAdmin, "requireAdmin");
var onRequest = handle(async (ctx) => {
  const { request, env } = ctx;
  ctx.data.admin = await requireAdmin(request, env);
  if (!["GET", "HEAD"].includes(request.method)) {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin)
      throw httpError(403, "Cross-site request blocked.");
    if (request.headers.get("x-otr-admin") !== "1")
      throw httpError(403, "Missing admin request header.");
  }
  const res = await ctx.next();
  const out = new Response(res.body, res);
  out.headers.set("cache-control", "no-store");
  out.headers.set("x-robots-tag", "noindex");
  return out;
});
var SITE = "https://www.overtherainbowwaxmelts.co.uk";
var GOOGLE = {
  placeId: "ChIJUShLVxqHkqUR5CCTCbkYW0Y",
  lat: 53.2778293,
  lng: -2.9132642,
  profile: "https://www.google.com/maps/place/?q=place_id:ChIJUShLVxqHkqUR5CCTCbkYW0Y",
  review: "https://search.google.com/local/writereview?placeid=ChIJUShLVxqHkqUR5CCTCbkYW0Y",
  directions: "https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJUShLVxqHkqUR5CCTCbkYW0Y&destination=Over+The+Rainbow+Wax+Melts",
  // Embed address copied from the Google Business Profile "Share or embed map" panel.
  embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2385.653416542401!2d-2.9132642!3d53.2778293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa592871a574b2851%3A0x465b18b9099320e4!2sOver%20The%20Rainbow%20Wax%20Melts!5e0!3m2!1sen!2suk!4v1790523711154!5m2!1sen!2suk"
};
var SITE_NAME = "Over The Rainbow Wax Melts";
var DEFAULT_OG = `${SITE}/assets/img/og-default.png`;
var esc = /* @__PURE__ */ __name2((s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]), "esc");
var gbp2 = /* @__PURE__ */ __name2((p2) => `\xA3${(p2 / 100).toFixed(2)}`, "gbp");
var strip = /* @__PURE__ */ __name2((s, n = 160) => {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1).replace(/\s\S*$/, "") + "\u2026" : t;
}, "strip");
var abs = /* @__PURE__ */ __name2((u) => u && /^https?:/.test(u) ? u : `${SITE}${u || ""}`, "abs");
var ogImageFor = /* @__PURE__ */ __name2((url) => url && !url.endsWith(".svg") ? abs(url) : DEFAULT_OG, "ogImageFor");
var ldJson = /* @__PURE__ */ __name2((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}<\/script>`, "ldJson");
function formatBody(body) {
  return String(body || "").replace(/\r/g, "").split(/\n{2,}/).map((block2) => {
    const lines = block2.split("\n").filter((l) => l.trim());
    if (!lines.length)
      return "";
    if (/^Q:\s*/i.test(lines[0]))
      return `<details class="info faq"><summary>${esc(lines[0].replace(/^Q:\s*/i, ""))}</summary><div>${lines.slice(1).map(esc).join("<br>")}</div></details>`;
    let html = "", list = [], para = [];
    const flush = /* @__PURE__ */ __name2(() => {
      if (list.length) {
        html += `<ul>${list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`;
        list = [];
      }
      if (para.length) {
        html += `<p>${para.map(esc).join("<br>")}</p>`;
        para = [];
      }
    }, "flush");
    for (const l of lines) {
      if (l.startsWith("## ")) {
        flush();
        html += `<h2>${esc(l.slice(3))}</h2>`;
      } else if (/^[-*] /.test(l)) {
        if (para.length)
          flush();
        list.push(l.slice(2));
      } else {
        if (list.length)
          flush();
        para.push(l);
      }
    }
    flush();
    return html;
  }).join("");
}
__name(formatBody, "formatBody");
__name2(formatBody, "formatBody");
function faqPairs(body) {
  return String(body || "").replace(/\r/g, "").split(/\n{2,}/).map((b) => b.split("\n").filter((l) => l.trim())).filter((ls) => ls.length && /^Q:\s*/i.test(ls[0])).map((ls) => ({ q: ls[0].replace(/^Q:\s*/i, "").trim(), a: ls.slice(1).join(" ").trim() }));
}
__name(faqPairs, "faqPairs");
__name2(faqPairs, "faqPairs");
function productCardHtml(p2) {
  const single = p2.variants.length === 1;
  const price = single ? gbp2(p2.from_pence) : `From ${gbp2(p2.from_pence)}`;
  const href = `/products/${encodeURIComponent(p2.id)}`;
  let action;
  if (!p2.available)
    action = `<button class="btn" disabled>Sold out</button>`;
  else if (single)
    action = `<button class="btn btn-primary" data-add="${esc(p2.id)}">Add to Basket</button>`;
  else
    action = `<a class="btn btn-ghost" href="${href}">Choose ${esc((p2.option_name || "option").toLowerCase())}</a>`;
  return `<li><article class="card${p2.available ? "" : " is-out"}">
    <a class="card-media" href="${href}" tabindex="-1" aria-hidden="true"><img src="${esc(p2.image_url || "/assets/ph/blank.svg")}" alt="" loading="lazy" decoding="async" width="400" height="400">${p2.available ? "" : '<span class="badge">Sold out</span>'}</a>
    <h3><a href="${href}">${esc(p2.name)}</a></h3>
    <p class="card-desc">${esc(p2.short_desc)}</p>
    <div class="card-foot"><p class="price">${price}</p>${action}</div>
  </article></li>`;
}
__name(productCardHtml, "productCardHtml");
__name2(productCardHtml, "productCardHtml");
var TINTS = ["var(--lilac)", "var(--yellow)", "var(--peach)", "var(--pink)", "var(--mint)"];
function postCardHtml(p2, i = 0) {
  const href = `/blog/${encodeURIComponent(p2.slug)}`;
  return `<li><article class="post-card">
    <a class="post-media" href="${href}" tabindex="-1" aria-hidden="true" style="background:${TINTS[i % TINTS.length]}">${p2.image_url ? `<img src="${esc(p2.image_url)}" alt="" decoding="async">` : ""}</a>
    <h3><a href="${href}">${esc(p2.title)}</a></h3><p class="card-desc">${esc(p2.excerpt)}</p>
    <a class="post-more" href="${href}">Read more<span class="visually-hidden">: ${esc(p2.title)}</span></a></article></li>`;
}
__name(postCardHtml, "postCardHtml");
__name2(postCardHtml, "postCardHtml");
function orgSchema(s) {
  const lines = String(s.business_address || "").split(/\n/).map((l) => l.trim()).filter(Boolean);
  const postcode = lines.find((l) => /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(l));
  const org = {
    "@type": ["Organization", "OnlineStore"],
    "@id": `${SITE}/#org`,
    name: s.business_name || SITE_NAME,
    url: SITE,
    logo: { "@type": "ImageObject", url: `${SITE}/assets/img/logo-720.webp` },
    image: DEFAULT_OG,
    description: "Handmade wax melts, snap bars, sample boxes and gift sets, poured in small batches in Cheshire and delivered across the UK.",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    currenciesAccepted: "GBP",
    paymentAccepted: "Card, Apple Pay, Google Pay"
  };
  org.sameAs = [GOOGLE.profile];
  org.hasMap = GOOGLE.profile;
  org.geo = { "@type": "GeoCoordinates", latitude: GOOGLE.lat, longitude: GOOGLE.lng };
  if (s.contact_email)
    org.email = s.contact_email;
  if (s.contact_phone)
    org.telephone = s.contact_phone;
  if (lines.length) {
    org.address = { "@type": "PostalAddress", addressCountry: "GB", streetAddress: lines.filter((l) => l !== postcode).slice(0, -1).join(", ") || lines[0], addressLocality: lines.filter((l) => l !== postcode).slice(-1)[0] || "" };
    if (postcode)
      org.address.postalCode = postcode;
  }
  return org;
}
__name(orgSchema, "orgSchema");
__name2(orgSchema, "orgSchema");
var websiteSchema = /* @__PURE__ */ __name2(() => ({ "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: SITE_NAME, publisher: { "@id": `${SITE}/#org` }, inLanguage: "en-GB" }), "websiteSchema");
var breadcrumbs = /* @__PURE__ */ __name2((items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(url) })) }), "breadcrumbs");
function productSchema(p2, s) {
  const url = `${SITE}/products/${encodeURIComponent(p2.id)}`;
  const offers = p2.variants.map((v) => ({
    "@type": "Offer",
    url,
    price: (v.price_pence / 100).toFixed(2),
    priceCurrency: "GBP",
    availability: v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    ...p2.variants.length > 1 ? { name: v.label } : {},
    shippingDetails: { "@type": "OfferShippingDetails", shippingDestination: { "@type": "DefinedRegion", addressCountry: "GB" } }
  }));
  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: p2.name,
    url,
    sku: p2.id,
    image: ogImageFor(p2.image_url),
    description: strip(p2.description || p2.short_desc, 500),
    category: CATEGORIES.find((c) => c.id === p2.category)?.name || p2.category,
    brand: { "@type": "Brand", name: s.business_name || SITE_NAME },
    offers: offers.length === 1 ? offers[0] : { "@type": "AggregateOffer", url, priceCurrency: "GBP", lowPrice: (p2.from_pence / 100).toFixed(2), highPrice: (Math.max(...p2.variants.map((v) => v.price_pence)) / 100).toFixed(2), offerCount: offers.length, offers }
  };
}
__name(productSchema, "productSchema");
__name2(productSchema, "productSchema");
async function renderPage(ctx, template, opts) {
  const url = new URL(ctx.request.url);
  const res = await ctx.env.ASSETS.fetch(new Request(`${url.origin}/${template}`));
  if (!res.ok)
    return res;
  const canonical = `${SITE}${opts.path || url.pathname}`;
  const title = opts.title ? `${opts.title} | Over The Rainbow` : `${SITE_NAME}`;
  const description = strip(opts.description || "Handmade wax melts in bright, happy scents. Snap bars, melt shapes, sample boxes and gift sets, delivered across the UK.");
  const graph = { "@context": "https://schema.org", "@graph": [...opts.jsonld || []] };
  const head = `<link rel="canonical" href="${esc(canonical)}">
<meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(opts.ogImage || DEFAULT_OG)}"><meta property="og:site_name" content="${SITE_NAME}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(opts.ogImage || DEFAULT_OG)}">
${opts.noindex ? '<meta name="robots" content="noindex">' : ""}${graph["@graph"].length ? ldJson(graph) : ""}`;
  let rw = new HTMLRewriter().on("title", { element(e) {
    e.setInnerContent(title);
  } }).on('meta[name="description"]', { element(e) {
    e.setAttribute("content", description);
  } }).on('meta[property="og:title"]', { element(e) {
    e.setAttribute("content", title);
  } }).on('meta[property="og:description"]', { element(e) {
    e.setAttribute("content", description);
  } }).on('meta[property="og:type"]', { element(e) {
    e.setAttribute("content", opts.type || "website");
  } }).on("head", { element(e) {
    e.append(head, { html: true });
  } });
  const inject = { "#year": String((/* @__PURE__ */ new Date()).getFullYear()), ...opts.inject || {} };
  if (opts.settings) {
    const s = opts.settings, offer = s.announcement || (s.free_delivery_threshold_pence ? `Free UK delivery over ${gbp2(s.free_delivery_threshold_pence).replace(/\.00$/, "")}` : "");
    if (offer)
      inject["#announce"] = `<div class="announce"><span aria-hidden="true">\u2665</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>${esc(offer)}<span aria-hidden="true">\u2665</span></div>`;
    if (s.contact_email)
      inject["#footer-contact"] = `<a href="mailto:${esc(s.contact_email)}">${esc(s.contact_email)}</a>`;
  }
  for (const [sel, html] of Object.entries(inject))
    rw = rw.on(sel, { element(e) {
      e.setInnerContent(html, { html: true });
    } });
  for (const sel of opts.unhide || [])
    rw = rw.on(sel, { element(e) {
      e.removeAttribute("hidden");
    } });
  const out = rw.transform(res);
  const headers = new Headers(out.headers);
  headers.set("cache-control", opts.cache || "public, max-age=60, s-maxage=120");
  headers.set("content-type", "text/html; charset=utf-8");
  return new Response(out.body, { status: opts.status || 200, headers });
}
__name(renderPage, "renderPage");
__name2(renderPage, "renderPage");
async function siteContext(ctx) {
  const db = await getDb(ctx.env);
  const settings = await getSettings(db);
  const render = /* @__PURE__ */ __name2((template, opts) => renderPage(ctx, template, { settings, ...opts }), "render");
  return { db, settings, base: [orgSchema(settings), websiteSchema()], render };
}
__name(siteContext, "siteContext");
__name2(siteContext, "siteContext");
async function onRequestGet17(ctx) {
  const slug = decodeURIComponent(ctx.params.slug || "").slice(0, 120);
  const { db, base, render } = await siteContext(ctx);
  const post3 = await db.prepare(`SELECT slug,title,excerpt,body,image_url,published_at,updated_at FROM posts WHERE slug=? AND published=1`).bind(slug).first();
  if (!post3)
    return render("404.html", { title: "Post not found", noindex: true, status: 404, cache: "no-store" });
  const { results: others } = await db.prepare(`SELECT slug,title,excerpt,image_url FROM posts WHERE published=1 AND slug<>? ORDER BY published_at DESC LIMIT 3`).bind(slug).all();
  const img = post3.image_url && !post3.image_url.endsWith(".svg") ? `${SITE}${post3.image_url}` : void 0;
  const body = `<header class="post-head"><h1>${esc(post3.title)}</h1>${post3.excerpt ? `<p class="post-lede">${esc(post3.excerpt)}</p>` : ""}</header>
    ${post3.image_url ? `<div class="post-hero"><img src="${esc(post3.image_url)}" alt="" width="640" height="480"></div>` : ""}
    <div class="prose">${formatBody(post3.body)}</div>
    <p style="margin-top:2rem"><a class="btn btn-primary" href="/shop">Shop Wax Melts</a></p>`;
  const article = {
    "@type": "BlogPosting",
    headline: post3.title,
    description: post3.excerpt,
    url: `${SITE}/blog/${post3.slug}`,
    datePublished: post3.published_at,
    dateModified: post3.updated_at || post3.published_at,
    author: { "@id": `${SITE}/#org` },
    publisher: { "@id": `${SITE}/#org` },
    mainEntityOfPage: `${SITE}/blog/${post3.slug}`,
    inLanguage: "en-GB",
    ...img ? { image: img } : {}
  };
  return render("blog-post.html", {
    title: post3.title,
    description: post3.excerpt || post3.title,
    path: `/blog/${encodeURIComponent(post3.slug)}`,
    type: "article",
    ogImage: img,
    jsonld: [...base, article, breadcrumbs([["Home", "/"], ["Blog", "/blog"], [post3.title, `/blog/${post3.slug}`]])],
    inject: { "#post-root": body, "#more-posts": others.map((p2, i) => postCardHtml(p2, i + 1)).join("") },
    unhide: others.length ? ["#more-section"] : []
  });
}
__name(onRequestGet17, "onRequestGet17");
__name2(onRequestGet17, "onRequestGet");
async function onRequestGet18({ env, params }) {
  try {
    const db = await getDb(env);
    const row = await db.prepare(`SELECT mime,data FROM images WHERE id=?`).bind(String(params.id).replace(/\.\w+$/, "")).first();
    if (!row)
      return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(row.data), {
      headers: { "content-type": row.mime, "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" }
    });
  } catch {
    return new Response("Unavailable", { status: 503 });
  }
}
__name(onRequestGet18, "onRequestGet18");
__name2(onRequestGet18, "onRequestGet");
var info = /* @__PURE__ */ __name2((title, text, open) => text ? `<details class="info"${open ? " open" : ""}><summary>${title}</summary><div>${esc(text)}</div></details>` : "", "info");
async function onRequestGet19(ctx) {
  const id = decodeURIComponent(ctx.params.slug || "").slice(0, 120);
  const { db, settings, base, render } = await siteContext(ctx);
  const [p2] = await loadProducts(db, { id });
  if (!p2)
    return render("404.html", { title: "Product not found", noindex: true, status: 404, cache: "no-store" });
  const cat = CATEGORIES.find((c) => c.id === p2.category);
  const all = await loadProducts(db);
  const related = all.filter((x) => x.id !== p2.id && x.category === p2.category).slice(0, 4);
  const price = p2.variants.length === 1 ? gbp2(p2.from_pence) : `From ${gbp2(p2.from_pence)}`;
  const body = `<div class="product">
    <div class="product-media"><img src="${esc(p2.image_url || "/assets/ph/blank.svg")}" alt="${esc(p2.name)}" width="800" height="800" fetchpriority="high"></div>
    <div><h1>${esc(p2.name)}</h1><p class="price">${price}</p><p>${esc(p2.short_desc)}</p>
      ${p2.variants.length > 1 ? `<p class="small muted">${esc(p2.option_name || "Options")}: ${p2.variants.map((v) => `${esc(v.label)} ${gbp2(v.price_pence)}${v.available ? "" : " (sold out)"}`).join(", ")}</p>` : ""}
      <p class="small muted">${p2.available ? esc(settings.dispatch_estimate || "") : "Sold out"}</p>
      <div style="margin-top:1.5rem">${info("About this scent", p2.description, true)}${info("Weight and size", p2.weight)}${info("How to use", p2.usage)}${info("Safety information", p2.safety)}${info("Handmade, so not perfect", settings.handmade_note)}${info("About our fragrance names", settings.fragrance_note)}</div>
    </div></div>`;
  return render("product.html", {
    title: p2.name,
    description: p2.short_desc || p2.description,
    path: `/products/${encodeURIComponent(p2.id)}`,
    type: "product",
    ogImage: p2.image_url && !p2.image_url.endsWith(".svg") ? `https://www.overtherainbowwaxmelts.co.uk${p2.image_url}` : void 0,
    jsonld: [...base, productSchema(p2, settings), breadcrumbs([["Home", "/"], ["Shop", "/shop"], ...cat ? [[cat.name, `/shop?category=${cat.id}`]] : [], [p2.name, `/products/${p2.id}`]])],
    inject: { "#crumb-cat": cat ? `<a href="/shop?category=${cat.id}">${esc(cat.name)}</a>` : "", "#product-root": body, "#related": related.map(productCardHtml).join("") },
    unhide: related.length ? ["#related-section"] : []
  });
}
__name(onRequestGet19, "onRequestGet19");
__name2(onRequestGet19, "onRequestGet");
async function onRequestGet20(ctx) {
  const { db, base, render } = await siteContext(ctx);
  const { results: posts } = await db.prepare(`SELECT slug,title,excerpt,image_url FROM posts WHERE published=1 ORDER BY published_at DESC`).all();
  const list = { "@type": "ItemList", itemListElement: posts.map((p2, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/blog/${p2.slug}`, name: p2.title })) };
  return render("blog.html", {
    title: "Blog: wax melt tips and guides",
    description: "How to use wax melts, choosing scents for every room, gift ideas and what is new at Over The Rainbow.",
    path: "/blog",
    jsonld: [...base, breadcrumbs([["Home", "/"], ["Blog", "/blog"]]), list],
    inject: { "#blog-root": posts.length ? `<ul class="post-grid">${posts.map((p2, i) => postCardHtml(p2, i)).join("")}</ul>` : `<div class="empty"><p>No posts yet. Check back soon.</p></div>` }
  });
}
__name(onRequestGet20, "onRequestGet20");
__name2(onRequestGet20, "onRequestGet");
var onRequestGet21 = /* @__PURE__ */ __name2(({ request }) => {
  const slug = new URL(request.url).searchParams.get("slug") || "";
  return new Response(null, { status: 301, headers: { location: slug ? `/blog/${encodeURIComponent(slug)}` : "/blog" } });
}, "onRequestGet");
var SLUG = "contact";
async function onRequestGet22(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug=?`).bind(SLUG).first();
  if (!page)
    return ctx.env.ASSETS.fetch(ctx.request);
  let extra = "";
  if (SLUG === "contact") {
    const rows = [];
    if (settings.contact_email)
      rows.push(`<p><strong>Email</strong><br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>`);
    if (settings.contact_phone)
      rows.push(`<p><strong>Phone</strong><br><a href="tel:${esc(settings.contact_phone.replace(/\s/g, ""))}">${esc(settings.contact_phone)}</a></p>`);
    if (settings.business_address)
      rows.push(`<p><strong>Address</strong><br>${esc(settings.business_address).replace(/\n/g, "<br>")}</p>`);
    extra = "";
  }
  const TOPICS2 = ["An order", "A product or scent", "Delivery", "Wholesale or bulk", "Something else"];
  const form = `<section class="contact-grid">
    <div class="contact-form-box">
      <h2>Send us a message</h2>
      <p class="small muted">Every message is read and answered by Michelle herself, usually within one working day.</p>
      <form id="contact-form" method="post" action="/api/contact" novalidate>
        <div class="row-2">
          <div class="field"><label for="c-name">Your name</label><input type="text" id="c-name" name="name" autocomplete="name" required></div>
          <div class="field"><label for="c-email">Email address</label><input type="email" id="c-email" name="email" autocomplete="email" required></div>
        </div>
        <div class="field"><label for="c-topic">What is it about?</label>
          <select id="c-topic" name="topic">${TOPICS2.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div>
        <div class="field"><label for="c-order">Order number <span class="hint">Optional. It starts with OTR- and is on your confirmation email.</span></label>
          <input type="text" id="c-order" name="order" autocomplete="off"></div>
        <div class="field"><label for="c-message">Your message</label><textarea id="c-message" name="message" required></textarea></div>
        <div class="hp" aria-hidden="true"><label for="c-website">Leave this empty</label><input type="text" id="c-website" name="website" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="started" value="">
        <button class="btn btn-primary btn-block" type="submit">Send message</button>
        <p class="small muted" style="margin:.75rem 0 0">We only use your details to reply to you. Nothing else. See our <a href="/privacy">privacy policy</a>.</p>
      </form>
    </div>
    <aside class="contact-side">
      <h2>Quicker answers</h2>
      <p class="small muted">Most questions are already answered here, and you will not have to wait for a reply.</p>
      <ul class="contact-links">
        <li><a href="/delivery-returns"><strong>Where is my order?</strong><span>Delivery times, postage and tracking</span></a></li>
        <li><a href="/faq"><strong>How do I use a wax melt?</strong><span>Burners, how much to use, how long it lasts</span></a></li>
        <li><a href="/delivery-returns"><strong>I want to return something</strong><span>Returns, damaged parcels and refunds</span></a></li>
        <li><a href="/faq"><strong>Are they safe around pets and children?</strong><span>Safety and CLP labelling</span></a></li>
      </ul>
      ${settings.contact_email ? `<p class="contact-direct">Prefer email? Write to<br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>` : ""}
    </aside>
  </section>`;
  const detail = /* @__PURE__ */ __name2((label, value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`, "detail");
  const details = [
    settings.business_name ? detail("Business name", esc(settings.business_name)) : "",
    settings.contact_email ? detail("Email", `<a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a>`) : "",
    settings.contact_phone ? detail("Phone", `<a href="tel:${esc(settings.contact_phone.replace(/\s/g, ""))}">${esc(settings.contact_phone)}</a>`) : "",
    settings.business_address ? detail("Address", esc(settings.business_address).replace(/\n/g, "<br>")) : ""
  ].filter(Boolean).join("");
  const detailsBox = details ? `<section class="business-details"><h2>Business details</h2>
    <p class="small muted">Who you are buying from, as required of UK online sellers.</p><dl>${details}</dl></section>` : "";
  const gmap = `<section class="gmap">
    <h2>Find us on Google</h2>
    <p>We post and deliver across the UK, so there is no shop to visit, but you can find our Google listing here.</p>
    <div class="gmap-frame" data-embed="${GOOGLE.embed}" data-embed-title="Map showing where Over The Rainbow Wax Melts is based">
      <div class="gmap-ask"><p class="small">The map is provided by Google, which sets its own cookies, so we only load it if you are happy for us to.</p>
      <p><button class="btn btn-ghost btn-sm" type="button" data-consent="yes">Show the map</button></p>
      <p class="small muted" style="margin:0">Or <a href="${GOOGLE.profile}" target="_blank" rel="noopener">open our listing on Google Maps</a>.</p></div>
    </div>
    <p class="gmap-links"><a class="btn btn-ghost" href="${GOOGLE.profile}" target="_blank" rel="noopener">Our Google listing</a>
    <a class="btn btn-ghost" href="${GOOGLE.directions}" target="_blank" rel="noopener">Directions</a>
    <a class="btn btn-primary" href="${GOOGLE.review}" target="_blank" rel="noopener">Leave a review</a></p>
  </section>`;
  return render(`${SLUG}.html`, {
    title: page.title,
    description: page.body,
    path: `/${SLUG}`,
    jsonld: [...base, breadcrumbs([["Home", "/"], [page.title, `/${SLUG}`]])],
    inject: { "#page-root": `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}`, ...SLUG === "contact" ? { "#page-extra": form + detailsBox + gmap } : {} }
  });
}
__name(onRequestGet22, "onRequestGet22");
__name2(onRequestGet22, "onRequestGet");
var SLUG2 = "delivery-returns";
async function onRequestGet23(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug=?`).bind(SLUG2).first();
  if (!page)
    return ctx.env.ASSETS.fetch(ctx.request);
  let extra = "";
  if (SLUG2 === "contact") {
    const rows = [];
    if (settings.contact_email)
      rows.push(`<p><strong>Email</strong><br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>`);
    if (settings.contact_phone)
      rows.push(`<p><strong>Phone</strong><br><a href="tel:${esc(settings.contact_phone.replace(/\\s/g, ""))}">${esc(settings.contact_phone)}</a></p>`);
    if (settings.business_address)
      rows.push(`<p><strong>Address</strong><br>${esc(settings.business_address).replace(/\\n/g, "<br>")}</p>`);
    if (rows.length)
      extra = `<div class="intro" style="margin-top:1.5rem">${rows.join("")}</div>`;
  }
  return render(`${SLUG2}.html`, {
    title: page.title,
    description: page.body,
    path: `/${SLUG2}`,
    jsonld: [...base, breadcrumbs([["Home", "/"], [page.title, `/${SLUG2}`]])],
    inject: { "#page-root": `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}` }
  });
}
__name(onRequestGet23, "onRequestGet23");
__name2(onRequestGet23, "onRequestGet");
async function onRequestGet24(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug='faq'`).first();
  if (!page)
    return ctx.env.ASSETS.fetch(ctx.request);
  const faq = { "@type": "FAQPage", mainEntity: faqPairs(page.body).map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return render("faq.html", {
    title: page.title,
    description: "Answers to common questions about wax melts: how to use them, how long they last, safety, delivery and returns.",
    path: "/faq",
    jsonld: [...base, breadcrumbs([["Home", "/"], ["FAQs", "/faq"]]), faq],
    inject: {
      "#page-root": `<h1>${esc(page.title)}</h1>${formatBody(page.body)}`,
      "#page-extra": `${settings.handmade_note ? `<h2>Handmade, so not perfect</h2><p>${esc(settings.handmade_note)}</p>` : ""}${settings.fragrance_note ? `<h2>About our fragrance names</h2><p>${esc(settings.fragrance_note)}</p>` : ""}`
    }
  });
}
__name(onRequestGet24, "onRequestGet24");
__name2(onRequestGet24, "onRequestGet");
async function onRequestGet25(ctx) {
  const { db, settings } = await siteContext(ctx);
  const [products, posts, faq] = await Promise.all([loadProducts(db), db.prepare(`SELECT slug,title,excerpt FROM posts WHERE published=1 ORDER BY published_at DESC`).all().then((r) => r.results), db.prepare(`SELECT body FROM pages WHERE slug='faq'`).first()]);
  const byCat = /* @__PURE__ */ __name2((id) => products.filter((p2) => p2.category === id), "byCat");
  const lines = [
    `# ${settings.business_name || "Over The Rainbow Wax Melts"}`,
    "",
    `> Handmade wax melts, snap bars, sample boxes and gift sets, poured in small batches in Cheshire, England, and delivered across the UK. Website: ${SITE}`,
    "",
    `Delivery: ${settings.delivery_name || "UK delivery"} ${settings.delivery_pence ? gbp2(settings.delivery_pence) : ""}${settings.free_delivery_threshold_pence ? `, free on orders over ${gbp2(settings.free_delivery_threshold_pence)}` : ""}. ${settings.dispatch_estimate || ""}`.trim(),
    `Contact: ${settings.contact_email || ""}`,
    "",
    "## Products",
    ""
  ];
  for (const c of CATEGORIES) {
    const ps = byCat(c.id);
    if (ps.length) {
      lines.push(`### ${c.name}`);
      for (const p2 of ps)
        lines.push(`- [${p2.name}](${SITE}/products/${encodeURIComponent(p2.id)}): ${p2.short_desc || ""} ${p2.variants.length === 1 ? gbp2(p2.from_pence) : `from ${gbp2(p2.from_pence)}`}${p2.available ? "" : " (sold out)"}`);
      lines.push("");
    }
  }
  if (posts.length) {
    lines.push("## Blog", "");
    for (const p2 of posts)
      lines.push(`- [${p2.title}](${SITE}/blog/${p2.slug}): ${p2.excerpt || ""}`);
    lines.push("");
  }
  if (faq) {
    lines.push("## FAQs", "");
    for (const b of faq.body.replace(/\r/g, "").split(/\n{2,}/)) {
      const ls = b.split("\n").filter((l) => l.trim());
      if (ls.length && /^Q:/i.test(ls[0]))
        lines.push(`- **${ls[0].replace(/^Q:\s*/i, "")}** ${ls.slice(1).join(" ")}`);
    }
    lines.push("");
  }
  lines.push("## Pages", "", `- [FAQs](${SITE}/faq)`, `- [Delivery & returns](${SITE}/delivery-returns)`, `- [Contact](${SITE}/contact)`, `- [Privacy](${SITE}/privacy)`, `- [Terms](${SITE}/terms)`);
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=600" } });
}
__name(onRequestGet25, "onRequestGet25");
__name2(onRequestGet25, "onRequestGet");
var SLUG3 = "privacy";
async function onRequestGet26(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug=?`).bind(SLUG3).first();
  if (!page)
    return ctx.env.ASSETS.fetch(ctx.request);
  let extra = "";
  if (SLUG3 === "contact") {
    const rows = [];
    if (settings.contact_email)
      rows.push(`<p><strong>Email</strong><br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>`);
    if (settings.contact_phone)
      rows.push(`<p><strong>Phone</strong><br><a href="tel:${esc(settings.contact_phone.replace(/\\s/g, ""))}">${esc(settings.contact_phone)}</a></p>`);
    if (settings.business_address)
      rows.push(`<p><strong>Address</strong><br>${esc(settings.business_address).replace(/\\n/g, "<br>")}</p>`);
    if (rows.length)
      extra = `<div class="intro" style="margin-top:1.5rem">${rows.join("")}</div>`;
  }
  if (SLUG3 === "privacy")
    extra += `<section class="cookie-info"><h2>Cookies</h2>
    <p>We keep this simple. The shop stores two things in your browser, and neither of them tracks you:</p>
    <ul>
      <li><strong>Your basket</strong> \u2014 what you have added, so it is still there when you come back. The shop cannot work without it.</li>
      <li><strong>Your cookie choice</strong> \u2014 so we do not ask you again.</li>
    </ul>
    <p>We do not use advertising cookies and we do not track you around the web.</p>
    <p>The one thing that comes from somewhere else is the map on our <a href="/contact">contact page</a>, which is provided by Google and sets cookies of its own. It only loads if you say yes, and you can change your mind at any time using the <strong>Cookie choices</strong> link at the bottom of any page.</p>
    <p>When you pay, you are handed over to Stripe, who handle the card details and set their own cookies to spot fraud. Their privacy notice covers that part.</p></section>`;
  return render(`${SLUG3}.html`, {
    title: page.title,
    description: page.body,
    path: `/${SLUG3}`,
    jsonld: [...base, breadcrumbs([["Home", "/"], [page.title, `/${SLUG3}`]])],
    inject: { "#page-root": `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}` }
  });
}
__name(onRequestGet26, "onRequestGet26");
__name2(onRequestGet26, "onRequestGet");
var onRequestGet27 = /* @__PURE__ */ __name2(({ request }) => {
  const id = new URL(request.url).searchParams.get("id") || "";
  return new Response(null, { status: 301, headers: { location: id ? `/products/${encodeURIComponent(id)}` : "/shop" } });
}, "onRequestGet");
var onRequestGet28 = /* @__PURE__ */ __name2(() => new Response(null, { status: 301, headers: { location: "/shop?category=seasonal" } }), "onRequestGet");
var DESC = {
  all: "Every Over The Rainbow wax melt in one place: snap bars, melt shapes, sample boxes, gift sets and burners, handmade in Cheshire.",
  "snap-bars": "Highly scented wax melt snap bars, handmade in small batches. Snap off a piece, pop it in your burner and enjoy.",
  "wax-melt-shapes": "Hearts, stars, flowers and more: wax melts in colourful shapes, made with premium fragrance oils.",
  "sample-boxes": "Try before you commit. Sample boxes of our most popular wax melt scents, perfect for finding a favourite.",
  "gift-sets": "Wax melt gift sets, boxed and ready to give. Birthdays, thank-yous and treats.",
  accessories: "Wax melt burners, tealights and storage tins to go with your melts.",
  "broken-biscuits": "Perfectly scented, slightly imperfect. Melts that cracked, chipped or broke on the way out of the mould, at a lower price. They melt just the same.",
  seasonal: "Limited-edition seasonal wax melts: Halloween and autumn scents, Christmas and winter scents."
};
async function onRequestGet29(ctx) {
  const url = new URL(ctx.request.url);
  const cat = url.searchParams.get("category") || "all";
  const { db, base, render } = await siteContext(ctx);
  const all = await loadProducts(db);
  const seasonal = /* @__PURE__ */ __name2((p2) => p2.scents.includes("halloween") || p2.scents.includes("christmas"), "seasonal");
  const list = cat === "all" ? all : cat === "seasonal" ? all.filter(seasonal) : all.filter((p2) => p2.category === cat);
  const name = cat === "all" ? "All Products" : cat === "seasonal" ? "Seasonal" : CATEGORIES.find((c) => c.id === cat)?.name || "All Products";
  const chips = [{ id: "all", name: "All Products" }, ...CATEGORIES, { id: "seasonal", name: "Seasonal" }].map((c) => `<li><a class="chip" href="${c.id === "all" ? "/shop" : `/shop?category=${c.id}`}" data-cat="${c.id}" aria-pressed="${c.id === cat}">${esc(c.name)}</a></li>`).join("");
  const grid = list.length ? `<ul class="grid">${list.map(productCardHtml).join("")}</ul>` : `<div class="empty"><p>Nothing here yet. Check back soon.</p></div>`;
  const itemList = { "@type": "ItemList", name, itemListElement: list.slice(0, 50).map((p2, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/products/${encodeURIComponent(p2.id)}`, name: p2.name })) };
  const path = cat === "all" ? "/shop" : `/shop?category=${encodeURIComponent(cat)}`;
  return render("shop.html", {
    title: cat === "all" ? "Shop Wax Melts" : `${name} Wax Melts`,
    description: DESC[cat] || DESC.all,
    path,
    jsonld: [...base, breadcrumbs([["Home", "/"], ["Shop", "/shop"], ...cat === "all" ? [] : [[name, path]]]), itemList],
    inject: { "#shop-title": esc(name), "#cats": chips, "#results": grid, "#result-count": `${list.length} product${list.length === 1 ? "" : "s"}` }
  });
}
__name(onRequestGet29, "onRequestGet29");
__name2(onRequestGet29, "onRequestGet");
async function onRequestGet30(ctx) {
  const { db } = await siteContext(ctx);
  const [products, posts] = await Promise.all([loadProducts(db), db.prepare(`SELECT slug,updated_at,published_at FROM posts WHERE published=1`).all().then((r) => r.results)]);
  const u = /* @__PURE__ */ __name2((loc, extra = "") => `<url><loc>${SITE}${loc}</loc>${extra}</url>`, "u");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
    u("/", "<changefreq>weekly</changefreq><priority>1.0</priority>"),
    u("/shop", "<changefreq>weekly</changefreq><priority>0.9</priority>"),
    ...CATEGORIES.map((c) => u(`/shop?category=${c.id}`, "<changefreq>weekly</changefreq><priority>0.8</priority>")),
    u("/shop?category=seasonal", "<changefreq>weekly</changefreq><priority>0.8</priority>"),
    ...products.map((p2) => u(`/products/${encodeURIComponent(p2.id)}`, "<changefreq>weekly</changefreq><priority>0.7</priority>")),
    u("/blog", "<changefreq>weekly</changefreq>"),
    ...posts.map((p2) => u(`/blog/${encodeURIComponent(p2.slug)}`, `<lastmod>${(p2.updated_at || p2.published_at || "").slice(0, 10)}</lastmod>`)),
    u("/faq"),
    u("/contact"),
    u("/delivery-returns"),
    u("/privacy"),
    u("/terms")
  ].join("\n")}
</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=600" } });
}
__name(onRequestGet30, "onRequestGet30");
__name2(onRequestGet30, "onRequestGet");
var SLUG4 = "terms";
async function onRequestGet31(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const page = await db.prepare(`SELECT title,body FROM pages WHERE slug=?`).bind(SLUG4).first();
  if (!page)
    return ctx.env.ASSETS.fetch(ctx.request);
  let extra = "";
  if (SLUG4 === "contact") {
    const rows = [];
    if (settings.contact_email)
      rows.push(`<p><strong>Email</strong><br><a href="mailto:${esc(settings.contact_email)}">${esc(settings.contact_email)}</a></p>`);
    if (settings.contact_phone)
      rows.push(`<p><strong>Phone</strong><br><a href="tel:${esc(settings.contact_phone.replace(/\\s/g, ""))}">${esc(settings.contact_phone)}</a></p>`);
    if (settings.business_address)
      rows.push(`<p><strong>Address</strong><br>${esc(settings.business_address).replace(/\\n/g, "<br>")}</p>`);
    if (rows.length)
      extra = `<div class="intro" style="margin-top:1.5rem">${rows.join("")}</div>`;
  }
  return render(`${SLUG4}.html`, {
    title: page.title,
    description: page.body,
    path: `/${SLUG4}`,
    jsonld: [...base, breadcrumbs([["Home", "/"], [page.title, `/${SLUG4}`]])],
    inject: { "#page-root": `<h1>${esc(page.title)}</h1>${formatBody(page.body)}${extra}` }
  });
}
__name(onRequestGet31, "onRequestGet31");
__name2(onRequestGet31, "onRequestGet");
async function onRequestGet32(ctx) {
  const { db, settings, base, render } = await siteContext(ctx);
  const [all, posts, faq] = await Promise.all([
    loadProducts(db),
    db.prepare(`SELECT slug,title,excerpt,image_url FROM posts WHERE published=1 ORDER BY published_at DESC LIMIT 3`).all().then((r) => r.results),
    db.prepare(`SELECT body FROM pages WHERE slug='faq'`).first()
  ]);
  let featured = all.filter((p2) => p2.featured && p2.available);
  featured = [...featured, ...all.filter((p2) => p2.available && !featured.includes(p2))].slice(0, 8);
  const qs = faq ? faq.body.replace(/\r/g, "").split(/\n{2,}/).filter((b) => /^Q:\s*/i.test(b.trim())).slice(0, 5).join("\n\n") : "";
  const headline = (settings.hero_headline || "A little melt. | A lot of happiness.").split(/\s*\|\s*|\n/).map(esc).join("<br>");
  const inject = {
    "#hero-headline": headline,
    "#hero-sub": esc(settings.hero_sub || ""),
    "#hero-note span": settings.free_delivery_threshold_pence ? `UK delivery, free over ${gbp2(settings.free_delivery_threshold_pence).replace(/\.00$/, "")}` : "UK delivery",
    "#featured": featured.length ? `<ul class="grid">${featured.map(productCardHtml).join("")}</ul>` : `<div class="empty"><p>Products are on their way. Check back soon.</p></div>`,
    "#intro-title": esc(settings.intro_title || ""),
    "#intro-text": esc(settings.intro_text || ""),
    "#home-posts": posts.map((p2, i) => postCardHtml(p2, i)).join(""),
    "#home-faq-list": formatBody(qs)
  };
  const unhide = [...posts.length ? ["#home-blog"] : [], ...qs ? ["#home-faq"] : []];
  return render("index.html", {
    title: "Handmade Wax Melts, Snap Bars & Gift Sets, UK",
    description: "Handmade wax melts in bright, happy scents. Snap bars, melt shapes, sample boxes and gift sets, poured in small batches in Cheshire and delivered across the UK.",
    path: "/",
    jsonld: base,
    inject,
    unhide
  });
}
__name(onRequestGet32, "onRequestGet32");
__name2(onRequestGet32, "onRequestGet");
var routes = [
  {
    routePath: "/api/admin/orders/:id",
    mountPath: "/api/admin/orders",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete]
  },
  {
    routePath: "/api/admin/orders/:id",
    mountPath: "/api/admin/orders",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/admin/orders/:id",
    mountPath: "/api/admin/orders",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut]
  },
  {
    routePath: "/api/admin/pages/:slug",
    mountPath: "/api/admin/pages",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut2]
  },
  {
    routePath: "/api/admin/posts/:slug",
    mountPath: "/api/admin/posts",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete2]
  },
  {
    routePath: "/api/admin/posts/:slug",
    mountPath: "/api/admin/posts",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut3]
  },
  {
    routePath: "/api/admin/products/:id",
    mountPath: "/api/admin/products",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete3]
  },
  {
    routePath: "/api/admin/products/:id",
    mountPath: "/api/admin/products",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut4]
  },
  {
    routePath: "/api/admin/clp",
    mountPath: "/api/admin",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete4]
  },
  {
    routePath: "/api/admin/clp",
    mountPath: "/api/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/admin/clp",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/admin/clp",
    mountPath: "/api/admin",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut5]
  },
  {
    routePath: "/api/admin/images",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/admin/me",
    mountPath: "/api/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/admin/orders",
    mountPath: "/api/admin/orders",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  },
  {
    routePath: "/api/admin/pages",
    mountPath: "/api/admin/pages",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet5]
  },
  {
    routePath: "/api/admin/posts",
    mountPath: "/api/admin/posts",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet6]
  },
  {
    routePath: "/api/admin/posts",
    mountPath: "/api/admin/posts",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/admin/products",
    mountPath: "/api/admin/products",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet7]
  },
  {
    routePath: "/api/admin/products",
    mountPath: "/api/admin/products",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/admin/sample",
    mountPath: "/api/admin",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete5]
  },
  {
    routePath: "/api/admin/settings",
    mountPath: "/api/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet8]
  },
  {
    routePath: "/api/admin/settings",
    mountPath: "/api/admin",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut6]
  },
  {
    routePath: "/api/page/:slug",
    mountPath: "/api/page",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet9]
  },
  {
    routePath: "/api/posts/:slug",
    mountPath: "/api/posts",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet10]
  },
  {
    routePath: "/api/products/:id",
    mountPath: "/api/products",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet11]
  },
  {
    routePath: "/api/checkout",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost5]
  },
  {
    routePath: "/api/config",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet12]
  },
  {
    routePath: "/api/contact",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet13]
  },
  {
    routePath: "/api/contact",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost6]
  },
  {
    routePath: "/api/order-status",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet14]
  },
  {
    routePath: "/api/posts",
    mountPath: "/api/posts",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet15]
  },
  {
    routePath: "/api/products",
    mountPath: "/api/products",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet16]
  },
  {
    routePath: "/api/quote",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost7]
  },
  {
    routePath: "/api/stripe-webhook",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost8]
  },
  {
    routePath: "/api/admin",
    mountPath: "/api/admin",
    method: "",
    middlewares: [onRequest],
    modules: []
  },
  {
    routePath: "/blog/:slug",
    mountPath: "/blog",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet17]
  },
  {
    routePath: "/img/:id",
    mountPath: "/img",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet18]
  },
  {
    routePath: "/products/:slug",
    mountPath: "/products",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet19]
  },
  {
    routePath: "/blog",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet20]
  },
  {
    routePath: "/blog-post",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet21]
  },
  {
    routePath: "/contact",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet22]
  },
  {
    routePath: "/delivery-returns",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet23]
  },
  {
    routePath: "/faq",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet24]
  },
  {
    routePath: "/llms.txt",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet25]
  },
  {
    routePath: "/privacy",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet26]
  },
  {
    routePath: "/product",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet27]
  },
  {
    routePath: "/seasonal",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet28]
  },
  {
    routePath: "/shop",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet29]
  },
  {
    routePath: "/sitemap.xml",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet30]
  },
  {
    routePath: "/terms",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet31]
  },
  {
    routePath: "/",
    mountPath: "/",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet32]
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init2) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init2);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = /* @__PURE__ */ __name(class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
}, "__Facade_ScheduledController__");
__name2(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../.npm/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../.npm/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-fBRSuf/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../.npm/_npx/0eedb5afd4158ff3/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-fBRSuf/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__2, "__Facade_ScheduledController__");
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.7636462746097366.js.map
