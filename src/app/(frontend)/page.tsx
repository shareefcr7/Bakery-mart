import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { BestSellers } from "@/components/best-sellers"
import { Testimonials } from "@/components/testimonials"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShopByCollections } from "@/components/shop-by-collections"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      
      <ScrollReveal variant="fadeUrl" delay={0.2} className="w-full">
        <ShopByCollections />
      </ScrollReveal>
      
      <ScrollReveal variant="fadeLeft" delay={0.2} className="w-full">
        <Features />
      </ScrollReveal>

      <ScrollReveal variant="fadeRight" delay={0.2} className="w-full">
        <BestSellers />
      </ScrollReveal>

      <ScrollReveal variant="zoomIn" delay={0.2} className="w-full">
        <Testimonials />
      </ScrollReveal>
      
      <Footer />
    </main>
  )
}
