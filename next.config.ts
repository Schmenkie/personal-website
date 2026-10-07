import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The golf app was renamed (trademark); keep old links working.
      { source: "/work/dogleg", destination: "/work/schmenk-golf", permanent: true },
    ];
  },
  // Example client sites are static pages in public/web/examples/<slug>/index.html.
  async rewrites() {
    return [{ source: "/web/examples/:slug", destination: "/web/examples/:slug/index.html" }];
  },
};

export default nextConfig;
