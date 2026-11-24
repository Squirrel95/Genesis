/* Genesis personal dino tracker — offline snapshots, never claims live server access. */
(function(){
'use strict';
var KEY='genesis.dino.v1', FEED='genesis.dino.feedlog.v1', PH='genesis.dino.photo.';
var seed=window.GENESIS_DINO_SEED;
if(!seed||!Array.isArray(seed.dinos))return;
function read(key,fallback){try{var v=JSON.parse(localStorage.getItem(key));return v&&typeof v==='object'?v:fallback}catch(_){return fallback}}
var edits=read(KEY,{}), feeding=read(FEED,{});
var selected='all', filter='', searchText='', openId=null, focusPhotoId=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(edits));localStorage.setItem(FEED,JSON.stringify(feeding));return true}catch(e){alert('Tracker could not save locally. Check your storage space.');return false}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function el(tag,cl,text){var e=document.createElement(tag);if(cl)e.className=cl;if(text!==undefined)e.textContent=text;return e}
function num(v){return v===null||v===undefined||v===''?'—':Number(v).toLocaleString('en-US',{maximumFractionDigits:1})}
function pct(n,m){return Number.isFinite(n)&&Number.isFinite(m)&&m>0?Math.max(0,Math.min(100,n/m*100)):null}
function combined(d){return Object.assign({},d,edits[d.id]||{})}
function foodCategory(d){var p=pct(d.food,d.foodMax);if(p===null)return 'unknown';return p<15?'urgent':p<40?'watch':'good'}
function description(d){return d.species+' '+d.sex+' level '+d.level}
function species(d){return seed.species[d.species]||{}}
function role(d){return d.role||species(d).role||'Unassigned'}
function food(d){return species(d).best||'Not yet verified'}
function photo(d){return localStorage.getItem(PH+d.id)||''}
function shortStats(d){return [['Health',d.hp,d.hpMax],['Stamina',d.stamina,null],['Oxygen',d.oxygen,null],['Food',d.food,d.foodMax],['Weight',d.weight,d.weightMax],['Melee Damage',d.melee,null,'%'],['Movement Speed',d.speed,null,'%'],['Torpidity',d.torpor,d.torporMax],['Imprinting',d.imprint,null,'%'],['Saddle Armor',d.armor,null],['Crafting Skill',d.craft,null,'%']]}
function rowStats(d){return shortStats(d).filter(function(s){return s[1]!==null&&s[1]!==undefined}).map(function(s){return '<dt>'+esc(s[0])+'</dt><dd>'+num(s[1])+(s[2]!==null?' / '+num(s[2]):'')+(s[3]||'')+'</dd>'}).join('')}
function badge(d){var f=foodCategory(d);return '<span class="dt-food '+f+'">'+(f==='urgent'?'FEED NOW':f==='watch'?'CHECK FOOD':f==='good'?'FED':'UNKNOWN')+'</span>'}
function image(d){var p=photo(d);return p?'<img class="dt-photo" loading="lazy" alt="Imported photo of '+esc(description(d))+'" src="'+p+'">':'<div class="dt-photo dt-ph-empty" aria-label="Photo pending">PHOTO<br>NOT IMPORTED</div>'}
function progress(n,m){var p=pct(n,m);if(p===null)return 'XP not captured';return '<div class="dt-progress"><span style="width:'+p+'%"></span></div><small>'+num(n)+' / '+num(m)+' XP · '+num(Math.max(0,m-n))+' to threshold</small>'}
function update(id,field,val){if(!edits[id])edits[id]={};edits[id][field]=val;save()}
function field(name,label,value,type){return '<label>'+esc(label)+'<input class="field" name="'+name+'" type="'+(type||'text')+'" value="'+esc(value==null?'':value)+'" '+(type==='number'?'min="0" step="any"':'')+'></label>'}
function details(d){var s=species(d);
var html='<div class="dt-details"><div class="dt-spotlight">'+image(d)+'<div><b>'+esc(d.nickname||d.species)+'</b><p>'+esc(d.sex==='F'?'Female':'Male')+' · Level '+num(d.level)+' · #'+String(d.id).padStart(3,'0')+'</p><p>Everyday feed: <strong>'+esc(food(d))+'</strong></p><p>Role: '+esc(role(d))+'</p></div></div>';
html+='<div class="dt-actions"><button type="button" data-attach="'+d.id+'">Attach photo</button><button type="button" data-fed="'+d.id+'">Log feeding</button></div>';
html+='<p class="dt-muted">Source photo filename: '+esc(d.photo)+'. The original chat image is not inside the APK; import from the photo archive to see it offline.</p>';
html+='<div class="dt-subtitle">Snapshot stats (not live)</div><dl class="dt-stats">'+rowStats(d)+'</dl>';
html+='<div class="dt-subtitle">Leveling</div><div>'+progress(d.xp,d.xpMax)+'</div>'+(d.points?'<p><strong>'+num(d.points)+' unspent points</strong></p>':'')+'<p class="dt-muted">'+esc(s.advice||'No leveling rule verified yet.')+'</p>';
html+='<div class="dt-subtitle">Inventory</div><p>'+esc(d.inventoryItem||'No item identified')+(d.inventoryCount!=null?' · '+num(d.inventoryCount):'')+'</p><div class="dt-actions"><button type="button" data-clear="'+d.id+'">Mark recorded inventory cleared</button></div><p class="dt-muted">This changes the tracker only; it does not transfer anything in ARK.</p>';
if(feeding[d.id])html+='<p class="dt-muted">Last feeding logged: '+esc(new Date(feeding[d.id]).toLocaleString())+'</p>';
if(s.warnings&&s.warnings.length)html+='<div class="dt-warnings"><b>Gameplay notes</b><ul>'+s.warnings.map(function(w){return '<li>'+esc(w)+'</li>'}).join('')+'</ul></div>';
if(d.notes)html+='<p class="dt-muted">'+esc(d.notes)+'</p>';
if(d.production)html+='<p><strong>Production:</strong> '+esc(d.production.join(', '))+'</p>';
html+='<div class="dt-subtitle">Edit local record</div><form data-edit="'+d.id+'" class="dt-form">';
html+=field('nickname','Nickname',d.nickname||'')+field('role','Assigned job',role(d));
html+=field('level','Level',d.level,'number')+field('points','Unspent points',d.points,'number');
html+=field('hp','Current health',d.hp,'number')+field('hpMax','Max health',d.hpMax,'number');
html+=field('food','Current food',d.food,'number')+field('foodMax','Max food',d.foodMax,'number');
html+=field('weight','Current weight',d.weight,'number')+field('weightMax','Max weight',d.weightMax,'number');
html+=field('melee','Melee damage %',d.melee,'number')+field('xp','Current XP',d.xp,'number')+field('xpMax','Next XP threshold',d.xpMax,'number');
html+=field('inventoryItem','Inventory item label',d.inventoryItem||'')+field('inventoryCount','Inventory quantity',d.inventoryCount,'number');
html+='<label class="dt-wide">Private notes<textarea class="field" name="notes" rows="3">'+esc(d.notes||'')+'</textarea></label><button class="primary dt-wide" type="submit">Save changes to this device</button></form></div>';
return html}
function countLabel(arr){return arr.length+' of '+seed.dinos.length+' photographed dinos';}
function loadCards(list){var host=document.getElementById('dt-cards');host.replaceChildren();if(!list.length){host.append(el('p','dt-muted','No dinos match your search.'));return}
list.forEach(function(d){var card=el('article','dt-card');
var b=el('button','dt-card-head');b.type='button';b.setAttribute('aria-expanded',String(openId===d.id));
b.innerHTML=image(d)+'<span class="dt-name"><strong>'+esc(d.nickname||d.species)+'</strong><small>#'+String(d.id).padStart(3,'0')+' · '+(d.sex==='F'?'♀':'♂')+' · Lv '+num(d.level)+'</small><small>'+esc(role(d))+'</small></span>'+badge(d);
b.onclick=function(){openId=openId===d.id?null:d.id;renderCards();};
card.append(b);
if(openId===d.id){var box=el('div');box.innerHTML=details(d);card.append(box)}
host.append(card)});
}
function renderCards(){var list=seed.dinos.map(combined).filter(function(d){
var text=(d.species+' '+(d.nickname||'')+' '+role(d)+' '+d.id+' '+(d.production||[]).join(' ')).toLowerCase();
return (!searchText||text.includes(searchText))&&(selected==='all'||selected==='attention'&&foodCategory(d)!=='good'||selected===d.species);
});
list.sort(function(a,b){var priority={urgent:0,watch:1,unknown:2,good:3};return priority[foodCategory(a)]-priority[foodCategory(b)]||a.id-b.id});
document.getElementById('dt-count').textContent=countLabel(list);
document.getElementById('dt-alert').textContent=seed.dinos.map(combined).filter(function(d){return foodCategory(d)==='urgent'}).length+' last-photographed dinos had food below 15%. These readings are historical, not live.';
loadCards(list);
}
function fileReader(file){return new Promise(function(resolve,reject){var r=new FileReader();r.onload=function(){resolve(r.result)};r.onerror=reject;r.readAsDataURL(file)})}
async function reducePhoto(file){var data=await fileReader(file);return new Promise(function(resolve,reject){
var img=new Image();img.onload=function(){var scale=Math.min(1,650/img.width,850/img.height),can=document.createElement('canvas');can.width=Math.max(1,Math.round(img.width*scale));can.height=Math.max(1,Math.round(img.height*scale));can.getContext('2d').drawImage(img,0,0,can.width,can.height);resolve(can.toDataURL('image/jpeg',.62))};img.onerror=reject;img.src=data})}
async function importPhotos(files){if(!files||!files.length)return;var n=0,unknown=[];
for(var f of Array.from(files)){var d=seed.dinos.find(function(x){return x.photo===f.name||x.extraPhotos.includes(f.name)});
if(!d&&focusPhotoId&&files.length===1)d=seed.dinos.find(function(x){return x.id===focusPhotoId});
if(!d){unknown.push(f.name);continue}
try{localStorage.setItem(PH+d.id,await reducePhoto(f));n++}catch(e){unknown.push(f.name+' (save failed)')}
}
focusPhotoId=null;renderCards();alert(n+' photos imported. '+(unknown.length?unknown.length+' could not be matched/saved.':'Photos are stored offline on this device.'))}
function downloadText(name,text){var area=document.getElementById('dt-backup');area.value=text;area.classList.remove('hidden');area.focus();area.select();try{document.execCommand('copy')}catch(_){}}
function exportBackup(){downloadText('dino-backup.json',JSON.stringify({type:'genesis-dino-backup',version:1,snapshotDate:seed.snapshotDate,edits:edits,feeding:feeding,photoManifest:seed.dinos.map(function(x){return {id:x.id,photo:x.photo,imported:!!photo(x)}})},null,2))}
function importBackup(json){if(!json||json.type!=='genesis-dino-backup'||json.version!==1||!json.edits||typeof json.edits!=='object')throw Error('Not a Genesis tracker backup');var allowed=new Set(seed.dinos.map(function(d){return String(d.id)}));var e={};for(var id of Object.keys(json.edits)){if(allowed.has(String(id))&&json.edits[id]&&typeof json.edits[id]==='object'){e[id]=json.edits[id]}}edits=e;feeding=json.feeding&&typeof json.feeding==='object'?json.feeding:{};if(!save())return;openId=null;renderCards();alert('Local dino edits restored. Photos must be imported separately.')}
function render(root){
root.replaceChildren();var wrap=el('section','dt');
wrap.innerHTML='<div class="dt-head"><h2>PERSONAL DINO TRACKER</h2><p>34 individually documented creatures · 11 species · offline snapshots, NOT your complete collection.</p></div>'+
'<div class="dt-summary"><div><strong>34</strong><small>DOCUMENTED</small></div><div><strong>11</strong><small>SPECIES</small></div><div><strong>7</strong><small>GACHA COLLECTORS</small></div></div>'+
'<p class="dt-notice" id="dt-alert"></p><div class="dt-controls"><input id="dt-search" class="field" type="search" placeholder="Search species, level ID, role or production" aria-label="Search dino tracker"><select id="dt-filter" class="field" aria-label="Filter dinos"><option value="all">All dinos</option><option value="attention">Needs attention / unknown</option></select></div>'+
'<p id="dt-count" class="dt-muted"></p><div class="dt-actions"><label class="dt-import">Import screenshot photos<input type="file" accept="image/*" multiple id="dt-photo-files"></label><button type="button" id="dt-export">Copy backup JSON</button><label class="dt-import">Restore backup JSON<input type="file" accept=".json,application/json" id="dt-json-files"></label></div>'+
'<p class="dt-muted">Photos must be imported from your own screenshot archive. Filename matching assigns them to the correct dino; edits and thumbnails stay on this device. Backup JSON saves record edits and feeding logs, not photo bytes.</p>'+
'<textarea id="dt-backup" rows="6" readonly class="field hidden" aria-label="Copyable tracker backup"></textarea><div id="dt-cards"></div>';
root.append(wrap);
var sel=wrap.querySelector('#dt-filter');Array.from(new Set(seed.dinos.map(function(x){return x.species}))).sort().forEach(function(sp){var opt=el('option',null,sp);opt.value=sp;sel.append(opt)});sel.value=selected;
sel.onchange=function(){selected=sel.value;openId=null;renderCards()};
wrap.querySelector('#dt-search').value=searchText;wrap.querySelector('#dt-search').oninput=function(e){searchText=e.target.value.trim().toLowerCase();openId=null;renderCards()};
wrap.querySelector('#dt-photo-files').onchange=async function(e){await importPhotos(e.target.files);e.target.value=''};
wrap.querySelector('#dt-json-files').onchange=async function(e){try{var t=await e.target.files[0].text();importBackup(JSON.parse(t))}catch(error){alert('Backup import failed: '+error.message)}e.target.value=''};
wrap.querySelector('#dt-export').onclick=exportBackup;
wrap.addEventListener('click',function(e){
var b=e.target.closest('button');if(!b)return;
if(b.dataset.attach){focusPhotoId=Number(b.dataset.attach);wrap.querySelector('#dt-photo-files').click()}
if(b.dataset.fed){feeding[b.dataset.fed]=new Date().toISOString();save();renderCards()}
if(b.dataset.clear){if(confirm('Mark the pictured inventory as cleared in the tracker only?')){update(b.dataset.clear,'inventoryCount',0);update(b.dataset.clear,'inventoryItem','Cleared in tracker');renderCards()}}
});
wrap.addEventListener('submit',function(e){var form=e.target;if(!form.matches('[data-edit]'))return;e.preventDefault();var id=form.dataset.edit;var o=Object.assign({},edits[id]||{});var numeric=new Set(['level','points','hp','hpMax','food','foodMax','weight','weightMax','melee','xp','xpMax']);var data=new FormData(form);
for(var entry of data.entries()){var k=entry[0],v=String(entry[1]).trim();if(numeric.has(k)){if(!v){o[k]=null;continue}var n=Number(v);if(!Number.isFinite(n)||n<0){alert('Invalid value for '+k);return}o[k]=n}else{o[k]=v.slice(0,1500)}}
edits[id]=o;if(save()){renderCards();alert('Dino #'+id+' saved locally. Game stats are unchanged.')}}
);
renderCards();
}
window.renderPersonalDinos=render;
window.exportPersonalDinoEdits=function(){return {edits:edits,feeding:feeding}};
window.importPersonalDinoEdits=function(bundle){if(!bundle||typeof bundle!=='object'||!bundle.edits||typeof bundle.edits!=='object')return false;var valid=new Set(seed.dinos.map(function(d){return String(d.id)}));var incoming={};for(var k of Object.keys(bundle.edits)){if(valid.has(k)&&bundle.edits[k]&&typeof bundle.edits[k]==='object')incoming[k]=bundle.edits[k]}edits=incoming;feeding=bundle.feeding&&typeof bundle.feeding==='object'?bundle.feeding:{};save();return true;};
})();
