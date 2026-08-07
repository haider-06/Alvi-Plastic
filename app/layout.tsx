import './globals.css';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';

export const metadata = {
  title: 'M/S Alvi Plastic',
  description: 'Factory direct plastic wholesale - Alvi Plastic'
};

export const viewport = {
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full">
      <body className="min-h-screen pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] bg-slate-50 text-slate-900">
        <LanguageProvider>
          <Header />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
