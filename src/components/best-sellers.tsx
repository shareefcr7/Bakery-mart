"use client"

import { ProductCard } from "./product-card"
import { products } from "@/lib/data"
import { motion } from "framer-motion"

export function BestSellers() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-sans text-foreground">Best Sellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most popular tools and ingredients, trusted by professional bakers.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-4 md:gap-6 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[220px] sm:min-w-0 flex-shrink-0 snap-start h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
