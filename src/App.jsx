import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useLanguage } from './context/LanguageContext.jsx';
import { useCart } from './context/CartContext.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { CategoryBar } from './components/CategoryBar.jsx';
import { ProductCard } from './components/ProductCard.jsx';
import { CraftsmanshipSection } from './components/CraftsmanshipSection.jsx';
import { ValueBanners } from './components/ValueBanners.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { WhatsAppCheckoutView } from './components/WhatsAppCheckoutView.jsx';
import { CatalogView } from './components/CatalogView.jsx';
import { AboutUsView } from './components/AboutUsView.jsx';
import { ProductModal } from './components/ProductModal.jsx';
import { Footer } from './components/Footer.jsx';
import { productsData } from './data/products.js';

export const App = () => {
  const { t } = useLanguage();
  const { currentView } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

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

  const filteredHomeProducts = activeCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C5A880] selection:text-[#1A1A1A]">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'checkout' ? (
          <WhatsAppCheckoutView />
        ) : currentView === 'catalog' ? (
          <CatalogView />
        ) : currentView === 'about' ? (
          <>
            <AboutUsView />
            <CraftsmanshipSection />
            <ValueBanners />
          </>
        ) : (
          /* Home View */
          <>
            <Hero />
            
            {/* Category Filter Bar */}
            {/* <CategoryBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            /> */}

            {/* Curated Best-Sellers Grid matching Figma Home */}
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
                {filteredHomeProducts.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Craftsmanship Section */}
            <CraftsmanshipSection />

            {/* Value Guarantees Banners */}
            <ValueBanners />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer & Modals */}
      <CartDrawer />
      <ProductModal />
    </div>
  );
};

export default App;
