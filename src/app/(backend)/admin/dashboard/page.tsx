"use client";

import { useEffect, useState } from 'react';
import { Package, Layers, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalValue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalValue: 0
  });

  useEffect(() => {
    // Fetch stats
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        const products = await productsRes.json();
        const categories = await categoriesRes.json();

        // Calculate total value (parsing "$18.99" etc)
        const totalValue = products.reduce((acc: number, p: any) => {
          const price = parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0;
          return acc + price;
        }, 0);

        setStats({
          totalProducts: products.length || 0,
          totalCategories: categories.length || 0,
          totalValue
        });
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products'
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: Layers,
      color: 'bg-indigo-500',
      href: '/admin/categories'
    },
    {
      title: 'Total Inventory Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
      href: '/admin/products'
    },
    {
      title: 'System Status',
      value: 'Live',
      icon: TrendingUp,
      color: 'bg-red-500',
      href: '#'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link 
            key={index} 
            href={stat.href}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.title}</p>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
             <Link href="/admin/products/new" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                 Add New Product
             </Link>
             <Link href="/admin/categories" className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                 Manage Categories
             </Link>
        </div>
      </div>
    </div>
  );
}
