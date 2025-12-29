import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
// import { products } from "@/lib/data" // Removed static import
import { getProductById, getProducts } from "@/lib/db"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Check, Mail, Share2 } from "lucide-react"
import { ProductCard } from "@/components/product-card"

// Removing generateStaticParams to allow dynamic rendering for new database items
/*
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
*/

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  // Fetch all products to find related ones (in a real app, use a DB query)
  const allProducts = await getProducts()
  
  // @ts-ignore
  const relatedProducts = allProducts
    .filter((p: any) => p.category === product.category && p.id !== product.id)
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-muted border border-border/50 shadow-sm">
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
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                    {product.category}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-medium text-primary mb-6">{product.price}</p>
                
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                    {product.description}
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                            <Check className="w-4 h-4" />
                        </div>
                        In Stock & Ready to Ship
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                             <Check className="w-4 h-4" />
                        </div>
                        Premium Quality Guarantee
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                             <Check className="w-4 h-4" />
                        </div>
                        Professional Grade Material
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link 
                        href={`/contact?subject=Inquiry about ${product.name}`}
                        className="flex-1 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2"
                    >
                        <Mail className="w-5 h-5" /> Enquire Now
                    </Link>
                    <button className="px-6 py-4 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/80 transition-all border border-border/50">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div className="border-t border-border/50 pt-16">
                <h2 className="text-2xl font-bold mb-8">Related Items</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
