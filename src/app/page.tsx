import { round } from "mathjs";
import { redirect } from "next/navigation";
import { Button } from "~/components/Button";
import { validateRequest } from "~/utils/auth";
import { getFormattedFilesStats } from "~/utils/files";

export default async function Home() {
	const { user } = await validateRequest();

	if (!user) redirect("/login");

	const files = await getFormattedFilesStats();

	return (
		<main className="flex min-h-dvh flex-col items-center py-3">
			<h1 className="text-2xl font-bold text-center">Tovergieter</h1>
			<p>
				Disk space used: {round(files.totalSize.value, 2)}{" "}
				{files.totalSize.unit}
			</p>

			<ol className="w-full p-2">
				{files.files.map((file) => (
					<li
						key={file.name}
						className="flex items-center justify-between w-full p-2 my-2 bg-gray-100 rounded-md"
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
		</main>
	);
}
