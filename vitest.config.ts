import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import path from "path";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import tsconfig from "./tsconfig.json"

const raw: any = tsconfig.compilerOptions.paths
const alias: any = {};

for (const x in raw) {
	alias[x.replace("/*", "")] = raw[x].map((p: string) =>
		path.resolve(__dirname, p.replace("/*", "")),
	);
}

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias,
	},
	test: {
		globals: true,
		include: ["__test__/**/*.test.{js,jsx,ts,tsx}"],
		coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage/vitest',
			include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: [
        "**/*.d.ts",
        "**/*.test.{js,ts,jsx,tsx}",
        "**/*.spec.{js,ts,jsx,tsx}",
        "**/*.cy.{js,ts,jsx,tsx}",
        "coverage/**",
        "test/**",
        "__test__/**",
        "node_modules/**",
        "public/**",
        ".next/**",
        ".swc/**",
        ".storybook/**",
        ".husky/**"
      ],
		},
		environment: "jsdom",
		setupFiles: ["./vitest-setup.ts"],
	},
});
