/**
 * Web Audio API synthesizer engine for generating warm romantic acoustic piano & ambient music
 */

interface NoteDef {
  pitch: number; // in Hz or MIDI note
  duration: number; // in seconds
  timeOffset: number; // in seconds from pattern start
  velocity: number; // 0 to 1
}

// Convert MIDI number to frequency
function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Romantic Track Melodies & Progressions
export const PROCEDURAL_TRACKS = [
  {
    id: 'golden-hour',
    title: 'Golden Hour Reverie',
    composer: 'Acoustic Piano & Soft Strings',
    mood: 'Warm · Nostalgic · Tender',
    durationSeconds: 96,
  },
  {
    id: 'cant-help-falling',
    title: 'Can’t Help Falling For You',
    composer: 'Romantic Fingerpicked Piano',
    mood: 'Intimate · Devoted · Sweet',
    durationSeconds: 112,
  },
  {
    id: 'midnight-starlight',
    title: 'Midnight Starlight Waltz',
    composer: 'Lyrical Piano & Cellos',
    mood: 'Dreamy · Elegant · Enchanting',
    durationSeconds: 104,
  },
  {
    id: 'birthday-serenade',
    title: 'Birthday Serenade & Music Box',
    composer: 'Chime Music Box & Warm Piano',
    mood: 'Celebratory · Heartwarming · Pure',
    durationSeconds: 88,
  },
];

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private volume: number = 0.65;
  private loopInterval: number | null = null;
  private playbackStartTime: number = 0;
  private onTimeUpdateCallback: ((seconds: number) => void) | null = null;
  private onStateChangeCallback: ((playing: boolean) => void) | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return PROCEDURAL_TRACKS[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public setTrackIndex(idx: number) {
    this.currentTrackIndex = (idx + PROCEDURAL_TRACKS.length) % PROCEDURAL_TRACKS.length;
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  public nextTrack() {
    this.setTrackIndex(this.currentTrackIndex + 1);
  }

  public prevTrack() {
    this.setTrackIndex(this.currentTrackIndex - 1);
  }

  public setOnTimeUpdate(cb: (seconds: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public setOnStateChange(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  // Play a soft romantic acoustic piano note
  private playPianoNote(midi: number, startTime: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx || !this.masterGain) return;

    const freq = midiToFreq(midi);
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm piano tone: triangle with low-pass filter
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, startTime);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, startTime + duration);

    // ADSR Envelope
    const attack = 0.02;
    const decay = duration * 0.4;
    const peak = velocity * 0.4;

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(peak, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(peak * 0.4, startTime + attack + decay);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);

    // Subtle sub-harmonic warmth
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq, startTime);
    subGain.gain.setValueAtTime(0.0001, startTime);
    subGain.gain.exponentialRampToValueAtTime(peak * 0.25, startTime + attack);
    subGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.9);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(startTime);
    subOsc.stop(startTime + duration);
  }

  // Play a gentle music box chime
  private playChimeNote(midi: number, startTime: number, duration: number, velocity: number = 0.5) {
    if (!this.ctx || !this.masterGain) return;
    const freq = midiToFreq(midi);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    const peak = velocity * 0.35;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peak, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private scheduleTrack(trackId: string, startCtxTime: number): number {
    // Generate melody note list based on track
    const notes: NoteDef[] = [];
    let loopDuration = 16; // seconds per cycle

    if (trackId === 'golden-hour') {
      // D major romantic chord progression: D - A/C# - Bm - G
      const chords = [
        [50, 57, 62, 66, 69], // D maj (D3, A3, D4, F#4, A4)
        [49, 57, 61, 64, 69], // A/C# (C#3, A3, C#4, E4, A4)
        [47, 54, 59, 62, 66], // Bm (B2, F#3, B3, D4, F#4)
        [43, 50, 55, 59, 62], // G (G2, D3, G3, B3, D4)
      ];

      chords.forEach((chord, cIdx) => {
        const chordStart = cIdx * 4;
        // Bass note
        notes.push({ pitch: chord[0], duration: 3.5, timeOffset: chordStart, velocity: 0.6 });
        // Arpeggio rolling upward and downward
        const arpPattern = [1, 2, 3, 4, 3, 2, 4, 3];
        arpPattern.forEach((noteIdx, sIdx) => {
          notes.push({
            pitch: chord[noteIdx],
            duration: 1.8,
            timeOffset: chordStart + sIdx * 0.5,
            velocity: 0.45 + (sIdx === 0 ? 0.2 : 0),
          });
        });

        // Delicate high melody notes
        const melodyPitches = [74, 73, 71, 69];
        notes.push({
          pitch: melodyPitches[cIdx],
          duration: 2.2,
          timeOffset: chordStart + 1.0,
          velocity: 0.65,
        });
      });
      loopDuration = 16;
    } else if (trackId === 'cant-help-falling') {
      // D - F#m - Bm - G - D - A
      const chords = [
        [50, 57, 62, 66], // D
        [49, 54, 61, 66], // F#m
        [47, 54, 59, 62], // Bm
        [43, 50, 55, 59], // G
        [50, 57, 62, 66], // D
        [45, 52, 57, 61], // A
      ];
      chords.forEach((chord, idx) => {
        const cStart = idx * 3;
        notes.push({ pitch: chord[0], duration: 2.8, timeOffset: cStart, velocity: 0.6 });
        notes.push({ pitch: chord[1], duration: 1.4, timeOffset: cStart + 0.5, velocity: 0.4 });
        notes.push({ pitch: chord[2], duration: 1.4, timeOffset: cStart + 1.0, velocity: 0.45 });
        notes.push({ pitch: chord[3], duration: 1.8, timeOffset: cStart + 1.5, velocity: 0.55 });
        notes.push({ pitch: chord[2], duration: 1.2, timeOffset: cStart + 2.2, velocity: 0.4 });
      });
      loopDuration = 18;
    } else if (trackId === 'midnight-starlight') {
      // 3/4 waltz romantic piano
      const waltzChords = [
        [41, 60, 65, 69], // F
        [45, 57, 64, 69], // Am
        [38, 57, 62, 65], // Dm
        [46, 58, 62, 65], // Bb
      ];
      waltzChords.forEach((chord, idx) => {
        const cStart = idx * 4.5;
        // Beat 1: bass
        notes.push({ pitch: chord[0], duration: 4.0, timeOffset: cStart, velocity: 0.7 });
        notes.push({ pitch: chord[3] + 12, duration: 2.5, timeOffset: cStart + 0.2, velocity: 0.6 });
        // Beat 2: chord pulse
        notes.push({ pitch: chord[1], duration: 1.2, timeOffset: cStart + 1.5, velocity: 0.4 });
        notes.push({ pitch: chord[2], duration: 1.2, timeOffset: cStart + 1.5, velocity: 0.4 });
        // Beat 3: chord pulse
        notes.push({ pitch: chord[1], duration: 1.2, timeOffset: cStart + 3.0, velocity: 0.35 });
        notes.push({ pitch: chord[2], duration: 1.2, timeOffset: cStart + 3.0, velocity: 0.35 });
      });
      loopDuration = 18;
    } else {
      // Birthday Serenade with Music Box Chimes
      // Happy Birthday motif (G G A G C B / G G A G D C)
      const bdayMotif = [
        { p: 67, d: 0.6, t: 0 },
        { p: 67, d: 0.6, t: 0.6 },
        { p: 69, d: 1.2, t: 1.2 },
        { p: 67, d: 1.2, t: 2.4 },
        { p: 72, d: 1.5, t: 3.6 },
        { p: 71, d: 2.4, t: 5.0 },

        { p: 67, d: 0.6, t: 8.0 },
        { p: 67, d: 0.6, t: 8.6 },
        { p: 69, d: 1.2, t: 9.2 },
        { p: 67, d: 1.2, t: 10.4 },
        { p: 74, d: 1.5, t: 11.6 },
        { p: 72, d: 2.6, t: 13.0 },
      ];

      // Chime notes
      bdayMotif.forEach(m => {
        this.playChimeNote(m.p, startCtxTime + m.t, m.d, 0.75);
      });

      // Soft warm piano accompaniment underneath
      const pianoBases = [
        { p: 48, t: 0 },
        { p: 43, t: 4 },
        { p: 48, t: 8 },
        { p: 43, t: 12 },
      ];
      pianoBases.forEach(b => {
        notes.push({ pitch: b.p, duration: 3.8, timeOffset: b.t, velocity: 0.5 });
        notes.push({ pitch: b.p + 12, duration: 2.0, timeOffset: b.t + 0.8, velocity: 0.35 });
        notes.push({ pitch: b.p + 16, duration: 2.0, timeOffset: b.t + 1.8, velocity: 0.35 });
      });
      loopDuration = 16;
    }

    notes.forEach(n => {
      this.playPianoNote(n.pitch, startCtxTime + n.timeOffset, n.duration, n.velocity);
    });

    return loopDuration;
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;

    if (this.customAudio && this.customAudioUrl) {
      this.customAudio.play();
      this.isPlaying = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
      return;
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playbackStartTime = Date.now();

    const track = PROCEDURAL_TRACKS[this.currentTrackIndex];
    let nextStartTime = this.ctx.currentTime + 0.05;
    const loopSec = this.scheduleTrack(track.id, nextStartTime);

    // Loop scheduler
    this.loopInterval = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      nextStartTime += loopSec;
      this.scheduleTrack(track.id, nextStartTime);
    }, (loopSec - 1.5) * 1000);

    // Periodic time update ticker
    const timer = window.setInterval(() => {
      if (!this.isPlaying) {
        clearInterval(timer);
        return;
      }
      const elapsed = (Date.now() - this.playbackStartTime) / 1000;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(elapsed % track.durationSeconds);
      }
    }, 500);

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(true);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(false);
    }
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  public loadCustomAudioFile(file: File) {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
    }
    this.stop();
    this.customAudioUrl = URL.createObjectURL(file);
    this.customAudio = new Audio(this.customAudioUrl);
    this.customAudio.volume = this.volume;
    this.customAudio.onended = () => {
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };
    this.play();
  }
}

export const audioEngine = new RomanticAudioEngine();
