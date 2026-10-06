import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The golf app was renamed (trademark); keep old links working.
      { source: "/work/dogleg", destination: "/work/schmenk-golf", permanent: true },
    ];
  },
};

export default nextConfig;
