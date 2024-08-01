import { pgTableCreator, serial, text } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `tovergieter_${name}`);

export const tempLog = pgTable("temp_log", {
	id: serial("id").primaryKey(),
	log: text("log"),
});
