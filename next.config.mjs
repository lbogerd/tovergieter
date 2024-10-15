import { env } from "./src/utils/env.mjs";

const ensureEnvIsValidated = env;

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
};

export default nextConfig;
