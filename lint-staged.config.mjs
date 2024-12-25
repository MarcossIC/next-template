import path from "path";

const runBiomeCommand = (filenames) =>
	`biome check --linter-enabled=true --formatter-enabled=true --organize-imports-enabled=true --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

export default {
	"./*.{js,ts,cjs}": [runBiomeCommand],
	"./src/**/*.{js,jsx,ts,tsx}": [runBiomeCommand],
};
