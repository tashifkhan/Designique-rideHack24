"use client";

import { motion } from "framer-motion";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";

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

export default Hero;
