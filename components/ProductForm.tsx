"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export interface Category {
  id: string;
  name_en: string;
  sort_order?: number;
}

export interface Product {
  id: string;
  title: string;
  title_bn: string;
  category_id: string;
  price: number;
  is_available: boolean;
  image_url?: string | null;
}

interface ProductFormProps {
  initialData?: Product | null;
  categories: Category[];
}

export default function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [titleBn, setTitleBn] = useState(initialData?.title_bn || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || (categories[0]?.id ?? ''));
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '');
  const [isAvailable, setIsAvailable] = useState(initialData?.is_available ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadImageIfNeeded() {
    if (!file) return initialData?.image_url || null;
    const fileExt = file.name.split('.').pop();
    const filePath = `products/${Date.now()}.${fileExt}`;
    const { error: uploadErr } = await supabase.storage.from('product-images').upload(filePath, file, { cacheControl: '3600', upsert: false });
    if (uploadErr) throw uploadErr;
    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrl = await uploadImageIfNeeded();
      if (initialData?.id) {
        const { error } = await supabase.from('products').update({ title, title_bn: titleBn, category_id: categoryId, price: parseFloat(price), is_available: isAvailable, image_url: imageUrl }).eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([{ title, title_bn: titleBn, category_id: categoryId, price: parseFloat(price), is_available: isAvailable, image_url: imageUrl }]);
        if (error) throw error;
      }
      router.push('/admin/dashboard');
    } catch (err: any) {
      alert('Save failed: ' + (err.message || String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded shadow">
      <div className="grid grid-cols-1 gap-3">
        <label>Title (EN)
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </label>
        <label>Title (BN)
          <input value={titleBn} onChange={(e) => setTitleBn(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </label>
        <label>Category
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border px-3 py-2 rounded">
            {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name_en}</option>)}
          </select>
        </label>
        <label>Price (BDT)
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </label>
        <label className="flex items-center gap-2">Availability
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} /> In Stock
        </label>
        <label>Image
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>

        <div className="pt-3">
          <button type="submit" disabled={loading} className="bg-emerald text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Save Product'}</button>
        </div>
      </div>
    </form>
  );
}
