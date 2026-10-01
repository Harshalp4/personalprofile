import { projects as featuredProjects } from './profile-data.js';
import { galleryProjects, digitizationProjects } from './gallery-projects.js';
const projects={...featuredProjects,...galleryProjects,...digitizationProjects};

const paths={
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1z"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 gallery:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
 journey:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h9a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h9"/>',
 file:'<path d="M13 3H5v18h14V9zm0 0v6h6M8 13h8m-8 4h6"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>'
};
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+paths[el.dataset.icon]+'</svg>'});

// Display order and filter groups for every project.
const catalogue=[
 ['revora',['ai'],'AI agents & automation','assets/revora-agents.webp'],
 ['lending',['fintech'],null,null],
 ['presso',['mobile'],'Consumer product',null,['150+ orders / month','80% repeat rate · live on iOS & Android','tile-teal']],
 ['authoring',['enterprise'],'Enterprise platform',null,['~60% faster','large-template loads · Big Four firm','tile-lilac']],
 ['clinic',['healthcare','ai','mobile'],'Healthcare & AI',null,['AI scribing','for clinicians · Azure + iOS TestFlight','tile-sand']],
 ['trackon',['ai','mobile'],'On-device AI & mobile',null,['On-device AI','face-recognition attendance · iOS & Android','tile-sage']],
 ['migration',['cloud'],null,null],
 ['ehr',['healthcare'],null,null],
 ['etl',['cloud'],null,null],
 ['search',['cloud','ai'],null,null],
 ['vitalscan',['healthcare'],null,null],
 ['fintasense',['fintech'],null,null],
 ['dvr',['ai'],null,null],
 ['business',['enterprise'],null,null],
 ['scanning',['documents'],null,null],
 ['documents',['documents'],null,null]
];
const shortIntro=p=>p.intro.length>170?p.intro.slice(0,p.intro.lastIndexOf(' ',165))+'…':p.intro;
const grid=document.getElementById('gallery-grid');
for(const [id,groups,category,image,tile] of catalogue){
 const p=projects[id];
 const card=document.createElement('article');
 card.className='gallery-card';card.dataset.groups=groups.join(' ');
 const img=image||(p.image&&'assets/projects/'+p.image+'.webp');
 const fig=document.createElement('figure');fig.className='gallery-visual';
 if(img){const i=document.createElement('img');i.src=img;i.alt=p.imageAlt||'';i.width=1536;i.height=1024;i.loading='lazy';i.decoding='async';fig.append(i);
  const c=document.createElement('figcaption');c.textContent='Concept illustration';fig.append(c);}
 else{const [big,small,tone]=tile||[p.title,'','tile-teal'];fig.classList.add('gallery-type-tile',tone);const s=document.createElement('strong');s.textContent=big;const t=document.createElement('span');t.textContent=small;fig.append(s,t);}
 if(p.status){const s=document.createElement('span');s.className='gallery-status';s.textContent=p.status;fig.append(s);}
 const copy=document.createElement('div');copy.className='gallery-copy';
 const cat=document.createElement('span');cat.className='gallery-category';cat.textContent=p.category||category;
 const h=document.createElement('h3');h.textContent=p.title;
 const d=document.createElement('p');d.className='gallery-description';d.textContent=shortIntro(p);
 const tags=document.createElement('div');tags.className='tag-list';tags.append(...(p.cardTags||p.tags.slice(0,3)).map(t=>{const s=document.createElement('span');s.textContent=t;return s}));
 const btn=document.createElement('button');btn.className='gallery-open';btn.dataset.project=id;btn.setAttribute('aria-label','View '+p.title+' details');
 btn.innerHTML='<span>View project details</span><span aria-hidden="true">+</span>';
 copy.append(cat,h,d,tags);
 if(p.caseStudy){const a=document.createElement('a');a.className='gallery-case-link';a.href=p.caseStudy;a.textContent='Read the case study →';copy.append(a);}
 copy.append(btn);card.append(fig,copy);grid.append(card);
}

const count=document.getElementById('gallery-total');
const filters=[...document.querySelectorAll('[data-filter]')];
function applyFilter(f){
 let shown=0;
 grid.querySelectorAll('.gallery-card').forEach(c=>{const on=f==='all'||c.dataset.groups.split(' ').includes(f);c.hidden=!on;if(on)shown++});
 filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===f)));
 count.textContent=shown+(shown===1?' project':' projects');
}
filters.forEach(b=>b.addEventListener('click',()=>{applyFilter(b.dataset.filter);history.replaceState(null,'',b.dataset.filter==='all'?location.pathname:'#'+b.dataset.filter)}));
const initial=location.hash.slice(1);
applyFilter(filters.some(b=>b.dataset.filter===initial)?initial:'all');

const setText=(id,value)=>document.getElementById(id).textContent=value;
const elements=(tag,items)=>items.map(value=>{const el=document.createElement(tag);el.textContent=value;return el});
const dialog=document.querySelector('#project-dialog');
grid.addEventListener('click',e=>{
 const button=e.target.closest('[data-project]');if(!button)return;
 const p=projects[button.dataset.project];const entry=catalogue.find(c=>c[0]===button.dataset.project);
 setText('project-title',p.title);setText('project-type',p.type);setText('project-body',p.intro);setText('project-outcome',p.outcome||p.scope||'');
 const visual=document.querySelector('#project-visual');const src=entry[3]||(p.image&&'assets/projects/'+p.image+'.webp');visual.hidden=!src;
 if(src){const img=visual.querySelector('img');img.src=src;img.alt=p.imageAlt||'';}
 document.querySelector('#project-points').replaceChildren(...elements('li',p.points));
 document.querySelector('#project-tags').replaceChildren(...elements('span',p.tags));{const cs=document.querySelector('#project-case');cs.hidden=!p.caseStudy;if(p.caseStudy)cs.href=p.caseStudy;}dialog.showModal();dialog.scrollTop=0;
});
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
