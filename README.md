<div align="center">

<img src="/images/logo.png" alt="CELINE JEWELRY" width="120" />

# ✦ CELINE JEWELRY ✦

**A Luxury Egyptian Jewelry E-Commerce Experience**

*Bridging Cairo's ancient metalwork heritage with contemporary Florentine precision*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**CELINE JEWELRY** is a premium, bilingual (Arabic 🇪🇬 / English 🇬🇧) jewelry e-commerce website built for the Egyptian market. The platform delivers a full luxury shopping experience — from curated product browsing to a WhatsApp-based checkout concierge — designed to feel as refined as the jewelry it sells.

The site combines modern web aesthetics with deep RTL/LTR language support, smooth scroll animations, a persistent cart system, color variant selection, image carousels, and a direct WhatsApp order flow — making it ideal for boutique jewelry brands operating in Egypt and the MENA region.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **Bilingual (AR / EN)** | Full RTL Arabic & LTR English support with instant language switching |
| 🛒 **Persistent Cart** | Cart state preserved across views with live quantity management |
| 💬 **WhatsApp Checkout** | Orders sent directly to the atelier via a formatted WhatsApp message |
| 🔍 **Catalog Search & Filter** | Real-time search + category filtering across all collections |
| 🖼️ **Image Carousel** | Multi-image carousel in product detail modals with swipe & keyboard support |
| 🎨 **Color Variant Swatches** | Circular color picker for products with multiple color options |
| 🧾 **Color in Order Summary** | Selected color variant shown in cart drawer & WhatsApp message |
| ✨ **Smooth Animations** | Lenis smooth scroll + CSS micro-animations throughout |
| 🎉 **Confetti on Order** | Canvas-confetti celebration on successful order submission |
| 🗄️ **Supabase Products** | Catalog reads live from Supabase `products` with local fallback |
| 🛠️ **Admin Dashboard (`/admin`)** | Password-gated dashboard: products CRUD + image upload + orders tracking with counters |
| 📦 **Order Tracking** | Every WhatsApp order is saved to Supabase `orders` with customer details + status flow |
| 🖼️ **Storage Uploads** | Product images upload to Supabase Storage bucket `product-images` with preview / main / remove |
| 📦 **Stock Status (AR/EN)** | `In stock` toggle in admin reflects as `SOLD OUT / نفذت الكمية` across cards & modals |
| 📱 **Fully Responsive** | Mobile-first design optimized for all screen sizes |
| 🌙 **Luxury Dark Aesthetic** | Premium dark gold palette with glassmorphism UI elements |
| 🚚 **Free Courier Banner** | Value proposition banners with delivery & payment info |

---

## 🛠️ Tech Stack

```
Frontend Framework  →  React 19
Build Tool          →  Vite 8
Styling             →  Tailwind CSS v4
Icons               →  Lucide React
Smooth Scroll       →  Lenis
Confetti            →  Canvas Confetti
Backend / DB        →  Supabase (Postgres + Storage)
Language            →  JavaScript (ESM)
Hosting             →  Vercel
```

---

## 📁 Project Structure

