"use client"

import { testimonials } from "@/lib/data"
import { Quote } from "lucide-react"

export function Testimonials() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-sans">What Our Bakers Say</h2>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-3 md:gap-8 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-[300px] flex-shrink-0 snap-center md:min-w-0 md:snap-align-none bg-card p-8 rounded-2xl shadow-sm border border-border/50 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              <p className="text-muted-foreground mb-6 italic">"{t.content}"</p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-primary">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
