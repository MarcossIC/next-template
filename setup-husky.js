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
  const hookContent = `#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`;
  fs.writeFileSync(preCommitPath, hookContent);

  // Make the pre-commit hook executable
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${preCommitPath}`, { stdio: 'inherit' });
  }

  console.log("Husky has been set up with a pre-commit hook that runs 'npm run lint'");
} catch (error) {
  console.error("Error setting up Husky:", error);
  process.exit(1);
}
