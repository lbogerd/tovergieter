import { round } from "mathjs";
import { redirect } from "next/navigation";
import { Button } from "~/components/Button";
import { validateRequest } from "~/utils/auth";
import { getFormattedFilesStats } from "~/utils/files";

export default async function Home() {
	const { user } = await validateRequest();

	if (!user) redirect("/login");

	const files = await getFormattedFilesStats();
	// sort files by last used, most recent first
	const orderedFiles = files.files.sort((a, b) => {
		if (a.lastUsed > b.lastUsed) {
			return -1;
		}

		if (a.lastUsed < b.lastUsed) {
			return 1;
		}

		return 0;
	});

	return (
		<>
			<p>
				Disk space used: {round(files.totalSize.value, 2)}{" "}
				{files.totalSize.unit}
			</p>

			<ol className="w-full p-2 space-y-2">
				{orderedFiles.map((file) => (
					<li
						key={file.name}
						className="grid grid-cols-5 w-full gap-4 p-1 bg-gray-100 rounded-md [&>span]:m-auto"
					>
						<span className="truncate">{file.name}</span>

						<span className="text-sm">
							{round(file.size.value, 2)} {file.size.unit}
						</span>

						<span className="text-sm">
							{file.createdAt.toLocaleDateString()}{" "}
							{file.createdAt.toLocaleTimeString()}
						</span>

						<span className="text-sm">
							{file.lastUsed.toLocaleDateString()}{" "}
							{file.lastUsed.toLocaleTimeString()}
						</span>

						<Button fileName={`${file.name}`}>Delete</Button>
					</li>
				))}
			</ol>
		</>
	);
}
