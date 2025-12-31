
"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    images: [] as string[],
    isBestSeller: false,
    isNewProduct: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load categories
        const catRes = await fetch('/api/categories');
        if (catRes.ok) {
           const catData = await catRes.json();
           setCategories(catData);
        }

        // Load product
        const prodRes = await fetch(`/api/products/${id}`);
        if (!prodRes.ok) throw new Error('Failed to load');
        const prodData = await prodRes.json();
        
        setFormData({
            ...prodData,
            isNewProduct: prodData.isNewProduct || prodData.isNew || false,
            images: prodData.images || []
        });
        setIsLoading(false);

      } catch (err) {
        console.error(err);
        router.push('/admin/products');
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        alert('Failed to update product');
      }
    } catch {
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-zinc-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/products"
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Edit Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50"
                  required
                />
              </div>
               <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 h-32 resize-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Media</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Main Image</label>
                <ImageUpload 
                  value={formData.image}
                  onChange={(url) => setFormData({...formData, image: url})}
                />
              </div>
              <div>
                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Gallery Images</label>
                 <MultiImageUpload 
                    values={formData.images || []}
                    onChange={(urls) => setFormData({...formData, images: urls})}
                 />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50"
                  placeholder="$0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={e => setFormData({...formData, isBestSeller: e.target.checked})}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-zinc-300"
                   />
                   <span className="text-sm text-zinc-700 dark:text-zinc-300">Best Seller</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                      type="checkbox"
                      checked={formData.isNewProduct}
                      onChange={e => setFormData({...formData, isNewProduct: e.target.checked})}
                      className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-zinc-300"
                   />
                   <span className="text-sm text-zinc-700 dark:text-zinc-300">New Arrival</span>
                 </label>
              </div>
            </div>
          </div>

          <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Product...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Product
                </>
              )}
          </button>
        </div>
      </div>
    </div>
  );
}
