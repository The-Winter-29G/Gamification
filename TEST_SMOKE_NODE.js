/* Optional local smoke test for code maintainers. Run: node TEST_SMOKE_NODE.js
 * Mocks Qualtrics to verify awardOnce's logic and the UI welcome behavior.
 * This is NOT a substitute for Qualtrics Preview and real Survey Flow tests.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const fields = {
  SurveyPoints:'0', InteractionScore:'0', arePointsVisible:'true',
  MultipleChoicePoints:'4', MatrixPoints:'2', ImageSliderPoints:'5'
};
const ids = {
  pointsContainer: {style:{}}, pointsText:{innerText:''},
  droppy:{style:{}, offsetWidth:100},
  plusPointsContainer:{style:{}}, plusPoints:{innerText:''}
};
const ready = []; const load = [];
const survey = {
  getJSEmbeddedData: k => fields[k],
  setJSEmbeddedData: (k,v) => {fields[k]=String(v);},
  addOnReady: fn => ready.push(fn),
  addOnload: fn => load.push(fn),
  addOnUnload: () => {}
};
const timeouts = [];
const context = {
  console,
  Qualtrics: {SurveyEngine:survey},
  document: {
    getElementById: id => ids[id] || null,
    querySelector: () => null,
    querySelectorAll: () => []
  },
  setTimeout: fn => {timeouts.push(fn);return timeouts.length;},
  clearTimeout: () => {},
  window: null,
  Image: class {}
};
context.window = context;
vm.createContext(context);
const header=fs.readFileSync(path.join(root,'00_header/DROPPY_HEADER_COMPLETE.html'),'utf8');
const scripts=[...header.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,2);
for(const s of scripts)vm.runInContext(s[1],context);
assert.equal(typeof context.DroppyPoints.awardOnce,'function');
assert.equal(context.DroppyPoints.awardOnce({flag:'Q1',field:'MultipleChoicePoints'}),true);
assert.equal(fields.SurveyPoints,'4');
assert.equal(fields.InteractionScore,'1');
assert.equal(context.DroppyPoints.awardOnce({flag:'Q1',field:'MultipleChoicePoints'}),false);
assert.equal(fields.SurveyPoints,'4');
assert.equal(context.DroppyPoints.awardOnce({flag:'Q2',amount:3}),true);
assert.equal(fields.SurveyPoints,'7');
assert.equal(fields.InteractionScore,'2');
fields.SurveyPoints='0';
context.updatePointsDisplay(true);
assert.equal(ids.pointsText.innerText,'Welcome to the survey!');
context.DroppyPoints.awardOnce({flag:'Q3',amount:2});
assert.equal(ids.pointsText.innerText,'Welcome to the survey!');
timeouts[timeouts.length-1](); // latest animation, not welcome; find welcome by index
// Welcome timer was created first in previous call; force only callback that restores text.
for(const fn of timeouts){fn(); if (ids.pointsText.innerText.startsWith('You currently have')) break;}
assert.equal(ids.pointsText.innerText,'You currently have 2 points!');
console.log('PASS: helper awards once, counts interactions and preserves timed welcome against stale totals.');
