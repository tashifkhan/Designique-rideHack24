"use client";

import { DirectionAwareHover } from "../ui/direction-aware-hover";

interface DirectionAwareHoverProps {
	imageUrl: string;
	title: string;
	price: string;
}

export default function DirectionAwareHoverDemo({
	imageUrl,
	title,
	price,
}: DirectionAwareHoverProps) {
	return (
		<div className="relative flex items-center justify-center">
			<DirectionAwareHover imageUrl={imageUrl}>
				<p className="font-bold text-xl">{title}</p>
				<p className="font-normal text-sm">{price}</p>
			</DirectionAwareHover>
		</div>
	);
}
