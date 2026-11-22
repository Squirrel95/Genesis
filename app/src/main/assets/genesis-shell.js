/* Genesis command shell · no data schema changes, no fake telemetry */
(function(){
'use strict';
const KEY='genesis.ui.v1';
const saved=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(_){return {}}})();
const settings={
  mode:['off','simple','hyper'].includes(saved.mode)?saved.mode:'simple',
  color:/^#[0-9a-fA-F]{6}$/.test(saved.color||'')?saved.color:'#6aff38',
  brightness:Number.isFinite(saved.brightness)?Math.min(100,Math.max(10,saved.brightness)):75,
  speed:Number.isFinite(saved.speed)?Math.min(100,Math.max(0,saved.speed)):50,
  effect:['static','rainbow','breathing','chase','pulse'].includes(saved.effect)?saved.effect:'rainbow'
};
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(settings))}catch(_){}};
function applyRGB(){
  document.body.classList.remove('rgb-off','rgb-simple','rgb-hyper');
  document.body.classList.add('rgb-'+settings.mode);
  document.body.dataset.rgbEffect=settings.effect;
  document.documentElement.style.setProperty('--rgb',settings.mode==='off'?'#a08345':settings.color);
  document.documentElement.style.setProperty('--rgb-brightness',String(settings.brightness/100));
  document.documentElement.style.setProperty('--rgb-speed',(14-(settings.speed/100)*11).toFixed(2)+'s');
  persist();
  document.querySelectorAll('[data-rgb-mode]').forEach(btn=>{
    const chosen=btn.dataset.rgbMode===settings.mode;
    btn.classList.toggle('selected',chosen);
    btn.setAttribute('aria-pressed',String(chosen));
  });
}
applyRGB();
const icons={
  home:'⌂',games:'🎮',ark:'▲',die:'7',projects:'⚒',model:'⬡',print:'▣',route:'◈',settings:'⚙'
};
const pages=[
  {id:'home',label:'HOME',icon:icons.home,action:()=>window.go('home')},
  {id:'games',label:'MY GAMES',icon:icons.games,action:()=>{if(typeof selectedGame!=='undefined'){selectedGame='';selectedFolder='';}window.go('games')}},
  {id:'ark',label:'ARK: ASA',icon:icons.ark,action:()=>{window.go('games');window.chooseGame('ARK: Survival Ascended')}},
  {id:'die',label:'7 DAYS TO DIE',icon:icons.die,action:()=>{window.go('games');window.chooseGame('7D2D')}},
  {id:'projects',label:'PROJECTS',icon:icons.projects,action:()=>window.go('projects')},
  {id:'model',label:'3D / MODEL FORGE',icon:icons.model,planned:true},
  {id:'print',label:'3D PRINTING',icon:icons.print,planned:true},
  {id:'route',label:'ROUTES',icon:icons.route,planned:true},
  {id:'settings',label:'SETTINGS',icon:icons.settings,action:()=>window.go('settings')}
];
let current='home';
const backdrop=document.createElement('div');backdrop.className='genesis-menu-backdrop';backdrop.setAttribute('aria-hidden','true');
const toggle=document.createElement('button');toggle.className='genesis-menu-toggle';toggle.type='button';toggle.setAttribute('aria-controls','genesis-sidepanel');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');toggle.innerHTML='<span class="squirrel" aria-hidden="true">🐿</span><span class="bars" aria-hidden="true">☰</span>';
const sidebar=document.createElement('aside');sidebar.id='genesis-sidepanel';sidebar.className='genesis-sidepanel';sidebar.setAttribute('aria-label','Genesis navigation');sidebar.setAttribute('inert','');
const header=document.createElement('div');header.className='genesis-side-header';
header.innerHTML='<button type="button" class="genesis-menu-close" aria-label="Close navigation">×</button><div class="genesis-emblem" aria-hidden="true">🐿</div><div class="studio">SQUIRREL<br>STUDIOS</div><div class="genesis-name">GENESIS</div>';
const list=document.createElement('nav');list.className='genesis-nav-list';list.setAttribute('aria-label','Modules');
pages.forEach(p=>{
  const b=document.createElement('button');b.className='genesis-nav-btn';b.type='button';
  b.dataset.nav=p.id;
  if(p.planned){b.disabled=true;b.title='Module planned — not connected';}
  const sym=document.createElement('span');sym.className='symbol';sym.textContent=p.icon;sym.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.className='label';label.textContent=p.label;b.append(sym,label);
  if(p.planned){const badge=document.createElement('span');badge.className='planned';badge.textContent='PLANNED';b.append(badge)}
  if(p.action)b.addEventListener('click',()=>{p.action();current=p.id;syncSelection();closeMenu()});
  list.append(b);
});
const foot=document.createElement('div');foot.className='genesis-side-footer';foot.innerHTML='<div class="genesis-gold-divider"></div><div>GENESIS · OFFLINE-FIRST</div>';
sidebar.append(header,list,foot);
document.body.append(backdrop,toggle,sidebar);
const closeBtn=header.querySelector('.genesis-menu-close');
function setOpen(open){
  document.body.classList.toggle('menu-open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');
  sidebar.toggleAttribute('inert',!open);
  if(open){closeBtn.focus({preventScroll:true});}
  else if(sidebar.contains(document.activeElement)){toggle.focus({preventScroll:true});}
}
const openMenu=()=>setOpen(true),closeMenu=()=>setOpen(false);
toggle.addEventListener('click',()=>setOpen(!document.body.classList.contains('menu-open')));
closeBtn.addEventListener('click',closeMenu);
backdrop.addEventListener('click',closeMenu);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))closeMenu()});
let startX=0,startY=0,tracking=false;
document.addEventListener('touchstart',e=>{
  if(e.touches.length!==1)return;
  const x=e.touches[0].clientX;
  if(x<38||document.body.classList.contains('menu-open')){startX=x;startY=e.touches[0].clientY;tracking=true}
},{passive:true});
document.addEventListener('touchend',e=>{
  if(!tracking||!e.changedTouches.length)return;tracking=false;
  const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;
  if(Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.35)return;
  if(dx>0&&!document.body.classList.contains('menu-open'))openMenu();
  else if(dx<0&&document.body.classList.contains('menu-open'))closeMenu();
},{passive:true});
function syncSelection(){
  document.querySelectorAll('.genesis-nav-btn').forEach(b=>{
    const active=b.dataset.nav===current;
    b.classList.toggle('active',active);
    if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
  });
}
const originalGo=window.go;
window.go=function(p){
  if(p!=='games')clearGameTimers();
  originalGo(p);
  current=p;
  syncSelection();
};
const originalChooseGame=window.chooseGame;
window.chooseGame=function(g){
  clearGameTimers();
  originalChooseGame(g);
  current=g==='ARK: Survival Ascended'?'ark':g==='7D2D'?'die':'games';
  syncSelection();
};
syncSelection();

