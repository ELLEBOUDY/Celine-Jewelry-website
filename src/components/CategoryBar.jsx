import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export const CategoryBar = ({ activeCategory, onSelectCategory }) => {
  const { t } = useLanguage();

  const categories = [
    { id: 'all', label: t.catFineJewelry, count: '7' },
    { id: 'rings', label: t.catRings },
    { id: 'bracelets', label: t.catBracelets },
    { id: 'necklaces', label: t.catNecklaces },
    { id: 'sets', label: t.catSets }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'bg-[#EAE5DC]/70 hover:bg-[#EAE5DC] text-[#444444]'
              }`}
            >
              <span>{cat.label}</span>
              {cat.count && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#1A1A1A]/10 text-[#555555]'}`}>
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
