import { drizzle } from "drizzle-orm/connect";
import { env } from "../env.mjs";

const dbClient = env.NODE_ENV === "production" ? "neon-http" : "postgres-js";
export const db = drizzle(dbClient, env.DB_URL);
