import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

import { AnimatedHeading } from "@/components/ui/animated-heading"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-white">
        {/* Background Image - Removed for White BG request */}
        {/* <div className="absolute inset-0 z-0">
            <Image
                src="/section-header-bg.png"
                alt="About Us"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div> */}

        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading title="About Us" textColor="text-[#7E0806]" />
          <p className="text-xl text-[#7E0806]/90 mt-4 max-w-2xl mx-auto font-medium">The story behind the sweetness.</p>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
             <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 shadow-2xl border border-white/10">
                 <Image
                    src="/about-company.jpg"
                    alt="Bakersmart Story"
                    fill
                    className="object-cover"
                 />
             </div>
             <div>
                 <h2 className="text-3xl font-bold mb-6 text-[#f3e5b5]">Our Story</h2>
                 <p className="text-lg text-[#f3e5b5] leading-relaxed mb-6">
                     Founded in 2024, BAKERs MART began with a simple mission: to provide professional-grade baking supplies to everyone. We noticed that high-quality tools were often inaccessible to home bakers, and we set out to bridge that gap.
                 </p>
                 <p className="text-lg text-[#f3e5b5] leading-relaxed">
                     Today, we are a leading supplier of baking essentials, from precision tools to premium ingredients, helping thousands of bakers turn their culinary visions into reality.
                 </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-[#f3e5b5]">Our Mission</h3>
                  <p className="text-[#f3e5b5]">
                      To empower bakers of all skill levels with the highest quality tools and ingredients, inspiring creativity and excellence in every bake.
                  </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-[#f3e5b5]">Our Vision</h3>
                  <p className="text-[#f3e5b5]">
                      To be the world's most trusted partner in the baking community, fostering a global culture of sharing, learning, and celebrating the art of baking.
                  </p>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
