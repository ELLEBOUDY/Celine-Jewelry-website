import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export const Hero = () => {
  const { t, language } = useLanguage();
  const { setCurrentView } = useCart();

  const isAr = language === 'ar';

  return (
    <section className="luxury-fade-in relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Typography & Hero Action */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Capsule pill */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#EAE5DC] text-[10px] sm:text-xs font-semibold tracking-widest text-[#59492E] uppercase">
            {t.heroCapsule}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#1A1A1A] leading-[1.15] tracking-tight">
            <span>{t.heroTitlePart1}</span>
            <span className="block italic text-[#9A7B56] font-normal font-serif">
              {t.heroTitlePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl font-light">
            {t.heroSubtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setCurrentView('catalog')}
              className="px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md cursor-pointer"
            >
              {t.exploreCollection}
            </button>
            <button
              onClick={() => setCurrentView('about')}
              className="px-7 py-3.5 rounded-full border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer"
            >
              {t.atelierEdit}
            </button>
          </div>

          {/* 3 Metric Columns */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#EAE5DC]">
            {/* <div>
              <span className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] block">
                {t.stat1Number}
              </span>
              <span className="text-[11px] text-[#777777] leading-tight block mt-0.5">
                {t.stat1Label}
              </span>
            </div> */}
            <div>
              <span className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] block">
                {t.stat2Number}
              </span>
              <span className="text-[11px] text-[#777777] leading-tight block mt-0.5">
                {t.stat2Label}
              </span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-serif font-bold text-[#1A1A1A] block">
                {t.stat3Number}
              </span>
              <span className="text-[11px] text-[#777777] leading-tight block mt-0.5">
                {t.stat3Label}
              </span>
            </div>
          </div>

        </div>

        {/* Right Arched Lookbook Showcase */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* Subtle background golden border halo */}
          <div className="absolute inset-0 border border-[#C5A880]/40 rounded-t-[140px] rounded-b-[40px] scale-105 " />

          {/* Arched Photo Card */}
          <div className="relative w-full max-w-md aspect-[3/4] rounded-t-[140px] rounded-b-[40px] overflow-hidden shadow-2xl bg-[#EAE5DC]">
            <img
              src="/images/IMG_8204.JPG.jpeg"
              alt="L'AURA Lookbook"
              className="w-full h-full object-cover object-center"
            />

            {/* Floating Atelier Badge */}
            <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-[#1A1A1A]/85 backdrop-blur-md border border-white/10 text-white shadow-xl">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] block font-semibold">
                {t.lookbookBadge}
              </span>
              <span className="text-sm font-serif font-normal text-white block mt-0.5">
                {t.lookbookTitle}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
