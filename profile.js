import { projects as featuredProjects, chapters } from './profile-data.js';
import { galleryProjects, digitizationProjects } from './gallery-projects.js';
const projects={...featuredProjects,...galleryProjects,...digitizationProjects};

const paths={
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1z"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 journey:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h9a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h9"/>',
 team:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v1"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
 file:'<path d="M13 3H5v18h14V9zm0 0v6h6M8 13h8m-8 4h6"/>',
 globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
 phone:'<path d="m7 3-4 2c0 9 7 16 16 16l2-4-5-3-2 2a12 12 0 0 1-6-6l2-2z"/>',
 chat:'<path d="M4 20l1.5-4A8 8 0 1 1 8 18.5z"/>',
 gallery:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
 layers:'<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>'
};
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+paths[el.dataset.icon]+'</svg>'});
const setText=(id,value)=>document.getElementById(id).textContent=value;
const elements=(tag,items)=>items.map(value=>{const el=document.createElement(tag);el.textContent=value;return el});
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const p=projects[button.dataset.project];
 setText('project-title',p.title);setText('project-type',p.type);setText('project-body',p.intro);setText('project-outcome',p.outcome||p.scope||'');
 const visual=document.querySelector('#project-visual');visual.hidden=!p.image;
 if(p.image){const img=visual.querySelector('img');img.src='assets/projects/'+p.image+'.png';img.alt=p.imageAlt;}
 document.querySelector('#project-points').replaceChildren(...elements('li',p.points));
 document.querySelector('#project-tags').replaceChildren(...elements('span',p.tags));dialog.showModal();dialog.scrollTop=0;
}));
const cvDialog=document.querySelector('#cv-dialog');
document.querySelector('#preview-cv').addEventListener('click',()=>{
 const frame=cvDialog.querySelector('iframe');if(!frame.src)frame.src='assets/harshal-patil-cv.pdf#view=FitH';cvDialog.showModal();
});
for(const d of [dialog,cvDialog]){
 d.querySelector('.close').addEventListener('click',()=>d.close());
 d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()});
}
const tabs=[...document.querySelectorAll('[data-chapter]')];
function chooseChapter(index,focus=false){
 const c=chapters[index];tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1});
 const panel=document.getElementById('career-panel');panel.setAttribute('aria-labelledby',tabs[index].id);
 setText('chapter-title',c.title);setText('chapter-subtitle',c.subtitle);setText('chapter-text',c.text);setText('chapter-date',c.date);
 document.getElementById('chapter-tags').replaceChildren(...elements('span',c.tags));
 document.getElementById('chapter-details').replaceChildren(...elements('li',c.details));
 if(focus){tabs[index].focus({preventScroll:true});tabs[index].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'})}
}
tabs.forEach((t,i)=>{
 t.addEventListener('click',()=>chooseChapter(i));
 t.addEventListener('keydown',e=>{let next=null;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==null){e.preventDefault();chooseChapter(next,true)}});
});
const nav=[...document.querySelectorAll('.sidebar nav a')];
const visibleSections=new Set();
const observer=new IntersectionObserver(entries=>{
 for(const e of entries){if(e.isIntersecting)visibleSections.add(e.target.id);else visibleSections.delete(e.target.id)}
 const current=nav.find(a=>a.hash&&visibleSections.has(a.hash.slice(1)));
 if(current)nav.forEach(a=>{const selected=a===current;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
},{rootMargin:'-8% 0px -58% 0px'});
nav.forEach(a=>{if(!a.hash||a.pathname!==location.pathname)return;const section=document.querySelector(a.hash);if(section)observer.observe(section)});
document.querySelector('.sidebar nav a.active')?.setAttribute('aria-current','location');
// Preserve direct links from the original concept's assets section.
if(location.hash==='#assets'||new URLSearchParams(location.search).has('render'))document.querySelector('#assets').open=true;
function openGalleryAnchor(){if(location.hash==='#more-work'||location.hash==='#digitization')location.replace('gallery.html');}
openGalleryAnchor();addEventListener('hashchange',openGalleryAnchor);
window.profile={chooseChapter,chapterCount:chapters.length,projectCount:Object.keys(projects).length};
