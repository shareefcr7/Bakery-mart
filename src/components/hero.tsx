"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { AnimatedHeading } from "@/components/ui/animated-heading"
import { FadeIn } from "@/components/ui/fade-in"

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg-final-v2.jpg"
          alt="Premium Red Velvet Cake"
          fill
          className="object-cover scale-105 animate-slow-zoom" 
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        

      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          {/* Main Heading */}
          {/* Main Heading - Shade In & Transparent Look */}
          <FadeIn delay={0.4}>
            <h1 
              className="text-5xl md:text-7xl lg:text-9xl font-bold text-white/90 mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl mix-blend-overlay"
            >
              Taste the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5b5]" style={{ fontFamily: 'Playfair Display, serif' }}>Luxury</span> <br />
              in Every Bite
            </h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p 
              className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            >
              Experience the finest selection of handcrafted cakes and pastries, 
              baked with passion and perfected for your special moments.
            </p>
          </FadeIn>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link 
              href="/products" 
              className="group relative px-10 py-5 bg-[#7E0806] text-white font-bold text-xl rounded-full overflow-hidden shadow-lg shadow-[#7E0806]/30 transition-all hover:scale-105 hover:shadow-[#7E0806]/50 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Menu
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a1c2e] to-[#7E0806] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/about" 
              className="px-10 py-5 bg-transparent border border-white/30 text-white font-semibold text-xl rounded-full hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm w-full sm:w-auto"
            >
              Our Heritage
            </Link>
          </motion.div>
        </motion.div>
      </div>

        {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  )
}
