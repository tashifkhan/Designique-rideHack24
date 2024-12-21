"use client";
import React from "react";
import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const AboutPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900 pt-24 relative overflow-hidden">
			{/* Glassmorphic background elements */}
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

			{/* Header Banner */}
			<div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
				<motion.div
					className="text-center mb-12 backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-3xl font-bold text-white mb-4">Who We Are</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						We are RideHack, a revolutionary platform dedicated to transforming
						the way people experience and share rides, making transportation
						more accessible, efficient, and community-driven.
					</p>
				</motion.div>
			</div>

			{/* Main Content */}
			<div className="max-w-6xl mx-auto px-8 py-2 relative z-10">
				{/* Two Column Layout */}
				<div className="grid md:grid-cols-2 gap-12 mb-12">
					{/* Left Column */}
					<motion.div
						className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl transition-all duration-300"
						whileHover={{ scale: 1.05 }}
					>
						<CardContent className="p-6">
							<h2 className="text-2xl font-bold mb-4 text-white">
								Our Mission
							</h2>
							<p className="mb-4 text-gray-300">
								Our mission is to revolutionize the ride-sharing experience by:
							</p>
							<ul className="space-y-3 text-gray-300">
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>
										Creating a seamless platform for connecting riders and
										drivers
									</span>
								</li>
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>
										Implementing innovative solutions for safer and more
										efficient rides
									</span>
								</li>
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>
										Building a community-driven ecosystem for shared mobility
									</span>
								</li>
							</ul>
						</CardContent>
					</motion.div>

					{/* Right Column */}
					<motion.div
						className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl transition-all duration-300"
						whileHover={{ scale: 1.05 }}
					>
						<CardContent className="p-6">
							<h2 className="text-2xl font-bold mb-4 text-white">
								Key Features
							</h2>
							<ul className="space-y-3 text-gray-300">
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>Real-time ride matching and tracking</span>
								</li>
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>Advanced safety and verification systems</span>
								</li>
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>Transparent pricing and payment processing</span>
								</li>
								<li className="flex items-start">
									<span className="font-semibold mr-2">•</span>
									<span>Community feedback and rating system</span>
								</li>
							</ul>
						</CardContent>
					</motion.div>
				</div>

				{/* Vision Section */}
				<motion.div
					className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl transition-all duration-300 mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<CardContent className="p-6">
						<h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
						<p className="text-lg leading-relaxed text-gray-300">
							We envision a future where transportation is more accessible,
							sustainable, and community-driven. Through innovative technology
							and user-centric design, we're building a platform that brings
							people together and makes every journey count.
						</p>
					</CardContent>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl transition-all duration-300 mb-24"
					whileHover={{ scale: 1.05 }}
				>
					<CardContent className="p-6 text-center">
						<h2 className="text-2xl font-bold mb-4 text-white">
							Join Our Journey
						</h2>
						<p className="text-lg leading-relaxed text-gray-300 mb-6">
							Be part of the transportation revolution. Whether you're a rider
							or a driver, join us in creating a better way to travel.
						</p>
						<motion.button
							className="px-8 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white rounded-xl font-semibold transition duration-300 transform"
							whileHover={{ scale: 1.1 }}
						>
							Get Started
						</motion.button>
					</CardContent>
				</motion.div>
			</div>
		</div>
	);
};

export default AboutPage;
