"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarShop from "./NavBarShop";

const NavBarMain = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showServices, setShowServices] = useState(false);
	const pathname = usePathname();

	const services = ["Web Design", "App Development", "Consulting", "Marketing"];

	useEffect(() => {
		const closeMenu = () => {
			if (isOpen) setIsOpen(false);
			if (showServices) setShowServices(false);
		};

		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [isOpen, showServices]);

	const handleNavClick = (e: any) => {
		e.stopPropagation();
	};

	return (
		<nav
			className={`
			fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-950/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]`}
		>
			<div
				className={`${
					pathname == "/shop" ? "hidden " : ""
				}max-w-7xl mx-auto px-4 md:px-6 py-4`}
			>
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
					>
						Designique
					</Link>

					{/* Mobile menu button */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsOpen(!isOpen);
							setShowServices(false);
						}}
						className="md:hidden p-2 text-gray-200 hover:text-white transition-colors"
						aria-label="Toggle menu"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>

					{/* Navigation items */}
					<div
						onClick={handleNavClick}
						className={`${
							isOpen ? "flex" : "hidden"
						} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-0 w-full md:w-auto bg-slate-950/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 border-b border-slate-950/20 md:border-0 shadow-[0_4px_30px_rgba(0,0,0,0.1)] md:shadow-none`}
					>
						{/* Regular nav items */}
						{["Home", "About"].map((item) => (
							<div key={item} className="relative group">
								<Link
									href={`/${item.toLowerCase()}`}
									className="block text-gray-200 hover:text-purple-400 transition-colors duration-300"
								>
									{item}
								</Link>
								<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
							</div>
						))}

						{/* Services dropdown */}
						<div className="relative group">
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
									className="md:absolute relative left-0 mt-2 w-48 rounded-xl 
									bg-white/10 backdrop-blur-md
									shadow-[0_8px_32px_rgba(0,0,0,0.2)] 
									py-2 border border-white/20 
									backdrop-saturate-[1.8]
									backdrop-brightness-125"
								>
									{services.map((service) => (
										<Link
											key={service}
											href={`/services/${service
												.toLowerCase()
												.replace(" ", "-")}`}
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
							<Link
								href="/contact"
								className="block text-gray-200 hover:text-purple-400 transition-colors duration-300"
							>
								Contact
							</Link>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
						</div>
					</div>

					{/* CTA Button */}
					<button className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
						Get Started
					</button>
				</div>
			</div>
			{pathname == "/shop" && <NavbarShop />}
		</nav>
	);
};

export default NavBarMain;
