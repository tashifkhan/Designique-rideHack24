"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DesignCard } from "./DesignCard";
import { designs } from "@/lib/data/designs";

export default function FeaturedDesigns() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-white mb-8">Featured Designs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <DesignCard design={design} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}