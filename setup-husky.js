const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Initialize Husky
  execSync('pnpm husky', { stdio: 'inherit' });

   // Create .husky directory if it doesn't exist
   const huskyDir = path.join(__dirname, '.husky');
   if (!fs.existsSync(huskyDir)) {
     fs.mkdirSync(huskyDir);
   }

  // Create commit-msg hook for Commitlint
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  const commitMsgHook = `#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npx commitlint --edit || { echo 'The commit message does not meet the requirements. Look at "commitlint.config.js" file.'; exit 1; }
`;
  fs.writeFileSync(commitMsgPath, commitMsgHook);

  // Create pre-commit hook
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  const preCommitHook = `#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`;
  fs.writeFileSync(preCommitPath, preCommitHook);

  // Create pre-push hook
  const prePushPath = path.join(huskyDir, 'pre-push');
  const prePushHook = `#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npx tsc || { echo 'Type checking failed. Push aborted.'; exit 1; }
npx prettier --check --ignore-path .gitignore . || { echo 'Prettier formatting failed. Push aborted.'; exit 1; }
npx jest || { echo 'Tests failed. Push aborted.'; exit 1; }
  `;
    fs.writeFileSync(prePushPath, prePushHook);

  // Make hooks executable
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${commitMsgPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${preCommitPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${prePushPath}`, { stdio: 'inherit' });
  }

  console.log("Husky has been set up with a pre-commit hook that runs 'npm run lint'");
} catch (error) {
  console.error("Error setting up Husky:", error);
  process.exit(1);
}
