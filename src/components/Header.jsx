import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import {Heart, ShoppingBag, Globe, Menu, X } from 'lucide-react';
import logo from '../../images/logo.png';

export const Header = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const {
    totalItemsCount,
    total,
    setIsCartOpen,
    currentView,
    setCurrentView,
    wishlist
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DC] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#FAF8F5] py-2 px-4 text-center text-[10px] md:text-[11px] tracking-wider font-light uppercase">
        {t.topAnnouncement}
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 min-h-20 py-3 sm:h-20 sm:py-0">
          
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex min-w-0 items-center gap-2 sm:gap-3 text-start cursor-pointer focus:outline-none"
          >
            <img
              src={logo}
              alt={t.brandName}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-xs shrink-0"
            />
            <div>
              <span className="text-lg sm:text-2xl font-serif tracking-[0.14em] sm:tracking-[0.2em] font-medium text-[#1A1A1A] block truncate">
                {t.brandName}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            <button
              onClick={() => setCurrentView('home')}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer pb-1 ${
                currentView === 'home'
                  ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A]'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => setCurrentView('catalog')}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer pb-1 ${
                currentView === 'catalog'
                  ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A]'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              {t.navCatalog}
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer pb-1 ${
                currentView === 'about'
                  ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A]'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              {t.navAbout}
            </button>
          </nav>

          {/* Actions Bar */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border border-[#C5A880]/50 text-[10px] sm:text-xs font-semibold text-[#1A1A1A] hover:bg-[#EAE5DC] transition-colors cursor-pointer bg-white/60 whitespace-nowrap"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#9A7B56]" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Cart Pill Button matching Figma: 2 / E£5,400 */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full bg-[#EAE5DC] hover:bg-[#ded7cb] text-[#1A1A1A] text-[10px] sm:text-xs font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#59492E]" />
              <span className="hidden sm:inline">
                {totalItemsCount} / {t.currency}{total.toLocaleString()}
              </span>
              <span className="sm:hidden">{totalItemsCount}</span>
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -me-1 text-[#1A1A1A] md:hidden cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EAE5DC] px-6 py-4 space-y-3">
          <button
            onClick={() => {
              setCurrentView('home');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-start text-xs font-semibold tracking-widest uppercase py-2 text-[#1A1A1A]"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => {
              setCurrentView('catalog');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-start text-xs font-semibold tracking-widest uppercase py-2 text-[#1A1A1A]"
          >
            {t.navCatalog}
          </button>
          <button
            onClick={() => {
              setCurrentView('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-start text-xs font-semibold tracking-widest uppercase py-2 text-[#1A1A1A]"
          >
            {t.navAbout}
          </button>
        </div>
      )}
    </header>
  );
};
