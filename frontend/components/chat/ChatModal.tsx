"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Designer } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";
import { ChatMessage } from "./ChatMessage";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
	onSend: (message: string) => void;
}

interface ChatModalProps {
	designer: Designer;
	open: boolean;
	onClose: () => void;
	onSend: (message: string) => void;
}

export function ChatModal({ designer, open, onClose, onSend }: ChatModalProps) {
	const handleSendMessage = (message: string) => {
		console.log("Sending message:", message);
	};

	const [message, setMessage] = useState("");

	const handleSend = () => {
		if (message.trim()) {
			onSend(message);
			setMessage("");
		}
	};
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent
				className="overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl w-[95vw] max-h-[90vh]
        sm:w-[85vw] sm:max-w-2xl 
        md:w-[75vw] 
        lg:w-[65vw]
        shadow-xl"
			>
				{/* Glassmorphic gradient overlays */}
				<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />
				<div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-cyan-500/5 pointer-events-none" />

				<DialogTitle className="sr-only">Chat with {designer.name}</DialogTitle>

				{/* Header with frosted glass effect */}
				<div className="px-4 py-3 backdrop-blur-md bg-slate-700/60 rounded-3xl">
					<div className="flex items-center  pb-1">
						<Image
							src={designer.avatar}
							alt={designer.name}
							className="w-10 h-10 rounded-full"
							width={40}
							height={40}
						/>
						<div className="ml-3">
							<h3 className="font-semibold">{designer.name}</h3>
							<p className="text-sm text-gray-400">
								Usually responds within 24 hours
							</p>
						</div>
					</div>
				</div>

				{/* Chat messages area with custom scrollbar */}
				<div
					className="relative flex-grow h-[60vh] sm:h-[50vh] md:h-[35vh] lg:h-[40vh] 
          overflow-y-auto my-2 space-y-3 px-4 
          scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
				>
					<div className="space-y-4">
						<ChatMessage
							message="Hello! I'm interested in your latest collection."
							timestamp="12:30 PM"
							isOwn={true}
						/>
						<ChatMessage
							message="Thank you for your interest! How can I help you today?"
							timestamp="12:32 PM"
						/>
					</div>
				</div>

				{/* Input area with frosted glass effect */}
				<div className="relative bottom-0 pb-4 pr-3 pl-3 border-white/10 backdrop-blur-md bg-white/5 rounded-3xl">
					<div className="flex items-center space-x-2 mt-4">
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSend()}
							placeholder="Type your message..."
							className="flex-1 bg-white/5 border border-white/10 rounded-x w-full  backdrop-blur-md rounded-xl  
              focus-within:border-white/30 transition-all
              hover:bg-white/15 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 "
						/>
						<Button
							size="icon"
							className="shrink-0 bg-purple-800/60 rounded-xl hover:bg-purple-900/60"
							onClick={() => handleSendMessage(message)}
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
