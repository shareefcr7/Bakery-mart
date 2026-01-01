import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#7E0806] text-primary-foreground py-6 md:py-10 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-2 md:mb-4 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
              <Image
                src="/footer-bakersmart-logo-cream.png"
                alt="Bakersmart Logo"
                width={346}
                height={135}
                className="h-auto w-40 sm:w-48 md:w-64 object-contain transition-transform duration-300"
              />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Premium bakery supplies for professionals and home bakers. Elevating your baking artistry since 2024.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 md:mb-4 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 md:mb-4 text-primary-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-2 md:mb-4 text-primary-foreground">Connect</h4>
            <p className="text-primary-foreground/60 text-sm mb-4">Stay updated with our latest products and offers.</p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/bakers__mart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-primary-foreground/60 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 mt-4 md:mt-8 pt-4 md:pt-6 -mx-4 px-4 pb-2 md:pb-6">
        <div className="flex items-center justify-center">
          <p className="text-neutral-600 text-sm">© 2025 BAKERs MART. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  )
}
