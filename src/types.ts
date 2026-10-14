export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  imageUrl: string;
  category: 'Milestones' | 'Dates' | 'Little Things' | 'Trips';
  isFavorite: boolean;
  aspect?: 'portrait' | 'landscape' | 'square';
  note?: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  date: string;
  theme: 'rose' | 'velvet' | 'parchment' | 'starlight';
  isOpened?: boolean;
}

export interface BirthdayConfig {
  partnerName: string;
  senderName: string;
  birthdayDate: string; // ISO string e.g. "2026-10-15T00:00:00"
  anniversaryDate: string; // ISO string e.g. "2023-06-20"
  customKicker: string;
  customHeading: string;
  customMessage: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  composer: string;
  mood: string;
  durationSeconds: number;
  type: 'synth' | 'custom';
  audioUrl?: string;
}
