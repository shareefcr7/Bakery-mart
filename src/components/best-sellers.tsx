"use client"

import { ProductCard } from "./product-card"
import { AnimatedHeading } from "./ui/animated-heading"
import { IProduct } from "@/lib/db"
import { memo } from "react"

interface BestSellersProps {
  products?: IProduct[]
}

export const BestSellers = memo(function BestSellers({ products = [] }: BestSellersProps) {
  const bestSellers = products.slice(0, 4)

  return (
    <section className="py-20 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedHeading 
            title="Best Sellers" 
            className="text-[#7E0806]"
            iconSrc="/best-sellers-logo.png"
          />
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4">
            Our most popular tools and ingredients, trusted by professional bakers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} priority={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})
