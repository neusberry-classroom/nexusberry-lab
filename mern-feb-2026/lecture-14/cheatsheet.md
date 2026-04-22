<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

# Asynchronous JavaScript Cheatsheet

Quick reference for all async concepts covered in Lecture 14.

---

## Synchronous vs Asynchronous

Synchronous code runs top to bottom — each line waits for the previous one. Asynchronous code lets JavaScript do other work while waiting for slow operations (API calls, timers).

```javascript
// SYNCHRONOUS — blocks everything
console.log("A");
// ... slow operation (3 seconds) ...
console.log("B");  // Waits 3 seconds
// Total: 3+ seconds, UI frozen

// ASYNCHRONOUS — non-blocking
console.log("A");
setTimeout(() => console.log("B"), 3000);  // Runs later
console.log("C");  // Runs immediately
// Output: A, C, B — no blocking
```

> **Pro Tip:** JavaScript is single-threaded but not single-capable. The browser provides Web APIs that handle waiting in the background while JavaScript keeps running.

---

## The JavaScript Runtime — Event Loop

Four components that make async work:

```
┌──────────────┐     ┌────────────────────────┐
│  CALL STACK   │     │       WEB APIs          │
│  (executes    │────→│  Timer | fetch | DOM    │
│   code)       │     │  (handles waiting)      │
└──────────────┘     └──────────┬─────────────┘
                                │
                     ┌──────────▼─────────────┐
                     │    CALLBACK QUEUE        │
                     │  (completed callbacks)   │
                     └──────────┬─────────────┘
                                │
                     ┌──────────▼─────────────┐
                     │      EVENT LOOP          │
                     │  Stack empty? → move     │
                     │  next callback to stack  │
                     └────────────────────────┘
```

| Component | Role |
|-----------|------|
| **Call Stack** | Executes code one frame at a time |
| **Web APIs** | Browser services that handle waiting (timers, fetch, DOM events) |
| **Callback Queue** | Completed callbacks waiting to be picked up |
| **Event Loop** | Moves callbacks from queue to stack when stack is empty |

> **Pro Tip:** `setTimeout(fn, 0)` does NOT execute immediately — the callback still goes through Web API → Queue → Event Loop. Synchronous code always runs first.

---

## Timers — setTimeout & setInterval

```javascript
// setTimeout — run once after delay
const timeoutId = setTimeout(() => {
  console.log("Runs after 2 seconds");
}, 2000);
clearTimeout(timeoutId);  // Cancel before it runs

// setInterval — run repeatedly
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Tick ${count}`);
  if (count >= 3) clearInterval(intervalId);  // MUST clear!
}, 1000);
```

| Method | Purpose | Returns |
|--------|---------|---------|
| `setTimeout(fn, ms)` | Run once after delay | Timer ID |
| `setInterval(fn, ms)` | Run repeatedly at interval | Interval ID |
| `clearTimeout(id)` | Cancel a pending timeout | `undefined` |
| `clearInterval(id)` | Stop a running interval | `undefined` |

> **Pro Tip:** Always store interval IDs and clear them when done. Forgotten `clearInterval` is one of the top memory leaks in React apps — you'll clean these up in `useEffect` cleanup functions.

---

## Callbacks

A callback is a function passed as an argument, called when an async operation completes.

```javascript
// Callback pattern
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Rana Ajmal", city: "Lahore" };
    callback(data);  // "Call back" with the result
  }, 1000);
}

fetchData((result) => {
  console.log(result.name);  // "Rana Ajmal"
});
```

**Callback Hell (Pyramid of Doom):**

```javascript
// AVOID — deeply nested, unreadable
getUser(id, (user) => {
  getOrders(user.id, (orders) => {
    getDetails(orders[0].id, (details) => {
      console.log(details);  // 3 levels deep!
    });
  });
});
```

> **Pro Tip:** Callbacks are still used in event handlers, `setTimeout`, and legacy code. Understanding them helps you read any codebase.

---

## Promises

A Promise represents a value that will be available in the future. Three states: **pending** → **fulfilled** (success) or **rejected** (failure).

```javascript
// Creating a Promise
function getWeather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (city === "") reject(new Error("City required"));
      else resolve({ city, temp: 32 });
    }, 1000);
  });
}

