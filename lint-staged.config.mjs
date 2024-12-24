import path from "path";

const buildEslintCommand = filenames =>
  `eslint --fix --report-unused-disable-directives --max-warnings 0 --no-warn-ignored ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')}`;

const buildPrettierCommand = filenames =>
  `prettier --no-cache --write ${filenames
    .filter((file) => /\.(ts|js|mts|tsx)$/.test(file))
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(' ')} --ignore-path .prettierignore`;

export default {
  './*.{js,ts,cjs}': [buildPrettierCommand, buildEslintCommand],
  './src/**/*.{js,jsx,ts,tsx}': [buildPrettierCommand, buildEslintCommand],
};
