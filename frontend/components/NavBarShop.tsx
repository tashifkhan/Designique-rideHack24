"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";

export default function NavbarShop() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	return (
		<div className="fixed w-full z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="lg:hidden">
									<Menu className="h-6 w-6" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-[300px] bg-black/95">
								<nav className="flex flex-col gap-4 mt-8">
									<Link href="/" className="text-lg hover:text-primary">
										Home
									</Link>
									<Link
										href="/collections"
										className="text-lg hover:text-primary"
									>
										Collections
									</Link>
									<Link
										href="/designers"
										className="text-lg hover:text-primary"
									>
										Designers
									</Link>
									<Link href="/about" className="text-lg hover:text-primary">
										About
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
						<Link
							href="/"
							className="text-xl font-bold ml-4 lg:ml-0 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text"
						>
							Designique Shop
						</Link>
					</div>

					<div className="hidden lg:flex items-center gap-8">
						<Link
							href="/collections"
							className="hover:text-primary transition-colors"
						>
							Collections
						</Link>
						<Link
							href="/designers"
							className="hover:text-primary transition-colors"
						>
							Designers
						</Link>
						<Link
							href="/about"
							className="hover:text-primary transition-colors"
						>
							About
						</Link>
					</div>

					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon">
							<Search className="h-5 w-5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								router.push("/shop/checkout");
							}}
						>
							<ShoppingBag className="h-5 w-5" />
							<span className="absolute top-2 right-2 h-4 w-4 text-xs bg-primary rounded-full flex items-center justify-center">
								0
							</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
