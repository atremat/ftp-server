import fs from 'fs';

export function createDirectoryIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}
