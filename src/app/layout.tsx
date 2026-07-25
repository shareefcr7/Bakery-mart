import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { WishlistProvider } from "@/context/wishlist-context";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap", // Already set for fast rendering
  weight: ["400", "500", "600", "700"], // Only include used weights
  fallback: ["system-ui", "sans-serif"],
});

// ===== METADATA OPTIMIZATION =====
export const metadata: Metadata = {
  title: "BAKERs MART | Premium Bakery Supplies & Baking Tools",
  description: "Your one-stop shop for premium baking tools, ingredients, and accessories. Fast delivery, expert guidance.",
  keywords: ["bakery supplies", "baking tools", "cake decorating", "pastry supplies", "professional baking equipment"],
  
  // Structured data for rich snippets
  openGraph: {
    title: "BAKERs MART | Premium Bakery Supplies",
    description: "Premium baking tools, ingredients, and accessories for professional bakers",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/bakersmart-logo-final.jpg",
        width: 1200,
        height: 630,
        alt: "BAKERs MART Logo",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "BAKERs MART | Premium Bakery Supplies",
    description: "Your one-stop shop for premium baking tools and ingredients",
  },
  
  alternates: {
    canonical: "https://bakersmart.com",
    languages: {
      en: "https://bakersmart.com",
    },
  },
  
  // Viewport optimization for mobile
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Security and performance headers
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden scroll-smooth">
      <head>
        {/* Preconnect to critical resources */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        
        {/* Performance: Reduce CLS by setting viewport color */}
        <meta name="theme-color" content="#7E0806" />
      </head>
      
      <body 
        className={`${outfit.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300 overflow-x-hidden`}
        // Suppress hydration mismatch warnings
        suppressHydrationWarning
      >
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
