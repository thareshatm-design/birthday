import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, MapPin, Calendar } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface PhotoLightboxProps {
  photo: MemoryPhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleFavorite: (id: string) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  onToggleFavorite,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      {/* Top action controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-10">
        <button
          onClick={() => onToggleFavorite(photo.id)}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-300 transition-colors"
          title="Favorite"
        >
          <Heart className={`w-5 h-5 ${photo.isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
        </button>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={onPrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors border border-white/10 z-10"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors border border-white/10 z-10"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Polaroid & Story Container */}
      <div className="relative max-w-4xl w-full bg-[#18121f] rounded-2xl border border-rose-900/30 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Left: Image Canvas */}
        <div className="md:w-3/5 bg-black/50 flex items-center justify-center min-h-[300px] md:min-h-[480px] p-4">
          {photo.imageUrl ? (
            <img
              src={photo.imageUrl}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="max-h-[60vh] md:max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
            />
          ) : (
            /* Styled Romantic Gradient Mesh Graphic */
            <div className="w-full h-full min-h-[300px] rounded-xl bg-gradient-to-br from-rose-950 via-[#26152a] to-amber-950 flex flex-col items-center justify-center p-8 text-center border border-rose-800/30">
              <Heart className="w-16 h-16 text-rose-400/40 fill-rose-400/10 mb-4 animate-pulse" />
              <h3 className="font-serif text-xl font-medium text-rose-100 mb-2">{photo.title}</h3>
              <p className="text-xs text-rose-300/70 max-w-xs">{photo.caption}</p>
            </div>
          )}
        </div>

        {/* Right: Romantic Metadata & Note */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Metadata unboxed text */}
            <div className="flex items-center gap-2 text-xs text-rose-300/70 mb-3">
              <span>{photo.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-rose-400" />
                <span>{photo.date}</span>
              </span>
            </div>

            <h2 className="font-serif text-2xl font-semibold text-rose-100 mb-3">
              {photo.title}
            </h2>

            {photo.location && (
              <div className="flex items-center gap-1.5 text-xs text-rose-300/90 mb-5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{photo.location}</span>
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#231a2b] border border-rose-900/40 mb-6">
              <p className="text-xs uppercase font-medium tracking-wider text-rose-400/80 mb-1.5">
                Memory Note
              </p>
              <p className="text-sm font-serif italic text-rose-100/90 leading-relaxed">
                "{photo.note || photo.caption}"
              </p>
            </div>

            <p className="text-xs text-rose-200/70 leading-relaxed">
              {photo.caption}
            </p>
          </div>

          <div className="pt-6 border-t border-rose-950/60 mt-6 flex items-center justify-between text-xs text-rose-300/50">
            <span>Our Shared Moments</span>
            <span>Use ← → keys to browse</span>
          </div>
        </div>
      </div>
    </div>
  );
};
