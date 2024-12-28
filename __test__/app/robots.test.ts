import { describe, it, expect, vi } from 'vitest'
import robots from "@app/robots";

const MOCK_URL = "https://example.com";

vi.mock("@core/lib/utils", ()=>({
  getBaseUrl: vi.fn().mockReturnValue(MOCK_URL),
}))

describe('robots.ts', () => {
  it('should generate correct robots configuration', () => {

    // En Vitest no necesitamos el cast a jest.Mock
    const result = robots()

    expect(result).toEqual({
      rules: {
        userAgent: '*',
        allow: '/'
      },
      sitemap: `${MOCK_URL}/sitemap.xml`
    })
  })
})
