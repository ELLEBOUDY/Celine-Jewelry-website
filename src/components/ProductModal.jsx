import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';

export const ProductModal = () => {
  const { language, t } = useLanguage();
  const { quickViewProduct, setQuickViewProduct, addToCart, setCurrentView } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);

  // Swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Reset active image index, quantity and selected color whenever quickViewProduct changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setSelectedColor(quickViewProduct?.colors?.[0] || null);
  }, [quickViewProduct?.id]);

  const images = (quickViewProduct?.images && quickViewProduct.images.length > 0)
    ? quickViewProduct.images
    : (quickViewProduct?.image ? [quickViewProduct.image] : []);
  const hasMultipleImages = images.length > 1;

  const handleSelectImageIndex = (idx) => {
    setActiveImageIndex(idx);
    const targetImage = images[idx];
    if (targetImage && quickViewProduct?.colors) {
      const matchedColor = quickViewProduct.colors.find(c => c.image === targetImage);
      if (matchedColor) {
        setSelectedColor(matchedColor);
      }
    }
  };

  // Keyboard navigation for image carousel
  useEffect(() => {
    if (!quickViewProduct || !hasMultipleImages) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        const nextIdx = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
        handleSelectImageIndex(nextIdx);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
        handleSelectImageIndex(nextIdx);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, hasMultipleImages, images, activeImageIndex]);

  if (!quickViewProduct) return null;

  const isAr = language === 'ar';
  const name = isAr ? quickViewProduct.nameAr : quickViewProduct.nameEn;
  const description = isAr ? quickViewProduct.descriptionAr : quickViewProduct.descriptionEn;
  const outOfStock = quickViewProduct.inStock === false;

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
    handleSelectImageIndex(nextIdx);
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    const nextIdx = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
    handleSelectImageIndex(nextIdx);
  };

  const minSwipeDistance = 45;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !hasMultipleImages) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNextImage();
    } else if (distance < -minSwipeDistance) {
      handlePrevImage();
    }
  };

  const handleInstantWhatsApp = () => {
    if (outOfStock) return;
    addToCart(quickViewProduct, quantity, selectedColor);
    setQuickViewProduct(null);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/70 backdrop-blur-xs"
      onClick={() => setQuickViewProduct(null)}
    >
      <div 
        data-lenis-prevent
        className="product-modal-scroll relative w-full max-w-4xl max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-3rem)] bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain touch-pan-y shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className={`absolute top-3 ${isAr ? 'left-3 sm:left-5' : 'right-3 sm:right-5'} z-[60] w-10 h-10 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[#1A1A1A] shadow-lg hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer`}
          aria-label={isAr ? 'إغلاق تفاصيل المنتج' : 'Close product details'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-start">
          
          {/* Left Large Showcase Image Carousel */}
          <div className="md:col-span-6 relative bg-[#F4F0E8] overflow-hidden p-3 sm:p-6 flex flex-col items-center justify-center">
            
            {/* Main Image Container */}
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-md bg-[#FAF8F5] flex items-center justify-center select-none"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                key={images[activeImageIndex] || quickViewProduct.image}
                src={images[activeImageIndex] || quickViewProduct.image}
                alt={`${name} - ${activeImageIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-all duration-300 animate-fadeIn"
              />

              {/* Badges on image */}
              <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase bg-[#1A1A1A] text-white shadow-xs">
                  {isAr ? (quickViewProduct.badgeAr || 'بصمة حصرية') : (quickViewProduct.badge || 'ATELIER SIGNATURE')}
                </span>
                {/* <span className="px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase bg-white/90 text-[#1A1A1A] shadow-xs">
                  {isAr ? 'إصدار محدود' : 'LIMITED VAULT RUN'}
                </span> */}
              </div>

              {/* Image Counter Badge when multiple images exist */}
              {hasMultipleImages && (
                <div className="absolute top-3 inset-e-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/65 text-white backdrop-blur-xs pointer-events-none">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}

              {/* Prev / Next Carousel Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute inset-s-2 sm:inset-s-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute inset-e-2 sm:inset-e-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-xs"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
                  </button>

                  {/* Indicator Dots overlay at bottom */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectImageIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeImageIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip (shown when product has multiple images) */}
            {hasMultipleImages && (
              <div className="w-full flex items-center justify-center gap-2.5 mt-3 pt-1 px-1 overflow-x-auto scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectImageIndex(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#59492E] ring-2 ring-[#59492E]/30 scale-105 shadow-sm opacity-100'
                        : 'border-[#EAE5DC] opacity-60 hover:opacity-100 bg-white'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Product Options & Actions */}
          <div className="md:col-span-6 p-4 sm:p-8 flex flex-col space-y-5 sm:space-y-6">
            
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-1">
                ATELIER CAPSULE • REF: {quickViewProduct.refCode || 'LAU-EXP-01'}
              </span>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mb-3 leading-snug">
                {name}
              </h2>

              {/* Price & Badge */}
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
              <div className="flex items-center gap-1.5 text-xs font-medium mb-4">
                <span className={`w-2 h-2 rounded-full ${outOfStock ? 'bg-red-500' : 'bg-[#59492E] animate-pulse'}`} />
                <span className={outOfStock ? 'text-red-700 font-bold' : 'text-[#59492E]'}>{outOfStock ? t.soldOut : t.inStock}</span>
              </div>

              <p className="text-xs text-[#666666] leading-relaxed mb-4">
                {description}
              </p>

              {/* Color Choices Selector (دواير الألوان لاختيار لون المنتج) */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="pt-3 pb-1 border-t border-[#EAE5DC]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A]">
                      {isAr ? 'اللون المختار للطلب:' : 'Selected Color:'}
                    </span>
                    {selectedColor && (
                      <span className="text-xs font-semibold text-[#59492E] flex items-center gap-1.5 bg-[#EAE5DC]/60 px-3 py-1 rounded-full border border-[#D5CEC0]/60">
                        <span 
                          className="w-3 h-3 rounded-full border border-black/20 shrink-0" 
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                        <span>{isAr ? selectedColor.nameAr : selectedColor.nameEn}</span>
                      </span>
                    )}
                  </div>

                  {/* Color Swatch Circles */}
                  <div className="flex items-center gap-3">
                    {quickViewProduct.colors.map((color) => {
                      const isSelected = selectedColor?.id === color.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => {
                            setSelectedColor(color);
                            if (color.image) {
                              const imgIdx = images.indexOf(color.image);
                              if (imgIdx !== -1) {
                                setActiveImageIndex(imgIdx);
                              }
                            }
                          }}
                          className={`relative p-0.5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                            isSelected
                              ? 'ring-2 ring-[#59492E] ring-offset-2 scale-110 shadow-sm'
                              : 'hover:scale-105 opacity-80 hover:opacity-100'
                          }`}
                          title={isAr ? color.nameAr : color.nameEn}
                          aria-label={isAr ? color.nameAr : color.nameEn}
                        >
                          <span
                            className="w-8 h-8 rounded-full border border-black/20 shadow-inner block"
                            style={{ backgroundColor: color.hex }}
                          />
                          {isSelected && (
                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <Check className={`w-4 h-4 stroke-3 ${color.hex === '#FFFFFF' || color.id === 'white' ? 'text-[#1A1A1A]' : 'text-white'}`} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Actions: Add to Bag + Instant WhatsApp */}
            <div className="space-y-3 pt-3 border-t border-[#EAE5DC]">
              <div className="flex items-center gap-3">
                
                {/* Qty selector */}
                <div className="flex items-center border border-[#D5CEC0] rounded-full bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:text-[#59492E] text-[#777777] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:text-[#59492E] text-[#777777] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={() => {
                    if (outOfStock) return;
                    addToCart(quickViewProduct, quantity, selectedColor);
                    setQuickViewProduct(null);
                  }}
                  disabled={outOfStock}
                  className={`flex-1 min-w-0 py-3 px-2 rounded-full text-[10px] sm:text-xs leading-tight font-semibold tracking-wide sm:tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 shadow-md transition-all ${outOfStock ? 'bg-[#CCCCCC] text-[#888888] cursor-not-allowed' : 'bg-[#1A1A1A] hover:bg-[#333333] text-white cursor-pointer'}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{outOfStock ? t.soldOut : `ADD TO BAG — ${t.currency}${(quickViewProduct.price * quantity).toLocaleString()}`}</span>
                </button>
              </div>

              {/* Instant WhatsApp Concierge Button */}
              <button
                onClick={handleInstantWhatsApp}
                disabled={outOfStock}
                className={`w-full min-h-12 px-3 py-2.5 rounded-full text-[10px] sm:text-xs leading-tight font-semibold tracking-wide sm:tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${outOfStock ? 'bg-[#CCCCCC] text-[#888888] cursor-not-allowed' : 'bg-[#EAE5DC] hover:bg-[#ded7cb] text-[#1A1A1A] cursor-pointer'}`}
              >
                <Send className="w-3.5 h-3.5 text-[#59492E]" />
                <span>{outOfStock ? t.soldOut : t.instantOrderWhatsApp}</span>
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
