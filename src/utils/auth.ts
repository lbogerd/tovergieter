import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "./db/db";
import { session, user } from "./db/schema";
import { env } from "./env.mjs";

import type { Session, User } from "lucia";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// NextJS does not support cookie refreshing
		// so set the cookie to never expire
		expires: false,
		attributes: {
			secure: env.NODE_ENV === "production",
		},
	},
});

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		// get the session id from the cookie or set it to null
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);

		// next.js throws when you attempt to set cookie when rendering page
		try {
			// session is available and fresh
			if (result.session?.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}

			// there is no session
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
		} catch {}

		return result;
	},
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
