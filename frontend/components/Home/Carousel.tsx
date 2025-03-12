"use client";
import Image from "next/image";
import React from "react";
import { Carousell, Card } from "@/components/ui/apple-cards-carousel";
import img1 from "@/images/Manufacture.jpeg";
import img2 from "@/images/ECOM.png";
import img3 from "@/images/Designer.png";
import img4 from "@/images/About.png";
import img5 from "@/images/HI2.png";

export function Carousel() {
	const cards = data.map((card, index) => (
		<Card key={card.src} card={card} index={index} />
	));

	return (
		<div className="w-full h-full py-20 flex flex-col">
			<h2 className="text-center pt-8 w-full bg-gradient-to-b from-neutral-600 to-white  bg-clip-text text-transparent text-3xl md:text-5xl lg:text-7xl font-bold font-sans tracking-tight hover:scale-105 transition-transform duration-300">
				MEET OUR 3 PILLARS
			</h2>
			<div className="flex-1">
				<Carousell items={cards} />
			</div>
		</div>
	);
}

const ManufacturerContent = () => {
	return (
		<div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-8 md:p-14 rounded-3xl mb-4 relative">
			{/* Enhanced mobile blur overlay */}
			<div className="absolute inset-0 bg-black/40 md:bg-black/0 backdrop-blur-sm md:backdrop-blur-none rounded-3xl" />

			<div className="relative z-10">
				<p className="text-white md:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
					<span className="font-bold text-white md:text-neutral-200">
						Transforming Ideas into Reality
					</span>{" "}
					Our expert manufacturers bring designs to life with precision and
					quality. We partner with trusted facilities to ensure each product
					meetshe higmeehs test standards of craftsmanship and durability.
				</p>
				<Image
					src={img5.src}
					alt="Manufacturer"
					height="300"
					width="300"
					className="w-1/3 h-1/3 mx-auto object-contain opacity-70 md:opacity-100 mt-4"
				/>
			</div>
		</div>
	);
};

const DesignerContent = () => {
	return (
		<div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-8 md:p-14 rounded-3xl mb-4 relative">
			{/* Enhanced mobile blur overlay */}
			<div className="absolute inset-0 bg-black/40 md:bg-black/0 backdrop-blur-sm md:backdrop-blur-none rounded-3xl" />

			<div className="relative z-10">
				<p className="text-white md:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
					<span className="font-bold text-white md:text-neutral-200">
						Creating Innovative Designs
					</span>{" "}
					Our talented designers blend creativity with functionality to create
					unique and appealing products. Every design is crafted with attention
					to detail and user eriencto e in mind.
				</p>
				<Image
					src={img5.src}
					alt="Designer"
					height="300"
					width="300"
					className="w-1/3 h-1/3 mx-auto object-contain opacity-70 md:opacity-100 mt-4"
				/>
			</div>
		</div>
	);
};

const EcommerceContent = () => {
	return (
		<div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-8 md:p-14 rounded-3xl mb-4 relative">
			{/* Enhanced mobile blur overlay */}
			<div className="absolute inset-0 bg-black/40 md:bg-black/0 backdrop-blur-sm md:backdrop-blur-none rounded-3xl" />

			<div className="relative z-10">
				<p className="text-white md:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
					<span className="font-bold text-white md:text-neutral-200">
						Seamless Shopping Experience
					</span>{" "}
					Our e-commerce platform provides a user-friendly interface for
					browsing and purchasing products. We ensure s transactions and
					efficient delivery to enhance custome satisfac{" "}
				</p>
				<Image
					src={img5.src}
					alt="E-commerce"
					height="300"
					width="300"
					className="w-1/3 h-1/3 mx-auto object-contain opacity-70 md:opacity-100 mt-4"
				/>
			</div>
		</div>
	);
};

const AboutContent = () => {
	return (
		<div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg p-8 md:p-14 rounded-3xl mb-4 relative">
			{/* Enhanced mobile blur overlay */}
			<div className="absolute inset-0 bg-black/40 md:bg-black/0 backdrop-blur-sm md:backdrop-blur-none rounded-3xl" />

			<div className="relative z-10">
				<p className="text-white md:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
					<span className="font-bold text-white md:text-neutral-200">
						Our Story
					</span>{" "}
					We are a dynamic team committed to revolutionizing the industry
					through our three-pillar approach. Our mission is to deliver
					exceptional products and experiences to our customers.
				</p>
				<Image
					src={img5.src}
					alt="About Us"
					height="300"
					width="300"
					className="w-1/3 h-1/3 mx-auto object-contain opacity-70 md:opacity-100 mt-4"
				/>
			</div>
		</div>
	);
};

const data = [
	{
		category: "Pillar Number 1",
		title: "Manufacturer",
		src: img1.src,
		content: <ManufacturerContent />,
		link: "/manufacturer",
	},
	{
		category: "Pillar Number 2",
		title: "Designer",
		src: img3.src,
		content: <DesignerContent />,
		link: "/designers",
	},
	{
		category: "Pillar Number 3",
		title: "E-commerce Store",
		src: img2.src,
		content: <EcommerceContent />,
		link: "/shop",
	},
	{
		category: "Know more",
		title: "About Us",
		src: img4.src,
		content: <AboutContent />,
		link: "/about",
	},
];