// Consuming a Promise — .then() / .catch() / .finally()
getWeather("Lahore")
  .then(data => console.log(`${data.city}: ${data.temp}°C`))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Request complete"));
```

**Promise Chaining — flat, readable sequences:**

```javascript
fetchUser(1)
  .then(user => fetchOrders(user.id))       // Return Promise → chain continues
  .then(orders => fetchDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.error(error))      // ONE catch for ALL errors
  .finally(() => console.log("Done"));
```

> **Pro Tip:** Every `.then()` returns a NEW Promise — that's what enables chaining. Always `return` inside `.then()` so the next handler gets the value. Missing `return` is the #1 Promise bug.

---

## Promise Combinators

| Combinator | Resolves When | Rejects When | Use Case |
|-----------|---------------|--------------|----------|
| `Promise.all` | ALL succeed | ANY one fails | Parallel fetch — all results needed |
| `Promise.allSettled` | ALL settle | Never rejects | Dashboard — show partial results |
| `Promise.race` | FIRST settles | FIRST settles (if fail) | Timeout patterns |
| `Promise.any` | FIRST succeeds | ALL fail | Fallback servers |

```javascript
// Promise.all — all or nothing (group dinner: everyone must arrive)
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);

// Promise.allSettled — tolerant (survey: collect whatever responds)
const results = await Promise.allSettled([
  getWeather("Lahore"),
  getWeather("Atlantis")  // Will fail — but won't break the rest
]);
results.forEach(r => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.log(`Failed: ${r.reason.message}`);
});

// Promise.race — timeout pattern (taxi vs Uber: first one wins)
const data = await Promise.race([
  fetch(url),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 5000)
  )
]);
```

> **Pro Tip:** Use `Promise.all` for transactions (all must succeed). Use `Promise.allSettled` for dashboards (show whatever loads). `Promise.race` is perfect for adding timeouts to any async operation.

---

## async / await

Syntactic sugar over Promises — same engine, cleaner syntax. `async` marks a function, `await` pauses until a Promise resolves.

```javascript
// async function — always returns a Promise
async function loadWeather(city) {
  const response = await fetch(url);     // Pauses here
  const data = await response.json();    // Pauses here
  return data;                           // Wrapped in Promise automatically
}

// Error handling — try/catch (same as L13!)
async function loadWeatherSafe(city) {
  try {
    const data = await getWeather(city);
    console.log(`${data.city}: ${data.temp}°C`);
    return data;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  } finally {
    console.log("Request complete");
  }
}

// Parallel with async/await + Promise.all
async function loadDashboard() {
  const [users, posts, todos] = await Promise.all([
    fetchData("/api/users"),
    fetchData("/api/posts"),
    fetchData("/api/todos")
  ]);
}
```

| Rule | Detail |
|------|--------|
| `await` only inside `async` functions | Using `await` in a regular function throws `SyntaxError` |
| `async` functions return Promises | Even `return 42` becomes `Promise.resolve(42)` |
| `await` unwraps Promises | `const data = await promise` gives the resolved value |
| Use `try/catch` for errors | Replaces `.catch()` from Promise chains |

> **Pro Tip:** Combine `async/await` with `Promise.all` for parallel execution with clean syntax: `const [a, b, c] = await Promise.all([...])`. This is the production pattern.

---

## The fetch API

Built-in browser function for making HTTP requests. Returns a Promise.

```javascript
// Basic fetch pattern
async function fetchData(url) {
  try {
    const response = await fetch(url);

    // CRITICAL: Check response.ok — fetch does NOT reject on 404/500!
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();  // Also async!
    return data;

  } catch (error) {
    console.error(`Fetch failed: ${error.message}`);
    return null;
  }
}
```

**fetch has TWO failure points:**

| Failure Type | What Happens | How to Handle |
|-------------|--------------|---------------|
| Network error (no internet, DNS) | `fetch` rejects | `catch` block |
| HTTP error (404, 500) | `fetch` resolves with `response.ok = false` | Check `response.ok` manually |

> **Pro Tip:** `fetch` only rejects on network failures. HTTP errors (404, 500) come back as resolved Promises — you MUST check `response.ok` yourself. This is the #1 fetch mistake in production code.

---

## AbortController — Canceling Requests

Cancel in-progress fetch requests. Essential for React `useEffect` cleanup.

```javascript
// Manual AbortController
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);
  const data = await response.json();
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was canceled");
  }
}

