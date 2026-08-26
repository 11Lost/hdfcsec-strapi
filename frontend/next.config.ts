import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'hdfc-securities-api.idealake.com',
      },
      {
        protocol: 'https',
        hostname: 'hdfc-securities-api.idealake.com',
      },
    ],
  },
};

export default nextConfig;
