import { USERS } from '../config/users.js';

export function authenticate(username, password) {
  return USERS.find(
    (user) => user.username === username && user.password === password,
  );
}
