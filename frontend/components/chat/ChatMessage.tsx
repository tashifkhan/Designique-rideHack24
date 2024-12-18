"use client";

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

export function ChatMessage({ message, timestamp, isOwn = false }: ChatMessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : ''}`}>
      <div className={`rounded-lg p-3 max-w-[80%] ${
        isOwn ? 'bg-purple-500/20' : 'bg-white/10'
      }`}>
        <p className="text-sm">{message}</p>
        <span className="text-xs text-gray-400 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
}