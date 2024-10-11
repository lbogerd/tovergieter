import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "tovergieter",
	description: "Self-hosted Turborepo cache",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="flex min-h-dvh flex-col items-center py-3 max-w-screen-lg mx-auto">
					<h1 className="text-2xl font-bold text-center">Tovergieter</h1>
					{children}
				</main>
			</body>
		</html>
	);
}
