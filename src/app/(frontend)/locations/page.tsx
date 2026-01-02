import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedHeading } from "@/components/ui/animated-heading"
import { FadeIn } from "@/components/ui/fade-in"
import { MapPin, Phone, Clock } from "lucide-react"

export default function LocationsPage() {
  const locations = [
    {
      id: 1,
      name: "Downtown Flagship",
      address: "123 Baker Street, City Centre",
      phone: "+91 7012552969",
      hours: "Mon-Sun: 7am - 9pm",
      description: "Our original location where it all started. Experience the full range of our premium bakery items in the heart of the city."
    },
    {
      id: 2,
      name: "West End Boutique",
      address: "45 West Avenue, Shopping District",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Sat: 8am - 8pm, Sun: 9am - 6pm",
      description: "A cozy spot perfect for quick pickups and experiencing our signature pastries in a relaxed atmosphere."
    },
    {
      id: 3,
      name: "Suburban Delight",
      address: "789 Garden Lane, Greenfield",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Fri: 7am - 8pm, Sat-Sun: 8am - 5pm",
      description: "Bringing premium baking to the neighborhood. Featuring a large seating area and our complete cake collection."
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading title="Our Locations" textColor="text-[#7E0806]" />
          <FadeIn delay={0.2}><p className="text-xl text-[#7E0806]/90 mt-4 max-w-2xl mx-auto font-medium">Find a BAKERs MART near you.</p></FadeIn>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <FadeIn key={location.id} delay={index * 0.2}>
                <div className="h-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <h3 className="text-2xl font-bold mb-4 text-[#f3e5b5] group-hover:text-white transition-colors">{location.name}</h3>
                  <div className="space-y-4 text-[#f3e5b5]/80">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#f3e5b5] mt-1 shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#f3e5b5] shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#f3e5b5] shrink-0" />
                      <span>{location.hours}</span>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-[#f3e5b5]/60 leading-relaxed">
                    {location.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
