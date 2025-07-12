"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "@/components/Home/Carousel";
import { BackgroundLines } from "@/components/ui/background-lines";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Home: React.FC = () => {
	const [isCarouselVisible, setIsCarouselVisible] = useState(false);
	const router = useRouter();

	// MongoDB connection and intersection observer setup
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsCarouselVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.04 }
		);

		const carouselElement = document.getElementById("carousel");
		if (carouselElement) {
			observer.observe(carouselElement);
		}

		return () => {
			if (carouselElement) {
				observer.unobserve(carouselElement);
			}
		};
	}, []);

	const words = [{ text: "Designers +" }, { text: "Manufacturers" }];
	const words2 = [{ text: "Built by Tashif & Adarsh", className: "text-blue-500" }];

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

	// Features section data
	const features = [
		{
			title: "Seamless Integration",
			description:
				"Connect designers and manufacturers with our intuitive platform",
		},
		{
			title: "Real-time Collaboration",
			description: "Work together across time zones and locations effortlessly",
		},
		{
			title: "Streamlined Workflow",
			description: "Reduce time-to-market with our optimized process tools",
		},
		{
			title: "Quality Assurance",
			description: "Built-in verification and validation at every stage",
		},
	];

	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900 overflow-hidden">
			{/* Animated Background Orbs - Optimized for mobile */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute top-[13%] left-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] rounded-full bg-purple-500/20 blur-[120px]"
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
					className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[60%] sm:h-[40%] rounded-full bg-blue-500/20 blur-[120px]"
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
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero Section - Enhanced for mobile */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="min-h-screen relative flex items-center overflow-hidden"
				>
					<BackgroundLines className="flex items-center justify-center w-full min-h-screen flex-col">
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="space-y-4 sm:space-y-6 text-center"
						>
							{/* Title with responsive sizing */}
							<motion.div
								className="relative group rounded-3xl p-4 sm:p-8"
								whileHover={{ scale: 1.02 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<h1 className="text-6xl sm:text-7xl md:text-[8rem] font-sans font-bold tracking-tight">
									<span className="text-center bg-gradient-to-b from-neutral-600 to-white bg-clip-text text-transparent animate-gradient">
										DESIGNIQUE
									</span>
								</h1>
								<motion.div
									className="absolute top-8 right-8 sm:inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
									transition={{ duration: 0.3 }}
								/>
							</motion.div>

							<h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-300">
								Where Design Meets Innovation
							</h2>

							{/* Always visible explore button on mobile */}
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300"
								onClick={() =>
									document
										.getElementById("features")
										?.scrollIntoView({ behavior: "smooth" })
								}
							>
								<span>Explore More</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 ml-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
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

						{/* Typewriter Section - Mobile optimized */}
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="mt-8 sm:mt-16 rounded-2xl p-4 sm:p-8"
						>
							<TypewriterEffectSmooth words={words} className="mb-2" />
							<div className="flex justify-center mb-6">
								<TypewriterEffectSmooth words={words2} />
							</div>

							{/* Action Buttons - Improved for mobile */}
							<div className="flex flex-row items-center justify-center space-x-3 sm:space-x-4">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-[120px] sm:w-[150px] px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
									onClick={() => router.push("/signup")}
								>
									Join now
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-[120px] sm:w-[150px] px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:shadow-xl transition-all duration-300"
									onClick={() => router.push("/signup")}
								>
									Sign up
								</motion.button>
							</div>

							{/* Scroll indicator for mobile */}
							<motion.div
								className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-12 sm:hidden"
								animate={{ y: [0, 10, 0] }}
								transition={{ repeat: Infinity, duration: 1.5 }}
							>
								<span className="text-white/60 text-sm mb-1">Scroll</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-white/60"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 14l-7 7m0 0l-7-7m7 7V3"
									/>
								</svg>
							</motion.div>
						</motion.div>
					</BackgroundLines>
				</motion.div>

				{/* Carousel Section with padding for mobile */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: isCarouselVisible ? 1 : 0 }}
					transition={{ duration: 0.8 }}
					id="carousel"
					className="w-full py-8 sm:py-16"
				>
					{isCarouselVisible && <Carousel />}
				</motion.div>

				{/* NEW: Features Section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="w-full my-12 sm:my-24 px-4 sm:px-0"
					id="features"
				>
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">
							<span className="bg-gradient-to-b from-neutral-600 to-white bg-clip-text text-transparent">
								Why Choose Us
							</span>
						</h2>
						<p className="mt-4 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
							Empowering designers and manufacturers with cutting-edge tools
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
							>
								<h3 className="text-xl font-semibold mb-2 text-white">
									{feature.title}
								</h3>
								<p className="text-white/70">{feature.description}</p>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Testimonials Section - Improved spacing */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="w-full my-12 sm:my-24 backdrop-blur-3xl bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-8"
				>
					<div className="text-center mb-8 sm:mb-16">
						<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold">
							<span className="bg-gradient-to-b from-neutral-600 to-white bg-clip-text text-transparent">
								What People Say
							</span>
						</h2>
						<p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
							Hear from our community of designers and manufacturers
						</p>
					</div>
					<div className="">
						<AnimatedTestimonials testimonials={testimonials} />
					</div>
				</motion.div>

				{/* NEW: Call to action section */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="w-full my-12 sm:my-24"
				>
					<div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden">
						{/* Background gradient effect similar to other sections */}
						<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-70" />

						<div className="relative z-10">
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
								<span className="bg-gradient-to-b from-neutral-600 to-white bg-clip-text text-transparent">
									Ready to Transform Your Design Journey?
								</span>
							</h2>

							<p className="text-lg sm:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
								Join our community of innovators and take your designs from
								concept to reality
							</p>

							<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
									onClick={() => router.push("/signup")}
								>
									Get Started Today
								</motion.button>

								<Link href="/about" className="group">
									<motion.span
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-300 inline-flex items-center"
									>
										Learn More
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</motion.span>
								</Link>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Home;
