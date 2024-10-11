import db from "~/utils/db";

export default async function Events() {
	const events = await db.tempLog.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<>
			<p>TurboCache event logs</p>

			<ol className="w-full p-2 space-y-2">
				{events.map((event) => (
					<li
						key={event.id}
						className="bg-gray-100 w-full p-1 rounded-md whitespace-pre-wrap"
					>
						{JSON.stringify(JSON.parse(event.log), undefined, 2)}
					</li>
				))}
			</ol>
		</>
	);
}
