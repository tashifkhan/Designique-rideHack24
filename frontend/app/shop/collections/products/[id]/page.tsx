"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

const products = [
	{
		id: 1,
		name: "Ethereal Silk Dress",
		price: 299.99,
		image:
			"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80",
		description:
			"A flowing silk dress with ethereal qualities, perfect for special occasions.",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Black", "White", "Rose Gold"],
	},
	// Add more products here
];

export default function ProductPage({ params }: { params: { id: string } }) {
	const product = products.find((p) => p.id === parseInt(params.id));
	const [selectedSize, setSelectedSize] = useState<string>();
	const [selectedColor, setSelectedColor] = useState<string>();
	const { addItem } = useCartStore();
	const { toast } = useToast();

	if (!product) {
		return <div>Product not found</div>;
	}

	const handleAddToCart = () => {
		if (product.sizes && !selectedSize) {
			toast({
				title: "Please select a size",
				variant: "destructive",
				className:
					"backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border border-white/10 rounded-2xl",
			});
			return;
		}

		if (product.colors && !selectedColor) {
			toast({
				title: "Please select a color",
				variant: "destructive",
				className:
					"backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border border-white/10 rounded-2xl",
			});
			return;
		}

		addItem(product, 1, selectedSize, selectedColor);
		toast({
			title: "Added to cart",
			description: `${product.name} has been added to your cart.`,
			className:
				"backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 border border-white/10 rounded-2xl",
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
			<div className="backdrop-blur-2xl bg-white/10 dark:bg-gray-900/10 rounded-[2.5rem] p-8 shadow-2xl border border-white/10 w-full max-w-6xl mx-auto hover:border-white/20 transition-all duration-300">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					<div className="group relative aspect-square rounded-2xl overflow-hidden mt-10">
						{/* <div className="absolute inset-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:opacity-75 transition-opacity duration-300 z-10" /> */}
						<Image
							src={product.image}
							alt={product.name}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-110 "
							priority
						/>
					</div>
					<div className="space-y-10 p-4">
						<div className="space-y-4">
							<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400/80 to-pink-500/80 bg-clip-text text-transparent animate-gradient">
								{product.name}
							</h1>
							<p className="text-4xl font-semibold bg-gradient-to-r from-purple-200/80 to-pink-200/80 bg-clip-text text-transparent">
								{formatPrice(product.price)}
							</p>
						</div>

						<p className="text-gray-400 text-lg leading-relaxed">
							{product.description}
						</p>

						{product.sizes && (
							<div className="space-y-6">
								<h3 className="text-xl font-medium">Select Size</h3>
								<div className="flex flex-wrap gap-4">
									{product.sizes.map((size) => (
										<Button
											key={size}
											variant={selectedSize === size ? "default" : "outline"}
											onClick={() => setSelectedSize(size)}
											className={`rounded-xl px-6 py-2 transition-all duration-300 bg-white/10 border-none ${
												selectedSize === size
													? "bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white scale-105"
													: "hover:scale-105"
											}`}
										>
											{size}
										</Button>
									))}
								</div>
							</div>
						)}

						{product.colors && (
							<div className="space-y-6">
								<h3 className="text-xl font-medium">Select Color</h3>
								<div className="flex flex-wrap gap-4">
									{product.colors.map((color) => (
										<Button
											key={color}
											variant={selectedColor === color ? "default" : "outline"}
											onClick={() => setSelectedColor(color)}
											className={`rounded-xl px-6 py-2 transition-all duration-300 bg-white/10 border-none ${
												selectedColor === color
													? "bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white scale-105"
													: "hover:scale-105"
											}`}
										>
											{color}
										</Button>
									))}
								</div>
							</div>
						)}

						<Button
							size="lg"
							className="w-full rounded-xl bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:opacity-90 hover:scale-[1.02] transition-all duration-300 text-lg font-medium py-6"
							onClick={handleAddToCart}
						>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
