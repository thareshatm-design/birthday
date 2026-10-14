import React, { useState } from 'react';
import { Plus, Heart, MapPin, Calendar, Sparkles, Trash2, Maximize2 } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { PhotoLightbox } from './PhotoLightbox';
import { AddPhotoModal } from './AddPhotoModal';

interface PhotoAlbumProps {
  photos: MemoryPhoto[];
  onAddPhoto: (photo: MemoryPhoto) => void;
  onToggleFavorite: (id: string) => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoAlbum: React.FC<PhotoAlbumProps> = ({
  photos,
  onAddPhoto,
  onToggleFavorite,
  onDeletePhoto,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Milestones', 'Dates', 'Little Things', 'Trips'];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="album" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/40">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-rose-300/80 mb-2">
            <span>Visual Love Story</span>
            <span aria-hidden="true">·</span>
            <span>{photos.length} Captured Moments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
            Our Shared Photo Album
          </h2>
          <p className="text-sm text-rose-200/70 mt-2 max-w-xl">
            A visual anthology of our favorite memories, spontaneous road trips, quiet living room mornings, and golden milestones.
          </p>
        </div>

        {/* Action Controls: Add Memory */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-white rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-rose-800" />
            <span>Add Photo Memory</span>
          </button>
        </div>
      </div>

      {/* Interactive Category Filter Tabs (Section 1.A DO) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#1a1422] rounded-xl border border-rose-900/30 max-w-fit mb-8 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === cat
                ? 'bg-rose-900/50 text-rose-100 shadow-sm'
                : 'text-rose-300/70 hover:text-rose-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bento Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => {
          const isLarge = index === 0 || index === 4;

          return (
            <div
              key={photo.id}
              className={`group relative rounded-2xl bg-[#17121d] border border-rose-900/30 hover:border-rose-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg ${
                isLarge ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Media Container with Fallback Mesh */}
              <div
                onClick={() => handleOpenLightbox(index)}
                className="relative w-full h-64 sm:h-72 cursor-pointer overflow-hidden bg-black/40"
              >
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* Romantic Stylized Graphic Container (Zero-Broken-Image Policy) */
                  <div className="w-full h-full bg-gradient-to-br from-[#241328] via-[#1b1021] to-[#361c28] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(225,29,72,0.18),transparent)]" />
                    <Heart className="w-10 h-10 text-rose-400/50 fill-rose-400/10 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="font-serif text-lg font-medium text-rose-100/90 max-w-xs">
                      {photo.title}
                    </span>
                    <span className="text-xs text-rose-300/60 mt-1 max-w-xs line-clamp-1">
                      {photo.location}
                    </span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs text-rose-200 font-medium flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to view full memory</span>
                  </span>
                </div>

                {/* Top action bar on photo */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(photo.id);
                    }}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm text-rose-300 transition-colors"
                    title="Toggle Favorite"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        photo.isFavorite ? 'fill-rose-400 text-rose-400' : ''
                      }`}
                    />
                  </button>

                  {photo.id.startsWith('photo-') && photo.id.length > 10 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this memory photo?')) {
                          onDeletePhoto(photo.id);
                        }
                      }}
                      className="p-2 rounded-full bg-black/50 hover:bg-rose-950/80 backdrop-blur-sm text-rose-300/80 hover:text-rose-200 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Memory Information Block */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Clean unboxed metadata with separators (Rule 1.A) */}
                  <div className="flex items-center gap-2 text-xs text-rose-300/65 mb-2">
                    <span>{photo.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-400/80" />
                      <span>{photo.date}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => handleOpenLightbox(index)}
                    className="font-serif text-lg font-medium text-rose-100 hover:text-white transition-colors cursor-pointer mb-2"
                  >
                    {photo.title}
                  </h3>

                  <p className="text-xs text-rose-200/70 leading-relaxed line-clamp-2">
                    {photo.caption}
                  </p>
                </div>

                {photo.location && (
                  <div className="mt-4 pt-3 border-t border-rose-950/40 flex items-center justify-between text-xs text-rose-300/70">
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </span>
                    <span className="text-[11px] font-serif italic text-rose-200/60 shrink-0">
                      Forever Love
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null}
        onClose={handleCloseLightbox}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onToggleFavorite={onToggleFavorite}
      />

      {/* Add Photo Modal */}
      <AddPhotoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPhoto={onAddPhoto}
      />
    </section>
  );
};
