import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Manufacturer Portal",
	description:
		"Dedicated portal for you to find the best manufacturers for you and your business",
};

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div
				className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900"
				suppressHydrationWarning
			>
				<main>{children}</main>
			</div>
		</>
	);
}
