'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export default function Logo() {
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const [failed, setFailed] = useState(false);

  function handleError() {
    if (logoSrc === '/logo.png') {
      setLogoSrc('/logo.svg');
      return;
    }
    setFailed(true);
  }

  return (
    <div className="flex items-center gap-3">
      {!failed ? (
        <Image
          src={logoSrc}
          alt="AP - ALVI PLASTIC / মেসার্স আলভী প্লাস্টিক"
          width={48}
          height={48}
          className="h-10 md:h-12 w-auto object-contain"
          onError={handleError}
          priority
        />
      ) : (
        <div className="flex h-12 min-w-[160px] items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm">
          AP - ALVI PLASTIC / মেসার্স আলভী প্লাস্টিক
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold text-slate-900">ALVI PLASTIC</h1>
        <p className="text-xs text-slate-500">Factory Direct Wholesale</p>
      </div>
      {/* Place your logo.png or logo.svg inside the /public folder for automatic branding. */}
    </div>
  );
}
