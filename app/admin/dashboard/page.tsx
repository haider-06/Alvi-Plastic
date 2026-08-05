import React from 'react';
import { supabase } from '../../../lib/supabaseClient';
import AdminProductTable from '../../../components/AdminProductTable';
import Link from 'next/link';

export default async function DashboardPage() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('sort_order', { ascending: true })
  ]);

  const totalProducts = products?.length || 0;
  const activeStock = products?.filter((p: any) => p.is_available).length || 0;
  const categoriesCount = categories?.length || 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/admin/products/new" className="bg-emerald text-white px-3 py-2 rounded">Add Product</Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Total Products: <strong>{totalProducts}</strong></div>
        <div className="bg-white p-4 rounded shadow">Active Stock: <strong>{activeStock}</strong></div>
        <div className="bg-white p-4 rounded shadow">Categories: <strong>{categoriesCount}</strong></div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Products</h2>
        <AdminProductTable initialProducts={products ?? []} categories={categories ?? []} />
      </div>
    </div>
  );
}
