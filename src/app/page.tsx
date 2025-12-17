import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Highlights } from "@/components/highlights"
import { BestSellers } from "@/components/best-sellers"
import { Testimonials } from "@/components/testimonials"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShopByCollections } from "@/components/shop-by-collections"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ShopByCollections />
      <Features />

      <BestSellers />
      <Testimonials />
      <Footer />
    </main>
  )
}
