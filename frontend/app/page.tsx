"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "@/components/Home/Carousel";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";

const Home: React.FC = () => {
	const [isCarouselVisible, setIsCarouselVisible] = useState(false);

	useEffect(() => {
		// Smooth scroll effect
		const scrollToPosition = () => {
			const start = window.scrollY;
			const end = start + window.innerHeight; // Scroll to the next screen height
			const duration = 1000; // Duration of scroll in ms (1000ms = 1 second)
			let startTime: number | null = null;

			const scrollStep = (timestamp: number) => {
				if (!startTime) startTime = timestamp;
				const progress = timestamp - startTime;
				const scrollAmount = Math.min(progress / duration, 1) * (end - start);

				window.scrollTo(0, start + scrollAmount);

				if (progress < duration) {
					requestAnimationFrame(scrollStep); // Keep scrolling until duration is reached
				}
			};

			requestAnimationFrame(scrollStep); // Start scrolling
		};

		// Trigger smooth scroll after 3 seconds
		const timer = setTimeout(() => {
			scrollToPosition();
		}, 3000); // Delay the scroll by 3 seconds

		return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
	}, []);

	useEffect(() => {
		// Intersection Observer to trigger loading of AppleCardsCarouselDemo when in view
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsCarouselVisible(true);
					observer.disconnect(); // Stop observing once the element is in view
				}
			},
			{ threshold: 0.04 } // Trigger when 50% of the element is in the viewport
		);

		const carouselElement = document.getElementById("carousel");

		if (carouselElement) {
			observer.observe(carouselElement); // Start observing the element
		}

		// Cleanup the observer
		return () => {
			if (carouselElement) {
				observer.unobserve(carouselElement);
			}
		};
	}, []);

	return (
		<div className="w-full bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			<div className="absolute inset-0">
				<motion.div
					className="absolute top-[13%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px]"
					animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
					transition={{ duration: 10, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[100px]"
					animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
					transition={{ duration: 10, repeat: Infinity }}
				/>
			</div>
			<div className="h-screen w-full relative overflow-hidden">
				<BackgroundLines className="flex items-center justify-center w-full h-screen flex-col px-4">
					<div className="space-y-4 text-center">
						<h2 className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-gradient">
							DESIGNIQUE
						</h2>
						<h3 className="text-xl md:text-2xl lg:text-3xl font-light text-neutral-400">
							Where Design Meets Innovation
						</h3>
						<button className="group relative px-8 py-3 mt-8 overflow-hidden rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
							<span className="relative z-10 text-neutral-300 group-hover:text-white transition-colors duration-300">
								Explore More
							</span>
							<div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</button>
					</div>
				</BackgroundLines>
			</div>

			<div id="carousel" className="flex items-center justify-center">
				{isCarouselVisible && <Carousel />}
			</div>
		</div>
	);
};

export default Home;
