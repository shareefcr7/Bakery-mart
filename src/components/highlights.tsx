"use client"

import { categoryData } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Highlights() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-secondary-foreground">Shop By Collections</h2>
            <p className="text-sm md:text-base text-secondary-foreground/80">Everything you need for your baking masterpieces.</p>
          </div>
          <Link href="/products" className="text-secondary-foreground font-semibold flex items-center gap-2 hover:gap-3 transition-all hover:text-white">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryData.slice(0, 15).map((cat) => (
             <Link 
               key={cat.name} 
               href={`/products?category=${cat.name}`}
               className="group relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
             >
               <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
               <div className="absolute inset-0 flex items-end justify-center p-6 text-center">
                  <h3 className="text-white font-bold text-2xl tracking-tight drop-shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">{cat.name}</h3>
               </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
