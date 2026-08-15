'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!isLoginPage && (
        <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <div className="text-sm font-medium text-slate-700">Admin Panel</div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded transition-colors"
          >
            {loggingOut ? '...' : 'Logout'}
          </button>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
