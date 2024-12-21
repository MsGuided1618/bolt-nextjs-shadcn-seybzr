/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
        pathname: '/v3/**',
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;