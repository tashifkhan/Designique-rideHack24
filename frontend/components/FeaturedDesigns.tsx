"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const designs = [
  {
    id: 1,
    title: "Modern Lehenga Collection",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80",
    designer: "Anjali Patel"
  },
  {
    id: 2,
    title: "Contemporary Saree Series",
    image: "https://images.unsplash.com/photo-1583391733975-0a131c8db4ec?auto=format&fit=crop&q=80",
    designer: "Rahul Mehta"
  },
  {
    id: 3,
    title: "Indo-Western Fusion",
    image: "https://images.unsplash.com/photo-1583391733912-8ee5e1e5f090?auto=format&fit=crop&q=80",
    designer: "Neha Singh"
  }
];

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
          </motion.div>
        ))}
      </div>
    </section>
  );
}