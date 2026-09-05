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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Package className="w-4 h-4" />
            <span>{t('heroBadge')}</span>
          </div>

          {/* Title: আলভী প্লাস্টিক / Alvi Plastic */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t('heroTitle')}
          </h1>

          {/* Mission Subtitle */}
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-xl font-normal">
            {t('heroSubtitle')}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <a
              href="#rack"
              className="px-6 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transition flex items-center gap-2 text-sm cursor-pointer"
            >
              <span>{t('browseBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/8801322465611?text=Hello%20Alvi%20Plastic,%20I%20want%20to%20place%20a%20wholesale%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition flex items-center gap-2 text-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('whatsappBtn')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}