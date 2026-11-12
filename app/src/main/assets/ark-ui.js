/* Genesis ARK species guide: fully local text, notes and filters; photos currently require connectivity. */
window.renderArkModule=function(root,folder){
const all=window.ARK_SPECIES||[];
const para=(v,cls)=>{const p=document.createElement('p');p.textContent=v;if(cls)p.className=cls;return p};
if(!all.length){root.append(para('ARK reference data unavailable. This build needs ark-data.js.','empty'));return}
root.append(para('Taming, uses, breeding, sources and notes are saved locally. Reference photos currently require internet.','sub'));
const search=document.createElement('input');search.className='field';search.placeholder='Search species, taming food, or uses';root.append(search);
const filters=document.createElement('div');filters.className='ark-filters';
function selector(items,label){const s=document.createElement('select');s.className='field';s.setAttribute('aria-label',label);for(const x of items){const o=document.createElement('option');o.value=x;o.textContent=x;s.append(o)}filters.append(s);return s}
const map=selector(['All maps','Ragnarok','Scorched Earth','Lost Colony','Valguero','Astraeos'],'Map');
const babies=selector(['All baby types','Egg','Live birth','Plant / seed-grown baby','Does not breed'],'Reproduction');
root.append(filters);
const status=para('','sub');root.append(status);const list=document.createElement('div');root.append(list);
function render(){list.replaceChildren();const q=search.value.toLowerCase().trim();const selected=all.filter(s=>(map.value==='All maps'||s.maps.includes(map.value))&&(babies.value==='All baby types'||babies.value===s.baby)&&(!q||[s.name,s.food,s.tame,s.baby,s.uses,s.maps.join(' ')].join(' ').toLowerCase().includes(q)));
status.textContent=selected.length+' checked entries · reviewed 2026-11-12 · amounts vary by creature level and server rates';
for(const s of selected){
const card=document.createElement('article');card.className='ark-card';
const top=document.createElement('div');top.className='ark-top';const pict=document.createElement('div');pict.className='ark-picture';const pic=document.createElement('img');pic.alt='Reference photo: '+s.name;pic.loading='lazy';pic.src=s.image;const offline=para('Photo needs internet','ark-offline');offline.hidden=true;pic.onerror=()=>{pic.remove();offline.hidden=false};pict.append(pic,offline);
const title=document.createElement('div');const h=document.createElement('h3');h.textContent=s.name;title.append(h,para(s.maps.join(' · '),'ark-caption'),para('Taming: '+s.tame,'ark-caption'),para('Babies: '+s.baby,'ark-caption'));top.append(pict,title);card.append(top);
const detail=document.createElement('details');detail.open=folder==='Taming Walkthroughs';
const sum=document.createElement('summary');sum.textContent='Open facts, walkthrough and my notes';detail.append(sum);
function section(heading,lines){const h=document.createElement('h4');h.textContent=heading;detail.append(h);for(const line of lines)detail.append(para(line,'ark-line'))}
section('Exact taming method',['Method: '+s.tame,'Preferred food/items: '+s.food,'Saddle: '+s.saddle]);
const ol=document.createElement('ol');for(const line of s.steps){const li=document.createElement('li');li.textContent=line;ol.append(li)}detail.append(ol);
section('What it is good for',[s.uses]);
section('Breeding and babies',['Type: '+s.baby,'Breedable: '+s.breed,s.care]);
if(s.extra)section('Special warnings',[s.extra]);
const link=document.createElement('a');link.className='ark-source';link.href=s.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Read source: ARK Official Community Wiki';detail.append(link);
const label=document.createElement('label');label.textContent='My notes — this creature';label.className='ark-notelabel';detail.append(label);const note=document.createElement('textarea');note.className='field';note.rows=3;note.placeholder='Your level, location, stats, breeding results...';const key='genesis.ark.notes.'+s.id;try{note.value=localStorage.getItem(key)||''}catch(e){}
note.onchange=()=>{try{localStorage.setItem(key,note.value)}catch(e){}};detail.append(note);
const save=document.createElement('button');save.className='ghost';save.textContent='Save note';save.onclick=()=>{try{localStorage.setItem(key,note.value);save.textContent='Saved ✓'}catch(e){save.textContent='Storage unavailable'}};detail.append(save);
card.append(detail);list.append(card)}
if(!selected.length)list.append(para('No verified species match this search.','empty'))}
search.oninput=render;map.onchange=render;babies.onchange=render;render()};
(function(){const style=document.createElement('style');style.textContent='.ark-filters{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ark-card{margin:10px 0;padding:13px;border-radius:15px;border:1px solid #39573d;background:#0b160f}.ark-top{display:flex;align-items:center;gap:12px}.ark-top h3{margin:0 0 6px;font-size:17px}.ark-caption{margin:4px 0;color:#a7c0ab;font-size:12px}.ark-picture{flex:0 0 92px;width:92px;height:100px;border-radius:12px;overflow:hidden;border:1px solid #496f4f;background:#0b100e;display:grid;place-items:center}.ark-picture img{width:100%;height:100%;object-fit:contain}.ark-offline{font-size:11px;color:#9bac9e;text-align:center}.ark-card details{margin-top:12px;border-top:1px solid #34543a;padding-top:12px}.ark-card summary{cursor:pointer;color:#c8ffa4;font-weight:700}.ark-card h4{font-size:14px;color:#b3ff42;margin:17px 0 6px}.ark-line{line-height:1.5;margin:5px 0}.ark-card ol{padding-left:20px;line-height:1.5}.ark-card li{margin:6px 0}.ark-source{display:block;margin:15px 0;color:#d2ffb2}.ark-notelabel{display:block;margin:12px 0 7px;font-weight:700}@media(max-width:380px){.ark-filters{grid-template-columns:1fr}.ark-picture{flex-basis:72px;width:72px;height:85px}}';document.head.append(style)})();