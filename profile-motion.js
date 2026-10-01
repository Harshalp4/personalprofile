import { motionState, setMotionPaused, onMotionChange } from './motion-preferences.js';

const moments = [...document.querySelectorAll('[data-motion-video]')].map(video => ({
  video,
  button: video.closest('.profile-moment').querySelector('.moment-toggle'),
  visible: false,
  paused: false,
  blocked: false,
  failed: false
}));

function update(moment) {
  const {video, button} = moment;
  const shouldPlay = moment.visible && !moment.paused && !moment.blocked && !motionState.paused && !document.hidden && !moment.failed;
  if (shouldPlay) {
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.muted = true;
    const play = video.play();
    if (play) play.catch(() => {
      // Pausing while a play request is loading is expected, not a media failure.
      if (moment.visible && !moment.paused && !motionState.paused && !document.hidden) {
        moment.blocked = true;
        update(moment);
      }
    });
  } else video.pause();
  const stopped = moment.paused || moment.blocked || motionState.paused;
  button.textContent = stopped ? 'Play' : 'Pause';
  button.setAttribute('aria-label', `${stopped ? 'Play' : 'Pause'} ${video.dataset.label} animation`);
}

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const moment = moments.find(item => item.video === entry.target);
    moment.visible = entry.isIntersecting;
    update(moment);
  }
}, {threshold: 0.12});
for (const moment of moments) {
  observer.observe(moment.video);
  moment.button.hidden = false;
  moment.button.addEventListener('click', () => {
    if (motionState.paused) {
      moment.paused = false;
      moment.blocked = false;
      setMotionPaused(false);
    } else if (moment.blocked) moment.blocked = false;
    else moment.paused = !moment.paused;
    update(moment);
  });
  moment.video.addEventListener('error', () => {
    moment.failed = true;
    moment.button.hidden = true;
    // Leave the poster in place if a browser cannot decode this video.
    moment.video.removeAttribute('src');
    moment.video.load();
  });
}
onMotionChange(() => moments.forEach(update));
document.addEventListener('visibilitychange', () => moments.forEach(update));
