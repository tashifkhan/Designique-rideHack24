"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/lib/types";

export default function CartSheet() {
	const { items, removeItem, updateQuantity, total } = useCartStore();
	const router = useRouter();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="relative">
					<ShoppingBag className="h-5 w-5" />
					{items.length > 0 && (
						<span className="absolute top-2 right-2 h-4 w-4 text-xs bg-primary rounded-full flex items-center justify-center">
							{items.length}
						</span>
					)}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-full sm:max-w-lg">
				<SheetHeader>
					<SheetTitle>Shopping Cart</SheetTitle>
				</SheetHeader>
				<div className="mt-8 space-y-4">
					{items.length === 0 ? (
						<p className="text-center text-muted-foreground">
							Your cart is empty
						</p>
					) : (
						<>
							{items.map((item: CartItem) => (
								<div key={item.id} className="flex gap-4 py-4 border-b">
									<div className="relative w-24 h-24">
										<Image
											src={item.image}
											alt={item.name}
											fill
											className="object-cover rounded-md"
										/>
									</div>
									<div className="flex-1">
										<h3 className="font-semibold">{item.name}</h3>
										<p className="text-sm text-muted-foreground">
											{formatPrice(item.price)}
										</p>
										{item.selectedSize && (
											<p className="text-sm">Size: {item.selectedSize}</p>
										)}
										{item.selectedColor && (
											<p className="text-sm">Color: {item.selectedColor}</p>
										)}
										<div className="flex items-center gap-2 mt-2">
											<select
												value={item.quantity}
												onChange={(e) =>
													updateQuantity(item.id, parseInt(e.target.value))
												}
												className="bg-background border rounded-md px-2 py-1"
											>
												{[1, 2, 3, 4, 5].map((num) => (
													<option key={num} value={num}>
														{num}
													</option>
												))}
											</select>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => removeItem(item.id)}
											>
												Remove
											</Button>
										</div>
									</div>
								</div>
							))}
							<div className="pt-4">
								<div className="flex justify-between text-lg font-semibold">
									<span>Total</span>
									<span>{formatPrice(total())}</span>
								</div>
								<Button
									className="w-full mt-4"
									onClick={() => {
										router.push("/checkout");
									}}
								>
									Checkout
								</Button>
							</div>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
