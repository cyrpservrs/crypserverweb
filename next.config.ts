import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js "N" dev indicator
  devIndicators: false,
  images: {
    // Local images in /public — fine for Vercel
    unoptimized: false,
  },
  // Avoid build failing on ESLint noise during first deploy
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
