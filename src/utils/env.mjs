import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DB_URL: z.string().url(),
		UPLOAD_PATH: z.string(),

		// these are always available in the server environment
		// so we set them as optional as they are not required
		// in the .env file
		// would not be needed if we used typescript but that
		// would require running tsc before running the app
		NODE_ENV: z.string().optional(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	},
});
