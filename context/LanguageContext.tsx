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
  quote: { en: 'Request Wholesale Quote', bn: 'পাইকারি রেট জানুন' },
  inStock: { en: 'In Stock', bn: 'স্টকে আছে' },
  outOfStock: { en: 'Out of Stock', bn: 'স্টকে নেই' },
  showroom: { en: 'Showroom', bn: 'শো-রুম' },
  headOffice: { en: 'Head Office', bn: 'প্রধান কার্যালয়' },
  proprietor: { en: 'Proprietor', bn: 'স্বত্বাধিকারী' },
  
  // Hero Section Translations
  heroBadge: {
    en: 'WHOLESALE MANUFACTURER & SUPPLIER',
    bn: 'পাইকারি প্রস্তুতকারক ও সরবরাহকারী',
  },
  heroTitle: {
    en: 'Alvi Plastic',
    bn: 'আলভী প্লাস্টিক',
  },
  heroSubtitle: {
    en: 'Our mission is to provide high-quality plastic products directly from the factory to our customers, ensuring affordability and reliability.',
    bn: 'আমাদের লক্ষ্য হলো কারখানা থেকে সরাসরি গ্রাহকদের কাছে সাশ্রয়ী মূল্যে নির্ভরযোগ্য ও সেরা মানের প্লাস্টিক পণ্য পৌঁছে দেওয়া।',
  },
  browseBtn: {
    en: 'Browse',
    bn: 'ব্রাউজ',
  },
  whatsappBtn: {
    en: 'Whatsapp',
    bn: 'হোয়াটসঅ্যাপ',
  },

  allCategories: { en: 'All Categories', bn: 'সকল ক্যাটাগরি' },
  weight: { en: 'Weight', bn: 'ওজন' },
  kg: { en: 'kg', bn: 'কেজি' },
  paymentMethods: { en: 'Wholesale Payment Methods', bn: 'মূল্য পরিশোধের মাধ্যম' },
  scanToConnect: { en: 'Scan QR to Chat on WhatsApp', bn: 'হোয়াটসঅ্যাপে যুক্ত হতে স্ক্যান করুন' },
};

const defaultContext: LanguageContextValue = {
  lang: 'bn',
  setLang: () => {},
  t: (key: string) => translations[key]?.bn || key,
};

const LanguageContext = createContext<LanguageContextValue>(defaultContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Bengali ('bn') by default on first load
  const [lang, setLangState] = useState<Language>('bn');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('alvi_lang') as Language;
      if (saved === 'en' || saved === 'bn') {
        setLangState(saved);
      } else {
        setLangState('bn');
      }
    } catch {
      // Handle environments where localStorage is not accessible
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('alvi_lang', newLang);
    } catch {
      // Ignore write errors
    }
  };

  const t = (key: string) => translations[key]?.[lang] || translations[key]?.bn || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context || defaultContext;
};