/* Genesis Ragnarok reference slots, backed by the existing packaged facts. */
function ragSlotFacts(folder){
 const all=ragAllFacts();
 const explore=window.GENESIS_RAG_UPDATES?.explore||[];
 const tame=window.GENESIS_RAG_UPDATES?.taming||[];
 const progress=window.GENESIS_RAG_UPDATES?.progress||[];
 const base=window.GENESIS_RAGNAROK_FACTS||[];
 switch(folder){
 case 'Dashboard':return base.filter(x=>['Overview','Regions'].includes(x.category));
 case 'Ragnarok':return all;
 case 'Creatures & Taming':return [...tame,...base.filter(x=>x.category==='Creatures')];
 case 'Breeding & Genetics':return tame.filter(x=>/breed|baby|milk|hatch|juvenile|young/i.test(x.title+' '+x.detail));
 case 'Crafting & Recipes':return progress.filter(x=>['Tributes','Tek'].includes(x.category));
 case 'Items & Resources':return [...progress.filter(x=>['Resources','Element','Loot','Wyverns'].includes(x.category)),...tame.filter(x=>/food|kibble|harvest|milk/i.test(x.title))];
 case 'Maps & Caves':return [...explore.filter(x=>['Regions','Spawn zones','Environment','Caves','Maps','World'].includes(x.category)),...base.filter(x=>['Regions','Caves','Artifacts'].includes(x.category))];
 case 'Bosses & Progression':return [...progress,...base.filter(x=>x.category==='Bosses')];
 case 'Servers & Transfers':return explore.filter(x=>x.category==='World');
 default:return [];
 }
}
function ragFactCard(f){
 const url=safeGameUrl(f.url);
 const status=f.evidence==='publisher'?'Publisher documented':'Community documented · verify in ASA';
 return '<article class="gamefact rag-fact"><div class="rag-fact-meta"><span>'+esc(f.category)+'</span><small class="'+(f.evidence==='publisher'?'rag-primary':'rag-secondary')+'">'+status+'</small></div><b>'+esc(f.title)+'</b><p>'+esc(f.detail)+'</p>'+(url?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Evidence: '+esc(f.source)+' ↗</a>':'<small>Source not available</small>')+'</article>';
}
function openRagPack(pack){ragActivePack=pack;ragSearch='';ragCategory='All';ragLimit=12;selectGameFolder('Ragnarok')}
function renderRagDashboard(){
 const updates=window.GENESIS_RAG_UPDATES||{};
 let h='<div class="panel rag-dashboard"><h3>RAGNAROK ASCENDED · LOADED REFERENCE PACKS</h3><p class="empty">These are source-backed records, not blank placeholders. Select a pack to view all its information. Personal notes remain separate.</p>';
 for(const p of ragPacks){
  const facts=updates[p.id]||[];
  h+='<div class="rag-preview"><div class="rag-preview-title"><b>'+esc(p.title)+'</b><small>'+facts.length+' reference entries</small></div>';
  for(const f of facts.slice(0,3)){h+='<div class="rag-preview-fact"><b>'+esc(f.title)+'</b><small>'+esc(f.detail)+'</small></div>'}
  h+='<button class="secondary rag-preview-open" onclick="openRagPack(\''+p.id+'\')">Open '+esc(p.title)+' · '+facts.length+' entries ›</button></div>';
 }
 h+='<button class="action" onclick="selectGameFolder(&quot;Ragnarok&quot;)">Open all '+ragAllFacts().length+' Ragnarok references ›</button></div>';
 return h;
}
function renderRagFolderFacts(folder){
 const facts=ragSlotFacts(folder);
 let h='<div class="panel rag-slot"><div class="rag-slot-title"><h3>RAGNAROK · '+esc(folder.toUpperCase())+'</h3><small>'+facts.length+' source-backed entries</small></div>';
 if(!facts.length){
  h+='<p class="empty">No Ragnarok-specific source-backed reference data is available for this section yet. Your own notes can still be added below. We will not present placeholders as verified facts.</p>';
 }else{
  h+='<p class="empty">Reference facts are included offline. Publisher claims and community wiki entries are identified separately. Precise coordinates and game-file values still need verification.</p>';
  h+=facts.slice(0,8).map(ragFactCard).join('');
  if(facts.length>8){h+='<details class="rag-slot-extra"><summary>Show '+(facts.length-8)+' more reference entries</summary>'+facts.slice(8).map(ragFactCard).join('')+'</details>'}
 }
 h+='<button class="secondary rag-backref" onclick="selectGameFolder(&quot;Ragnarok&quot;)">Open all '+ragAllFacts().length+' Ragnarok references ›</button></div>';
 return h;
}
