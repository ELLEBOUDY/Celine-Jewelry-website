import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { X, Plus, Minus, ShoppingBag, Send, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const ProductModal = () => {
  const { language, t } = useLanguage();
  const { quickViewProduct, setQuickViewProduct, addToCart, setCurrentView } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState('18k Vermeil');

  if (!quickViewProduct) return null;

  const isAr = language === 'ar';
  const name = isAr ? quickViewProduct.nameAr : quickViewProduct.nameEn;
  const description = isAr ? quickViewProduct.descriptionAr : quickViewProduct.descriptionEn;
  const material = isAr ? quickViewProduct.materialAr : quickViewProduct.materialEn;

  const handleInstantWhatsApp = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto"
      onClick={() => setQuickViewProduct(null)}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#EAE5DC] rounded-3xl overflow-hidden shadow-2xl my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-[#EAE5DC] flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-start">
          
          {/* Left Large Showcase Image */}
          <div className="md:col-span-6 relative aspect-[4/5] bg-[#F4F0E8] overflow-hidden p-6 sm:p-8 flex items-center justify-center">
            <div className="relative w-full h-full min-h-0 rounded-2xl overflow-hidden shadow-md">
              <img
                src={quickViewProduct.image}
                alt={name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />

              {/* Badges on image */}
              <div className="absolute top-3 start-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase bg-[#1A1A1A] text-white">
                  ATELIER SIGNATURE
                </span>
                <span className="px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase bg-white/90 text-[#1A1A1A]">
                  LIMITED VAULT RUN
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Options & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col space-y-6">
            
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-1">
                ATELIER CAPSULE • REF: {quickViewProduct.refCode || 'LAU-EXP-01'}
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mb-3 leading-snug">
                {name}
              </h2>

              {/* Price & Installments */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                  {t.currency}{quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-[#888888] line-through">
                    {t.currency}{quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#EAE5DC] text-[#59492E] font-semibold">
                  Launch Tier
                </span>
              </div>

              {/* Payment note */}
              <div className="p-2.5 rounded-xl bg-[#F5F2EB] border border-[#EAE5DC] text-[11px] text-[#555555] flex items-center justify-between mb-4">
                <span>{t.paymentNote}</span>
                <span className="text-[9px] font-bold underline cursor-pointer">{t.infoLabel}</span>
              </div>

              {/* In stock badge */}
              <div className="flex items-center gap-1.5 text-xs text-[#59492E] font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-[#59492E] animate-pulse" />
                <span>IN STOCK</span>
              </div>

              <p className="text-xs text-[#666666] leading-relaxed mb-4">
                {description}
              </p>

              {/* Precious Metal Selector */}
              {/* <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#1A1A1A] block mb-2">
                  SELECT FINISH / PRECIOUS METAL
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFinish('18k Vermeil')}
                    className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                      selectedFinish === '18k Vermeil'
                        ? 'border-[#59492E] bg-white shadow-xs'
                        : 'border-[#EAE5DC] bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#1A1A1A] block">18k Vermeil</span>
                    <span className="text-[10px] text-[#777777]">Warm luster</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFinish('White Vermeil')}
                    className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer ${
                      selectedFinish === 'White Vermeil'
                        ? 'border-[#59492E] bg-white shadow-xs'
                        : 'border-[#EAE5DC] bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#1A1A1A] block">White Vermeil</span>
                    <span className="text-[10px] text-[#777777]">Cool chrome</span>
                  </button>
                </div>
              </div> */}

            </div>

            {/* Actions: Add to Bag + Instant WhatsApp */}
            <div className="space-y-3 pt-3 border-t border-[#EAE5DC]">
              <div className="flex items-center gap-3">
                
                {/* Qty selector */}
                <div className="flex items-center border border-[#D5CEC0] rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#59492E] text-[#777777] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#59492E] text-[#777777] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG — {t.currency}{(quickViewProduct.price * quantity).toLocaleString()}</span>
                </button>
              </div>

              {/* Instant WhatsApp Concierge Button */}
              <button
                onClick={handleInstantWhatsApp}
                className="w-full py-3 rounded-full bg-[#EAE5DC] hover:bg-[#ded7cb] text-[#1A1A1A] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#59492E]" />
                <span>{t.instantOrderWhatsApp}</span>
              </button>

              {/* 3 mini assurance badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[9px] text-[#777777]">
                <div className="p-2 rounded-xl bg-white border border-[#EAE5DC]">
                  <Truck className="w-3.5 h-3.5 mx-auto mb-1 text-[#59492E]" />
                  <span>{t.freeCourier}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#EAE5DC]">
                  <RefreshCw className="w-3.5 h-3.5 mx-auto mb-1 text-[#59492E]" />
                  <span>{t.dayReturn}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-[#EAE5DC]">
                  <ShieldCheck className="w-3.5 h-3.5 mx-auto mb-1 text-[#59492E]" />
                  <span>{t.yearWarranty}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
