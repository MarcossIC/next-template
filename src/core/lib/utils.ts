import { env } from "@environment";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
	if (env.NEXT_PUBLIC_APP_URL) {
		return env.NEXT_PUBLIC_APP_URL;
	}

	if (env.VERCEL_ENV === "production" && env.VERCEL_PROJECT_PRODUCTION_URL) {
		return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
	}

	if (env.VERCEL_URL) {
		return `https://${env.VERCEL_URL}`;
	}

	return "http://localhost:3000";
};
