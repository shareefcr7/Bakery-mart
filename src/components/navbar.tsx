"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Search, Heart } from "lucide-react"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useWishlist } from "@/context/wishlist-context"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const { items } = useWishlist()
  
  const wishlistCount = items.length

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-primary shadow-md">
      <div className="container mx-auto px-4 h-[100px] flex items-center justify-between">
        <Link href="/" className="h-full py-2 flex items-center">
          <Image 
            src="/logo-new.jpg" 
            alt="Bakery Mart" 
            width={280} 
            height={90} 
            className="h-[90px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white/80",
                pathname === link.href ? "text-white font-bold" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
           {/* Simple Search Trigger (Visual Only for now) */}
          
          <Link href="/products" className="text-white hover:text-white/80" aria-label="Search Products">
            <Search className="w-5 h-5" />
          </Link>

          <Link href="/wishlist" className="relative text-white hover:text-white/80 transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in">
                  {wishlistCount}
              </span>
            )}
          </Link>
          


          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden text-white w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay (Full Screen) */}
      {isOpen && (
        <div 
            className="fixed inset-0 top-0 left-0 w-screen h-screen z-[9999] bg-[#8B0000] text-white flex flex-col animate-in slide-in-from-right-10 duration-200 overflow-hidden"
            style={{ backgroundColor: "#8B0000", opacity: 1 }}
        >
            {/* Header Row */}
            <div className="flex items-center justify-between py-4 pr-5 pl-5 border-b border-white/20 bg-[#8B0000]">
                 {/* Left: Logo */}
                 <Link href="/" onClick={() => setIsOpen(false)} className="transition-opacity hover:opacity-80">
                    <Image 
                        src="/logo-new.jpg" 
                        alt="Bakery Mart" 
                        width={200} 
                        height={50} 
                        className="h-[50px] w-auto object-contain object-left"
                    />
                 </Link>

                 {/* Right: Close Button */}
                 <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center border border-white/50 rounded text-white hover:bg-white/10 transition-colors focus:outline-none"
                    aria-label="Close menu"
                 >
                    <X className="w-5 h-5" />
                 </button>
            </div>

            {/* Links Container */}
            <div className="flex flex-col items-start p-6 gap-6">
              {links.map((link) => (
                    <div key={link.href} className="w-full">
                        <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "text-lg font-bold text-white transition-colors hover:text-white/80 flex items-center justify-between group py-2",
                            pathname === link.href ? "underline decoration-2 underline-offset-4" : "text-white"
                        )}
                        >
                        {link.label === "Products" ? "Our Products" : link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-white"><path d="m6 9 6 6 6-6"/></svg>
                        </Link>
                    </div>
              ))}

              {/* Pink CTA */}
              <div className="mt-4 pt-4 w-full border-t border-white/20">
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-white font-bold text-lg hover:text-white/80 transition-colors flex items-center gap-2 group">
                    Start Custom Order
                    <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
        </div>
      )}
    </nav>
  )
}
