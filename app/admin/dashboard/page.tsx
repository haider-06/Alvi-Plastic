'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import AdminProductTable from '../../../components/AdminProductTable';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace('/admin/login');
        return;
      }
      
      setUser(session.user);
      
      // Fetch dashboard data
      const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('sort_order', { ascending: true })
      ]);
      
      setProducts(productsData ?? []);
      setCategories(categoriesData ?? []);
      setLoading(false);
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.replace('/admin/login');
      } else if (session) {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  // Prevent flash/disappearance by showing a full loading skeleton while authenticating
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

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
