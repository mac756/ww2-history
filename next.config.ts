import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/ww2-history",
  trailingSlash: true,
};

export default nextConfig;