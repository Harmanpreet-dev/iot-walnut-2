import { config } from "dotenv";
import pg from "pg";
import { logger } from "../utils/logger.js";

config();

const pgClient = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const connectDb = async () => {
  try {
    await pgClient.connect();
    logger(`Database Connected Successfully`);
  } catch (error) {
    console.error({ status: "connection failed", error });
    process.exit(1);
  }
};

export { pgClient, connectDb };
