'use client';
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import AdminProductTable from '@/components/AdminProductTable';
export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && mounted) {
        router.replace('/admin/login');
      } else if (mounted) {
      setLoading(false);
      }
    };
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_OUT' || !session) && mounted) {
        router.replace('/admin/login');
      } else if (session && mounted) {
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/admin/login');
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 text-sm font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Product Management</h1>
          <p className="text-xs sm:text-sm text-slate-500">Upload images, edit pricing, and update stock status</p>
      </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium text-sm rounded-xl border border-rose-200 transition"
        >
          Logout
        </button>
      </div>
      <AdminProductTable />
    </div>
  );
}
