"use client";
import React, { useState } from "react";

interface Manufacturer {
	id: number;
	name: string;
	location: string;
	specialty: string;
	rating: number;
	capacity: string;
}

const manufacturers: Manufacturer[] = [
	{
		id: 1,
		name: "TechFab Industries",
		location: "Berlin, Germany",
		specialty: "Electronics",
		rating: 4.8,
		capacity: "Large Scale",
	},
	{
		id: 2,
		name: "AutoMakers Co.",
		location: "Detroit, USA",
		specialty: "Automobiles",
		rating: 4.7,
		capacity: "Medium Scale",
	},
	{
		id: 3,
		name: "FashionWorks",
		location: "Milan, Italy",
		specialty: "Textiles",
		rating: 4.9,
		capacity: "Small Scale",
	},
	{
		id: 4,
		name: "GreenEnergy Solutions",
		location: "Oslo, Norway",
		specialty: "Renewable Energy",
		rating: 4.6,
		capacity: "Large Scale",
	},
	{
		id: 5,
		name: "MedTech Innovations",
		location: "Zurich, Switzerland",
		specialty: "Medical Devices",
		rating: 4.8,
		capacity: "Medium Scale",
	},
	{
		id: 6,
		name: "AeroSpace Dynamics",
		location: "Toulouse, France",
		specialty: "Aerospace",
		rating: 4.7,
		capacity: "Large Scale",
	},
	{
		id: 7,
		name: "AgriTech Farms",
		location: "Iowa, USA",
		specialty: "Agriculture",
		rating: 4.5,
		capacity: "Small Scale",
	},
	{
		id: 8,
		name: "NanoTech Labs",
		location: "Tokyo, Japan",
		specialty: "Nanotechnology",
		rating: 4.9,
		capacity: "Medium Scale",
	},
	{
		id: 9,
		name: "BioHealth Corp.",
		location: "Toronto, Canada",
		specialty: "Biotechnology",
		rating: 4.6,
		capacity: "Large Scale",
	},
	{
		id: 10,
		name: "SolarTech Industries",
		location: "Sydney, Australia",
		specialty: "Solar Energy",
		rating: 4.8,
		capacity: "Medium Scale",
	},
	// Add more manufacturers...
];

export default function ManufacturersTable() {
	const [searchTerm, setSearchTerm] = useState("");
	type Filters = {
		rating: number;
		location: string;
		specialty: string;
		showRating: boolean;
		showName: boolean;
		showLocation: boolean;
		showSpecialty: boolean;
	};

	const isFilterKey = (key: string): key is keyof Filters => {
		return key in filters;
	};

	const [filters, setFilters] = useState<Filters>({
		rating: 0,
		location: "",
		specialty: "",
		showRating: false,
		showName: false,
		showLocation: false,
		showSpecialty: false,
	});

	const filteredManufacturers = manufacturers.filter(
		(m) =>
			m.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(filters.rating === 0 || m.rating >= filters.rating) &&
			(filters.location === "" || m.location.includes(filters.location)) &&
			(filters.specialty === "" || m.specialty === filters.specialty)
	);

	return (
		<div className="container mx-auto p-6 pt-32">
			<div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 mb-14">
				{/* Desktop Table */}
				<div className="hidden md:block">
					<table className="w-full">
						<thead className="border-b border-white/10">
							<tr>
								{[
									{ key: "name", label: "Name", type: "text" },
									{ key: "location", label: "Location", type: "text" },
									{ key: "specialty", label: "Specialty", type: "text" },
									{ key: "rating", label: "Rating", type: "number" },
								].map((column) => (
									<th key={column.key} className="p-4">
										<div>
											<button
												onClick={() => {
													const filterKey = `show${
														column.key.charAt(0).toUpperCase() +
														column.key.slice(1)
													}` as keyof Filters;
													setFilters((prevFilters) => ({
														...prevFilters,
														[filterKey]: !prevFilters[filterKey],
													}));
												}}
												className="w-full text-left flex items-center gap-2 text-white/80 hover:text-white transition-colors"
											>
												{column.label}
												<span className="text-xs opacity-50">▼</span>
											</button>
										</div>
										{filters[
											`show${
												column.key.charAt(0).toUpperCase() + column.key.slice(1)
											}` as keyof Filters
										] && (
											<div className="relative mt-2">
												<input
													type={column.type}
													placeholder={`Filter by ${column.key}`}
													className="w-full p-2 text-white placeholder-white/30 backdrop-blur-lg bg-white/20 rounded-xl border border-white/10 focus:border-white/30 transition-all outline-none shadow-lg"
													value={
														column.key === "name"
															? searchTerm
															: isFilterKey(column.key)
															? String(filters[column.key])
															: ""
													}
													onChange={(e) =>
														column.key === "name"
															? setSearchTerm(e.target.value)
															: setFilters({
																	...filters,
																	[column.key]:
																		column.type === "number"
																			? Number(e.target.value)
																			: e.target.value,
															  })
													}
													style={
														column.type === "number"
															? {
																	WebkitAppearance: "none",
																	MozAppearance: "textfield",
															  }
															: {}
													}
												/>
											</div>
										)}
									</th>
								))}
								<th className="text-left text-white p-4">Capacity</th>
							</tr>
						</thead>
						<tbody>
							{filteredManufacturers.map((m) => (
								<tr
									key={m.id}
									className="border-b border-white/5 hover:bg-white/5 transition-colors"
								>
									<td className="p-4 text-white/50">{m.name}</td>
									<td className="p-4 text-white/50">{m.location}</td>
									<td className="p-4 text-white/50">{m.specialty}</td>
									<td className="p-4 text-white/50">⭐ {m.rating}</td>
									<td className="p-4 text-white/50">{m.capacity}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Mobile Card Layout */}
				<div className="md:hidden space-y-4">
					{filteredManufacturers.map((m) => (
						<div
							key={m.id}
							className="p-4 rounded-xl bg-white/5 border border-white/10"
						>
							<h3 className="text-white font-semibold mb-2">{m.name}</h3>
							<div className="space-y-1 text-sm">
								<p className="text-white/50">
									<span className="text-white/70">Location:</span> {m.location}
								</p>
								<p className="text-white/50">
									<span className="text-white/70">Specialty:</span>{" "}
									{m.specialty}
								</p>
								<p className="text-white/50">
									<span className="text-white/70">Rating:</span> ⭐ {m.rating}
								</p>
								<p className="text-white/50">
									<span className="text-white/70">Capacity:</span> {m.capacity}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
