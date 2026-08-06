'use client';
import { Phone, Search, X, ChevronDown } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { id: 'rack', name: 'Rack' },
  { id: 'balti', name: 'Balti' },
  { id: 'gamla', name: 'Gamla' },
  { id: 'tool', name: 'Tool/Phri' },
  { id: 'jali', name: 'Jali' },
  { id: 'dala', name: 'Dala/Chalon' },
  { id: 'basket', name: 'Basket' },
  { id: 'kula', name: 'Kula' },
  { id: 'setbati', name: 'Set Bati' },
  { id: 'jug', name: 'Jug' },
  { id: 'dhakna', name: 'Dhakna Jali' },
  { id: 'plate', name: 'Plate & Glass' },
  { id: 'container', name: 'Container' },
  { id: 'others', name: 'Others' },
];

const CONTACT_NUMBERS = [
  { label: 'Md. Ripon', phone: '+8801911387551' },
  { label: 'Showroom', phone: '+8801730332516' },
  { label: 'Aslam', phone: '+8801611344999' },
  { label: 'Anwar', phone: '+8801627359194' },
  { label: 'Selling', phone: '+8801730073216' },
];

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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AP</span>
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
                className="w-full pl-10 pr-10 py-2.5 bg-white text-slate-900 border border-slate-300 placeholder:text-slate-400 rounded-xl text-sm focus:outline-none focus:bg-white focus:text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions and Contact Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setContactOpen((prev) => !prev)}
              aria-expanded={contactOpen}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-xl text-sm font-medium hover:bg-slate-200 transition"
            >
              <Phone size={18} />
              Contact
              <ChevronDown size={16} className="text-slate-500" />
            </button>
            <div
              className={`absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition-all duration-200 ${
                contactOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              <div className="p-3">
                <div className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">Phone numbers</div>
                <div className="space-y-2">
                  {CONTACT_NUMBERS.map((contact) => (
                    <a
                      key={contact.phone}
                      href={`tel:${contact.phone}`}
                      className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{contact.label}</div>
                        <div className="text-slate-500">{contact.phone.replace('+880', '0')}</div>
                      </div>
                      <Phone size={16} className="text-emerald-600" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                activeCategory === null
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm border-emerald-600'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900 border-slate-200/80'
              }`}
              aria-pressed={activeCategory === null}
            >
              <span className={`${activeCategory === null ? 'text-white' : 'text-slate-600'}`}>All Categories</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm border-emerald-600'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900 border-slate-200/80'
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                <span className={`${activeCategory === cat.id ? 'text-white' : 'text-slate-600'}`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </header>
  );
}
