"use client";

import DesignerCard from "./DesignerCard";
import { designers } from "@/lib/data/designers";

export default function TopDesigners() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8">Top Designers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designers.map((designer) => (
          <DesignerCard key={designer.id} designer={designer} />
        ))}
      </div>
    </section>
  );
}