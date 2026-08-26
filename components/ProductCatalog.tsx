'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ProductCard, { Product } from './ProductCard';
import { createClient } from '@/lib/supabaseClient';
import { CATEGORIES } from './Header';
import { useLanguage } from '@/context/LanguageContext';
import { Layers } from 'lucide-react';

interface CatalogProps {
  searchQuery?: string;
}

export default function ProductCatalog({ searchQuery = '' }: CatalogProps) {
  const { lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    loadProducts();
  }, [supabase]);

  // Group products into category buckets
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    CATEGORIES.forEach((cat) => {
      grouped[cat.id] = [];
    });

    products.forEach((p) => {
      const catKey = p.category?.toLowerCase() || 'others';
      if (grouped[catKey]) {
        grouped[catKey].push(p);
      } else {
        if (!grouped['others']) grouped['others'] = [];
        grouped['others'].push(p);
      }
    });

    return grouped;
  }, [products]);

  // Filter products for active search query
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.name_bn && p.name_bn.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-sm">
          {lang === 'bn' ? 'পণ্য তালিকা লোড হচ্ছে...' : 'Loading product catalog...'}
        </p>
      </div>
    );
  }

  // Render unified search results if user is searching
  if (searchQuery.trim()) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            {lang === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'} ({searchResults.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">&quot;{searchQuery}&quot;</span>
        </div>

        {searchResults.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
            <p className="text-slate-600 font-medium">
              {lang === 'bn' ? 'কোনো পণ্য খুঁজে পাওয়া যায়নি।' : 'No products found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    );
  }

  // Default: Render 14 Category Sections with Anchor IDs
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {CATEGORIES.map((cat) => {
        const catProducts = productsByCategory[cat.id] || [];
        const categoryTitle = lang === 'bn' ? cat.bn : cat.en;

        return (
          <section
            key={cat.id}
            id={cat.id}
            className="scroll-mt-28 space-y-4 pt-2"
          >
            {/* Category Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
                    {categoryTitle}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {lang === 'bn' ? cat.en : cat.bn}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                {catProducts.length} {lang === 'bn' ? 'টি পণ্য' : 'Items'}
              </span>
            </div>

            {/* Category Products Grid */}
            {catProducts.length === 0 ? (
              <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs md:text-sm text-slate-400 font-medium">
                  {lang === 'bn'
                    ? 'এই ক্যাটাগরিতে শীঘ্রই নতুন পণ্য যুক্ত হবে'
                    : `New items for ${cat.en} coming soon`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}