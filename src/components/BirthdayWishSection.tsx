import React, { useState } from 'react';
import { Cake, Sparkles, Heart, Lock, Check } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

interface BirthdayWishSectionProps {
  partnerName: string;
  onOpenCakeModal: () => void;
}

export const BirthdayWishSection: React.FC<BirthdayWishSectionProps> = ({
  partnerName,
  onOpenCakeModal,
}) => {
  const [wishText, setWishText] = useState<string>('');
  const [isWishSaved, setIsWishSaved] = useState<boolean>(() => {
    return !!localStorage.getItem('saved_birthday_wish');
  });

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    localStorage.setItem('saved_birthday_wish', wishText.trim());
    setIsWishSaved(true);
    fireCelebrationConfetti();
  };

  return (
    <section id="wishes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/40">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#201529] via-[#1a1122] to-[#251522] border border-rose-900/40 p-8 sm:p-12 overflow-hidden shadow-2xl text-center">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-rose-300/80 mb-3">
            <Cake className="w-4 h-4 text-amber-300" />
            <span>Grand Birthday Finale</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
            A Wish for You, {partnerName}
          </h2>

          <p className="text-sm sm:text-base text-rose-200/75 leading-relaxed mb-8">
            May this new trip around the sun bring you laughter that makes your stomach hurt, adventures that leave you in awe, and love that surrounds you every waking moment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={onOpenCakeModal}
              className="px-6 py-3.5 text-sm font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-amber-200 to-rose-100 hover:from-white hover:to-amber-100 rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Cake className="w-4 h-4 text-rose-800" />
              <span>Blow Birthday Cake Candles & Get Vouchers</span>
            </button>
          </div>

          {/* Secret Wish Time Capsule Box */}
          <div className="p-6 rounded-2xl bg-[#140e1b]/80 border border-rose-900/30 text-left max-w-xl mx-auto backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-amber-300/90" />
              <h3 className="font-serif text-base font-semibold text-rose-100">
                Secret Birthday Wish Capsule
              </h3>
            </div>
            <p className="text-xs text-rose-300/70 mb-4">
              Write your secret personal wish for this year. It will be encrypted into your browser time capsule, kept safe between us.
            </p>

            {isWishSaved ? (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-center">
                <Check className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-xs font-medium text-rose-100">
                  Your birthday wish is safely sealed in the time capsule!
                </p>
                <button
                  onClick={() => setIsWishSaved(false)}
                  className="text-[11px] text-rose-300 hover:text-white underline mt-2 inline-block"
                >
                  Edit or add another wish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveWish} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="In this new year of life, I wish for..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1524] border border-rose-900/40 text-xs sm:text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-400 resize-none font-serif"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-white hover:to-amber-100 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-800" />
                  <span>Seal Wish into Time Capsule</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
