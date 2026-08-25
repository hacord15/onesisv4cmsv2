import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Media served from S3 / MinIO once PAYLOAD is wired up.
      // Swap this hostname for your real bucket/CDN domain in production.
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });