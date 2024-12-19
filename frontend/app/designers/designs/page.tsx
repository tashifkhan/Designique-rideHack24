"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

interface Design {
	id: number;
	image: string;
	title: string;
	designer: {
		name: string;
		avatar: string;
	};
}

const designs: Design[] = [
	{
		id: 1,
		image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
		title: "Modern Minimalist",
		designer: {
			name: "Jane Doe",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
		},
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
		title: "Industrial Chic",
		designer: {
			name: "John Smith",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
		},
	},
	{
		id: 3,
		image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		title: "Scandinavian Style",
		designer: {
			name: "Emma Wilson",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
		},
	},
	{
		id: 4,
		image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a",
		title: "Contemporary Fusion",
		designer: {
			name: "Alex Chen",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
		},
	},
	{
		id: 5,
		image: "https://images.unsplash.com/photo-1618219740975-d40978bb7378",
		title: "Eco-Friendly Living",
		designer: {
			name: "Sarah Martinez",
			avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
		},
	},
	{
		id: 6,
		image: "https://images.unsplash.com/photo-1616486171624-cfd858ea0449",
		title: "Urban Loft",
		designer: {
			name: "Michael Park",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		},
	},
	{
		id: 7,
		image: "https://images.unsplash.com/photo-1616486171624-cfd858ea0449",
		title: "Urban Loft",
		designer: {
			name: "Michael Park",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		},
	},
	{
		id: 8,
		image: "https://images.unsplash.com/photo-1616486171624-cfd858ea0449",
		title: "Urban Loft",
		designer: {
			name: "Michael Park",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		},
	},
	{
		id: 9,
		image: "https://images.unsplash.com/photo-1616486171624-cfd858ea0449",
		title: "Urban Loft",
		designer: {
			name: "Michael Park",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		},
	},
];

export default function DesignsGallery() {
	const [activeIndex, setActiveIndex] = useState(0);
	// const { ref } = useParallax<HTMLDivElement>({ speed: 10 });

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container mx-auto px-4 py-16">
					<h1 className="text-4xl font-bold text-white text-center mb-12">
						Featured Designs
					</h1>

					<div className="relative">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{designs.map((design, index) => (
								<motion.div
									key={design.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.2 }}
									className="group relative"
								>
									<div className="relative h-80 w-full overflow-hidden rounded-xl">
										<div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300" />
										<Image
											src={design.image}
											alt={design.title}
											fill
											className="object-cover transform group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
									<h3 className="text-xl font-semibold text-white mb-2">
										{design.title}
									</h3>
									<div className="flex items-center space-x-3">
										<div className="relative h-10 w-10 rounded-full overflow-hidden">
											<Image
												src={design.designer.avatar}
												alt={design.designer.name}
												fill
												className="object-cover"
											/>
										</div>
										<span className="text-white/90">
											{design.designer.name}
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* <div className="flex justify-center mt-12 space-x-2">
						{designs.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveIndex(index)}
								className={`h-2 w-2 rounded-full transition-all duration-300 ${
									index === activeIndex ? "bg-white w-6" : "bg-white/50"
								}`}
							/>
						))}
					</div> */}
				</div>
			</motion.div>
		</div>
	);
}
