"use client"

import { testimonials } from "@/lib/data"
import { Quote } from "lucide-react"
import { memo } from "react"

// Memoized testimonial card
const TestimonialCard = memo(function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/10 relative hover:bg-white/10 transition-colors">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-[#f3e5b5]/20" aria-hidden="true" />
      <p className="text-[#f3e5b5]/70 mb-6 italic">&quot;{t.content}&quot;</p>
      <div>
        <p className="font-bold text-[#f3e5b5]">{t.name}</p>
        <p className="text-sm text-[#d4af37]">{t.role}</p>
      </div>
    </div>
  )
})

export const Testimonials = memo(function Testimonials() {
  return (
    <section className="py-20 bg-black text-[#f3e5b5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-sans text-[#f3e5b5]">What Our Bakers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
})
