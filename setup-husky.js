import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
  Husky must run in the root where the ".git" is, if your project is not in the root you must move to the root for it to work (But the .husky will be created inside the project).
  Example:
  execSync('cd <root> && npx husky <project-path>/.husky', { stdio: 'inherit' });

  Also make sure that the hooks are executed inside the project and not outside. Before executing the hook command, move inside the project folder
  Example:
  cd <project-path>
  npx lint-staged
  */

try {
  // Initialize Husky
  execSync('npx husky', { stdio: 'inherit' });

  // Create .husky directory if it doesn't exist
  const huskyDir = path.join(__dirname, '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir);
  }

  // Create commit-msg hook for Commitlint
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  const commitMsgHook = `set +e
npx commitlint --edit || { echo -e '\\x1b[0;31m❌The commit message does not meet the requirements. Look at "commitlint.config.js" file.\\x1b[0m'; exit 1; }`;
  fs.writeFileSync(commitMsgPath, commitMsgHook);

  // Create pre-commit hook
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  const preCommitHook = `set +e
npx lint-staged`;
  fs.writeFileSync(preCommitPath, preCommitHook);

  // Create pre-push hook
  const prePushPath = path.join(huskyDir, 'pre-push');
  const prePushHook = `set +e
npx tsc || { echo -e '\\x1b[0;31m❌Type checking failed. Push aborted.\\x1b[0m'; exit 1; }
npx jest --detectOpenHandles --passWithNoTests || { echo -e '\\x1b[0;31m❌Tests failed. Push aborted.\\x1b[0m'; exit 1; }`;
  fs.writeFileSync(prePushPath, prePushHook);

  // Make hooks executable
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${commitMsgPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${preCommitPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${prePushPath}`, { stdio: 'inherit' });
  }

  console.log('Husky has been set up with a commit-msg, pre-commit and pre-push hook');
} catch (error) {
  console.error('Error setting up Husky:', error);
  process.exit(1);
}
