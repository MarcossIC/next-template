import robots from "@app/robots";
import { describe, expect, it, vi } from "vitest";

vi.mock("@core/lib/utils", () => ({
	getBaseUrl: vi.fn().mockReturnValue("https://example.com"),
}));

describe("robots.ts", () => {
	it("should generate correct robots configuration", () => {
		const MOCK_URL = "https://example.com";

		// En Vitest no necesitamos el cast a jest.Mock
		const result = robots();

		expect(result).toEqual({
			rules: {
				userAgent: "*",
				allow: "/",
			},
			sitemap: `${MOCK_URL}/sitemap.xml`,
		});
	});
});
