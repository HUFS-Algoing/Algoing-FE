import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const baseurl = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/:path*",
        destination: `${baseurl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
