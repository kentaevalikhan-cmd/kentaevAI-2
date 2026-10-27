/**
 * Web Audio API ambient soundscape for KentaevAI particle experience
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  // Chord frequencies for each chapter (atmospheric, sci-fi ambient)
  private readonly chapterChords: number[][] = [
    [110, 164.81, 220, 277.18], // Hero: A minor 9
    [130.81, 196.0, 261.63, 392.0], // 01 Synapse: C sus2
    [98.0, 146.83, 220, 293.66], // 02 Gateway: G add9
    [123.47, 185.0, 246.94, 369.99], // 03 Nuclei: B minor
    [146.83, 220.0, 293.66, 440.0], // 04 Ribbon: D major
    [116.54, 174.61, 233.08, 349.23], // 05 Vortex: Bb lydian
    [164.81, 246.94, 329.63, 493.88], // 06 Laser: E minor crystalline
    [138.59, 207.65, 277.18, 415.3], // 07 Cage: C# minor
    [110, 164.81, 220, 329.63], // 08 Frontier / Finale: A cinematic
  ];

  public init(): void {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2, this.ctx.currentTime);

      this.masterGain.connect(this.ctx.destination);
    } catch {
      // Audio not supported in this environment
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startDrone();
      this.masterGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.8);
      this.playChime(440, 0.1);
    } else {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
      setTimeout(() => this.stopDrone(), 600);
    }

    return this.isEnabled;
  }

  public getState(): boolean {
    return this.isEnabled;
  }

  private startDrone(): void {
    if (!this.ctx || !this.filter || !this.masterGain) return;
    this.stopDrone();

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc2 = this.ctx.createOscillator();

    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(110, this.ctx.currentTime);

    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(164.81, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.droneOsc1.connect(this.filter);
    this.droneOsc2.connect(this.filter);
    this.filter.connect(droneGain);
    droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  private stopDrone(): void {
    try {
      this.droneOsc1?.stop();
      this.droneOsc1?.disconnect();
      this.droneOsc2?.stop();
      this.droneOsc2?.disconnect();
    } catch {
      // Ignored
    }
    this.droneOsc1 = null;
    this.droneOsc2 = null;
  }

  public onStageChange(stageIndex: number): void {
    if (!this.isEnabled || !this.ctx || !this.filter) return;

    const chords = this.chapterChords[stageIndex % this.chapterChords.length];
    const baseFreq = chords[0];
    const harmonic = chords[1];

    if (this.droneOsc1 && this.droneOsc2) {
      const now = this.ctx.currentTime;
      this.droneOsc1.frequency.exponentialRampToValueAtTime(Math.max(40, baseFreq), now + 1.2);
      this.droneOsc2.frequency.exponentialRampToValueAtTime(Math.max(60, harmonic), now + 1.2);
    }

    // Gentle chord chime
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq * 1.5, 0.04);
      }, idx * 90);
    });
  }

  public playChime(freq: number, volume: number = 0.05): void {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.3);
    } catch {
      // Ignored
    }
  }

  public playInteraction(): void {
    if (!this.isEnabled || !this.ctx) return;
    this.playChime(880 + Math.random() * 200, 0.015);
  }
}

export const soundEngine = new SoundEngine();
