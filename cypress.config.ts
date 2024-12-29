import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import register from "@cypress/code-coverage/task";
import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import tsconfig from "./tsconfig.json" assert { type: "json" };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const raw: any = tsconfig.compilerOptions.paths;
const alias: Record<string, string[]> = {};
for (const key in raw) {
	alias[key.replace("/*", "")] = raw[key].map((p: string) =>
		resolve(process.cwd(), p.replace("/*", "")),
	);
}

const envConfig = {
	CYPRESS_HOST_PORT: process.env.CYPRESS_HOST_PORT || "3001",
	CYPRESS_BASE_URL_PREFIX:
		process.env.CYPRESS_BASE_URL_PREFIX || "http://localhost:3000",
};

const webpackConfig = {
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias,
	},
};

// https://docs.cypress.io/guides/references/configuration
export default defineConfig({
	video: false,
	screenshotOnRunFailure: false,
	port: Number(envConfig?.CYPRESS_HOST_PORT),
	e2e: {
		setupNodeEvents(on, config) {
			const options = {
				webpackOptions: webpackConfig,
			};
			register(on, config);
			on("file:preprocessor", webpack(options));
			return config;
		},
		baseUrl: envConfig.CYPRESS_BASE_URL_PREFIX,
		specPattern: "__test__/**/*.{spec,e2e,cy}.{js,jsx,ts,tsx}",
		supportFile: "__test__/support/e2e.ts",
	},
	component: {
		setupNodeEvents(on, config) {
			const options = {
				webpackOptions: webpackConfig,
			};
			register(on, config);
			on("file:preprocessor", webpack(options));
			return config;
		},
		devServer: {
			framework: "next",
			bundler: "webpack",
			webpackConfig,
		},
		specPattern: "__test__/**/*.{spec,cy}.{js,jsx,ts,tsx}",
		supportFile: "__test__/support/e2e.ts",
	},
});
