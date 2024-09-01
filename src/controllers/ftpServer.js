import FtpSrv from 'ftp-srv';
import { SERVER } from '../config/config.js';
import { handleUpload, handleDelete } from '../routes/routes.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { log } from '../utils/logger.js';

export const ftpServer = new FtpSrv(`ftp://${SERVER.HOST}:${SERVER.PORT}`, {
  anonymous: false,
  greeting: ['Welcome to FTP', 'Wie gehts?'],
});

ftpServer.on('login', ({ username, password }, resolve, reject) => {
  try {
    authMiddleware(username, password, () =>
      resolve({ root: './src/data/userFiles' }),
    );
    log(`User **${username}** logged in.`);
  } catch (error) {
    reject(error);
    log(`User **${username}** rejected with error: ${error.message}.`);
  }
});

ftpServer.on('disconnect', ({ connection, id, newConnectionCount }) => {
  log(`User with ID = **${id}** disconnected.`);
});

ftpServer.on('closed', () => {
  log(`Session closed.`);
});

ftpServer.on('STOR', (error, session) => {
  log(`Error storing file: ${error.message}`);
});

ftpServer.on('RETR', (error, session) => {
  log(`Error retrieving file: ${error.message}`);
});

ftpServer.on('client-error', ({ context, error }) => {
  log(`Client error: ${context} - ${error.message}`);
});

ftpServer.on('file:created', ({ username, path }) => {
  log(`File created: ${path}`);
});

ftpServer.on('file:deleted', ({ username, path }) => {
  log(`File deleted: ${path}`);
});

ftpServer.on('server-error', ({ error }) => {
  log(`Server error ocured with error: ${error.message}`);
});
