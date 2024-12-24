"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";
import PlaceholdersAndVanishInputDemo from "../Manufacturer/Serach";

export default function NavbarShop() {
	const [isOpen, setIsOpen] = useState(false);
	const [isSerOpen, setIsSerOpen] = useState(false);
	const [showServices, setShowServices] = useState(false);
	const [showKnowMore, setShowKnowMore] = useState(false);
	const services = ["Designers", "Manufacturer", "Shop"];
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
									{/* Regular nav items */}
									{["Home", "Collections"].map((item) => (
										<div key={item} className="relative group">
											<Link
												href={item == "Home" ? "/" : `/${item.toLowerCase()}`}
												className="block text-gray-200 hover:text-purple-400 transition-colors duration-300"
											>
												{item}
											</Link>
											<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
										</div>
									))}
									<div className="">
										<button
											onClick={(e) => {
												e.stopPropagation();
												setShowServices(!showServices);
											}}
											className="w-full md:w-auto text-left text-gray-200 hover:text-purple-400 transition-colors duration-300 flex items-center justify-between md:justify-start"
										>
											Services
											<svg
												className={`ml-1 w-4 h-4 transition-transform duration-200 ${
													showServices ? "rotate-180" : ""
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
										{showServices && (
											<div
												className="relative mt-2 w-48 rounded-xl 
												bg-white/10 backdrop-blur-md
												shadow-[0_8px_32px_rgba(0,0,0,0.2)] 
												py-2 border border-white/20 
												backdrop-saturate-[1.8]
												backdrop-brightness-125
												z-50"
											>
												{services.map((service) => (
													<Link
														key={service}
														href={`/${service.toLowerCase().replace(" ", "-")}`}
														className="block px-4 py-2 text-gray-200 hover:text-purple-400 hover:bg-white/[0.05] transition-colors duration-300"
													>
														{service}
													</Link>
												))}
											</div>
										)}
									</div>

									{/* Contact link */}
									<div className="relative group">
										<button
											onClick={(e) => {
												e.stopPropagation();
												setShowKnowMore(!showKnowMore);
											}}
											className="w-full md:w-auto text-left text-gray-200 hover:text-purple-400 transition-colors duration-300 flex items-center justify-between md:justify-start"
										>
											Know More
											<svg
												className={`ml-1 w-4 h-4 transition-transform duration-200 ${
													showKnowMore ? "rotate-180" : ""
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
										{showKnowMore && (
											<div
												className="relative mt-2 w-48 rounded-xl 
												bg-white/10 backdrop-blur-md
												shadow-[0_8px_32px_rgba(0,0,0,0.2)] 
												py-2 border border-white/20 
												backdrop-saturate-[1.8]
												backdrop-brightness-125
												z-50"
											>
												{["Contact", "About"].map((item) => (
													<Link
														key={item}
														href={`/${item.toLowerCase()}`}
														className="block px-4 py-2 text-gray-200 hover:text-purple-400 hover:bg-white/[0.05] transition-colors duration-300"
													>
														{item}
													</Link>
												))}
											</div>
										)}
									</div>
								</nav>
							</SheetContent>
						</Sheet>
						<Link
							href="/shop"
							className="text-xl font-bold ml-4 lg:ml-0 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text"
						>
							Designique Shop
						</Link>
					</div>

					<div className="hidden lg:flex items-center gap-8">
						<nav className="flex gap-8">
							{["Home", "Collections"].map((item) => (
								<div key={item} className="relative group">
									<Link
										href={item == "Home" ? "/" : `/${item.toLowerCase()}`}
										className="block text-gray-200 hover:text-purple-400 transition-colors duration-300"
									>
										{item}
									</Link>
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
								</div>
							))}
							<div className="relative">
								<button
									onClick={(e) => {
										e.stopPropagation();
										setShowServices(!showServices);
									}}
									className="text-gray-200 hover:text-purple-400 transition-colors duration-300 flex items-center"
								>
									Services
									<svg
										className={`ml-1 w-4 h-4 transition-transform duration-200 ${
											showServices ? "rotate-180" : ""
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{showServices && (
									<div
										className="absolute mt-2 w-48 rounded-xl 
										bg-white/10 backdrop-blur-md
										shadow-[0_8px_32px_rgba(0,0,0,0.2)] 
										py-2 border border-white/20 
										backdrop-saturate-[1.8]
										backdrop-brightness-125
										z-50"
									>
										{services.map((service) => (
											<Link
												key={service}
												href={`/${service.toLowerCase().replace(" ", "-")}`}
												className="block px-4 py-2 text-gray-200 hover:text-purple-400 hover:bg-white/[0.05] transition-colors duration-300"
											>
												{service}
											</Link>
										))}
									</div>
								)}
							</div>
							<div className="relative">
								<button
									onClick={(e) => {
										e.stopPropagation();
										setShowKnowMore(!showKnowMore);
									}}
									className="text-gray-200 hover:text-purple-400 transition-colors duration-300 flex items-center"
								>
									Know More
									<svg
										className={`ml-1 w-4 h-4 transition-transform duration-200 ${
											showKnowMore ? "rotate-180" : ""
										}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{showKnowMore && (
									<div
										className="absolute mt-2 w-48 rounded-xl 
										bg-white/10 backdrop-blur-md
										shadow-[0_8px_32px_rgba(0,0,0,0.2)] 
										py-2 border border-white/20 
										backdrop-saturate-[1.8]
										backdrop-brightness-125
										z-50"
									>
										{["Contact", "About"].map((item) => (
											<Link
												key={item}
												href={`/${item.toLowerCase()}`}
												className="block px-4 py-2 text-gray-200 hover:text-purple-400 hover:bg-white/[0.05] transition-colors duration-300"
											>
												{item}
											</Link>
										))}
									</div>
								)}
							</div>
						</nav>
					</div>

					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								if (isSerOpen) {
									console.log("Searching...");
								}
								setIsSerOpen(!isSerOpen);
							}}
						>
							<Search className="h-5 w-5" />
							<div
								className={`absolute top-16 left-0 w-full bg-transpent p-4 transform origin-top transition-all duration-300 ease-in-out ${
									isSerOpen ? "inline-block" : "hidden"
								}`}
							>
								<div
									className={`absolute left-0 w-screen bg-transperent transform transition-all duration-300 ease-in-out rounde-xl ${
										isSerOpen
											? "opacity-100 translate-y-0"
											: "opacity-0 -translate-y-full pointer-events-none"
									}`}
								>
									<div className="max-w-2xl mx-auto py-4 px-4">
										<div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[600px] px-4">
											<div className="fixed top-1/2 right-18 z-[99] text-gray-400 text-sm mb-2 text-center backdrop-blur-sm bg-white/10 p-2 rounded-xl shadow-lg w-[2.5rem]">
												<Search size={20} className="inline-block mr-2" />
											</div>
											<PlaceholdersAndVanishInputDemo />
										</div>
									</div>
								</div>
							</div>
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
