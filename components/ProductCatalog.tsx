'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { supabase } from '../lib/supabaseClient';

const DEFAULT_CATEGORIES = [
  { id: 'rack', name: 'Rack' },
  { id: 'balti', name: 'Balti (Bucket)' },
  { id: 'gamla', name: 'Gamla' },
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
  { id: 'others', name: 'Others' }
];

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <section>
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
        <div className="w-full md:w-2/3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or categories..." className="w-full border rounded-xl px-4 py-3 text-sm shadow-sm" />
        </div>
        <div className="w-full md:w-1/3 flex gap-2">
          <select value={category ?? ''} onChange={(e) => setCategory(e.target.value || null)} className="w-full border rounded-xl px-4 py-3 text-sm">
            <option value="">All Categories</option>
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button onClick={() => { setCategory(null); setQuery(''); }} className="px-4 py-3 rounded-xl bg-slate-100">Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </section>
  );
}
