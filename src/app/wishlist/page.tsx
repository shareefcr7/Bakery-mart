"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/context/wishlist-context"
import { ProductCard } from "@/components/product-card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, HeartOff } from "lucide-react"

import Image from "next/image"

import { AnimatedHeading } from "@/components/ui/animated-heading"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <div className="bg-black py-12 mb-8 border-b border-white/10">
        <div className="container mx-auto px-4 text-center">
            <AnimatedHeading title="My Wishlist" textColor="text-white" />
            <p className="text-white/80 max-w-2xl mx-auto mt-4">Your saved items for future baking masterpieces.</p>
        </div>
      </div>

      {/* Crystal Clear Banner Image */}
      <div className="container mx-auto px-4 mb-12">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
                src="/wishlist-new-banner.png"
                alt="Bakersmart Wishlist"
                fill
                className="object-contain"
                quality={100}
                priority
            />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <HeartOff className="w-10 h-10 text-white/50" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Your wishlist is empty</h2>
                <p className="text-white/70 mb-8 max-w-md">
                    Seems like you haven't found anything yet. Browse our products and find the tools you need!
                </p>
                <Link 
                    href="/products" 
                    className="flex items-center gap-2 bg-white text-[#7E0806] px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
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
