"use client";

import { Designer } from "@/lib/types";

interface ChatHeaderProps {
  designer: Designer;
}

export function ChatHeader({ designer }: ChatHeaderProps) {
  return (
    <div className="flex items-center border-b border-white/10 pb-4">
      <img
        src={designer.avatar}
        alt={designer.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-3">
        <h3 className="font-semibold">{designer.name}</h3>
        <p className="text-sm text-gray-400">Usually responds within 24 hours</p>
      </div>
    </div>
  );
}