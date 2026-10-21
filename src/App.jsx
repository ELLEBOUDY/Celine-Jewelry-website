import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext.jsx';
import { useCart } from './context/CartContext.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { CraftsmanshipSection } from './components/CraftsmanshipSection.jsx';
import { ValueBanners } from './components/ValueBanners.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { WhatsAppCheckoutView } from './components/WhatsAppCheckoutView.jsx';
import { CatalogView } from './components/CatalogView.jsx';
import { AboutUsView } from './components/AboutUsView.jsx';
import { Footer } from './components/Footer.jsx';
import { AdminDashboard } from './components/AdminDashboard.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { useProducts } from './context/ProductsContext.jsx';
import { usePageMeta } from './hooks/usePageMeta.js';

const HomeView = () => {
  const { t } = useLanguage();
  const { products: productsData } = useProducts();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredHomeProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  return (
    <>
      <Hero />

      {/* Curated Best-Sellers Grid */}
      <section className="luxury-fade-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-1">
            {t.sectionProvenance}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
            {t.curatedBestsellers}
          </h2>
        </div>

        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHomeProducts.slice(3, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View Full Collection Button */}
        <div className="mt-10 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
          >
            {t.exploreCollection} ({productsData.length})
          </Link>
        </div>
      </section>

      <CraftsmanshipSection />

      {/* Value Guarantees Banners */}
      <ValueBanners />
    </>
  );
};

const AboutPage = () => (
  <>
    <AboutUsView />
    <CraftsmanshipSection />
    <ValueBanners />
  </>
);

const CatalogPage = () => {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'ar' ? 'الكتالوج — L\'AURA Fine Atelier' : 'Catalog — L\'AURA Fine Atelier',
    language === 'ar'
      ? 'مجموعة مجوهرات فاخرة وإكسسوارات شخصية مختارة يدوياً.'
      : 'Consciously crafted fine jewelry, heirloom leather goods and refined personal accessories.'
  );
  return <CatalogView />;
};

const AdminPage = () => {
  const { language } = useLanguage();
  usePageMeta(
    language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard',
    'L\'AURA admin dashboard'
  );
  return <AdminDashboard />;
};

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

export const App = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#1A1A1A]">
      <ScrollToTop />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/checkout" element={<WhatsAppCheckoutView />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
