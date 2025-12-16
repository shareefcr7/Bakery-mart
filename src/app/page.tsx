import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Highlights } from "@/components/highlights"
import { BestSellers } from "@/components/best-sellers"
import { Testimonials } from "@/components/testimonials"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      
      <Highlights />

      <BestSellers />
      <Testimonials />
      <Footer />
    </main>
  )
}
