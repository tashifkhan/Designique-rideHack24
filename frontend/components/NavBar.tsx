"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showServices, setShowServices] = useState(false);
	const pathname = usePathname();

	const services = ["Web Design", "App Development", "Consulting", "Marketing"];

	return (
		<nav
			className="fixed w-full z-50 px-6 py-4"
			style={{
				background: `rgba(17, 25, 40, 90})`,
				backdropFilter: "blur(16px)",
				boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
				borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
			}}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
					Designique
				</div>

				{/* Mobile menu button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 text-gray-600 hover:text-gray-800"
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* Desktop menu */}
				<div
					className={`${
						isOpen ? "block" : "hidden"
					} md:flex absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-[#111928] md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8`}
				>
					{["Home", "About"].map((item) => (
						<div key={item} className="relative group">
							<Link
								href={`/${item.toLowerCase()}`}
								className="text-gray-200 hover:text-purple-400 transition-colors duration-300"
							>
								{item}
							</Link>
							<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
						</div>
					))}

					{/* Services dropdown */}
					<div className="relative group">
						<button
							onClick={() => setShowServices(!showServices)}
							className="text-gray-200 hover:text-purple-400 transition-colors duration-300 flex items-center"
						>
							Services
							<svg
								className={`ml-1 w-4 h-4 transition-transform ${
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
								className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg py-2"
								style={{
									background: `rgba(17, 25, 40, 90})`,
									backdropFilter: "blur(16px)",
									boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
									borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
								}}
							>
								{services.map((service) => (
									<Link
										key={service}
										href={`/services/${service
											.toLowerCase()
											.replace(" ", "-")}`}
										className="block px-4 py-2 text-gray-200 hover:text-purple-400 transition-colors duration-300"
									>
										{service}
									</Link>
								))}
							</div>
						)}
					</div>

					<div className="relative group">
						<Link
							href="/contact"
							className="text-gray-200 hover:text-purple-400 transition-colors duration-300"
						>
							Contact
						</Link>
						<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
					</div>
				</div>

				<button className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:opacity-90 backdrop-blur-lg">
					Get Started
				</button>
			</div>
			{isOpen && (
				<div className="md:hidden bg-white border-b">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{["a", "b", "c", "d"].map((item) => (
							<Link
								key={item}
								href={`/${item.toLowerCase()}`}
								className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
									pathname === `/${item.toLowerCase()}`
								}
									? "bg-blue-50 text-blue-600"
									: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
							}`}
							>
								{item}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
