import { authenticate } from '../controllers/authController.js';

export function authMiddleware(username, password, next) {
  if (authenticate(username, password)) {
    next();
  } else {
    throw new Error('Authentication failed.');
  }
}
