/** @type {import('next').NextConfig} */

const basePath = '/fansreport/2022'

const nextConfig = {
  basePath,
  assetPrefix: basePath,
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  publicRuntimeConfig: {
    basePath,
    APP_URL: process?.env?.APP_URL || '',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ['images.sysapi.mtg.now.com', '192.168.68.106:1111', '192.168.68.106'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
};

module.exports = nextConfig;
