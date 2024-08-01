export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { promises as fs } from "fs";

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
			await fs.access("./uploads");
		} catch (error) {
			await fs.mkdir("./uploads");
		}

		// get the file from the request and save it to the file system
		const file = await request.blob();
		const arrayBuffer = await file.arrayBuffer();

		await fs.writeFile(`./uploads/${hash}`, Buffer.from(arrayBuffer));

		return new Response(null, { status: 202 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

export async function GET(
	request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		const hash = context.params.hash;

		if (!hash) {
			throw new Error("No hash provided");
		}

		const file = await fs.readFile(`./uploads/${hash}`);

		return new Response(file, { status: 200 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

export async function HEAD(request: NextRequest) {
	try {
		throw new Error("Not implemented");
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}
