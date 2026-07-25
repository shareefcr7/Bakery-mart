"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatedHeading } from "./ui/animated-heading"
import { ICategory } from "@/lib/db"
import { memo } from "react"

// Static collection styles
const COLLECTION_STYLES = {
  "Baking Tools": { measurements: "Full Kit | Basics", description: "Essential kit for starting your baking journey." },
  "Piping Nozzles": { measurements: "Set of 12 | Set of 24", description: "Create professional designs with precision." },
  "Bakewares": { measurements: "Aluminium | Non-Stick", description: "Premium tins, trays, and moulds." },
  "Cake Toppers": { measurements: "Acrylic | Gold | Custom", description: "Add a finishing touch to your cakes." },
  "Liners & Papers": { measurements: "Standard | Mini | Tulip", description: "Quality liners for perfect cupcakes." },
  "Ingredients": { measurements: "Bulk | Retail Packs", description: "Finest cocoa, vanilla, and baking essentials." },
  "Gel Colors": { measurements: "Single | Set of 10", description: "Vibrant, concentrated colors for perfect icing." },
  "Silicone Moulds": { measurements: "Shapes | 3D Designs", description: "Flexible moulds for intricate desserts." },
  "Packaging & Boxes": { measurements: "Boxes | Bags | Boards", description: "Present your treats professionally." },
  "Display Stands": { measurements: "Rotating | Tiered", description: "Tools for decorating and display." },
  "Sprinkles": { measurements: "Confetti | Dragees", description: "Fun toppings for every occasion." },
} as const

interface CollectionCardProps {
  category: {
    id?: string | number
    name: string
    image?: string
  }
  index: number
}

interface ShopByCollectionsProps {
  categories?: ICategory[]
}

import { categoryData } from "@/lib/data"

// Memoized collection card component
const CollectionCard = memo(function CollectionCard({ 
  category, 
  index 
}: CollectionCardProps) {
  const style = COLLECTION_STYLES[category.name as keyof typeof COLLECTION_STYLES] || {
    measurements: "Premium Quality",
    description: "Premium bakery supplies"
  }

  return (
    <div className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/products?category=${encodeURIComponent(category.name)}`} className="block h-full w-full">
        {/* Background Image */}
        <div className="absolute inset-0 bg-neutral-900 z-0">
          <Image 
            src={category.image || "/images/placeholder.png"} 
            alt={category.name} 
            fill 
            quality={75}
            loading={index < 4 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-90" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 z-20 flex flex-col justify-end h-full">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white mb-1 drop-shadow-md leading-tight break-words">
            {category.name}
          </h3>
          
          {/* Measurements Badge */}
          <div className="inline-flex bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs text-white font-medium mb-2 max-w-full">
            <span className="truncate">{style.measurements}</span>
          </div>

          <p className="text-white/80 text-[10px] sm:text-xs md:text-sm line-clamp-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            {style.description}
          </p>
        </div>
      </Link>
    </div>
  )
})

export const ShopByCollections = memo(function ShopByCollections({ categories = [] }: ShopByCollectionsProps) {
  const displayCategories = categories.length > 0 
    ? categories.map(c => ({
        id: c.name,
        name: c.name,
        image: c.image
      }))
    : categoryData.map(c => ({
        id: c.name,
        name: c.name,
        image: c.image
      }))

  return (
    <section className="bg-neutral-950">
      {/* Header Section */}
      <div className="bg-black py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center relative">
            <AnimatedHeading 
              title="Shop By Collections" 
              className="text-3xl md:text-5xl font-bold text-[#7E0806] mb-4"
              iconSrc="/best-sellers-logo.png"
            />
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg mt-4">
              Curated selections of our finest cakes and baking essentials.
            </p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCategories.map((cat, index) => (
            <CollectionCard 
              key={cat.id || index} 
              category={cat} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
})
