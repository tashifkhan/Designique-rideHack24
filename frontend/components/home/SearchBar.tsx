"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="relative max-w-2xl mx-auto mb-16">
      <div className="backdrop-blur-lg bg-white/10 rounded-lg p-2 border border-white/20">
        <div className="flex items-center">
          <Search className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search for designers, styles, or collections..."
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 px-4 py-2"
          />
          <Button variant="secondary" className="ml-2">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}