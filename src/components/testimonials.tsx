"use client"

import { testimonials } from "@/lib/data"
import { Quote } from "lucide-react"

export function Testimonials() {
  return (
    <section className="py-20 bg-black text-[#f3e5b5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-sans text-[#f3e5b5]">What Our Bakers Say</h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-3 md:gap-8 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[300px] flex-shrink-0 snap-center md:min-w-0 md:snap-align-none bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/10 relative hover:bg-white/10 transition-colors">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#f3e5b5]/20" />
              <p className="text-[#f3e5b5]/70 mb-6 italic">&quot;{t.content}&quot;</p>
              <div>
                <p className="font-bold text-[#f3e5b5]">{t.name}</p>
                <p className="text-sm text-[#d4af37]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
