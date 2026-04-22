# University Admission Gateway
Lecture 9: Conditional Logic & Program Flow Control

## What You'll Build
A complete university admission system that processes student applications through multiple decision points — score validation, department routing, scholarship calculation, and final status determination — using all 7 JavaScript conditional constructs. Includes an interactive version with real user input via `prompt-sync`.

## How to Run

### Browser Version (script.js)
1. Open `index.html` in your browser (Chrome recommended)
2. Open Chrome DevTools → Console tab (`F12` or `Ctrl+Shift+J`)
3. All output is logged to the console
4. Modify the `application` object in `script.js` to test different scenarios

### Interactive Node.js Version (admission-interactive.js)
1. Make sure Node.js is installed (`node --version`)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the interactive gateway:
   ```bash
   node admission-interactive.js
   ```
4. Enter student data when prompted — the system makes real-time admission decisions

## File Structure
```
code/
├── README.md                      ← This file
├── package.json                   ← Node.js project config (prompt-sync dependency)
├── index.html                     ← Browser version — main HTML page
├── style.css                      ← Minimal styling for the browser page
├── script.js                      ← All lecture code — organized by Parts (browser)
├── script-debug.js                ← Debug version with intentional bugs
└── admission-interactive.js       ← Interactive Node.js version with prompt-sync
```

## Key Concepts Covered
- `if / else if / else` — range checks, condition ordering, nested vs flat
- `switch` — exact value matching, break, fall-through, default
- Ternary operator — inline conditional value assignment, nested ternary decision framework
- Short-circuit evaluation (`||` and `&&`) — defaults and guard clauses
- Nullish coalescing (`??`) — null/undefined-specific defaults
- Optional chaining (`?.`) — safe property access
- Logical assignment operators (`??=`, `||=`, `&&=`)
- User input with `prompt-sync` — interactive Node.js programs, `Number()` conversion
- TypeScript narrowing preview (typeof guards, truthiness, discriminated unions)