```
Celine Jewelry website/
│
├── public/                      # Static assets (logo, favicon, images)
│   └── images/                  # Product images & color variant crops
│
├── src/
│   ├── components/              # UI Components
│   │   ├── Header.jsx           # Navbar with cart icon, language switcher & logo
│   │   ├── Hero.jsx             # Full-screen hero section with CTA
│   │   ├── CategoryBar.jsx      # Horizontal scrollable category filter bar
│   │   ├── ProductCard.jsx      # Individual product card (shows SOLD OUT when out of stock)
│   │   ├── ProductModal.jsx     # Product detail modal with carousel & color swatches
│   │   ├── CatalogView.jsx      # Filterable & searchable product grid (live from Supabase)
│   │   ├── CartDrawer.jsx       # Slide-in shopping cart drawer with color info
│   │   ├── WhatsAppCheckoutView.jsx  # Checkout form → saves order to Supabase → WhatsApp order
│   │   ├── AdminDashboard.jsx   # Password-gated `/admin`: products CRUD + uploads + orders + counters
│   │   ├── CraftsmanshipSection.jsx  # Brand story / artisan section
│   │   ├── ValueBanners.jsx     # Value proposition banners
│   │   ├── AboutUsView.jsx      # About the atelier page
│   │   └── Footer.jsx           # Site footer with links & social
│   │
│   ├── context/
│   │   ├── CartContext.jsx      # Global cart state (blocks out-of-stock, add, remove, quantity, color, total)
│   │   ├── LanguageContext.jsx  # Global language state (AR / EN toggle)
│   │   └── ProductsContext.jsx  # Live products from Supabase (fallback to local data)
│   │
│   ├── utils/
│   │   ├── supabase.js          # Supabase client (`VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`)
│   │   ├── orders.js            # `createOrderInSupabase` / fetch / status update / delete
│   │   ├── storage.js           # Product image upload + delete (bucket `product-images`)
│   │   └── analytics.js         # `trackEvent` (Google gtag forwarder)
│   │
│   ├── data/
│   │   └── products.js          # Local fallback catalog + seed source (name, price, category, images, colors)
│   │
│   ├── locales/
│   │   └── translations.js      # All UI strings in Arabic & English (incl. `inStock` / `soldOut`)
│   │
│   ├── App.jsx                  # Root component & view router (incl. `/admin` deep-link)
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles & Tailwind directives
│
├── supabase/
│   ├── schema.sql               # Tables `products` + `orders` with RLS policies
│   └── storage.sql              # Public bucket `product-images` + storage policies
│
├── scripts/
│   └── seed-products.mjs        # Upserts local `productsData` into Supabase (`npm run seed`)
│
├── index.html                   # HTML shell
├── vite.config.js               # Vite + React + Tailwind config
├── vercel.json                  # Rewrite `/admin` → `/index.html` for SPA routing
├── package.json                 # Dependencies & scripts
├── .env.example                 # Required env vars template (never commit real `.env`)
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x` → [Download](https://nodejs.org/)
- **npm** `>= 9.x` (comes with Node.js)
- **Git** → [Download](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ELLEBOUDY/Celine-Jewelry-website.git

# 2. Navigate into the project folder
cd "Celine Jewelry website"

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **https://celine-jewelry-website.vercel.app/** (live production)

### Supabase Setup (required for live products / orders / uploads)

```bash
# 1. Create a Supabase project, then run in its SQL Editor:
supabase/schema.sql     # creates tables `products` + `orders` with RLS
supabase/storage.sql    # creates public bucket `product-images` + policies

# 2. Copy env template and fill real values (never commit `.env`)
cp .env.example .env
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key
# VITE_ADMIN_PASSWORD=your-admin-password

# 3. Seed the 10 current products into Supabase
npm run seed
```

> `.env` is git-ignored. The `anon` key is public by design (frontend bundle) and protected by RLS — never expose the `service_role` key in `VITE_*` vars.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with HMR |
| `npm run build` | Build optimized production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run seed` | Upsert local `productsData` into Supabase `products` |

---

## 🌐 Language Support

The site supports full **bilingual** operation:

- **English (EN)** — Default, LTR layout
- **Arabic (AR)** — Full RTL layout, Egyptian dialect copy

All strings are centralized in `src/locales/translations.js`. To add or edit any UI text, update that file only — no need to touch individual components.

---

## 🖼️ Product Image Carousel

Each product modal supports a **multi-image carousel** with:

- **Arrow navigation** (prev / next buttons)
- **Dot indicators** to jump to any image
- **Thumbnail strip** at the bottom for quick access
- **Swipe gestures** on mobile (touch support)
- **Keyboard navigation** — `←` / `→` arrow keys

All images for a product are defined in the `images` array inside `src/data/products.js`.

---

## 🎨 Color Variant Swatches

Products that come in multiple colors (e.g. the *Celestial Swan Pendant*) display circular color swatch pickers directly in the product modal:

- Each swatch shows the color via its hex code
- A ✓ checkmark appears on the currently selected color
- Selecting a color updates the carousel to that variant's image
- The selected color name (AR / EN) is shown as a badge above the swatches
- The chosen color is saved in cart state and appears in:
  - 🛒 The **Cart Drawer** (color swatch + name next to the item)
  - 📲 The **WhatsApp order message** sent to the atelier

### Adding Color Variants to a Product

In `src/data/products.js`, add a `colors` array to any product:

```js
colors: [
  { id: 'white',  nameEn: 'Crystal White',  nameAr: 'أبيض كريستال',   hex: '#FFFFFF' },
  { id: 'purple', nameEn: 'Amethyst Purple', nameAr: 'بنفسجي أميثست', hex: '#8C62A8' },
  { id: 'pink',   nameEn: 'Rose Pink',       nameAr: 'وردي روز',       hex: '#DE8DA0' },
  { id: 'black',  nameEn: 'Midnight Black',  nameAr: 'أسود ملكي',      hex: '#1A1A1A' },
]
```

Each color entry requires only `id`, `nameEn`, `nameAr`, and `hex`. The color swatch is rendered purely from the hex value — no separate image needed per color.

---

## 💬 WhatsApp Checkout Flow

CELINE JEWELRY uses a **WhatsApp-first checkout** model:

1. Customer browses catalog & selects a product (+ color if applicable)
2. Adds item to cart — color variant is preserved per item
3. Proceeds to checkout form (name, phone, governorate, address)
4. Selects payment method (Cash on Delivery / Instapay)
5. Clicks **"Send Order via WhatsApp Concierge"**
6. A pre-formatted Arabic order message (including chosen color) is sent to the atelier's WhatsApp

This removes friction for Egyptian customers who prefer WhatsApp-based shopping.

> Every successful order is also saved to Supabase (`orders`) **before** WhatsApp opens, so it instantly appears in `/admin` → Orders with full details.

---

## 🛠️ Admin Dashboard (`/admin`)

Password-gated with `VITE_ADMIN_PASSWORD` (default `celine123` locally — change in `.env`):

| Tab | What it does |
|---|---|
| **Products (count)** | Live grid from Supabase, search, Edit / Delete, stock badge |
| **Orders (count)** | Newest-first orders, status flow `new → confirmed → shipped → delivered / cancelled`, expandable customer + items details, filter by status |
| **Add / Edit product** | ID slug, ref code, names AR/EN, category, price, image upload with preview + Main + remove, badges, descriptions, in-stock toggle |

Direct access only via `/admin` (no public footer link). `vercel.json` rewrites `/admin` to the SPA so refresh/share works.

---

## 🚀 Deployment (Vercel)

1. Push to `main` — Vercel auto-deploys.
2. Set **Production** Environment Variables in Vercel dashboard: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`.
3. **Redeploy** without build cache so the new env values are baked into the bundle.

---

## 🗂️ Product Catalog

The catalog currently includes the following collections:

| Category | Items |
|---|---|
| 💍 **Bespoke Rings** | Tiara stack ring set |
| 📿 **Chains & Necklaces** | Celestial Swan Pendant (4 colors), Magnetic Clover, Gold Ingot Bar |
| 💪 **Bangles & Bracelets** | Baguette Tennis & Ring Duo |
| 🎁 **Atelier Sets** | CD Chain Duo, Enta Omri Trio, Wheat Ear Trio, Deer Antlers Duo |

> The **home page** shows the first **3** products as a curated preview with an "Explore Full Collection" button linking to the full catalog.

Products now load **live from Supabase** (`ProductsContext`) with the local file as fallback when the table is empty/unreachable. To add a new product, use `/admin` — or append to `src/data/products.js` then run `npm run seed`.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Gold | `#C9A96E` |
| Deep Charcoal | `#1A1A1A` |
| Warm Beige | `#F5F0E8` |
| Warm Stone | `#D5CEC0` |
| Accent Brown | `#59492E` |

---

## 📦 Key Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4.3.3",
  "@tailwindcss/vite": "^4.3.3",
  "@supabase/supabase-js": "^2.117.2",
  "@vercel/analytics": "^2.0.1",
  "lenis": "^1.3.11",
  "lucide-react": "^1.48.0",
  "canvas-confetti": "^1.9.4",
  "vite": "^8.3.0",
  "@vitejs/plugin-react": "^6.1.1"
}
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

<div align="center">

*Crafted with ✦ by Mahmoud Elleboudy*

**CELINE JEWELRY** — Modern Heirlooms Born Between The Nile & The Mediterranean

</div>
