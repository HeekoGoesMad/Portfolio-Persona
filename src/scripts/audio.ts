// Original feedback tones. This module is requested only after sound opt-in.
let context: AudioContext | undefined;
let lastPlayed = 0;
export async function playTone(kind: 'select' | 'confirm') {
  if (performance.now() - lastPlayed < 75) return;
  lastPlayed = performance.now();
  context ??= new AudioContext();
  if (context.state !== 'running') await context.resume();
  const start = context.currentTime;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(kind === 'confirm' ? 660 : 520, start);
  oscillator.frequency.exponentialRampToValueAtTime(kind === 'confirm' ? 990 : 780, start + .065);
  envelope.gain.setValueAtTime(.0001, start);
  envelope.gain.exponentialRampToValueAtTime(.035, start + .008);
  envelope.gain.exponentialRampToValueAtTime(.0001, start + .095);
  oscillator.connect(envelope).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + .1);
  oscillator.onended=()=>{ oscillator.disconnect(); envelope.disconnect(); };
}
