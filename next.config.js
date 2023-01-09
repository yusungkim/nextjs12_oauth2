/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    localeDetection: true,
    locales: ['en-US', 'ja-JP', 'zh-CN', 'ko-KR', 'fr-FR'],
    defaultLocale: 'en-US'
  },

  images: {
    domains: [
      "imagedelivery.net", // cloudflare images
    ],
  },
}

module.exports = nextConfig
