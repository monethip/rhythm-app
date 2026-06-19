import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // basePath only applied when building in GitHub Actions
  basePath: process.env.GITHUB_ACTIONS ? '/rhythm-app' : '',
};

export default nextConfig;
