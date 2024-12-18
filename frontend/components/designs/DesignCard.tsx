"use client";

import { Card } from "@/components/ui/card";
import { Design } from "@/lib/types";

interface DesignCardProps {
  design: Design;
}

export function DesignCard({ design }: DesignCardProps) {
  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300">
      <div className="relative h-64">
        <img
          src={design.image}
          alt={design.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{design.title}</h3>
          <p className="text-gray-300">by {design.designer}</p>
        </div>
      </div>
    </Card>
  );
}