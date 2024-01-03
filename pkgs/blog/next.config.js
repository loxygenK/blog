import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import path from "path";

const withVanillaExtractPlugin = createVanillaExtractPlugin();

function parseOtherMonorepoPackage(pkgName, nextLoader) {
  const pkgPath = path.resolve(path.join("../", pkgName));

  return {
    test: /\.(ts|tsx)$/,
    include: [pkgPath],
    use: [nextLoader],
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * @param {import("webpack").Configuration} config
   */
  webpack: (config, context) => {
    config.module.rules = [
      {
        resourceQuery: /raw/,
        use: "raw-loader",
      },
      ...config.module.rules,
      parseOtherMonorepoPackage("components", context.defaultLoaders.babel),
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "twemoji.maxcdn.com",
        pathname: "/v/latest/72x72/*"
      }
    ]
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  }
};

export default withVanillaExtractPlugin(nextConfig);
