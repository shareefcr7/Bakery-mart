"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/context/wishlist-context"
import { ProductCard } from "@/components/product-card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, HeartOff } from "lucide-react"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="bg-primary/5 py-12 mb-8">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">My Wishlist</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Your saved items for future baking masterpieces.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <HeartOff className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Seems like you haven't found anything yet. Browse our products and find the tools you need!
                </p>
                <Link 
                    href="/products" 
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                    Start Shopping <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {items.map(product => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )}
      </div>
      
      <Footer />
    </main>
  )
}
