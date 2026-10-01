// One preference controls the profile videos and the original live 3D studio.
const media = matchMedia('(prefers-reduced-motion: reduce)');
export const motionState = { paused: media.matches };
const listeners = new Set();
const toggle = document.querySelector('#motion-toggle');
export function setMotionPaused(paused) {
  motionState.paused = Boolean(paused);
  document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
  if (toggle) {
    toggle.hidden = false;
    toggle.textContent = paused ? 'Play all motion' : 'Pause all motion';
    toggle.setAttribute('aria-pressed', String(paused));
  }
  listeners.forEach(listener => listener(motionState));
}
export function onMotionChange(listener) {
  listeners.add(listener);
  listener(motionState);
  return () => listeners.delete(listener);
}
toggle?.addEventListener('click', () => setMotionPaused(!motionState.paused));
media.addEventListener('change', () => setMotionPaused(media.matches));
setMotionPaused(media.matches);
