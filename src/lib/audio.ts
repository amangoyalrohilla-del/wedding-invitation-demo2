/**
 * Tiny sound engine. Nothing plays until the visitor makes a gesture AND
 * turns sound on. Default ambience is synthesised in the browser (a soft
 * tanpura-style drone with temple-bell accents) — no copyrighted music.
 * If `musicSrc` is provided (a licensed file), that loops instead.
 */
type Listener = (on: boolean) => void;

class SoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambienceTimer: number | undefined;
  private droneNodes: AudioScheduledSourceNode[] = [];
  private fileAudio: HTMLAudioElement | null = null;
  private listeners = new Set<Listener>();
  private musicSrc = '';
  enabled = false;

  configure(musicSrc: string) {
    this.musicSrc = musicSrc;
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  private emit() {
    this.listeners.forEach((l) => l(this.enabled));
  }

  private ensureCtx(): AudioContext | null {
    if (this.ctx) return this.ctx;
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  /** Must be called from a click/tap handler. */
  async setEnabled(on: boolean) {
    this.enabled = on;
    this.emit();
    if (on) {
      if (this.musicSrc) {
        if (!this.fileAudio) {
          this.fileAudio = new Audio(this.musicSrc);
          this.fileAudio.loop = true;
          this.fileAudio.volume = 0.45;
        }
        this.fileAudio.play().catch(() => {
          this.enabled = false;
          this.emit();
        });
        // bells still use Web Audio
        this.ensureCtx();
        await this.ctx?.resume();
        this.fade(1);
        return;
      }
      const ctx = this.ensureCtx();
      if (!ctx) return;
      await ctx.resume();
      this.startAmbience();
      this.fade(1);
    } else {
      this.fileAudio?.pause();
      this.fade(0);
      window.setTimeout(() => {
        if (!this.enabled) this.stopAmbience();
      }, 700);
    }
  }

  /** Temporarily silence ambience (e.g. while the film plays) without changing the user's setting. */
  duck(silent: boolean) {
    if (!this.enabled) return;
    if (this.fileAudio) silent ? this.fileAudio.pause() : this.fileAudio.play().catch(() => undefined);
    this.fade(silent ? 0 : 1);
  }

  toggle() {
    return this.setEnabled(!this.enabled);
  }

  private fade(to: number) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.setValueAtTime(this.master.gain.value, t);
    this.master.gain.linearRampToValueAtTime(to * 0.22, t + 0.6);
  }

  /** Soft temple bell — only audible when sound is enabled. */
  bell(delay = 0, base = 660) {
    if (!this.enabled) return;
    const ctx = this.ensureCtx();
    if (!ctx || !this.master) return;
    const t0 = ctx.currentTime + delay;
    [1, 2.76, 5.4, 8.93].forEach((ratio, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = base * ratio;
      const peak = [0.5, 0.22, 0.1, 0.05][i];
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(peak, t0 + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.2 / (1 + i * 0.6));
      o.connect(g).connect(this.master!);
      o.start(t0);
      o.stop(t0 + 3.5);
    });
  }

  private pluck(freq: number, when: number, vol = 0.18) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    f.type = 'lowpass';
    f.frequency.setValueAtTime(1800, when);
    f.frequency.exponentialRampToValueAtTime(380, when + 2.4);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 3.4);
    o.connect(f).connect(g).connect(this.master!);
    o.start(when);
    o.stop(when + 3.6);
  }

  private startAmbience() {
    if (!this.ctx || !this.master || this.ambienceTimer !== undefined) return;
    const ctx = this.ctx;
    // continuous low drone (Sa + Pa)
    [130.81, 196, 261.63].forEach((fr, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = fr;
      g.gain.value = [0.16, 0.09, 0.06][i];
      lfo.frequency.value = 0.13 + i * 0.07;
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(this.master!);
      o.start();
      lfo.start();
      this.droneNodes.push(o, lfo);
    });
    // tanpura cycle: Pa – Sa' – Sa' – Sa
    const cycle = [196, 261.63, 261.63, 130.81];
    let step = 0;
    let next = ctx.currentTime + 0.1;
    const schedule = () => {
      while (next < ctx.currentTime + 1.5) {
        this.pluck(cycle[step % 4], next, step % 4 === 3 ? 0.2 : 0.13);
        if (step % 16 === 8) this.bell(next - ctx.currentTime, 784);
        step++;
        next += 1.1;
      }
    };
    schedule();
    this.ambienceTimer = window.setInterval(schedule, 500);
  }

  private stopAmbience() {
    window.clearInterval(this.ambienceTimer);
    this.ambienceTimer = undefined;
    this.droneNodes.forEach((n) => {
      try {
        n.stop();
      } catch {
        /* already stopped */
      }
    });
    this.droneNodes = [];
  }
}

export const sound = new SoundEngine();
