import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/routing/types";

const localePrefix: LocalePrefix = "always";

export const AppConfig = {
	name: "Starter",
	locales: ["es"],
	defaultLocale: "es",
	localePrefix,
};
