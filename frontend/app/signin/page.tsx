"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SigninForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			// Validate form data
			if (!formData.email || !formData.password) {
				throw new Error("Email and password are required");
			}

			// Call the API
			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Failed to sign in");
			}

			// Handle successful signin
			router.push("/dashboard"); // Redirect to dashboard or home
			router.refresh(); // Refresh to update auth state in UI
		} catch (err) {
			console.error("Signin error:", err);
			setError(
				err instanceof Error ? err.message : "An unexpected error occurred"
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#000] to-slate-900">
			<div className="max-w-md w-full mx-auto rounded-3xl p-10 shadow-2xl bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500">
				<div className="mb-8">
					<h2 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
						Welcome Back
					</h2>
					<p className="text-neutral-400 text-sm max-w-sm mt-3 leading-relaxed">
						Sign in to continue your creative journey with Designique.
					</p>
				</div>

				{error && (
					<div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300">
						{error}
					</div>
				)}

				<form className="space-y-6" onSubmit={handleSubmit}>
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
							className="bg-zinc-800/30 border-zinc-700/50 text-neutral-200 placeholder:text-neutral-500 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all"
							disabled={isSubmitting}
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
							className="bg-zinc-800/30 border-zinc-700/50 text-neutral-200 placeholder:text-neutral-500 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all"
							disabled={isSubmitting}
						/>
					</LabelInputContainer>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								type="checkbox"
								id="rememberMe"
								name="rememberMe"
								checked={formData.rememberMe}
								onChange={handleChange}
								className="h-4 w-4 rounded border-zinc-700/50 bg-zinc-800/30 text-blue-500 focus:ring-blue-500/20"
								disabled={isSubmitting}
							/>
							<label
								htmlFor="rememberMe"
								className="ml-2 text-sm text-neutral-400"
							>
								Remember me
							</label>
						</div>
						<Link
							href="/forgot-password"
							className="text-sm text-blue-400 hover:text-blue-500 transition-colors"
						>
							Forgot password?
						</Link>
					</div>

					<button
						className="bg-gradient-to-br relative group/btn from-blue-600 via-purple-600 to-blue-800 block w-full text-white rounded-xl h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff20_inset,0px_-1px_0px_0px_#ffffff20_inset] hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<span className="flex items-center justify-center">
								<Loader2 className="h-5 w-5 mr-2 animate-spin" />
								Signing in...
							</span>
						) : (
							<span>Sign in &rarr;</span>
						)}
						<BottomGradient />
					</button>

					<div className="relative my-8">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-zinc-700"></div>
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-zinc-900/40 px-2 text-neutral-500">
								Or continue with
							</span>
						</div>
					</div>

					<div className="flex flex-col space-y-3">
						{[
							{ icon: IconBrandGithub, text: "Continue with GitHub" },
							{ icon: IconBrandGoogle, text: "Continue with Google" },
						].map((item, index) => (
							<button
								key={index}
								className="relative group/btn flex items-center justify-center w-full rounded-xl h-12 font-medium bg-zinc-800/30 backdrop-blur-sm border border-zinc-800 hover:bg-zinc-800/70 hover:border-zinc-700 transition-all duration-300"
								type="button"
								disabled={isSubmitting}
							>
								<item.icon className="h-5 w-5 text-neutral-300 mr-2" />
								<span className="text-neutral-300 text-sm">{item.text}</span>
								<BottomGradient />
							</button>
						))}
					</div>

					<p className="text-center text-sm text-neutral-400">
						Don't have an account?{" "}
						<Link
							href="/signup"
							className="text-blue-400 hover:text-blue-500 transition-colors"
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
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
