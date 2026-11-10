// Regression tests: the ARK slots must actually display installed Ragnarok facts.
// Run: node tests/check-ragnarok-slots.js
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assets = path.resolve(__dirname,'../app/src/main/assets');
const html = fs.readFileSync(path.join(assets,'index.html'),'utf8');
const external = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(x=>x[1]);
for (const name of ['ragnarok-data.js','ragnarok-update-1-explore.js','ragnarok-update-2-taming.js','ragnarok-update-3-progression.js','ragnarok-slots.js'])
 assert(external.includes(name),'missing loaded asset '+name);
const memory = new Map();
const storage = {getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k),key:i=>[...memory.keys()][i],get length(){return memory.size}};
const ids={
 screen:{innerHTML:''},
 toast:{textContent:'',classList:{add(){},remove(){}}},
 gameNoteTitle:{value:'My tested note'},
 gameNoteBody:{value:'Wild Griffin near mountains'},
 gameNoteSource:{value:''}
};
const doc={getElementById:k=>ids[k]||(ids[k]={innerHTML:'',value:''}),querySelectorAll:()=>[],body:{style:{setProperty(){}}}};
const ctx=vm.createContext({window:{},document:doc,localStorage:storage,scrollTo(){},setTimeout(){},confirm:()=>true,URL,console});
for(const name of external)vm.runInContext(fs.readFileSync(path.join(assets,name),'utf8'),ctx,{filename:name});
const inline=html.slice(html.lastIndexOf('<script>')+8,html.indexOf('</script>',html.lastIndexOf('<script>')));
vm.runInContext(inline,ctx,{filename:'index-inline.js'});
const act=code=>vm.runInContext(code,ctx);
assert.equal(act('ragAllFacts().length'),96,'missing Ragnarok facts');
act("selectGame('ASA')");
let page=act('gamePage()');
assert(page.includes('Bosses & Progression'),'missing boss folder');
assert(page.includes('source-backed entries'),'missing folder counts');
act("selectGameFolder('Dashboard')");
page=act('gamePage()');
for(const count of [24,27,28])assert(page.includes(count+' reference entries'),'missing visible data pack '+count);
for(const word of ['Bison','Nunatak'])assert(page.includes(word),'missing real visible fact '+word);
for(const folder of ['Creatures & Taming','Breeding & Genetics','Crafting & Recipes','Items & Resources','Maps & Caves','Bosses & Progression','Servers & Transfers']){
 act('selectGameFolder('+JSON.stringify(folder)+')');
 page=act('gamePage()');
 assert(act('ragSlotFacts('+JSON.stringify(folder)+').length')>0,'empty expected populated slot '+folder);
 assert(page.includes('Evidence:'),'missing source reference in '+folder);
}
act("selectGameFolder('Base Building')");
assert(act('gamePage()').includes('No Ragnarok-specific source-backed reference data'),'unsupported section not marked pending');
act("selectGameFolder('Creatures & Taming');beginGameNote();saveGameNote()");
assert.equal(act("gameNotesRead()['ASA::Creatures & Taming'].length"),1,'personal note not saved');
assert(act('gamePage()').includes('My tested note'),'personal note not displayed');
act("openRagPack('progress')");
assert(act('gamePage()').includes('28 references in this view'),'pack deep link broken');
console.log('PASS: Ragnarok total, visible packs, 7 category slots, sources, note storage, and deep links');
