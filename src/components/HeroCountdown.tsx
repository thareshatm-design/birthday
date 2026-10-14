import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Calendar, Gift, Music2 } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { fireCelebrationConfetti } from '../utils/confetti';

interface HeroCountdownProps {
  config: BirthdayConfig;
  onOpenCakeModal: () => void;
  onOpenPersonalizeModal: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
  totalSeconds: number;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({
  config,
  onOpenCakeModal,
  onOpenPersonalizeModal,
  isPlayingMusic,
  onToggleMusic,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
    totalSeconds: 0,
  });

  const [daysLoved, setDaysLoved] = useState<number>(0);

  useEffect(() => {
    // Calculate relationship days
    const anniversary = new Date(config.anniversaryDate).getTime();
    const now = Date.now();
    const diffDays = Math.max(0, Math.floor((now - anniversary) / (1000 * 60 * 60 * 24)));
    setDaysLoved(diffDays);

    const calculateTime = () => {
      const target = new Date(config.birthdayDate).getTime();
      const current = Date.now();
      const difference = target - current;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
          totalSeconds: 0,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isPassed: false,
          totalSeconds: Math.floor(difference / 1000),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [config.birthdayDate, config.anniversaryDate]);

  const handleCelebrate = () => {
    fireCelebrationConfetti();
    onOpenCakeModal();
  };

  return (
    <section id="countdown" className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-900/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Typographic Focus */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Quiet text kicker without pill */}
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-rose-300/80 mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>{config.customKicker}</span>
            <span aria-hidden="true">·</span>
            <span>Est. {new Date(config.anniversaryDate).getFullYear()}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-5 text-balance">
            Happy Birthday,{' '}
            <span className="italic font-normal bg-gradient-to-r from-rose-200 via-rose-100 to-amber-200 bg-clip-text text-transparent">
              {config.partnerName}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-rose-100/75 leading-relaxed font-sans max-w-xl mb-8">
            {config.customMessage}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCelebrate}
              className="px-6 py-3 text-sm font-medium text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-amber-100 rounded-xl shadow-lg shadow-rose-950/40 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-rose-800" />
              <span>{timeLeft.isPassed ? "Blow Birthday Candles" : "Celebrate Early & Make a Wish"}</span>
            </button>

            <button
              onClick={onToggleMusic}
              className={`px-5 py-3 text-sm font-medium rounded-xl border transition-all flex items-center gap-2 ${
                isPlayingMusic
                  ? 'border-rose-400/60 bg-rose-950/40 text-rose-200 shadow-sm'
                  : 'border-rose-900/40 hover:border-rose-700/60 bg-[#16121c] text-rose-200/90'
              }`}
            >
              <Music2 className={`w-4 h-4 ${isPlayingMusic ? 'text-rose-400 animate-pulse' : 'text-rose-400/70'}`} />
              <span>{isPlayingMusic ? 'Music Playing' : 'Play Romantic Music'}</span>
            </button>

            <a
              href="#album"
              className="px-5 py-3 text-sm font-medium text-rose-300 hover:text-white transition-colors"
            >
              View Our Story ↓
            </a>
          </div>
        </div>

        {/* Right Column: Live Countdown Vault Frame */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1c1624] to-[#14101b] border border-rose-900/30 shadow-2xl backdrop-blur-xl">
            {/* Header info */}
            <div className="flex items-center justify-between pb-5 border-b border-rose-950/60 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span className="text-xs uppercase tracking-wider font-medium text-rose-200/80">
                  {timeLeft.isPassed ? 'Birthday In Progress' : 'The Countdown to Your Day'}
                </span>
              </div>
              <button
                onClick={onOpenPersonalizeModal}
                className="text-xs text-rose-300 hover:text-rose-100 flex items-center gap-1 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Adjust Date</span>
              </button>
            </div>

            {/* Countdown Grid (4 Cards with tabular-nums) */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6">
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#231a2e]/70 border border-rose-900/25">
                <span className="font-serif text-2xl sm:text-4xl font-semibold text-rose-100 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-300/60 mt-1">Days</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#231a2e]/70 border border-rose-900/25">
                <span className="font-serif text-2xl sm:text-4xl font-semibold text-rose-100 tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-300/60 mt-1">Hours</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#231a2e]/70 border border-rose-900/25">
                <span className="font-serif text-2xl sm:text-4xl font-semibold text-rose-100 tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-rose-300/60 mt-1">Mins</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-[#231a2e]/70 border border-rose-900/25">
                <span className="font-serif text-2xl sm:text-4xl font-semibold text-amber-200 tabular-nums animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300/70 mt-1">Secs</span>
              </div>
            </div>

            {/* Birthday Status Banner */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-start gap-3">
              <Gift className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-200/80 leading-relaxed">
                {timeLeft.isPassed ? (
                  <p>
                    <strong className="text-rose-100 font-medium">The moment has arrived!</strong> Today is all about celebrating your beauty, your spirit, and everything you are.
                  </p>
                ) : (
                  <p>
                    Target: <span className="text-rose-100 font-medium">{new Date(config.birthdayDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>. Every ticking second brings us closer to your celebration!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width relationship milestone strip below the hero split (Mandatory Layout Rule 13) */}
      <div className="mt-12 pt-8 border-t border-rose-950/40 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-xs text-rose-300/60 uppercase tracking-wider mb-1">Time Loved</div>
          <div className="font-serif text-xl sm:text-2xl font-semibold text-white tabular-nums">
            {daysLoved.toLocaleString()} <span className="text-xs font-sans font-normal text-rose-300/70">days</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-rose-300/60 uppercase tracking-wider mb-1">Hours Cherished</div>
          <div className="font-serif text-xl sm:text-2xl font-semibold text-white tabular-nums">
            {(daysLoved * 24).toLocaleString()} <span className="text-xs font-sans font-normal text-rose-300/70">hours</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-rose-300/60 uppercase tracking-wider mb-1">Heartbeats Shared</div>
          <div className="font-serif text-xl sm:text-2xl font-semibold text-rose-200 tabular-nums">
            ~{(daysLoved * 24 * 60 * 75).toLocaleString()} <span className="text-xs font-sans font-normal text-rose-300/70">beats</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-rose-300/60 uppercase tracking-wider mb-1">Remaining to Infinity</div>
          <div className="font-serif text-xl sm:text-2xl font-semibold text-amber-200">
            Forever <span className="text-xs font-sans font-normal text-rose-300/70">& beyond</span>
          </div>
        </div>
      </div>
    </section>
  );
};
