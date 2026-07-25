"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { IProduct, ICategory } from "@/lib/db"
import { useSearchParams } from "next/navigation" 
import { cn } from "@/lib/utils"

interface ProductListProps {
  initialProducts: IProduct[]
  categories: ICategory[]
}

export function ProductList({ initialProducts, categories }: ProductListProps) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"
  const searchQueryParam = searchParams.get("search") || ""
  
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [products] = useState<IProduct[]>(initialProducts)

  // Update state when URL param changes
  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])

  // Memoize category names
  const categoryNames = useMemo(
    () => ["All", ...categories.map(c => c.name)],
    [categories]
  )

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    let results = activeCategory === "All" 
      ? products 
      : products.filter(p => p.category === activeCategory)
    
    if (searchQueryParam) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchQueryParam.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQueryParam.toLowerCase())
      )
    }
    
    return results
  }, [activeCategory, searchQueryParam, products])

  // Handle category change with useCallback
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
  }, [])

  // View all handler
  const handleViewAll = useCallback(() => {
    setActiveCategory("All")
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Categories */}
      <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
        <h3 className="font-bold text-2xl px-2 text-[#7E0806] font-serif hidden lg:block">Categories</h3>
        <div className="flex lg:flex-col overflow-x-auto pb-4 lg:pb-0 gap-2 lg:gap-1 snap-x scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryNames.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "flex-shrink-0 snap-start px-6 py-2 lg:py-3 lg:px-4 rounded-full lg:rounded-xl text-sm font-medium transition-all duration-300 border lg:border-0 lg:text-left",
                activeCategory === cat 
                  ? "bg-[#7E0806] text-white border-[#7E0806] shadow-lg shadow-red-900/20 lg:bg-[#7E0806]/10 lg:text-[#7E0806] lg:border-l-4 lg:border-l-[#7E0806] lg:shadow-none lg:rounded-l-none" 
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5 lg:hover:pl-6"
              )}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="flex-1">
        <div className="mb-6 lg:hidden">
          <h3 className="font-bold text-2xl text-[#7E0806] font-serif">Categories</h3>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-white/40">No products found in this category.</p>
            <button 
              onClick={handleViewAll}
              className="mt-4 text-[#7E0806] hover:underline hover:text-[#f3e5b5] transition-colors"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="h-full">
                <ProductCard 
                  product={product} 
                  variant="dark"
                  priority={index < 6} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
