import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ===== PERFORMANCE OPTIMIZATIONS =====
  
  // Use React strict mode to catch bugs early
  reactStrictMode: true,

  // ===== EXPERIMENTAL OPTIMIZATIONS =====
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // ===== IMAGE OPTIMIZATION =====
  images: {
    // Use higher quality for LCP element (hero), lower for others
    // Server-side format negotiation for AVIF/WebP
    formats: ["image/avif", "image/webp"],
    
    // Quality levels: 75 for production (saves 30-40% size), 100 for hero priority
    qualities: [75],
    
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
    
    // Enable responsive image generation
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
    
    // Device size breakpoints for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ===== OUTPUT & BUILD =====
  output: "standalone",
  
  // ===== HEADERS FOR CACHING & PERFORMANCE =====
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ===== COMPRESSION & MINIFICATION =====
  compress: true,

  // ===== TURBOPACK CONFIG (Next.js 16 default) =====
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
  },
};

export default nextConfig;
