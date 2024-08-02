"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { deleteFile } from "~/actions/files";

export const Button = ({
	children,
	fileName,
}: {
	children: ReactNode;
	fileName: string;
}) => {
	const router = useRouter();

	return (
		<button
			className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-75"
			onClick={() => deleteFile(fileName).then(() => router.refresh())}
		>
			{children}
		</button>
	);
};
