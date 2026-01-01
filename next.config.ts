import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    qualities: [100, 75], // Added quality configuration as requested
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allow all paths from Cloudinary
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
  },
};

export default nextConfig;
