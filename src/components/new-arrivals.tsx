"use client"

import { ProductCard } from "./product-card"
import { motion } from "framer-motion"
import { AnimatedHeading } from "./ui/animated-heading"

import { IProduct } from "@/lib/db"

interface NewArrivalsProps {
  products?: IProduct[];
}

export function NewArrivals({ products = [] }: NewArrivalsProps) {
  const newArrivals = products.slice(0, 4)

  return (
    <section className="py-20 bg-neutral-900 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedHeading 
            title="New Arrivals" 
            className="text-[#f3e5b5]"
            iconSrc="/best-sellers-logo.png" 
          />
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4">
            Fresh out of the oven! Check out our latest additions to the store.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <ProductCard product={product} priority={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
