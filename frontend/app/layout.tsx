import type { Metadata } from "next";
import NavBarMain from "@/components/navbar/NavBarMain";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
	title: "Designique",
	description:
		"A comprehensive platform for designers and manufacturers acompied with a marketplace for savy shopers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`antialiased bg-gradient-to-br from-slate-900 via-[#000] to-slate-900`}
			>
				<NavBarMain />
				{children}
				<Footer />
			</body>
		</html>
	);
}
