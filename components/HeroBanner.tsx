'use client';
import { Factory, Truck, Package, ArrowRight, MessageCircle } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function HeroBanner() {
  const trustBadges = [
    { icon: Factory, label: 'Direct Factory Wholesale', color: 'bg-emerald-100 text-emerald-700' },
    { icon: Package, label: '5,000+ Plastic SKUs', color: 'bg-blue-100 text-blue-700' },
    { icon: Truck, label: 'Fast Dhaka Delivery', color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {trustBadges.map((badge, i) => (
              <span key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>
                <badge.icon size={16} />
                {badge.label}
              </span>
            ))}
          </div>

          {/* Main Hero Card */}
          <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-emerald-400/5" />
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                  Premium Plastic Wholesale
                  <br />
                  <span className="text-emerald-600">Direct from Factory</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
                  Bangladesh's trusted B2B supplier for 5,000+ plastic products. 
                  Competitive wholesale pricing, bulk orders, and reliable delivery across Dhaka.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <Link
                    href="#catalog"
                    className="group flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/30"
                  >
                    Browse Catalog
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href="https://wa.me/8801911387551?text=Hello%20Alvi%20Plastic%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20pricing%20for%20your%20product%20catalog."
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl font-semibold text-base hover:bg-emerald-50 transition-all"
                  >
                    <MessageCircle size={18} />
                    Instant WhatsApp Inquiry
                  </a>
                </div>
              </div>

              {/* Decorative visual element */}
              <div className="hidden lg:block w-72 h-72 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl rotate-3" />
                <div className="absolute inset-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-center">
                  <Package size={64} className="text-emerald-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}