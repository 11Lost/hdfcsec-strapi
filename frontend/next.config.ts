import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.hdfcsec.com',
      },
      {
        protocol: 'http',
        hostname: '192.168.2.22',
        port: '1337',
      },
    ],
  },
};

export default nextConfig;
