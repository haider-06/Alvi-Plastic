'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-10 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">M/S Alvi Plastic</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Leading factory-direct wholesale manufacturer and supplier of household and industrial plastic wares in Bangladesh.
          </p>
          <p className="text-xs font-semibold text-emerald-400">
            {t('proprietor')}: Md. Ripon (01911-387551)
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-2">{t('headOffice')}</h4>
          <p className="text-xs text-slate-400">48 KB Rudra Road, Chandnighat, Dhaka-1211 (WASA Gate No-2)</p>
          <p className="text-xs text-slate-300 mt-1">Aslam: 01611-344999</p>
          <p className="text-xs text-slate-300">Anwar: 01627-359194</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-2">{t('showroom')}</h4>
          <p className="text-xs text-slate-400">Nalgola, Imamganj, Dhaka-1211</p>
          <p className="text-xs text-slate-300 mt-1">01730-332516, 01730-073216</p>
          <p className="text-xs text-slate-300">01970-139425 | Tel: +8802226658122</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-8 pt-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} M/S Alvi Plastic. All rights reserved.
      </div>
    </footer>
  );
}