// Existing storage diagnostics, backup, projects, tasks and ARK calculators remain untouched.
const settingsPanel=document.querySelector('#settings .panel');
if(settingsPanel){
  const section=document.createElement('section');section.className='genesis-rgb-section';
  section.innerHTML='<h3>RGB Lighting</h3><p class="sub">Choose the appearance. Effects pause with reduced motion.</p>'+
    '<div class="genesis-mode-buttons" role="group" aria-label="Lighting mode">'+
    '<button type="button" data-rgb-mode="off">OFF</button>'+
    '<button type="button" data-rgb-mode="simple">SIMPLE RGB</button>'+
    '<button type="button" data-rgb-mode="hyper">HYPER FUR</button></div>'+
    '<div class="genesis-rgb-controls" style="margin-top:14px">'+
    '<label>Effect<select class="field" id="genesisEffect" style="margin:0"><option value="rainbow">Rainbow Cycle</option><option value="breathing">Breathing</option><option value="chase">Chase / Flow</option><option value="pulse">Pulse</option><option value="static">Static Color</option></select></label>'+
    '<label>Static accent color<input type="color" id="genesisColor"></label>'+
    '<label>Brightness <output id="genesisBrightnessText"></output><input id="genesisBrightness" type="range" min="10" max="100" step="5"></label>'+
    '<label>Effect speed <output id="genesisSpeedText"></output><input id="genesisSpeed" type="range" min="0" max="100" step="5"></label></div>';
  settingsPanel.append(section);
  for(const b of section.querySelectorAll('[data-rgb-mode]'))b.addEventListener('click',()=>{settings.mode=b.dataset.rgbMode;applyRGB()});
  const eff=section.querySelector('#genesisEffect'),color=section.querySelector('#genesisColor'),bright=section.querySelector('#genesisBrightness'),speed=section.querySelector('#genesisSpeed');
  eff.value=settings.effect;color.value=settings.color;bright.value=String(settings.brightness);speed.value=String(settings.speed);
  function updateReadouts(){
    section.querySelector('#genesisBrightnessText').textContent=settings.brightness+'%';
    section.querySelector('#genesisSpeedText').textContent=settings.speed+'%';
  }
  eff.addEventListener('change',()=>{settings.effect=eff.value;applyRGB()});
  color.addEventListener('input',()=>{settings.color=color.value;applyRGB()});
  bright.addEventListener('input',()=>{settings.brightness=Number(bright.value);updateReadouts();applyRGB()});
  speed.addEventListener('input',()=>{settings.speed=Number(speed.value);updateReadouts();applyRGB()});
  updateReadouts();applyRGB();
}

