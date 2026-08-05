import React from 'react';
import ProductForm from '../../../../components/ProductForm';
import { supabase } from '../../../../lib/supabaseClient';

export default async function NewProductPage() {
  const { data: categories } = await supabase.from('categories').select('*').order('sort_order', { ascending: true });

  // Render client component with categories as prop via JSON
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {/* @ts-expect-error Server -> Client prop */}
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
