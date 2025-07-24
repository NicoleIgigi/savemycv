/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/port' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/port' : ''
}

module.exports = nextConfig 