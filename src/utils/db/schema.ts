import { relations } from "drizzle-orm";
import { pgTableCreator, serial, text, timestamp } from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `tovergieter_${name}`);

export const tempLog = pgTable("temp_log", {
	id: serial("id").primaryKey(),
	log: text("log"),
});

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull(),
	password_hash: text("password").notNull(),
});
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
}));

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull(),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});
export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user),
}));
