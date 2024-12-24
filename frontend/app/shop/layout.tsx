import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/shop/theme-provider";

export const metadata: Metadata = {
	title: "Glassmorphic Fashion",
	description: "Modern fashion e-commerce with unique designs",
};

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
				<div
					className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900"
					suppressHydrationWarning
				>
					<main>{children}</main>
					<Toaster />
				</div>
			</ThemeProvider>
		</>
	);
}
