import fs from 'node:fs';
import path from 'node:path';

const mode = process.argv[2];

const historyCacheDir = path.resolve('allure-history', 'last-history');
const resultsHistoryDir = path.resolve('allure-results', 'history');
const reportHistoryDir = path.resolve('allure-report', 'history');

function ensureParent(targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
}

function resetDir(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function copyIfPresent(sourcePath, destinationPath) {
  if (!fs.existsSync(sourcePath)) {
    return;
  }

  ensureParent(destinationPath);
  resetDir(destinationPath);
  fs.cpSync(sourcePath, destinationPath, { recursive: true });
}

if (mode === 'prepare') {
  copyIfPresent(historyCacheDir, resultsHistoryDir);
  process.exit(0);
}

if (mode === 'save') {
  copyIfPresent(reportHistoryDir, historyCacheDir);
  process.exit(0);
}

console.error('Usage: node scripts/allure-history.mjs <prepare|save>');
process.exit(1);
