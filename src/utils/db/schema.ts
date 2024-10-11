import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tempLog = pgTable("temp_log", {
	id: serial("id").primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	log: text("log"),
});
