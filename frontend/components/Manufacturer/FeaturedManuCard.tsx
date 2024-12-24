"use client";

import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { MapPin } from "lucide-react";

interface DirectionAwareHoverProps {
	imageUrl: string;
	title: string;
	price: string;
	rating: string;
	location: string;
}

export default function DirectionAwareHoverDemo({
	imageUrl,
	title,
	price,
	rating,
	location,
}: DirectionAwareHoverProps) {
	return (
		<div className="relative flex items-center justify-center">
			<DirectionAwareHover imageUrl={imageUrl}>
				<p className="font-bold text-xl p-1">{title}</p>
				<p className="font-normal text-sm p-1">{rating}</p>
				<p className="font-normal text-sm flex items-center gap-1 p-1">
					<MapPin className="w-4 h-4" />
					{`${location}`}
				</p>
				<span className="font-normal text-sm p-2 rounded-3xl bg-blue-400/30">
					{price}
				</span>
			</DirectionAwareHover>
		</div>
	);
}
