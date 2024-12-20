import React from "react";
import Image from "next/image";
import { designers } from "@/lib/data/designers";
import { MapPin } from "lucide-react";

type Props = {
	params: { id: string };
};

export async function generateStaticParams() {
	// Replace with your actual designer IDs
	return [
		{ id: "1" },
		{ id: "2" },
		{ id: "3" },
		{ id: "4" },
		{ id: "5" },
		{ id: "6" },
		{ id: "7" },
		{ id: "8" },
		{ id: "9" },
		{ id: "10" },
		{ id: "11" },
		{ id: "12" },
		{ id: "13" },
	];
}

function DesignerPage({ params }: Props) {
	const designer = designers[parseInt(params.id) - 1];
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
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
							<button className="px-6 py-2 border border-white/30 text-white rounded-full hover:bg-white/10 transition backdrop-blur-sm">
								Chat
							</button>
						</div>
					</div>

					{/* Designer stats */}
					<div className="grid grid-cols-3 gap-8">
						<div className="text-center p-4 rounded-2xl border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<div className="text-2xl font-bold text-white">
								{designer.following}
							</div>
							<div className="text-gray-300">Projects</div>
						</div>
						<div className="text-center p-4 rounded-2xl border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<div className="text-2xl font-bold text-white">
								{designer.followers}
							</div>
							<div className="text-gray-300">Followers</div>
						</div>
						<div className="text-center p-4 rounded-2xl border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<div className="text-2xl font-bold text-white">
								{designer.collections}
							</div>
							<div className="text-gray-300">Rating</div>
						</div>
					</div>

					{/* Specialisation details */}
					<div className="space-y-6">
						<div className="p-4 rounded-2xl border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<h2 className="text-xl font-semibold text-white mb-2">
								Specialization
							</h2>
							<p className="text-gray-300">{designer.specialization}</p>
						</div>

						{/* Bio details */}
						<div className="p-4 rounded-2xl border border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
							<h2 className="text-xl font-semibold text-white mb-2">Bio</h2>
							<p className="text-gray-300">{designer.bio}</p>
						</div>

						{/* action buttons */}
						<div className="flex gap-3">
							<button className="flex-1 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition backdrop-blur-sm">
								View Portfolio
							</button>
							<button className="flex-1 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition backdrop-blur-sm">
								Social Profiles
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default DesignerPage;
