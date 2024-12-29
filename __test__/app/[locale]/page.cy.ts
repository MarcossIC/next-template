describe("RootPage", () => {
	beforeEach(() => {
		cy.visit("/es");
	});

	it("Should render correctly", () => {
		cy.getBySel("root-page").should("be.visible");
	});

	it("Should render correctly h1 title", () => {
		cy.getBySel("root-h1")
			.should("be.visible")
			.and("have.text", "Next.js Template");
	});

	it("Should render correctly small in footer", () => {
		cy.get("small")
			.should("be.visible")
			.and("contain.text", "Development by MarcossIC");
	});
});
