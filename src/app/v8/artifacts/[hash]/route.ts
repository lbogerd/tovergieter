import { NextRequest } from "next/server";
import { z } from "zod";
import { headerSchema } from "~/utils/schema";

const putHeaderSchema = z
	.object({
		"Content-Length": z.coerce.number(),
		"x-artifact-duration": z.coerce.number(),
		"x-artifact-tag": z.string(),
	})
	.merge(headerSchema);

export async function PUT(request: NextRequest) {
	try {
		throw new Error("Not implemented");
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
