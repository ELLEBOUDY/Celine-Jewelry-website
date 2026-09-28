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

The site combines modern web aesthetics with deep RTL/LTR language support, smooth scroll animations, a persistent cart system, and a direct WhatsApp order flow — making it ideal for boutique jewelry brands operating in Egypt and the MENA region.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **Bilingual (AR / EN)** | Full RTL Arabic & LTR English support with instant language switching |
| 🛒 **Persistent Cart** | Cart state preserved across views with live quantity management |
| 💬 **WhatsApp Checkout** | Orders sent directly to the atelier via a formatted WhatsApp message |
| 🔍 **Catalog Search & Filter** | Real-time search + category filtering across all collections |
| 🖼️ **Product Modal** | Rich product detail overlays with image, description, and add-to-cart |
| 🎨 **Smooth Animations** | Lenis smooth scroll + CSS micro-animations throughout |
| 🎉 **Confetti on Order** | Canvas-confetti celebration on successful order submission |
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
Language            →  JavaScript (ESM)
```

---

## 📁 Project Structure

```
Celine Jewelry website/
│
├── public/                      # Static assets (logo, favicon, images)
│
├── src/
│   ├── components/              # UI Components
│   │   ├── Header.jsx           # Navbar with cart icon, language switcher & logo
│   │   ├── Hero.jsx             # Full-screen hero section with CTA
│   │   ├── CategoryBar.jsx      # Horizontal scrollable category filter bar
│   │   ├── ProductCard.jsx      # Individual product card with hover effects
│   │   ├── ProductModal.jsx     # Full-screen product detail modal
│   │   ├── CatalogView.jsx      # Filterable & searchable product grid
│   │   ├── CartDrawer.jsx       # Slide-in shopping cart drawer
│   │   ├── WhatsAppCheckoutView.jsx  # Multi-step checkout → WhatsApp order
│   │   ├── CraftsmanshipSection.jsx  # Brand story / artisan section
│   │   ├── ValueBanners.jsx     # Value proposition banners
│   │   ├── AboutUsView.jsx      # About the atelier page
│   │   └── Footer.jsx           # Site footer with links & social
│   │
│   ├── context/
│   │   ├── CartContext.jsx      # Global cart state (add, remove, quantity, total)
│   │   └── LanguageContext.jsx  # Global language state (AR / EN toggle)
│   │
│   ├── data/
│   │   └── products.js          # Product catalog data (name, price, category, images)
│   │
│   ├── locales/
│   │   └── translations.js      # All UI strings in Arabic & English
│   │
│   ├── App.jsx                  # Root component & view router
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles & Tailwind directives
│
├── index.html                   # HTML shell
├── vite.config.js               # Vite + React + Tailwind config
├── package.json                 # Dependencies & scripts
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
git clone https://github.com/YOUR_USERNAME/Celine-Jewelry-website.git

# 2. Navigate into the project folder
cd "Celine Jewelry website"

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server with HMR |
| `npm run build` | Build optimized production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |

---

## 🌐 Language Support

The site supports full **bilingual** operation:

- **English (EN)** — Default, LTR layout
- **Arabic (AR)** — Full RTL layout, Egyptian dialect copy

All strings are centralized in `src/locales/translations.js`. To add or edit any UI text, update that file only — no need to touch individual components.

---

## 💬 WhatsApp Checkout Flow

CELINE JEWELRY uses a **WhatsApp-first checkout** model:

1. Customer adds items to cart
2. Proceeds to checkout form (name, phone, governorate, address)
3. Selects payment method (Cash on Delivery / Instapay)
4. Clicks **"Send Order via WhatsApp Concierge"**
5. A pre-formatted Arabic order message is sent directly to the atelier's WhatsApp

This removes friction for Egyptian customers who prefer WhatsApp-based shopping.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Gold | `#C9A96E` |
| Deep Charcoal | `#1A1A1A` |
| Warm Beige | `#F5F0E8` |
| Warm Stone | `#D5CEC0` |

---

## 📦 Key Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4.3.3",
  "@tailwindcss/vite": "^4.3.3",
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

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

*Crafted with ✦ in Cairo*

**CELINE JEWELRY** — Modern Heirlooms Born Between The Nile & The Mediterranean

</div>
