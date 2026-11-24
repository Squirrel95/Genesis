const fs=require('node:fs');const assert=require('node:assert/strict');
const html=fs.readFileSync('app/src/main/assets/index.html','utf8');const css=fs.readFileSync('app/src/main/assets/repair.css','utf8');
new Function(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
for(const x of ['genesis.rebuild.20261123.','OPERATIONS STATUS','togglePerformance','if(document.hidden)return','!state.lowMotion','cardNav(\'dinos\'','reactor-display','personalDinoTracker','statusClock.format','put(\'reduceMotion\',next)'])assert.ok(html.includes(x),x);
assert.ok(css.includes('.command-metrics'));assert.ok(css.includes('body.reduce-motion'));console.log('Command core integration and syntax verified');
