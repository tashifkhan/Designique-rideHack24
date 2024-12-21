import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#000] to-slate-900 pt-24 relative overflow-hidden">
			{/* Glassmorphic background elements */}
			<div className="absolute inset-0">
				<div className="absolute top-[30%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/30 blur-[100px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/30 blur-[100px]" />
			</div>

			<div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
					<p className="text-gray-300 max-w-2xl mx-auto">
						Have questions or want to collaborate? We'd love to hear from you.
						Reach out to us through any of the channels below.
					</p>
				</div>

				{/* Contact Cards Grid */}
				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{/* Contact Form Card */}
					<Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl hover:bg-white/15 transition-all duration-300">
						<CardContent className="p-6">
							<h3 className="text-2xl font-bold mb-6 text-white">
								Send a Message
							</h3>
							<form
								className="space-y-6"
								action="mailto:contact@example.com"
								method="POST"
								encType="text/plain"
							>
								<div>
									<input
										type="text"
										placeholder="Your Name"
										className="w-full p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
										name="name"
										required
									/>
								</div>
								<div>
									<input
										type="email"
										placeholder="Your Email"
										className="w-full p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
										name="email"
										required
									/>
								</div>
								<div>
									<textarea
										rows={4}
										placeholder="Your Message"
										className="w-full p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
										name="message"
										required
									/>
								</div>
								<button
									type="submit"
									className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 backdrop-blur-sm text-white font-semibold transition duration-300 transform hover:scale-105"
								>
									Send Message
								</button>
							</form>
						</CardContent>
					</Card>

					{/* Contact Info Card */}
					<Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl hover:bg-white/15 transition-all duration-300">
						<CardContent className="p-6">
							<h3 className="text-2xl font-bold mb-6 text-white">
								Contact Information
							</h3>
							<div className="space-y-6">
								<div className="flex items-start space-x-4">
									<div className="p-3 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/20">
										<svg
											className="w-6 h-6 text-blue-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-white">Email</h4>
										<p className="text-gray-300">contact@example.com</p>
									</div>
								</div>

								{/* Location and Phone sections remain the same, just with updated background classes */}
								<div className="flex items-start space-x-4">
									<div className="p-3 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/20">
										<MapPin className="w-6 h-6 text-blue-400" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-white">
											Location
										</h4>
										<p className="text-gray-300">
											123 Innovation Street, Tech City
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-4">
									<div className="p-3 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/20">
										<Phone className="w-6 h-6 text-blue-400" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-white">Phone</h4>
										<p className="text-gray-300">+1 (555) 123-4567</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
export default ContactPage;
