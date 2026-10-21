import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { ProductDetails } from '../components/ProductDetails.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ProductPage = () => {
  const { id } = useParams();
  const { language, t, isRTL } = useLanguage();
  const { products, loading } = useProducts();
  const isAr = language === 'ar';

  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  useEffect(() => {
    if (!product) return;
    const name = isAr ? product.nameAr : product.nameEn;
    document.title = `${name} — L'AURA Fine Atelier`;
    const desc = isAr ? product.descriptionAr : product.descriptionEn;
    if (desc) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', desc);
    }
  }, [product, isAr]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-[#777]">
        Loading...
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/catalog" replace />;
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const name = isAr ? product.nameAr : product.nameEn;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back to catalog */}
      <div className="mb-5">
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#D5CEC0] text-[11px] font-semibold tracking-wider uppercase text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 cursor-pointer"
        >
          {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          {isAr ? 'رجوع للكتالوج' : 'Back to catalog'}
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] text-[#888] mb-5" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[#1A1A1A] transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-[#1A1A1A] transition-colors">{t.navCatalog}</Link>
        <span>/</span>
        <span className="text-[#1A1A1A] font-semibold truncate">{name}</span>
      </nav>

      {/* Product */}
      <div className="rounded-3xl bg-[#FAF8F5] border border-[#EAE5DC] overflow-hidden shadow-xs">
        <ProductDetails product={product} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-12">
          <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-1">
            {isAr ? 'قد يعجبك أيضاً' : 'You may also like'}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mb-6">
            {isAr ? 'من نفس المجموعة' : 'From the same collection'}
          </h2>
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
