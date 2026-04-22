# Enterprise Data Transformer
Lecture 12: Data Transformation — Destructuring, Spread & Object Mastery

## What You'll Build
A comprehensive data transformation system that processes employee records through multiple pipelines — extracting fields with destructuring, merging data with spread, protecting configs with freeze/seal, transforming objects with entries/fromEntries pipelines, and serializing with JSON.

## How to Run

### Browser Version (script.js)
1. Open `index.html` in your browser (Chrome recommended)
2. Open Chrome DevTools → Console tab (`F12` or `Ctrl+Shift+J`)
3. All output is logged to the console
4. Modify the employee dataset or pipeline parameters in `script.js` to experiment

### Node.js Version
1. Make sure Node.js is installed (`node --version`)
2. Run directly:
   ```bash
   node script.js
   ```

## File Structure
```
code/
├── README.md              ← This file
├── index.html             ← Browser version — main HTML page
├── style.css              ← NexusBerry-branded styling for the browser page
├── script.js              ← All lecture code — organized by Parts 1–5
└── script-debug.js        ← Debug version with 6 intentional bugs
```

## Key Concepts Covered
- Part 1: Property shorthand, computed property names, object/array/nested destructuring, defensive destructuring with defaults
- Part 2: Spread operator (arrays & objects), rest operator, merging, shallow vs deep copy, `structuredClone`, safe immutable functions
- Part 3: `Object.freeze` & `Object.seal`, `Object.keys/values/entries`, `Object.fromEntries` transformation pipelines, `Object.assign`, `Array.from/isArray/of`
- Part 4: `JSON.stringify/parse`, replacer functions, JSON limitations, 5 real-world data transformation pipelines (API→display, group-by, department summary, deep config merge, key rename & reshape)
- Part 5: TypeScript interfaces, type aliases, optional & readonly properties, extending interfaces, index signatures (in comments — run in TS Playground)
