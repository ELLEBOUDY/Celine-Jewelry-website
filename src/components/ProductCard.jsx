import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Heart } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { language, t } = useLanguage();
  const { addToCart, setQuickViewProduct, wishlist, toggleWishlist } = useCart();

  const isAr = language === 'ar';
  const name = isAr ? product.nameAr : product.nameEn;
  const material = isAr ? product.materialAr : product.materialEn;
  const badgeText = isAr ? product.badgeAr : product.badge;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="luxury-fade-up group rounded-3xl p-3 sm:p-4 bg-[#F5F2EB] border border-[#EAE5DC] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
      
      {/* Image Container with Badges */}
      <div 
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF8F5] cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badge on top-start */}
        {badgeText && (
          <span className="absolute top-3 start-3 px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase bg-[#C5A880] text-[#1A1A1A] shadow-xs">
            {badgeText}
          </span>
        )}

        {/* Wishlist Heart Button */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 end-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1A1A1A] hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button> */}
      </div>

      {/* Info Details */}
      <div className="pt-4 pb-2 px-1 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#777777] font-semibold block mb-1">
            {material}
          </span>
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-base font-serif font-medium text-[#1A1A1A] mb-3 line-clamp-1 group-hover:text-[#9A7B56] transition-colors cursor-pointer"
          >
            {name}
          </h3>
        </div>

        <div>
          {/* Price & Stock status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-serif font-bold text-[#1A1A1A]">
                {t.currency}{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#888888] line-through">
                  {t.currency}{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              {t.inStock}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="w-full py-3 rounded-full bg-[#EAE5DC] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs"
          >
            {t.addToCart}
          </button>
        </div>

      </div>

    </div>
  );
};
