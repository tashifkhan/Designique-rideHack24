"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerificationPage({
	params,
}: {
	params: { token: string; id: string };
}) {
	const [verificationStatus, setVerificationStatus] = useState<
		"loading" | "success" | "error"
	>("loading");
	const [message, setMessage] = useState<string>("Verifying your email...");
	const router = useRouter();

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const response = await fetch("/api/auth/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: params.token,
						id: decodeURIComponent(params.id),
					}),
				});

				const data = await response.json();

				if (response.ok) {
					setVerificationStatus("success");
					setMessage(
						data.message || "Your email has been successfully verified!"
					);
					// Auto-redirect after 3 seconds
					setTimeout(() => {
						router.push("/signin");
					}, 3000);
				} else {
					setVerificationStatus("error");
					setMessage(
						data.message || "Failed to verify your email. Please try again."
					);
				}
			} catch (error) {
				console.error("Verification error:", error);
				setVerificationStatus("error");
				setMessage("An unexpected error occurred. Please try again.");
			}
		};

		verifyEmail();
	}, [params.token, params.id, router]);

	return (
		<div className="min-h-screen w-full flex items-center justify-center py-16 relative overflow-hidden">
			{/* Background styling similar to signup page */}
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

			<Card className="max-w-md w-full mx-auto rounded-3xl p-8 relative z-10 shadow-[0_0_50px_rgba(79,70,229,0.15)] bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-500">
				<div className="flex flex-col items-center justify-center space-y-8">
					{verificationStatus === "loading" && (
						<>
							<Loader2 className="h-16 w-16 text-indigo-500 animate-spin" />
							<h2 className="text-2xl font-bold text-center text-white">
								Verifying your email
							</h2>
							<p className="text-neutral-400 text-center">
								Please wait while we confirm your email address...
							</p>
						</>
					)}

					{verificationStatus === "success" && (
						<>
							<CheckCircle className="h-16 w-16 text-green-500" />
							<h2 className="text-2xl font-bold text-center text-white">
								Email Verified!
							</h2>
							<p className="text-neutral-400 text-center">{message}</p>
							<p className="text-neutral-400 text-center text-sm">
								Redirecting you to login page...
							</p>
							<Button
								className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white rounded-xl h-12 font-medium shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all duration-300"
								asChild
							>
								<Link href="/signin">Sign in now</Link>
							</Button>
						</>
					)}

					{verificationStatus === "error" && (
						<>
							<XCircle className="h-16 w-16 text-red-500" />
							<h2 className="text-2xl font-bold text-center text-white">
								Verification Failed
							</h2>
							<p className="text-neutral-400 text-center">{message}</p>
							<div className="flex flex-col space-y-3">
								<Button
									className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white rounded-xl h-12 font-medium shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all duration-300"
									asChild
								>
									<Link href="/signup">Try signing up again</Link>
								</Button>
								<Button
									variant="outline"
									className="border-zinc-700 hover:bg-zinc-800 text-neutral-300 rounded-xl h-12"
									asChild
								>
									<Link href="/">Go to homepage</Link>
								</Button>
							</div>
						</>
					)}
				</div>
			</Card>
		</div>
	);
}
