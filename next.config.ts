/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio', // If you're not using a custom domain
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig