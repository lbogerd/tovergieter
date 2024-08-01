import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env.mjs";
import * as schema from "./schema";

export const dbConnection = neon(env.DB_URL);

export const db = drizzle(dbConnection, { schema });
