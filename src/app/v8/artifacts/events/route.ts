export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import z from "zod";
import { parseHeaders, parseQuery } from "~/utils/parsers";

const headerSchema = z.object({
  "x-artifact-client-ci": z.string(),
  "x-artifact-client-interactive": z.union([z.literal("0"), z.literal("1")]),
});

const querySchema = z.object({
  teamId: z.string(),
  slug: z.string(),
});

const sourceSchema = z.enum(["LOCAL", "REMOTE"]);
const hitLiteral = z.literal("HIT");
const missLiteral = z.literal("MISS");

const baseBodySchema = z.object({
  sessionId: z.string(),
  source: sourceSchema,
  hash: z.string().uuid(),
});

const bodySchema = z.array(
  z.union([
    baseBodySchema
      .merge(
        z.object({
          event: missLiteral,
        })
      )
      .strict(),
    baseBodySchema
      .merge(
        z.object({
          event: hitLiteral,
          duration: z.number().positive(),
        })
      )
      .strict(),
  ])
);

export async function POST(request: NextRequest) {
  try {
    const headers = parseHeaders(headerSchema)(request.headers);

    // get query params from the request
    const searchParams = request.nextUrl.searchParams;
    const query = parseQuery(querySchema)(searchParams);

    const body = bodySchema.parse(await request.json());

    console.log({ headers, query, body });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response((error as Object).toString(), { status: 400 });
  }
}
