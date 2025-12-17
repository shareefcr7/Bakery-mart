"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedHeadingProps {
  title: string
  className?: string
  textColor?: string
}

export function AnimatedHeading({ title, className, textColor = "text-foreground" }: AnimatedHeadingProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 md:gap-8 overflow-hidden py-4", className)}>
      {/* Left Logo */}
      <motion.div
        initial={{ x: -100, opacity: 0, rotate: -180 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
        className="relative w-[100px] h-[70px] md:w-[120px] md:h-[90px] flex-shrink-0"
      >
        <Image
          src="/wishlist-new-banner.png"
          alt="Bakersmart Logo"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Title */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className={cn("text-3xl md:text-5xl font-bold text-center tracking-tight", textColor)}
      >
        {title}
      </motion.h1>

      {/* Right Logo */}
      <motion.div
        initial={{ x: 100, opacity: 0, rotate: 180 }}
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
        className="relative w-[100px] h-[70px] md:w-[120px] md:h-[90px] flex-shrink-0"
      >
        <Image
          src="/wishlist-new-banner.png"
          alt="Bakersmart Logo"
          fill
          className="object-contain"
        />
      </motion.div>
    </div>
  )
}
