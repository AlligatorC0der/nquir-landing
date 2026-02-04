/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode for API routes (FAQ bot)
  // Amplify WEB_COMPUTE handles this
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
