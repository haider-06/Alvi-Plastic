'use client';
import { Phone, MessageCircle, Search, X, MapPin, Truck, Factory, Package } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState<string | null>(searchParams?.get('cat') ?? null);

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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      {/* Top Contact Bar - Mobile */}
      <div className="hidden md:flex items-center justify-between px-4 py-2 bg-slate-900 text-slate-100 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><MapPin size={12} /> Head Office: 48 KB Rudra Road, Chandnighat, Dhaka-1211</span>
          <span className="flex items-center gap-1"><Phone size={12} /> Aslam: 01611-344999 | Anwar: 01627-359194</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><MapPin size={12} /> Showroom: Nalgola, Imamganj, Dhaka-1211</span>
          <span className="flex items-center gap-1"><Phone size={12} /> 01730-332516 | 01730-073216 | 01970-139425</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
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

          {/* Quick Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+8801911387551"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <Phone size={18} /> Md. Ripon: 01911-387551
            </a>
            <a
              href="tel:+8801730332516"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <Phone size={18} /> Showroom: 01730-332516
            </a>
            <a
              href="https://wa.me/8801911387551"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
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

      {/* Mobile Quick Actions Bar */}
      <div className="md:hidden border-t border-slate-200 px-4 py-3 bg-white">
        <div className="flex items-center justify-between gap-2">
          <a
            href="tel:+8801911387551"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium"
          >
            <Phone size={16} /> Ripon
          </a>
          <a
            href="tel:+8801730332516"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium"
          >
            <Phone size={16} /> Showroom
          </a>
          <a
            href="https://wa.me/8801911387551"
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl text-sm font-medium"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
