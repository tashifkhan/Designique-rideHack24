"use client";

import { motion } from "framer-motion";
import { designs } from "@/lib/data/designs";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedDesigns() {
	return (
		<section className="my-16">
			<h2 className="text-3xl font-bold text-white mb-8">
				Featured Designs{"      "}
				<span className="text-sm text-purple-300 hover:cursor-pointer">
					{" "}
					<Link href="/designers/designs"> see more...</Link>{" "}
				</span>
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{designs.map((design, index) => (
					<motion.div
						key={design.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<div>
							{" "}
							<Card className="backdrop-blur-lg bg-white/10 border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 rounded-2xl">
								<div className="relative h-64">
									<Image
										src={design.image}
										alt={design.title}
										layout="fill"
										objectFit="cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div className="absolute bottom-0 left-0 p-6">
										<h3 className="text-xl font-semibold text-white mb-2">
											{design.title}
										</h3>
										<p className="text-gray-300">by {design.designer}</p>
									</div>
								</div>
							</Card>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}