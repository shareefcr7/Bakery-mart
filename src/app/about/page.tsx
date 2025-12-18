import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

import { AnimatedHeading } from "@/components/ui/animated-heading"
import { FadeIn } from "@/components/ui/fade-in"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading title="About Us" textColor="text-[#7E0806]" />
          <FadeIn delay={0.2}><p className="text-xl text-[#7E0806]/90 mt-4 max-w-2xl mx-auto font-medium">The story behind the sweetness.</p></FadeIn>
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
                 <FadeIn delay={0.2}><h2 className="text-3xl font-bold mb-6 text-[#7E0806]">Our Story</h2></FadeIn>
                 <FadeIn delay={0.4}>
                 <p className="text-lg text-[#f3e5b5] leading-relaxed mb-6">
                     Founded in 2024, BAKERs MART began with a simple mission: to provide professional-grade baking supplies to everyone. We noticed that high-quality tools were often inaccessible to home bakers, and we set out to bridge that gap.
                 </p>
                 </FadeIn>
                 <FadeIn delay={0.6}>
                 <p className="text-lg text-[#f3e5b5] leading-relaxed">
                     Today, we are a leading supplier of baking essentials, from precision tools to premium ingredients, helping thousands of bakers turn their culinary visions into reality.
                 </p>
                 </FadeIn>
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
                    Every cake we bake tells a story—a story of tradition, innovation, and the simple joy of sharing something sweet with the ones you love. It&apos;s not just baking; it&apos;s an art form we&apos;ve perfected over generations.
                  </p>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
