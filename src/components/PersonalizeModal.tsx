import React, { useState } from 'react';
import { X, Sparkles, Heart, Save, Calendar, User } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (newConfig: BirthdayConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [partnerName, setPartnerName] = useState(config.partnerName);
  const [senderName, setSenderName] = useState(config.senderName);
  const [birthdayDate, setBirthdayDate] = useState(config.birthdayDate);
  const [anniversaryDate, setAnniversaryDate] = useState(config.anniversaryDate);
  const [customMessage, setCustomMessage] = useState(config.customMessage);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      ...config,
      partnerName: partnerName.trim() || 'My Love',
      senderName: senderName.trim() || 'Forever Yours',
      birthdayDate,
      anniversaryDate,
      customMessage: customMessage.trim() || config.customMessage,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#18121f] border border-rose-900/40 rounded-2xl p-6 sm:p-7 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-rose-300 hover:text-white rounded-lg hover:bg-rose-950/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium uppercase tracking-wider mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Personalize Celebration</span>
          </div>
          <h2 className="font-serif text-2xl font-semibold text-rose-100">
            Tailor This Site For Your Love
          </h2>
          <p className="text-xs text-rose-200/70 mt-1">
            Update names, birthday countdown date, and anniversary to personalize the experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                Partner's Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Elena"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
                Your Name / Signature *
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Lucas"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 placeholder:text-rose-300/40 focus:outline-none focus:border-rose-500/70"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Birthday Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={birthdayDate}
              onChange={(e) => setBirthdayDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 focus:outline-none focus:border-rose-500/70"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Anniversary Date (When you fell in love / started dating)
            </label>
            <input
              type="date"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#201828] border border-rose-900/40 text-sm text-rose-100 focus:outline-none focus:border-rose-500/70"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-rose-200/90 mb-1.5">
              Birthday Hero Message
            </label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Write a sweet message to appear in the hero section..."
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
              className="px-5 py-2.5 text-xs font-semibold text-rose-950 bg-gradient-to-r from-rose-200 to-amber-200 hover:from-rose-100 hover:to-white rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-rose-800" />
              <span>Save Personalization</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
