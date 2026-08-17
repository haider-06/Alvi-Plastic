'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabaseClient';
import { Plus, Trash2, Upload, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from './Header';

interface Product {
  id: string;
  name: string;
  name_bn?: string;
  category: string;
  price?: number;
  in_stock: boolean;
  image_url?: string;
}

export default function AdminProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [category, setCategory] = useState('rack');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const supabase = createClient();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let uploadedImageUrl = '';

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        uploadedImageUrl = publicUrlData.publicUrl;
      }
    }

    const { error: insertError } = await supabase.from('products').insert([
      {
        name,
        name_bn: nameBn || null,
        category,
        price: price ? parseFloat(price) : 0,
        in_stock: inStock,
        image_url: uploadedImageUrl || null,
      },
    ]);

    if (!insertError) {
      setName('');
      setNameBn('');
      setCategory('rack');
      setPrice('');
      setImageFile(null);
      setShowAddModal(false);
      fetchProducts();
    }
    setSubmitting(false);
  };

  const toggleStock = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: !currentStatus })
      .eq('id', id);

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, in_stock: !currentStatus } : p))
      );
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Products ({products.length})</h2>
          <p className="text-xs text-slate-500">Live database entries</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow transition"
        >
          <Plus className="w-4 h-4"/>
          <span>Add New Product</span>
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name (English) *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 4-Layer Corner Rack"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name (Bengali)</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. ৪-ধাপের কর্নার র‍্যাক"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price in BDT (৳)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. 450"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="stockToggle"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="stockToggle" className="text-sm font-medium text-slate-700">
                  Product is In Stock
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow transition disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    Loading entries...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No products added yet. Click "Add New Product" to start.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3">
                      <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        {product.image_url ? (
                          <Image alt={product.name} className="object-cover" fill src={product.image_url} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                            N/A
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-900">
                      <div>{product.name}</div>
                      {product.name_bn && (
                        <div className="text-xs text-slate-400">{product.name_bn}</div>
                      )}
                    </td>
                    <td className="px-6 py-3 capitalize">{product.category}</td>
                    <td className="px-6 py-3 font-semibold text-slate-800">
                      {product.price ? `৳ ${product.price}` : 'N/A'}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleStock(product.id, product.in_stock)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                          product.in_stock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {product.in_stock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-xs font-medium text-rose-600 hover:text-rose-800 hover:underline inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5"/>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}