"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function AdminProductTable({ initialProducts, categories }: any) {
  const [products, setProducts] = useState(initialProducts || []);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  function filtered() {
    let list = products;
    if (query) list = list.filter((p: any) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (categoryFilter) list = list.filter((p: any) => p.category_id === categoryFilter);
    return list;
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return;
    const res = await supabase.from('products').delete().eq('id', id);
    if (res.error) return alert('Delete failed: ' + res.error.message);
    setProducts((prev) => prev.filter((p: any) => p.id !== id));
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="border px-3 py-2 rounded flex-1" />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Categories</option>
          {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name_en}</option>)}
        </select>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered().map((p: any) => (
            <tr key={p.id} className="border-t">
              <td className="py-2"><img src={p.image_url} className="h-12 object-contain" alt="" /></td>
              <td>{p.title}</td>
              <td>{p.category_id}</td>
              <td>Tk {p.price}</td>
              <td>{p.is_available ? 'In Stock' : 'Out of Stock'}</td>
              <td>
                <Link href={`/admin/products/${p.id}/edit`} className="text-sm text-blue-600 mr-2">Edit</Link>
                <button onClick={() => handleDelete(p.id)} className="text-sm text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
