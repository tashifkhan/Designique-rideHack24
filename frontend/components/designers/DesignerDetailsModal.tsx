"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Designer } from "@/lib/types";
import { Users, BookOpen, MapPin } from "lucide-react";
import Image from "next/image";

interface DesignerDetailsModalProps {
	designer: Designer;
	open: boolean;
	onClose: () => void;
}

export function DesignerDetailsModal({
	designer,
	open,
	onClose,
}: DesignerDetailsModalProps) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="bg-slate-900/75 backdrop-blur-2xl border border-white/10 text-white max-w-2xl rounded-2xl shadow-xl">
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

				<div className="relative z-10 -mt-10">
					<div className="flex items-center mt-20 relative z-10">
						<Image
							src={designer.avatar}
							alt={designer.name}
							width={96}
							height={96}
							className="rounded-full border-4 border-purple-400"
						/>
						<div className="ml-6">
							<h2 className="text-2xl font-bold">{designer.name}</h2>
							<p className="text-gray-400 flex items-center mt-1">
								<MapPin className="h-4 w-4 mr-1" />
								{designer.location}
							</p>
						</div>
					</div>
					<Button
						className="absolute -top-6 right-0 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm"
						onClick={() => window.open(`/designers/${designer.id}`, "_blank")}
					>
						View Full Profile
					</Button>
					{/* designer stats */}
					<div className="grid grid-cols-3 gap-4 my-6">
						<div className="text-center p-4 bg-white/5 rounded-xl">
							<BookOpen className="h-6 w-6 mx-auto mb-2" />
							<div className="font-semibold">{designer.collections}</div>
							<div className="text-sm text-gray-400">Collections</div>
						</div>
						<div className="text-center p-4 bg-white/5 rounded-xl">
							<Users className="h-6 w-6 mx-auto mb-2" />
							<div className="font-semibold">{designer.followers}</div>
							<div className="text-sm text-gray-400">Followers</div>
						</div>
						<div className="text-center p-4 bg-white/5 rounded-xl">
							<Users className="h-6 w-6 mx-auto mb-2" />
							<div className="font-semibold">{designer.following}</div>
							<div className="text-sm text-gray-400">Following</div>
						</div>
					</div>

					{/* specifications */}
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
						<Button className="rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm">
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
							<Button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
								Follow Designer
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
