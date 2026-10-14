import React, { useState } from 'react';
import { Mail, Feather, Heart, X, Plus, Sparkles, Send } from 'lucide-react';
import { LoveLetter } from '../types';

interface LoveLettersProps {
  letters: LoveLetter[];
  onAddLetter: (letter: LoveLetter) => void;
  partnerName: string;
}

export const LoveLetters: React.FC<LoveLettersProps> = ({
  letters,
  onAddLetter,
  partnerName,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState<boolean>(false);

  // New letter form state
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [theme, setTheme] = useState<'rose' | 'velvet' | 'parchment' | 'starlight'>('rose');

  const handleCreateLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newLetter: LoveLetter = {
      id: `letter-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A personal birthday note',
      content: content.trim(),
      author: author.trim() || 'Forever Yours',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      theme,
    };

    onAddLetter(newLetter);
    setIsComposeOpen(false);
    setTitle('');
    setSubtitle('');
    setContent('');
    setAuthor('');
  };

  const getThemeClasses = (t: string) => {
    switch (t) {
      case 'velvet':
        return 'from-[#1e1328] via-[#241731] to-[#150d1d] border-purple-900/40 text-purple-200';
      case 'parchment':
        return 'from-[#2b211a] via-[#33251c] to-[#201813] border-amber-900/40 text-amber-200';
      case 'starlight':
        return 'from-[#131b2c] via-[#172238] to-[#0d1421] border-blue-900/40 text-sky-200';
      case 'rose':
      default:
        return 'from-[#26131c] via-[#311824] to-[#1a0c13] border-rose-900/40 text-rose-200';
    }
  };

  return (
    <section id="letters" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/40">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-rose-300/80 mb-2">
            <span>Intimate Vault</span>
            <span aria-hidden="true">·</span>
            <span>{letters.length} Love Letters</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
            Custom Birthday Messages
          </h2>
          <p className="text-sm text-rose-200/70 mt-2 max-w-xl">
            Words penned straight from the heart. Unfold each envelope to read romantic dedications, memories, and birthday vows.
          </p>
        </div>

        {/* Compose Button */}
        <button
          onClick={() => setIsComposeOpen(true)}
          className="px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-white rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 shrink-0 cursor-pointer"
        >
          <Feather className="w-4 h-4 text-rose-800" />
          <span>Write a Love Letter</span>
        </button>
      </div>

      {/* Envelope Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {letters.map((letter) => {
          return (
            <div
              key={letter.id}
              onClick={() => setSelectedLetter(letter)}
              className="group relative rounded-2xl p-6 sm:p-7 bg-[#17121d] border border-rose-900/35 hover:border-rose-400/50 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Wax Seal / Envelope Stamp */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-900 to-rose-950 border border-rose-700/60 shadow-md flex items-center justify-center text-rose-300 group-hover:scale-110 transition-transform">
                    <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  </div>
                  <span className="text-[11px] font-mono text-rose-300/60">
                    {letter.date}
                  </span>
                </div>

                <div className="text-xs text-rose-400 font-medium tracking-wider uppercase mb-1">
                  {letter.subtitle}
                </div>

                <h3 className="font-serif text-xl font-medium text-rose-100 group-hover:text-white transition-colors mb-3">
                  {letter.title}
                </h3>

                <p className="text-xs text-rose-200/65 line-clamp-3 leading-relaxed font-sans">
                  {letter.content}
                </p>
              </div>

              {/* Envelope Bottom Seal */}
              <div className="mt-6 pt-4 border-t border-rose-950/60 flex items-center justify-between">
                <span className="text-xs font-serif italic text-rose-300/80">
                  {letter.author}
                </span>
                <span className="text-xs text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                  <span>Open Letter</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reading Letter Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div
            className={`relative w-full max-w-2xl bg-gradient-to-b ${getThemeClasses(
              selectedLetter.theme
            )} border rounded-2xl p-6 sm:p-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto`}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-5 right-5 p-2 text-rose-300 hover:text-white rounded-lg hover:bg-black/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="text-center pb-6 border-b border-rose-900/30 mb-8">
              <span className="text-xs tracking-widest uppercase font-medium text-rose-300/70">
                {selectedLetter.subtitle}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-rose-100 mt-2">
                {selectedLetter.title}
              </h2>
              <div className="text-xs text-rose-300/60 mt-1 font-sans">
                {selectedLetter.date}
              </div>
            </div>

            {/* Letter Prose with Rich Typography */}
            <div className="font-serif text-sm sm:text-base text-rose-100/90 leading-relaxed whitespace-pre-line space-y-4 max-w-prose mx-auto">
              {selectedLetter.content}
            </div>

            {/* Sign-off */}
            <div className="mt-10 pt-6 border-t border-rose-900/30 text-right">
              <div className="text-xs uppercase tracking-wider text-rose-300/60">
                Forever & Always,
              </div>
              <div className="font-serif italic text-lg sm:text-xl text-rose-100 mt-1">
                {selectedLetter.author}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compose Letter Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#18121f] border border-rose-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setIsComposeOpen(false)}
              className="absolute top-5 right-5 p-2 text-rose-300 hover:text-white rounded-lg hover:bg-rose-950/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium uppercase tracking-wider mb-1">
                <Feather className="w-3.5 h-3.5 text-rose-400" />
                <span>Custom Message</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-rose-100">
                Write a Birthday Love Note
              </h2>
              <p className="text-xs text-rose-200/70 mt-1">
                Pen a private birthday dedication for {partnerName}. It will be sealed in the love vault.
              </p>
            </div>

            <form onSubmit={handleCreateLetter} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                  Letter Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Why This Birthday is So Special"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                    Subtitle / Kicker
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Sealed with all my love"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                    Stationery Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 focus:outline-none focus:border-rose-500/70"
                  >
                    <option value="rose">Rose Noir</option>
                    <option value="velvet">Velvet Midnight</option>
                    <option value="parchment">Vintage Parchment</option>
                    <option value="starlight">Starlight Blue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                  Your Message / Letter Body *
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="My darling, today I want you to remember just how deeply you are adored..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70 resize-none font-serif leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                  Signature / From
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Yours Always, [Your Name]"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-rose-950/60">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-rose-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-white rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-rose-800" />
                  <span>Seal Letter into Vault</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
