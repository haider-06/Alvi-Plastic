'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, Phone, ChevronDown, MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
interface HeaderProps {
searchQuery?: string;
setSearchQuery?: (q: string) => void;
selectedCategory?: string;
setSelectedCategory?: (c: string) => void;
}
const CATEGORIES = [
{ id: 'all', en: 'All Categories', bn: 'সকল ক্যাটাগরি' },
{ id: 'rack', en: 'Rack', bn: 'র‍্যাক' },
{ id: 'balti', en: 'Balti (Bucket)', bn: 'বালতি' },
{ id: 'gamla', en: 'Gamla (Tub)', bn: 'গামলা' },
{ id: 'tool-phri', en: 'Tool / Phri (Stool)', bn: 'টুল / পিঁড়ি' },
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
export default function Header({
searchQuery = '',
setSearchQuery = () => {},
selectedCategory = 'all',
setSelectedCategory = () => {},
}: HeaderProps) {
const { lang, setLang, t } = useLanguage();
const [isContactOpen, setIsContactOpen] = useState(false);
const contactRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
function handleClickOutside(e: MouseEvent) {
if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
setIsContactOpen(false);
}
}
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
<header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
<div className="flex items-center justify-between gap-3 md:gap-6">
<div className="flex-shrink-0 flex items-center">
<Image
src="/logo.PNG"
alt="M/S Alvi Plastic"
width={160}
height={48}
priority
className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
<div className="flex-1 max-w-xl min-w-0">
<div className="relative w-full">
<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
placeholder={t('searchPlaceholder')}
className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-[16px] md:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
/>
{searchQuery && (
                  <button
                    type="button"
onClick={() => setSearchQuery('')}
className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
<X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
<div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
<div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
type="button"
onClick={() => setLang('en')}
className={`px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
lang === 'en'
? 'bg-emerald-600 text-white shadow-sm'
: 'text-slate-600 hover:text-slate-900'
                }`}
              >
EN
              </button>
                <button
type="button"
onClick={() => setLang('bn')}
className={`px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
lang === 'bn'
? 'bg-emerald-600 text-white shadow-sm'
: 'text-slate-600 hover:text-slate-900'
}`}
>
বাংলা
</button>
</div>
<div className="relative" ref={contactRef}>
<button
type="button"
onClick={() => setIsContactOpen((prev) => !prev)}
className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 transition-colors"
>
<Phone className="w-4 h-4 text-emerald-600" />
<span>{t('contactUs')}</span>
<ChevronDown className="w-3.5 h-3.5 text-slate-500" />
</button>
{isContactOpen && (
<div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 z-50 space-y-4">
<div>
<h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Proprietor</h4>
<p className="text-sm font-semibold text-slate-800">Md. Ripon</p>
<a href="tel:01911387551" className="text-sm text-emerald-600 font-medium hover:underline">
01911-387551
</a>
            </div>
<div className="border-t border-slate-100 pt-3">
<h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">{t('headOffice')}</h4>
<p className="text-xs text-slate-600">48 KB Rudra Road, Chandnighat, Dhaka-1211 (WASA Gate No-2)</p>
<p className="text-xs text-slate-700 mt-1 font-medium">Aslam: 01611-344999 | Anwar: 01627-359194</p>
          </div>
<div className="border-t border-slate-100 pt-3">
<h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">{t('showroom')}</h4>
<p className="text-xs text-slate-600">Nalgola, Imamganj, Dhaka-1211</p>
<p className="text-xs text-slate-700 mt-1 font-medium">01730-332516, 01730-073216, 01970-139425</p>
<p className="text-xs text-slate-500">Tel: +8802226658122</p>
        </div>
<a
href="https://wa.me/8801911387551"
target="_blank"
rel="noopener noreferrer"
className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow transition text-sm"
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
<div className="w-full border-t border-slate-100 bg-slate-50/70">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
<div className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x">
{CATEGORIES.map((cat) => (
<button
key={cat.id}
type="button"
onClick={() => setSelectedCategory(cat.id)}
className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all ${
selectedCategory === cat.id
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
<h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Proprietor</h4>
<p className="text-sm font-semibold text-slate-800">Md. Ripon</p>
<a href="tel:01911387551" className="text-sm text-emerald-600 font-medium hover:underline">
01911-387551
</a>
            </div>
<div className="border-t border-slate-100 pt-3">
<h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">{t('headOffice')}</h4>
<p className="text-xs text-slate-600">48 KB Rudra Road, Chandnighat, Dhaka-1211 (WASA Gate No-2)</p>
          </div>
        </div>
      </div>
    </header>
  );
}

