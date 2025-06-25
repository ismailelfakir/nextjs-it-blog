/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' as it's incompatible with API routes like NextAuth
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;