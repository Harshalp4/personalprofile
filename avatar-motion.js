import { motionState, onMotionChange } from './motion-preferences.js';
const art=document.querySelector('.avatar-art');
const portrait=art.querySelector('.avatar-parallax');
const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
let visible=true, frame=null, point=null;
function reset(){point=null;cancelAnimationFrame(frame);frame=null;portrait.style.setProperty('--avatar-x','0deg');portrait.style.setProperty('--avatar-y','0deg');}
function state(){art.dataset.moving=String(visible&&!motionState.paused&&!document.hidden);if(motionState.paused||!visible||document.hidden)reset();}
art.addEventListener('pointermove',event=>{
  if(motionState.paused||!finePointer.matches)return;
  point={x:event.clientX,y:event.clientY};
  if(frame)return;
  frame=requestAnimationFrame(()=>{
    frame=null;if(!point)return;
    const bounds=art.getBoundingClientRect();
    portrait.style.setProperty('--avatar-x',((.5-(point.y-bounds.top)/bounds.height)*3).toFixed(2)+'deg');
    portrait.style.setProperty('--avatar-y',(((point.x-bounds.left)/bounds.width-.5)*4).toFixed(2)+'deg');
  });
});
art.addEventListener('pointerleave',reset);
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;state();}).observe(art);
document.addEventListener('visibilitychange',state);
onMotionChange(state);
