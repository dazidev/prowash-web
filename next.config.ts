import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com'
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com'
      },
      {
        protocol: 'https',
        hostname: 'images.prowash365.com'
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // o '20mb', etc.
    },
  },   
};

export default nextConfig;
