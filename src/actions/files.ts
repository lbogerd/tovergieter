"use server";

import { promises as fs } from "fs";
import { env } from "~/utils/env.mjs";

export const deleteFile = async (fileName: string) => {
	await fs.unlink(`${env.UPLOAD_PATH}/${fileName}`);
};
