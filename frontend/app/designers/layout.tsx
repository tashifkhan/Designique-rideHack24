import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Designer Portal",
	description:
		"Connect with India's top fashion designers, showcase designs, and collaborate on creative projects.",
};

export default function DesignerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			{/* Designer-specific layout elements can go here */}
			<main className="">{children}</main>
		</div>
	);
}
