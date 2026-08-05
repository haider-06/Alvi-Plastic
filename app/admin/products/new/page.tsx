import React from 'react';
import ProductForm, { Category } from '../../../../components/ProductForm';
import { supabase } from '../../../../lib/supabaseClient';

export default async function NewProductPage() {
  const categoriesResult = await supabase.from('categories').select('*').order('sort_order', { ascending: true });
  const categories = categoriesResult.data as Category[] | null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
