"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
	image: string;
}

const Collections = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const { toast } = useToast();
	const router = useRouter();

	const products: Product[] = [
		{
			id: 1,
			name: "Premium Cotton T-Shirt",
			price: 29.99,
			category: "shirts",
			image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		},
		{
			id: 2,
			name: "Slim Fit Jeans",
			price: 59.99,
			category: "pants",
			image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		},
		{
			id: 3,
			name: "Leather Jacket",
			price: 199.99,
			category: "outerwear",
			image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		},
		{
			id: 4,
			name: "Knit Sweater",
			price: 79.99,
			category: "sweaters",
			image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		},
		{
			id: 5,
			name: "Hooded Sweatshirt",
			price: 49.99,
			category: "hoodies",
			image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		},
		{
			id: 6,
			name: "Cargo Pants",
			price: 69.99,
			category: "pants",
			image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
		},
	];

	const categories = [
		"all",
		"shirts",
		"pants",
		"outerwear",
		"sweaters",
		"hoodies",
	];

	const filteredProducts =
		selectedCategory === "all"
			? products
			: products.filter((product) => product.category === selectedCategory);

	return (
		<div className="min-h-screen p-8 pt-36">
			{/* Header */}
			<header className="mb-12 text-center">
				<h1 className="font-bold text-center bg-gradient-to-b from-neutral-600 to-white  bg-clip-text text-transparent text-5xl pb-12">
					Collections
				</h1>
				<div className="flex justify-center gap-4 flex-wrap">
					{categories.map((category) => (
						<Button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`px-6 py-2 rounded-full backdrop-blur-md transition-all duration-300
				${
					selectedCategory === category
						? "bg-white/20 text-white shadow-lg"
						: "bg-white/10 text-gray-300 hover:bg-white/15"
				}`}
						>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</Button>
					))}
				</div>
			</header>

			{/* Products Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredProducts.map((product) => (
					<div
						key={product.id}
						className="group relative rounded-xl overflow-hidden backdrop-blur-md bg-white/10 
					 hover:bg-white/15 transition-all duration-300 shadow-xl"
					>
						<div className="relative w-full pt-[133%]">
							Image
							<Image
								src={product.image}
								alt={product.name}
								fill
								style={{ objectFit: "cover" }}
								className="absolute top-0 left-0 h-full w-full group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
						<div
							className="p-6"
							onClick={() => {
								router.push(`/shop/collections/products/${product.id}`);
							}}
						>
							<h3 className="text-xl font-semibold text-white mb-2">
								{product.name}
							</h3>
							<p className="text-gray-300 mb-4">₹{product.price.toFixed(2)}</p>
							<Button
								className="w-full py-3 px-6 rounded-xl bg-white/20 text-white 
						 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
								onClick={() => {
									toast({
										title: "Added to Cart",
										description: `${product.name} has been added to your cart.`,
										duration: 3000,
										className:
											"bg-white/10 border border-white/20 backdrop-blur-md rounded-xl",
									});
								}}
							>
								Add to Cart
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Collections;
