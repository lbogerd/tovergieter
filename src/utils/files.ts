import { promises as fs } from "fs";
import { unit } from "mathjs";
import { env } from "~/utils/env.mjs";

export const getCurrentFiles = async () => {
	return await fs.readdir(env.UPLOAD_PATH);
};

export const getFullFilesStats = async () => {
	const files = await getCurrentFiles();
	const fileStats = [];

	for (const file of files) {
		const stats = await fs.stat(`${env.UPLOAD_PATH}/${file}`);

		fileStats.push({
			name: file,
			...stats,
		});
	}

	return fileStats;
};

export const getFormattedFilesStats = async () => {
	const files = await getFullFilesStats();

	return {
		files: files.map((file) => {
			return {
				name: file.name,
				size: unit(file.size, "bytes").to("MiB").toJSON(),
				createdAt: file.birthtime,
				lastUsed: file.atime,
			};
		}),
		totalSize: unit(
			files.reduce((acc, file) => acc + file.size, 0),
			"bytes",
		)
			.to("MiB")
			.toJSON(),
	};
};
