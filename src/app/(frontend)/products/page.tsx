import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductList } from "@/components/product-list"
import { getProducts } from "@/lib/db"
import { AnimatedHeading } from "@/components/ui/animated-heading"
import { ProductGridSkeleton } from "@/components/skeletons"

// Force dynamic to ensure data is fresh
export const dynamic = 'force-dynamic'

// Async component to fetch data
async function ProductGrid() {
  const products = await getProducts()
  return <ProductList initialProducts={products} />
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-32">
        <div className="container mx-auto px-4 pb-20">
          <AnimatedHeading 
            title="Our Premium Collection"
            className="mb-12 text-[#7E0806]"
          />
          
          <Suspense fallback={<ProductGridSkeleton />}>
             <ProductGrid />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
