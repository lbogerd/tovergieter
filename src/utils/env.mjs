import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		API_TOKEN: z.string(),
		NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
		UPLOAD_PATH: z.string(),
	},
});
