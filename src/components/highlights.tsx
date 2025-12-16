"use client"

import { categoryData } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Highlights() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Shop By Collections</h2>
            <p className="text-sm md:text-base text-muted-foreground">Everything you need for your baking masterpieces.</p>
          </div>
          <Link href="/products" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryData.slice(0, 15).map((cat) => (
             <Link 
               key={cat.name} 
               href={`/products?category=${cat.name}`}
               className="group relative h-48 min-w-[200px] flex-shrink-0 snap-center md:min-w-0 md:snap-align-none rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
             >
               <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
               <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                  <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">{cat.name}</h3>
               </div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
