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

  return (
    <motion.div 
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all h-full flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button 
            onClick={(e) => {
                e.preventDefault()
                toggleWishlist(product)
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background text-foreground shadow-sm transition-all z-10"
        >
            <Heart className={cn("w-4 h-4 transition-colors", isWishlisted ? "fill-primary text-primary" : "text-muted-foreground")} />
        </button>

        {/* Hover Overlay Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/80 backdrop-blur-sm flex gap-2 justify-center">
            <Link 
              href={`/products/${product.id}`} 
              className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors w-full text-center"
            >
                View Details
            </Link>
        </div>
        
        {product.isBestSeller && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded">
                BEST SELLER
            </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-semibold text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between">
            <span className="font-bold text-lg text-primary">{product.price}</span>
        </div>
      </div>
    </motion.div>
  )
}
