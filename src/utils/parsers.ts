import { z, ZodObject, ZodSchema } from "zod";

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
