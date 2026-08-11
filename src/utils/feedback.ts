/**
 * Non-visual confirmation of what the app just did, so dictating while walking
 * through a shop does not require looking at the screen.
 *
 * Deliberately tones rather than spoken confirmations: a synthesised voice
 * reading item names out loud in a shop sounds wrong and is slower than the
 * action it is confirming. Each cue is a short, distinguishable shape — rising
 * for something added, falling for something removed, a single blip for a tick,
 * a low buzz for "I did not understand" — which is learnable in a couple of
 * uses and finishes before you have taken another step.
 *
 * Vibration accompanies every cue and is not silenced by the sound setting: it
 * is the quiet channel, useful precisely when the sound is switched off.
 */

type Tone = { freq: number; start: number; duration: number };

type CueSpec = {
  tones: Tone[];
  vibration: number | number[];
};

const CUES = {
  listenStart: { tones: [{ freq: 880, start: 0, duration: 0.1 }], vibration: 20 },
  listenStop: { tones: [{ freq: 440, start: 0, duration: 0.2 }], vibration: 20 },
  added: {
    tones: [
      { freq: 660, start: 0, duration: 0.08 },
      { freq: 990, start: 0.09, duration: 0.11 },
    ],
    vibration: 30,
  },
  checked: { tones: [{ freq: 1320, start: 0, duration: 0.07 }], vibration: 15 },
  removed: {
    tones: [
      { freq: 660, start: 0, duration: 0.08 },
      { freq: 440, start: 0.09, duration: 0.13 },
    ],
    vibration: [20, 40, 20],
  },
  unrecognized: {
    tones: [
      { freq: 233, start: 0, duration: 0.11 },
      { freq: 233, start: 0.16, duration: 0.11 },
    ],
    vibration: [50, 60, 50],
  },
} satisfies Record<string, CueSpec>;

export type CueName = keyof typeof CUES;

const SOUND_KEY = 'sound_cues';

export const isSoundEnabled = () => localStorage.getItem(SOUND_KEY) !== 'off';

export const setSoundEnabled = (enabled: boolean) =>
  localStorage.setItem(SOUND_KEY, enabled ? 'on' : 'off');

// Browsers cap the number of AudioContexts per page, so one shared lazy
// instance instead of a new (never-closed) context per beep.
let audioCtx: AudioContext | null = null;

const play = (spec: CueSpec) => {
  try {
    audioCtx ??= new AudioContext();
    // Created before the first gesture, a context starts suspended; the mic
    // button is the gesture that lets it (and every later cue) be heard.
    if (audioCtx.state === 'suspended') void audioCtx.resume();

    for (const tone of spec.tones) {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const startAt = audioCtx.currentTime + tone.start;

      oscillator.type = 'sine';
      oscillator.frequency.value = tone.freq;

      gainNode.gain.setValueAtTime(0.1, startAt);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, startAt + tone.duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start(startAt);
      oscillator.stop(startAt + tone.duration);
    }
  } catch (e) {
    console.error('Audio playback failed', e);
  }
};

export const haptic = (name: CueName) => {
  try {
    navigator.vibrate?.(CUES[name].vibration);
  } catch {
    // unsupported or blocked — nothing to fall back to
  }
};

/** Sound (unless muted) plus vibration for the given outcome. */
export const cue = (name: CueName) => {
  if (isSoundEnabled()) play(CUES[name]);
  haptic(name);
};
