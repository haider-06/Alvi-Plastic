'use client';
import React from 'react';
import clsx from 'clsx';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../translations';

export default function ProductCard({ product }: { product: any }) {
  const { language } = useLanguage();
  const title = language === 'bn' && product.title_bn ? product.title_bn : product.title;
  const whatsappText = encodeURIComponent(`Hello Alvi Plastic, I would like a wholesale quote for ${title} (Tk ${product.price}).`);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative aspect-square bg-slate-50 flex items-center justify-center">
        {product.image_url ? (
          <img src={product.image_url} alt={title} className="object-contain w-full h-full transition-transform transform hover:scale-105" />
        ) : (
          <div className="text-slate-400">No image</div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">{product.category_id}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={clsx('px-3 py-1 rounded-full text-xs font-medium', product.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>
            {product.is_available ? TRANSLATIONS.stockIn[language] : TRANSLATIONS.stockOut[language]}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-slate-600 mb-1">{language === 'bn' ? product.title_bn || product.title : ''}</div>
        <div className="font-semibold text-slate-900 text-md truncate">{title}</div>
        <div className="mt-2 font-bold text-slate-900">{TRANSLATIONS.priceLabel[language]} {product.price}</div>
        <div className="mt-3">
          <a href={`https://wa.me/8801911387551?text=${whatsappText}`} target="_blank" rel="noreferrer" className="block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold">{TRANSLATIONS.wholesaleButton[language]}</a>
        </div>
      </div>
    </div>
  );
}
