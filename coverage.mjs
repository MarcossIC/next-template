import { execSync } from 'child_process';
import fs from 'fs-extra';

const REPORTS_FOLDER = 'reports';
const NYC_OUTPUT_FOLDER = '.nyc_output';
const FINAL_OUTPUT_FOLDER = 'coverage';

const run = (commands) => {
  commands.forEach((command) => {
    console.log(`Running command: ${command}`);
    try {
      execSync(command, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error running command: ${command}`, error);
    }
  });
};

const copyFileSafe = (src, dest) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } else {
    console.warn(`Warning: ${src} does not exist.`);
  }
};

// Make sure the folders exist
if(!fs.existsSync('coverage') ){
  fs.ensureDirSync(FINAL_OUTPUT_FOLDER);
}
if(!fs.existsSync('.nyc_output')){
  fs.ensureDirSync(NYC_OUTPUT_FOLDER);
}
fs.emptyDirSync(REPORTS_FOLDER);

// Copy coverage files
copyFileSafe('coverage/vitest/coverage-final.json', `${REPORTS_FOLDER}/cover-vitest.json`);
copyFileSafe('coverage/cypress/coverage-final.json', `${REPORTS_FOLDER}/cover-cypress.json`);

// Running the NYC merge command
run([
  `nyc merge ${REPORTS_FOLDER} ${REPORTS_FOLDER}/coverage.json`,
]);

const coverageFilePath = `${REPORTS_FOLDER}/coverage.json`;
const outputFilePath = `${NYC_OUTPUT_FOLDER}/out.json`;
// Move coverage.json file to .nyc_output/out.json
if (fs.existsSync(coverageFilePath)) {
  fs.moveSync(coverageFilePath, outputFilePath, { overwrite: true });
  console.log(`Moved ${coverageFilePath} to ${outputFilePath}`);
} else {
  console.warn(`Warning: ${coverageFilePath} does not exist.`);
}

// Run the NYC report command
run([
  `nyc report --reporter lcov --report-dir ${FINAL_OUTPUT_FOLDER} --check-coverage=false`,
]);

/*
// Delete the reports folder and all its contents
if (fs.existsSync(REPORTS_FOLDER)) {
  fs.removeSync(REPORTS_FOLDER);
  console.log(`Removed directory: ${REPORTS_FOLDER}`);
} else {
  console.warn(`Warning: ${REPORTS_FOLDER} does not exist, nothing to remove.`);
}

*/
