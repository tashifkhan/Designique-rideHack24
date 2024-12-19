"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
	onSend: (message: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
	const [message, setMessage] = useState("");

	const handleSend = () => {
		if (message.trim()) {
			onSend(message);
			setMessage("");
		}
	};

	return (
		<div className="flex items-center space-x-2 mt-4">
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyPress={(e) => e.key === "Enter" && handleSend()}
				placeholder="Type your message..."
				className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
			/>
			<Button
				size="icon"
				className="shrink-0 bg-purple-950/60 rounded-xl"
				onClick={handleSend}
			>
				<Send className="h-4 w-4" />
			</Button>
		</div>
	);
}
