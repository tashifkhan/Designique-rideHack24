"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Share2, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Designer } from "@/lib/types";
import { DesignerDetailsModal } from "./DesignerDetailsModal";
import { ChatModal } from "../chat/ChatModal";
import Image from "next/image";

interface DesignerCardProps {
	designer: Designer;
	userId: string;
}

export default function DesignerCard({ designer, userId }: DesignerCardProps) {
	const [showDetails, setShowDetails] = useState(false);
	const [showChat, setShowChat] = useState(false);

	return (
		<>
			<motion.div
				whileHover={{ y: -5 }}
				className="backdrop-blur-lg bg-white/10 rounded-xl overflow-hidden border border-white/20 cursor-pointer"
				onClick={() => setShowDetails(true)}
			>
				<div className="relative h-48 md:h-64">
					<Image
						src={designer.coverImage}
						alt={`${designer.name}'s Workspace`}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
				</div>
				<div className="p-4 md:p-6 flex flex-col justify-between">
					<div className="flex items-center mb-4">
						<div className="relative w-12 h-12">
							<Image
								src={designer.avatar}
								alt={designer.name}
								fill
								className="rounded-full border-2 border-purple-400 object-cover"
							/>
						</div>
						<div className="ml-4">
							<h3 className="text-lg md:text-xl font-semibold text-white">
								{designer.name}
							</h3>
							<p className="text-gray-400 text-sm md:text-base">
								{designer.location}
							</p>
						</div>
					</div>
					<p className="text-gray-300 mb-4 text-sm md:text-base">
						{designer.specialization}
					</p>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Button
								size="sm"
								onClick={(e) => {
									e.stopPropagation();
									setShowChat(true);
								}}
								className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2"
							>
								<MessageCircle className="h-4 w-4 mr-2" />
								Chat
							</Button>
							<Button
								size="sm"
								variant="outline"
								className="border-white/20 text-white hover:bg-white/10 rounded-full px-4 py-2"
							>
								<Heart className="h-4 w-4 mr-2" />
								Follow
							</Button>
						</div>
						<Button
							size="sm"
							variant="ghost"
							className="text-gray-400 hover:text-white"
						>
							<Share2 className="h-4 w-4" />
						</Button>
					</div>

					<div className="mt-4 pt-4 border-t border-white/10">
						<div className="flex items-center space-x-4 text-gray-400">
							<div className="flex items-center">
								<BookOpen className="h-4 w-4 mr-1" />
								<span>{designer.collections}</span>
							</div>
							<div className="flex items-center">
								<Users className="h-4 w-4 mr-1" />
								<span>{designer.followers}</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<DesignerDetailsModal
				designer={designer}
				open={showDetails}
				onClose={() => setShowDetails(false)}
				userId={userId}
			/>

			<ChatModal
				designer={designer}
				open={showChat}
				onClose={() => setShowChat(false)}
				userId={userId}
			/>
		</>
	);
}
