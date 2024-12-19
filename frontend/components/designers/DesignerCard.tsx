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
}

export default function DesignerCard({ designer }: DesignerCardProps) {
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
					<div className="flex flex-col md:flex-row items-start md:items-center justify-between">
						<div className="flex space-x-4 mb-2 md:mb-0">
							<Button
								variant="ghost"
								size="icon"
								onClick={(e) => {
									e.stopPropagation();
									// Handle like
								}}
								className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
							>
								<Heart className="h-5 w-5 text-gray-400" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={(e) => {
									e.stopPropagation();
									setShowChat(true);
								}}
								className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
							>
								<MessageCircle className="h-5 w-5 text-gray-400" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={async (e) => {
									e.stopPropagation();
									try {
										if (navigator.share) {
											await navigator.share({
												title: designer.name,
												text: `Check out ${designer.name}'s design portfolio`,
												url: `${window.location.href}/${designer.id}`,
											});
										} else {
											await navigator.clipboard.writeText(
												`${window.location.href}/${designer.id}`
											);
											alert("Link copied to clipboard!");
										}
									} catch (error) {
										console.log("Error sharing:", error);
									}
								}}
								className="hover:bg-blue-300/20 rounded-2xl hover:backdrop-blur-sm transition-all"
							>
								<Share2 className="h-5 w-5 text-gray-400" />
							</Button>
						</div>
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
			/>

			<ChatModal
				designer={designer}
				open={showChat}
				onClose={() => setShowChat(false)}
				onSend={(message) => {
					// Handle the message sending logic here
					console.log("Sending message:", message);
				}}
			/>
		</>
	);
}
