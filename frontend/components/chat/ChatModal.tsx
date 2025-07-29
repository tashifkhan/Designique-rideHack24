"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Designer } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChatMessage } from "./ChatMessage";
import {
	Send,
	Paperclip,
	Image as ImageIcon,
	Wifi,
	WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/lib/contexts/ChatContext";
import { MessageContent } from "@/lib/services/websocket";

interface ChatModalProps {
	designer: Designer;
	open: boolean;
	onClose: () => void;
	userId: string;
}

export function ChatModal({ designer, open, onClose, userId }: ChatModalProps) {
	const {
		messages,
		isConnected,
		sendMessage,
		createConversation,
		currentConversationId,
	} = useChat();
	const [message, setMessage] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Create conversation when modal opens
	useEffect(() => {
		if (open && !currentConversationId) {
			// Use designer ID as participant ID (in real app, this would be the actual user ID)
			createConversation(designer.id.toString());
		}
	}, [open, currentConversationId, createConversation, designer.id]);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = () => {
		if (message.trim() && currentConversationId) {
			const content: MessageContent = {
				type: "text",
				text: message.trim(),
			};
			sendMessage(content);
			setMessage("");
		}
	};

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file || !currentConversationId) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("http://localhost:8080/upload", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				const content: MessageContent = {
					type: file.type.startsWith("image/") ? "image" : "file",
					url: result.url,
					filename: result.filename,
					mime_type: result.mimeType,
				};
				sendMessage(content);
			} else {
				console.error("Upload failed");
			}
		} catch (error) {
			console.error("Upload error:", error);
		} finally {
			setIsUploading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
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
					<div className="flex items-center justify-between pb-1">
						<div className="flex items-center">
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
						<div className="flex items-center space-x-2">
							{isConnected ? (
								<Wifi className="h-4 w-4 text-green-400" />
							) : (
								<WifiOff className="h-4 w-4 text-red-400" />
							)}
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
						{messages.length === 0 ? (
							<div className="text-center text-gray-400 py-8">
								<p>Start a conversation with {designer.name}</p>
							</div>
						) : (
							messages.map((msg) => (
								<ChatMessage
									key={msg.messageId}
									message={msg}
									isOwn={msg.senderId === userId}
								/>
							))
						)}
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input area with frosted glass effect */}
				<div className="relative bottom-0 pb-4 pr-3 pl-3 border-white/10 backdrop-blur-md bg-white/5 rounded-3xl">
					<div className="flex items-center space-x-2 mt-4">
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Type your message..."
							className="flex-1 bg-white/5 border border-white/10 rounded-x w-full  backdrop-blur-md rounded-xl  
              focus-within:border-white/30 transition-all
              hover:bg-white/15 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 "
							disabled={!isConnected}
						/>

						{/* File upload button */}
						<label className="cursor-pointer">
							<input
								type="file"
								className="hidden"
								onChange={handleFileUpload}
								accept="image/*,.pdf,.doc,.docx,.txt"
								disabled={!isConnected || isUploading}
							/>
							<Button
								size="icon"
								className="shrink-0 bg-blue-800/60 rounded-xl hover:bg-blue-900/60"
								disabled={!isConnected || isUploading}
							>
								<Paperclip className="h-4 w-4" />
							</Button>
						</label>

						<Button
							size="icon"
							className="shrink-0 bg-purple-800/60 rounded-xl hover:bg-purple-900/60"
							onClick={handleSend}
							disabled={!message.trim() || !isConnected}
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>

					{!isConnected && (
						<p className="text-xs text-red-400 mt-2 text-center">
							Connecting to chat server...
						</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
