"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
	return (
		<div className="relative max-w-2xl mx-auto mb-16">
			<div className="backdrop-blur-lg bg-white/10 p-2 border border-white/20 rounded-2xl">
				<div className="flex items-center">
					<Search className="h-5 w-5 text-gray-400 ml-3" />
					<input
						type="text"
						placeholder="Search for designers, styles, or collections..."
						className="w-full bg-transparent border-none focus:ring-transparent text-white placeholder-gray-400 ml-4 px-4 py-2"
					/>
					<button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 ml-4 rounded-3xl">
						Search
					</button>
				</div>
			</div>
		</div>
	);
}
