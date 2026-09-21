// Database access (Cloudflare D1 / SQLite). The schema is created automatically
// on first request, and sample content is seeded if the database is empty.
import { SAMPLE_PRODUCTS, DEFAULT_SETTINGS, DEFAULT_PAGES } from './seed.js';
import { FAQ_PAGE, BLOG_POSTS, ABOUT_COPY, POLICY_PAGES } from './content.js';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS products (
     id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL,
     scents TEXT NOT NULL DEFAULT '', short_desc TEXT NOT NULL DEFAULT '',
     description TEXT NOT NULL DEFAULT '', weight TEXT NOT NULL DEFAULT '',
     usage TEXT NOT NULL DEFAULT '', safety TEXT NOT NULL DEFAULT '',
     image_url TEXT NOT NULL DEFAULT '', option_name TEXT NOT NULL DEFAULT '',
     hidden INTEGER NOT NULL DEFAULT 0, sold_out INTEGER NOT NULL DEFAULT 0,
     featured INTEGER NOT NULL DEFAULT 0, is_sample INTEGER NOT NULL DEFAULT 0,
     sort INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS variants (
     id TEXT PRIMARY KEY, product_id TEXT NOT NULL, label TEXT NOT NULL,
     price_pence INTEGER NOT NULL, stock INTEGER NOT NULL DEFAULT 0,
     sort INTEGER NOT NULL DEFAULT 0)`,
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
     admin_note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, paid_at TEXT)`,
  `CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at)`,
  `CREATE TABLE IF NOT EXISTS stripe_events (id TEXT PRIMARY KEY, type TEXT NOT NULL, received_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS pages (
     slug TEXT PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL,
     needs_review INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS posts (
     slug TEXT PRIMARY KEY, title TEXT NOT NULL, excerpt TEXT NOT NULL DEFAULT '',
     body TEXT NOT NULL DEFAULT '', image_url TEXT NOT NULL DEFAULT '',
     published INTEGER NOT NULL DEFAULT 1, published_at TEXT NOT NULL, updated_at TEXT NOT NULL)`,
];

let ready = null; // memoised per worker isolate

export function getDb(env) {
  if (!env.DB) {
    const e = new Error('Database binding "DB" is missing. Add a D1 binding named DB (see README).');
    e.status = 503;
    throw e;
  }
  if (!ready) ready = init(env.DB).catch((err) => { ready = null; throw err; });
  return ready.then(() => env.DB);
}

async function init(db) {
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  const seeded = await db.prepare(`SELECT value FROM settings WHERE key='seeded'`).first();
  if (!seeded) await seed(db);
  await migrateContent(db);
}

// One-off content additions for databases created before a feature existed.
// INSERT OR IGNORE means nothing you have edited is ever overwritten.
async function migrateContent(db) {
  const row = await db.prepare(`SELECT value FROM settings WHERE key='content_version'`).first();
  const have = Number(row?.value || 0);
  if (have >= 3) return;
  const now = new Date();
  const stmts = [];
  if (have < 2) { // FAQ page and starter blog posts
    stmts.push(db.prepare(`INSERT OR IGNORE INTO pages(slug,title,body,needs_review,updated_at) VALUES(?,?,?,0,?)`)
      .bind(FAQ_PAGE.slug, FAQ_PAGE.title, FAQ_PAGE.body, now.toISOString()));
    BLOG_POSTS.forEach((p, i) => {
      const when = new Date(now.getTime() - i * 60000).toISOString(); // keeps the intended order, newest first
      stmts.push(db.prepare(`INSERT OR IGNORE INTO posts(slug,title,excerpt,body,image_url,published,published_at,updated_at) VALUES(?,?,?,?,?,1,?,?)`)
        .bind(p.slug, p.title, p.excerpt, p.body, p.image_url, when, when));
    });
  }
  if (have < 3) { // about wording + policy pages, only where the placeholder is untouched (instr, not LIKE: D1 caps LIKE pattern length)
    stmts.push(db.prepare(`UPDATE settings SET value=? WHERE key='intro_text' AND substr(value,1,16)='PLACEHOLDER COPY'`).bind(ABOUT_COPY.intro_text));
    stmts.push(db.prepare(`UPDATE settings SET value=? WHERE key='intro_title' AND value='Hello from Over The Rainbow'`).bind(ABOUT_COPY.intro_title));
    for (const pg of POLICY_PAGES)
      stmts.push(db.prepare(`UPDATE pages SET body=?, updated_at=? WHERE slug=? AND instr(body, ?) > 0`).bind(pg.body, now.toISOString(), pg.slug, pg.stillPlaceholder));
  }
  stmts.push(db.prepare(`INSERT INTO settings(key,value) VALUES('content_version','3') ON CONFLICT(key) DO UPDATE SET value='3'`));
  await db.batch(stmts);
}

