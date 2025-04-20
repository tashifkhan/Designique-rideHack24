"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Loader2,
	User,
	Bell,
	Settings,
	LogOut,
	Home,
	Calendar,
	BarChart2,
	Users,
	FileText,
} from "lucide-react";

interface UserData {
	id: string;
	email: string;
	roles: string[];
	isVerified: boolean;
	designs: any[];
	rating: number;
	products: any[];
	createdAt: string;
	updatedAt: string;
	capacity: number;
	followers: {
		deviantart: number;
		instagram: number;
		pinterest: number;
		total: number;
		twitter: number;
	};
	minQuantity: number;
	noRatersDesigner: number;
	noReviews: number;
	portfolio: any[];
	price: number;
	projectsCompleted: number;
	ratingDesigner: number;
	ratingManu: number;
}

export default function DashboardPage() {
	const router = useRouter();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("overview");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("/api/auth/me");

				if (!response.ok) {
					if (response.status === 401) {
						router.push("/signin");
						return;
					}
					throw new Error(`Error ${response.status}: ${response.statusText}`);
				}

				const data = await response.json();
				setUserData(data.user);
			} catch (err) {
				console.error("Failed to fetch user data:", err);
				setError(
					"Failed to load your profile. Please try refreshing the page."
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();
	}, [router]);

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/auth/signout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});

			if (response.ok) {
				router.push("/signin");
			}
		} catch (err) {
			console.error("Logout failed:", err);
			setError("Failed to sign out. Please try again.");
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
				<div className="flex flex-col items-center">
					<Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
					<p className="text-neutral-300">Loading your dashboard...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
				<div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-6 rounded-xl max-w-md w-full">
					<h2 className="text-xl font-bold text-red-400 mb-3">
						Something went wrong
					</h2>
					<p className="text-neutral-300 mb-4">{error}</p>
					<div className="flex gap-4">
						<button
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
						>
							Refresh Page
						</button>
						<button
							onClick={() => router.push("/signin")}
							className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white transition-colors"
						>
							Go to Sign In
						</button>
					</div>
				</div>
			</div>
		);
	}

	const sidebarLinks = [
		{ icon: Home, label: "Overview", id: "overview" },
		{ icon: Calendar, label: "Feauture 1", id: "schedule" },
		{ icon: BarChart2, label: "Feauture 2", id: "analytics" },
		{ icon: Users, label: "Feauture 3", id: "team" },
		{ icon: FileText, label: "Feature 3", id: "documents" },
	];

	return (
		<div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-[#0a0a0f] to-slate-900 text-neutral-200 pt-[4rem]">
			<div className="flex flex-col md:flex-row h-screen">
				{/* Mobile Navbar */}
				<div className="md:hidden flex items-center justify-between p-4 bg-zinc-900/70 backdrop-blur-md border-b border-zinc-800/50 sticky top-0 z-20">
					<h1 className="bg-gradient-to-b from-neutral-600 to-white bg-clip-text text-transparent text-xl font-bold">
						Dashboard
					</h1>
					<div className="flex items-center space-x-3">
						<button
							type="button"
							className="p-2 rounded-full hover:bg-zinc-800/50 relative"
						>
							<Bell className="h-5 w-5 text-zinc-400" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-zinc-900"></span>
						</button>
						<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-900/50">
							<User className="h-4 w-4 text-white" />
						</div>
					</div>
				</div>

				{/* Mobile Tab Navigation */}
				<div className="md:hidden overflow-x-auto flex items-center px-2 py-3 bg-zinc-900/50 border-b border-zinc-800/50 sticky top-[60px] z-10">
					{sidebarLinks.map((link) => (
						<button
							key={link.id}
							type="button"
							onClick={() => setActiveTab(link.id)}
							className={`flex items-center whitespace-nowrap px-3 py-2 mx-1 rounded-lg transition-all duration-200 ${
								activeTab === link.id
									? "bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 text-white border border-blue-500/20"
									: "bg-zinc-800/30 text-zinc-400"
							}`}
						>
							<link.icon
								className={`h-4 w-4 mr-2 ${
									activeTab === link.id ? "text-blue-400" : ""
								}`}
							/>
							<span className="text-sm font-medium">{link.label}</span>
						</button>
					))}
				</div>

				{/* Sidebar - Hidden on Mobile */}
				<aside className="hidden md:flex w-64 bg-zinc-900/50 backdrop-blur-md border-r border-zinc-800/50 flex-col h-full overflow-y-auto shadow-2xl relative z-10">
					{/* Logo and brand */}
					<div className="p-6 border-b border-zinc-800/50">
						<h1 className="bg-gradient-to-b from-neutral-600 to-white bg-clip-text text-transparent animate-gradient text-3xl text-bold">
							Dashboard
						</h1>
						<p className="text-xs text-zinc-500 mt-1">Design & Manufacturing</p>
					</div>

					{/* Navigation */}
					<div className="flex-1 px-3 py-6">
						<nav>
							<ul className="space-y-1.5">
								{sidebarLinks.map((link) => (
									<li key={link.id}>
										<button
											type="button"
											onClick={() => setActiveTab(link.id)}
											className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
												activeTab === link.id
													? "bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 text-white border border-blue-500/20 shadow-lg shadow-blue-900/20"
													: "hover:bg-zinc-800/50 text-zinc-400 hover:text-white"
											}`}
										>
											<link.icon
												className={`h-5 w-5 mr-3 ${
													activeTab === link.id ? "text-blue-400" : ""
												}`}
											/>
											<span className="font-medium">{link.label}</span>
										</button>
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* User profile and logout */}
					<div className="p-4 border-t border-zinc-800/50 bg-zinc-900/30">
						<div className="flex items-center mb-4 p-2 rounded-lg bg-zinc-800/30">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center mr-3 ring-2 ring-indigo-900/50">
								<User className="h-5 w-5 text-white" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">
									{userData?.email}
								</p>
								<p className="text-xs text-zinc-500 truncate">
									{userData?.roles?.[0] || "User"}
								</p>
							</div>
						</div>

						<button
							type="button"
							onClick={handleLogout}
							className="flex items-center w-full p-3 rounded-xl transition-all duration-200 bg-gradient-to-r from-red-800/20 to-pink-800/20 hover:from-red-800/40 hover:to-pink-800/40 text-red-400 hover:text-red-300 border border-red-900/20"
						>
							<LogOut className="h-5 w-5 mr-3" />
							<span className="font-medium">Sign out</span>
						</button>
					</div>
				</aside>

				{/* Main content */}
				<div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/50 via-black/50 to-slate-900/50">
					{/* Header - Hidden on Mobile */}
					<header className="hidden md:flex py-4 px-6 border-b border-zinc-800/50 items-center justify-between bg-zinc-900/40 backdrop-blur-md sticky top-0 z-10 shadow-md">
						<div className="flex items-center">
							<h2 className="text-xl font-semibold bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
								{sidebarLinks.find((link) => link.id === activeTab)?.label ||
									"Dashboard"}
							</h2>
							<div className="ml-3 px-3 py-1 rounded-full bg-zinc-800/50 text-xs text-zinc-400 border border-zinc-700/50">
								{new Date().toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<button
								type="button"
								className="p-2 rounded-full hover:bg-zinc-800/50 relative group"
							>
								<Bell className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors" />
								<span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-zinc-900"></span>
							</button>
							<button
								type="button"
								className="p-2 rounded-full hover:bg-zinc-800/50"
							>
								<Settings className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
							</button>
						</div>
					</header>
					{/* Dashboard content */}
					<main className="flex-1 overflow-y-auto p-4 md:p-8">
						{activeTab === "overview" && (
							<div className="space-y-6 md:space-y-8">
								{/* Welcome Card */}
								<section className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 backdrop-blur-md border border-zinc-800/60 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-indigo-900/5 transition-all duration-500">
									<div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="relative z-10">
										<h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
											Welcome back!
										</h3>
										<p className="text-zinc-400 text-sm md:text-base max-w-2xl">
											Here&apos;s an overview of your account information,
											projects and statistics.
										</p>
									</div>
								</section>

								{/* User Profile Card */}
								<section className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 backdrop-blur-md border border-zinc-800/60 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-xl">
									<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 md:mb-8 gap-3 md:gap-4">
										<div>
											<h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
												Your Profile
											</h3>
											<p className="text-zinc-500 text-xs md:text-sm mt-1">
												Personal information and account details
											</p>
										</div>
										<div className="flex flex-wrap items-center gap-2">
											<span
												className={`px-2 py-1 text-xs rounded-full ${
													userData?.isVerified
														? "bg-green-900/20 text-green-400 border border-green-700/30"
														: "bg-yellow-900/20 text-yellow-400 border border-yellow-700/30"
												}`}
											>
												{userData?.isVerified
													? "Verified Account"
													: "Unverified Account"}
											</span>
											<span className="px-2 py-1 bg-indigo-900/20 text-indigo-400 text-xs rounded-full border border-indigo-800/30">
												Member since{" "}
												{userData?.createdAt
													? new Date(userData.createdAt).toLocaleDateString(
															"en-US",
															{
																year: "numeric",
																month: "short",
															}
													  )
													: "N/A"}
											</span>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
										{/* Basic Information */}
										<div>
											<div className="space-y-5 md:space-y-6">
												<div className="group">
													<div className="flex items-center mb-2">
														<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
															<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500"></div>
														</div>
														<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
															User ID
														</p>
													</div>
													<div className="font-mono text-xs md:text-sm bg-zinc-800/40 hover:bg-zinc-800/60 p-2 md:p-3 rounded-lg overflow-x-auto border border-zinc-700/30 transition-colors duration-200">
														{userData?.id}
													</div>
												</div>

												<div className="group">
													<div className="flex items-center mb-2">
														<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
															<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500"></div>
														</div>
														<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
															Email
														</p>
													</div>
													<p className="text-lg text-white/90 pl-7">
														{userData?.email}
													</p>
												</div>

												<div className="group">
													<div className="flex items-center mb-2">
														<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
															<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500"></div>
														</div>
														<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
															Roles
														</p>
													</div>
													<div className="flex flex-wrap gap-2 pl-7">
														{userData?.roles?.length ? (
															userData.roles.map((role, index) => (
																<span
																	key={index}
																	className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-800/30"
																>
																	{role}
																</span>
															))
														) : (
															<span className="text-zinc-500">
																No roles assigned
															</span>
														)}
													</div>
												</div>
											</div>
										</div>

										{/* Statistics */}
										<div className="space-y-5 md:space-y-6">
											<div className="group">
												<div className="flex items-center mb-2 md:mb-3">
													<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
														<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-purple-500"></div>
													</div>
													<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
														Project Statistics
													</p>
												</div>
												<div className="grid grid-cols-2 gap-2 md:gap-3 pl-6 md:pl-7">
													<div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-blue-900/20 hover:border-blue-800/40 transition-colors duration-200">
														<p className="text-zinc-500 text-sm mb-1">
															Designs
														</p>
														<p className="text-2xl font-bold text-blue-400">
															{userData?.designs?.length || 0}
														</p>
													</div>
													<div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-900/20 hover:border-purple-800/40 transition-colors duration-200">
														<p className="text-zinc-500 text-sm mb-1">
															Products
														</p>
														<p className="text-2xl font-bold text-purple-400">
															{userData?.products?.length || 0}
														</p>
													</div>
													<div className="p-4 rounded-lg bg-gradient-to-br from-emerald-900/10 to-teal-900/10 border border-emerald-900/20 hover:border-emerald-800/40 transition-colors duration-200">
														<p className="text-zinc-500 text-sm mb-1">
															Portfolio
														</p>
														<p className="text-2xl font-bold text-emerald-400">
															{userData?.portfolio?.length || 0}
														</p>
													</div>
													<div className="p-4 rounded-lg bg-gradient-to-br from-amber-900/10 to-orange-900/10 border border-amber-900/20 hover:border-amber-800/40 transition-colors duration-200">
														<p className="text-zinc-500 text-sm mb-1">
															Completed
														</p>
														<p className="text-2xl font-bold text-amber-400">
															{userData?.projectsCompleted || 0}
														</p>
													</div>
												</div>
											</div>

											<div className="group">
												<div className="flex items-center mb-2 md:mb-3">
													<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
														<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500"></div>
													</div>
													<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
														Ratings
													</p>
												</div>
												<div className="pl-6 md:pl-7">
													<div className="grid grid-cols-3 gap-1">
														<div className="flex flex-col items-center p-2 md:p-3">
															<p className="text-2xl md:text-3xl font-bold text-white">
																{userData?.rating || 0}
															</p>
															<p className="text-[10px] md:text-xs text-zinc-500">
																Overall
															</p>
															<div className="flex mt-1">
																{[...Array(5)].map((_, i) => (
																	<div
																		key={i}
																		className={`w-2 h-2 rounded-full mx-0.5 ${
																			i < Math.round(userData?.rating || 0)
																				? "bg-amber-500"
																				: "bg-zinc-700"
																		}`}
																	></div>
																))}
															</div>
														</div>
														<div className="flex flex-col items-center p-2 md:p-3">
															<p className="text-2xl md:text-3xl font-bold text-white">
																{userData?.ratingDesigner || 0}
															</p>
															<p className="text-[10px] md:text-xs text-zinc-500">
																Designer
															</p>
															<div className="flex mt-1">
																{[...Array(5)].map((_, i) => (
																	<div
																		key={i}
																		className={`w-2 h-2 rounded-full mx-0.5 ${
																			i <
																			Math.round(userData?.ratingDesigner || 0)
																				? "bg-blue-500"
																				: "bg-zinc-700"
																		}`}
																	></div>
																))}
															</div>
														</div>
														<div className="flex flex-col items-center p-2 md:p-3">
															<p className="text-2xl md:text-3xl font-bold text-white">
																{userData?.ratingManu || 0}
															</p>
															<p className="text-[10px] md:text-xs text-zinc-500">
																Manufacturer
															</p>
															<div className="flex mt-1">
																{[...Array(5)].map((_, i) => (
																	<div
																		key={i}
																		className={`w-2 h-2 rounded-full mx-0.5 ${
																			i < Math.round(userData?.ratingManu || 0)
																				? "bg-purple-500"
																				: "bg-zinc-700"
																		}`}
																	></div>
																))}
															</div>
														</div>
													</div>
													<div className="mt-3 p-3 rounded-lg bg-zinc-800/20 border border-zinc-700/30">
														<div className="flex justify-between items-center">
															<span className="text-zinc-500">
																Total Reviews
															</span>
															<span className="text-lg font-medium">
																{userData?.noReviews || 0}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

								{/* Business Information - Adjust for mobile */}
								<section className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 backdrop-blur-md border border-zinc-800/60 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-xl">
									<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 md:mb-8 gap-3 md:gap-4">
										<div>
											<h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
												Business Information
											</h3>
											<p className="text-zinc-500 text-xs md:text-sm mt-1">
												Manufacturing capabilities and social presence
											</p>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
										{/* Manufacturing Capabilities - Adjust for mobile */}
										<div>
											<div className="flex items-center mb-3 md:mb-4">
												<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2">
													<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500"></div>
												</div>
												<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
													Manufacturing Capabilities
												</p>
											</div>

											<div className="grid grid-cols-3 gap-2 md:gap-3 pl-6 md:pl-7">
												<div className="relative group overflow-hidden rounded-xl">
													<div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													<div className="relative p-5 border border-emerald-900/20 rounded-xl">
														<div className="text-3xl font-bold text-white mb-1">
															{userData?.capacity || 0}
														</div>
														<div className="text-xs uppercase tracking-wider text-zinc-500">
															Capacity
														</div>
													</div>
												</div>
												<div className="relative group overflow-hidden rounded-xl">
													<div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													<div className="relative p-5 border border-blue-900/20 rounded-xl">
														<div className="text-3xl font-bold text-white mb-1">
															{userData?.minQuantity || 0}
														</div>
														<div className="text-xs uppercase tracking-wider text-zinc-500">
															Min Qty
														</div>
													</div>
												</div>
												<div className="relative group overflow-hidden rounded-xl">
													<div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
													<div className="relative p-5 border border-amber-900/20 rounded-xl">
														<div className="text-3xl font-bold text-white mb-1">
															${userData?.price || 0}
														</div>
														<div className="text-xs uppercase tracking-wider text-zinc-500">
															Price
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Social Media - Adjust for mobile */}
										<div>
											<div className="flex items-center mb-3 md:mb-4">
												<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-pink-500/20 flex items-center justify-center mr-2">
													<div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-pink-500"></div>
												</div>
												<p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">
													Social Media Presence
												</p>
											</div>

											<div className="pl-6 md:pl-7 space-y-3 md:space-y-4">
												<div className="p-4 rounded-lg bg-gradient-to-r from-zinc-900/60 to-zinc-800/40 border border-zinc-700/30">
													<div className="flex justify-between items-center mb-2">
														<p className="text-white font-medium">
															Total Followers
														</p>
														<p className="text-xl font-bold">
															{userData?.followers?.total || 0}
														</p>
													</div>
													<div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
														<div
															className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
															style={{
																width: `${Math.min(
																	100,
																	((userData?.followers?.total || 0) / 10) * 100
																)}%`,
															}}
														></div>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div className="p-3 rounded-lg bg-gradient-to-br from-pink-900/10 to-red-900/10 border border-pink-900/20 flex justify-between items-center">
														<div>
															<p className="text-xs text-zinc-500">Instagram</p>
															<p className="text-xl font-medium">
																{userData?.followers?.instagram || 0}
															</p>
														</div>
														<div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center">
															<div className="w-3 h-3 rounded-full bg-pink-500"></div>
														</div>
													</div>
													<div className="p-3 rounded-lg bg-gradient-to-br from-blue-900/10 to-cyan-900/10 border border-blue-900/20 flex justify-between items-center">
														<div>
															<p className="text-xs text-zinc-500">Twitter</p>
															<p className="text-xl font-medium">
																{userData?.followers?.twitter || 0}
															</p>
														</div>
														<div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
															<div className="w-3 h-3 rounded-full bg-blue-500"></div>
														</div>
													</div>
													<div className="p-3 rounded-lg bg-gradient-to-br from-red-900/10 to-amber-900/10 border border-red-900/20 flex justify-between items-center">
														<div>
															<p className="text-xs text-zinc-500">Pinterest</p>
															<p className="text-xl font-medium">
																{userData?.followers?.pinterest || 0}
															</p>
														</div>
														<div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
															<div className="w-3 h-3 rounded-full bg-red-500"></div>
														</div>
													</div>
													<div className="p-3 rounded-lg bg-gradient-to-br from-green-900/10 to-teal-900/10 border border-green-900/20 flex justify-between items-center">
														<div>
															<p className="text-xs text-zinc-500">
																DeviantArt
															</p>
															<p className="text-xl font-medium">
																{userData?.followers?.deviantart || 0}
															</p>
														</div>
														<div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
															<div className="w-3 h-3 rounded-full bg-green-500"></div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
							</div>
						)}

						{/* Other tabs - "Coming Soon" screens */}
						{activeTab !== "overview" && (
							<section className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/40 backdrop-blur-md border border-zinc-800/60 p-5 md:p-8 rounded-xl md:rounded-2xl shadow-xl">
								<div className="text-center">
									<div className="inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/10 mb-4 md:mb-6">
										{sidebarLinks
											.find((link) => link.id === activeTab)
											?.icon({
												className: "h-8 w-8 md:h-10 md:w-10 text-blue-400/80",
											})}
									</div>
									<h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
										{sidebarLinks.find((link) => link.id === activeTab)?.label}
									</h3>
									<p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto mb-6 md:mb-8">
										We&apos;re currently developing this feature to enhance your
										experience. Check back soon for updates.
									</p>
									<div className="inline-block p-px rounded-lg bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50">
										<button
											type="button"
											onClick={() => setActiveTab("overview")}
											className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-zinc-900/90 text-sm md:text-base text-white font-medium hover:bg-zinc-900/80 transition-colors"
										>
											Return to Overview
										</button>
									</div>
								</div>
							</section>
						)}
					</main>

					{/* Mobile Footer Navigation */}
					<div className="md:hidden flex items-center justify-between p-3 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800/50 sticky bottom-0 z-20">
						<button
							type="button"
							onClick={() => setActiveTab("overview")}
							className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${
								activeTab === "overview"
									? "bg-blue-600/20 text-blue-400"
									: "text-zinc-500"
							}`}
						>
							<Home className="h-5 w-5" />
							<span className="text-[10px] mt-1">Home</span>
						</button>

						{/* Add 2 more navigation icons here */}
						<button
							type="button"
							onClick={() => setActiveTab("schedule")}
							className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${
								activeTab === "schedule"
									? "bg-blue-600/20 text-blue-400"
									: "text-zinc-500"
							}`}
						>
							<Calendar className="h-5 w-5" />
							<span className="text-[10px] mt-1">Feature</span>
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("analytics")}
							className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg ${
								activeTab === "analytics"
									? "bg-blue-600/20 text-blue-400"
									: "text-zinc-500"
							}`}
						>
							<BarChart2 className="h-5 w-5" />
							<span className="text-[10px] mt-1">Stats</span>
						</button>

						{/* Logout button */}
						<button
							type="button"
							onClick={handleLogout}
							className="flex flex-col items-center justify-center w-12 h-12 rounded-lg text-red-400"
						>
							<LogOut className="h-5 w-5" />
							<span className="text-[10px] mt-1">Logout</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
