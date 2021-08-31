import Fastify from "fastify";
import pino, { Logger } from "pino";
import { createPool, DatabasePoolConnectionType, sql } from "slonik";
import { config } from "./config";

const SERVER_PORT = config.server.port;
const HELLO_NAME = config.features.helloName;

(async function main() {
  const logger = pino(config.logger);
  const database = createDatabasePool(config.database);
  const server = createServer({ logger, database });

  await server.listen(SERVER_PORT, "0.0.0.0");
})();

type DatabaseInit = {
  user: string;
  password: string;
  host: string;
  port: number;
  name: string;
};

function createDatabasePool({
  user,
  password,
  host,
  port,
  name,
}: DatabaseInit) {
  const userEncoded = encodeURIComponent(user);
  const passwordEncoded = encodeURIComponent(password);
  const connectionString = `postgres://${userEncoded}:${passwordEncoded}@${host}:${port}/${name}`;
  return createPool(connectionString);
}

type ServerInit = {
  logger: Logger;
  database: DatabasePoolConnectionType;
};

function createServer({ logger, database }: ServerInit) {
  const app = Fastify({ logger });

  app.get("/now", async (_request, reply) => {
    const time = await database.oneFirst(sql`SELECT NOW()`);
    reply.code(200).header("Content-Type", "application/json").send({ time });
  });

  app.get("/hello", (_request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/plain")
      .send(`hello from ${HELLO_NAME}`);
  });

  return app;
}
