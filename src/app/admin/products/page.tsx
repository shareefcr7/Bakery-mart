
"use client";

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        router.refresh();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('An error occurred');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Products</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your catalog</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-zinc-500">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            {searchTerm ? 'No products found matching your search.' : 'No products found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                          {product.image ? (
                            <Image 
                              src={product.image} 
                              alt={product.name} 
                              fill 
                              className="object-cover"
                              onError={(e) => {
                                // Fallback to placeholder on error
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder.png'; // Make sure this exists, or use a data URI
                                target.srcset = '';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400">
                               <Image 
                                src="/images/placeholder.png"
                                alt="No image"
                                fill
                                className="object-cover opacity-50"
                               />
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-zinc-900 dark:text-white line-clamp-2">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                     <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-medium">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
