/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  async rewrites() {
    return [
      { source: "/posts/:slug.md", destination: "/posts/:slug/md" },
      { source: "/posts/:slug.json", destination: "/posts/:slug/json" },
    ]
  },
}

export default nextConfig
