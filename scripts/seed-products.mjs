// Seed local productsData into Supabase `products` table.
// Usage: npm run seed
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const loadEnv = () => {
  try {
    const envPath = path.join(root, '.env');
    const raw = fs.readFileSync(envPath, 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([^#=]+?)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1].trim()] = m[2].trim();
    }
  } catch { /* ignore */ }
};
loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const anon = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anon) {
  console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const { createClient } = await import('@supabase/supabase-js');
const { productsData } = await import('../src/data/products.js');

const supabase = createClient(url, anon);

const toDb = (p) => ({
  id: p.id,
  name_en: p.nameEn,
  name_ar: p.nameAr,
  category: p.category,
  category_label_en: p.categoryLabelEn || null,
  category_label_ar: p.categoryLabelAr || null,
  price: p.price,
  original_price: p.originalPrice ?? null,
  image: p.image,
  images: p.images || [p.image],
  colors: p.colors || null,
  badge: p.badge || null,
  badge_ar: p.badgeAr || null,
  in_stock: p.inStock !== false,
  ref_code: p.refCode || null,
  description_en: p.descriptionEn || null,
  description_ar: p.descriptionAr || null,
});

const rows = productsData.map(toDb);
console.log(`Seeding ${rows.length} products...`);

const { data, error } = await supabase.from('products').upsert(rows, { onConflict: 'id' }).select('id');
if (error) {
  console.error('Seed failed:', error.message);
  process.exit(1);
}
console.log(`Done. Upserted: ${(data || []).map(r => r.id).join(', ')}`);
