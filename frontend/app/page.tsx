"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "@/components/Home/Carousel";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

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

	const words = [
		{ text: "Designers +" },
		{ text: "Manufacturers + " },
		{ text: "Shopers" },
		{ text: "=>" },
		{ text: "\nThe UnderDogs.", className: "text-blue-500" },
	];

	const testimonials = [
		{
			quote:
				"The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
			name: "Sarah Chen",
			designation: "Product Manager at TechFlow",
			src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
			name: "Michael Rodriguez",
			designation: "CTO at InnovateSphere",
			src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
			name: "Emily Watson",
			designation: "Operations Director at CloudScale",
			src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
			name: "James Kim",
			designation: "Engineering Lead at DataPro",
			src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote:
				"The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
			name: "Lisa Thompson",
			designation: "VP of Technology at FutureNet",
			src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];

	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			{/* Animated Background Orbs */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute top-[13%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]"
					animate={{
						x: [0, 50, -50, 0],
						y: [0, -50, 50, 0],
						scale: [1, 1.2, 0.8, 1],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]"
					animate={{
						x: [0, -50, 50, 0],
						y: [0, 50, -50, 0],
						scale: [1, 0.8, 1.2, 1],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>

			{/* Main Content */}
			<div className="relative">
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="h-screen relative overflow-hidden"
				>
					<BackgroundLines className="flex items-center justify-center w-full h-screen flex-col px-4">
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="space-y-4 text-center"
						>
							{/* Title with Glassmorphic Card */}
							<motion.div
								className="relative group rounded-3xl p-8 backdrop-blur-lg bg-white/5 border border-white/10"
								whileHover={{ scale: 1.02 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h2 className="text-4xl sm:text-6xl md:text-[8rem] font-sans font-bold tracking-tight">
									<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
										DESIGNIQUE
									</span>
								</h2>
								<motion.div
									className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
									transition={{ duration: 0.3 }}
								/>
							</motion.div>

							<h3 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-300">
								Where Design Meets Innovation
							</h3>

							{/* Enhanced Button */}
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300"
							>
								Explore More
								<motion.div
									className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
									animate={{
										opacity: [0, 0.5, 0],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
									}}
								/>
							</motion.button>
						</motion.div>

						{/* Typewriter Section */}
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
						>
							<TypewriterEffectSmooth words={words} />

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Join now
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Signup
								</motion.button>
							</div>
						</motion.div>
					</BackgroundLines>
				</motion.div>

				{/* Carousel Section */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isCarouselVisible ? 1 : 0 }}
					transition={{ duration: 0.8 }}
					id="carousel"
					className="w-full py-16"
				>
					{isCarouselVisible && <Carousel />}
				</motion.div>

				{/* Testimonials Section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="w-full my-16 backdrop-blur-3xl bg-white/5 rounded-3xl border border-white/10 p-8"
				>
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-6xl font-bold">
							<span className=" text-center bg-gradient-to-b from-neutral-600 to-white  bg-clip-text text-transparent">
								What People Say
							</span>
						</h2>
					</div>
					<div className="">
						<AnimatedTestimonials testimonials={testimonials} />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Home;
