import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ArrowRight, ArrowLeft, Flame } from 'lucide-react';

export const CraftsmanshipSection = () => {
  const { t, isRTL } = useLanguage();
  const { setCurrentView } = useCart();

  return (
    <section className="py-20 border-t border-[#EAE5DC] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Artisan Workshop Image with Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#EAE5DC] aspect-[4/3]">
              <img
                loading="lazy"
                decoding="async"
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=80&w=1000"
                alt="Khan el-Khalili Master Goldsmiths"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Master Guild Badge */}
              <div className="absolute bottom-5 start-5 p-4 rounded-2xl bg-[#EAE5DC]/95 backdrop-blur-md border border-white/60 shadow-lg max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-[#9A7B56]" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A]">
                    {t.masterGuild}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#59492E] block">
                  {t.masterGuildLoc}
                </span>
                <p className="text-[10px] text-[#666666] mt-1 leading-snug">
                  {t.masterGuildNote}
                </p>
              </div>

            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A7B56] block">
              {t.craftsmanshipCommitment}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight">
              <span>{t.craftsmanshipTitle} </span>
              <span className="block italic text-[#9A7B56] font-normal font-serif">
                {t.craftsmanshipSubtitle}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              {t.craftsmanshipDesc}
            </p>

            {/* <button
              onClick={() => setCurrentView('about')}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1A1A1A] hover:text-[#9A7B56] transition-colors border-b border-[#1A1A1A] pb-1 cursor-pointer"
            >
              <span>{t.discoverOurStory}</span>
              {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button> */}
          </div>

        </div>
      </div>
    </section>
  );
};
