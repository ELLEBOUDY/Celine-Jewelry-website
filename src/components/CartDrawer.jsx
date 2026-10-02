import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { trackEvent } from '../utils/analytics.js';
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const CartDrawer = () => {
  const { language, t, isRTL } = useLanguage();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    total,
    setCurrentView
  } = useCart();

  if (!isCartOpen) return null;

  const isAr = language === 'ar';

  const handleProceedToCheckout = () => {
    trackEvent('begin_checkout', {
      item_count: cart.reduce((count, item) => count + item.quantity, 0),
      value: total,
      currency: 'EGP',
    });
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`fixed inset-y-0 ${isRTL ? 'left-0' : 'right-0'} flex max-w-full`}>
        <div className="w-screen max-w-full sm:max-w-md bg-[#FAF8F5] border-x border-[#EAE5DC] shadow-2xl flex flex-col justify-between h-full">
          
          {/* Header */}
          <div>
            <div className="p-4 sm:p-6 border-b border-[#EAE5DC] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-normal text-[#1A1A1A]">
                  {t.shoppingBag}
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EAE5DC] text-[#555555] font-semibold">
                  {cart.length} {t.itemsCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full border border-[#EAE5DC] flex items-center justify-center text-[#777777] hover:text-[#1A1A1A] hover:bg-[#EAE5DC] transition-colors cursor-pointer shrink-0"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Progress Bar */}
            <div className="bg-[#59492E] text-white px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] font-medium flex items-center justify-between tracking-wide">
              <span>{t.deliveryUnlocked}</span>
              <span className="font-bold">100%</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#777777] space-y-3">
                <span className="text-3xl">💍</span>
                <p className="text-sm font-serif">{t.shoppingBag} {isAr ? 'فارغة حالياً' : 'is empty'}</p>
              </div>
            ) : (
              cart.map((item) => {
                const name = isAr ? item.product.nameAr : item.product.nameEn;
                const material = isAr ? item.product.materialAr : item.product.materialEn;

                return (
                  <div
                    key={item.cartItemId || item.product.id}
                    className="p-3 sm:p-3.5 rounded-2xl bg-[#F5F2EB] border border-[#EAE5DC] flex items-center gap-3 sm:gap-4"
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={item.product.image}
                      alt={name}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-white/60 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#1A1A1A] truncate mb-0.5">
                        {name}
                      </h4>
                      {item.selectedColor && (
                        <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0" 
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-[10px] text-[#59492E] font-semibold">
                            {isAr ? `اللون: ${item.selectedColor.nameAr}` : `Color: ${item.selectedColor.nameEn}`}
                          </span>
                        </div>
                      )}
                      <p className="text-[10px] sm:text-[11px] text-[#777777] truncate mb-2">
                        {material} • {item.quantity} {t.itemsCount}
                      </p>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center border border-[#D5CEC0] rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.cartItemId || item.product.id, item.quantity - 1)}
                            className="p-1 hover:text-[#59492E] text-[#777777] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1A1A1A]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId || item.product.id, item.quantity + 1)}
                            className="p-1 hover:text-[#59492E] text-[#777777] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartItemId || item.product.id)}
                          className="text-[#999999] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-end shrink-0">
                      <span className="text-xs sm:text-sm font-serif font-bold text-[#1A1A1A] whitespace-nowrap">
                        {t.currency}{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#EAE5DC] bg-white space-y-3.5 sm:space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#666666]">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold text-[#1A1A1A]">
                    {t.currency}{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>{t.whiteGloveCourier}</span>
                  <span className="font-bold text-[#59492E] uppercase tracking-wider">
                    {t.free}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1A1A1A] pt-2 border-t border-[#EAE5DC]">
                  <span>{t.estimatedTotal}</span>
                  <span className="text-lg">
                    {t.currency}{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Proceed to WhatsApp Checkout Pill */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 sm:py-4 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>{t.proceedToWhatsApp}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#777777]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#59492E]" />
                <span>{t.conciergeGuarantee}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
