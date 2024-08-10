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

  jest || exit 1
  `;
    fs.writeFileSync(prePushPath, prePushHook);

  // Make hooks executable
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${preCommitPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${prePushPath}`, { stdio: 'inherit' });
  }

  console.log("Husky has been set up with a pre-commit hook that runs 'npm run lint'");
} catch (error) {
  console.error("Error setting up Husky:", error);
  process.exit(1);
}
