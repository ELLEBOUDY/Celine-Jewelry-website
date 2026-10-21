import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export const NotFound = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-[10px] font-mono tracking-widest text-[#777777] uppercase block mb-3">
        {isAr ? 'الصفحة غير موجودة' : 'Page not found'}
      </span>
      <h1 className="text-5xl sm:text-7xl font-serif text-[#1A1A1A] mb-4">404</h1>
      <p className="text-sm text-[#666666] max-w-sm mb-8">
        {isAr
          ? 'الصفحة اللي بتدور عليها مش موجودة. جرّب تفضل في الكتالوج.'
          : "The page you're looking for doesn't exist. Try browsing the collection instead."}
      </p>
      <Link
        to="/catalog"
        className="px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md"
      >
        {isAr ? 'تصفح المجموعة' : 'Explore collection'}
      </Link>
    </div>
  );
};
