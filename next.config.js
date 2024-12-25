import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";

/** @type {import('next').NextConfig} */
const config = withPlugins(
	[[withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })]],
	{
		reactStrictMode: true,
		logging: {
			fetches: {
				fullUrl: true,
			},
		},
		eslint: {
			ignoreDuringBuilds: true,
		},
	},
);

export default config;
