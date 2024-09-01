import { SERVER } from './config/config.js';
import { ftpServer } from './controllers/ftpServer.js';

export default function setupServer() {
  ftpServer.listen().then(() => {
    console.log(`FTP sever is running at ftp://${SERVER.HOST}:${SERVER.PORT}`);
  });
}
