'use client';
import { Phone, Search, X, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS, CATEGORY_LABELS } from '../translations';

const CATEGORIES = CATEGORY_LABELS;

const CONTACT_DETAILS = {
  proprietor: { label: 'Md. Ripon', phone: '+8801911387551' },
  headOffice: {
    address: '48 KB Rudra Road, Chandnighat, Dhaka-1211',
    people: [
      { label: 'Aslam', phone: '+8801611344999' },
      { label: 'Anwar', phone: '+8801627359194' }
    ]
  },
  showroom: {
    address: 'Nalgola, Imamganj, Dhaka-1211',
    people: [
      { label: 'Showroom', phone: '+8801730332516' },
      { label: 'Sales', phone: '+8801730073216' },
      { label: 'Backup', phone: '+8801970139425' }
    ],
    tel: '+8802226658122'
  },
  whatsapp: { label: 'Order via WhatsApp', phone: '+8801911387551' }
};

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams?.get('cat') ?? null);
  const [contactOpen, setContactOpen] = useState(false);
  const contactDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // update URL when searchQuery or activeCategory changes
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (activeCategory) params.set('cat', activeCategory);
    const query = params.toString();
    const path = query ? `/?${query}` : '/';
    router.replace(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3 flex-shrink-0">
              <Logo />
              <span className="text-lg font-bold tracking-[0.16em] text-slate-900 uppercase">ALVI PLASTIC</span>
            </div>

            <div className="flex-1 max-w-xl min-w-[200px] mx-2 md:mx-6 min-w-0">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={TRANSLATIONS.searchPlaceholder[language]}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-[16px] md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 transition-all"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg border border-slate-300"
                    aria-label={TRANSLATIONS.clearButton[language]}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="rounded-full border border-slate-200 bg-slate-100 p-1 flex items-center text-sm">
                {(['en', 'bn'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`min-w-[72px] rounded-full px-3 py-2 transition ${language === lang ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {lang === 'en' ? 'EN' : 'বাংলা'}
                  </button>
                ))}
              </div>
              <div className="relative" ref={contactDropdownRef}>
                <button
                  type="button"
                  onClick={() => setContactOpen((prev) => !prev)}
                  aria-expanded={contactOpen}
                  className="flex min-h-[44px] items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-xl text-sm font-medium hover:bg-slate-200 transition"
                >
                  <Phone size={18} />
                  {TRANSLATIONS.contactButton[language]}
                  <ChevronDown size={16} className="text-slate-500" />
                </button>
                <div
                  className={`fixed inset-x-4 top-20 z-50 mt-2 w-[90vw] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl transition-all duration-200 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 ${
                    contactOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="max-h-[80vh] overflow-y-auto">
                    <div className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">Contact Details</div>
                    <div className="space-y-4 text-sm text-slate-700">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-slate-900 font-semibold">Proprietor</div>
                        <a href={`tel:${CONTACT_DETAILS.proprietor.phone}`} className="mt-1 block text-emerald-700">{CONTACT_DETAILS.proprietor.label}: {CONTACT_DETAILS.proprietor.phone.replace('+880', '0')}</a>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-slate-900 font-semibold">Head Office</div>
                        <div className="mt-1 text-slate-600">{CONTACT_DETAILS.headOffice.address}</div>
                        <div className="mt-2 space-y-1">
                          {CONTACT_DETAILS.headOffice.people.map((person) => (
                            <a key={person.phone} href={`tel:${person.phone}`} className="block text-emerald-700">{person.label}: {person.phone.replace('+880', '0')}</a>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-slate-900 font-semibold">Showroom</div>
                        <div className="mt-1 text-slate-600">{CONTACT_DETAILS.showroom.address}</div>
                        <div className="mt-2 space-y-1">
                          {CONTACT_DETAILS.showroom.people.map((person) => (
                            <a key={person.phone} href={`tel:${person.phone}`} className="block text-emerald-700">{person.label}: {person.phone.replace('+880', '0')}</a>
                          ))}
                          <a href={`tel:${CONTACT_DETAILS.showroom.tel}`} className="block text-emerald-700">Tel: {CONTACT_DETAILS.showroom.tel}</a>
                        </div>
                      </div>
                      <a
                        href={`https://wa.me/${CONTACT_DETAILS.whatsapp.phone.replace('+880', '880')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700 transition"
                      >
                        <Phone size={16} /> {CONTACT_DETAILS.whatsapp.label}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-slate-100 py-2.5 bg-slate-50/50">
            <div className="flex items-center gap-2 overflow-x-auto snap-x px-4 sm:px-6 lg:px-8 scrollbar-none">
              <button
                onClick={() => setActiveCategory(null)}
                className={`shrink-0 whitespace-nowrap px-4 py-1.5 text-sm rounded-full transition-all border ${
                  activeCategory === null
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm border-emerald-600'
                    : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
                }`}
                aria-pressed={activeCategory === null}
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 whitespace-nowrap px-4 py-1.5 text-sm rounded-full transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm border-emerald-600'
                      : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
                  }`}
                  aria-pressed={activeCategory === cat.id}
                >
                  {language === 'bn' ? cat.bn : cat.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
