# Interactive Task Board with Drag & Drop

Lecture 16: DOM Manipulation & Event-Driven Programming

## What You'll Build

An Interactive Task Board where you can create tasks from a form, drag them between columns (To Do, In Progress, Done), delete individual cards, and see real-time column counts — all built with vanilla JavaScript DOM manipulation and event delegation.

## How to Run

### In the Browser

1. Open `index.html` in your browser (or use Live Server in VS Code)
2. Open DevTools → Console tab to see DOM operation logs
3. Open DevTools → Elements tab to watch the DOM tree update in real-time

### With Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Changes in `script.js` will auto-refresh the browser

### With npx serve

```bash
npx serve .
```

## File Structure

```
code/
├── README.md              ← This file
├── index.html             ← HTML entry point with task board structure
├── style.css              ← NexusBerry dark theme styling
├── script.js              ← Complete working code (4 Parts)
└── script-debug.js        ← Intentional bugs for debugging practice
```

## Key Concepts Covered

- **Part 1:** DOM selection (querySelector, querySelectorAll), traversal (parentElement, children, closest), NodeList vs Array
- **Part 2:** Creating elements (createElement), inserting (append, prepend, insertAdjacentHTML), modifying (textContent, innerHTML, classList, dataset), removing (remove, replaceWith), styling via JS
- **Part 3:** Event listeners (addEventListener), event object (target, currentTarget), event delegation with closest(), form handling with preventDefault(), keyboard events
- **Part 4:** HTML5 drag & drop (dragstart, dragover, drop, dragend), DocumentFragment for batch insertion, dynamic UI updates (column counts, toggle visibility), DOM performance awareness
