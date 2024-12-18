"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Designer } from "@/lib/types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface ChatModalProps {
  designer: Designer;
  open: boolean;
  onClose: () => void;
}

export function ChatModal({ designer, open, onClose }: ChatModalProps) {
  const handleSendMessage = (message: string) => {
    // Handle sending message
    console.log("Sending message:", message);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 text-white max-w-md">
        <DialogTitle className="sr-only">
          Chat with {designer.name}
        </DialogTitle>

        <ChatHeader designer={designer} />

        <div className="h-[300px] overflow-y-auto my-4 space-y-4">
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

        <ChatInput onSend={handleSendMessage} />
      </DialogContent>
    </Dialog>
  );
}