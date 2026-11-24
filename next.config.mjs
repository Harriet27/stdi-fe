/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "viharasiddharta.org",
        pathname: "/media/**",
      },
    ],
  },
}

export default nextConfig
