/* Squirrel Studios Genesis: offline ARK: Survival Ascended audited knowledge base.
 * This UI never silently promotes single-source facts to verified facts.
 * The existing ARK species guide remains separately available.
 */
(function(){
'use strict';
const REFERENCE_FOLDERS={
  'ARK Knowledge Base':null,
  'Bosses & Tributes':['Bosses'],
  'Breeding & Mutation Lab':['Breeding & mutations'],
  'Server & INI':['Server settings'],
  'Crafting & Engrams':['Levels, engrams & crafting'],
  'Resources & Maps':['Resources & farming'],
  'Combat & Tek':['Base defense & PvP','Taming','Levels, engrams & crafting'],
  'Modding & DevKit':['Modding (DevKit)'],
  'ARK Calculators':[]
};
const CONFIRMED='Confirmed against source';
const EXCLUDE_KEYS=new Set(['source','verification_source','guideSource','source_url','original_confidence','confidence','audit_status']);
const PREFERRED_NAMES=['species','boss','tier','name','engram','resource','spot','weapon','ammo','topic','step','item','recipe','creature','map','setting','level','id'];
const LABELS={incubation_minutes:'Incubation (1× minutes)',pregnancy_minutes:'Pregnancy (1× minutes)',total_maturation_minutes:'Maturation (1× minutes)',element_reward:'Element reward',timer_usable:'Standard timer usable',calculator_usable:'Calculator usable',asa_availability:'ASA availability',audit_note:'Audit note',audit_status:'Audit classification',incubation_min_F:'Min incubation °F',incubation_max_F:'Max incubation °F',incubation_min_C:'Min incubation °C',incubation_max_C:'Max incubation °C'};
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=String(txt);return n}
function input(label,type,val,min,max){const wrap=el('label','arkr-input');wrap.append(el('span','',label));const e=el('input','field');e.type=type;if(val!==undefined)e.value=val;if(min!==undefined)e.min=min;if(max!==undefined)e.max=max;if(type==='number')e.step='any';wrap.append(e);return {wrap,element:e}}
function fmtKey(k){return LABELS[k]||k.replace(/_/g,' ').replace(/\b[a-z]/g,m=>m.toUpperCase())}
function fmt(v){if(v==null||v==='')return 'Unknown / not recorded';if(Array.isArray(v))return v.join(' · ');if(typeof v==='object')return JSON.stringify(v);if(typeof v==='boolean')return v?'Yes':'No';return String(v)}
function srcLink(url,label){if(typeof url!=='string'||!/^https:\/\//i.test(url))return null;const a=el('a','arkr-link',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function statusOf(r){return r.audit_status||'Not independently reviewed'}
function badgeFor(r){const state=statusOf(r),c=state===CONFIRMED?'verified':/legacy|special case/i.test(state)?'legacy':'review';return el('span','arkr-badge '+c,state===CONFIRMED?'Cross-checked':state)}
function headingFor(r,index){for(const k of PREFERRED_NAMES)if(r[k]!=null&&r[k]!=='')return fmt(r[k]);return 'Reference entry '+(index+1)}
function addNote(n,text){n.append(el('p','arkr-note',text))}
function makeRecord(r,dataset,index){const card=el('article','arkr-card');const head=el('div','arkr-cardhead');const title=el('strong','',headingFor(r,index));head.append(title,badgeFor(r));card.append(head);
const d=el('details');const sm=el('summary','',dataset.replace(/_/g,' ')+' · details and sources');d.append(sm);
const grid=el('dl','arkr-fields');for(const [key,value] of Object.entries(r)){
  if(EXCLUDE_KEYS.has(key)||key==='original_value'||key==='legacy_time')continue;
  if(key.toLowerCase().includes('password')||key.toLowerCase().includes('token'))continue;
  const dt=el('dt','',fmtKey(key)),dd=el('dd','',fmt(value));grid.append(dt,dd)
}
d.append(grid);
if(r.audit_status!==CONFIRMED)addNote(d,'Not independently checked for each value. Confirm the current ASA version, server rates and map before relying on this entry.');
if(r.timer_usable===false)addNote(d,'Generic breeding countdown intentionally disabled for this creature.');
if(r.calculator_usable===false)addNote(d,'Unknown or combined boss tiers are excluded from numeric calculations.');
const links=el('div','arkr-links');for(const [url,label] of [[r.verification_source,'Audit verification source'],[r.source,'Original reference source']]){const link=srcLink(url,label);if(link&&!Array.from(links.children).some(x=>x.href===link.href))links.append(link)}if(links.childElementCount)d.append(links);
card.append(d);return card}
function realNumber(e){const n=Number(e.value);return Number.isFinite(n)?n:NaN}
function validRate(v){return Number.isFinite(v)&&v>0&&v<=100000}
function time(minutes){if(!Number.isFinite(minutes)||minutes<0)return 'Unavailable';const m=Math.ceil(minutes);const d=Math.floor(m/1440),h=Math.floor((m%1440)/60),mm=m%60;return (d?d+'d ':'')+h+'h '+mm+'m'}
function block(parent,title,intro,build){const wrap=el('section','arkr-calc');wrap.append(el('h3','',title));addNote(wrap,intro);const fields=el('div','arkr-calcfields');wrap.append(fields);const result=el('p','arkr-output','Enter values to calculate.');wrap.append(result);build(fields,result);parent.append(wrap)}
function addBreedCalc(root,reference){const data=reference.data||{};const list=[...(data.breeding_eggs||[]),...(data.breeding_gestation||[])].filter(x=>x.timer_usable!==false&&!/^Not in unmodded ASA|^Legacy/i.test(x.asa_availability||'')&&(x.incubation_minutes||x.pregnancy_minutes||x.total_maturation_minutes));
block(root,'Breeding & baby timers','Baseline 1× estimates, not event or mod-specific guarantees. Host-impregnation creatures and unavailable legacy records are excluded.',(fields,out)=>{
 const label=el('label','arkr-input');label.append(el('span','','Creature'));const sel=el('select','field');list.forEach((r,i)=>{const o=el('option','',r.species+' · '+(r.type||'breeding'));o.value=String(i);sel.append(o)});label.append(sel);fields.append(label);
 const rate=input('Egg hatch / mating multiplier','number','1',0.01,100000),grow=input('Baby mature multiplier','number','1',0.01,100000);fields.append(rate.wrap,grow.wrap);
 function refresh(){const row=list[+sel.value],a=realNumber(rate.element),b=realNumber(grow.element);if(!row||!validRate(a)||!validRate(b)){out.textContent='Enter valid positive multipliers.';return}const birth=row.incubation_minutes??row.pregnancy_minutes;out.textContent=(birth!=null?'Incubation/gestation: '+time(birth/a)+' · ':'')+'Maturation: '+time((row.total_maturation_minutes||0)/b)+' · '+(statusOf(row)===CONFIRMED?'Cross-checked':'Source-linked estimate — individual values not verified')}
 for(const node of [sel,rate.element,grow.element])node.addEventListener('input',refresh);refresh()
})}
function addMutationCalc(root){block(root,'Mutation breeding probability','The probability of ANY mutation is not the same as the probability of a mutation in your desired stat. Target probability must include eligibility, inheritance and any selection constraints.',(fields,out)=>{
 const p=input('Chance per birth of desired outcome (%)','number','0.5',0.000001,100),q=input('Desired confidence (%)','number','90',1,99.9999);fields.append(p.wrap,q.wrap);
 function refresh(){const chance=realNumber(p.element)/100,confidence=realNumber(q.element)/100;if(!(chance>0&&chance<=1&&confidence>0&&confidence<1)){out.textContent='Enter a chance above 0–100% and confidence strictly between 0–100%.';return}const n=chance===1?1:Math.ceil(Math.log(1-confidence)/Math.log(1-chance));const pAny=1-Math.pow(1-0.025,3);out.textContent=n.toLocaleString()+' independent births for ≥'+(confidence*100).toFixed(2)+'% chance · baseline any-mutation chance when both parents eligible: '+(pAny*100).toFixed(2)+'%'}
 p.element.addEventListener('input',refresh);q.element.addEventListener('input',refresh);refresh()
})}
function addRaidCalc(root){block(root,'Layer-by-layer raid estimator','Enter each layer HP separated by commas and assumed effective HP damage per explosive/hit. This is arithmetic only; it does NOT validate C4 damage, structure resistances, splash, PvP rules or server multipliers.',(fields,out)=>{
 const layers=input('Layer HP values, comma-separated','text','10000,10000');const damage=input('Effective damage to each layer per charge / hit','number','1000',0.001,100000000);fields.append(layers.wrap,damage.wrap);
 function refresh(){const parts=layers.element.value.split(',').map(x=>Number(x.trim())),d=realNumber(damage.element);if(!parts.length||parts.length>50||parts.some(x=>!Number.isFinite(x)||x<=0)||!(d>0)){out.textContent='Enter 1–50 positive HP values and positive effective damage.';return}const shots=parts.map(h=>Math.ceil(h/d));out.textContent=shots.reduce((a,b)=>a+b,0).toLocaleString()+' estimated hits/charges across '+parts.length+' layers ('+shots.join(' + ')+'). Different layers need separate ceilings.'}
 layers.element.addEventListener('input',refresh);damage.element.addEventListener('input',refresh);refresh()
})}
function addTorporCalc(root){block(root,'Torpor shot estimate','An arithmetic estimate only, not guaranteed knockout rounds. Creature resistance, weapon quality, torpor-over-time, shot timing, regen and mods change results.',(fields,out)=>{
 const remaining=input('Target torpor still needed','number','1500',0,1e8),perhit=input('Expected effective torpor per shot','number','90',0.000001,1e8);fields.append(remaining.wrap,perhit.wrap);
 function refresh(){const a=realNumber(remaining.element),b=realNumber(perhit.element);out.textContent=a>=0&&b>0?Math.ceil(a/b).toLocaleString()+' shots at the assumed effective torpor; actual knockout may differ.':'Enter nonnegative torpor and positive torpor per hit.'}
 remaining.element.addEventListener('input',refresh);perhit.element.addEventListener('input',refresh);refresh()
})}
function addEngramCalc(root,reference){const rows=reference.data?.player_levels_ep||[];block(root,'Engram point budget','Looks up the audited level table; EP is not XP. DLC rewards, character-specific bonuses and mindwipe history are not included.',(fields,out)=>{
 const label=el('label','arkr-input');label.append(el('span','','Character level'));const sel=el('select','field');rows.forEach((x,i)=>{const o=el('option','',String(x.level));o.value=String(i);sel.append(o)});if(sel.options.length)sel.selectedIndex=Math.min(104,sel.options.length-1);label.append(sel);fields.append(label);
 const spent=input('EP already allocated','number','0',0,1e8);fields.append(spent.wrap);function refresh(){const entry=rows[+sel.value],n=realNumber(spent.element);if(!entry||!(n>=0)){out.textContent='Enter a nonnegative EP amount.';return}const remaining=Number(entry.ep_total)-n;out.textContent='Table total: '+entry.ep_total+' EP · estimated remaining: '+remaining+' EP · '+(statusOf(entry)===CONFIRMED?'Cross-checked':'Source-linked; not checked per level')}
 sel.addEventListener('change',refresh);spent.element.addEventListener('input',refresh);refresh()
})}
function makeCalculators(root,reference){root.append(el('p','arkr-lede','These calculators use explicit assumptions and preserve the audit’s restrictions. Change the inputs to match your server.'));addBreedCalc(root,reference);addMutationCalc(root);addRaidCalc(root);addTorporCalc(root);addEngramCalc(root,reference)}
window.renderArkReferenceModule=function(root,folder){
 const ref=window.ARK_REFERENCE;if(!ref||!ref.data||!ref.meta){root.append(el('p','empty','ARK audited reference is missing from this app build.'));return}
 const allSections=ref.meta.sections||{};const sectionNames=Object.keys(allSections);
 const total=Object.values(ref.data).reduce((n,rows)=>n+rows.length,0);const verified=Object.values(ref.data).reduce((n,rows)=>n+rows.filter(r=>statusOf(r)===CONFIRMED).length,0);
 root.append(el('h3','arkr-title',folder));root.append(el('p','arkr-lede',total+' offline records · '+Object.keys(ref.data).length+' datasets · '+verified+' cross-checked records · compiled '+ref.meta.compiled));
 addNote(root,'Only cross-checked entries receive the verified label. This is not a live-server validation. Unreviewed, provisional and legacy information stays visible with warnings.');
 if(folder==='ARK Calculators'){makeCalculators(root,ref);return}
 const preferred=REFERENCE_FOLDERS[folder];const allowed=preferred?.length?preferred:sectionNames;
 const pane=el('div','arkr-filters');const section=el('select','field');section.setAttribute('aria-label','ARK topic');for(const s of allowed){const op=el('option','',s);op.value=s;section.append(op)}pane.append(section);
 const dataset=el('select','field');dataset.setAttribute('aria-label','Dataset');pane.append(dataset);
 const status=el('select','field');status.setAttribute('aria-label','Verification status');for(const [name,value] of [['All review statuses','all'],['Cross-checked facts only','verified'],['Source-linked not individually checked','sourced'],['Review / provisional / legacy','check']]){const op=el('option','',name);op.value=value;status.append(op)}pane.append(status);
 const search=el('input','field');search.type='search';search.placeholder='Search creatures, bosses, config keys, items…';search.setAttribute('aria-label','Search ARK reference records');pane.append(search);root.append(pane);
 const note=el('p','arkr-note');root.append(note);const list=el('div','arkr-list');root.append(list);const more=el('button','ghost','Show more');root.append(more);let limit=25;
 const folderChoices={
  'Bosses & Tributes':'bosses',
  'Breeding & Mutation Lab':'breeding_eggs',
  'Server & INI':'server_settings',
  'Crafting & Engrams':'engrams_key',
  'Resources & Maps':'resource_spots',
  'Combat & Tek':'tek_equipment',
  'Modding & DevKit':'modding_steps'
 };
 function datasetsForSection(){return (allSections[section.value]||[]).filter(k=>Array.isArray(ref.data[k]))}
 function resetDataset(){dataset.replaceChildren();for(const key of datasetsForSection()){const o=el('option','',key.replace(/_/g,' ')+' ('+ref.data[key].length+')');o.value=key;dataset.append(o)}const prefer=folderChoices[folder];if(prefer&&datasetsForSection().includes(prefer))dataset.value=prefer}
 if(folder==='Combat & Tek')section.value='Levels, engrams & crafting';else if(folder==='Breeding & Mutation Lab')section.value='Breeding & mutations';
 resetDataset();
 function render(){const key=dataset.value,rows=ref.data[key]||[],q=search.value.trim().toLowerCase();const filtered=rows.filter(r=>{
 const st=statusOf(r);if(status.value==='verified'&&st!==CONFIRMED)return false;
 if(status.value==='sourced'&&st!== 'Source-linked; not checked individually')return false;
 if(status.value==='check'&&(st===CONFIRMED||st==='Source-linked; not checked individually'))return false;
 return !q||Object.entries(r).some(([k,v])=>k!=='source'&&k!=='verification_source'&&fmt(v).toLowerCase().includes(q))
 });list.replaceChildren();filtered.slice(0,limit).forEach((r,i)=>list.append(makeRecord(r,key,i)));
 note.textContent='Showing '+Math.min(limit,filtered.length)+' of '+filtered.length+' '+key.replace(/_/g,' ')+' records. Verified: '+filtered.filter(r=>statusOf(r)===CONFIRMED).length+'.';
 if(!filtered.length)list.append(el('p','empty','No matching records. Try a different source or status filter.'));
 more.style.display=filtered.length>limit?'block':'none'
 }
 section.addEventListener('change',()=>{limit=25;resetDataset();render()});dataset.addEventListener('change',()=>{limit=25;render()});status.addEventListener('change',()=>{limit=25;render()});search.addEventListener('input',()=>{limit=25;render()});more.addEventListener('click',()=>{limit+=25;render()});render();
};
const style=el('style');style.textContent='.arkr-title{font-size:19px;margin:15px 0 8px;color:#d5ffbb}.arkr-lede{font-size:13px;line-height:1.55;color:#ceefca}.arkr-note{font-size:12px;line-height:1.55;color:#d0bca2}.arkr-filters{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin:14px 0 4px}.arkr-filters .field{margin:0;min-width:0}.arkr-filters input{grid-column:1/-1}.arkr-card{border:1px solid #375841;border-radius:13px;padding:12px;margin:10px 0;background:#0b170f;overflow-wrap:anywhere}.arkr-cardhead{display:flex;gap:8px;align-items:center;justify-content:space-between}.arkr-cardhead strong{font-size:14px}.arkr-badge{font-size:10px;line-height:1.3;padding:4px 7px;border-radius:8px;border:1px solid #70694d;color:#ebd9aa;background:#312b1b;max-width:60%;text-align:right}.arkr-badge.verified{color:#c5ffac;border-color:#4b8251;background:#17341b}.arkr-badge.legacy{color:#f3b8a6;border-color:#8a4c42;background:#371e1a}.arkr-card details{margin-top:10px}.arkr-card summary{cursor:pointer;color:#c7e7be;padding:7px 0;font-size:12px}.arkr-fields{display:grid;grid-template-columns:38% 1fr;gap:8px 10px;margin:8px 0;line-height:1.4;font-size:12px}.arkr-fields dt{color:#a1b4a5}.arkr-fields dd{margin:0;white-space:pre-wrap}.arkr-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:10px}.arkr-link{color:#d2ffb2;font-size:12px}.arkr-calc{border:1px solid #385b3f;border-radius:14px;margin:12px 0;padding:14px;background:#0c1911}.arkr-calc h3{font-size:15px;margin:0}.arkr-calcfields{display:grid;gap:9px}.arkr-input{display:grid;gap:6px;font-size:12px}.arkr-input .field{margin:0}.arkr-output{font-weight:750;color:#d4ffbe;line-height:1.6;padding:12px;border-radius:9px;background:#142a18;border:1px solid #3a603c;overflow-wrap:anywhere}@media(max-width:420px){.arkr-filters{grid-template-columns:1fr}.arkr-fields{grid-template-columns:1fr}.arkr-fields dt{font-weight:700}}';document.head.append(style)
})();