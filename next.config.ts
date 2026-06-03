import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Production landing page lives at repo root (index.html). */
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
