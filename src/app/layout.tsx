import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { WishlistProvider } from "@/context/wishlist-context";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BAKERs MART | Premium Bakery Supplies",
  description: "Your one-stop shop for premium baking tools, ingredients, and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300 overflow-x-hidden`}>
          <WishlistProvider>
            {children}
          </WishlistProvider>
      </body>
    </html>
  );
}
