import React from 'react';
import ProductForm from '../../../../../components/ProductForm';
import { supabase } from '../../../../../lib/supabaseClient';

interface Props { params: { id: string } }

export default async function EditProductPage({ params }: Props) {
  const id = params.id;
  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase.from('products').select('*').eq('id', id).limit(1)
  ]);
  const product = products?.[0] ?? null;

  if (!product) return <div>Product not found</div>;

  // @ts-expect-error Server -> Client prop
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {/* @ts-expect-error */}
      <ProductForm initialData={product} categories={categories ?? []} />
    </div>
  );
}
