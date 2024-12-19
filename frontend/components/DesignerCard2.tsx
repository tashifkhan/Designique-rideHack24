"use client";

import { motion } from "framer-motion";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DesignerCard() {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="backdrop-blur-lg bg-white/10 rounded-xl overflow-hidden border border-white/20"
    >
      <div className="relative h-48">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80"
          alt="Designer Workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
            alt="Designer"
            className="w-12 h-12 rounded-full border-2 border-purple-400"
          />
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-white">Priya Sharma</h3>
            <p className="text-gray-400">Mumbai, India</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Specializing in contemporary fusion wear with traditional Indian elements.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
          <Button variant="secondary">View Profile</Button>
        </div>
      </div>
    </motion.div>
  );
}