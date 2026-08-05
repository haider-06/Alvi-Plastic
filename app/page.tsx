import React from 'react';
import ProductCatalog from '../components/ProductCatalog';
import HeroBanner from '../components/HeroBanner';

export default async function Home() {
  return (
    <div>
      <HeroBanner />
      <section id="catalog" className="mt-8">
        <ProductCatalog />
      </section>
    </div>
  );
}
