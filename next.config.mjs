import { env } from "./src/utils/env.mjs";

const ensureEnvIsValidated = env;

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"],
	},
};

export default nextConfig;
