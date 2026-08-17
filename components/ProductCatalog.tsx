'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ProductCard, { Product } from './ProductCard';
import { createClient } from '@/lib/supabaseClient';

interface CatalogProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export default function ProductCatalog({
  searchQuery = '',
  selectedCategory = 'all',
}: CatalogProps) {
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

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'all' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.name_bn && p.name_bn.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query);

      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Loading product catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto">
          <p className="text-slate-600 font-medium">No products found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}