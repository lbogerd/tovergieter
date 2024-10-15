import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		API_TOKEN: z.string(),
		NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
		UPLOAD_PATH: z.string(),

		// these are always available in the server environment
		// so we set them as optional as they are not required
		// in the .env file
		// would not be needed if we used typescript but that
		// would require running tsc before running the app
		NODE_ENV: z.string().optional(),
	},
});
