import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["stranz.in"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
