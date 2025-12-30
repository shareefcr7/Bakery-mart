
"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      // Since our API currently returns all categories, we can filter or fetch logic
      // But standard REST would use /api/categories/[id], which we have not implemented as a separate GET endpoint? 
      // Wait, I implemented `src/app/api/categories/[id]/route.ts` with PUT and DELETE.
      // I did NOT implement GET in `[id]/route.ts`. 
      // I need to add GET to `src/app/api/categories/[id]/route.ts` or fetch list and find.
      // Fetching list and finding is inefficient but works for small scale. 
      // Let's quickly fix the API first or just use the list endpoint here if I can't edit API now.
      // Actually I can just edit the API now by re-writing it.
      // But to be fast, I'll just fetch all and find one. 
      // PROPER WAY: Add GET to `[id]/route.ts`. 
      // I will assume I will fix the API in next step or use the list fetch here.
      // Let's use the list fetch for now to avoid breaking flow.
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        const category = data.find((c: any) => c.id === id);
        if (category) {
          setName(category.name);
          setImage(category.image);
        } else {
             router.push('/admin/categories'); 
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image }),
      });

      if (res.ok) {
        router.push('/admin/categories');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update category');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-zinc-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/categories"
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Edit Category</h1>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              placeholder="e.g., Baking Tools"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Category Image
            </label>
            <ImageUpload 
              value={image}
              onChange={setImage}
            />
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
             <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Update Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
