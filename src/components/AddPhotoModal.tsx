import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Heart } from 'lucide-react';
import { MemoryPhoto } from '../types';

interface AddPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photo: MemoryPhoto) => void;
}

export const AddPhotoModal: React.FC<AddPhotoModalProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
}) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'Milestones' | 'Dates' | 'Little Things' | 'Trips'>('Dates');
  const [note, setNote] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPhoto: MemoryPhoto = {
      id: `photo-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim() || 'A cherished memory together.',
      date: date.trim() || 'Recent Memory',
      location: location.trim() || 'Everywhere with you',
      imageUrl: previewUrl,
      category,
      isFavorite: true,
      aspect: 'landscape',
      note: note.trim() || caption.trim(),
    };

    onAddPhoto(newPhoto);
    onClose();

    // Reset form
    setTitle('');
    setCaption('');
    setLocation('');
    setNote('');
    setPreviewUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#18121f] border border-rose-900/40 rounded-2xl p-6 sm:p-7 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-rose-300 hover:text-white rounded-lg hover:bg-rose-950/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Shared Memory</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-rose-100">
            Add a Cherished Photo
          </h2>
          <p className="text-xs text-rose-200/70 mt-1">
            Upload a snapshot from your phone or camera to add to our shared birthday album.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Memory Photo
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-rose-900/50 hover:border-rose-500/60 rounded-xl p-4 text-center cursor-pointer bg-[#201828] hover:bg-[#251b2f] transition-all flex flex-col items-center justify-center min-h-[140px]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {previewUrl ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium text-white bg-black/60 px-3 py-1.5 rounded-lg">
                      Change Photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-rose-950/60 text-rose-300 mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-rose-200">
                    Click or drag photo here
                  </span>
                  <span className="text-[11px] text-rose-300/60 mt-0.5">
                    JPG, PNG, WebP supported
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Memory Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Our First Trip to the Coast"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 focus:outline-none focus:border-rose-500/70"
              >
                <option value="Dates">Dates & Evenings</option>
                <option value="Trips">Trips & Getaways</option>
                <option value="Milestones">Milestones</option>
                <option value="Little Things">Everyday Moments</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                Date / Time
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. October 14, 2025"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Venice Beach, CA"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
            />
          </div>

          {/* Caption & Secret Note */}
          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Heartfelt Note / What made this moment unforgettable
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a sweet note about why you love this memory..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-950/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-rose-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-amber-100 rounded-xl transition-all shadow-md active:scale-95"
            >
              Save Memory to Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
