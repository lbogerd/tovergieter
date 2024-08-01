import "dotenv/config";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./db";

(async () => {
	await migrate(db, { migrationsFolder: "./drizzle" });
})();
