export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { z } from "zod";
import {
	headerSchema,
	parseHeaders,
	parseQuery,
	querySchema,
} from "~/utils/schema";
// import { promises as fs } from "fs";
import {promises as fs} from "fs";
import { Readable } from "stream";

const putHeaderSchema = z
	.object({
		"Content-Length": z.coerce.number(),
		"x-artifact-duration": z.coerce.number(),
		"x-artifact-tag": z.string(),
	})
	.merge(headerSchema);

export async function PUT(
	request: NextRequest,
	context: { params: { hash: string } },
) {
	try {
		const headers = parseHeaders(putHeaderSchema)(request.headers);

		const hash = context.params.hash;
		if (!hash) {
			throw new Error("No hash provided");
		}

		const writeStream = fs.(`/tmp/${hash}.txt`, {
			flags: "w",
		});
		const readStream = request.body!.pipeTo(writeStream);
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}

export async function GET(request: NextRequest) {
	try {
		throw new Error("Not implemented");
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
