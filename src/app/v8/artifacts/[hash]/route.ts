export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import { env } from "~/utils/env.mjs";

export async function PUT(
	request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		const hash = context.params.hash;
		if (!hash) {
			throw new Error("No hash provided");
		}

		// check if directory exists, if not create it
		try {
			await fs.access(env.UPLOAD_PATH);
		} catch (error) {
			await fs.mkdir(env.UPLOAD_PATH);
		}

		// get the file from the request and save it to the file system
		const file = await request.blob();
		const arrayBuffer = await file.arrayBuffer();

		await fs.writeFile(`${env.UPLOAD_PATH}/${hash}`, Buffer.from(arrayBuffer));

		return new Response(null, { status: 202 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

export async function GET(
	_request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		const hash = context.params.hash;

		if (!hash) {
			throw new Error("No hash provided");
		}

		const file = await fs.readFile(`${env.UPLOAD_PATH}/${hash}`);

		return new Response(file, { status: 200 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

export async function HEAD(
	_request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		const hash = context.params.hash;

		if (!hash) {
			throw new Error("No hash provided");
		}

		try {
			await fs.access(`${env.UPLOAD_PATH}/${hash}`);
		} catch (error) {
			return new Response(null, { status: 404 });
		}

		return new Response(null, { status: 200 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}
