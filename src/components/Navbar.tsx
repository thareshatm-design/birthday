import React from 'react';
import { Cake, SlidersHorizontal } from 'lucide-react';

interface NavbarProps {
  partnerName: string;
  onOpenCakeModal: () => void;
  onOpenPersonalizeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  partnerName,
  onOpenCakeModal,
  onOpenPersonalizeModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f0d13]/85 border-b border-rose-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in editorial serif) */}
        <a
          href="#"
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-rose-100 hover:text-rose-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>Forever Yours</span>
          <span className="text-xs text-rose-400 font-sans font-normal opacity-70">· For {partnerName}</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-rose-200/70">
          <a
            href="#countdown"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Countdown
          </a>
          <a
            href="#album"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Photo Memories
          </a>
          <a
            href="#letters"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Love Letters
          </a>
          <a
            href="#reasons"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Reasons Jar
          </a>
          <a
            href="#wishes"
            className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0"
          >
            Cake & Wishes
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + quick settings */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenPersonalizeModal}
            className="p-2 text-rose-300/80 hover:text-rose-100 hover:bg-rose-950/40 rounded-lg transition-colors"
            title="Personalize Names & Birthday Date"
            aria-label="Personalize settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          
          <button
            onClick={onOpenCakeModal}
            className="px-4 py-2 text-xs font-medium text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-amber-100 rounded-lg shadow-sm shadow-rose-950/50 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95"
          >
            <Cake className="w-3.5 h-3.5 text-rose-800" />
            <span>Blow Candles</span>
          </button>
        </div>
      </div>
    </header>
  );
};
