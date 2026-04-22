# Weather Dashboard & API Explorer

Lecture 14: Asynchronous JavaScript — Callbacks, Promises & Async/Await

## What You'll Build

A Weather Dashboard that fetches real weather data from live APIs, demonstrating the evolution from callbacks to Promises to async/await, parallel execution with Promise combinators, and production-ready error handling patterns.

## How to Run

### In the Browser (recommended for fetch demos)

1. Open `index.html` in your browser
2. Open DevTools → Console tab to see output
3. Open DevTools → Network tab to watch API requests live

### In Node.js (for timer and callback demos)

```bash
node script.js
```

> **Note:** Some features like `fetch` require Node.js 18+ (built-in fetch) or a browser environment.

## File Structure

```
code/
├── README.md              ← This file
├── index.html             ← HTML entry point (loads script.js)
├── style.css              ← Dark theme styling for the console page
├── script.js              ← Complete working code (5 Parts)
└── script-debug.js        ← Intentional bugs for debugging practice
```

## Key Concepts Covered

- **Part 1:** Event loop, setTimeout/setInterval, synchronous vs async execution
- **Part 2:** Callbacks, callback hell, Promises (.then/.catch/.finally), chaining
- **Part 3:** Promise.all, allSettled, race, any, async/await, try/catch with await
- **Part 4:** fetch API, response.ok checking, AbortController, loading/error/success states
- **Part 5:** Real weather API calls, sequential vs parallel performance, retry logic, TypeScript types (preview)
