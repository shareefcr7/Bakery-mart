import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Product } from "@/lib/data"
import { getProductById, getProducts } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Check, Mail, Share2, Search } from "lucide-react"
import { ProductCard } from "@/components/product-card"

// Removing generateStaticParams to allow dynamic rendering for new database items
/*
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
*/

import { IProduct } from "@/models/Product"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  // Fetch all products to find related ones (in a real app, use a DB query)
  const allProducts = (await getProducts()) as IProduct[];
  
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-neutral-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg shadow-white/5">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-[#7E0806]/20 text-[#7E0806] border border-[#7E0806]/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                    {product.category}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{product.name}</h1>
                <p className="text-2xl font-medium text-[#f3e5b5] mb-6">{product.price}</p>
                
                <p className="text-neutral-400 leading-relaxed text-lg mb-8">
                    {product.description}
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                            <Check className="w-4 h-4" />
                        </div>
                        In Stock & Ready to Ship
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                             <Check className="w-4 h-4" />
                        </div>
                        Premium Quality Guarantee
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-400">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                             <Check className="w-4 h-4" />
                        </div>
                        Professional Grade Material
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link 
                        href={`/contact?subject=Inquiry about ${product.name}`}
                        className="flex-1 bg-[#7E0806] text-white font-bold py-4 rounded-xl hover:bg-[#9c0a08] transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                    >
                        <Mail className="w-5 h-5" /> Enquire Now
                    </Link>
                    <button className="px-6 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10">
                        <Share2 className="w-5 h-5" />
                    </button>

                </div>
            </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div className="border-t border-white/10 pt-16">
                <h2 className="text-2xl font-bold mb-8 text-white">Related Items</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p as unknown as Product} variant="dark" />
                    ))}
                </div>
            </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
