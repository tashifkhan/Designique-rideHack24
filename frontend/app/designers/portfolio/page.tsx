"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Design {
	id: string;
	title: string;
	imageUrl: string;
	description: string;
	category: string;
}

// Removed DesignerPortfolioProps as we'll fetch data directly in the page

export default function DesignerPortfolioPage() {
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Example designer data - in a real app, you'd fetch this from an API
	const designer = {
		id: "1",
		name: "John Doe",
		designs: [
			{
				id: "1",
				title: "Project 1",
				imageUrl:
					"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80",
				description: "Description for project 1",
				category: "ui/ux",
			},
			// Add more sample designs as needed
		],
	};

	const filteredDesigns =
		selectedCategory === "all"
			? designer.designs
			: designer.designs.filter(
					(design) => design.category === selectedCategory
			  );

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900 p-8">
			{/* Glass Header */}
			<div className="backdrop-blur-lg</svg> bg-black/40 rounded-2xl p-8 mb-8 shadow-2xl mt-16 border border-white/10 hover:bg-black/50 transition-all duration-300">
				<div className="flex items-center justify-between">
					<h1 className="text-4xl font-bold text-white/90">
						{designer.name}'s Portfolio
					</h1>
					<div className="flex gap-4">
						<button className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition backdrop-blur-sm">
							Follow
						</button>
						<button className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition backdrop-blur-sm">
							Chat
						</button>
					</div>
				</div>
				<div className="flex gap-4 mt-4">
					{["all", "ui/ux", "branding", "illustration"].map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-4 py-2 rounded-xl backdrop-blur-md transition-all duration-300
								${
									selectedCategory === category
										? "bg-white/20 text-white"
										: "bg-white/5 text-white/70 hover</div>:bg-white/10"
								}`}
						>
							{category.toUpperCase()}
						</button>
					))}
				</div>
			</div>
			{/* Portfolio Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredDesigns.map((design) => (
					<motion.div
						key={design.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						whileHover={{ scale: 1.02 }}
						className="group relative overflow-hidden rounded-xl backdrop-blur-lg bg-white/5"
					>
						<div className="aspect-video relative">
							<Image
								src={design.imageUrl}
								alt={design.title}
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<div className="p-6 h-full flex flex-col justify-end">
									<h3 className="text-xl font-bold text-white mb-2">
										{design.title}
									</h3>
									<p className="text-white/80 text-sm">{design.description}</p>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
