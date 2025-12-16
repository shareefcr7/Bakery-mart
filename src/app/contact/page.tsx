"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"

import { AnimatedHeading } from "@/components/ui/animated-heading"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
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
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have a question about our products or need help with an order? Our team is here to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-full text-primary-foreground">
                    <MapPin className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Visit Us</h3>
                  <p className="text-muted-foreground">123 Baker Street, Sweet City, SC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-full text-primary-foreground">
                   <Phone className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-full text-primary-foreground">
                   <Mail className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Email Us</h3>
                  <p className="text-muted-foreground">support@bakersmart.com</p>
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
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input id="name" type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input id="email" type="email" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <input id="subject" type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none" placeholder="Your message..."></textarea>
              </div>

              <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
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
