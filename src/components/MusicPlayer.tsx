import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music2,
  Upload,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { audioEngine, PROCEDURAL_TRACKS } from '../utils/audioEngine';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const [currentTrack, setCurrentTrack] = useState(audioEngine.getCurrentTrack());
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progressSec, setProgressSec] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showTrackSelect, setShowTrackSelect] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    audioEngine.setOnTimeUpdate((sec) => {
      setProgressSec(sec);
    });

    // Check current track update
    const interval = setInterval(() => {
      setCurrentTrack(audioEngine.getCurrentTrack());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    audioEngine.nextTrack();
    setCurrentTrack(audioEngine.getCurrentTrack());
    setProgressSec(0);
  };

  const handlePrev = () => {
    audioEngine.prevTrack();
    setCurrentTrack(audioEngine.getCurrentTrack());
    setProgressSec(0);
  };

  const handleSelectTrack = (idx: number) => {
    audioEngine.setTrackIndex(idx);
    setCurrentTrack(audioEngine.getCurrentTrack());
    setShowTrackSelect(false);
    setProgressSec(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioEngine.setVolume(volume || 0.65);
      setIsMuted(false);
    } else {
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      audioEngine.loadCustomAudioFile(file);
      onTogglePlay();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside
      aria-label="Background Music Player"
      className="fixed bottom-4 right-4 sm:right-6 z-40 max-w-md w-[calc(100vw-2rem)] sm:w-96 transition-all duration-300"
    >
      <div className="bg-[#18121f]/95 border border-rose-900/50 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
        {/* Top Header of the Player */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Animated Equalizer bars */}
            <div className="flex items-end gap-0.5 h-4 shrink-0">
              {[0.4, 0.9, 0.6, 1.0, 0.7].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 bg-rose-400 rounded-full transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(25, h * 100)}%` : '30%',
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>

            <div className="min-w-0">
              <div className="text-xs font-semibold text-rose-100 truncate">
                {currentTrack.title}
              </div>
              <div className="text-[10px] text-rose-300/70 truncate">
                {currentTrack.composer}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowTrackSelect(!showTrackSelect)}
              className="px-2 py-1 text-[11px] font-medium text-rose-300 hover:text-white rounded-lg bg-rose-950/40 border border-rose-900/40 transition-colors"
              title="Select Track"
            >
              Tracks
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-rose-400 hover:text-rose-200 transition-colors"
              title={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Track Selector Dropdown */}
        {showTrackSelect && (
          <div className="my-2 p-2 rounded-xl bg-[#201828] border border-rose-900/40 space-y-1">
            <div className="text-[10px] font-medium uppercase tracking-wider text-rose-400 px-2 py-1">
              Romantic Melodies
            </div>
            {PROCEDURAL_TRACKS.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(idx)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  currentTrack.id === track.id
                    ? 'bg-rose-900/50 text-white font-medium'
                    : 'text-rose-200/80 hover:bg-rose-950/40'
                }`}
              >
                <span className="truncate">{track.title}</span>
                <span className="text-[10px] text-rose-400 font-mono shrink-0 ml-2">
                  {track.mood.split('·')[0]}
                </span>
              </button>
            ))}

            {/* Custom file upload */}
            <div className="pt-2 border-t border-rose-950/60 mt-1">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-300 hover:text-white hover:bg-rose-950/40 flex items-center gap-2"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload "Our Special Song" (MP3)</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleCustomAudioUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isExpanded && (
          <>
            <div className="my-2">
              <div className="w-full bg-rose-950/60 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-amber-300 h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (progressSec / currentTrack.durationSeconds) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-rose-300/60 font-mono mt-1">
                <span>{formatTime(progressSec)}</span>
                <span>{formatTime(currentTrack.durationSeconds)}</span>
              </div>
            </div>

            {/* Playback Controls & Volume */}
            <div className="flex items-center justify-between gap-3 pt-1">
              {/* Playback buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-950/40 transition-colors"
                  title="Previous Track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={onTogglePlay}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-white text-rose-950 shadow-md transition-all active:scale-95"
                  title={isPlaying ? 'Pause' : 'Play Romantic Music'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-rose-950" />
                  ) : (
                    <Play className="w-4 h-4 fill-rose-950 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-950/40 transition-colors"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 flex-1 max-w-[120px]">
                <button
                  onClick={toggleMute}
                  className="p-1 text-rose-400 hover:text-rose-200"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-rose-950 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
