"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CartItem } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
	const { items, total, clearCart } = useCartStore();
	const { toast } = useToast();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		toast({
			title: "Order placed successfully!",
			description: "Thank you for your purchase.",
		});
		clearCart();
		router.push("/");
		setLoading(false);
	};

	if (items.length === 0) {
		return (
			<div className="min-h-screen pt-24 px-4 text-center bg-gradient-to-br from-slate-900 via-black to-slate-900">
				<div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-white/20">
					<h1 className="text-2xl font-bold mb-4 text-white">
						Your cart is empty
					</h1>
					<Button
						onClick={() => router.push("/shop/collections")}
						className="bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-xl"
					>
						Continue Shopping
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-slate-900 via-black to-slate-900">
			<h1 className="text-4xl font-bold mb-8 text-white text-center">
				Checkout
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-300 hover:bg-white/15">
						<h2 className="text-2xl font-semibold mb-6 text-white">
							Order Summary
						</h2>
						{items.map((item: CartItem) => (
							<div
								key={item.id}
								className="flex justify-between py-3 border-b border-white/10"
							>
								<div>
									<p className="font-medium text-white">{item.name}</p>
									<p className="text-sm text-gray-300">
										Quantity: {item.quantity}
									</p>
								</div>
								<p className="text-white">
									{formatPrice(item.price * item.quantity)}
								</p>
							</div>
						))}
						<div className="mt-6 pt-4">
							<div className="flex justify-between font-semibold text-white">
								<span>Total</span>
								<span>{formatPrice(total())}</span>
							</div>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-300 hover:bg-white/15">
						<h2 className="text-2xl font-semibold mb-6 text-white">
							Payment Details
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2 text-gray-200">
									Card Number
								</label>
								<Input
									required
									placeholder="4242 4242 4242 4242"
									className="bg-white/5 border-white/20 focus:border-white/40"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2 text-gray-200">
										Expiry Date
									</label>
									<Input
										required
										placeholder="MM/YY"
										className="bg-white/5 border-white/20 focus:border-white/40"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2 text-gray-200">
										CVC
									</label>
									<Input
										required
										placeholder="123"
										className="bg-white/5 border-white/20 focus:border-white/40"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 shadow-2xl border border-white/20 transition-all duration-300 hover:bg-white/15">
						<h2 className="text-2xl font-semibold mb-6 text-white">
							Shipping Address
						</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2 text-gray-200">
									Full Name
								</label>
								<Input
									required
									className="bg-white/5 border-white/20 focus:border-white/40"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-2 text-gray-200">
									Address
								</label>
								<Input
									required
									className="bg-white/5 border-white/20 focus:border-white/40"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2 text-gray-200">
										City
									</label>
									<Input
										required
										className="bg-white/5 border-white/20 focus:border-white/40"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2 text-gray-200">
										Postal Code
									</label>
									<Input
										required
										className="bg-white/5 border-white/20 focus:border-white/40"
									/>
								</div>
							</div>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white py-6 text-lg font-semibold rounded-xl"
						disabled={loading}
					>
						{loading ? "Processing..." : `Pay ${formatPrice(total())}`}
					</Button>
				</form>
			</div>
		</div>
	);
}
