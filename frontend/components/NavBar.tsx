"use client";
import React, { useState } from "react";
import Link from "next/link";
const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showServices, setShowServices] = useState(false);

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
					className="md:hidde text-white"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
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
		</nav>
	);
};

export default NavBar;
