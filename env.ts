import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const {
	ANALYZE,
	PORT,
	NEXT_PUBLIC_APP_URL,
	VERCEL_ENV,
	VERCEL_PROJECT_PRODUCTION_URL,
	VERCEL_URL,
} = process.env;

export const env = createEnv({
	server: {
		ANALYZE: z
			.enum(["true", "false"])
			.optional()
			.transform((value) => value === "true"),
		VERCEL_ENV: z.string().optional(),
		VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
		VERCEL_URL: z.string().optional(),
		PORT: z
			.string()
			.optional()
			.transform((value) => Number(value))
			.default("3000"),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().optional(),
	},
	runtimeEnv: {
		ANALYZE: ANALYZE,
		PORT: PORT,
		NEXT_PUBLIC_APP_URL: NEXT_PUBLIC_APP_URL,
		VERCEL_ENV: VERCEL_ENV,
		VERCEL_URL: VERCEL_URL,
		VERCEL_PROJECT_PRODUCTION_URL: VERCEL_PROJECT_PRODUCTION_URL,
	},
});
