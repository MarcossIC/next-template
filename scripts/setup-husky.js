import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Find the root directory of the project (where .git is located).
 * @returns {string} Absolute path to the root directory.
 */
function findRootDir() {
	let currentDir = __dirname;
	while (!fs.existsSync(path.join(currentDir, ".git"))) {
		const parentDir = path.resolve(currentDir, "..");
		if (parentDir === currentDir) {
			throw new Error(
				"No se encontró un directorio .git en la jerarquía de carpetas.",
			);
		}
		currentDir = parentDir;
	}
	return currentDir;
}

try {
	// Initialize Husky
	const rootDir = findRootDir();

	// Cambia al directorio raíz
	process.chdir(rootDir);

	execSync("npx husky", { stdio: "inherit" });

	// Create .husky directory if it doesn't exist
	const huskyDir = path.join(rootDir, ".husky");
	if (!fs.existsSync(huskyDir)) {
		fs.mkdirSync(huskyDir);
	}

	// Create commit-msg hook for Commitlint
	const commitMsgPath = path.join(huskyDir, "commit-msg");
	const commitMsgHook = `set +e
npx --no -- commitlint --edit || { echo -e "$(tput setaf 1)❌The commit message does not meet the requirements. Look at "commitlint.config.js" file.$(tput sgr0)"; exit 1; }`;
	fs.writeFileSync(commitMsgPath, commitMsgHook);

	// Create pre-commit hook
	const preCommitPath = path.join(huskyDir, "pre-commit");
	const preCommitHook = `set +e
npx --no lint-staged`;
	fs.writeFileSync(preCommitPath, preCommitHook);

	// Create pre-push hook
	const prePushPath = path.join(huskyDir, "pre-push");
	const prePushHook = `set +e
npx tsc || { echo -e "$(tput setaf 1)❌Type checking failed. Push aborted.$(tput sgr0)"; exit 1; }
npx vitest run --passWithNoTests || { echo -e "$(tput setaf 1)❌Tests failed. Push aborted.$(tput sgr0)"; exit 1; }`;
	fs.writeFileSync(prePushPath, prePushHook);

	// Make hooks executable
	if (process.platform !== "win32") {
		execSync(`chmod +x ${commitMsgPath}`, { stdio: "inherit" });
		execSync(`chmod +x ${preCommitPath}`, { stdio: "inherit" });
		execSync(`chmod +x ${prePushPath}`, { stdio: "inherit" });
	}

	console.log(
		"Husky has been set up with a commit-msg, pre-commit and pre-push hook",
	);
} catch (error) {
	console.error("Error setting up Husky:", error);
	process.exit(1);
}
