'use client';

import React from 'react';
import { Building2, Store, User, CreditCard, QrCode } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();
  const whatsappUrl = 'https://wa.me/8801322465611';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(whatsappUrl)}`;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-white tracking-wide">Alvi Plastic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'কারখানা থেকে সরাসরি উন্নতমানের গৃহস্থালি ও ইন্ডাস্ট্রিয়াল প্লাস্টিক পণ্যের পাইকারি প্রস্তুতকারক।'
                : 'Direct factory wholesale manufacturer and distributor of plastic goods across Bangladesh.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase">
              <Store className="w-4 h-4" />
              <h4>১. {t('showroom')}</h4>
            </div>
            <p className="text-xs text-slate-400">নলগোলা, ইমামগঞ্জ, ঢাকা-১২১১ (Nalgola, Imamganj, Dhaka)</p>
            <p className="text-xs text-slate-350 font-medium">০১৩২২-৪৬৫৬১১</p>
            <p className="text-xs text-slate-300 font-medium">০১৭৩০-৩৩২5১৬, ০১৭৩০-০৭৩২১৬,০১৯৭০-১৩৯৪২৫ ফোন: +৮৮০২২২৬৬৫8১২২</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase">
              <Building2 className="w-4 h-4" />
              <h4>২. {t('headOffice')}</h4>
            </div>
            <p className="text-xs text-slate-400">৪৮ কে বি রুদ্র রোড, চাঁদনীঘাট, ঢাকা-১২১১ (ওয়াসা ২ নং গেট)</p>
            <p className="text-xs text-slate-300 font-medium">আসলাম: ০১৬১১-৩৪৪৯৯৯</p>
            <p className="text-xs text-slate-300 font-medium">আনোয়ার: ০১৬২৭-৩৫৯১৯৪</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase">
              <User className="w-4 h-4" />
              <h4>৩. {t('proprietor')}</h4>
            </div>
            <p className="text-sm font-bold text-white">মোঃ রিপন (Md. Ripon)</p>
            <a href="tel:01911387551" className="text-xs text-emerald-400 font-bold hover:underline block">
              মোবাইল: ০১৯১১-৩৮৭৫৫১ (01911-387551)
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <h4>{t('paymentMethods')}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-pink-500 text-sm block mb-1">bKash (বিকাশ)</span>
                <p className="text-slate-300 font-semibold">Personal / Merchant: <span className="text-white">01911-387551</span></p>
                <p className="text-slate-400 text-[11px] mt-0.5">Reference: Business Name</p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-orange-500 text-sm block mb-1">Nagad (নগদ)</span>
                <p className="text-slate-300 font-semibold">Personal / Agent: <span className="text-white">01911-387551</span></p>
                <p className="text-slate-400 text-[11px] mt-0.5">Reference: Invoice No.</p>
              </div>

              <div className="sm:col-span-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-700">
                <span className="font-bold text-emerald-400 text-sm block mb-1">Bank Account (ব্যাংক হিসাব)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <p>Account Name: <strong className="text-white">Alvi Plastic</strong></p>
                  <p>Bank: <strong className="text-white">Islami Bank Bangladesh Ltd</strong></p>
                  <p>Account No: <strong className="text-white">2050XXXXXXXXXXXXX</strong></p>
                  <p>Branch: <strong className="text-white">Chawkbazar / Imamganj, Dhaka</strong></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-1.5 text-white font-bold text-sm">
              <QrCode className="w-4 h-4 text-emerald-400" />
              <span>{t('scanToConnect')}</span>
            </div>
            <div className="p-2 bg-white rounded-xl shadow-md">
              <img
                src={qrCodeUrl}
                alt="WhatsApp QR Code"
                width={130}
                height={130}
                className="w-32 h-32 object-contain rounded-lg"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'bn' ? 'সরাসরি পাইকারি রেট ও অর্ডার করতে স্ক্যান করুন' : 'Scan to message us directly on WhatsApp'}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Alvi Plastic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}