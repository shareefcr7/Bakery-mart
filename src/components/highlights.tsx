"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function Highlights() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] md:h-screen overflow-hidden bg-black">
        <motion.div 
            style={{ scale, opacity, y }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
        >
            <Image
                src="/bakersmart-banner.jpg"
                alt="Bakersmart Premium Collection"
                fill
                className="object-cover object-center"
                priority
                quality={100}
                sizes="100vw"
            />
        </motion.div>
        
        {/* Premium Overlay Gradient - Reduced for clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />

        {/* Optional Scroll Hint for Desktop */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/70"
        >
            <span className="text-[10px] uppercase tracking-[0.3em]">Discover</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
    </section>
  )
}
