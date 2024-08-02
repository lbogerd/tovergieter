export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import z from "zod";
import {
	headerSchema,
	parseHeaders,
	parseQuery,
	querySchema,
} from "~/utils/zod-schema";
import { db } from "~/utils/db/db";
import { tempLog } from "~/utils/db/schema";

const sourceSchema = z.enum(["LOCAL", "REMOTE"]);
const eventSchema = z.enum(["HIT", "MISS"]);

const bodySchema = z.array(
	z.object({
		sessionId: z.string().uuid(),
		source: sourceSchema,
		hash: z.string(),
		event: eventSchema,
		duration: z.number().optional(),
	}),
);

export async function POST(request: NextRequest) {
	try {
		const headers = parseHeaders(headerSchema)(request.headers);

		// get query params from the request
		const searchParams = request.nextUrl.searchParams;
		const query = parseQuery(querySchema)(searchParams);

		const body = bodySchema.parse(await request.json());

		await db.insert(tempLog).values({
			log: JSON.stringify({
				headers,
				query,
				body,
			}),
		});

		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error(error);

		return new Response((error as Object).toString(), { status: 400 });
	}
}
