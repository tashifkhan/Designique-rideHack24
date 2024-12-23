"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
	Search,
	MessageSquare,
	TrendingUp,
	MessageCircle,
	Share2,
	Factory,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const ManufacturerPage: React.FC = () => {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			<div className="xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<Hero />
				<SearchBar />
				<Features />
				<FeaturedManufacturers />
				<TopManufacturers />
			</div>
		</main>
	);
};

const Hero = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
			className="text-center mb-16"
		>
			<BackgroundBeamsWithCollision>
				<h1 className="text-4xl md:text-6xl font-bold text-white mb-6 pt-20">
					Connect with Top
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
						{" "}
						Manufacturers
					</span>
				</h1>
				<p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto pt-3">
					Your gateway to India's most reliable manufacturers. Find the perfect
					partner for your fashion designs and bring your creations to life.
				</p>
			</BackgroundBeamsWithCollision>
		</motion.div>
	);
};

const SearchBar = () => {
	return (
		<div className="relative max-w-2xl mx-auto mb-16">
			<div className="backdrop-blur-lg bg-white/10 p-2 border border-white/20 rounded-2xl">
				<div className="flex items-center">
					<Search className="h-5 w-5 text-gray-400 ml-3" />
					<input
						type="text"
						placeholder="Search by location, specialization, or capacity..."
						className="w-full bg-transparent border-none focus:ring-transparent text-white placeholder-gray-400 ml-4 px-4 py-2"
					/>
					<button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 ml-4 rounded-3xl">
						Search
					</button>
				</div>
			</div>
		</div>
	);
};

const features = [
	{
		icon: <Factory className="h-6 w-6" />,
		title: "Production Capacity",
		description:
			"Scale your production with manufacturers of various capacities",
	},
	{
		icon: <MessageSquare className="h-6 w-6" />,
		title: "Direct Communication",
		description:
			"Connect directly with manufacturers for seamless collaboration",
	},
	{
		icon: <TrendingUp className="h-6 w-6" />,
		title: "Quality Metrics",
		description: "Track manufacturer ratings and performance analytics",
	},
];

const Features = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
		>
			{features.map((feature, index) => (
				<div key={index}>
					<div className="h-[12rem] backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
						<div className="text-purple-400 mb-4">{feature.icon}</div>
						<h3 className="text-xl font-semibold text-white mb-2">
							{feature.title}
						</h3>
						<p className="text-gray-300">{feature.description}</p>
					</div>
				</div>
			))}
		</motion.div>
	);
};

const manufacturers = [
	{
		id: 1,
		name: "TextilePro Manufacturing",
		location: "Mumbai, Maharashtra",
		specialization: "Luxury Fabrics & Traditional Wear",
		minOrderQuantity: "100 pieces",
		productionCapacity: "5000 pieces/month",
		rating: 4.8,
		avatar: "/api/placeholder/64/64",
		coverImage: "/api/placeholder/400/300",
	},
	{
		id: 2,
		name: "FashionCraft Industries",
		location: "Delhi, NCR",
		specialization: "Contemporary Western Wear",
		minOrderQuantity: "200 pieces",
		productionCapacity: "8000 pieces/month",
		rating: 4.6,
		avatar: "/api/placeholder/64/64",
		coverImage: "/api/placeholder/400/300",
	},
	{
		id: 3,
		name: "Heritage Garments",
		location: "Jaipur, Rajasthan",
		specialization: "Traditional Ethnic Wear",
		minOrderQuantity: "150 pieces",
		productionCapacity: "3000 pieces/month",
		rating: 4.9,
		avatar: "/api/placeholder/64/64",
		coverImage: "/api/placeholder/400/300",
	},
];

const FeaturedManufacturers = () => {
	return (
		<section className="my-16">
			<h2 className="text-3xl font-bold text-white mb-8">
				Featured Manufacturers
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{manufacturers.map((manufacturer, index) => (
					<motion.div
						key={manufacturer.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<ManufacturerCard manufacturer={manufacturer} />
					</motion.div>
				))}
			</div>
		</section>
	);
};

const TopManufacturers = () => {
	return (
		<section className="mt-16">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-3xl font-bold text-white">Top Manufacturers</h2>
				<Link
					href="/manufacturers/all"
					className="text-sm text-purple-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
				>
					See more
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{manufacturers.map((manufacturer) => (
					<ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
				))}
			</div>
		</section>
	);
};

interface ManufacturerCardProps {
	manufacturer: {
		id: number;
		name: string;
		location: string;
		specialization: string;
		minOrderQuantity: string;
		productionCapacity: string;
		rating: number;
		avatar: string;
		coverImage: string;
	};
}

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
	manufacturer,
}) => {
	const [showChat, setShowChat] = useState(false);

	return (
		<motion.div
			whileHover={{ y: -5 }}
			className="backdrop-blur-lg bg-white/10 rounded-xl overflow-hidden border border-white/20"
		>
			<div className="relative h-48 md:h-64">
				<Image
					src={manufacturer.coverImage}
					alt={`${manufacturer.name}'s Facility`}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
			</div>
			<div className="p-4 md:p-6">
				<div className="flex items-center mb-4">
					<div className="relative w-12 h-12">
						<Image
							src={manufacturer.avatar}
							alt={manufacturer.name}
							fill
							className="rounded-full border-2 border-purple-400 object-cover"
						/>
					</div>
					<div className="ml-4">
						<h3 className="text-lg md:text-xl font-semibold text-white">
							{manufacturer.name}
						</h3>
						<p className="text-gray-400 text-sm md:text-base">
							{manufacturer.location}
						</p>
					</div>
				</div>

				<div className="space-y-2 mb-4">
					<p className="text-gray-300 text-sm md:text-base">
						{manufacturer.specialization}
					</p>
					<div className="flex flex-wrap gap-2">
						<span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
							Min: {manufacturer.minOrderQuantity}
						</span>
						<span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
							Capacity: {manufacturer.productionCapacity}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<div className="flex space-x-2">
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
						>
							<MessageCircle className="h-5 w-5 text-gray-400" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
						>
							<Share2 className="h-5 w-5 text-gray-400" />
						</Button>
					</div>
					<div className="flex items-center text-gray-400">
						<span className="text-yellow-400">★</span>
						<span className="ml-1">{manufacturer.rating}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default ManufacturerPage;
