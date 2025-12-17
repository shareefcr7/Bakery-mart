"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Search, Heart, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useWishlist } from "@/context/wishlist-context"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const { items } = useWishlist()
  
  const wishlistCount = items.length

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled 
        ? "bg-[#7E0806]/95 backdrop-blur-md shadow-lg border-white/10 py-0" 
        : "bg-[#7E0806] border-white/20 py-2"
    )}>
      <div className={cn(
        "container mx-auto px-4 flex items-center justify-between transition-all duration-300",
        isScrolled ? "h-[70px]" : "h-[100px]"
      )}>
        <Link href="/" className="h-full py-1 flex items-center">
          <Image 
            src="/wishlist-new-banner.png" 
            alt="Bakery Mart" 
            width={300} 
            height={90} 
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-[50px] md:h-[70px]" : "h-[70px] md:h-[90px]"
            )}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative group py-2"
            >
              <span className={cn(
                "text-sm font-medium transition-colors group-hover:text-white",
                pathname === link.href ? "text-white font-bold" : "text-white/80"
              )}>
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-white"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
           {/* Simple Search Trigger (Visual Only for now) */}
          
          <Link href="/products" className="text-white hover:text-white/80 transition-transform hover:scale-110 duration-200" aria-label="Search Products">
            <Search className="w-5 h-5" />
          </Link>

          <Link href="/wishlist" className="relative text-white hover:text-white/80 transition-transform hover:scale-110 duration-200">
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
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay (Full Screen) */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-screen h-screen z-[9999] bg-[#7E0806] text-white flex flex-col overflow-hidden"
            style={{ backgroundColor: "#7E0806" }}
        >
            {/* Header Row */}
            <div className="flex items-center justify-between py-4 pr-5 pl-5 border-b border-white/20 bg-[#7E0806]">
                 {/* Left: Logo */}
                 <Link href="/" onClick={() => setIsOpen(false)} className="transition-opacity hover:opacity-80">
                    <Image 
                        src="/bakersmart-logo.jpg" 
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
              {links.map((link, i) => (
                    <motion.div 
                      key={link.href} 
                      className="w-full"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                        <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "text-xl font-bold text-white transition-colors hover:text-white/80 flex items-center justify-between group py-2",
                            pathname === link.href ? "underline decoration-2 underline-offset-4" : "text-white"
                        )}
                        >
                        {link.label === "Products" ? "Our Products" : link.label}
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </motion.div>
              ))}

              {/* CTA */}
              <motion.div 
                className="mt-4 pt-4 w-full border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/contact" onClick={() => setIsOpen(false)} className="text-white font-bold text-lg hover:text-white/80 transition-colors flex items-center gap-2 group">
                    Start Custom Order
                    <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  )
}
