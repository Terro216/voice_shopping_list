import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useSpeechRecognition } from './useSpeechRecognition';

type Handler = ((event: unknown) => void) | null;

/** Stands in for the browser's engine so the timing can be driven by hand. */
class FakeRecognition {
  static last: FakeRecognition | null = null;
  continuous = false;
  interimResults = false;
  lang = '';
  onresult: Handler = null;
  onerror: Handler = null;
  onend: (() => void) | null = null;
  start = vi.fn();
  stop = vi.fn();

  constructor() {
    FakeRecognition.last = this;
  }

  /** Delivers results the way the engine does, one event at a time. */
  deliver(fragments: { text: string; final: boolean }[]) {
    this.onresult?.({
      resultIndex: 0,
      results: fragments.map((f) => ({ isFinal: f.final, 0: { transcript: f.text } })),
    });
  }
}

let onFinal: Mock<(text: string) => void>;

beforeEach(() => {
  vi.useFakeTimers();
  // The confirmation tones are not what is under test, and jsdom has no audio.
  vi.stubGlobal('AudioContext', class {
    createOscillator = () => ({ connect: () => {}, start: () => {}, stop: () => {}, frequency: { value: 0 } });
    createGain = () => ({ connect: () => {}, gain: { value: 0, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} } });
    close = () => {};
    get destination() { return {}; }
    get currentTime() { return 0; }
  });
  onFinal = vi.fn<(text: string) => void>();
  FakeRecognition.last = null;
  (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition = FakeRecognition;
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  delete (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition;
});

const listen = () => {
  const view = renderHook(() => useSpeechRecognition(onFinal, 'ru-RU'));
  act(() => view.result.current.toggleListening());
  return { view, engine: FakeRecognition.last! };
};

const settle = () => act(() => void vi.advanceTimersByTime(2000));

describe('useSpeechRecognition', () => {
  it('applies a phrase once, after it settles', () => {
    const { engine } = listen();
    act(() => engine.deliver([{ text: 'молоко', final: true }]));
    expect(onFinal).not.toHaveBeenCalled(); // still waiting for a revision

    settle();
    expect(onFinal).toHaveBeenCalledExactlyOnceWith('молоко');
  });

  it('merges the overlapping takes of one phrase into a single call', () => {
    const { engine } = listen();
    act(() => {
      engine.deliver([{ text: 'три', final: true }]);
      engine.deliver([{ text: 'три пакета', final: true }]);
      engine.deliver([{ text: 'три пакета с маршмеллоу', final: true }]);
    });
    settle();
    expect(onFinal).toHaveBeenCalledExactlyOnceWith('три пакета с маршмеллоу');
  });

  it('keeps a phrase together across the restart the engine does on a pause', () => {
    const { engine } = listen();
    act(() => engine.deliver([{ text: 'молоко', final: true }]));

    // The engine ends its session mid-phrase and comes back with a revision.
    act(() => engine.onend?.());
    act(() => void vi.advanceTimersByTime(300));
    act(() => engine.deliver([{ text: 'молока 5', final: true }]));
    settle();

    expect(onFinal).toHaveBeenCalledExactlyOnceWith('молока 5');
  });

  it('"дальше" ends the phrase at once, without the wait', () => {
    const { engine } = listen();
    act(() => engine.deliver([{ text: 'молоко дальше', final: true }]));

    expect(onFinal).toHaveBeenCalledExactlyOnceWith('молоко');
  });

  it('keeps listening after "дальше" so the next item goes to a new row', () => {
    const { view, engine } = listen();
    act(() => engine.deliver([{ text: 'молоко дальше', final: true }]));
    act(() => engine.deliver([{ text: 'хлеб', final: true }]));
    settle();

    expect(onFinal.mock.calls.map(([text]) => text)).toEqual(['молоко', 'хлеб']);
    expect(view.result.current.isListening).toBe(true);
  });

  it('applies the phrase immediately when the button is pressed', () => {
    const { view, engine } = listen();
    act(() => engine.deliver([{ text: 'молоко', final: true }]));
    act(() => view.result.current.flushNow());

    expect(onFinal).toHaveBeenCalledExactlyOnceWith('молоко');
    settle();
    expect(onFinal).toHaveBeenCalledTimes(1); // the settle timer must not repeat it
  });

  it('does not throw away a phrase when the mic is switched off mid-word', () => {
    const { view, engine } = listen();
    act(() => engine.deliver([{ text: 'молоко', final: true }]));
    act(() => view.result.current.toggleListening());

    expect(onFinal).toHaveBeenCalledExactlyOnceWith('молоко');
    expect(view.result.current.isListening).toBe(false);
  });

  it('shows the whole phrase so far while it is being said', () => {
    const { view, engine } = listen();
    act(() => engine.deliver([{ text: 'молоко', final: true }]));
    act(() => engine.deliver([{ text: ' и хлеб', final: false }]));

    expect(view.result.current.interimText).toBe('молоко и хлеб');
  });
});
