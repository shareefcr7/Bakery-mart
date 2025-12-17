"use client"

import { useState, useEffect, Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { categories, products } from "@/lib/data"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { AnimatedHeading } from "@/components/ui/animated-heading"

function ProductContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  
  useEffect(() => {
     if(searchParams.get("category")) {
         // eslint-disable-next-line react-hooks/exhaustive-deps
         setActiveCategory(searchParams.get("category")!)
     }
  }, [searchParams])

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-64 flex-shrink-0">
                <h3 className="font-bold text-2xl mb-4 lg:mb-6 px-2 text-[#7E0806] font-serif">Categories</h3>
                <div className="flex lg:flex-col overflow-x-auto pb-4 lg:pb-0 gap-2 lg:gap-1 snap-x scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "flex-shrink-0 snap-start px-5 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all rounded-full lg:rounded-r-3xl lg:rounded-l-none border lg:border-0 lg:border-l-4 whitespace-nowrap",
                                activeCategory === cat 
                                    ? "bg-primary text-[#f3e5b5] border-primary lg:border-primary-foreground/20 lg:shadow-sm lg:translate-x-1" 
                                    : "bg-secondary/20 lg:bg-transparent border-transparent text-muted-foreground hover:bg-secondary/40 lg:hover:pl-6"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
      </div>
  )
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black text-[#f3e5b5]">
      <Navbar />
      
      <div className="relative py-24 mb-8 bg-black">
        {/* Background Image - Removed for Black BG request */}
        {/* <div className="absolute inset-0 z-0">
            <Image
                src="/section-header-bg.png"
                alt="Products Header"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/60" />
        </div> */}
        <div className="container mx-auto px-4 relative z-10">
            <AnimatedHeading title="Our Products" textColor="text-[#f3e5b5]" />
            <p className="text-[#f3e5b5]/80 max-w-2xl mx-auto text-center mt-4 text-lg">Explore our extensive collection of professional baking supplies.</p>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading products...</div>}>
         <ProductContent />
      </Suspense>
      
      <Footer />
    </main>
  )
}

