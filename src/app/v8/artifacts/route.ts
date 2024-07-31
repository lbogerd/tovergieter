import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	try {
		throw new Error("Not implemented");
	} catch (error) {
		return new Response((error as Object).toString(), { status: 400 });
	}
}
