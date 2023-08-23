/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mye-commerce.storage.iran.liara.space',
        port: '',
        // pathname: '/account123/**',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
