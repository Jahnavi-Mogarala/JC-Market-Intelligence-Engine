import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repo = 'JC-Market-Intelligence-Engine';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repo}` : '',
  assetPrefix: isGithubActions ? `/${repo}` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
