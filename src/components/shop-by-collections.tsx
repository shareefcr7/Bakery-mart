"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { AnimatedHeading } from "./ui/animated-heading"

const collections = [
  {
    id: 1,
    title: "Beginners Baking Tools",
    description: "Essential kit for starting your baking journey.",
    measurements: "Full Kit | Basics",
    image: "/collection_baking_tools.png",
    link: "/products?category=tools",
    color: "from-stone-800/80 to-stone-950/80"
  },
  {
    id: 2,
    title: "Piping Nozzles",
    description: "Create professional designs with precision.",
    measurements: "Set of 12 | Set of 24",
    image: "/collection_piping_nozzles.png",
    link: "/products?category=nozzles",
    color: "from-slate-800/80 to-slate-950/80"
  },
  {
    id: 3,
    title: "Premium Ingredients",
    description: "Finest cocoa, vanilla, and baking essentials.",
    measurements: "Bulk | Retail Packs",
    image: "/collection_ingredients.png",
    link: "/products?category=ingredients",
    color: "from-amber-900/80 to-yellow-950/80"
  },
  {
    id: 4,
    title: "Gel Colors",
    description: "Vibrant, concentrated colors for perfect icing.",
    measurements: "Single | Set of 10",
    image: "/collection_gel_colors.png",
    link: "/products?category=colors",
    color: "from-indigo-900/80 to-purple-950/80"
  },
  {
    id: 5,
    title: "Diwali Specials",
    description: "Festive treats to light up your celebrations.",
    measurements: "Gift Boxes | Sweets",
    image: "/collection_diwali_specials.png",
    link: "/products?category=diwali",
    color: "from-orange-800/80 to-red-950/80"
  },
  {
    id: 6,
    title: "Signature Cakes",
    description: "Our famous multi-layered masterpieces.",
    measurements: "500g | 1kg | 2kg",
    image: "/collection_signature_cake.png",
    link: "/products?category=signature-cakes",
    color: "from-rose-900/80 to-rose-950/80"
  },
  {
    id: 7,
    title: "Wedding Cakes",
    description: "Bespoke elegance for your dream day.",
    measurements: "2 Tier | 3 Tier | Custom",
    image: "/collection_wedding_cake.png",
    link: "/products?category=wedding-cakes",
    color: "from-pink-900/80 to-purple-950/80"
  },
  {
    id: 8,
    title: "Birthday Cakes",
    description: "Fun, vibrant, and delicious celebrations.",
    measurements: "1kg | 2kg | 3kg",
    image: "/collection_birthday_cake.png",
    link: "/products?category=birthday-cakes",
    color: "from-blue-900/80 to-indigo-950/80"
  }
]

export function ShopByCollections() {
  return (
    <section className="py-24 bg-[#FFF8F0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedHeading 
            title="Shop By Collections" 
            className="text-4xl md:text-5xl font-bold text-[#5C0601] mb-4"
          />
          <p className="text-[#8B5E3C] max-w-2xl mx-auto text-lg mt-4">
            Curated selections of our finest cakes and sweet treats, baked to perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <Link href={item.link} className="block h-full w-full">
                {/* Background Image */}
                <div className="absolute inset-0 bg-gray-200 z-0">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Fallback Overlay if Image fails (optional, removing strict text fallback for cleanliness) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-multiply opacity-60 z-10 transition-opacity duration-500 group-hover:opacity-70`} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{item.title}</h3>
                  
                  {/* Measurements Badge */}
                  <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 text-xs text-white font-medium mb-3">
                    {item.measurements}
                  </div>

                  <p className="text-white/90 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light leading-relaxed">
                    {item.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs border-b-2 border-white/50 pb-1 group-hover:border-white transition-colors">
                    Shop Now
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
