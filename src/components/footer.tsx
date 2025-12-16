import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-background/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">BAKERs MART</h3>
            <p className="text-background/60 text-sm leading-relaxed">
              Premium bakery supplies for professionals and home bakers. Elevating your baking artistry since 2024.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-background">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-background">Legal</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-background">Connect</h4>
            <p className="text-background/60 text-sm mb-4">Stay updated with our latest products and offers.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-background/60 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="text-background/60 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          © {new Date().getFullYear()} BAKERs MART. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
