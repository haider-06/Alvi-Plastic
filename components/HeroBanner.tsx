'use client';

import React from 'react';
import { Package, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Package className="w-4 h-4"/>
            <span>Wholesale Manufacturer & Supplier</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {t('Alvi Plastic')}
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {t('Our mission is to provide high-quality plastic products directly from the factory to our customers, ensuring affordability and reliability.')}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href="#catalog"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transition flex items-center gap-2 text-sm"
            >
              <span>{t('Browse')}</span>
              <ArrowRight className="w-4 h-4"/>
            </a>
            <a
              href="[https://wa.me/8801911387551?text=Hello%20Alvi%20Plastic,%20I%20want%20to%20place%20a%20wholesale%20order](https://wa.me/8801911387551?text=Hello%20Alvi%20Plastic,%20I%20want%20to%20place%20a%20wholesale%20order)"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition flex items-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400"/>
              <span>{t('Whatsapp')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}