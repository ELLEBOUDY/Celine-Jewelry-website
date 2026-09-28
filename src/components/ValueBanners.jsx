import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Truck, ShieldCheck } from 'lucide-react';

export const ValueBanners = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Courier */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F0E8] border border-[#EAE5DC] flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#C5A880]/30 flex items-center justify-center shrink-0 text-[#59492E] shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] mb-1">
                {t.courierFeatureTitle}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.courierFeatureDesc}
              </p>
            </div>
          </div>

          {/* Card 2: Guarantee */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F4F0E8] border border-[#EAE5DC] flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#C5A880]/30 flex items-center justify-center shrink-0 text-[#59492E] shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1A1A] mb-1">
                {t.guaranteeFeatureTitle}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {t.guaranteeFeatureDesc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
