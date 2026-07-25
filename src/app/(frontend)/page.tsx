import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { BestSellers } from "@/components/best-sellers"
import { Testimonials } from "@/components/testimonials"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShopByCollections } from "@/components/shop-by-collections"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { NewArrivals } from "@/components/new-arrivals"
import { getCategories, getProducts } from "@/lib/db"
import { IProduct, ICategory } from "@/lib/db"

// ===== PERFORMANCE: Enable ISR (Incremental Static Regeneration) =====
// Revalidate every 1 hour (3600 seconds) instead of force-dynamic
export const revalidate = 3600

// ===== PERFORMANCE: Metadata optimization =====
export const metadata = {
  title: "BAKERs MART | Premium Bakery Supplies & Baking Tools",
  description: "Your one-stop shop for premium baking tools, ingredients, and accessories. Fast delivery, expert guidance. Explore our collection of professional baking equipment.",
}

export default async function Home() {
  try {
    const categories = (await getCategories()) as ICategory[]
    const allProducts = (await getProducts()) as IProduct[]
    
    const bestSellers = allProducts.filter(p => p.isBestSeller)
    const newArrivals = allProducts.filter(p => p.isNewProduct)

    return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <Hero />
        
        <ScrollReveal variant="fadeUp" delay={0.1} className="w-full">
          <ShopByCollections categories={categories} />
        </ScrollReveal>

        {/* New Arrivals Section */}
        {newArrivals.length > 0 && (
          <ScrollReveal variant="fadeUp" delay={0.1} className="w-full">
            <NewArrivals products={newArrivals} />
          </ScrollReveal>
        )}
        
        <ScrollReveal variant="fadeUp" delay={0.1} className="w-full">
          <Features />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1} className="w-full">
          <BestSellers products={bestSellers} />
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.1} className="w-full">
          <Testimonials />
        </ScrollReveal>
        
        <Footer />
      </main>
    )
  } catch (error) {
    console.error("Home page error:", error)
    // Return error boundary component if needed
    return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <Hero />
        <div className="flex items-center justify-center h-64 text-foreground">
          <p>Failed to load products. Please refresh the page.</p>
        </div>
        <Footer />
      </main>
    )
  }
}
