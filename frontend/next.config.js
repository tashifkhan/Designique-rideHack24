/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
    reactStrictMode: true,
  },
  images: { domains: ["images.unsplash.com"], unoptimized: false },
};

module.exports = nextConfig;
