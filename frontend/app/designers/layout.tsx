import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Designer Portal - Connect with Fashion Designers",
	description:
		"Connect with India's top fashion designers, showcase designs, and collaborate on creative projects.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}