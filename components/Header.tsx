
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Phone, ChevronDown, MessageCircle, X, Grid } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface CategoryItem {
  id: string;
  en: string;
  bn: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'rack', en: 'Rack', bn: 'র‍্যাক' },
  { id: 'balti', en: 'Balti (Bucket)', bn: 'বালতি' },
  { id: 'gamla', en: 'Gamla (Tub)', bn: 'গামলা' },
  { id: 'tool-phri', en: 'Tool / Phri (Stool)', bn: 'টুল / পিঁড়ি' },
  { id: 'jali', en: 'Jali (Net Basket)', bn: 'জালি' },
  { id: 'dala-chalon', en: 'Dala / Chalon', bn: 'ডালা / চালন' },
  { id: 'basket', en: 'Basket', bn: 'বাস্কেট' },
  { id: 'kula', en: 'Kula', bn: 'কুলা' },
  { id: 'set-bati', en: 'Set Bati', bn: 'সেট বাটি' },
  { id: 'jug', en: 'Jug', bn: 'জগ' },
  { id: 'dhakna-jali', en: 'Dhakna Jali', bn: 'ঢাকনা জালি' },
  { id: 'plate-glass', en: 'Plate & Glass', bn: 'প্লেট ও গ্লাস' },
  { id: 'container', en: 'Container', bn: 'কন্টেইনার' },
  { id: 'others', en: 'Others', bn: 'অন্যান্য' },
];

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export default function Header({
  searchQuery = '',
  setSearchQuery,
}: HeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const contactRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setIsContactOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (catId: string) => {
    setIsCategoryMenuOpen(false);
    setActiveSection(catId);

    if (pathname !== '/') {
      router.push(`/#${catId}`);
      return;
    }

    const targetElement = document.getElementById(catId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    setIsCategoryMenuOpen(false);
    setActiveSection('');
    if (pathname !== '/') {
      router.push('/');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo */}
          <Link href="/" onClick={scrollToTop} className="flex-shrink-0 flex items-center">
            <Image
              src="/logo.PNG"
              alt="Alvi Plastic"
              width={180}
              height={60}
              priority
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Search Box */}
          <div className="flex-1 max-w-xl min-w-0">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-[16px] md:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery && setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Language & Contacts */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
            {/* Language Switch */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setLang('bn')}
                className={`px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  lang === 'bn'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Contact Dropdown */}
            <div className="relative" ref={contactRef}>
              <button
                type="button"
                onClick={() => setIsContactOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{t('contactUs')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                    isContactOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isContactOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 z-[100] space-y-4">
                  {/* 1. Showroom */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      ১. {t('showroom')}
                    </h4>
                    <p className="text-xs text-slate-600">নলগোলা, ইমামগঞ্জ, ঢাকা-১২১১ (Nalgola, Imamganj, Dhaka)</p>
                    <p className="text-xs text-slate-800 font-semibold mt-1">
                      ০১৭৩০-৩৩২5১৬, ০১৭৩০-০৭৩২১৬, ০১৯৭০-১৩৯৪২৫
                    </p>
                    <p className="text-xs text-slate-500">ফোন: +৮৮০২২২৬৬৫8১২২</p>
                  </div>

                  {/* 2. Head Office */}
                  <div className="border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      ২. {t('headOffice')}
                    </h4>
                    <p className="text-xs text-slate-600">৪৮ কে বি রুদ্র রোড, চাঁদনীঘাট, ঢাকা-১২১১ (ওয়াসা ২ নং গেট)</p>
                    <p className="text-xs text-slate-800 font-semibold mt-1">
                      আসলাম: ০১৬১১-৩৪৪৯৯৯ | আনোয়ার: ০১৬২৭-৩৫৯১৯৪
                    </p>
                  </div>

                  {/* 3. Proprietor */}
                  <div className="border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      ৩. {t('proprietor')}
                    </h4>
                    <p className="text-sm font-semibold text-slate-800">মোঃ রিপন (Md. Ripon)</p>
                    <a href="tel:01911387551" className="text-sm text-emerald-600 font-bold hover:underline">
                      ০১৯১১-৩৮৭৫৫১ (01911-387551)
                    </a>
                  </div>

                  <a
                    href="https://wa.me/8801322465611"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow transition text-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="w-full border-t border-slate-100 bg-slate-50/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 relative">
          {/* All Categories Dropdown Trigger */}
          <div className="relative shrink-0" ref={categoryMenuRef}>
            <button
              type="button"
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                isCategoryMenuOpen || !activeSection
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{t('allCategories')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCategoryMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Expanded Dropdown Menu */}
            {isCategoryMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 max-h-[75vh] overflow-y-auto rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 z-[100] grid grid-cols-1 gap-1">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-left px-3 py-2 text-xs sm:text-sm rounded-xl font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all cursor-pointer"
                >
                  {t('allCategories')} (Top)
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-left px-3 py-2 text-xs sm:text-sm rounded-xl font-medium transition-all cursor-pointer ${
                      activeSection === cat.id
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'en' ? cat.en : cat.bn}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Horizontally Scrollable Category Pills */}
          <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-none snap-x py-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all cursor-pointer ${
                  activeSection === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {lang === 'en' ? cat.en : cat.bn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}