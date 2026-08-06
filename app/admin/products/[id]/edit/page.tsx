import React from 'react';
import ProductForm, { Category, Product } from '../../../../../components/ProductForm';
import { supabase } from '../../../../../lib/supabaseClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props { params: { id: string } }

export default async function EditProductPage({ params }: Props) {
  const id = params.id;
  const [{ data: categoriesData }, { data: productsData }] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase.from('products').select('*').eq('id', id).limit(1)
  ]);

  const categories = categoriesData as Category[] | null;
  const products = productsData as Product[] | null;
  const product = products?.[0] ?? null;

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialData={product} categories={categories ?? []} />
    </div>
  );
}
