"use client";
import Hero from "@/components/Manufacturer/Hero";
import Features from "@/components/designers/header/Features";
import TopManufacturers from "@/components/Manufacturer/TopManufacturers";

import React from "react";
import DirectionAwareHoverDemo from "@/components/Manufacturer/FeaturedManuCard";
import PlaceholdersAndVanishInputDemo from "@/components/Manufacturer/Serach";

import img1 from "@/images/dhruv-avatar.jpg";
import img2 from "@/images/tashif-avatar.jpg";
import img3 from "@/images/angel.png";
import img4 from "@/images/aman-avatar.jpg";
import { Search } from "lucide-react";

const ManufacturersPage: React.FC = () => {
	const cardsData = [
		{ imageUrl: img1.src, title: "In the mountains", price: "$1299 / night" },
		{ imageUrl: img2.src, title: "By the beach", price: "$999 / night" },
		{ imageUrl: img3.src, title: "In the city", price: "$799 / night" },
		{ imageUrl: img4.src, title: "In the desert", price: "$1199 / night" },
	];

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			<div className="xl:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 pt-[12rem]">
				<Hero />
				<div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[600px] px-4">
					<div className="fixed top-1/2 right-18 z-[99] text-gray-400 text-sm mb-2 text-center backdrop-blur-sm bg-white/10 p-2 rounded-xl shadow-lg w-[2.5rem]">
						<Search size={20} className="inline-block mr-2" />
					</div>
					<PlaceholdersAndVanishInputDemo />
				</div>
				<Features />
				<div className="flex flex-col flex-grow justify-between">
					<h2 className="text-3xl font-bold text-white pb-5">
						Top Manufacturers
					</h2>

					{/* Content Section */}
					<div className="flex flex-col flex-grow justify-between">
						<div className="flex flex-wrap justify-center gap-4 flex-grow px-4">
							{cardsData.map((card, index) => (
								<div
									key={index}
									className="w-[30%] min-w-[15.8rem] max-w-[15.8rem] flex-shrink-0"
								>
									<DirectionAwareHoverDemo
										imageUrl={card.imageUrl}
										title={card.title}
										price={card.price}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="mb-24">
						<TopManufacturers />
					</div>
				</div>
			</div>
		</main>
	);
};

export default ManufacturersPage;
