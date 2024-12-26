// biome-ignore lint/style/noNamespace: <explanation>
declare namespace Cypress {
	interface Chainable {
		getBySel(
			selector: string,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			args?: any,
		): Chainable<JQuery<HTMLElement>>;
		getBySelLike(
			selector: string,
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			args?: any,
		): Chainable<JQuery<HTMLElement>>;
	}
}
