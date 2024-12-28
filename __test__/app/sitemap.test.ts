import { describe, it, expect, vi } from 'vitest';
import sitemap from "@app/sitemap";

const MOCK_URL = "https://example.com";

vi.mock("@core/lib/utils", ()=>({
  getBaseUrl: vi.fn().mockReturnValue(MOCK_URL),
}))

describe("sitemap.ts", () => {
  it("should generate correct sitemap configuration", () => {

    const result = sitemap();

    expect(result).toHaveLength(1);
    expect(result?.[0]?.url).toBe(`${MOCK_URL}/`);
    expect(result?.[0]?.changeFrequency).toBe('weekly');
    expect(result?.[0]?.priority).toBe(1);
    expect(result?.[0]?.lastModified).toBeInstanceOf(Date);
  });
});
