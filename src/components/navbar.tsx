"use client"
import logo from "@/assets/images/section-header-bg.png"

import * as React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search } from "lucide-react"

import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/locations", label: "Locations" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#7E0806] border-b border-white/20 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src={logo}
            alt="Bakers Mart"
            width={670}
            height={140}
            className="h-[80px] md:h-[80px] w-auto object-contain"
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
        <div className="flex items-center gap-4 h-full">
          {/* Search - Only show on Product Pages */}
          {pathname?.includes('/products') && (
            <div className="relative flex items-center">
              {!searchOpen ? (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="text-[#f3e5b5] hover:text-white transition-colors flex items-center justify-center" 
                  aria-label="Search Products"
                >
                  <Search className="w-5 h-5" />
                </button>
              ) : (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-48 px-3 py-1.5 text-sm rounded-md bg-white/10 border border-[#f3e5b5]/30 text-white placeholder:text-white/50 focus:outline-none focus:border-[#f3e5b5]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery("")
                    }}
                    className="text-[#f3e5b5] hover:text-white flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#f3e5b5] flex items-center justify-center"
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