async function seed(db) {
  const now = new Date().toISOString();
  const stmts = [];
  for (const [k, v] of Object.entries(DEFAULT_SETTINGS))
    stmts.push(db.prepare(`INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)`).bind(k, v));
  for (const pg of DEFAULT_PAGES)
    stmts.push(db.prepare(`INSERT OR IGNORE INTO pages(slug,title,body,needs_review,updated_at) VALUES(?,?,?,1,?)`)
      .bind(pg.slug, pg.title, pg.body, now));
  SAMPLE_PRODUCTS.forEach((p, i) => {
    stmts.push(db.prepare(
      `INSERT OR IGNORE INTO products(id,name,category,scents,short_desc,description,weight,usage,safety,image_url,option_name,hidden,sold_out,featured,is_sample,sort,created_at)
       VALUES(?,?,?,?,?,?,?,?,?,?,?,0,?,?,1,?,?)`)
      .bind(p.id, p.name, p.category, p.scents.join(','), p.short_desc, p.description, p.weight, p.usage, p.safety,
        p.image_url, p.option_name, p.sold_out, p.featured, i, now));
    p.variants.forEach(([label, price, stock], j) =>
      stmts.push(db.prepare(`INSERT OR IGNORE INTO variants(id,product_id,label,price_pence,stock,sort) VALUES(?,?,?,?,?,?)`)
        .bind(`${p.id}--${j + 1}`, p.id, label, price, stock, j)));
  });
  stmts.push(db.prepare(`INSERT OR IGNORE INTO settings(key,value) VALUES('seeded',?)`).bind(now));
  await db.batch(stmts);
}

export async function getSettings(db) {
  const { results } = await db.prepare(`SELECT key,value FROM settings`).all();
  const s = { ...DEFAULT_SETTINGS };
  for (const r of results) s[r.key] = r.value;
  return s;
}

export const CATEGORIES = [
  { id: 'snap-bars', name: 'Snap Bars' },
  { id: 'wax-melt-shapes', name: 'Wax Melt Shapes' },
  { id: 'sample-boxes', name: 'Sample Boxes' },
  { id: 'gift-sets', name: 'Gift Sets' },
  { id: 'accessories', name: 'Accessories' },
];
export const SCENTS = ['fresh', 'floral', 'fruity', 'sweet', 'seasonal'];

// Load products with their variants. includeHidden is for admin only.
export async function loadProducts(db, { includeHidden = false, id = null } = {}) {
  let sql = `SELECT * FROM products`;
  const where = [], args = [];
  if (!includeHidden) where.push(`hidden=0`);
  if (id) { where.push(`id=?`); args.push(id); }
  if (where.length) sql += ` WHERE ` + where.join(' AND ');
  sql += ` ORDER BY sort, name`;
  const [prods, vars] = await db.batch([
    db.prepare(sql).bind(...args),
    id ? db.prepare(`SELECT * FROM variants WHERE product_id=? ORDER BY sort`).bind(id)
       : db.prepare(`SELECT * FROM variants ORDER BY sort`),
  ]);
  const byProduct = {};
  for (const v of vars.results) (byProduct[v.product_id] ||= []).push(v);
  return prods.results.map((p) => shapeProduct(p, byProduct[p.id] || [], includeHidden));
}

function shapeProduct(p, variants, admin) {
  const vs = variants.map((v) => ({
    id: v.id, label: v.label, price_pence: v.price_pence,
    available: !p.sold_out && v.stock > 0,
    ...(admin ? { stock: v.stock } : { low_stock: v.stock > 0 && v.stock <= 3 }),
  }));
  const out = {
    id: p.id, name: p.name, category: p.category,
    scents: p.scents ? p.scents.split(',').filter(Boolean) : [],
    short_desc: p.short_desc, description: p.description, weight: p.weight,
    usage: p.usage, safety: p.safety, image_url: p.image_url, option_name: p.option_name,
    featured: !!p.featured, sold_out: !!p.sold_out,
    available: vs.some((v) => v.available),
    from_pence: vs.length ? Math.min(...vs.map((v) => v.price_pence)) : 0,
    variants: vs,
  };
  if (admin) Object.assign(out, { hidden: !!p.hidden, is_sample: !!p.is_sample, sort: p.sort });
  return out;
}
