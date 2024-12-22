"use client";

import DesignerCard from "./DesignerCard";
import { designers } from "@/lib/data/designers";
import Link from "next/link";

export default function TopDesigners() {
	return (
		<section className="mt-16">
			<div className="flex justify-between mb-8">
				<h2 className="text-3xl font-bold text-white mb-8">Top Desigers</h2>
				<div className="mt-4">
					<Link
						href="/designers/designs"
						className="text-sm text-purple-300 hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
					>
						See more
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{designers.map((designer) => (
					<DesignerCard key={designer.id} designer={designer} />
				))}
			</div>
		</section>
	);
}
