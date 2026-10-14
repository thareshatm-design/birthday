import React from 'react';
import { Heart, Sparkles, SlidersHorizontal } from 'lucide-react';

interface FooterProps {
  partnerName: string;
  senderName: string;
  onOpenCakeModal: () => void;
  onOpenPersonalizeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  partnerName,
  senderName,
  onOpenCakeModal,
  onOpenPersonalizeModal,
}) => {
  return (
    <footer className="mt-20 border-t border-rose-950/40 bg-[#0c0a0f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-serif text-lg font-semibold text-rose-100 flex items-center gap-2">
            <span>Forever Yours</span>
            <span className="text-xs font-sans text-rose-400/80 font-normal">
              · A Birthday Dedication for {partnerName}
            </span>
          </span>
          <p className="text-xs text-rose-300/60 mt-1">
            Handcrafted with endless devotion by {senderName}. May this year bring you as much joy as you give to the world.
          </p>
        </div>

        {/* Quick Footer Links / Actions */}
        <div className="flex items-center gap-4 text-xs font-medium text-rose-300/80">
          <button
            onClick={onOpenCakeModal}
            className="hover:text-rose-100 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Make a Birthday Wish</span>
          </button>
          <span aria-hidden="true" className="text-rose-900">·</span>
          <button
            onClick={onOpenPersonalizeModal}
            className="hover:text-rose-100 transition-colors flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
            <span>Personalize</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
