"use client"

import logo from "@/assets/images/section-header-bg.png"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

// Memoized nav links to prevent recreation on every render
type NavLink = {
  href: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

// Memoize NavLink component
const NavLinkComponent = React.memo(({ link, isActive }: { link: NavLink, isActive: boolean }) => (
  <Link
    href={link.href}
    className={cn(
      "text-sm font-medium transition-all duration-200 relative py-1 hover:text-white",
      isActive ? "text-[#f3e5b5] font-bold" : "text-[#f3e5b5]/85"
    )}
  >
    {link.label}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f3e5b5] rounded-full" />
    )}
  </Link>
))

NavLinkComponent.displayName = "NavLink"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Use useCallback to memoize scroll handler
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Memoize search handler
  const handleSearch = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }, [searchQuery, router])

  // Memoize menu toggle
  const toggleMenu = React.useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeSearch = React.useCallback(() => {
    setSearchOpen(false)
    setSearchQuery("")
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-white/15",
      isScrolled 
        ? "bg-[#7E0806]/95 backdrop-blur-md shadow-xl py-2 sm:py-2.5" 
        : "bg-[#7E0806] shadow-md py-3 sm:py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image 
            src={logo}
            alt="Bakers Mart - Premium Bakery Supplies"
            width={670}
            height={140}
            className={cn(
              "w-auto object-contain transition-all duration-300",
              isScrolled ? "h-[55px] sm:h-[65px]" : "h-[65px] sm:h-[80px]"
            )}
            priority
            quality={75}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLinkComponent 
              key={link.href} 
              link={link} 
              isActive={pathname === link.href} 
            />
          ))}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search - Only show on Product Pages */}
          {pathname?.includes('/products') && (
            <div className="relative flex items-center">
              {!searchOpen ? (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="text-[#f3e5b5] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" 
                  aria-label="Search Products"
                >
                  <Search className="w-5 h-5" />
                </button>
              ) : (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-40 sm:w-48 px-3 py-1.5 text-sm rounded-md bg-white/10 border border-[#f3e5b5]/30 text-white placeholder:text-white/50 focus:outline-none focus:border-[#f3e5b5]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="text-[#f3e5b5] hover:text-white p-1"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#f3e5b5] hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[#7E0806]/98 backdrop-blur-lg border-t border-white/20" aria-label="Mobile navigation">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium px-4 py-2.5 rounded-lg transition-colors",
                  pathname === link.href 
                    ? "text-[#f3e5b5] bg-white/10 font-bold" 
                    : "text-[#f3e5b5]/85 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
