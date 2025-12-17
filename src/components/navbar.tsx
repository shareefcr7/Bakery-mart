"use client"
import logo from "@/assets/images/section-header-bg.png"

import * as React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Search, Heart } from "lucide-react"

import { cn } from "@/lib/utils"
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
    <nav className="sticky top-0 z-50 w-full bg-[#7E0806] border-b border-white/20 shadow-md">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src={logo}
            alt="Bakers Mart"
            width={600}
            height={120}
            className="h-32 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                pathname === link.href ? "text-[#f3e5b5] font-bold" : "text-[#f3e5b5]/80"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Link href="/products" className="text-[#f3e5b5] hover:text-white transition-colors" aria-label="Search Products">
            <Search className="w-5 h-5" />
          </Link>

          <Link href="/wishlist" className="relative text-[#f3e5b5] hover:text-white transition-colors">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#f3e5b5] text-[#7E0806] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#f3e5b5]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#7E0806] border-t border-white/20">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium py-2 transition-colors",
                  pathname === link.href ? "text-[#f3e5b5] font-bold" : "text-[#f3e5b5]/80 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
