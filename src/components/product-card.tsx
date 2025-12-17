"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Product } from "@/lib/data"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  variant?: "dark" | "light"
}

export function ProductCard({ product, variant = "dark" }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)
  
  // Calculate discount percentage if original price existed (simulated)
  const priceValue = parseInt(product.price.replace(/[^0-9]/g, ""))
  const originalPrice = Math.round(priceValue * 1.2)
  const originalPriceStr = product.price.replace(/[0-9]+/, originalPrice.toString())

  const isLight = variant === "light"

  return (
    <motion.div 
      className="group relative h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Background with Glassmorphism */}
      <div className={cn(
        "absolute inset-0 backdrop-blur-sm rounded-2xl border shadow-lg transition-all duration-300 group-hover:shadow-xl",
        isLight 
            ? "bg-white border-neutral-200 group-hover:border-neutral-300 group-hover:shadow-black/5" 
            : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-[#7E0806]/10"
      )} />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Subtle overlay for contrast on hover */}
        <div className={cn(
            "absolute inset-0 transition-colors duration-300",
            isLight ? "bg-black/0 group-hover:bg-black/5" : "bg-black/0 group-hover:bg-black/20"
        )} />
        
        {/* Wishlist Button */}
        <button 
            onClick={(e) => {
                e.preventDefault()
                toggleWishlist(product)
            }}
            className={cn(
                "absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all z-10 group/btn",
                isLight
                    ? "bg-white/80 border-neutral-200 hover:bg-white text-neutral-600 hover:text-[#7E0806]"
                    : "bg-black/40 border-white/10 hover:bg-white text-white hover:text-[#7E0806]"
            )}
        >
            <Heart className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-[#7E0806] text-[#7E0806]" : "group-hover/btn:text-[#7E0806]")} />
        </button>

        {/* Hover Overlay Actions */}
        <div className={cn(
            "absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-3 justify-center items-end pb-6",
            isLight ? "bg-gradient-to-t from-white/90 to-transparent" : "bg-gradient-to-t from-black/90 to-transparent"
        )}>
            <Link 
              href={`/products/${product.id}`} 
              className={cn(
                  "px-6 py-2.5 text-sm font-bold rounded-full w-full text-center shadow-lg transform hover:scale-105 transition-all",
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
                "absolute top-3 left-3 px-3 py-1 text-[10px] font-bold tracking-wider rounded-full shadow-lg border",
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
        <div className="flex justify-between items-start mb-2">
            <p className={cn(
                "text-[10px] uppercase tracking-[0.15em] font-medium",
                isLight ? "text-neutral-500" : "text-[#f3e5b5]/60"
            )}>{product.category}</p>
            {/* Rating Stars (Static for now) */}
            <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                    <span key={i} className={cn("text-[10px]", isLight ? "text-yellow-500" : "text-[#f3e5b5]")}>★</span>
                ))}
            </div>
        </div>
        
        <h3 className={cn(
            "font-semibold text-lg leading-tight mb-3 transition-colors line-clamp-2 min-h-[3.5rem]",
            isLight ? "text-neutral-900 group-hover:text-[#7E0806]" : "text-white group-hover:text-[#f3e5b5]"
        )}>{product.name}</h3>
        
        <div className={cn(
            "mt-auto flex items-end justify-between border-t pt-4",
            isLight ? "border-neutral-100" : "border-white/10"
        )}>
            <div className="flex flex-col">
                <span className={cn(
                    "text-xs line-through mb-0.5",
                    isLight ? "text-neutral-400 decoration-neutral-400" : "text-white/40 decoration-white/40"
                )}>{originalPriceStr}</span>
                <span className={cn(
                    "font-bold text-xl",
                    isLight ? "text-[#7E0806]" : "text-[#f3e5b5]"
                )}>{product.price}</span>
            </div>
            {/* Add to Cart removed as per request */}
        </div>
      </div>
    </motion.div>
  )
}
