import type { NextConfig } from "next";

const output: NextConfig["output"] =
  process.env.VERCEL === "1" ? undefined : "export";

const nextConfig: NextConfig = {
  output,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