// Game art uses bundled screenshots when present, falls back to Steam artwork online.
const catalog=[
  {id:'ark',title:'ARK: SURVIVAL ASCENDED',game:'ARK: Survival Ascended',steam:2399830},
  {id:'7d2d',title:'7 DAYS TO DIE',game:'7D2D',steam:251570},
  {id:'gta',title:'GTA V / FiveM',game:'GTA5',steam:271590},
  {id:'rdr2',title:'RED DEAD REDEMPTION 2',game:'RDR2',steam:1174180},
  {id:'fs22',title:'FARMING SIMULATOR 22',game:'FS22',steam:1248130},
  {id:'helix',title:'HELIX',game:'HELIX',steam:null}
];
const imageFiles=Array.from({length:3},(_,i)=>i+1);
const cachedFav=(()=>{try{return new Set(JSON.parse(localStorage.getItem('genesis.favorites.v1')||'[]'))}catch(_){return new Set()}})();
const gameTimers=new Set();
const clearGameTimers=()=>{gameTimers.forEach(clearTimeout);gameTimers.clear()};
let gameFilter='';
const oldRenderGames=window.renderGames;
const topSearch=document.createElement('input');
topSearch.type='search';topSearch.className='field';topSearch.id='genesisCardSearch';topSearch.placeholder='Search game library';topSearch.setAttribute('aria-label','Search game library');
const gameRoot=document.getElementById('gameItems');
gameRoot.parentElement.insertBefore(topSearch,gameRoot);
topSearch.addEventListener('input',()=>{gameFilter=topSearch.value.trim().toLowerCase();window.renderGames()});
const keyMouse='<svg viewBox="0 0 28 26" aria-hidden="true"><rect x="1.5" y="4" width="17" height="13" rx="2"/><path d="M4 8h2m2 0h2m2 0h2M5 12h10M6 14h8"/><rect x="21" y="7" width="6" height="12" rx="3"/><path d="M24 7v5"/></svg>';
const xbox='<svg viewBox="0 0 28 26" aria-hidden="true"><circle cx="14" cy="13" r="11"/><path d="M7 5c3 1 5 3 7 6 2-3 4-5 7-6M7 20c1-4 3-7 7-9 4 2 6 5 7 9"/></svg>';
const textNode=(name,cls,text)=>{const e=document.createElement(name);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
function makeCard(info,index){
  const card=textNode('article','game-card');card.setAttribute('aria-label',info.title);
  const frame=textNode('div','game-art-frame');
  const fallback=textNode('div','game-art-fallback');
  const fallbackTitle=textNode('span','',info.title);fallback.append(fallbackTitle);frame.append(fallback);
  const pic=document.createElement('img');pic.alt=info.title+' artwork';pic.loading='lazy';pic.decoding='async';
  pic.className='is-loading';frame.append(pic);
  const dots=textNode('div','game-art-dots');const dotList=[];
  for(let i=0;i<3;i++){const d=document.createElement('span');dots.append(d);dotList.push(d)}
  let slide=(index+Math.floor(Math.random()*3))%3;
  let fallbacksTried=0;
  function localUrl(){return 'game-art/'+info.id+'-'+(slide+1)+'.jpg'}
  function remoteUrl(){const assets=['header.jpg','library_hero.jpg','capsule_616x353.jpg'];return info.steam?'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/'+info.steam+'/'+assets[slide]:''}
  function displaySlide(){
    pic.classList.add('is-loading');fallbacksTried=0;
    dotList.forEach((d,i)=>d.classList.toggle('current',i===slide));
    pic.src=localUrl();pic.alt=info.title+' artwork '+(slide+1)+' of 3';
  }
  pic.addEventListener('error',()=>{
    if(fallbacksTried===0&&remoteUrl()){fallbacksTried=1;pic.src=remoteUrl()}
    else{pic.removeAttribute('src');pic.classList.add('is-loading')}
  });
  pic.addEventListener('load',()=>{pic.classList.remove('is-loading')});
  function cycle(dir){slide=(slide+dir+3)%3;displaySlide();schedule()}
  let task;
  function schedule(){
    if(task){clearTimeout(task);gameTimers.delete(task);}
    if(document.hidden||document.body.classList.contains('low'))return;
    // Stagger every card: no synchronized full-gallery invalidations.
    const wait=6500+Math.floor(Math.random()*5300)+(index*480);
    task=setTimeout(()=>{gameTimers.delete(task);if(!document.hidden){slide=(slide+(Math.random()<.5?1:2))%3;displaySlide();schedule()}},wait);
    gameTimers.add(task);
  }
  for(const [direction,cls,glyph,label] of [[-1,'prev','‹','Previous artwork'],[1,'next','›','Next artwork']]){
    const b=textNode('button','game-art-nav '+cls,glyph);b.type='button';b.setAttribute('aria-label',label+' for '+info.title);
    b.addEventListener('click',e=>{e.stopPropagation();cycle(direction)});frame.append(b);
  }
  const fav=textNode('button','game-fav',cachedFav.has(info.id)?'★':'☆');fav.type='button';fav.setAttribute('aria-label','Toggle favorite for '+info.title);
  fav.setAttribute('aria-pressed',String(cachedFav.has(info.id)));
  fav.addEventListener('click',()=>{
    if(cachedFav.has(info.id))cachedFav.delete(info.id);else cachedFav.add(info.id);
    fav.textContent=cachedFav.has(info.id)?'★':'☆';fav.setAttribute('aria-pressed',String(cachedFav.has(info.id)));
    try{localStorage.setItem('genesis.favorites.v1',JSON.stringify([...cachedFav]))}catch(_){}
  });
  frame.append(fav,dots);
  const foot=textNode('div','game-card-foot');
  const title=textNode('button','game-title-btn',info.title);title.type='button';title.setAttribute('aria-label','Open '+info.title);
  title.addEventListener('click',()=>window.chooseGame(info.game));
  const inputs=textNode('div','game-input-icons');
  const kb=textNode('span','hardware-icon');kb.innerHTML=keyMouse;kb.setAttribute('title','Mouse and keyboard');kb.setAttribute('aria-label','Mouse and keyboard');
  const xb=textNode('span','hardware-icon');xb.innerHTML=xbox;xb.setAttribute('title','Xbox controller');xb.setAttribute('aria-label','Xbox controller');
  inputs.append(kb,xb);foot.append(title,inputs);
  card.append(frame,foot,textNode('div','game-card-note','3 rotating images · Open companion folders'));
  displaySlide();schedule();
  return card;
}
window.renderGames=function(){
  clearGameTimers();
  const g=typeof selectedGame!=='undefined'?selectedGame:'';
  const f=typeof selectedFolder!=='undefined'?selectedFolder:'';
  topSearch.classList.toggle('hidden',!!g||!!f);
  if(g||f){oldRenderGames();return;}
  const root=document.getElementById('gameItems');
  root.replaceChildren();document.getElementById('gameTitle').textContent='My Games';
  document.getElementById('gameSearch').classList.add('hidden');
  const heading=textNode('div','genesis-page-heading');
  heading.append(textNode('span','','🎮'),textNode('strong','','MY GAMES'));
  const toolbar=textNode('div','genesis-gallery-toolbar');
  const matches=catalog.filter(x=>x.title.toLowerCase().includes(gameFilter)||x.game.toLowerCase().includes(gameFilter));
  toolbar.append(textNode('span','genesis-counter',matches.length+' GAMES'));
  const grid=textNode('div','genesis-game-grid');
  root.append(heading,toolbar,grid);
  if(!matches.length){grid.append(textNode('p','empty','No games match your search.'));return;}
  matches.forEach((x,i)=>grid.append(makeCard(x,i)));
};
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){clearGameTimers();}
  else if(typeof page!=='undefined'&&page==='games'&&typeof selectedGame!=='undefined'&&!selectedGame)window.renderGames();
});
if(typeof page!=='undefined'&&page==='games')window.renderGames();
})();
