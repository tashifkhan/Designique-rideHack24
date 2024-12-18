"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Designer } from "@/lib/types";
import { DesignerStats } from "./DesignerStats";
import { DesignerProfile } from "./DesignerProfile";

interface DesignerDetailsModalProps {
  designer: Designer;
  open: boolean;
  onClose: () => void;
}

export function DesignerDetailsModal({ designer, open, onClose }: DesignerDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 text-white max-w-2xl">
        <DialogTitle className="sr-only">
          Designer Profile - {designer.name}
        </DialogTitle>
        
        <div className="relative h-64 -mt-6 -mx-6">
          <img
            src={designer.coverImage}
            alt={`${designer.name}'s Cover`}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
        
        <DesignerProfile designer={designer} />
        <DesignerStats designer={designer} />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Specialization</h3>
            <p className="text-gray-300">{designer.specialization}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <p className="text-gray-300">{designer.bio}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Follow Designer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}