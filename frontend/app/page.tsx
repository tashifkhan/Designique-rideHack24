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
		{
			text: "Designers +",
		},
		{
			text: "Manufacturers + ",
		},
		{
			text: "Shopers",
		},
		{
			text: "=>",
		},
		{
			text: "\nThe UnderDogs.",
			className: "text-blue-500",
		},
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
						<div className="relative group">
							<h2 className="mt-11 text-center bg-gradient-to-b from-neutral-600 to-white text-4xl sm:text-6xl md:text-[8rem] font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight bg-clip-text text-transparent animate-gradient">
								DESIGNIQUE
							</h2>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
							<div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
						</div>
						<h3 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-400">
							Where Design Meets Innovation
						</h3>
						<button className="group relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 mt-4 sm:mt-8 overflow-hidden rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
							<span className="relative z-10 text-sm sm:text-base text-neutral-300 group-hover:text-white transition-colors duration-300">
								Explore More
							</span>
							<div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</button>
					</div>

					<div className="flex flex-col items-center justify-center mt-8 sm:mt-12 md:mt-16">
						<p className="text-neutral-600 text-xs sm:text-base px-4 text-center">
							The road to freedom starts from here
						</p>
						<div className="px-4 sm:px-0">
							<TypewriterEffectSmooth words={words} />
						</div>
						<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4 mt-4">
							<button className="group relative w-32 sm:w-40 h-8 sm:h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm transition-all duration-300 overflow-hidden">
								<span className="relative z-10">Join now</span>
								<div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
							</button>
							<button className="group relative w-32 sm:w-40 h-8 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm transition-all duration-300 overflow-hidden">
								<span className="relative z-10">Signup</span>
								<div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
							</button>
						</div>
					</div>
				</BackgroundLines>
			</div>


			<div id="carousel" className="flex items-center justify-center w-full">
				{isCarouselVisible && <Carousel />}
			</div>

			<div className="flex justify-center items-center w-full py-16">
				<h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
					What People Say
				</h2>
			</div>
			<AnimatedTestimonials testimonials={testimonials} />
		</div>
	);
};

export default Home;
