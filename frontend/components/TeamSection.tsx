"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const teamMembers = [
	{
		name: "Tashif",
		role: "#Visionary",
		image: "/tashif-avatar.jpg",
		github: "https://github.com/tashifkhan",
		linkedin: "https://www.linkedin.com/in/tashif-ahmad-khan-982304244",
	},
	{
		name: "Adarsh",
		role: "#Designer",
		image: "/adarsh-avatar.jpg",
		github: "https://github.com/adarshsharma3",
		linkedin: "https://www.linkedin.com/in/adarsh-sharma-3bb87027b",
	},
	{
		name: "Aman",
		role: "#SmartWorker",
		image: "/aman-avatar.jpg",
		github: "https://github.com/AmanTyagi3123",
		linkedin: "https://www.linkedin.com/in/aman-tyagi-677377270",
	},
	{
		name: "Angel",
		role: "#Entrepreneur",
		image: "/angel-avatar.jpg",
		github: "https://github.com/angelsinghal",
		linkedin: "https://www.linkedin.com/in/angel-singhal-44b372248",
	},
	{
		name: "Dhruv",
		role: "#CodeHustler",
		image: "/dhruv-avatar.jpg",
		github: "https://github.com/dhruvmishra1020",
		linkedin: "#",
	},
	{
		name: "Adhiraj",
		role: "#MultiTasker",
		image: "/adhiraj-avatar.jpg",
		github: "https://github.com/Adhiraj-3",
		linkedin: "https://www.linkedin.com/in/adhiraj-gupta-777a7a270",
	},
];

export default function TeamSection() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-16"
				>
					<h2 className="text-5xl font-bold bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white ">
						THE UNDERDOGS
					</h2>
					<p className="mt-4 text-xl text-purple-300 font-light tracking-wide">
						The Creators of Innovation
					</p>
					<div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mt-6 rounded-full" />
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{teamMembers.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="group"
						>
							<div className="relative overflow-hidden rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 transition-all duration-300 hover:bg-white/20">
								<div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
									<Image
										src={member.image}
										alt={member.name}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
								</div>
								<div className="text-center">
									<h3 className="text-xl font-semibold text-white">
										{member.name}
									</h3>
									<p className="text-purple-300 mt-1">{member.role}</p>
									<div className="flex justify-center gap-4 mt-4">
										<Link
											href={member.github}
											className="text-white/70 hover:text-white transition-colors"
										>
											<Github className="h-5 w-5" />
										</Link>
										<Link
											href={member.linkedin}
											className="text-white/70 hover:text-white transition-colors"
										>
											<Linkedin className="h-5 w-5" />
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
