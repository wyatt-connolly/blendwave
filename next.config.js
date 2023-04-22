/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['cdn.schema.io', 'images.unsplash.com', 'www.freepnglogos.com']
  }
}

module.exports = nextConfig
