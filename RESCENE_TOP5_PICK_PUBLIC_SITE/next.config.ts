import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Ensure X and other social crawlers receive metadata in the initial <head>,
  // rather than relying on streamed metadata in the response body.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
