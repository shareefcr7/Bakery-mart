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
}

export function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const isWishlisted = isInWishlist(product.id)
  
  // Calculate discount percentage if original price existed (simulated)
  const priceValue = parseInt(product.price.replace(/[^0-9]/g, ""))
  const originalPrice = Math.round(priceValue * 1.2)
  const originalPriceStr = product.price.replace(/[0-9]+/, originalPrice.toString())

  return (
    <motion.div 
      className="group relative h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Background with Glassmorphism */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-xl group-hover:shadow-[#7E0806]/10" />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Dark subtle overlay for contrast on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Wishlist Button */}
        <button 
            onClick={(e) => {
                e.preventDefault()
                toggleWishlist(product)
            }}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white text-white hover:text-[#7E0806] shadow-lg transition-all z-10 group/btn"
        >
            <Heart className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-[#7E0806] text-[#7E0806]" : "text-white group-hover/btn:text-[#7E0806]")} />
        </button>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent flex gap-3 justify-center items-end pb-6">
            <Link 
              href={`/products/${product.id}`} 
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-[#f3e5b5] transition-colors w-full text-center shadow-lg transform hover:scale-105"
            >
                View Details
            </Link>
        </div>
        
        {product.isBestSeller && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#7E0806] text-white text-[10px] font-bold tracking-wider rounded-full shadow-lg border border-white/10">
                BEST SELLER
            </div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative p-5 flex-1 flex flex-col z-10">
        <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#f3e5b5]/60 font-medium">{product.category}</p>
            {/* Rating Stars (Static for now) */}
            <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                    <span key={i} className="text-[#f3e5b5] text-[10px]">★</span>
                ))}
            </div>
        </div>
        
        <h3 className="font-semibold text-lg text-white leading-tight mb-3 group-hover:text-[#f3e5b5] transition-colors line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        
        <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-4">
            <div className="flex flex-col">
                <span className="text-xs text-white/40 line-through decoration-white/40 mb-0.5">{originalPriceStr}</span>
                <span className="font-bold text-xl text-[#f3e5b5]">{product.price}</span>
            </div>
            {/* Add to Cart removed as per request */}
        </div>
      </div>
    </motion.div>
  )
}
