import { authenticate } from '../controllers/authController.js';
import { saveFile, deleteFile } from '../controllers/fileController.js';

export function handleUpload(username, password, filename, content) {
  if (authenticate(username, password)) {
    saveFile(username, filename, content);
    return 'File uploaded successfully.';
  } else {
    return 'Authentication failed.';
  }
}

export function handleDelete(username, password, filename) {
  if (authenticate(username, password)) {
    deleteFile(username, filename);
    return 'File deleted successfully';
  } else {
    return 'Authetication failed.';
  }
}
