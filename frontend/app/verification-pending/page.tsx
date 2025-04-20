"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Loader2, CheckCircle, MailIcon } from "lucide-react";

export default function VerificationPendingPage() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");
	const [isResending, setIsResending] = useState(false);
	const [resendStatus, setResendStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const handleResendVerification = async () => {
		if (isResending || !email) return;

		setIsResending(true);
		setResendStatus("idle");

		try {
			const response = await fetch("/api/auth/resend-verification", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				setResendStatus("success");
			} else {
				setResendStatus("error");
			}
		} catch (error) {
			console.error("Error resending verification:", error);
			setResendStatus("error");
		} finally {
			setIsResending(false);
		}
	};

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
					<div className="h-16 w-16 bg-indigo-600/20 rounded-full flex items-center justify-center">
						<MailIcon className="h-8 w-8 text-indigo-400" />
					</div>

					<h2 className="text-2xl font-bold text-center text-white">
						Verify Your Email
					</h2>

					<div className="text-center space-y-3">
						<p className="text-neutral-300">
							We've sent a verification email to:
						</p>
						<p className="font-medium text-indigo-400">
							{email || "your email address"}
						</p>
						<p className="text-neutral-400 text-sm">
							Please check your inbox and click the verification link to
							complete your registration.
						</p>
					</div>

					<div className="w-full space-y-3">
						{resendStatus === "success" && (
							<div className="p-3 rounded-lg bg-green-900/20 border border-green-500/30 text-green-300 flex items-center text-sm">
								<CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
								Verification email resent successfully!
							</div>
						)}

						{resendStatus === "error" && (
							<div className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 text-red-300 text-sm">
								Failed to resend verification email. Please try again.
							</div>
						)}

						<Button
							onClick={handleResendVerification}
							disabled={isResending}
							className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white rounded-xl h-12 font-medium shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all duration-300 w-full"
						>
							{isResending ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Resending...
								</>
							) : (
								"Resend Verification Email"
							)}
						</Button>

						<div className="flex justify-between">
							<Button
								variant="outline"
								className="border-zinc-700 hover:bg-zinc-800 text-neutral-300 rounded-xl"
								asChild
							>
								<Link href="/">Go to Homepage</Link>
							</Button>

							<Button
								variant="outline"
								className="border-zinc-700 hover:bg-zinc-800 text-neutral-300 rounded-xl"
								asChild
							>
								<Link href="/signin">Sign In</Link>
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
