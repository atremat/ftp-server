import fs from 'fs';
import path from 'path';
import { DATA_DIR } from '../config/config.js';
import { createDirectoryIfNotExists } from '../utils/fileUtils.js';

function getUserDirectory(username) {
  const userDir = path.join(DATA_DIR, username);
  createDirectoryIfNotExists(userDir);
  return userDir;
}

export function saveFile(username, filename, content) {
  const userDir = getUserDirectory(username);
  const filePath = path.join(userDir, filename);
  fs.writeFileSync(filePath, content);
}

export function deleteFile(username, filename) {
  const userDir = getUserDirectory(username);
  const filePath = path.join(userDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath);
  }
}
