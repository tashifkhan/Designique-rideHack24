import { motion } from "framer-motion";
import { MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ManufacturerCardProps {
	manufacturer: {
		id: number;
		name: string;
		location: string;
		specialization: string;
		minOrderQuantity: string;
		productionCapacity: string;
		rating: number;
		avatar: string;
		coverImage: string;
	};
}

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
	manufacturer,
}) => {
	const [showChat, setShowChat] = useState(false);

	return (
		<motion.div
			whileHover={{ y: -5 }}
			className="backdrop-blur-lg bg-white/10 rounded-xl overflow-hidden border border-white/20"
		>
			<div className="relative h-48 md:h-64">
				<Image
					src={manufacturer.coverImage}
					alt={`${manufacturer.name}'s Facility`}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
			</div>
			<div className="p-4 md:p-6">
				<div className="flex items-center mb-4">
					<div className="relative w-12 h-12">
						<Image
							src={manufacturer.avatar}
							alt={manufacturer.name}
							fill
							className="rounded-full border-2 border-purple-400 object-cover"
						/>
					</div>
					<div className="ml-4">
						<h3 className="text-lg md:text-xl font-semibold text-white">
							{manufacturer.name}
						</h3>
						<p className="text-gray-400 text-sm md:text-base">
							{manufacturer.location}
						</p>
					</div>
				</div>

				<div className="space-y-2 mb-4">
					<p className="text-gray-300 text-sm md:text-base">
						{manufacturer.specialization}
					</p>
					<div className="flex flex-wrap gap-2">
						<span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
							Min: {manufacturer.minOrderQuantity}
						</span>
						<span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
							Capacity: {manufacturer.productionCapacity}
						</span>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<div className="flex space-x-2">
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
						>
							<MessageCircle className="h-5 w-5 text-gray-400" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
						>
							<Share2 className="h-5 w-5 text-gray-400" />
						</Button>
					</div>
					<div className="flex items-center text-gray-400">
						<span className="text-yellow-400">★</span>
						<span className="ml-1">{manufacturer.rating}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ManufacturerCard;
