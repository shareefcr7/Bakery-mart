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

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = (await getCategories()) as ICategory[];
  const allProducts = (await getProducts()) as IProduct[];
  
  const bestSellers = allProducts.filter(p => p.isBestSeller);
  const newArrivals = allProducts.filter(p => p.isNewProduct);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      
      <ScrollReveal variant="fadeUrl" delay={0.2} className="w-full">
        <ShopByCollections categories={categories} />
      </ScrollReveal>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <ScrollReveal variant="fadeUrl" delay={0.2} className="w-full">
          <NewArrivals products={newArrivals} />
        </ScrollReveal>
      )}
      
      <ScrollReveal variant="fadeLeft" delay={0.2} className="w-full">
        <Features />
      </ScrollReveal>

      <ScrollReveal variant="fadeRight" delay={0.2} className="w-full">
        <BestSellers products={bestSellers} />
      </ScrollReveal>

      <ScrollReveal variant="zoomIn" delay={0.2} className="w-full">
        <Testimonials />
      </ScrollReveal>
      
      <Footer />
    </main>
  )
}
