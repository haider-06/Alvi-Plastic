import './globals.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { LanguageProvider } from '../context/LanguageContext'

export const metadata = {
  title: 'M/S Alvi Plastic',
  description: 'Factory direct plastic wholesale - Alvi Plastic'
}

export const viewport = {
  viewportFit: 'cover'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans">
        <LanguageProvider>
          <Header />
          <main className="flex flex-col">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
              {children}
            </div>
            <Footer />
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
}
