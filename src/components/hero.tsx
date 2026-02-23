"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950">
      {/* Background Image - Bakersmart Cake */}
      <div className="absolute inset-0 z-0 bg-[#8B0000]">
        <Image
          src="/hero-bakersmart-cake.png"
          alt="Bakersmart Red Velvet Cake"
          fill
          className="object-contain object-top md:object-cover md:object-center" 
          priority
          quality={100}
        />
        {/* Premium Gradient Overlay - Responsive for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 md:from-black/65 md:via-black/35 lg:from-black/60 lg:via-black/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
      </div>



      {/* Content - Optimized Text Position */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-24 md:pb-0 md:justify-center md:items-start text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0 md:ml-8 lg:ml-16">

          <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-[#7E0806] to-amber-600 rounded-full mb-6 max-md:mx-auto md:mb-8 shadow-lg shadow-[#7E0806]/50" />

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mb-8 md:mb-10 font-light leading-relaxed drop-shadow-lg mx-auto md:mx-0 px-2 sm:px-4 md:px-0">
            Experience the finest selection of handcrafted cakes and pastries, 
            baked with passion and perfected for your special moments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start items-center sm:items-stretch">
            <Link 
              href="/products" 
              className="group relative px-8 py-4 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-gradient-to-r from-[#7E0806] to-[#9a1a18] text-white font-bold text-sm sm:text-base md:text-lg rounded-full overflow-hidden shadow-2xl shadow-[#7E0806]/40 transition-[transform,shadow] hover:scale-105 hover:shadow-[#7E0806]/60 border border-white/10 text-center w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                Explore Collection
                <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#9a1a18] to-[#7E0806] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/about" 
              className="px-8 py-4 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-white/5 border-2 border-white/30 text-white font-semibold text-sm sm:text-base md:text-lg rounded-full hover:bg-white/15 hover:border-white/60 transition-colors backdrop-blur-md shadow-xl text-center w-full sm:w-auto"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

        {/* Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:flex absolute bottom-12 left-8 md:left-16 z-20 text-white/70 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] rotate-[-90deg] translate-y-8 origin-left w-24 text-right">Scroll Down</span>
        <div className="h-24 w-[1px] bg-gradient-to-b from-white/0 via-white/70 to-white/0 mt-12" />
      </div>
    </section>
  )
}