// Modern alternative: AbortSignal.timeout()
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000)  // Auto-cancel after 5 seconds
});
```

> **Pro Tip:** In React, when a user navigates away before fetch completes, you abort to prevent memory leaks and state updates on unmounted components. `AbortController` is the tool for this.

---

## Sequential vs Parallel Execution

```javascript
// SEQUENTIAL — slow (each waits for the previous)
const a = await fetch(url1);  // 1 sec
const b = await fetch(url2);  // 1 sec
const c = await fetch(url3);  // 1 sec
// Total: ~3 seconds

// PARALLEL — fast (all run simultaneously)
const [x, y, z] = await Promise.all([
  fetch(url1),  // All start at once
  fetch(url2),
  fetch(url3)
]);
// Total: ~1 second (time of slowest request)
```

| Pattern | When to Use | Performance |
|---------|-------------|-------------|
| Sequential `await` | Each request depends on the previous result | Slower, but necessary for dependencies |
| `Promise.all` | Requests are independent of each other | N times faster for N requests |

> **Pro Tip:** When you see sequential `await` for independent requests, refactor to `Promise.all`. This single change can cut page load times from 8 seconds to 2 seconds.

---

## Loading / Error / Success State Pattern

The frontend trinity — every data-fetching UI uses this pattern.

```javascript
async function loadData(url) {
  let state = { status: "loading", data: null, error: null };

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state = { status: "success", data, error: null };
  } catch (error) {
    state = { status: "error", data: null, error: error.message };
  }

  return state;
}
```

> **Pro Tip:** This is EXACTLY how React state management works — `useState` for `isLoading`, `data`, `error`. Every React component that loads data follows this pattern.

---

## Retry Logic with Exponential Backoff

```javascript
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = Math.pow(2, attempt) * 1000;  // 2s, 4s, 8s
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage:
const weather = await fetchWithRetry(() => getWeather("Lahore"));
```

> **Pro Tip:** Exponential backoff doubles the wait between each retry. This prevents hammering a failing server and gives it time to recover.

---

## TypeScript Async Types

```typescript
// Typed async function — Promise<T> return type
interface WeatherData {
  city: string;
  temperature: number;
  windSpeed: number;
  condition: string;
}

async function getWeather(city: string): Promise<WeatherData> {
  const response = await fetch(url);
  const data = await response.json();
  return data;  // TypeScript ensures this matches WeatherData
}

// Generic fetch helper — works with ANY type
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

// Usage with full type safety:
const weather = await fetchJSON<WeatherData>(url);
//    ^ TypeScript knows: .city, .temperature, .windSpeed, .condition
```

> **Pro Tip:** `Promise<T>` tells TypeScript two things: (1) the function is async, and (2) what type the resolved value is. This gives you full autocomplete and type checking on API responses.

---

## Common Mistakes to Avoid

### 1. Thinking setTimeout(fn, 0) Runs Immediately
```javascript
/* WRONG — expecting immediate execution */
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
// Expect: A, B, C  ← WRONG

/* CORRECT — understanding the event loop */
// Output: A, C, B
// setTimeout(fn, 0) goes through Web API → Queue → Event Loop
// Synchronous code (A, C) always runs first
```

### 2. Missing return Inside .then()
```javascript
/* WRONG — forgetting return */
fetchUser(1)
  .then(user => {
    fetchOrders(user.id);  // No return!
  })
  .then(orders => {
    console.log(orders);   // undefined!
  });

/* CORRECT — returning the Promise */
fetchUser(1)
  .then(user => {
    return fetchOrders(user.id);  // Return!
  })
  .then(orders => {
    console.log(orders);   // Works!
  });
```

### 3. Not Checking response.ok with fetch
```javascript
/* WRONG — assuming fetch rejects on 404 */
const response = await fetch("/api/user/999");
const data = await response.json();  // Parses error body as if success!

