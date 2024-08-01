import { defineConfig } from "drizzle-kit";
import { env } from "~/utils/env.mjs";

export default defineConfig({
	schema: "./src/utils/db/schema.ts",
	tablesFilter: "tovergieter_",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: { url: env.DB_URL },
});
