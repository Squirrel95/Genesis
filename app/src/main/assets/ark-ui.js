/* ARK compendium: offline species facts, indexed source links, local notes; online creature icons. */
window.renderArkModule=function(root,folder){
const species=window.ARK_SPECIES||[],known=species.filter(x=>!!x.tame).length;
const text=(value,css)=>{const x=document.createElement('p');x.textContent=value;if(css)x.className=css;return x};
const value=(v)=>v==null||v===''?'Not yet verified':v;
if(!species.length){root.append(text('ARK species data missing from this build.','empty'));return}
root.append(text(species.length+' catalogued entries · '+known+' have taming information · '+(species.length-known)+' await a species-specific guide.','ark-summary'));
root.append(text('Offline: species names, facts, guides and your notes. Online only: creature icons and source pages. Images are creature illustrations, not photographs.','sub'));
root.append(text('A catalogue listing does not prove a creature spawns on that map. Taming rates and exact quantities depend on level, server settings, and mods.','sub'));
const search=document.createElement('input');search.className='field';search.placeholder='Find a creature, food, use, or baby type';search.setAttribute('aria-label','Search creature species');root.append(search);
const filters=document.createElement('div');filters.className='ark-filters';function select(options,label){const el=document.createElement('select');el.className='field';el.setAttribute('aria-label',label);for(const v of options){const op=document.createElement('option');op.textContent=v;op.value=v;el.append(op)}filters.append(el);return el}
const map=select(['All catalogue sections','The Island','Ragnarok','Scorched Earth','Aberration','Extinction','Valguero','Genesis: Part 1','Fantastic Tames','Astraeos','Lost Colony'],'Catalogue section');
const status=select(['All entries','Taming information available','Guide needs fact check','Index only'],'Guide completeness');
const babies=select(['All baby types','Egg','Live birth','Plant / seed-grown baby','Special birth','Does not breed','Not yet verified'],'Baby type');
root.append(filters);
const summary=text('','sub');root.append(summary);const grid=document.createElement('div');root.append(grid);
const more=document.createElement('button');more.className='ghost';more.textContent='Show more creatures';more.style.margin='12px 0';root.append(more);let limit=30;
function render(){grid.replaceChildren();const q=search.value.toLowerCase().trim();const matched=species.filter(s=>
(map.value==='All catalogue sections'||(s.catalogSections||[]).includes(map.value))&&
(status.value==='All entries'||(status.value==='Taming information available'&&!!s.tame)||(status.value==='Index only'&&!s.tame)||(status.value==='Guide needs fact check'&&!!s.tame))&&
(babies.value==='All baby types'||(babies.value==='Not yet verified'&&!s.baby)||s.baby===babies.value)&&
(!q||[s.name,s.tame,s.food,s.baby,s.uses,s.category,(s.catalogSections||[]).join(' ')].join(' ').toLowerCase().includes(q)));
const shown=matched.slice(0,limit);summary.textContent='Showing '+shown.length+' of '+matched.length+' matching entries (catalog total '+species.length+')';
for(const s of shown){const card=document.createElement('article');card.className='ark-card';
const top=document.createElement('div');top.className='ark-top';const picture=document.createElement('div');picture.className='ark-picture';
if(s.image){const pic=document.createElement('img');pic.loading='lazy';pic.alt='Creature icon: '+s.name;pic.src=s.image;pic.onerror=()=>{pic.remove();picture.append(text('Portrait needs internet','ark-offline'))};picture.append(pic)}
else picture.append(text('Image not available','ark-offline'));
const title=document.createElement('div');const h=document.createElement('h3');h.textContent=s.name;title.append(h,text(s.category||'Species','ark-caption'),text(s.guideStatus||'Index only','ark-caption'));
title.append(text('Tame: '+value(s.tame),'ark-caption'));title.append(text('Babies: '+value(s.baby),'ark-caption'));top.append(picture,title);card.append(top);
const details=document.createElement('details');details.open=folder==='Taming Walkthroughs'&&!!s.tame;
const hdr=document.createElement('summary');hdr.textContent='Guide, use, breeding, sources & my notes';details.append(hdr);
const section=(heading,items)=>{const h=document.createElement('h4');h.textContent=heading;details.append(h);for(const item of items)details.append(text(item,'ark-line'))};
section('Taming',['Method: '+value(s.tame),'Required food/items: '+value(s.food),'Saddle: '+value(s.saddle)]);
if(s.steps?.length){const ol=document.createElement('ol');for(const v of s.steps){const li=document.createElement('li');li.textContent=v;ol.append(li)}details.append(ol)}
else details.append(text('Species-specific steps have not yet been confirmed. Do not assume standard knockout rules.','ark-warning'));
section('What you use it for',[value(s.uses)]);
section('Breeding and babies',['Reproduction: '+value(s.baby),'Breedable: '+value(s.breed),'Baby care: '+value(s.care)]);
if(s.extra)section('Special conditions',[s.extra]);
section('Source and verification',['Catalogue category: '+(s.catalogSections||[]).join(', ')+(s.maps?.length?' · Reported on: '+s.maps.join(', '):''),'Fact status: '+(s.guideStatus||'Index only'),'Last compiled: '+value(s.verified)]);
const link=document.createElement('a');link.href=s.source;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Open creature page (online)';link.className='ark-source';details.append(link);
if(s.guideSource){const l=document.createElement('a');l.href=s.guideSource;l.target='_blank';l.rel='noopener noreferrer';l.textContent='Cross-reference taming overview (online)';l.className='ark-source';details.append(l)}
const label=document.createElement('label');label.textContent='My personal creature notes';label.className='ark-notelabel';details.append(label);
const note=document.createElement('textarea');note.className='field';note.rows=3;note.placeholder='My tame, levels, locations, experience, and corrections...';const key='genesis.ark.notes.'+s.id;try{note.value=localStorage.getItem(key)||''}catch(_){}
note.onchange=()=>{try{localStorage.setItem(key,note.value)}catch(_){}};
details.append(note);const button=document.createElement('button');button.className='ghost';button.textContent='Save note';button.onclick=()=>{try{localStorage.setItem(key,note.value);button.textContent='Saved'}catch(_){button.textContent='Storage unavailable'}};details.append(button);
card.append(details);grid.append(card)}
if(!shown.length)grid.append(text('No species match the current filters.','empty'));more.style.display=matched.length>limit?'block':'none'}
const reset=()=>{limit=30;render()};
search.oninput=reset;map.onchange=reset;status.onchange=reset;babies.onchange=reset;more.onclick=()=>{limit+=30;render()};render();
};
(function(){const style=document.createElement('style');style.textContent='.ark-summary{margin:10px 0 13px;color:#c2ffa8;font-weight:800;font-size:14px}.ark-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.ark-filters .field{font-size:12px;padding:8px}.ark-card{margin:11px 0;padding:14px;border-radius:16px;border:1px solid #34553d;background:#0b160f}.ark-top{display:flex;align-items:center;gap:12px}.ark-top h3{margin:0 0 6px;font-size:17px}.ark-caption{margin:4px 0;color:#a9c2ad;font-size:12px}.ark-picture{flex:0 0 92px;width:92px;height:98px;overflow:hidden;display:grid;place-items:center;border-radius:12px;border:1px solid #48694c;background:#09100d}.ark-picture img{width:100%;height:100%;object-fit:contain}.ark-offline{font-size:10px;color:#9eafa4;text-align:center;padding:5px}.ark-card details{margin-top:12px;border-top:1px solid #34543a;padding-top:12px}.ark-card summary{color:#c8ffa4;cursor:pointer;font-weight:700}.ark-card h4{font-size:14px;color:#b3ff42;margin:16px 0 6px}.ark-line{line-height:1.5;margin:5px 0}.ark-warning{color:#edbc85;line-height:1.5}.ark-card ol{padding-left:20px;line-height:1.5}.ark-card li{margin:6px 0}.ark-source{display:block;margin:12px 0;color:#d2ffb2}.ark-notelabel{display:block;margin:12px 0 7px;font-weight:700}@media(max-width:520px){.ark-filters{grid-template-columns:1fr}.ark-picture{flex-basis:75px;width:75px;height:90px}}';document.head.append(style)})();