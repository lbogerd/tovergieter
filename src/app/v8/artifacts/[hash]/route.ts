export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import { env } from "~/utils/env.mjs";

const filePath = (hash: string) => `${env.UPLOAD_PATH}/${hash}`;

const checkAuth = async (
	request: NextRequest,
	params: {
		hash: string;
	},
) => {
	const authHeader = request.headers.get("Authorization");

	if (!authHeader) {
		throw new Error("No Authorization header provided");
	}

	const token = authHeader.split(" ")[1];

	if (token !== env.API_TOKEN) {
		throw new Error("Invalid token");
	}

	if (!params.hash) {
		throw new Error("No hash provided");
	}

	return;
};

/**
 * Upload a file to the server.
 */
export async function PUT(
	request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		await checkAuth(request, context.params);

		// check if directory exists, if not create it
		try {
			await fs.access(env.UPLOAD_PATH);
		} catch (_error) {
			await fs.mkdir(env.UPLOAD_PATH);
		}

		// get the file from the request and save it to the file system
		const file = await request.blob();
		const arrayBuffer = await file.arrayBuffer();

		await fs.writeFile(filePath(context.params.hash), Buffer.from(arrayBuffer));

		return new Response(null, { status: 202 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

/**
 * Get a file from the server.
 */
export async function GET(
	request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		await checkAuth(request, context.params);

		const file = await fs.readFile(filePath(context.params.hash));

		return new Response(file, { status: 200 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

/**
 * Check if a file exists on the server.
 */
export async function HEAD(
	request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		await checkAuth(request, context.params);

		await fs.access(filePath(context.params.hash));

		return new Response(null, { status: 200 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}
