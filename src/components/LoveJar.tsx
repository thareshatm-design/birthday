import React, { useState } from 'react';
import { Heart, Sparkles, Plus, Shuffle, Check } from 'lucide-react';
import { REASONS_WHY } from '../data/defaultData';
import { fireCelebrationConfetti } from '../utils/confetti';

interface LoveJarProps {
  partnerName: string;
}

export const LoveJar: React.FC<LoveJarProps> = ({ partnerName }) => {
  const [reasons, setReasons] = useState<string[]>(() => {
    const saved = localStorage.getItem('love_reasons');
    return saved ? JSON.parse(saved) : REASONS_WHY;
  });

  const [currentReasonIndex, setCurrentReasonIndex] = useState<number>(0);
  const [hasDrawn, setHasDrawn] = useState<boolean>(true);
  const [isAddingReason, setIsAddingReason] = useState<boolean>(false);
  const [newReasonText, setNewReasonText] = useState<string>('');

  const drawRandomReason = () => {
    let nextIndex = Math.floor(Math.random() * reasons.length);
    if (nextIndex === currentReasonIndex && reasons.length > 1) {
      nextIndex = (nextIndex + 1) % reasons.length;
    }
    setCurrentReasonIndex(nextIndex);
    setHasDrawn(true);
    fireCelebrationConfetti();
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;

    const updated = [newReasonText.trim(), ...reasons];
    setReasons(updated);
    localStorage.setItem('love_reasons', JSON.stringify(updated));
    setCurrentReasonIndex(0);
    setNewReasonText('');
    setIsAddingReason(false);
    fireCelebrationConfetti();
  };

  return (
    <section id="reasons" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Jar Visual & Drawing Trigger */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-64 h-80 rounded-3xl bg-gradient-to-b from-white/10 via-rose-900/10 to-rose-950/30 border-2 border-rose-400/30 backdrop-blur-md shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden">
            {/* Cork Lid */}
            <div className="w-32 h-6 -mt-8 bg-amber-800/80 rounded-t-lg border-b border-amber-950 shadow-inner" />
            <div className="w-24 h-3 bg-amber-700/60 rounded-full shadow-sm" />

            {/* Glowing Hearts inside the jar */}
            <div className="relative w-full h-44 flex items-center justify-center">
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 p-3 opacity-80">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="animate-float-slow"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        i % 2 === 0
                          ? 'fill-rose-400 text-rose-400'
                          : 'fill-amber-300 text-amber-300'
                      } opacity-75`}
                    />
                  </span>
                ))}
              </div>

              {/* Center Heart Emblem */}
              <div className="z-10 p-3 rounded-full bg-rose-950/80 border border-rose-500/50 shadow-lg text-center">
                <Heart className="w-8 h-8 fill-rose-500 text-rose-300 mx-auto" />
                <span className="text-[10px] font-mono uppercase text-rose-200 mt-1 block">
                  {reasons.length} Reasons
                </span>
              </div>
            </div>

            {/* Jar Label */}
            <div className="w-full py-2 px-3 rounded-xl bg-amber-100/90 text-amber-950 text-center shadow-md">
              <span className="font-serif text-xs font-semibold tracking-wider uppercase block">
                The Love Jar
              </span>
              <span className="text-[10px] text-amber-900/80">
                For {partnerName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={drawRandomReason}
              className="px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-white rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-rose-800" />
              <span>Pull Another Reason</span>
            </button>

            <button
              onClick={() => setIsAddingReason(!isAddingReason)}
              className="p-2.5 text-rose-300 hover:text-white bg-rose-950/40 border border-rose-900/40 rounded-xl transition-colors"
              title="Add a custom reason"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: The Unfolded Love Scroll */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-rose-300/80 mb-2">
            <span>Special Birthday Collection</span>
            <span aria-hidden="true">·</span>
            <span>Reason #{currentReasonIndex + 1} of {reasons.length}</span>
          </div>

          <h2 className="font-serif text-3xl font-medium tracking-tight text-white mb-6">
            Why You Are My World
          </h2>

          {/* Unfolded Parchment Scroll */}
          <div className="relative p-6 sm:p-8 rounded-2xl bg-[#1c1524] border border-rose-800/40 shadow-xl overflow-hidden min-h-[180px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs text-rose-400 font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>One of the endless reasons I adore you</span>
              </div>

              <blockquote className="font-serif text-lg sm:text-xl text-rose-100/95 leading-relaxed italic">
                "{reasons[currentReasonIndex]}"
              </blockquote>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-950/50 flex items-center justify-between text-xs text-rose-300/60 font-sans">
              <span>Whispered with all my love</span>
              <span className="font-serif italic text-rose-200">Happy Birthday, my soulmate</span>
            </div>
          </div>

          {/* Optional inline "Add Reason" form */}
          {isAddingReason && (
            <form onSubmit={handleAddReason} className="mt-5 p-4 rounded-xl bg-[#201828] border border-rose-900/40">
              <label className="block text-xs font-medium text-rose-200 mb-1.5">
                Add another sweet reason why you love {partnerName}:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newReasonText}
                  onChange={(e) => setNewReasonText(e.target.value)}
                  placeholder="e.g. The way you make me feel safe no matter what..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[#18121f] border border-rose-900/40 text-xs text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-rose-950 bg-rose-200 hover:bg-white rounded-lg transition-colors shrink-0"
                >
                  Drop into Jar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
