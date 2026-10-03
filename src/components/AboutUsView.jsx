import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { trackEvent } from '../utils/analytics.js';
import { MessageCircle, Sparkles } from 'lucide-react';

export const AboutUsView = () => {
  const { t } = useLanguage();
  const { setCurrentView } = useCart();

  const handleOpenWhatsApp = () => {
    trackEvent('click_whatsapp', { source: 'about_us' });
    const message = encodeURIComponent('مرحباً، أود الاستفسار عن مجوهراتكم');
    window.open(`https://api.whatsapp.com/send?phone=201028619308&text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Story & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#EAE5DC] text-[10px] sm:text-xs font-bold tracking-widest text-[#59492E] uppercase">
            {t.aboutHeroTag}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
            <span>{t.aboutHeroTitlePart1} </span>
            <span className="block italic text-[#9A7B56] font-normal font-serif">
              {t.aboutHeroTitlePart2}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl font-light">
            {t.aboutHeroDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleOpenWhatsApp}
              className="px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A880]" />
              <span>{t.testWhatsAppFlow}</span>
            </button>
            <button
              onClick={() => setCurrentView('catalog')}
              className="px-6 py-3.5 rounded-full bg-[#EAE5DC] hover:bg-[#ded7cb] text-[#1A1A1A] text-xs font-semibold tracking-widest uppercase transition-all cursor-pointer"
            >
              {t.explorePhilosophy}
            </button>
          </div>
        </div>

        {/* Right Column: Artisan at work arch */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* 100% Metric Badge floating on top */}
          <div className="absolute -top-4 -left-4 z-20 p-4 rounded-3xl bg-[#EAE5DC] border border-white shadow-lg max-w-[160px]">
            <span className="text-2xl font-serif font-bold text-[#1A1A1A] block">100%</span>
            <span className="text-[10px] text-[#666666] leading-tight block mt-0.5">
              {t.metricDescription}
            </span>
          </div>

          {/* Arched Photo Card */}
          <div className="relative w-full max-w-md aspect-[3/4] rounded-t-[140px] rounded-b-[40px] overflow-hidden shadow-2xl bg-[#EAE5DC]">
            <img
              src="/images/Kareem.png"
              alt={t.masterGoldsmithImageAlt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />

            {/* Floating Benchmark Card */}
            <div className="absolute bottom-6 inset-x-6 p-4 rounded-2xl bg-[#FAF8F5]/95 backdrop-blur-md border border-[#EAE5DC] text-[#1A1A1A] shadow-xl">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#9A7B56] block font-bold">
                {t.masterGoldsmithBenchmark}
              </span>
              <span className="text-xs font-serif font-bold text-[#1A1A1A] block mt-0.5">
                {t.masterGoldsmithGuild}
              </span>
              <span className="text-[10px] text-[#666666] block mt-1">
                {t.masterGoldsmithDescription}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
