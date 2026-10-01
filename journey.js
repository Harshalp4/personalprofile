import { years, milestones, getYearStory } from './journey-data.js';
import { motionState, setMotionPaused, onMotionChange } from './motion-preferences.js';

const root = document.querySelector('#year-journey');
const rail = root.querySelector('.year-rail');
const panel = root.querySelector('#year-story');
const play = root.querySelector('#journey-play');
const prev = root.querySelector('#journey-prev');
const next = root.querySelector('#journey-next');
const select = root.querySelector('#journey-year');
const status = root.querySelector('#journey-status');
const image = root.querySelector('#year-image');
const action = root.querySelector('#year-action');
let index = 0, timer = null, transition = null, playing = false;

const buttons = years.map(year => {
  const button = document.createElement('button');
  button.type = 'button'; button.role = 'tab'; button.id = 'year-tab-'+year;
  button.className = 'year-stop'+(milestones[year]?' has-milestone':'');
  button.setAttribute('aria-controls','year-story');
  button.setAttribute('aria-label',year+(milestones[year]?' — '+milestones[year].title:' — no dated milestone yet'));
  const dot = document.createElement('span'); dot.className='year-stop-dot'; dot.setAttribute('aria-hidden','true');
  const label = document.createElement('span'); label.textContent = year;
  button.append(dot,label); rail.append(button);
  const option=document.createElement('option');option.value=year;option.textContent=year+(milestones[year]?' · '+milestones[year].label:'');select.append(option);
  return button;
});

function stop(message) {
  playing=false; clearTimeout(timer); timer=null;
  play.textContent='Play journey'; play.setAttribute('aria-pressed','false');
  root.dataset.playing='false';
  if(message) status.textContent=message;
}
function schedule() {
  clearTimeout(timer);
  timer=setTimeout(()=>{
    if (!playing) return;
    if (index===years.length-1) {stop('You’re up to date.');return;}
    show(index+1);
    if(index===years.length-1) stop('You’re up to date.');
    else schedule();
  },milestones[years[index]]?4500:2600);
}
function show(newIndex, focus=false, animate=true) {
  index=Math.max(0,Math.min(years.length-1,newIndex));
  const story=getYearStory(years[index]);
  buttons.forEach((button,i)=>{
    button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;
    button.classList.toggle('visited',i<index);
  });
  select.value=String(story.year);
  root.querySelectorAll('[data-jump-year]').forEach(button=>{button.classList.toggle('is-active',Number(button.dataset.jumpYear)===story.year);});
  panel.setAttribute('aria-labelledby',buttons[index].id);
  root.querySelector('#year-number').textContent=story.year;
  root.querySelector('#year-label').textContent=story.label;
  root.querySelector('#year-title').textContent=story.title;
  root.querySelector('#year-description').textContent=story.text;
  root.querySelector('#year-tags').replaceChildren(...story.tags.map(text=>{const span=document.createElement('span');span.textContent=text;return span;}));
  const context=root.querySelector('#year-context');
  context.replaceChildren();context.hidden=story.confirmed;
  for (const [prefix,year] of [['Previously',story.previous],['Next milestone',story.next]]) if(year) {
    const small=document.createElement('p');small.textContent=`${prefix}: ${year} · ${milestones[year].title}`;context.append(small);
  }
  image.src=story.image; image.alt=story.alt;
  action.textContent=story.action;
  action.href=story.href || '#work'; action.dataset.storyProject=story.project || '';
  prev.disabled=index===0;next.disabled=index===years.length-1;
  root.querySelector('.year-progress-fill').style.transform=`scaleX(${index/(years.length-1)})`;
  status.textContent=(playing?'Playing · ':'')+story.year+' / '+years.at(-1);
  transition?.cancel();
  if(animate&&!motionState.paused) transition=panel.animate([{opacity:.35,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
  const selected=buttons[index];
  if(animate||focus) rail.scrollTo({left:Math.max(0,selected.offsetLeft-rail.clientWidth/2+selected.offsetWidth/2),behavior:'instant'});
  if(focus) selected.focus({preventScroll:true});
}
function choose(newIndex,focus=false){stop();show(newIndex,focus);}
buttons.forEach((button,i)=>{
  button.addEventListener('click',()=>choose(i));
  button.addEventListener('keydown',event=>{
    let dest;
    if(event.key==='ArrowRight')dest=(i+1)%years.length;
    if(event.key==='ArrowLeft')dest=(i+years.length-1)%years.length;
    if(event.key==='Home')dest=0;
    if(event.key==='End')dest=years.length-1;
    if(dest!==undefined){event.preventDefault();choose(dest,true);}
  });
});
prev.addEventListener('click',()=>choose(index-1));
next.addEventListener('click',()=>choose(index+1));
select.addEventListener('change',()=>choose(years.indexOf(Number(select.value))));
root.querySelectorAll('[data-jump-year]').forEach(button=>button.addEventListener('click',()=>choose(years.indexOf(Number(button.dataset.jumpYear)))));
play.addEventListener('click',()=>{
  if(playing){stop('Paused at '+years[index]);return;}
  if(motionState.paused)setMotionPaused(false);
  if(index===years.length-1)show(0);
  playing=true;play.textContent='Pause journey';play.setAttribute('aria-pressed','true');root.dataset.playing='true';
  status.textContent='Playing · '+years[index]+' / '+years.at(-1);schedule();
});
// User reading/interaction takes priority over automatic progression.
panel.addEventListener('pointerenter',()=>{if(playing)stop('Paused at '+years[index]);});
root.addEventListener('focusin',event=>{if(event.target!==play&&playing)stop('Paused at '+years[index]);});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)stop('Paused at '+years[index]);});
new IntersectionObserver(([entry])=>{if(!entry.isIntersecting&&playing)stop('Paused at '+years[index]);},{threshold:.1}).observe(root);
onMotionChange(state=>{if(state.paused){stop('Motion paused');transition?.cancel();}});
action.addEventListener('click',event=>{
  if(!action.dataset.storyProject)return;
  const trigger=document.querySelector(`[data-project="${action.dataset.storyProject}"]`);
  if(trigger){event.preventDefault();stop();trigger.focus({preventScroll:true});trigger.click();}
});
root.querySelector('.year-controls').hidden=false;
rail.hidden=false;
show(0,false,false);
