import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { memo } from "react"

const FOOTER_LINKS = {
  quick: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop All" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Shipping Info" },
    { href: "#", label: "Returns" },
  ],
  social: [
    { href: "https://www.instagram.com/bakers__mart", label: "Instagram", Icon: Instagram },
    { href: "#", label: "Facebook", Icon: Facebook },
    { href: "#", label: "Twitter", Icon: Twitter },
  ],
}

// Memoized link group component
const LinkGroup = memo(function LinkGroup({ 
  title, 
  links 
}: { 
  title: string, 
  links: Array<{ href: string, label: string }> 
}) {
  return (
    <div>
      <h4 className="font-bold mb-2 md:mb-4 text-primary-foreground">{title}</h4>
      <ul className="space-y-2 text-sm text-primary-foreground/60">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-[#7E0806] text-primary-foreground py-6 md:py-10 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-2 md:mb-4 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
              <Image
                src="/footer-bakersmart-logo-cream.png"
                alt="Bakersmart Logo"
                width={346}
                height={135}
                quality={75}
                className="h-auto w-40 sm:w-48 md:w-64 object-contain transition-transform duration-300"
              />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Premium bakery supplies for professionals and home bakers. Elevating your baking artistry since 2024.
            </p>
          </div>
          
          {/* Quick Links */}
          <LinkGroup title="Quick Links" links={FOOTER_LINKS.quick} />

          {/* Legal Links */}
          <LinkGroup title="Legal" links={FOOTER_LINKS.legal} />

          {/* Social Section */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-2 md:mb-4 text-primary-foreground">Connect</h4>
            <p className="text-primary-foreground/60 text-sm mb-4">Stay updated with our latest products and offers.</p>
            <div className="flex gap-4">
              {FOOTER_LINKS.social.map(({ href, label, Icon }) => (
                <Link 
                  key={label}
                  href={href} 
                  target={href.includes("instagram") ? "_blank" : undefined}
                  rel={href.includes("instagram") ? "noopener noreferrer" : undefined}
                  className="text-primary-foreground/60 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-neutral-200 mt-4 md:mt-8 pt-4 md:pt-6 -mx-4 px-4 pb-2 md:pb-6">
          <div className="flex items-center justify-center">
            <p className="text-neutral-600 text-sm">© 2025 BAKERs MART. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
})
