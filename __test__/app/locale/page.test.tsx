import RootPage from "@app/[locale]/page";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Root page test", () => {
	afterEach(() => {
		vi.clearAllTimers();
	});

	it("should find root-page id", () => {
		render(<RootPage />);
		expect(screen.getByTestId("root-page")).toBeDefined();
	});
});
