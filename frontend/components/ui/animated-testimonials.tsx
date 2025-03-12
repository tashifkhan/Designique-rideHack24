"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
	quote: string;
	name: string;
	designation: string;
	src: string;
};
export const AnimatedTestimonials = ({
	testimonials,
	autoplay = false,
}: {
	testimonials: Testimonial[];
	autoplay?: boolean;
}) => {
	const [active, setActive] = useState(0);

	const handleNext = () => {
		setActive((prev) => (prev + 1) % testimonials.length);
	};

	const handlePrev = () => {
		setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const isActive = (index: number) => {
		return index === active;
	};

	useEffect(() => {
		if (autoplay) {
			const interval = setInterval(handleNext, 5000);
			return () => clearInterval(interval);
		}
	}, [autoplay]);

	const randomRotateY = () => {
		return Math.floor(Math.random() * 21) - 10;
	};
	return (
		<div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 pb-8 md:pb-16">
			<div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
				<div>
					<div className="relative h-64 sm:h-72 md:h-80 w-full">
						<AnimatePresence>
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.src}
									initial={{
										opacity: 0,
										scale: 0.9,
										z: -100,
										rotate: randomRotateY(),
									}}
									animate={{
										opacity: isActive(index) ? 1 : 0.7,
										scale: isActive(index) ? 1 : 0.95,
										z: isActive(index) ? 0 : -100,
										rotate: isActive(index) ? 0 : randomRotateY(),
										zIndex: isActive(index)
											? 999
											: testimonials.length + 2 - index,
										y: isActive(index) ? [0, -60, 0] : 0,
									}}
									exit={{
										opacity: 0,
										scale: 0.9,
										z: 100,
										rotate: randomRotateY(),
									}}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
									className="absolute inset-0 origin-bottom"
								>
									<Image
										src={testimonial.src}
										alt={testimonial.name}
										width={500}
										height={500}
										draggable={false}
										className="h-full w-full rounded-2xl md:rounded-3xl object-cover object-center shadow-lg"
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
				<div className="flex justify-between flex-col py-2 md:py-4">
					<motion.div
						key={active}
						initial={{
							y: 20,
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: -20,
							opacity: 0,
						}}
						transition={{
							duration: 0.2,
							ease: "easeInOut",
						}}
					>
						<h3 className="text-xl md:text-2xl font-bold text-white ">
							{testimonials[active].name}
						</h3>
						<p className="text-xs md:text-sm text-gray-500">
							{testimonials[active].designation}
						</p>
						<motion.p className="text-base md:text-lg text-gray-500 mt-4 md:mt-8 ">
							{testimonials[active].quote.split(" ").map((word, index) => (
								<motion.span
									key={index}
									initial={{
										filter: "blur(10px)",
										opacity: 0,
										y: 5,
									}}
									animate={{
										filter: "blur(0px)",
										opacity: 1,
										y: 0,
									}}
									transition={{
										duration: 0.2,
										ease: "easeInOut",
										delay: 0.02 * index,
									}}
									className="inline-block"
								>
									{word}&nbsp;
								</motion.span>
							))}
						</motion.p>
					</motion.div>
					<div className="flex gap-4 pt-6 md:pt-12">
						<button
							onClick={handlePrev}
							className="h-8 w-8 md:h-7 md:w-7 rounded-full bg-opacity-10 bg-white backdrop-blur-md backdrop-filter border border-white/20 flex items-center justify-center group/button hover:bg-opacity-20 transition-all duration-300 active:scale-95 touch-manipulation"
						>
							<IconArrowLeft className="h-5 w-5 text-white/70 group-hover/button:rotate-12 transition-transform duration-300" />
						</button>
						<button
							onClick={handleNext}
							className="h-8 w-8 md:h-7 md:w-7 rounded-full bg-opacity-10 bg-white backdrop-blur-md backdrop-filter border border-white/20 flex items-center justify-center group/button hover:bg-opacity-20 transition-all duration-300 active:scale-95 touch-manipulation"
						>
							<IconArrowRight className="h-5 w-5 text-white/70 group-hover/button:-rotate-12 transition-transform duration-300" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
