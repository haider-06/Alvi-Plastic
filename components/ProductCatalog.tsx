'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS, CATEGORY_LABELS } from '../translations';

const DEFAULT_CATEGORIES = CATEGORY_LABELS;

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const desktopColumns = Math.max(1, Math.ceil(products.length / 2));

  useEffect(() => {
    // initialize from URL params
    const q = searchParams?.get('q') ?? '';
    const cat = searchParams?.get('cat') ?? null;
    setQuery(q);
    setCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [query, category]);

  async function fetchProducts() {
    setLoading(true);
    try {
      let q = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (category) q = q.eq('category_id', category);
      const res = await q;
      if ('data' in res) {
        let data = res.data as any[];
        if (query) {
          const ql = query.toLowerCase();
          data = data.filter((p) => (p.title || '').toLowerCase().includes(ql));
        }
        setProducts(data);
      }
    } finally {
      setLoading(false);
    }
  }

  const { language } = useLanguage();

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
        <div className="w-full md:w-2/3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={TRANSLATIONS.searchPlaceholder[language]}
            className="w-full bg-white text-slate-900 border border-slate-300 placeholder:text-slate-400 rounded-xl px-4 py-3 text-[16px] md:text-sm shadow-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="w-full md:w-1/3 flex gap-2">
          <select
            value={category ?? ''}
            onChange={(e) => setCategory(e.target.value || null)}
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option className="bg-white text-slate-900 py-1" value="">{TRANSLATIONS.allCategories[language]}</option>
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c.id} className="bg-white text-slate-900 py-1" value={c.id}>{language === 'bn' ? c.bn : c.en}</option>
            ))}
          </select>
          <button onClick={() => { setCategory(null); setQuery(''); }} className="px-4 py-3 rounded-xl bg-slate-100">{TRANSLATIONS.clearButton[language]}</button>
        </div>
      </div>

      <div className="grid product-grid" style={{ '--desktop-cols': desktopColumns } as React.CSSProperties}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 animate-pulse h-64" />
          ))
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        )}
      </div>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
          padding: 0 0.75rem;
        }

        @media (min-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
            padding: 0 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(var(--desktop-cols), minmax(0, 1fr));
            gap: 1.5rem;
            padding: 0;
            max-width: 112rem;
            margin: 0 auto;
          }
        }

        @media (min-width: 1536px) {
          .product-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
