'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface Product {
  id: string;
  name: string;
  name_bn?: string;
  category: string;
  price?: number;
  in_stock: boolean;
  image_url?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLanguage();

  const displayName = lang === 'bn' && product.name_bn ? product.name_bn : product.name;
  const whatsappText = encodeURIComponent(
    `Hello Alvi Plastic, I would like to request a wholesale quote for: ${product.name} (Category: ${product.category})`
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        {product.image_url ? (
          <Image alt={displayName} className="object-cover group-hover:scale-105 transition-transform duration-300" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" src={product.image_url}/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
            No Image Available
          </div>
        )}

        <div className="absolute top-2.5 right-2.5">
          <span
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full shadow-sm backdrop-blur-md ${
              product.in_stock
                ? 'bg-emerald-500/90 text-white'
                : 'bg-rose-500/90 text-white'
            }`}
          >
            {product.in_stock ? t('inStock') : t('outOfStock')}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          <h3 className="text-sm md:text-base font-bold text-slate-800 line-clamp-2 mt-1.5">
            {displayName}
          </h3>
          {product.price && product.price > 0 ? (
            <p className="text-emerald-700 font-extrabold text-base md:text-lg mt-1">
              ৳ {product.price.toLocaleString()}
            </p>
          ) : (
            <p className="text-slate-500 font-medium text-xs md:text-sm mt-1">
              Wholesale on Request
            </p>
          )}
        </div>

        <a
          href={`https://wa.me/8801911387551?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow transition"
        >
          <MessageCircle className="w-4 h-4"/>
          <span>{t('quote')}</span>
        </a>
      </div>
    </div>
  );
}