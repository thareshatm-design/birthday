import React, { useState } from 'react';
import { X, Sparkles, Heart, Flame, Gift, Check, RotateCcw } from 'lucide-react';
import { BIRTHDAY_VOUCHERS } from '../data/defaultData';
import { fireCelebrationConfetti, fireHeartShower } from '../utils/confetti';
import { audioEngine } from '../utils/audioEngine';

interface BirthdayCakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
}

export const BirthdayCakeModal: React.FC<BirthdayCakeModalProps> = ({
  isOpen,
  onClose,
  partnerName,
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [redeemedVouchers, setRedeemedVouchers] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setWishMade(true);
    fireCelebrationConfetti();
    setTimeout(() => fireHeartShower(), 400);

    // Switch to Birthday Serenade track
    audioEngine.setTrackIndex(3); // Birthday Serenade
    audioEngine.play();
  };

  const handleRelight = () => {
    setCandlesLit(true);
  };

  const toggleRedeem = (id: string) => {
    setRedeemedVouchers(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
    fireCelebrationConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#16121c] border border-rose-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-rose-300 hover:text-white rounded-lg hover:bg-rose-950/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-xs tracking-widest uppercase font-medium text-rose-300/80">
            Intimate Birthday Ceremony
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-rose-100 mt-1">
            Make A Birthday Wish, {partnerName}
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
            {candlesLit
              ? 'Close your eyes, think of your deepest wish for the coming year, and blow out your candles.'
              : 'Your wish has been whispered to the universe! May every dream come true.'}
          </p>
        </div>

        {/* The Birthday Cake Visual */}
        <div className="relative flex flex-col items-center justify-center py-6 mb-6">
          {/* Ambient Flame Glow */}
          {candlesLit && (
            <div className="absolute top-4 w-48 h-32 bg-amber-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
          )}

          {/* 3 Candles */}
          <div className="flex items-end justify-center gap-6 z-10 -mb-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <div
                  className={`transition-all duration-700 ${
                    candlesLit ? 'opacity-100 scale-100 animate-flicker' : 'opacity-0 scale-50'
                  }`}
                >
                  <div className="w-4 h-6 rounded-full bg-gradient-to-t from-rose-500 via-amber-400 to-yellow-100 shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                </div>
                {/* Wick */}
                <div className="w-0.5 h-2 bg-neutral-700" />
                {/* Candle Stick */}
                <div className="w-3.5 h-12 bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 rounded-t-sm shadow-inner border border-rose-300/40" />
              </div>
            ))}
          </div>

          {/* Cake Tier 1 (Top) */}
          <div className="w-36 h-10 bg-gradient-to-r from-[#2c1d33] via-[#3d2747] to-[#2c1d33] rounded-t-lg border border-rose-800/40 relative shadow-md">
            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-rose-200 to-amber-100 rounded-b-md shadow-sm" />
            <div className="absolute bottom-1.5 inset-x-0 flex justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            </div>
          </div>

          {/* Cake Tier 2 (Middle) */}
          <div className="w-52 h-12 bg-gradient-to-r from-[#24172b] via-[#341f3e] to-[#24172b] border-x border-t border-rose-800/40 relative shadow-md">
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-rose-300 to-rose-200 rounded-b-md shadow-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-4 h-4 text-rose-400/80 fill-rose-400/30" />
            </div>
          </div>

          {/* Cake Tier 3 (Base) */}
          <div className="w-68 h-14 bg-gradient-to-r from-[#1e1324] via-[#2d1b36] to-[#1e1324] rounded-b-xl border border-rose-800/40 relative shadow-lg">
            <div className="absolute top-0 inset-x-0 h-3.5 bg-gradient-to-r from-amber-100 via-rose-200 to-amber-100 rounded-b-md shadow-sm" />
            <div className="absolute inset-0 flex items-center justify-around px-8">
              <span className="text-[10px] uppercase font-serif tracking-widest text-amber-200/90">
                Happy Birthday {partnerName}
              </span>
            </div>
          </div>

          {/* Cake Plate Stand */}
          <div className="w-80 h-3 bg-gradient-to-r from-amber-200/60 via-rose-200/80 to-amber-200/60 rounded-full shadow-lg mt-1" />
        </div>

        {/* Action Button: Blow Candles */}
        <div className="flex justify-center gap-3 mb-8">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              className="px-6 py-3 text-sm font-semibold text-rose-950 bg-gradient-to-r from-rose-200 via-amber-200 to-rose-100 hover:from-rose-100 hover:to-white rounded-xl shadow-lg shadow-rose-950/60 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Blow Out the Candles 💨</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleRelight}
                className="px-4 py-2.5 text-xs font-medium text-rose-300 hover:text-white bg-rose-950/40 border border-rose-800/50 rounded-xl transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Relight Candles</span>
              </button>
              <button
                onClick={() => {
                  fireCelebrationConfetti();
                  fireHeartShower();
                }}
                className="px-5 py-2.5 text-xs font-medium text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>More Fireworks!</span>
              </button>
            </div>
          )}
        </div>

        {/* Birthday Love Vouchers Unlock */}
        <div className="border-t border-rose-900/40 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-400" />
              <h3 className="font-serif text-lg font-medium text-rose-100">
                Birthday Love Vouchers
              </h3>
            </div>
            <span className="text-xs text-rose-300/70">
              {wishMade ? 'Unlocked & Valid Forever' : 'Blow candles to unlock'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BIRTHDAY_VOUCHERS.map((voucher) => {
              const isRedeemed = redeemedVouchers[voucher.id];
              return (
                <div
                  key={voucher.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isRedeemed
                      ? 'bg-rose-950/20 border-rose-900/30 opacity-75'
                      : 'bg-[#201828] border-rose-900/40 hover:border-rose-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-rose-100">{voucher.title}</h4>
                    <span className="text-[10px] text-rose-300/80 font-mono">
                      {voucher.badge}
                    </span>
                  </div>
                  <p className="text-xs text-rose-200/70 mb-3">{voucher.description}</p>
                  <button
                    onClick={() => toggleRedeem(voucher.id)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      isRedeemed
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                        : 'bg-rose-900/30 hover:bg-rose-900/60 text-rose-200 border border-rose-800/50'
                    }`}
                  >
                    {isRedeemed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Redeemed With Love!</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>Redeem With a Kiss</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
