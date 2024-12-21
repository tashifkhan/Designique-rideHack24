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

export function generateStaticParams() {
	return products.map((product) => ({
		id: product.id.toString(),
	}));
}

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
			});
			return;
		}

		if (product.colors && !selectedColor) {
			toast({
				title: "Please select a color",
				variant: "destructive",
			});
			return;
		}

		addItem(product, 1, selectedSize, selectedColor);
		toast({
			title: "Added to cart",
			description: `${product.name} has been added to your cart.`,
		});
	};

	return (
		<div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="relative aspect-square">
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-cover rounded-lg"
					/>
				</div>
				<div className="space-y-6">
					<h1 className="text-3xl font-bold">{product.name}</h1>
					<p className="text-2xl">{formatPrice(product.price)}</p>
					<p className="text-gray-400">{product.description}</p>

					{product.sizes && (
						<div>
							<h3 className="text-lg font-semibold mb-2">Size</h3>
							<div className="flex gap-2">
								{product.sizes.map((size) => (
									<Button
										key={size}
										variant={selectedSize === size ? "default" : "outline"}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</Button>
								))}
							</div>
						</div>
					)}

					{product.colors && (
						<div>
							<h3 className="text-lg font-semibold mb-2">Color</h3>
							<div className="flex gap-2">
								{product.colors.map((color) => (
									<Button
										key={color}
										variant={selectedColor === color ? "default" : "outline"}
										onClick={() => setSelectedColor(color)}
									>
										{color}
									</Button>
								))}
							</div>
						</div>
					)}

					<Button size="lg" className="w-full" onClick={handleAddToCart}>
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}
