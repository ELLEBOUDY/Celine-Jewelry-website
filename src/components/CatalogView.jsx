import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { ProductCard } from './ProductCard.jsx';
import { Search } from 'lucide-react';

export const CatalogView = () => {
  const { t, language } = useLanguage();
  const { products: productsData } = useProducts();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [activeSubcat, setActiveSubcat] = useState('all');

  const isAr = language === 'ar';

  const filteredProducts = useMemo(() => {
    return productsData.filter((prod) => {
      const matchesTab =
        activeTab === 'all' || prod.category === activeTab;
      
      const name = isAr ? prod.nameAr : prod.nameEn;
      const desc = isAr ? prod.descriptionAr : prod.descriptionEn;
      const matchesSearch =
        search === '' ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        desc.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search, isAr]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Catalog Title Header */}
      <div className="mb-10 max-w-2xl">
        <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-2">
          • ATELIER ARCHIVE • FALL / WINTER 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#1A1A1A] mb-3">
          {isAr ? 'مجموعة الأتيليه الخالدة' : 'The Atelier Collection'}
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          {isAr
            ? 'مجوهرات فاخرة وإكسسوارات شخصية متوارثة مستوحاة من سحر شواطئ الإسكندرية وعراقة صاغة القاهرة.'
            : "Consciously crafted fine jewelry, heirloom leather goods, and refined personal accessories inspired by Alexandria's Mediterranean shores and historic Cairo craft."}
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#F5F2EB] border border-[#EAE5DC] mb-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Main Collection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#555555]'
              }`}
            >
              {isAr ? 'الكل' : 'ALL'} ({productsData.length})
            </button>
            <button
              onClick={() => setActiveTab('rings')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'rings'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#555555]'
              }`}
            >
              {t.catRings}
            </button>
            <button
              onClick={() => setActiveTab('bracelets')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'bracelets'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#555555]'
              }`}
            >
              {t.catBracelets}
            </button>
            <button
              onClick={() => setActiveTab('necklaces')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'necklaces'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#555555]'
              }`}
            >
              {t.catNecklaces}
            </button>
            <button
              onClick={() => setActiveTab('sets')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'sets'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white/80 hover:bg-white text-[#555555]'
              }`}
            >
              {t.catSets}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-[#888888] absolute top-1/2 -translate-y-1/2 inset-s-3.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? "بحث في الكتالوج..." : "Search catalog..."}
              className="w-full ps-9 pe-4 py-2 rounded-full bg-white border border-[#D5CEC0] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#59492E]"
            />
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};
