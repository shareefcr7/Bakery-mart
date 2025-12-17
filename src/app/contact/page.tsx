"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"

import { AnimatedHeading } from "@/components/ui/animated-heading"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image
                src="/contact-bg.jpg"
                alt="Contact Us"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <AnimatedHeading title="Contact Us" textColor="text-white" />
          <p className="text-white/90 mt-4 text-lg md:text-xl font-medium max-w-2xl mx-auto">We'd love to hear from you. Get in touch with us.</p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#f3e5b5]">Get in Touch</h2>
            <p className="text-[#f3e5b5] mb-8">
              Have a question about our products or need help with an order? Our team is here to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full border border-white/10">
                    <MapPin className="w-6 h-6 text-[#f3e5b5]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#f3e5b5]">Visit Us</h3>
                  <p className="text-[#f3e5b5]/80">123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full border border-white/10">
                   <Phone className="w-6 h-6 text-[#f3e5b5]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#f3e5b5]">Call Us</h3>
                  <p className="text-[#f3e5b5]/80">+1 (555) 123-4567</p>
                  <p className="text-sm text-[#f3e5b5]/60">Mon-Fri: 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full border border-white/10">
                   <Mail className="w-6 h-6 text-[#f3e5b5]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#f3e5b5]">Email Us</h3>
                  <p className="text-[#f3e5b5]/80">support@bakersmart.com</p>
                </div>
              </div>
            </div>
            
            {/* Map Embed */}
            <div className="mt-10 h-64 bg-muted rounded-xl w-full overflow-hidden border border-border">
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?q=123%20Baker%20Street,%20Sweet%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full filter grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-sm backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#f3e5b5]">Send us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#f3e5b5]">Name</label>
                  <input id="name" type="text" className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#f3e5b5] focus:outline-none text-[#f3e5b5] placeholder:text-white/30" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#f3e5b5]">Email</label>
                  <input id="email" type="email" className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#f3e5b5] focus:outline-none text-[#f3e5b5] placeholder:text-white/30" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-[#f3e5b5]">Subject</label>
                <input id="subject" type="text" className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#f3e5b5] focus:outline-none text-[#f3e5b5] placeholder:text-white/30" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#f3e5b5]">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#f3e5b5] focus:outline-none resize-none text-[#f3e5b5] placeholder:text-white/30" placeholder="Your message..."></textarea>
              </div>

              <button className="w-full bg-[#f3e5b5] text-black font-bold py-3 rounded-lg hover:bg-[#f3e5b5]/90 transition-colors flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
