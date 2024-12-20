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

		// Simulate payment processing
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
			<div className="pt-24 px-4 text-center">
				<h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
				<Button onClick={() => router.push("/")}>Continue Shopping</Button>
			</div>
		);
	}

	return (
		<div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
			<h1 className="text-3xl font-bold mb-8">Checkout</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
						{items.map((item: CartItem) => (
							<div key={item.id} className="flex justify-between py-2">
								<div>
									<p className="font-medium">{item.name}</p>
									<p className="text-sm text-muted-foreground">
										Quantity: {item.quantity}
									</p>
								</div>
								<p>{formatPrice(item.price * item.quantity)}</p>
							</div>
						))}
						<div className="border-t mt-4 pt-4">
							<div className="flex justify-between font-semibold">
								<span>Total</span>
								<span>{formatPrice(total())}</span>
							</div>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Payment Details</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Card Number
								</label>
								<Input required placeholder="4242 4242 4242 4242" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										Expiry Date
									</label>
									<Input required placeholder="MM/YY" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">CVC</label>
									<Input required placeholder="123" />
								</div>
							</div>
						</div>
					</div>

					<div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-6">
						<h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-2">
									Full Name
								</label>
								<Input required />
							</div>
							<div>
								<label className="block text-sm font-medium mb-2">
									Address
								</label>
								<Input required />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">City</label>
									<Input required />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">
										Postal Code
									</label>
									<Input required />
								</div>
							</div>
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Processing..." : `Pay ${formatPrice(total())}`}
					</Button>
				</form>
			</div>
		</div>
	);
}
