"use client"

import { ProductCard } from "./product-card"
import { products } from "@/lib/data"
import { motion } from "framer-motion"
import { AnimatedHeading } from "./ui/animated-heading"

export function BestSellers() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedHeading 
            title="Best Sellers" 
            className="text-neutral-900"
          />
          <p className="text-neutral-600 max-w-2xl mx-auto mt-4">
            Our most popular tools and ingredients, trusted by professional bakers.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <ProductCard product={product} variant="light" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
