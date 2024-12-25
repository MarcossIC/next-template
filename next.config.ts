import { env } from "@environment";
import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: env.ANALYZE === true,
});

const config: NextConfig = bundleAnalyzer({
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	typescript: {
		tsconfigPath: "./tsconfig.json",
	},
});

export default config;
