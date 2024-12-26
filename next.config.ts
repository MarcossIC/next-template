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
	webpack: (config, { dev, isServer }) => {
		if (dev && !isServer) {
			const originalEntry = config.entry;
			config.entry = async () => {
				const entries = await originalEntry();
				if (
					entries["main.js"] &&
					!entries["main.js"].includes("./src/coverage")
				) {
					entries["main.js"].unshift("./src/coverage");
				}
				return entries;
			};

			config.module.rules.push({
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							plugins: ["istanbul"],
						},
					},
				],
			});
		}
		return config;
	},
});

export default config;
