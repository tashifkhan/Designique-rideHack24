import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function BackgroundLinesDemo() {
	return (
		<BackgroundLines className="flex items-center justify-center w-full h-screen flex-col px-4 bg-[radial-gradient(circle_at_top_left,rgba(128,0,128,0.8)_30%,black_80%)] bg-cover">
			<h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
				DESIGNIQUE <br />
			</h2>
			<h3 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-2xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
				Design Unique <br />
			</h3>
			<p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-400 text-center">
				Scroll For More Details
			</p>
		</BackgroundLines>
	);
}
