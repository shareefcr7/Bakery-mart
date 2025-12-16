import { businessHighlights } from "@/lib/data"
import { Award, Package, DollarSign, Truck } from "lucide-react"

const icons = {
  "Premium Quality": Award,
  "Wide Range": Package,
  "Affordable Prices": DollarSign,
  "Fast Delivery": Truck
}

export function Features() {
  return (
    <section className="py-16 border-y border-border/50 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory gap-4 md:grid md:grid-cols-4 md:gap-8 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {businessHighlights.map((highlight) => {
            const Icon = icons[highlight.title as keyof typeof icons] || Award
            return (
              <div key={highlight.title} className="min-w-[250px] flex-shrink-0 snap-center flex flex-col items-center text-center p-4 border border-border/40 rounded-xl bg-card/50 md:border-0 md:bg-transparent md:p-0 md:min-w-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                <p className="text-muted-foreground text-sm">{highlight.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
