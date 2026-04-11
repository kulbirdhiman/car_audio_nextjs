import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "d198m4c88a0fux.cloudfront.net",
    },
  ],
},
  /* config options here */
};

export default nextConfig;
