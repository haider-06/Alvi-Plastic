'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ProductCatalog from '@/components/ProductCatalog';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow">
        <HeroBanner />
        <ProductCatalog searchQuery={searchQuery} />
      </main>
      <Footer />
    </div>
  );
}