'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { AnimatedHeading } from '@/components/ui/animated-heading'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-zinc-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
            <AnimatedHeading title="Oops! Something went wrong" />
            
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-sm border border-red-100">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-zinc-800 mb-2">Failed to load products</h2>
                <p className="text-zinc-500 mb-6">
                    {error.message.includes('buffering timed out') || error.message.includes('ServerSelectionError') 
                        ? "Could not connect to the database. Please check your internet connection or IP whitelist."
                        : "We encountered an unexpected error while loading the catalog."}
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="px-6 py-2 bg-zinc-100 text-zinc-700 rounded-full font-medium hover:bg-zinc-200 transition"
                    >
                        Go Home
                    </a>
                </div>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
                <div className="max-w-2xl mx-auto mt-8 p-4 bg-zinc-900 rounded-lg text-left overflow-auto">
                    <p className="text-xs text-zinc-400 font-mono mb-2 uppercase tracking-wider">Developer Error Details:</p>
                    <pre className="text-red-400 font-mono text-xs whitespace-pre-wrap break-words">
                        {error.message}
                    </pre>
                </div>
            )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
