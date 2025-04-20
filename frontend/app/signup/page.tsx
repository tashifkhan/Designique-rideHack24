"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
	IconBrandGithub,
	IconBrandGoogle,
	IconPlus,
	IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { UserRoles } from "@/lib/constants/userRoles";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const roleOptions = [
	{ id: UserRoles.USER, label: "Consumer", alwaysSelected: true },
	{ id: UserRoles.DESIGNER, label: "Designer", alwaysSelected: false },
	{ id: UserRoles.MANUFACTURER, label: "Manufacturer", alwaysSelected: false },
	{ id: UserRoles.SELLER, label: "Seller (Shop)", alwaysSelected: false },
];

const designCategories = [
	"Fashion",
	"Furniture",
	"Accessories",
	"Home Decor",
	"Industrial",
	"Other",
];

export default function SignupForm() {
	const [formData, setFormData] = useState({
		// Common Fields
		firstname: "",
		lastname: "",
		roles: [UserRoles.USER],
		email: "",
		password: "",
		isVerified: false, // Will be set to false by default on submission

		// Designer Fields
		specialisationDesigner: "",
		bioDesigner: "",
		portfolio: [
			{
				imgSrc: "",
				projectName: "",
				projectDescription: "",
				category: "Fashion",
			},
		],
		socialMedia: {
			instagram: "",
			pinterest: "",
			twitter: "",
		},
		projectsCompleted: 0,
		ratingDesigner: 0,
		noRatersDesigner: 0,

		// Manufacturer Fields
		name: "",
		city: "",
		ratingManu: 0,
		noReviews: 0,
		minQuantity: "",
		capacity: "",
		price: "",

		// Seller Fields
		products: [
			{
				productName: "",
				description: "",
				price: "",
				sizes: "",
				rating: 0,
			},
		],
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		success: boolean;
		message: string;
	} | null>(null);
	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleNestedChange = (
		parentKey: string,
		childKey: string,
		value: string
	) => {
		setFormData((prevData) => {
			const parentValue = prevData[parentKey as keyof typeof prevData];
			if (typeof parentValue !== "object" || parentValue === null) {
				return prevData;
			}
			return {
				...prevData,
				[parentKey]: {
					...(parentValue as Record<string, unknown>),
					[childKey]: value,
				},
			};
		});
	};

	const handlePortfolioChange = (
		index: number,
		field: string,
		value: string
	) => {
		setFormData((prevData) => {
			const updatedPortfolio = [...prevData.portfolio];
			updatedPortfolio[index] = {
				...updatedPortfolio[index],
				[field]: value,
			};
			return {
				...prevData,
				portfolio: updatedPortfolio,
			};
		});
	};

	const addPortfolioItem = () => {
		setFormData((prevData) => ({
			...prevData,
			portfolio: [
				...prevData.portfolio,
				{
					imgSrc: "",
					projectName: "",
					projectDescription: "",
					category: "Fashion",
				},
			],
		}));
	};

	const removePortfolioItem = (index: number) => {
		setFormData((prevData) => {
			const updatedPortfolio = [...prevData.portfolio];
			updatedPortfolio.splice(index, 1);
			return {
				...prevData,
				portfolio: updatedPortfolio,
			};
		});
	};

	const handleProductChange = (index: number, field: string, value: string) => {
		setFormData((prevData) => {
			const updatedProducts = [...prevData.products];
			updatedProducts[index] = {
				...updatedProducts[index],
				[field]: value,
			};
			return {
				...prevData,
				products: updatedProducts,
			};
		});
	};

	const addProductItem = () => {
		setFormData((prevData) => ({
			...prevData,
			products: [
				...prevData.products,
				{
					productName: "",
					description: "",
					price: "",
					sizes: "",
					rating: 0,
				},
			],
		}));
	};

	const removeProductItem = (index: number) => {
		setFormData((prevData) => {
			const updatedProducts = [...prevData.products];
			updatedProducts.splice(index, 1);
			return {
				...prevData,
				products: updatedProducts,
			};
		});
	};

	const handleRoleChange = (role: UserRoles, checked: boolean) => {
		if (role === UserRoles.USER) return;

		setFormData((prevData) => {
			const currentRoles = [...prevData.roles];

			if (checked && !currentRoles.includes(role)) {
				currentRoles.push(role);
			} else if (!checked && currentRoles.includes(role)) {
				const index = currentRoles.indexOf(role);
				currentRoles.splice(index, 1);
			}

			if (!currentRoles.includes(UserRoles.USER)) {
				currentRoles.push(UserRoles.USER);
			}

			return { ...prevData, roles: currentRoles };
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitStatus({
					success: true,
					message:
						data.message ||
						"Registration successful! Please check your email to verify your account.",
				});

				// Redirect to verification pending page after 2 seconds
				setTimeout(() => {
					router.push(
						"/verification-pending?email=" + encodeURIComponent(formData.email)
					);
				}, 2000);
			} else {
				setSubmitStatus({
					success: false,
					message: data.message || "Registration failed. Please try again.",
				});
			}
		} catch (error) {
			console.error("Signup error:", error);
			setSubmitStatus({
				success: false,
				message: "An unexpected error occurred. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center py-16 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#000] to-slate-900 z-0 overflow-hidden">
				<div className="absolute w-full h-full opacity-30">
					{Array.from({ length: 20 }).map((_, i) => (
						<div
							key={i}
							className="absolute rounded-full"
							style={{
								width: `${Math.random() * 400 + 50}px`,
								height: `${Math.random() * 400 + 50}px`,
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								background: `radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(0,0,0,0) 70%)`,
								transform: `translate(-50%, -50%)`,
								animation: `float ${
									Math.random() * 10 + 15
								}s ease-in-out infinite`,
								animationDelay: `${Math.random() * 5}s`,
							}}
						/>
					))}
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl w-full mx-auto rounded-3xl p-10 relative z-10 shadow-[0_0_50px_rgba(79,70,229,0.15)] bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500"
			>
				<div className="mb-8 max-w-2xl">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<h2 className="font-bold text-3xl bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text">
							Welcome to Designique
						</h2>
						<p className="text-neutral-400 text-sm max-w-sm mt-3 leading-relaxed">
							Join our creative community and discover a world of design
							possibilities.
						</p>
					</motion.div>
				</div>

				<form className="space-y-6 max-w-3xl mx-auto" onSubmit={handleSubmit}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="flex flex-col md:flex-row gap-4"
					>
						<LabelInputContainer>
							<Label
								htmlFor="firstname"
								className="text-neutral-200 text-sm font-medium"
							>
								First name
							</Label>
							<Input
								id="firstname"
								name="firstname"
								placeholder="Tashif Ahmad"
								type="text"
								value={formData.firstname}
								onChange={handleChange}
								className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_15px_rgba(79,70,229,0.2)]"
							/>
						</LabelInputContainer>
						<LabelInputContainer>
							<Label
								htmlFor="lastname"
								className="text-neutral-200 text-sm font-medium"
							>
								Last name
							</Label>
							<Input
								id="lastname"
								name="lastname"
								placeholder="Khan"
								type="text"
								value={formData.lastname}
								onChange={handleChange}
								className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_15px_rgba(79,70,229,0.2)]"
							/>
						</LabelInputContainer>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						<Label className="text-neutral-200 text-sm font-medium mb-3 block">
							I want to join as{" "}
							<span className="text-indigo-400">(select all that apply)</span>
						</Label>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-3">
							{roleOptions.map((role) => {
								const isSelected = formData.roles.includes(
									role.id as UserRoles
								);
								const isDisabled = role.alwaysSelected;

								return (
									<div key={role.id} className="relative">
										<button
											type="button"
											disabled={isDisabled}
											onClick={() =>
												handleRoleChange(role.id as UserRoles, !isSelected)
											}
											className={cn(
												"w-full h-16 rounded-xl border border-zinc-700/50 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center relative group overflow-hidden",
												isSelected
													? "bg-indigo-900/30 border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.2)]"
													: "bg-zinc-800/20 hover:bg-zinc-800/40 hover:border-zinc-600/70"
											)}
										>
											<span
												className={cn(
													"text-sm font-medium z-10",
													isSelected ? "text-indigo-300" : "text-neutral-300"
												)}
											>
												{role.label}
											</span>

											{role.alwaysSelected && (
												<span className="text-[10px] text-indigo-400/80 mt-1 z-10">
													Always selected
												</span>
											)}

											{isSelected && (
												<motion.div
													layoutId={`selected-bg-${role.id}`}
													className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-0"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
												/>
											)}

											{isSelected && (
												<>
													<span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
													<span className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-purple-400 animate-ping delay-300" />
												</>
											)}
										</button>
									</div>
								);
							})}
						</div>
						<p className="text-neutral-400 text-xs mt-2">
							Select one or more roles to customize your experience.
						</p>
					</motion.div>

					{/* Designer fields */}
					{formData.roles.includes(UserRoles.DESIGNER) && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="space-y-6 overflow-hidden"
						>
							<div className="p-3 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
								<h3 className="text-indigo-400 font-medium mb-3 text-sm">
									Designer Info
								</h3>
								<div className="space-y-4">
									<LabelInputContainer>
										<Label
											htmlFor="specialisationDesigner"
											className="text-neutral-200 text-sm font-medium"
										>
											Specialisation
										</Label>
										<Input
											id="specialisationDesigner"
											name="specialisationDesigner"
											type="text"
											placeholder="e.g., Fashion Illustration, 3D Modeling"
											value={formData.specialisationDesigner}
											onChange={handleChange}
											className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
										/>
									</LabelInputContainer>
									<LabelInputContainer>
										<Label
											htmlFor="bioDesigner"
											className="text-neutral-200 text-sm font-medium"
										>
											Bio
										</Label>
										<Textarea
											id="bioDesigner"
											name="bioDesigner"
											placeholder="Tell us about your design journey..."
											value={formData.bioDesigner}
											onChange={handleChange}
											className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all min-h-[80px] px-4 py-3 appearance-none cursor-pointer hover:bg-zinc-800/50"
										/>
									</LabelInputContainer>

									{/* Social Media Links */}
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<LabelInputContainer>
											<Label className="text-neutral-200 text-sm font-medium">
												Instagram
											</Label>
											<Input
												placeholder="@username"
												type="text"
												value={formData.socialMedia.instagram}
												onChange={(e) =>
													handleNestedChange(
														"socialMedia",
														"instagram",
														e.target.value
													)
												}
												className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
											/>
										</LabelInputContainer>
										<LabelInputContainer>
											<Label className="text-neutral-200 text-sm font-medium">
												Pinterest
											</Label>
											<Input
												placeholder="@username"
												type="text"
												value={formData.socialMedia.pinterest}
												onChange={(e) =>
													handleNestedChange(
														"socialMedia",
														"pinterest",
														e.target.value
													)
												}
												className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
											/>
										</LabelInputContainer>
										<LabelInputContainer>
											<Label className="text-neutral-200 text-sm font-medium">
												Twitter / X
											</Label>
											<Input
												placeholder="@username"
												type="text"
												value={formData.socialMedia.twitter}
												onChange={(e) =>
													handleNestedChange(
														"socialMedia",
														"twitter",
														e.target.value
													)
												}
												className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
											/>
										</LabelInputContainer>
									</div>

									<LabelInputContainer>
										<Label className="text-neutral-200 text-sm font-medium">
											Projects Completed
										</Label>
										<Input
											name="projectsCompleted"
											type="number"
											min="0"
											placeholder="0"
											value={formData.projectsCompleted}
											onChange={handleChange}
											className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
										/>
									</LabelInputContainer>

									{/* Portfolio */}
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<Label className="text-neutral-200 text-sm font-medium">
												Portfolio
											</Label>
											<Button
												type="button"
												onClick={addPortfolioItem}
												size="sm"
												variant="outline"
												className="bg-zinc-800/50 border-zinc-700 text-neutral-300 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/50 transition-all"
											>
												<IconPlus className="h-4 w-4 mr-1" /> Add Project
											</Button>
										</div>

										{formData.portfolio.map((item, index) => (
											<div
												key={index}
												className="p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/30 space-y-3"
											>
												<div className="flex items-center justify-between">
													<Label className="text-neutral-200 text-sm font-medium">
														Project {index + 1}
													</Label>
													{formData.portfolio.length > 1 && (
														<Button
															type="button"
															onClick={() => removePortfolioItem(index)}
															size="sm"
															variant="outline"
															className="bg-zinc-800/50 border-zinc-700 text-red-400 hover:bg-red-900/20 hover:text-red-300 hover:border-red-500/50 transition-all"
														>
															<IconTrash className="h-4 w-4" />
														</Button>
													)}
												</div>

												<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
													<LabelInputContainer>
														<Label className="text-neutral-200 text-sm font-medium">
															Project Name
														</Label>
														<Input
															placeholder="My Amazing Project"
															value={item.projectName}
															onChange={(e) =>
																handlePortfolioChange(
																	index,
																	"projectName",
																	e.target.value
																)
															}
															className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
														/>
													</LabelInputContainer>
													<LabelInputContainer>
														<Label className="text-neutral-200 text-sm font-medium">
															Image URL
														</Label>
														<Input
															placeholder="https://example.com/image.jpg"
															value={item.imgSrc}
															onChange={(e) =>
																handlePortfolioChange(
																	index,
																	"imgSrc",
																	e.target.value
																)
															}
															className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
														/>
													</LabelInputContainer>
												</div>

												<LabelInputContainer>
													<Label className="text-neutral-200 text-sm font-medium">
														Category
													</Label>
													<Select
														value={item.category}
														onValueChange={(value) =>
															handlePortfolioChange(index, "category", value)
														}
													>
														<SelectTrigger className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50">
															<SelectValue placeholder="Select a category" />
														</SelectTrigger>
														<SelectContent className="bg-zinc-900 border border-zinc-700">
															{designCategories.map((category) => (
																<SelectItem
																	key={category}
																	value={category}
																	className="text-neutral-300 focus:bg-indigo-500/20 focus:text-indigo-300"
																>
																	{category}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</LabelInputContainer>

												<LabelInputContainer>
													<Label className="text-neutral-200 text-sm font-medium">
														Description
													</Label>
													<Textarea
														placeholder="Describe your project..."
														value={item.projectDescription}
														onChange={(e) =>
															handlePortfolioChange(
																index,
																"projectDescription",
																e.target.value
															)
														}
														className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all min-h-[80px] px-4 py-3 appearance-none cursor-pointer hover:bg-zinc-800/50"
													/>
												</LabelInputContainer>
											</div>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					)}

					{/* Manufacturer fields */}
					{formData.roles.includes(UserRoles.MANUFACTURER) && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="space-y-6 overflow-hidden"
						>
							<div className="p-3 rounded-xl border border-blue-500/20 bg-blue-500/5">
								<h3 className="text-blue-400 font-medium mb-3 text-sm">
									Manufacturer Info
								</h3>
								<div className="space-y-4">
									<LabelInputContainer>
										<Label
											htmlFor="name"
											className="text-neutral-200 text-sm font-medium"
										>
											Company Name
										</Label>
										<Input
											id="name"
											name="name"
											type="text"
											placeholder="e.g., Acme Manufacturing Co."
											value={formData.name}
											onChange={handleChange}
											className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
										/>
									</LabelInputContainer>
									<LabelInputContainer>
										<Label
											htmlFor="city"
											className="text-neutral-200 text-sm font-medium"
										>
											City
										</Label>
										<Input
											id="city"
											name="city"
											type="text"
											placeholder="e.g., New York"
											value={formData.city}
											onChange={handleChange}
											className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
										/>
									</LabelInputContainer>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<LabelInputContainer>
											<Label
												htmlFor="minQuantity"
												className="text-neutral-200 text-sm font-medium"
											>
												Min. Quantity
											</Label>
											<Input
												id="minQuantity"
												name="minQuantity"
												type="number"
												min="0"
												placeholder="e.g., 100"
												value={formData.minQuantity}
												onChange={handleChange}
												className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
											/>
										</LabelInputContainer>
										<LabelInputContainer>
											<Label
												htmlFor="capacity"
												className="text-neutral-200 text-sm font-medium"
											>
												Capacity
											</Label>
											<Input
												id="capacity"
												name="capacity"
												type="number"
												min="0"
												placeholder="e.g., 5000 units/month"
												value={formData.capacity}
												onChange={handleChange}
												className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
											/>
										</LabelInputContainer>
										<LabelInputContainer>
											<Label
												htmlFor="price"
												className="text-neutral-200 text-sm font-medium"
											>
												Est. Price/Unit ($)
											</Label>
											<Input
												id="price"
												name="price"
												type="number"
												min="0"
												step="0.01"
												placeholder="e.g., 15.50"
												value={formData.price}
												onChange={handleChange}
												className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
											/>
										</LabelInputContainer>
									</div>
								</div>
							</div>
						</motion.div>
					)}

					{/* Seller fields */}
					{formData.roles.includes(UserRoles.SELLER) && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className="space-y-6 overflow-hidden"
						>
							<div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-purple-400 font-medium text-sm">
										Seller Info
									</h3>
									<Button
										type="button"
										onClick={addProductItem}
										size="sm"
										variant="outline"
										className="bg-zinc-800/50 border-zinc-700 text-neutral-300 hover:bg-purple-600/20 hover:text-purple-300 hover:border-purple-500/50 transition-all"
									>
										<IconPlus className="h-4 w-4 mr-1" /> Add Product
									</Button>
								</div>

								<div className="space-y-4">
									{formData.products.map((product, index) => (
										<div
											key={index}
											className="p-3 rounded-xl border border-zinc-700/50 bg-zinc-800/30 space-y-3"
										>
											<div className="flex items-center justify-between">
												<Label className="text-neutral-200 text-sm font-medium">
													Product {index + 1}
												</Label>
												{formData.products.length > 1 && (
													<Button
														type="button"
														onClick={() => removeProductItem(index)}
														size="sm"
														variant="outline"
														className="bg-zinc-800/50 border-zinc-700 text-red-400 hover:bg-red-900/20 hover:text-red-300 hover:border-red-500/50 transition-all"
													>
														<IconTrash className="h-4 w-4" />
													</Button>
												)}
											</div>

											<LabelInputContainer>
												<Label className="text-neutral-200 text-sm font-medium">
													Product Name
												</Label>
												<Input
													placeholder="Modern Designer Chair"
													value={product.productName}
													onChange={(e) =>
														handleProductChange(
															index,
															"productName",
															e.target.value
														)
													}
													className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
												/>
											</LabelInputContainer>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
												<LabelInputContainer>
													<Label className="text-neutral-200 text-sm font-medium">
														Price ($)
													</Label>
													<Input
														type="number"
														min="0"
														step="0.01"
														placeholder="99.99"
														value={product.price}
														onChange={(e) =>
															handleProductChange(
																index,
																"price",
																e.target.value
															)
														}
														className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
													/>
												</LabelInputContainer>
												<LabelInputContainer>
													<Label className="text-neutral-200 text-sm font-medium">
														Available Sizes
													</Label>
													<Input
														placeholder="S, M, L, XL"
														value={product.sizes}
														onChange={(e) =>
															handleProductChange(
																index,
																"sizes",
																e.target.value
															)
														}
														className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50"
													/>
												</LabelInputContainer>
											</div>

											<LabelInputContainer>
												<Label className="text-neutral-200 text-sm font-medium">
													Description
												</Label>
												<Textarea
													placeholder="Describe your product..."
													value={product.description}
													onChange={(e) =>
														handleProductChange(
															index,
															"description",
															e.target.value
														)
													}
													className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all min-h-[80px] px-4 py-3 appearance-none cursor-pointer hover:bg-zinc-800/50"
												/>
											</LabelInputContainer>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					)}

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="space-y-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<LabelInputContainer>
								<Label
									htmlFor="email"
									className="text-neutral-200 text-sm font-medium"
								>
									Email Address
								</Label>
								<Input
									id="email"
									name="email"
									placeholder="developer420@tashif.codes"
									type="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_15px_rgba(79,70,229,0.2)]"
								/>
							</LabelInputContainer>

							<LabelInputContainer>
								<Label
									htmlFor="password"
									className="text-neutral-200 text-sm font-medium"
								>
									Password
								</Label>
								<Input
									id="password"
									name="password"
									placeholder="••••••••"
									type="password"
									value={formData.password}
									onChange={handleChange}
									required
									className="w-full bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-neutral-300 placeholder:text-neutral-500 rounded-xl focus:border-indigo-500 focus:ring-indigo-500/20 transition-all h-11 px-4 appearance-none cursor-pointer hover:bg-zinc-800/50 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_15px_rgba(79,70,229,0.2)]"
								/>
							</LabelInputContainer>
						</div>

						{submitStatus && (
							<div
								className={`p-4 rounded-xl ${
									submitStatus.success
										? "bg-green-900/20 border border-green-500/30 text-green-300"
										: "bg-red-900/20 border border-red-500/30 text-red-300"
								}`}
							>
								{submitStatus.message}
							</div>
						)}

						<motion.button
							whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
							whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
							className="bg-gradient-to-br relative group/btn from-indigo-600 via-purple-600 to-blue-700 block w-full text-white rounded-xl h-12 font-medium shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all duration-300 disabled:opacity-70"
							type="submit"
							disabled={isSubmitting}
						>
							<span className="relative z-10 flex items-center justify-center">
								{isSubmitting ? (
									<>
										<Loader2 className="h-5 w-5 mr-2 animate-spin" />
										<span>Processing...</span>
									</>
								) : (
									<>
										<span>Sign up</span>
										<svg
											className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M14 5l7 7m0 0l-7 7m7-7H3"
											/>
										</svg>
									</>
								)}
							</span>
							<BottomGradient />
						</motion.button>
					</motion.div>

					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-zinc-700/50"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-zinc-900/40 px-2 text-neutral-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{[
							{ icon: IconBrandGithub, text: "Continue with GitHub" },
							{ icon: IconBrandGoogle, text: "Continue with Google" },
						].map((item, index) => (
							<motion.button
								key={index}
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}
								className="relative group/btn flex items-center justify-center w-full rounded-xl h-12 font-medium bg-zinc-800/30 backdrop-blur-sm border border-zinc-800 hover:bg-zinc-800/70 hover:border-zinc-700 transition-all duration-300"
								type="button"
							>
								<item.icon className="h-5 w-5 text-neutral-300 mr-2" />
								<span className="text-neutral-300 text-sm">{item.text}</span>
								<BottomGradient />
							</motion.button>
						))}
					</div>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7, duration: 0.5 }}
						className="text-center text-sm text-neutral-400 mt-8"
					>
						Already have an account?{" "}
						<Link
							href="/signin"
							className="text-indigo-400 hover:text-indigo-500 transition-colors font-medium"
						>
							Sign in
						</Link>
					</motion.p>
				</form>
			</motion.div>

			{/* Visual decoration elements */}
			<div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent z-0 pointer-events-none"></div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
