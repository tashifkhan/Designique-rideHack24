"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Designer } from "@/lib/types";
import { ChatModal } from "@/components/chat/ChatModal";
import { Users, BookOpen, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DesignerDetailsModalProps {
	designer: Designer;
	open: boolean;
	onClose: () => void;
	userId: string;
}

export function DesignerDetailsModal({
	designer,
	open,
	onClose,
	userId,
}: DesignerDetailsModalProps) {
	const [showChat, setShowChat] = useState(false);
	const router = useRouter();

	return (
		<>
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className="bg-slate-900/75 w-[50vw] backdrop-blur-2xl border border-white/10 text-white rounded-2xl shadow-xl">
					<DialogTitle className="sr-only">
						Designer Profile - {designer.name}
					</DialogTitle>

					<div className="relative h-40 -mt-6 -mx-6">
						<Image
							src={designer.coverImage}
							alt={`${designer.name}'s Cover`}
							fill
							className="object-cover rounded-t-2xl"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />
					</div>

					{/* designer profile */}
					<div className="relative -mt-16 px-6 pb-6">
						<div className="flex items-end justify-between mb-6">
							<div className="flex items-center">
								<Image
									src={designer.avatar}
									alt={designer.name}
									width={80}
									height={80}
									className="rounded-full border-4 border-purple-400"
								/>
								<div className="ml-4">
									<h2 className="text-2xl font-bold text-white">
										{designer.name}
									</h2>
									<p className="text-gray-400 flex items-center mt-1">
										<MapPin className="h-4 w-4 mr-1" />
										{designer.location}
									</p>
								</div>
							</div>
						</div>

						{/* stats */}
						<div className="grid grid-cols-3 gap-4 mb-6">
							<div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
								<div className="text-2xl font-bold text-purple-400">
									{designer.collections}
								</div>
								<div className="text-sm text-gray-400">Collections</div>
							</div>
							<div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
								<div className="text-2xl font-bold text-blue-400">
									{designer.followers}
								</div>
								<div className="text-sm text-gray-400">Followers</div>
							</div>
							<div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
								<div className="text-2xl font-bold text-green-400">
									{designer.following}
								</div>
								<div className="text-sm text-gray-400">Following</div>
							</div>
						</div>

						{/* specialization */}
						<div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm mb-6">
							<h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								Specialization
							</h3>
							<p className="text-gray-200">{designer.specialization}</p>
						</div>

						{/* bio */}
						<div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
							<h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								Bio
							</h3>
							<p className="text-gray-200">{designer.bio}</p>
						</div>

						{/* action buttons */}
						<div className="flex justify-between space-x-4 mt-8">
							<Button
								onClick={(e) => {
									e.stopPropagation();
									setShowChat(true);
								}}
								className="rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm"
							>
								Chat Now
							</Button>
							<div className="flex gap-4">
								<Button
									variant="outline"
									onClick={onClose}
									className="rounded-xl border-none bg-white/20 hover:bg-white/30 backdrop-blur-sm"
								>
									Close
								</Button>
								<Button className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-pink-600 transition-colors duration-300">
									Follow Designer
								</Button>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
			<ChatModal
				designer={designer}
				open={showChat}
				onClose={() => setShowChat(false)}
				userId={userId}
			/>
		</>
	);
}
