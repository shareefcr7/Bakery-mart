"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedHeadingProps {
  title: string
  className?: string
  textColor?: string
  showLeftIcon?: boolean
  showRightIcon?: boolean
  iconSrc?: string
}

export function AnimatedHeading({ 
  title, 
  className, 
  textColor = "text-foreground",
  showLeftIcon = true,
  showRightIcon = true,
  iconSrc = "/section-heading-red-white.png"
}: AnimatedHeadingProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3 sm:gap-6 md:gap-8 overflow-hidden py-4", className)}>
      {/* Left Logo */}
      {showLeftIcon && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-[100px] h-[80px] sm:w-[140px] sm:h-[110px] md:w-[180px] md:h-[130px] flex-shrink-0"
      >
        <Image
          src={iconSrc}
          alt="Bakersmart Logo"
          fill
          className="object-contain"
        />
      </motion.div>
      )}

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className={cn("text-2xl sm:text-3xl md:text-5xl font-bold text-center tracking-tight", textColor)}
      >
        {title}
      </motion.h1>

      {/* Right Logo */}
      {showRightIcon && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-[100px] h-[80px] sm:w-[140px] sm:h-[110px] md:w-[180px] md:h-[130px] flex-shrink-0"
      >
        <Image
          src={iconSrc}
          alt="Bakersmart Logo"
          fill
          className="object-contain"
        />
      </motion.div>
      )}
    </div>
  )
}
