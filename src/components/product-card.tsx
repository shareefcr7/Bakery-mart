"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/data"
import { cn, formatPrice } from "@/lib/utils"
import { useState, memo } from "react"

interface ProductCardProps {
  product: Product
  variant?: "dark" | "light"
  priority?: boolean
}

// Memoized component to prevent unnecessary re-renders
export const ProductCard = memo(function ProductCard({ 
  product, 
  variant = "dark", 
  priority = false 
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Calculate prices once
  const numericPrice = parseFloat(String(product.price).replace(/[^\d.]/g, "")) || 0
  const originalPriceVal = Math.round(numericPrice * 1.25)
  const formattedPrice = formatPrice(product.price)
  const formattedOriginalPrice = formatPrice(originalPriceVal)
  const isLight = variant === "light"

  return (
    <div className="group relative h-full flex flex-col hover:-translate-y-1 transition-transform duration-300 ease-out cursor-pointer">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full w-full relative z-10">
        {/* Card Background */}
        <div className={cn(
          "absolute inset-0 rounded-2xl border shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl",
          isLight 
            ? "bg-white border-neutral-200 group-hover:border-neutral-300 group-hover:shadow-neutral-200/50" 
            : "bg-[#111] border-white/5 group-hover:bg-[#1a1a1a] group-hover:border-white/20 group-hover:shadow-[#7E0806]/20"
        )} />

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-neutral-100/10">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            quality={75}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            )}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/images/placeholder.png"
              target.srcset = ""
            }}
          />
          
          {/* Overlay for contrast */}
          <div className={cn(
            "absolute inset-0 transition-colors duration-500 ease-in-out",
            isLight ? "bg-black/0 group-hover:bg-black/5" : "bg-black/0 group-hover:bg-black/20"
          )} />
          
          {/* Hover Overlay Actions */}
          <div className={cn(
            "absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-3 justify-center items-end pb-6",
            isLight ? "bg-gradient-to-t from-white/90 to-transparent" : "bg-gradient-to-t from-black/90 to-transparent"
          )}>
            <span 
              className={cn(
                "px-6 py-2.5 text-sm font-bold rounded-full w-full text-center shadow-lg",
                isLight 
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-black"
              )}
            >
              View Details
            </span>
          </div>
          
          {/* Best Seller Badge */}
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
        <div className="relative p-4 sm:p-5 flex-1 flex flex-col z-10 w-full">
          <div className="flex justify-between items-start mb-2 group/text">
            <p className={cn(
              "text-[10px] uppercase tracking-[0.15em] font-medium transition-colors duration-300",
              isLight ? "text-neutral-500 group-hover:text-neutral-900" : "text-[#f3e5b5]/60 group-hover:text-[#f3e5b5]"
            )}>
              {product.category === 'Uncategorized' || product.category === 'UNCATEGORIZED' ? 'General' : product.category}
            </p>
            {/* Rating Stars */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={cn(
                  "text-[10px] transition-opacity duration-300 group-hover:opacity-100 opacity-80",
                  isLight ? "text-yellow-500" : "text-[#f3e5b5]"
                )}>★</span>
              ))}
            </div>
          </div>
          
          <div className="min-h-[3rem] sm:min-h-[3.5rem] mb-2 sm:mb-3 flex items-start">
            <h3 className={cn(
              "font-semibold text-sm sm:text-base md:text-lg leading-tight transition-colors duration-300 line-clamp-2 break-words w-full",
              isLight ? "text-neutral-900 group-hover:text-[#7E0806]" : "text-white group-hover:text-[#f3e5b5]"
            )}>
              {product.name}
            </h3>
          </div>
          
          <div className={cn(
            "mt-auto flex items-end justify-between border-t pt-4 transition-colors duration-500",
            isLight ? "border-neutral-100 group-hover:border-neutral-200" : "border-white/10 group-hover:border-white/20"
          )}>
            <div className="flex flex-col">
              <span className={cn(
                "text-xs line-through mb-0.5 transition-colors duration-300",
                isLight ? "text-neutral-400 decoration-neutral-400 group-hover:text-neutral-500" : "text-white/40 decoration-white/40 group-hover:text-white/60"
              )}>
                {formattedOriginalPrice}
              </span>
              <span className={cn(
                "font-bold text-xl transition-all duration-300 group-hover:scale-105 origin-left",
                isLight ? "text-[#7E0806]" : "text-[#f3e5b5]"
              )}>
                {formattedPrice}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
})
