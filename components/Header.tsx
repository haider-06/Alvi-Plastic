'use client';
import { Phone, Search, X, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { id: 'rack', name: 'Rack' },
  { id: 'balti', name: 'Balti (Bucket)' },
  { id: 'gamla', name: 'Gamla (Tub)' },
  { id: 'tool', name: 'Tool / Phri (Stool)' },
  { id: 'jali', name: 'Jali (Net Basket)' },
  { id: 'dala', name: 'Dala / Chalon' },
  { id: 'basket', name: 'Basket' },
  { id: 'kula', name: 'Kula' },
  { id: 'setbati', name: 'Set Bati' },
  { id: 'jug', name: 'Jug' },
  { id: 'dhakna', name: 'Dhakna Jali' },
  { id: 'plate', name: 'Plate & Glass' },
  { id: 'container', name: 'Container' },
  { id: 'others', name: 'Others' },
];

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white text-emerald-600 font-bold">AP</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">ALVI PLASTIC</h1>
              <p className="text-xs text-slate-500">Factory Direct Wholesale</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-1/2 lg:w-1/3 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full pl-10 pr-10 py-2.5 bg-white text-slate-900 border border-slate-300 placeholder:text-slate-400 rounded-xl text-sm focus:outline-none focus:bg-white focus:text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 transition-all"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg border border-slate-300"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="relative" ref={contactDropdownRef}>
            <button
              type="button"
              onClick={() => setContactOpen((prev) => !prev)}
              aria-expanded={contactOpen}
              className="flex min-h-[44px] items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-xl text-sm font-medium hover:bg-slate-200 transition"
            >
              <Phone size={18} />
              Contact
              <ChevronDown size={16} className="text-slate-500" />
            </button>
            <div
              className={`absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition-all duration-200 ${
                contactOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="p-4">
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

        {/* Category Filter Bar */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory touch-pan-x lg:grid lg:grid-cols-8 lg:overflow-visible lg:gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`snap-start flex-shrink-0 px-4 py-2 rounded-full text-[16px] md:text-sm font-medium whitespace-nowrap transition-all border ${
                activeCategory === null
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm border-emerald-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
              aria-pressed={activeCategory === null}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start flex-shrink-0 px-4 py-2 rounded-full text-[16px] md:text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm border-emerald-600'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    </header>
  );
}
