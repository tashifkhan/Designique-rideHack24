"use client";

import { motion } from "framer-motion";
import { Upload, MessageSquare, TrendingUp } from "lucide-react";

const features = [
	{
		icon: <Upload className="h-6 w-6" />,
		title: "Showcase Designs",
		description:
			"Upload and showcase your fashion designs to a global audience",
	},
	{
		icon: <MessageSquare className="h-6 w-6" />,
		title: "Direct Communication",
		description: "Connect directly with manufacturers and buyers",
	},
	{
		icon: <TrendingUp className="h-6 w-6" />,
		title: "Growth Analytics",
		description: "Track your portfolio performance and engagement",
	},
];

export default function Features() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
		>
			{features.map((feature, index) => (
				<div key={index}>
					<div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
						<div className="text-purple-400 mb-4">{feature.icon}</div>
						<h3 className="text-xl font-semibold text-white mb-2">
							{feature.title}
						</h3>
						<p className="text-gray-300">{feature.description}</p>
					</div>
				</div>
			))}
		</motion.div>
	);
}
