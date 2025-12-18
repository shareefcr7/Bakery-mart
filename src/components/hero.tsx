"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/ui/fade-in"

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950">
      {/* Background Image - 8K Premium */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg-premium-red.jpg"
          alt="Premium Cake Showcase"
          fill
          className="object-cover scale-105 animate-slow-zoom" 
          priority
          quality={100}
        />
        {/* Premium Gradient Overlay - Optimized for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>



      {/* Content - Optimized Text Position */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="max-w-2xl ml-0 md:ml-8 lg:ml-16 mt-24"
        >


          <FadeIn delay={0.8}>
            <div className="h-1 w-24 bg-gradient-to-r from-[#7E0806] to-amber-600 rounded-full mb-8 shadow-lg shadow-[#7E0806]/50" />
          </FadeIn>

          <FadeIn delay={0.9}>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 font-light leading-relaxed drop-shadow-lg">
              Experience the finest selection of handcrafted cakes and pastries, 
              baked with passion and perfected for your special moments.
            </p>
          </FadeIn>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link 
              href="/products" 
              className="group relative px-12 py-5 bg-gradient-to-r from-[#7E0806] to-[#9a1a18] text-white font-bold text-lg rounded-full overflow-hidden shadow-2xl shadow-[#7E0806]/40 transition-all hover:scale-105 hover:shadow-[#7E0806]/60 border border-white/10"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Explore Collection
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9a1a18] to-[#7E0806] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/about" 
              className="px-12 py-5 bg-white/5 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/15 hover:border-white/60 transition-all backdrop-blur-md shadow-xl"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>

        {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-8 md:left-16 z-20 text-white/70 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] rotate-[-90deg] translate-y-8 origin-left w-24 text-right">Scroll Down</span>
        <div className="h-24 w-[1px] bg-gradient-to-b from-white/0 via-white/70 to-white/0 mt-12" />
      </motion.div>
    </section>
  )
}
