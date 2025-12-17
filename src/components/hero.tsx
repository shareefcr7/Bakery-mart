"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { FadeIn } from "@/components/ui/fade-in"

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg-final-v3.png"
          alt="Premium Red Velvet Cake"
          fill
          className="object-cover scale-105 animate-slow-zoom" 
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        

      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left h-full flex flex-col justify-end pb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-3xl mx-auto md:mx-0 md:pl-8 lg:pl-16 pt-12"
        >
          {/* Main Heading */}
          {/* Main Heading Removed */}

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-wide drop-shadow-lg">
            Premium Bakery
          </h2>

          <FadeIn delay={0.6}>
            <p 
              className="text-base md:text-lg text-white/90 max-w-xl mx-auto md:mx-0 mb-8 font-light leading-relaxed drop-shadow-md"
            >
              Experience the finest selection of handcrafted cakes and pastries, 
              baked with passion and perfected for your special moments.
            </p>
          </FadeIn>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link 
              href="/products" 
              className="group relative px-10 py-4 bg-[#7E0806] text-white font-bold text-lg rounded-full overflow-hidden shadow-lg shadow-[#7E0806]/30 transition-all hover:scale-105 hover:shadow-[#7E0806]/50 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Menu
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a1c2e] to-[#7E0806] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/about" 
              className="px-10 py-4 bg-transparent border border-white/40 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white/80 transition-all backdrop-blur-sm w-full sm:w-auto"
            >
              Our Heritage
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