/* CORRECT — checking HTTP status */
const response = await fetch("/api/user/999");
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
const data = await response.json();
```

### 4. Forgetting await — Working with Promise Objects
```javascript
/* WRONG — no await */
async function getUser() {
  const response = fetch("/api/user");  // response is a Promise!
  const data = response.json();         // TypeError!
  return data;
}

/* CORRECT — with await */
async function getUser() {
  const response = await fetch("/api/user");
  const data = await response.json();
  return data;
}
```

### 5. Sequential await for Independent Requests
```javascript
/* WRONG — sequential when parallel is possible */
const users = await fetch("/api/users").then(r => r.json());   // 1 sec
const posts = await fetch("/api/posts").then(r => r.json());   // 1 sec
// Total: 2 seconds

/* CORRECT — parallel with Promise.all */
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);
// Total: ~1 second
```

### 6. Forgotten clearInterval — Memory Leak
```javascript
/* WRONG — interval runs forever */
setInterval(() => {
  console.log("Running...");
}, 1000);

/* CORRECT — capture ID and clear */
const id = setInterval(() => {
  console.log("Running...");
  if (done) clearInterval(id);
}, 1000);
```

---

## VS Code Shortcuts

| Shortcut (Windows) | Shortcut (Mac) | Action |
|--------------------|--------------------|--------|
| `Ctrl + Shift + \`` | `Cmd + Shift + \`` | Toggle integrated terminal |
| `Ctrl + D` | `Cmd + D` | Select next occurrence of word |
| `Ctrl + Shift + L` | `Cmd + Shift + L` | Select all occurrences of word |
| `Alt + Up/Down` | `Option + Up/Down` | Move line up/down |
| `Ctrl + /` | `Cmd + /` | Toggle line comment |
| `Ctrl + Shift + K` | `Cmd + Shift + K` | Delete entire line |
| `F12` | `F12` | Go to definition |
| `Ctrl + Space` | `Cmd + Space` | Trigger IntelliSense / autocomplete |

---

## Quick Reference Tables

### Async Methods

| What You Want | How to Do It |
|---------------|--------------|
| Run code after a delay | `setTimeout(fn, ms)` |
| Run code repeatedly | `setInterval(fn, ms)` |
| Cancel a timeout | `clearTimeout(id)` |
| Cancel an interval | `clearInterval(id)` |
| Create a Promise | `new Promise((resolve, reject) => {...})` |
| Handle success | `.then(value => {...})` |
| Handle failure | `.catch(error => {...})` |
| Run cleanup always | `.finally(() => {...})` |
| Wait for all Promises | `Promise.all([p1, p2, p3])` |
| Wait for all (tolerant) | `Promise.allSettled([p1, p2, p3])` |
| First to settle | `Promise.race([p1, p2])` |
| First to succeed | `Promise.any([p1, p2])` |
| Make function async | `async function name() {...}` |
| Wait for a Promise | `const result = await promise` |
| Make HTTP request | `fetch(url)` |
| Parse JSON response | `await response.json()` |
| Check HTTP success | `response.ok` or `response.status` |
| Cancel a request | `AbortController` + `signal` |
| Set request timeout | `AbortSignal.timeout(ms)` |

### Promise States

| State | Meaning | Handler |
|-------|---------|---------|
| **Pending** | Operation in progress | — |
| **Fulfilled** | Completed successfully | `.then(value)` |
| **Rejected** | Failed with an error | `.catch(error)` |
| **Settled** | Either fulfilled or rejected | `.finally()` |

---

## What's Next?

In **Lecture 15: Object-Oriented Programming — Classes, Prototypes & Encapsulation**, you'll learn:
- What OOP is and why it matters — objects as real-world models
- ES6 classes — `class`, `constructor`, instance methods
- Inheritance — `extends`, `super()`, method overriding
- Encapsulation — private fields (`#`), getters & setters
- Composition vs inheritance — when to prefer "has-a" over "is-a"
- Built-in classes — `Date`, `Map`, `Set`
- **Project:** Task Management System with Role Hierarchy

---

*Keep this cheatsheet handy while working on your assignment!*
