"use client";

import { Users, BookOpen } from "lucide-react";
import { Designer } from "@/lib/types";

interface DesignerStatsProps {
  designer: Designer;
}

export function DesignerStats({ designer }: DesignerStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 my-6">
      <div className="text-center p-4 bg-white/5 rounded-lg">
        <BookOpen className="h-6 w-6 mx-auto mb-2" />
        <div className="font-semibold">{designer.collections}</div>
        <div className="text-sm text-gray-400">Collections</div>
      </div>
      <div className="text-center p-4 bg-white/5 rounded-lg">
        <Users className="h-6 w-6 mx-auto mb-2" />
        <div className="font-semibold">{designer.followers}</div>
        <div className="text-sm text-gray-400">Followers</div>
      </div>
      <div className="text-center p-4 bg-white/5 rounded-lg">
        <Users className="h-6 w-6 mx-auto mb-2" />
        <div className="font-semibold">{designer.following}</div>
        <div className="text-sm text-gray-400">Following</div>
      </div>
    </div>
  );
}