'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../translations';

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">{TRANSLATIONS.headOffice[language]}</h3>
          <div>48 KB Rudra Road, Chandnighat, Dhaka-1211 (WASA Gate No-2)</div>
          <div className="mt-2">Contacts: Aslam (01611-344999), Anwar (01627-359194)</div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">{TRANSLATIONS.showroom[language]}</h3>
          <div>Nalgola, Imamganj, Dhaka-1211</div>
          <div className="mt-2">Contacts: 01730-332516, 01730-073216, 01970-139425</div>
          <div className="mt-2">Tel: +8802226658122</div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="flex flex-col gap-2">
            <a href="tel:+8801911387551" className="text-emerald-600">Call Proprietor: 01911-387551</a>
            <a href="https://wa.me/8801911387551" target="_blank" rel="noreferrer" className="text-emerald-600">WhatsApp Orders</a>
            <a href="https://www.google.com/maps/search/48+KB+Rudra+Road+Chandnighat" target="_blank" rel="noreferrer" className="text-slate-600">Get Directions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
