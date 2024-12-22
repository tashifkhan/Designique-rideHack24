import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
	return (
		<footer className="bg-white/5 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] supports-[backdrop-filter]:bg-white/2 rounded-tl-2xl">
			<div className="container mx-auto py-12 px-4">
				<div className="grid gap-8 md:grid-cols-2 items-center">
					<div className="space-y-4">
						<h4 className="text-2xl font-bold bg-gradient-to-r from-white via-white/90 to-neutral-400 bg-clip-text text-transparent">
							Designique
						</h4>
						<p className="text-neutral-400/90 drop-shadow-sm">
							Connecting Manufacturers & Designers
						</p>
					</div>
					<div className="flex justify-end gap-6">
						{[
							{
								icon: FaFacebook,
								href: "https://facebook.com",
								color: "hover:text-blue-400/90",
							},
							{
								icon: FaInstagram,
								href: "https://instagram.com",
								color: "hover:text-pink-400/90",
							},
							{
								icon: FaTwitter,
								href: "https://twitter.com",
								color: "hover:text-blue-300/90",
							},
							{
								icon: FaLinkedin,
								href: "https://linkedin.com",
								color: "hover:text-blue-500/90",
							},
						].map((social, index) => (
							<a
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`${social.color} text-white/40 transition-all duration-300 hover:scale-110`}
							>
								<social.icon size={24} />
							</a>
						))}
					</div>
				</div>
				<div className="mt-8 border-white/10 text-center text-neutral-500/80 text-sm">
					© {new Date().getFullYear()} Designique. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
