export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { z } from "zod";
import { parseQuery, querySchema } from "~/utils/zod-schema";

const responseSchema = z.object({
	status: z.union([
		z.literal("disabled"),
		z.literal("enabled"),
		z.literal("over_limit"),
		z.literal("paused"),
	]),
});

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const query = parseQuery(querySchema)(searchParams);

		console.log({ query });

		const response: z.infer<typeof responseSchema> = {
			status: "disabled",
		};

		return new Response(JSON.stringify(response), { status: 200 });
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}
