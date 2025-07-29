"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { designers } from "@/lib/data/designers";
import { ChatModal } from "@/components/chat/ChatModal";
import { Button } from "@/components/ui/button";

interface Design {
	id: string;
	title: string;
	imageUrl: string;
	description: string;
	category: string;
}

export default function DesignerPortfolioPage() {
	const params = useParams();
	const id = params.id as string;
	const designer = designers[parseInt(id) - 1];
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [showChat, setShowChat] = useState(false);

	// In a real app, this would come from authentication context
	const mockUserId = "507f1f77bcf86cd799439011";

	// Mock designs data - in a real app, this would come from an API
	const designs: Design[] = [
		{
			id: "1",
			title: "Modern Minimalist Dress",
			imageUrl: "/api/placeholder/400/300",
			description:
				"A sleek, minimalist dress with clean lines and contemporary appeal.",
			category: "dresses",
		},
		{
			id: "2",
			title: "Bohemian Summer Collection",
			imageUrl: "/api/placeholder/400/300",
			description: "Free-spirited designs perfect for summer adventures.",
			category: "summer",
		},
		{
			id: "3",
			title: "Evening Gown Elegance",
			imageUrl: "/api/placeholder/400/300",
			description: "Sophisticated evening wear for special occasions.",
			category: "evening",
		},
		{
			id: "4",
			title: "Casual Street Style",
			imageUrl: "/api/placeholder/400/300",
			description: "Comfortable yet stylish everyday wear.",
			category: "casual",
		},
		{
			id: "5",
			title: "Winter Collection",
			imageUrl: "/api/placeholder/400/300",
			description: "Warm and cozy designs for the winter season.",
			category: "winter",
		},
		{
			id: "6",
			title: "Bridal Collection",
			imageUrl: "/api/placeholder/400/300",
			description: "Dreamy wedding dresses for the perfect day.",
			category: "bridal",
		},
	];

	const categories = [
		"all",
		"dresses",
		"summer",
		"evening",
		"casual",
		"winter",
		"bridal",
	];

	const filteredDesigns =
		selectedCategory === "all"
			? designs
			: designs.filter((design) => design.category === selectedCategory);

	if (!designer) {
		return <div>Designer not found</div>;
	}

	return (
		<>
			<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-white mb-4">
							{designer.name}'s Portfolio
						</h1>
						<p className="text-gray-400 text-lg max-w-2xl mx-auto">
							Explore the creative journey and stunning designs from{" "}
							{designer.name}
						</p>
					</div>

					{/* Category Filter */}
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						{categories.map((category) => (
							<Button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-6 py-2 rounded-full transition-all duration-300 ${
									selectedCategory === category
										? "bg-purple-600 text-white"
										: "bg-white/10 text-gray-300 hover:bg-white/20"
								}`}
							>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</Button>
						))}
					</div>

					{/* Chat Button */}
					<div className="flex justify-center mb-8">
						<Button
							onClick={() => setShowChat(true)}
							className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
						>
							Chat with {designer.name}
						</Button>
					</div>

					{/* Designs Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
										<div className="p-4 sm:p-6 h-full flex flex-col justify-end">
											<h3 className="text-lg sm:text-xl font-bold text-white mb-2">
												{design.title}
											</h3>
											<p className="text-white/80 text-xs sm:text-sm">
												{design.description}
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</main>
			<ChatModal
				designer={designers[parseInt(id) - 1]}
				open={showChat}
				onClose={() => setShowChat(false)}
				userId={mockUserId}
			/>
		</>
	);
}
