"use client";

import React, { useEffect } from "react";
import BackgroundBeamsWithCollisionDemo from "@/components/Manufacturer/ManufacturerOne";
import DirectionAwareHoverDemo from "@/components/Manufacturer/CardManufact";
import PlaceholdersAndVanishInputDemo from "@/components/Manufacturer/Serach"; // Your Search component

import img1 from "@/images/dhruv-avatar.jpg";
import img2 from "@/images/tashif-avatar.jpg";
import img3 from "@/images/angel.png";
import img4 from "@/images/aman-avatar.jpg";
import { Search } from "lucide-react";

const BackgroundBeamsPage: React.FC = () => {
	const cardsData = [
		{ imageUrl: img1.src, title: "In the mountains", price: "$1299 / night" },
		{ imageUrl: img2.src, title: "By the beach", price: "$999 / night" },
		{ imageUrl: img3.src, title: "In the city", price: "$799 / night" },
		{ imageUrl: img4.src, title: "In the desert", price: "$1199 / night" },
	];

	// useEffect(() => {
	// 	const scrollToPosition = () => {
	// 		const start = window.scrollY;
	// 		const end = start + window.innerHeight; // Scroll to the next screen height
	// 		const duration = 1000; // Duration of scroll in ms (1000ms = 1 second)
	// 		let startTime: number | null = null;

	// 		const scrollStep = (timestamp: number) => {
	// 			if (!startTime) startTime = timestamp;
	// 			const progress = timestamp - startTime;
	// 			const scrollAmount = Math.min(progress / duration, 1) * (end - start);

	// 			window.scrollTo(0, start + scrollAmount);

	// 			if (progress < duration) {
	// 				requestAnimationFrame(scrollStep); // Keep scrolling until duration is reached
	// 			}
	// 		};

	// 		requestAnimationFrame(scrollStep); // Start scrolling
	// 	};

	// 	const timer = setTimeout(() => {
	// 		scrollToPosition();
	// 	}, 3000); // Delay the scroll by 3 seconds

	// 	return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
	// }, []);

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			<div className="min-h-screen flex flex-col space-y-6">
				<div>
					<BackgroundBeamsWithCollisionDemo />
				</div>
				{/* Fixed search bar */}
				<div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[600px] px-4">
					<div className="fixed top-1/2 right-18 z-[99] text-gray-400 text-sm mb-2 text-center backdrop-blur-sm bg-white/10 p-2 rounded-xl shadow-lg w-[2.5rem]">
						<Search size={20} className="inline-block mr-2" />
					</div>
					<PlaceholdersAndVanishInputDemo />
				</div>

				{/* Content Section */}
				<div className="flex flex-col flex-grow justify-between">
					{/* Title: Best-Reviewed Manufacturers */}
					<div className="text-center font-semibold text-7xl mt-8 text-white font-[Bebas Neue]">
						Best-Reviewed Manufacturers
					</div>

					{/* Content Section */}
					<div className="flex flex-col flex-grow justify-between">
						{/* Cards Container */}
						<div className="flex flex-wrap justify-center gap-4 flex-grow px-4">
							{cardsData.map((card, index) => (
								<div
									key={index}
									className="w-[30%] min-w-[250px] max-w-[300px] flex-shrink-0"
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
				</div>
			</div>
		</main>
	);
};

export default BackgroundBeamsPage;
