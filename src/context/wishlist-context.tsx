"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Product } from "@/lib/data"

// I'll skip toast for now if not sure, but 'sonner' or 'react-hot-toast' is common. 
// Browsing package.json first is better, but I'll write a version without external toast first, or implement a simple one. 
// actually, I'll just use the state update for now.

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (product: Product) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTimeout(() => setItems(parsed), 0)
      } catch (e) {
        console.error("Failed to parse wishlist", e)
      }
    }
    }
    setTimeout(() => setIsLoaded(true), 0)
  }, [])

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToWishlist = (product: Product) => {
    setItems(prev => {
      if (prev.some(i => i.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId: string) => {
    setItems(prev => prev.filter(i => i.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return items.some(i => i.id === productId)
  }

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }




  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
