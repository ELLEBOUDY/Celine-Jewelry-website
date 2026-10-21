import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ProductDetails } from './ProductDetails.jsx';
import { X } from 'lucide-react';

// Quick-view overlay: opens over the current page without changing the URL.
// The full page version lives at /product/:id.
export const ProductModal = () => {
  const { language } = useLanguage();
  const { quickViewProduct, setQuickViewProduct } = useCart();
  const navigate = useNavigate();

  const isAr = language === 'ar';

  // Close on Escape + lock the page scroll while open
  useEffect(() => {
    if (!quickViewProduct) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [quickViewProduct, setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const close = () => setQuickViewProduct(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/70 backdrop-blur-xs"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        data-lenis-prevent
        className="product-modal-scroll relative w-full max-w-4xl max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-3rem)] bg-[#FAF8F5] border border-[#EAE5DC] rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain touch-pan-y shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className={`absolute top-3 ${isAr ? 'left-3 sm:left-5' : 'right-3 sm:right-5'} z-[60] w-10 h-10 rounded-full bg-white border border-[#EAE5DC] flex items-center justify-center text-[#1A1A1A] shadow-lg hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer`}
          aria-label={isAr ? 'إغلاق تفاصيل المنتج' : 'Close product details'}
        >
          <X className="w-5 h-5" />
        </button>

        <ProductDetails product={quickViewProduct} onClose={close} />
      </div>
    </div>
  );
};
