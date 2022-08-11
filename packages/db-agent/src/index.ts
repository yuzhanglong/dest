import { Cors, Router, Server } from '@dest-toolkit/http-server';
import { deleteDatabase, getDatabase, postDatabase } from './controller';
import { createDatabase } from './service';

const createInitialDatabase = async () => {
  await createDatabase('mariadb', '', []);
};

const startServer = async () => {
  const cors = new Cors();
  const router = new Router();
  router.setRoute('DELETE', '/database', deleteDatabase);
  router.setRoute('GET', '/database', getDatabase);
  router.setRoute('POST', '/database', postDatabase);
  const server = new Server('http');
  server.use(cors.getHandler());
  server.use(router.getHandler());
  server.listen(3001);
};

await createInitialDatabase();
await startServer();