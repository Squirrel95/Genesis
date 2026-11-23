const fs = require('node:fs');
const assert = require('node:assert/strict');
global.window = {};
require('../app/src/main/assets/ark-personal-seed.js');
const seed = window.GENESIS_DINO_SEED;
assert.equal(seed.dinos.length,34,'Individual dino count');
assert.equal(new Set(seed.dinos.map(x=>x.id)).size,34,'No duplicate IDs');
assert.equal(new Set(seed.dinos.map(x=>x.species.replace('Burning Mantis','Mantis').replace('Sunset Rubber Ceratosaurus','Ceratosaurus'))).size,11);
assert.equal(seed.dinos.filter(x=>x.species==='Pegomastax').length,7);
assert.equal(seed.dinos.filter(x=>x.species.includes('Mantis')).length,6);
assert.equal(seed.dinos.filter(x=>x.species==='Pyromane').length,5);
assert.equal(seed.dinos.filter(x=>x.species==='Gacha').length,3);
assert.equal(seed.dinos.find(x=>x.id===33).production[0],'Element Dust (user-confirmed)');
assert.ok(seed.dinos.find(x=>x.id===34).production[0].includes('Fragmented Green Gem'));
for(const d of seed.dinos) {
  assert.ok(seed.species[d.species], 'Species food/role missing for '+d.id);
  assert.ok(d.photo.startsWith('image-')&&d.photo.endsWith('.jpg'));
  assert.ok(d.food===null||Number.isFinite(d.food));
}
const index=fs.readFileSync('app/src/main/assets/index.html','utf8');
for(const text of ['ark-personal-tracker.css','ark-personal-seed.js','ark-personal-tracker.js','data-go="dinos"','renderPersonalDinos','case \'dinos\'','personalDinoTracker']) {
  assert.ok(index.includes(text),'Approved app integration missing '+text);
}
const match=index.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match,'Main inline script');
new Function(match[1]);
const ui=fs.readFileSync('app/src/main/assets/ark-personal-tracker.js','utf8');
new Function(ui);
const css=fs.readFileSync('app/src/main/assets/ark-personal-tracker.css','utf8');
assert.ok(css.includes('.dt-card')&&css.includes('.dt-food'));
console.log('Approved Genesis validated:',seed.dinos.length,'dinos / 11 species, original shell preserved.');
