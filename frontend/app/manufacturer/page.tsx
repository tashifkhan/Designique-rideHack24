"use client";
import Hero from "@/components/Manufacturer/Hero";
import Features from "@/components/Manufacturer/TopFeatures";
import TopManufacturers from "@/components/Manufacturer/TopManufacturers";

import React from "react";
import DirectionAwareHoverDemo from "@/components/Manufacturer/FeaturedManuCard";
import PlaceholdersAndVanishInputDemo from "@/components/Manufacturer/Serach";

import img1 from "@/public/dhruv-avatar.jpg";
import img2 from "@/public/tashif-avatar.jpg";
import img3 from "@/public/angel-avatar.jpg";
import img4 from "@/public/aman-avatar.jpg";
import { Search } from "lucide-react";

const ManufacturersPage: React.FC = () => {
	const cardsData = [
		{
			imageUrl: img1.src,
			title: "Mountain View Manufacturing",
			location: "Denver, Colorado",
			rating: 4.8,
			cost: "$$$$",
			price: "₹1299 / unit",
		},
		{
			imageUrl: img2.src,
			title: "Coastal Industries",
			location: "Miami, Florida",
			rating: 4.6,
			cost: "$$$",
			price: "₹999 / unit",
		},
		{
			imageUrl: img3.src,
			title: "Urban Manufacturing Co.",
			location: "Chicago, Illinois",
			rating: 4.9,
			cost: "$$$",
			price: "₹799 / unit",
		},
		{
			imageUrl: img4.src,
			title: "Desert Tech Solutions",
			location: "Phoenix, Arizona",
			rating: 4.7,
			cost: "$$$$",
			price: "₹1199 / unit",
		},
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
					<h2 className="text-3xl font-bold text-white pb-9">
						Featured Manufacturers
					</h2>

					{/* Content Section */}
					<div className="flex flex-col flex-grow justify-between">
						<div className="flex flex-wrap justify-center gap-2 flex-grow px-4">
							{cardsData.map((card, index) => (
								<div
									key={index}
									className="w-[30%] min-w-[15.8rem] max-w-[15.8rem] flex-shrink-0"
								>
									<DirectionAwareHoverDemo
										imageUrl={card.imageUrl}
										title={card.title}
										rating={`${card.rating}⭐️`}
										location={card.location}
										price={`${card.price}`}
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
