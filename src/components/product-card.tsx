"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Product } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  variant?: "dark" | "light"
}

export function ProductCard({ product, variant = "dark", priority = false }: ProductCardProps & { priority?: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Calculate discount percentage if original price existed (simulated)
  const priceValue = parseInt(product.price.replace(/[^0-9]/g, ""))
  const originalPrice = Math.round(priceValue * 1.2)
  const originalPriceStr = product.price.replace(/[0-9]+/, originalPrice.toString())

  const isLight = variant === "light"

  return (
    <motion.div 
      className="group relative h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Card Background with Glassmorphism */}
      <div className={cn(
        "absolute inset-0 backdrop-blur-sm rounded-2xl border shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl",
        isLight 
            ? "bg-white border-neutral-200 group-hover:border-neutral-300 group-hover:shadow-neutral-200/50" 
            : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[#7E0806]/20"
      )} />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-neutral-100/10">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className={cn(
            "object-cover transition-all duration-700 ease-out group-hover:scale-110",
            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg scale-105"
          )}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.png";
            target.srcset = "";
            setImageLoaded(true); // Ensure it fades in
          }}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Subtle overlay for contrast on hover */}
        <div className={cn(
            "absolute inset-0 transition-colors duration-500 ease-in-out",
            isLight ? "bg-black/0 group-hover:bg-black/5" : "bg-black/0 group-hover:bg-black/20"
        )} />
        
        {/* Hover Overlay Actions */}
        <div className={cn(
            "absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex gap-3 justify-center items-end pb-6",
            isLight ? "bg-gradient-to-t from-white/90 to-transparent" : "bg-gradient-to-t from-black/90 to-transparent"
        )}>
            <Link 
              href={`/products/${product.id}`} 
              className={cn(
                  "px-6 py-2.5 text-sm font-bold rounded-full w-full text-center shadow-lg transform hover:scale-105 transition-all duration-300 active:scale-95",
                  isLight 
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "bg-white text-black hover:bg-[#f3e5b5]"
              )}
            >
                View Details
            </Link>
        </div>
        
        {product.isBestSeller && (
            <div className={cn(
                "absolute top-3 left-3 px-3 py-1 text-[10px] font-bold tracking-wider rounded-full shadow-lg border transition-transform duration-300 group-hover:scale-105",
                isLight 
                    ? "bg-[#7E0806] text-white border-transparent"
                    : "bg-[#7E0806] text-white border-white/10"
            )}>
                BEST SELLER
            </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative p-5 flex-1 flex flex-col z-10">
        <div className="flex justify-between items-start mb-2 group/text">
            <p className={cn(
                "text-[10px] uppercase tracking-[0.15em] font-medium transition-colors duration-300",
                isLight ? "text-neutral-500 group-hover:text-neutral-900" : "text-[#f3e5b5]/60 group-hover:text-[#f3e5b5]"
            )}>{product.category}</p>
            {/* Rating Stars (Static for now) */}
            <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                    <span key={i} className={cn("text-[10px] transition-opacity duration-300 group-hover:opacity-100 opacity-80", isLight ? "text-yellow-500" : "text-[#f3e5b5]")}>★</span>
                ))}
            </div>
        </div>
        
        <h3 className={cn(
            "font-semibold text-lg leading-tight mb-3 transition-colors duration-300 line-clamp-2 min-h-[3.5rem] group-hover:translate-x-1 transition-transform ease-out",
            isLight ? "text-neutral-900 group-hover:text-[#7E0806]" : "text-white group-hover:text-[#f3e5b5]"
        )}>{product.name}</h3>
        
        <div className={cn(
            "mt-auto flex items-end justify-between border-t pt-4 transition-colors duration-500",
            isLight ? "border-neutral-100 group-hover:border-neutral-200" : "border-white/10 group-hover:border-white/20"
        )}>
            <div className="flex flex-col">
                <span className={cn(
                    "text-xs line-through mb-0.5 transition-colors duration-300",
                    isLight ? "text-neutral-400 decoration-neutral-400 group-hover:text-neutral-500" : "text-white/40 decoration-white/40 group-hover:text-white/60"
                )}>{originalPriceStr}</span>
                <span className={cn(
                    "font-bold text-xl transition-all duration-300 group-hover:scale-105 origin-left",
                    isLight ? "text-[#7E0806]" : "text-[#f3e5b5]"
                )}>{product.price}</span>
            </div>
        </div>
      </div>
    </motion.div>
  )
}
