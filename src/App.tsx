/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BirthdayConfig, LoveLetter, MemoryPhoto } from './types';
import {
  DEFAULT_BIRTHDAY_CONFIG,
  INITIAL_LETTERS,
  INITIAL_PHOTOS,
} from './data/defaultData';
import { audioEngine } from './utils/audioEngine';
import { Navbar } from './components/Navbar';
import { HeroCountdown } from './components/HeroCountdown';
import { PhotoAlbum } from './components/PhotoAlbum';
import { LoveLetters } from './components/LoveLetters';
import { LoveJar } from './components/LoveJar';
import { BirthdayWishSection } from './components/BirthdayWishSection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { BirthdayCakeModal } from './components/BirthdayCakeModal';
import { PersonalizeModal } from './components/PersonalizeModal';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    const saved = localStorage.getItem('birthday_config');
    return saved ? JSON.parse(saved) : DEFAULT_BIRTHDAY_CONFIG;
  });

  const [photos, setPhotos] = useState<MemoryPhoto[]>(() => {
    const saved = localStorage.getItem('birthday_photos');
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const [letters, setLetters] = useState<LoveLetter[]>(() => {
    const saved = localStorage.getItem('birthday_letters');
    return saved ? JSON.parse(saved) : INITIAL_LETTERS;
  });

  const [isCakeModalOpen, setIsCakeModalOpen] = useState<boolean>(false);
  const [isPersonalizeModalOpen, setIsPersonalizeModalOpen] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  useEffect(() => {
    audioEngine.setOnStateChange((playing) => {
      setIsPlayingMusic(playing);
    });
  }, []);

  const handleToggleMusic = () => {
    audioEngine.toggle();
  };

  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    localStorage.setItem('birthday_config', JSON.stringify(newConfig));
  };

  const handleAddPhoto = (photo: MemoryPhoto) => {
    const updated = [photo, ...photos];
    setPhotos(updated);
    localStorage.setItem('birthday_photos', JSON.stringify(updated));
  };

  const handleToggleFavoritePhoto = (id: string) => {
    const updated = photos.map((p) =>
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    );
    setPhotos(updated);
    localStorage.setItem('birthday_photos', JSON.stringify(updated));
  };

  const handleDeletePhoto = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    localStorage.setItem('birthday_photos', JSON.stringify(updated));
  };

  const handleAddLetter = (letter: LoveLetter) => {
    const updated = [letter, ...letters];
    setLetters(updated);
    localStorage.setItem('birthday_letters', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#0f0d13] text-[#f4efe8] flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200 relative overflow-x-hidden">
      {/* Floating ambient romantic particle elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
      </div>

      {/* 1. Navbar */}
      <Navbar
        partnerName={config.partnerName}
        onOpenCakeModal={() => setIsCakeModalOpen(true)}
        onOpenPersonalizeModal={() => setIsPersonalizeModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero & Countdown Section */}
        <HeroCountdown
          config={config}
          onOpenCakeModal={() => setIsCakeModalOpen(true)}
          onOpenPersonalizeModal={() => setIsPersonalizeModalOpen(true)}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={handleToggleMusic}
        />

        {/* 3. Shared Photo Album */}
        <PhotoAlbum
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onToggleFavorite={handleToggleFavoritePhoto}
          onDeletePhoto={handleDeletePhoto}
        />

        {/* 4. Custom Birthday Messages & Love Letters Vault */}
        <LoveLetters
          letters={letters}
          onAddLetter={handleAddLetter}
          partnerName={config.partnerName}
        />

        {/* 5. Love Jar: 24 Reasons Why I Love You */}
        <LoveJar partnerName={config.partnerName} />

        {/* 6. Grand Birthday Finale & Candle Ceremony Call */}
        <BirthdayWishSection
          partnerName={config.partnerName}
          onOpenCakeModal={() => setIsCakeModalOpen(true)}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        partnerName={config.partnerName}
        senderName={config.senderName}
        onOpenCakeModal={() => setIsCakeModalOpen(true)}
        onOpenPersonalizeModal={() => setIsPersonalizeModalOpen(true)}
      />

      {/* 8. Floating Romantic Background Music Player */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />

      {/* 9. Interactive Cake & Candle Blowing Ceremony Modal */}
      <BirthdayCakeModal
        isOpen={isCakeModalOpen}
        onClose={() => setIsCakeModalOpen(false)}
        partnerName={config.partnerName}
      />

      {/* 10. Personalize Details Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeModalOpen}
        onClose={() => setIsPersonalizeModalOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
