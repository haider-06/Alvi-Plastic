'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'bn';

export interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; bn: string }> = {
  searchPlaceholder: { en: 'Search products or categories...', bn: 'পণ্য বা ক্যাটাগরি খুঁজুন...' },
  contactUs: { en: 'Contact Us', bn: 'যোগাযোগ' },
  clear: { en: 'Clear', bn: 'মুছে ফেলুন' },
  quote: { en: 'Request Wholesale Quote', bn: 'পাইকারি দাম জানুন' },
  inStock: { en: 'In Stock', bn: 'স্টকে আছে' },
  outOfStock: { en: 'Out of Stock', bn: 'স্টকে নেই' },
  headOffice: { en: 'Head Office', bn: 'প্রধান কার্যালয়' },
  showroom: { en: 'Showroom', bn: 'শো-রুম' },
  proprietor: { en: 'Proprietor', bn: 'স্বত্বাধিকারী' },
  allCategories: { en: 'All Categories', bn: 'সকল ক্যাটাগরি' },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('alvi_lang') as Language;
    if (saved === 'en' || saved === 'bn') setLangState(saved);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('alvi_lang', newLang);
  };

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};