import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'M/S Alvi Plastic | Factory Direct Wholesale',
  description: 'Wholesale plastic products manufacturer and distributor in Dhaka, Bangladesh.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}