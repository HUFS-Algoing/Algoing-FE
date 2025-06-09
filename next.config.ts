import type { NextConfig } from "next";
const baseurl = process.env.NEXT_PUBLIC_API_URL;
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${baseurl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
