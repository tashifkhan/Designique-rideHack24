"use client";
import React from "react";
import Image from "next/image";
import { designers } from "@/lib/data/designers";
import { MapPin } from "lucide-react";
import { ChatModal } from "@/components/chat/ChatModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
	params: { id: string };
};

function DesignerPage({ params }: Props) {
	const { id } = params;
	const designer = designers[parseInt(id) - 1];
	const [showChat, setShowChat] = useState(false);
	const router = useRouter();

	// In a real app, this would come from authentication context
	const mockUserId = "507f1f77bcf86cd799439011";

	if (!designer) {
		return <div>Designer not found</div>;
	}

	return (
		<main className="min-h-screen bg-gray-900">
			{/* cover image */}
			<div className="relative h-80 w-full">
				<Image
					src={designer.coverImage}
					alt="Designer Cover"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
			</div>

			{/* designer profile  */}
			<div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
				<div className="space-y-8 p-8 rounded-xl bg-gray-800/30 backdrop-blur-lg border border-gray-700/30 shadow-2xl">
					<div className="flex items-end justify-between flex-wrap gap-4">
						<div className="relative z-10 -mt-10">
							<div className="flex items-center mt-20 relative z-10">
								<Image
									src={designer.avatar}
									alt={designer.name}
									width={60}
									height={60}
									className="rounded-full border-4 border-purple-400"
								/>
								<div className="ml-6">
									<h2 className="text-2xl text-white font-bold">
										{designer.name}
									</h2>
									<p className="text-gray-400 flex items-center mt-1">
										<MapPin className="h-4 w-4 mr-1" />
										{designer.location}
									</p>
								</div>
							</div>
						</div>
						<div className="flex gap-3">
							<button className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition backdrop-blur-sm">
								Follow
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setShowChat(true);
								}}
								className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition backdrop-blur-sm"
							>
								Chat
							</button>
						</div>
					</div>

					{/* Designer stats */}
					<div className="grid grid-cols-3 gap-4">
						<div className="text-center p-4 bg-white/5 rounded-xl">
							<div className="text-2xl font-bold text-purple-400">
								{designer.collections}
							</div>
							<div className="text-sm text-gray-400">Collections</div>
						</div>
						<div className="text-center p-4 bg-white/5 rounded-xl">
							<div className="text-2xl font-bold text-blue-400">
								{designer.followers}
							</div>
							<div className="text-sm text-gray-400">Followers</div>
						</div>
						<div className="text-center p-4 bg-white/5 rounded-xl">
							<div className="text-2xl font-bold text-green-400">
								{designer.following}
							</div>
							<div className="text-sm text-gray-400">Following</div>
						</div>
					</div>

					{/* Bio */}
					<div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
						<h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							About
						</h3>
						<p className="text-gray-200">{designer.bio}</p>
					</div>

					{/* Specialization */}
					<div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
						<h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Specialization
						</h3>
						<p className="text-gray-200">{designer.specialization}</p>
					</div>

					{/* Action buttons */}
					<div className="flex justify-center space-x-4">
						<button
							onClick={() => router.push(`/designers/${id}/portfolio`)}
							className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
						>
							View Portfolio
						</button>
					</div>
				</div>
			</div>
			<ChatModal
				designer={designers[parseInt(id) - 1]}
				open={showChat}
				onClose={() => setShowChat(false)}
				userId={mockUserId}
			/>
		</main>
	);
}

export default DesignerPage;
