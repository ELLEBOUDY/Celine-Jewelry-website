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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 text-start cursor-pointer focus:outline-none"
          >
            <img
              src={logo}
              alt={t.brandName}
              className="w-10 h-10 rounded-full object-cover shadow-xs"
            />
            <div>
              <span className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-medium text-[#1A1A1A] block">
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
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#C5A880]/50 text-xs font-semibold text-[#1A1A1A] hover:bg-[#EAE5DC] transition-colors cursor-pointer bg-white/60"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#9A7B56]" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Wishlist Icon
            <div className="relative p-2 text-[#1A1A1A] hover:text-[#9A7B56] transition-colors cursor-pointer hidden sm:block">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#59492E] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div> */}

            {/* Cart Pill Button matching Figma: 2 / E£5,400 */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAE5DC] hover:bg-[#ded7cb] text-[#1A1A1A] text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-[#59492E]" />
              <span>
                {totalItemsCount} / {t.currency}{total.toLocaleString()}
              </span>
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1A1A1A] md:hidden cursor-pointer"
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
