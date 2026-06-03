import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires explicitly allowing non-default quality values.
    // 90 keeps the full-bleed growth photos crisp.
    qualities: [75, 90],
  },
};

export default nextConfig;
