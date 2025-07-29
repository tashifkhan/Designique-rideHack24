"use client";

import { ChatMessage as ChatMessageType } from "@/lib/services/websocket";
import { format } from "date-fns";

interface ChatMessageProps {
	message: ChatMessageType;
	isOwn?: boolean;
	className?: string;
}

export function ChatMessage({ message, isOwn = false }: ChatMessageProps) {
	const formatTimestamp = (timestamp: string) => {
		try {
			return format(new Date(timestamp), "HH:mm");
		} catch {
			return "--:--";
		}
	};

	const renderContent = () => {
		switch (message.content.type) {
			case "text":
				return <p className="text-sm text-white">{message.content.text}</p>;
			case "image":
				return (
					<div className="space-y-2">
						<img
							src={message.content.url}
							alt={message.content.filename || "Image"}
							className="max-w-xs rounded-lg"
						/>
						{message.content.filename && (
							<p className="text-xs text-gray-400">
								{message.content.filename}
							</p>
						)}
					</div>
				);
			case "file":
				return (
					<div className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg">
						<div className="text-blue-400">📎</div>
						<div className="flex-1">
							<p className="text-sm text-white">{message.content.filename}</p>
							<p className="text-xs text-gray-400">
								{message.content.mime_type}
							</p>
						</div>
						<a
							href={message.content.url}
							download
							className="text-blue-400 hover:text-blue-300 text-xs"
						>
							Download
						</a>
					</div>
				);
			default:
				return (
					<p className="text-sm text-gray-400">Unsupported message type</p>
				);
		}
	};

	return (
		<div className={`flex ${isOwn ? "justify-end" : ""}`}>
			<div
				className={`rounded-2xl p-4 transform transition-all hover:scale-[1.02] max-w-[80%] ${
					isOwn ? "bg-purple-500/20" : "bg-white/10"
				}`}
			>
				{renderContent()}
				<div className="flex items-center justify-between mt-2">
					<span className="text-xs text-gray-400">
						{formatTimestamp(message.createdAt)}
					</span>
					{message.editedAt && (
						<span className="text-xs text-gray-500 ml-2">(edited)</span>
					)}
				</div>
			</div>
		</div>
	);
}
