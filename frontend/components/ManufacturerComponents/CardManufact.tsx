"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "../ui/direction-aware-hover";

interface DirectionAwareHoverProps {
  imageUrl: string;
  title: string;
  price: string;
}

export default function DirectionAwareHoverDemo({
  imageUrl,
  title,
  price,
}: DirectionAwareHoverProps) {
  return (
    <div className="h-[37rem] relative flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="font-bold text-xl">{title}</p>
        <p className="font-normal text-sm">{price}</p>
      </DirectionAwareHover>
    </div>
  );
}
