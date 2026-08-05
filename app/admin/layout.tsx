import React from 'react';
import Link from 'next/link';

export const metadata = { title: 'Admin - Alvi Plastic' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold">Admin - Alvi Plastic</div>
          <div className="flex items-center gap-3">
            <Link href="/">Storefront</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
