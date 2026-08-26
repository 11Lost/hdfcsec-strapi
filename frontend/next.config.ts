import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hdfc-securities-api.idealake.com',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;