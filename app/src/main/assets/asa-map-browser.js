/* Genesis ASA map browser. Independent map-specific notes and nested reference folders. */
const asaMaps=[
{id:'ragnarok',name:'Ragnarok',group:'Free map',desc:'Dungeons, Griffins, Bison, Wyverns and Nunatak',tags:'Griffin Bison Nunatak Viking Bay caves',special:[['viking','Viking Bay',['Viking Bay']],['labyrinth',"Life's Labyrinth",["Labyrinth"]],['wyvern','Wyvern Cave & Nests',['wyvern cave','wyvern nest','ice wyvern']],['nunatak','Nunatak',['Nunatak']],['bison','Bison & Griffin',['Bison','Griffin']],['isles','Scotland Isles',['Scotland Isles']]]},
{id:'the-island',name:'The Island',group:'Story map',desc:'Original island, caves and obelisks',tags:'Island Tek Cave Overseer',special:[['overseer','Overseer',['Overseer']],['tek-cave','Tek Cave',['Tek Cave']],['obelisks','Obelisks',['Obelisk']]]},
{id:'scorched-earth',name:'Scorched Earth',group:'Story map',desc:'Deserts, Wyverns and extreme weather',tags:'desert heat wyvern manticore',special:[['trench','Wyvern Trench',['Wyvern Trench']],['weather','Desert Weather',['heat','sandstorm']],['manticore','Manticore',['Manticore']]]},
{id:'the-center',name:'The Center',group:'Free map',desc:'Island clusters, floating landmass and ocean',tags:'floating island sea caves',special:[['floating-island','Floating Island',['floating island']],['ocean','Deep Ocean',['ocean']],['boss-arena','Boss Arena',['boss']]]},
{id:'aberration',name:'Aberration',group:'Story map',desc:'Underground biomes and hazardous regions',tags:'radiation rock drake reaper',special:[['radiation','Radiation Zones',['radiation']],['drakes','Rock Drake Nests',['Rock Drake']],['surface','Surface',['surface']]]},
{id:'extinction',name:'Extinction',group:'Story map',desc:'Wasteland, Titans and special events',tags:'orbital supply drops element veins',special:[['osd','Orbital Supply Drops',['Orbital']],['element-veins','Element Veins',['Element Vein']],['titans','Titans',['Titan']]]},
{id:'astraeos',name:'Astraeos',group:'Partner map',desc:'Greek-mythology-themed world',tags:'greek creature islands',special:[['regions','Mythic Regions',['region']],['creatures','Unique Creatures',['creature']],['bosses','Map Bosses',['boss']]]},
{id:'valguero',name:'Valguero',group:'Free map',desc:'Highlands, Deinonychus and varied biomes',tags:'deinonychus wyvern trench aberration',special:[['deinonychus','Deinonychus',['Deinonychus']],['aberration','Aberration Area',['Aberration']],['wyverns','Wyvern Trench',['Wyvern']]]},
{id:'lost-colony',name:'Lost Colony',group:'Story expansion',desc:'Arat Prime and new story content',tags:'element dust city arat prime',special:[['arat-prime','Arat Prime',['Arat Prime']],['element-dust','Element Dust',['Element Dust']],['city','City Loot',['loot']]]},
{id:'genesis-1',name:'Genesis: Part 1',group:'Story map',desc:'Biome simulations, missions and unique rewards',tags:'genesis missions ocean biome',special:[['biomes','Biomes',['biome']],['missions','Missions',['mission']],['ocean','Ocean Biome',['ocean']]]}
];
const asaFolderGroups=[
{id:'overview',name:'Map Overview',sub:[
{id:'general',name:'General Facts',categories:['Overview','World']},
{id:'regions',name:'Regions & Landmarks',categories:['Regions']},
{id:'spawns',name:'Spawn Areas',categories:['Spawn zones']},
{id:'hazards',name:'Environment & Hazards',categories:['Environment','Safety']}]},
{id:'exploration',name:'Exploration & Caves',sub:[
{id:'caves',name:'Caves & Dungeons',categories:['Caves']},
{id:'artifacts',name:'Artifacts & Explorer Markers',categories:['Artifacts','Maps']},
{id:'wyvern-nests',name:'Wyvern Nests',terms:['wyvern nest','wyvern cave','wyvern egg']},
{id:'dungeons',name:'Miniboss Dungeons',categories:['Mini-bosses'],terms:['Iceworm Queen','Lava Elemental','Life\'s Labyrinth']}]},
{id:'creatures',name:'Creatures & Taming',sub:[
{id:'bison',name:'Bison',categories:['Bison'],terms:['Bison']},
{id:'griffin',name:'Griffins',categories:['Griffin'],terms:['Griffin']},
{id:'wyverns',name:'Wyverns',categories:['Wyverns'],terms:['Wyvern','Wyvern Milk']},
{id:'other-creatures',name:'Other Creatures',categories:['Other creatures','Creatures','Creature IDs']}]},
{id:'breeding',name:'Breeding & Raising',sub:[
{id:'bison-babies',name:'Bison Breeding',terms:['bison milk','baby bison','breedable bison']},
{id:'griffin-babies',name:'Griffin Breeding',terms:['griffin breed','griffin wild baby','griffin baby','breedable in ascended']},
{id:'wyvern-babies',name:'Wyvern Raising',terms:['baby wyvern','juvenile wyvern','wyvern milk','wyvern hatch']}]},
{id:'resources',name:'Resources & Crafting',sub:[
{id:'resource-list',name:'Resource Types',categories:['Resources']},
{id:'resource-map',name:'Resource Locations',terms:['resource map','resource node','metal','obsidian','crystal','silica pearl']},
{id:'harvesting',name:'Harvesting',terms:['harvest','beached basilosaurus','beaver dam']},
{id:'food',name:'Food, Kibble & Milk',terms:['kibble','food','milk','mejoberr','crop']},
{id:'tek-crafting',name:'Tek & Crafting',categories:['Tek']}]},
{id:'bosses',name:'Bosses & Progression',sub:[
{id:'nunatak',name:'Nunatak',categories:['Nunatak','Bosses'],terms:['Nunatak']},
{id:'tributes',name:'Tribute Requirements',categories:['Tributes']},
{id:'element',name:'Element Rewards',categories:['Element'],terms:['Element payout','Element reward']},
{id:'mini-boss',name:'Minibosses',categories:['Mini-bosses']},
{id:'loot',name:'Loot & Tek Unlocks',categories:['Loot','Tek']}]},
{id:'bases',name:'Base Building',sub:[
{id:'base-sites',name:'Base Sites & Coordinates'},
{id:'structures',name:'Structures & Power'},
{id:'defenses',name:'Base Defenses'}]},
{id:'servers',name:'Servers & Transfers',sub:[
{id:'map-id',name:'Map Identifiers',terms:['map identifier','server map name']},
{id:'transfer',name:'Item & Creature Transfers'},
{id:'settings',name:'Server Settings & Multipliers'}]},
{id:'special',name:'Map-Specific Features',special:true},
{id:'all',name:'All Map References',sub:[{id:'all',name:'All Reference Entries',all:true}]}
];
let asaSelectedMap='',asaSelectedCategory='',asaSelectedSubfolder='';
let asaBrowserSearch='',asaBrowserSort='name',asaBrowserFilter='all';
let asaFactSearch='',asaFactSource='all',asaFactSort='category',asaFactLimit=12;
function asaMapById(id){return asaMaps.find(x=>x.id===id)||null}
function asaSelectedMapInfo(){return asaMapById(asaSelectedMap)}
function asaGroupById(id){return asaFolderGroups.find(x=>x.id===id)||null}
function asaSubfolders(group,map){
 if(!group)return [];
 if(group.special)return map.special.map(s=>({id:s[0],name:s[1],terms:s[2]}));
 return group.sub||[];
}
function asaSubById(group,map,id){return asaSubfolders(group,map).find(s=>s.id===id)||null}
function asaMapFacts(id){return id==='ragnarok'&&typeof ragAllFacts==='function'?ragAllFacts():[]}
function asaRuleMatches(f,sub){
 if(sub.all)return true;
 const categories=sub.categories||[],terms=sub.terms||[];
 const txt=(String(f.title||'')+' '+String(f.detail||'')).toLowerCase();
 return categories.includes(f.category)||terms.some(x=>txt.includes(x.toLowerCase()));
}
function asaFactsAt(mapId,categoryId,subId){
 const map=asaMapById(mapId),group=asaGroupById(categoryId);
 const sub=asaSubById(group,map,subId);
 if(!map||!group||!sub)return [];
 return asaMapFacts(mapId).filter(f=>asaRuleMatches(f,sub));
}
function asaFactsForGroup(mapId,groupId){
 const map=asaMapById(mapId),group=asaGroupById(groupId);
 if(!map||!group)return [];
 const ids=new Set(),result=[];
 for(const sub of asaSubfolders(group,map)){
  for(const f of asaFactsAt(mapId,groupId,sub.id)){
   const id=f.id||f.title;
   if(!ids.has(id)){ids.add(id);result.push(f)}
  }
 }
 return result;
}
function asaNotesData(){return typeof gameNotesRead==='function'?gameNotesRead()||{}:{}}
function asaMapPrefix(mapId){return 'ASA::map::'+mapId}
function asaNoteKey(){return asaMapPrefix(asaSelectedMap)+'::'+(asaSelectedCategory||'_map')+'::'+(asaSelectedSubfolder||'_category')}
function asaNoteCount(prefix){
 const data=asaNotesData();let total=0;
 for(const k of Object.keys(data)){if(k===prefix||k.startsWith(prefix+'::'))total+=Array.isArray(data[k])?data[k].length:0}
 return total;
}
function asaMapNoteCount(id){return asaNoteCount(asaMapPrefix(id))}
function asaResetBrowsing(){asaBrowserSearch='';asaBrowserSort='name';asaBrowserFilter='all';asaFactSearch='';asaFactSource='all';asaFactSort='category';asaFactLimit=12;gameEditorId=''}
function asaResetMaps(){asaSelectedMap='';asaSelectedCategory='';asaSelectedSubfolder='';asaResetBrowsing()}
function asaSelectMap(id){if(!asaMapById(id))return;asaSelectedMap=id;asaSelectedCategory='';asaSelectedSubfolder='';asaResetBrowsing();render()}
function asaSelectCategory(id){if(!asaSelectedMap||!asaGroupById(id))return;asaSelectedCategory=id;asaSelectedSubfolder='';asaResetBrowsing();render()}
function asaSelectSubfolder(id){const g=asaGroupById(asaSelectedCategory),m=asaSelectedMapInfo();if(!asaSubById(g,m,id))return;asaSelectedSubfolder=id;asaResetBrowsing();render()}
function asaJump(level){if(level<=0){asaResetMaps()}else if(level===1){asaSelectedCategory='';asaSelectedSubfolder='';asaResetBrowsing()}else if(level===2){asaSelectedSubfolder='';asaResetBrowsing()}render()}
function asaBack(){if(asaSelectedSubfolder){asaSelectedSubfolder='';asaResetBrowsing()}else if(asaSelectedCategory){asaSelectedCategory='';asaResetBrowsing()}else if(asaSelectedMap){asaResetMaps()}else return false;render();return true}
function asaBrowserLevel(){return !asaSelectedMap?0:!asaSelectedCategory?1:!asaSelectedSubfolder?2:3}
function asaBrowserItems(){
 const map=asaSelectedMapInfo();
 if(!map)return asaMaps.map(m=>({id:m.id,title:m.name,description:m.desc,label:m.group,count:asaMapFacts(m.id).length,notes:asaMapNoteCount(m.id),search:m.name+' '+m.group+' '+m.desc+' '+m.tags}));
 if(!asaSelectedCategory)return asaFolderGroups.map(g=>({id:g.id,title:g.name,description:g.special?'Folders unique to '+map.name:g.id==='all'?'Full searchable map reference collection':'Open nested folders',label:'Category',count:asaFactsForGroup(map.id,g.id).length,notes:asaNoteCount(asaMapPrefix(map.id)+'::'+g.id),search:g.name+' '+map.name}));
 const group=asaGroupById(asaSelectedCategory);
 if(!asaSelectedSubfolder)return asaSubfolders(group,map).map(sub=>({id:sub.id,title:sub.name,description:sub.all?'All indexed references for '+map.name:'Map-specific source records and notes',label:'Subfolder',count:asaFactsAt(map.id,group.id,sub.id).length,notes:asaNoteCount(asaMapPrefix(map.id)+'::'+group.id+'::'+sub.id),search:sub.name+' '+map.name+' '+group.name}));
 return [];
}
function asaBrowserItemsFiltered(){
 let items=asaBrowserItems().filter(x=>{
 const found=(x.search+' '+x.title).toLowerCase().includes(asaBrowserSearch.toLowerCase());
 return found&&(asaBrowserFilter==='all'||asaBrowserFilter==='references'&&x.count>0||asaBrowserFilter==='notes'&&x.notes>0);
 });
 items.sort((a,b)=>asaBrowserSort==='name-desc'?b.title.localeCompare(a.title):asaBrowserSort==='most-facts'?b.count-a.count||a.title.localeCompare(b.title):asaBrowserSort==='most-notes'?b.notes-a.notes||a.title.localeCompare(b.title):a.title.localeCompare(b.title));
 return items;
}
function asaBrowserRow(item,level){
 const fn=level===0?'asaSelectMap':level===1?'asaSelectCategory':'asaSelectSubfolder';
 const safeId=JSON.stringify(item.id).replace(/"/g,'&quot;');
 return '<button class="asa-folder-row" data-asa-entry="1" onclick="'+fn+'('+safeId+')"><span class="asa-folder-ico">'+(level===0?'◈':level===1?'▤':'▣')+'</span><span class="asa-folder-body"><b>'+esc(item.title)+'</b><small>'+esc(item.description)+'</small><small>'+item.count+' references · '+item.notes+' notes</small></span><span class="asa-folder-arrow">›</span></button>';
}
function asaBrowserRows(){
 const level=asaBrowserLevel(),items=asaBrowserItemsFiltered();
 return items.length?items.map(i=>asaBrowserRow(i,level)).join(''):'<p class="empty">No folders match those filters. Change the search or filter to view the full list.</p>';
}
function asaRefreshBrowserList(){
 const e=document.getElementById('asaBrowserList');if(e)e.innerHTML=asaBrowserRows();
 const n=document.getElementById('asaBrowserCount');if(n)n.textContent=asaBrowserItemsFiltered().length+' of '+asaBrowserItems().length+' folders shown';
}
function asaSearchFolders(v){asaBrowserSearch=String(v||'');asaRefreshBrowserList()}
function asaChangeSort(v){asaBrowserSort=v;asaRefreshBrowserList()}
function asaChangeFilter(v){asaBrowserFilter=v;asaRefreshBrowserList()}
function asaBrowserControls(){
 const sorts=[['name','Name A–Z'],['name-desc','Name Z–A'],['most-facts','Most references'],['most-notes','Most notes']];
 const filters=[['all','All'],['references','With references'],['notes','With notes']];
 return '<div class="panel asa-search-panel"><label for="asaBrowserSearch">Search maps and folders</label><input class="field" id="asaBrowserSearch" value="'+esc(asaBrowserSearch)+'" type="search" placeholder="Search by name or topic…" oninput="asaSearchFolders(this.value)">'+
 '<div class="asa-filter-row"><label>Show<select class="field" id="asaBrowserFilter" onchange="asaChangeFilter(this.value)">'+filters.map(x=>'<option value="'+x[0]+'"'+(x[0]===asaBrowserFilter?' selected':'')+'>'+x[1]+'</option>').join('')+'</select></label>'+
 '<label>Sort by<select class="field" id="asaBrowserSort" onchange="asaChangeSort(this.value)">'+sorts.map(x=>'<option value="'+x[0]+'"'+(x[0]===asaBrowserSort?' selected':'')+'>'+x[1]+'</option>').join('')+'</select></label></div>'+
 '<p class="sub" id="asaBrowserCount">'+asaBrowserItemsFiltered().length+' of '+asaBrowserItems().length+' folders shown</p></div>';
}
function asaFactsFiltered(){
 const q=asaFactSearch.trim().toLowerCase();
 let facts=asaFactsAt(asaSelectedMap,asaSelectedCategory,asaSelectedSubfolder).filter(x=>{
 const searchable=(x.category+' '+x.title+' '+x.detail+' '+x.source).toLowerCase();
 return searchable.includes(q)&&(asaFactSource==='all'||x.evidence===asaFactSource);
 });
 return facts.sort((a,b)=>asaFactSort==='title-desc'?b.title.localeCompare(a.title):asaFactSort==='publisher'?((a.evidence==='publisher'?0:1)-(b.evidence==='publisher'?0:1))||a.title.localeCompare(b.title):asaFactSort==='category'?a.category.localeCompare(b.category)||a.title.localeCompare(b.title):a.title.localeCompare(b.title));
}
function asaFactsDisplay(){const list=asaFactsFiltered(),show=list.slice(0,asaFactLimit);return show.length?show.map(ragFactCard).join(''):'<p class="empty">No source-backed facts match this filter. Your notes are kept separately below.</p>'}
function asaUpdateFacts(){
 const results=document.getElementById('asaFactResults');if(results)results.innerHTML=asaFactsDisplay();
 const count=document.getElementById('asaFactCount');if(count)count.textContent='Showing '+Math.min(asaFactLimit,asaFactsFiltered().length)+' of '+asaFactsFiltered().length+' results';
 const more=document.getElementById('asaFactMore');if(more)more.hidden=asaFactLimit>=asaFactsFiltered().length;
}
function asaFactSearchSet(v){asaFactSearch=String(v||'');asaFactLimit=12;asaUpdateFacts()}
function asaFactSourceSet(v){asaFactSource=v;asaFactLimit=12;asaUpdateFacts()}
function asaFactSortSet(v){asaFactSort=v;asaUpdateFacts()}
function asaFactShowMore(){asaFactLimit+=12;asaUpdateFacts()}
function asaFactPanel(){
 const n=asaFactsAt(asaSelectedMap,asaSelectedCategory,asaSelectedSubfolder).length;
 let h='<div class="panel asa-facts"><h3>MAP REFERENCE ENTRIES ('+n+')</h3><p class="empty">Source-backed entries are separate from your notes. Community-sourced values still require game-version and settings verification.</p>';
 if(n){
 h+='<label for="asaFactSearch">Search information</label><input id="asaFactSearch" class="field" type="search" placeholder="Creature, resource, location, boss…" value="'+esc(asaFactSearch)+'" oninput="asaFactSearchSet(this.value)">';
 h+='<div class="asa-filter-row"><label>Evidence<select id="asaFactSource" class="field" onchange="asaFactSourceSet(this.value)">'+[['all','All sources'],['publisher','Publisher'],['community','Community']].map(x=>'<option value="'+x[0]+'"'+(x[0]===asaFactSource?' selected':'')+'>'+x[1]+'</option>').join('')+'</select></label>';
 h+='<label>Sort by<select id="asaFactSort" class="field" onchange="asaFactSortSet(this.value)">'+[['category','Category'],['title','Title A–Z'],['title-desc','Title Z–A'],['publisher','Publisher first']].map(x=>'<option value="'+x[0]+'"'+(x[0]===asaFactSort?' selected':'')+'>'+x[1]+'</option>').join('')+'</select></label></div>';
 h+='<p id="asaFactCount" class="sub">Showing '+Math.min(asaFactLimit,asaFactsFiltered().length)+' of '+asaFactsFiltered().length+' results</p><div id="asaFactResults">'+asaFactsDisplay()+'</div><button id="asaFactMore" class="secondary" onclick="asaFactShowMore()" '+(asaFactLimit>=asaFactsFiltered().length?'hidden':'')+'>Show 12 more</button>';
 }else h+='<p class="empty">This map and subfolder has no sourced records yet. You can add your own discoveries using + Add Note.</p>';
 return h+'</div>';
}
function asaBreadcrumb(){
 let h='<div class="panel asa-breadcrumb"><button class="secondary" onclick="asaJump(0)">Maps</button>';
 const map=asaSelectedMapInfo();
 if(map){h+=' <span>›</span> <button class="secondary" onclick="asaJump(1)">'+esc(map.name)+'</button>'}
 const group=asaGroupById(asaSelectedCategory);
 if(group){h+=' <span>›</span> <button class="secondary" onclick="asaJump(2)">'+esc(group.name)+'</button>'}
 if(asaSelectedSubfolder){const sub=asaSubById(group,map,asaSelectedSubfolder);if(sub)h+=' <span>›</span> <b>'+esc(sub.name)+'</b>'}
 return h+'</div>';
}
function asaLegacyNoteCount(){const data=asaNotesData();return Array.isArray(data['ASA::Ragnarok'])?data['ASA::Ragnarok'].length:0}
function asaMapsPage(){
 const map=asaSelectedMapInfo(),group=asaGroupById(asaSelectedCategory);
 let h=asaBreadcrumb();
 if(!map)h+='<div class="panel"><h3>ARK MAP LIBRARY</h3><p class="empty">Choose a map. Only Ragnarok currently has 96 source-backed entries. Other maps have independent category folders and personal notes; no unsourced facts are filled in.</p></div>';
 else if(!group)h+='<div class="panel"><h3>'+esc(map.name)+'</h3><p class="sub">'+esc(map.group)+' · '+asaMapFacts(map.id).length+' sourced entries · '+asaMapNoteCount(map.id)+' personal notes</p><p class="empty">'+esc(map.desc)+'</p>'+(map.id==='ragnarok'&&asaLegacyNoteCount()?'<button class="secondary" onclick="selectGameFolder(&quot;Ragnarok&quot;)">Open '+asaLegacyNoteCount()+' notes saved in the previous Ragnarok folder</button>':'')+'</div>';
 else if(!asaSelectedSubfolder)h+='<div class="panel"><h3>'+esc(group.name)+' / '+esc(map.name)+'</h3><p class="sub">Choose a subfolder. Map-specific content and notes are kept separate.</p></div>';
 else {const sub=asaSubById(group,map,asaSelectedSubfolder);h+='<div class="panel"><h3>'+esc(sub?.name||'Subfolder')+'</h3><p class="sub">'+esc(map.name)+' / '+esc(group.name)+'</p></div>';h+=asaFactPanel();return h}
 h+=asaBrowserControls()+'<div id="asaBrowserList" class="asa-browser-list">'+asaBrowserRows()+'</div>';
 return h;
}

function searchGameNotes(term){
 const q=String(term||'').toLowerCase();
 document.querySelectorAll('[data-game-note]').forEach(el=>{el.hidden=!el.dataset.gameNote.toLowerCase().includes(q)});
}
function sortGameNotes(mode){
 const list=document.getElementById('gameNotesList');if(!list)return;
 const all=Array.from(list.querySelectorAll('[data-game-note]'));
 all.sort((a,b)=>mode==='name'?a.dataset.gameNoteTitle.localeCompare(b.dataset.gameNoteTitle):mode==='oldest'?a.dataset.gameNoteDate.localeCompare(b.dataset.gameNoteDate):b.dataset.gameNoteDate.localeCompare(a.dataset.gameNoteDate));
 all.forEach(el=>list.appendChild(el));
}
