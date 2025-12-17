"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/context/wishlist-context"
import { ProductCard } from "@/components/product-card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, HeartOff } from "lucide-react"

import Image from "next/image"



export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <main className="min-h-screen bg-black text-[#f3e5b5]">
      <Navbar />
      
      {/* 1st Section: Header */}
      <div className="bg-black py-12 mb-8 border-b border-[#f3e5b5]/10">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-[#f3e5b5]">Your Wishlist</h1>
            <p className="text-[#f3e5b5]/60 mb-8">You haven&apos;t added any items to your wishlist yet.</p>
        </div>
      </div>

      {/* 2nd Section: Wishlist Products */}
      <div className="container mx-auto px-4 pb-20">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                    <HeartOff className="w-10 h-10 text-white/50" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Your wishlist is empty</h2>
                <p className="text-white/70 mb-8 max-w-md">
                    Seems like you haven&apos;t found anything yet. Browse our products and find the tools you need!
                </p>
                <Link 
                    href="/products" 
                    className="flex items-center gap-2 bg-white text-[#7E0806] px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
                >
                    Start Shopping <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

      {/* 3rd Section: Banner Image with White Background */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8">
            {/* Left Logo */}
            <div className="hidden md:block w-[116px] h-[116px] relative flex-shrink-0 animate-float">
              <Image
                src="/section-heading-red-white.png"
                alt="Logo"
                fill
                className="object-contain transition-transform duration-500 hover:scale-110 hover:rotate-12"
              />
            </div>

            {/* Banner Image with Hover Effects */}
            <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src="/wishlist-new-banner.png"
                  alt="Bakersmart Wishlist"
                  fill
                  className="object-contain transition-all duration-700 group-hover:brightness-110"
                  quality={100}
                  priority
                />
              </div>
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            </div>

            {/* Right Logo */}
            <div className="hidden md:block w-[116px] h-[116px] relative flex-shrink-0 animate-float" style={{animationDelay: '0.5s'}}>
              <Image
                src="/section-heading-red-white.png"
                alt="Logo"
                fill
                className="object-contain transition-transform duration-500 hover:scale-110 hover:-rotate-12"
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
