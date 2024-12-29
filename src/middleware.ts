import { routing } from "@core/lib/i18nRouting";
import createMiddleware from "next-intl/middleware";
import { type NextFetchEvent, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(
	request: NextRequest,
	_: NextFetchEvent,
) {
	return intlMiddleware(request);
}

export const config = {
	matcher: ["/", "/(en|es)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
