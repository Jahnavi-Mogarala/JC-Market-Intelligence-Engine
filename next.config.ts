import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/JC-Market-Intelligence-Engine",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
