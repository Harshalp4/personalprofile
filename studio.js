import * as THREE from 'three';
import { motionState, setMotionPaused, onMotionChange } from './motion-preferences.js';
import { GLTFExporter } from './vendor/GLTFExporter.js';
import { RoundedBoxGeometry } from './vendor/RoundedBoxGeometry.js';

const canvas = document.querySelector('#scene');
const params = new URLSearchParams(location.search);
const renderOnly = params.has('render');
if (renderOnly) document.body.classList.add('render-only');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionState.paused, visible = true, hidden = document.hidden, active = 'desk', elapsed = 0;
const duration = 8, tau = Math.PI * 2;
const descriptions = {
  desk: ['Welcome desk', 'welcome-desk', 'A laptop eases open, the plant sways, and a small star floats. Use it beside your introduction.'],
  orbit: ['Skill orbit', 'skill-orbit', 'Four soft blocks orbit a calm central hub. Use this to introduce your connected skills without rating them with arbitrary percentages.'],
  cards: ['Project reveal', 'project-reveal', 'Layered cards gently separate to reveal a project. Use the motion on focus or hover, with the project title always readable.']
};
const mats = {};
for (const [name, color] of Object.entries({ navy: '#294459', teal: '#55989f', ice: '#d8e8ed', white: '#f1f5ef', sage: '#87a994', leaf: '#5e8b79', cream: '#ead9b6', lavender: '#a1a5cb', screen: '#203e50', blue: '#87b3c5', pink: '#d4b0a3', dark: '#254555' })) {
  mats[name] = new THREE.MeshStandardMaterial({ color, roughness: .48, metalness: .06 });
}
const geos = {};
function roundedGeometry(w, h, d, r = .1) {
  const key = [w,h,d,r].join('/'); if (geos[key]) return geos[key];
  if(d>.3 && h>.3 && w>.3) return geos[key]=new RoundedBoxGeometry(w,h,d,5,Math.min(r,w/2,h/2,d/2));
  r = Math.min(r,w/2-.001,h/2-.001,d/2+.025);
  const s = new THREE.Shape(), x=-w/2,y=-h/2;
  s.moveTo(x+r,y); s.lineTo(x+w-r,y); s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r); s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h); s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r); s.quadraticCurveTo(x,y,x+r,y);
  const b=Math.min(.035,d/4,r/2);
  const g=new THREE.ExtrudeGeometry(s,{depth:d-2*b,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:3,steps:1,curveSegments:6});
  g.translate(0,0,-d/2+b); g.computeVertexNormals(); return geos[key]=g;
}
function mesh(geo, mat, p=[0,0,0], parent) {
  const m=new THREE.Mesh(geo, typeof mat==='string'?mats[mat]:mat); m.position.set(...p); m.castShadow=true; m.receiveShadow=true; parent.add(m); return m;
}
function box(w,h,d,mat,p,parent,r=.12){return mesh(roundedGeometry(w,h,d,r),mat,p,parent)}
function sphere(r,mat,p,parent,scale=[1,1,1]){const m=mesh(new THREE.SphereGeometry(r,24,16),mat,p,parent);m.scale.set(...scale);return m}
function cylinder(a,b,h,mat,p,parent){return mesh(new THREE.CylinderGeometry(a,b,h,48),mat,p,parent)}
function group(name,p,parent){const g=new THREE.Group();g.name=name;g.position.set(...p);parent.add(g);return g}
function tube(points,r,mat,parent){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),32,r,10,false),mat,[0,0,0],parent)}
function star(parent,p){const s=new THREE.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5+Math.PI/2,r=i%2?.18:.38; const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:.13,bevelEnabled:true,bevelSize:.055,bevelThickness:.045,bevelSegments:3,steps:1});g.center();return mesh(g,'cream',p,parent)}
function base(root){cylinder(2.68,2.72,.21,'blue',[0,.02,0],root);cylinder(2.58,2.66,.11,'ice',[0,.17,0],root)}
function deskScene(){
  const root=new THREE.Group();root.name='WelcomeDesk';base(root);
  const table=box(4.25,.18,1.75,'blue',[0,1.32,0],root,.1);
  for (const x of [-1.73,1.73]) for(const z of [-.52,.52]) cylinder(.075,.1,1.04,'navy',[x,.72,z],root);
  box(1.65,.095,1.08,'navy',[-.05,1.46,.12],root,.09);
  box(.5,.012,.26,'blue',[-.05,1.514,.39],root,.025);
  for(let x=0;x<7;x++)for(let z=0;z<3;z++)box(.15,.024,.09,'blue',[-.66+x*.205,1.52,-.23+z*.145],root,.018);
  const lid=group('LaptopLid',[-.05,1.5,-.41],root);
  box(1.65,1.04,.105,'navy',[0,.5,0],lid,.09);
  box(1.45,.84,.02,'screen',[0,.5,.068],lid,.065);
  const windowPanel=box(1.12,.61,.018,'ice',[0,.51,.09],lid,.035);
  for(let i=0;i<3;i++)sphere(.025,['teal','lavender','pink'][i],[-.46+.08*i,.74,.11],lid);
  box(.28,.055,.02,'teal',[-.28,.57,.112],lid,.02);
  box(.6,.035,.02,'blue',[-.13,.44,.112],lid,.013);
  box(.44,.035,.02,'lavender',[-.21,.34,.112],lid,.013);
  sphere(.11,'teal',[.37,.4,.13],lid,[1,1,.2]);
  const lamp=group('DeskLamp',[-1.62,1.46,-.16],root);
  cylinder(.31,.35,.09,'cream',[0,0,0],lamp);
  tube([[0,.04,0],[0,.68,0],[.08,1.15,0],[.45,1.2,0]],.045,'cream',lamp);
  const shade=cylinder(.16,.33,.31,'cream',[.47,1.06,0],lamp);shade.rotation.z=.1;
  const bulbmat=new THREE.MeshStandardMaterial({color:'#fff5d8',emissive:'#f0cd8d',emissiveIntensity:.8,roughness:.5});
  sphere(.13,bulbmat,[.48,.92,0],lamp,[1,.55,1]);
  const plant=group('Plant', [1.47,1.46,-.1],root);
  cylinder(.29,.23,.44,'navy',[0,.2,0],plant);
  cylinder(.25,.25,.035,'dark',[0,.423,0],plant);
  const leaves=group('SwayingLeaves',[0,.43,0],plant);
  for(let i=0;i<7;i++){const a=i*2.399;const h=.5+(i%3)*.17;const tip=[Math.cos(a)*.34,h,Math.sin(a)*.29];tube([[0,0,0],[tip[0]*.3,h*.55,tip[2]*.4],tip],.018,'leaf',leaves);const leaf=sphere(.22,i%2?'sage':'leaf',tip,leaves,[.62,1.52,.37]);leaf.rotation.set(.3*Math.sin(a),a,-.6*Math.cos(a))}
  cylinder(.19,.16,.3,'white',[.91,1.57,.55],root);const handle=mesh(new THREE.TorusGeometry(.095,.033,10,24),'white',[1.105,1.6,.55],root);handle.rotation.y=.4;
  box(.58,.11,.46,'lavender',[-1.48,1.47,.61],root,.04);box(.54,.075,.44,'ice',[-1.47,1.57,.61],root,.035);
  const floating=group('WelcomeStar',[1,2.95,-.36],root);star(floating,[0,0,0]);
  sphere(.09,'lavender',[-1.7,2.95,-.3],root);sphere(.055,'ice',[1.62,2.8,-.55],root);
  return {root, animate(t){const p=t/duration*tau;lid.rotation.x=-.2-.12*(1-Math.cos(p));leaves.rotation.z=.05*Math.sin(p);leaves.rotation.x=.025*Math.sin(p);floating.position.y=2.95+.14*Math.sin(p);floating.rotation.y=.28*Math.sin(p);floating.rotation.z=.1*Math.sin(p);}, nodes:[lid,leaves,floating]};
}
function orbitScene(){
  const root=new THREE.Group();root.name='SkillOrbit';base(root);
  cylinder(.75,.96,.23,'navy',[0,.37,0],root);cylinder(.59,.7,.15,'teal',[0,.53,0],root);
  const hub=group('SkillHub',[0,1.62,0],root);
  sphere(.67,'teal',[0,0,0],hub);
  for(const side of [-1,1]){const mark=group('CodeBracket'+side,[side*.2,0,.61],hub);const a=box(.22,.06,.055,'ice',[0,.07,0],mark,.025);a.rotation.z=side*Math.PI/4;const b=box(.22,.06,.055,'ice',[0,-.07,0],mark,.025);b.rotation.z=-side*Math.PI/4;}
  const ring=mesh(new THREE.TorusGeometry(1.72,.024,10,100),'white',[0,1.62,0],root);ring.rotation.x=Math.PI/2;
  const ring2=mesh(new THREE.TorusGeometry(1.3,.016,8,90),'blue',[0,1.62,0],root);ring2.rotation.set(.75,.25,.2);
  const nodes=[];
  for(let i=0;i<4;i++){const g=group('SkillBlock'+i,[0,0,0],root);box(.67,.67,.67,['lavender','ice','cream','navy'][i],[0,0,0],g,.2);const front=group('SkillMark'+i,[0,0,.38],g);if(i===0){for(let j=0;j<3;j++)sphere(.055,'white',[-.14+j*.14,0,0],front,[1,1,.4])}else if(i===1){box(.24,.07,.03,'teal',[0,0,0],front,.025);box(.07,.24,.03,'teal',[0,0,0],front,.025)}else if(i===2){sphere(.1,'navy',[0,0,0],front,[1,1,.3])}else{box(.26,.07,.03,'ice',[0,.07,0],front,.02);box(.18,.055,.03,'teal',[-.04,-.08,0],front,.02)}nodes.push(g)}
  return {root,animate(t){const p=t/duration*tau;hub.position.y=1.62+.08*Math.sin(p);hub.rotation.y=.15*Math.sin(p);nodes.forEach((n,i)=>{const a=p+i*tau/4;n.position.set(Math.cos(a)*1.72,1.62+.38*Math.sin(a*2+i*.5),Math.sin(a)*1.72);n.rotation.set(.12*Math.sin(a),-a+.5,.1*Math.sin(a));})},nodes:[hub,...nodes]};
}
function cardsScene(){
  const root=new THREE.Group();root.name='ProjectReveal';base(root);
  const stack=group('ProjectStack',[0,1.12,0],root);stack.rotation.x=-.13;stack.rotation.y=-.2;
  const cards=[];
  for(let i=0;i<3;i++){const card=group('ProjectCard'+i,[0,i*.26,-i*.28],stack);box(2.75,1.82,.15,['ice','lavender','teal'][i],[0,0,0],card,.13);cards.push(card)}
  const c=cards[0];box(2.43,1.16,.02,'navy',[0,.13,.106],c,.07);
  for(let i=0;i<3;i++)sphere(.04,['teal','cream','lavender'][i],[-1.07+i*.13,.57,.13],c,[1,1,.4]);
  box(.82,.11,.03,'ice',[-.5,.28,.14],c,.04);box(1.37,.045,.03,'blue',[-.23,.05,.14],c,.02);box(.95,.045,.03,'blue',[-.44,-.08,.14],c,.02);
  box(.4,.16,.035,'teal',[-.72,-.3,.14],c,.04);sphere(.27,'lavender',[.68,.16,.16],c,[1,1,.45]);sphere(.16,'cream',[.86,-.05,.2],c,[1,1,.5]);
  box(.96,.08,.025,'navy',[-.63,-.66,.108],c,.025);box(.35,.1,.025,'teal',[.92,-.66,.108],c,.03);
  const sparkle=group('ProjectSpark',[1.9,2.7,.1],root);star(sparkle,[0,0,0]);sparkle.scale.setScalar(.64);
  return {root,animate(t){const p=t/duration*tau,open=(1-Math.cos(p))/2;cards.forEach((c,i)=>{c.position.set(i*.12*open,i*(.26+.22*open),-i*(.28+.13*open));c.rotation.z=-i*.045*open});stack.position.y=1.5+.08*Math.sin(p);stack.rotation.y=-.2+.13*Math.sin(p);sparkle.rotation.z=.16*Math.sin(p);sparkle.position.y=2.7+.11*Math.sin(p);},nodes:[stack,...cards,sparkle]};
}
const models={desk:deskScene(),orbit:orbitScene(),cards:cardsScene()};
for(const [key,m] of Object.entries(models)){
  const tracks=[],samples=193,times=Array.from({length:samples},(_,i)=>duration*i/(samples-1));
  const values=m.nodes.map(()=>({p:[],q:[]}));
  for(const t of times){m.animate(t);m.nodes.forEach((n,i)=>{values[i].p.push(...n.position.toArray());values[i].q.push(...n.quaternion.toArray())})}
  m.nodes.forEach((n,i)=>{tracks.push(new THREE.VectorKeyframeTrack(n.name+'.position',times,values[i].p));tracks.push(new THREE.QuaternionKeyframeTrack(n.name+'.quaternion',times,values[i].q))});
  m.clip=new THREE.AnimationClip(descriptions[key][0]+' • 8 second loop',duration,tracks);m.animate(0);
}
let renderer, camera, scene, pointer={x:0,y:0}, last=performance.now();
try {
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true});
  renderer.setPixelRatio(renderOnly?1:Math.min(devicePixelRatio,1.7));renderer.setClearColor('#c6dce1');renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.5;
  scene=new THREE.Scene();scene.background=new THREE.Color('#c6dce1');
  camera=new THREE.OrthographicCamera(-3.6,3.6,3.6,-3.6,.1,80);camera.position.set(5,4.4,7);camera.lookAt(0,1.25,0);
  scene.add(new THREE.HemisphereLight('#f5fbff','#7a9199',2.2));
  const sun=new THREE.DirectionalLight('#fff4dc',4.2);sun.position.set(-3,7,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-5,right:5,top:6,bottom:-5,near:.5,far:20});sun.shadow.normalBias=.025;sun.shadow.bias=-.0003;sun.shadow.radius=5;scene.add(sun);
  const fill=new THREE.DirectionalLight('#d6ebff',2);fill.position.set(5,3,-3);scene.add(fill);
  const floor=mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:'#c6dce1',roughness:1}),[0,-.12,0],scene);floor.rotation.x=-Math.PI/2;floor.castShadow=false;
  for(const [k,m] of Object.entries(models)){scene.add(m.root);m.root.visible=k===active}
  const size=()=>{const r=canvas.parentElement.getBoundingClientRect();if(r.width<1||r.height<1)return;renderer.setSize(r.width,r.height,false);const aspect=r.width/r.height;const h=renderOnly?4.9:(aspect<1.3?5.85:5.1);camera.left=-h*aspect/2;camera.right=h*aspect/2;camera.top=h/2;camera.bottom=-h/2;camera.updateProjectionMatrix();draw(elapsed)};
  new ResizeObserver(size).observe(canvas.parentElement);size();
  canvas.addEventListener('pointermove',e=>{if(paused||reduced.matches)return;const b=canvas.getBoundingClientRect();pointer={x:(e.clientX-b.left)/b.width-.5,y:(e.clientY-b.top)/b.height-.5}});
  canvas.addEventListener('pointerleave',()=>pointer={x:0,y:0});
  new IntersectionObserver(([e])=>{visible=e.isIntersecting}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{hidden=document.hidden;last=performance.now()});
  function tick(now){const dt=Math.min((now-last)/1000,.1);last=now;if(!paused&&visible&&!hidden&&!renderOnly){elapsed+=dt;draw(elapsed)}requestAnimationFrame(tick)}requestAnimationFrame(tick);
} catch(error) { console.error(error);document.querySelector('#scene-fallback').hidden=false; }
function draw(t){if(!renderer)return;models[active].animate(t%duration);models[active].root.rotation.y=renderOnly?-.08:pointer.x*.22;camera.position.set(5,4.4+(renderOnly?0:pointer.y*.4),7);camera.lookAt(0,1.25,0);renderer.render(scene,camera)}
function select(key){if(!models[key])return;active=key;elapsed=0;for(const [k,m]of Object.entries(models))m.root.visible=k===key;document.querySelectorAll('[data-scene]').forEach(b=>{const yes=b.dataset.scene===key;b.classList.toggle('selected',yes);b.setAttribute('aria-pressed',String(yes))});const [name,file,desc]=descriptions[key];document.querySelector('#scene-name').textContent=name.toUpperCase();document.querySelector('#motion-description').textContent=desc;canvas.setAttribute('aria-label',name+' animated 3D concept');document.querySelector('#video-download').href='assets/'+file+'.mp4';document.querySelector('#model-download').href='assets/'+file+'.glb';draw(0)}
document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.scene)));
function updatePause(){pointer={x:0,y:0};draw(elapsed)}
onMotionChange(state=>{paused=state.paused;updatePause()});
if(renderOnly)select(params.get('render'));
window.studio={ready:Boolean(renderer),select,renderAt(t){draw(t);return canvas.toDataURL('image/png')},setPaused(value){setMotionPaused(value)},getState(){return {active,paused,elapsed,visible,rendered:Boolean(renderer)}},async exportGLB(key){const m=models[key];const oldVis=m.root.visible;m.root.visible=true;m.animate(0);const oldY=m.root.rotation.y;m.root.rotation.y=0;const exporter=new GLTFExporter();const buffer=await exporter.parseAsync(m.root,{binary:true,animations:[m.clip],onlyVisible:false});m.root.rotation.y=oldY;m.root.visible=oldVis;draw(elapsed);return Array.from(new Uint8Array(buffer))}};
