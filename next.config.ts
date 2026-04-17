import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Next.js Image optimizer — serve modern formats by default
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 1 year (immutable URLs include content hash)
    minimumCacheTTL: 31_536_000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.freebiesupply.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
