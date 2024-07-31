import { z } from "zod";

export const headerSchema = z.object({
	"x-artifact-client-ci": z.string(),
	"x-artifact-client-interactive": z.union([z.literal("0"), z.literal("1")]),
});

export const querySchema = z.object({
	teamId: z.string(),
	slug: z.string(),
});

export function parseHeaders<T extends z.ZodType<object>>(schema: T) {
	return (headers: Headers): z.infer<T> => {
		const parsedHeaders = Object.fromEntries(headers.entries());

		return schema.parse(parsedHeaders);
	};
}

export function parseQuery<T extends z.ZodType<object>>(schema: T) {
	return (searchParams: URLSearchParams): z.infer<T> => {
		const parsedQuery = Object.fromEntries(searchParams.entries());

		return schema.parse(parsedQuery);
	};
}
