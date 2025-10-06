/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel handles images by default; leave unoptimized off
  images: {
    unoptimized: false,
  },
}

module.exports = nextConfig