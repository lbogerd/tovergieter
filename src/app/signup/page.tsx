import Link from "next/link";

import { hash } from "@node-rs/argon2";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Form } from "~/components/Form";
import { lucia, validateRequest } from "~/utils/auth";
import { db } from "~/utils/db/db";
import { user } from "~/utils/db/schema";

import type { ActionResult } from "~/components/Form";

export default async function Page() {
	const { user } = await validateRequest();

	if (user) {
		return redirect("/");
	}

	return (
		<>
			<div className="mx-auto">
				<h1>Create an account</h1>
				<Form
					action={signup}
					className="flex flex-col space-y-4 max-w-xs bg-blue-200 p-4"
				>
					<div className="flex flex-col">
						<label htmlFor="username">Username</label>
						<input name="username" id="username" />
					</div>
					<div className="flex flex-col">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" />
					</div>
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Continue
					</button>
				</Form>
			</div>

			<Link href="/login">Go to sign in</Link>
		</>
	);
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
	"use server";

	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}

	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const passwordHash = await hash(password, {
		// minimum parameters as recommended by lucia docs
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	const userId = generateId(15);

	try {
		await db.insert(user).values({
			id: userId,
			username,
			password_hash: passwordHash,
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	} catch (e) {
		console.error(e);

		return {
			error: "An unknown error occurred",
		};
	}

	return redirect("/");
}
