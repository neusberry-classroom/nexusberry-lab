# Lecture 14: Asynchronous JavaScript — Callbacks, Promises & Async/Await

## PRESENTER ONLY (Not shared with students)

### Overview
- **Format**: Live Google Meet session
- **Style**: Presentation-driven (reveal.js) + live coding (VS Code)
- **Project**: Weather Dashboard & API Explorer
- **Goal**: Understand JavaScript's single-threaded nature and the event loop, master the evolution from callbacks to Promises to async/await, and build real-world data fetching patterns with the fetch API — the foundation for every React component that talks to a server

---

## Pre-Class Setup Checklist

- [ ] VS Code with clean dark theme (Dracula or One Dark Pro recommended)
- [ ] Font size set to 18–20px for screen-share readability
- [ ] Browser (Chrome) open with DevTools on Console tab, ready to run snippets
- [ ] Blank project folder created: `weather-dashboard/`
- [ ] New file open and ready: `weather-dashboard/app.js`
- [ ] Presentation loaded: `presentation/index.html` open in browser tab
- [ ] reveal.js CDN verified — advance through first 3 slides to confirm it loads
- [ ] Node.js installed and `node --version` confirms LTS (for terminal demos)
- [ ] Google Meet test run completed (audio, screen share, camera)
- [ ] Notifications silenced on all devices (phone on Do Not Disturb)
- [ ] Backup: Chrome DevTools Console ready as fallback for any VS Code issues
- [ ] Lecture-specific: JSONPlaceholder API verified — open `https://jsonplaceholder.typicode.com/todos/1` in a tab and confirm JSON loads
- [ ] Lecture-specific: Open-Meteo API verified — open `https://api.open-meteo.com/v1/forecast?latitude=31.55&longitude=74.35&current_weather=true` and confirm weather data loads for Lahore
- [ ] Lecture-specific: Network tab in DevTools ready for fetch demos — set to "All" filter to show XHR/fetch requests
- [ ] Lecture-specific: Prepare a scratch file with a list of city coordinates (Lahore, Karachi, Islamabad, Dubai, London) for multi-fetch demos

---

## Phase 0: Before Lecture (Lecture 14 — starts after Lecture 13 review)

### Portal Quiz Review (from Lecture 13)

> **Talking Points:**
> "Let's open with your Lecture 13 quiz results. String processing and error handling are the final foundational pieces before we move into async territory. These skills directly power what we're doing today — every API response is a string that needs parsing, and every network request needs error handling. Let's see how you did."

**Commonly Missed Areas to Watch For (String Processing, Pattern Matching & Defensive Error Handling — Lecture 13):**

- **Case-sensitive `includes()` and `startsWith()`**: Students forget that `"Hello".includes("hello")` is `false`. Always normalize with `toLowerCase()` first for case-insensitive checks. This will matter today when searching API response data.
- **`split()` with empty strings between delimiters**: `"a,,b".split(",")` gives `["a", "", "b"]` — three elements, not two. The empty string element catches people off guard. `split(/\s+/)` handles multiple spaces correctly.
- **`padStart` / `padEnd` target length vs padding amount**: `"5".padStart(3, "0")` pads to total length 3, not adds 3 zeros. Result: `"005"`, not `"0005"`. Students confuse target length with padding count.
- **`test()` vs `match()` return types**: `regex.test(str)` returns a boolean. `str.match(regex)` returns an array or null. Using the wrong one leads to truthy/falsy bugs. When you just need yes/no, use `test()`.
- **`try/catch/finally` execution flow**: `finally` ALWAYS runs — even after `return` inside `try` or `catch`. Students often think `return` exits completely. This is critical for today's async error handling.
- **Guard clauses vs try/catch confusion**: Guard clauses handle EXPECTED invalid input (proactive prevention). `try/catch` handles UNEXPECTED runtime failures (reactive recovery). Today's async code uses both — guard clauses for input validation, try/catch for network failures.

> **Transition:**
> "Excellent. If you scored 7 or above — your string and error handling foundation is solid. If not, revisit the cheatsheet — especially `try/catch/finally` because that exact pattern is the backbone of what we learn today. Speaking of which... today we answer a question every beginner asks: 'How does JavaScript do multiple things at once if it only has one thread?' Let's find out."

---

### Assignment Feedback (Lecture 13 — Smart Content Analyzer & Validator)

> **Talking Points:**
> "Let me share observations from the Smart Content Analyzer submissions. This was your most text-heavy project — processing real content with string methods, regex, and error handling together."

**Common Mistakes Observed:**

1. **Not using guard clauses before string methods**: Several submissions called `.trim()` or `.toLowerCase()` directly on function parameters without checking if the input is actually a string. If someone passes `null` or `undefined`, you get a `TypeError`. Guard first: `if (typeof input !== "string") throw new TypeError("Expected string")`.
2. **`split(" ")` instead of `split(/\s+/)`**: Single space split fails on multi-space, tab, or newline separated text. The regex `\s+` handles all whitespace consistently. Every production text parser uses regex splitting.
3. **Regex without the `g` flag for `match()`**: `str.match(/\d+/)` without the `g` flag returns only the first match with capture group details. With `g`, it returns ALL matches as a simple array. Students expected all matches but got only the first.
4. **Not guarding `match()` return value**: `str.match(regex)` returns `null` when nothing matches — not an empty array. Calling `.length` on `null` crashes. Always guard: `const matches = str.match(regex) || []`.
5. **Over-wrapping with try/catch**: Some submissions wrapped every single function in try/catch. This hides bugs instead of surfacing them. Catch specific failure points — network calls, JSON parsing, user input boundaries. Let programming errors (typos, logic bugs) throw loudly so you can fix them.

**Good Examples to Highlight:**

- Praise submissions that used guard clauses at the top of every function — fail fast, return early, then proceed with confidence
- Highlight anyone who built clean regex pipelines: validate input → extract patterns → format output
- Celebrate submissions that used structured error objects with meaningful messages: `throw new TypeError("Expected non-empty string, got: " + typeof input)`
- Acknowledge students who combined regex + try/catch elegantly: guard clause for format, try/catch for processing

> **Encouragement:**
> "Your Lecture 13 assignment proved you can validate input, match patterns, and handle errors. Today we take those exact skills to the next level — `try/catch` becomes your safety net for network requests, guard clauses validate API responses, and error handling determines whether your app shows a friendly message or a blank screen. Everything you learned yesterday directly enables what we build today."

---

## Phase 1: Today's Lecture (90 Minutes)

---

### Part 1: Why Async Matters — Single-Threaded JS & The Event Loop (00:00 – 20:00)

---

#### Background / Motivation (Presentation) — 00:00–05:00

> **Talking Points:**
> "So far in this course, every line of code you've written has executed top to bottom, one after another. Line 1 finishes, line 2 starts. That's called **synchronous** execution. And it works perfectly... until it doesn't."
>
> "Imagine you're building a weather app. The user clicks 'Get Weather.' Your code sends a request to a weather API. The server takes 2 seconds to respond. In synchronous code, the ENTIRE page freezes for those 2 seconds — no scrolling, no clicking, no typing. The browser literally stops responding. That's called **blocking**."
>
> "This is the problem async programming solves. JavaScript is **single-threaded** — it has ONE call stack, ONE thread of execution. But it's NOT single-capable. The browser provides **Web APIs** (timers, fetch, DOM events) that handle waiting in the background while JavaScript keeps running. When the waiting is done, the result gets queued back into JavaScript's execution flow."
>
> "Today you learn exactly how this works. We start with the runtime model — call stack, Web APIs, callback queue, event loop. Then we trace the evolution: callbacks → Promises → async/await. By the end, you'll fetch real weather data from the internet and display it — the same pattern behind every React app that loads data from a server."

**Slide: Why Async Matters**

| Without Async (Blocking) | With Async (Non-Blocking) |
|--------------------------|---------------------------|
| Request weather → page freezes → response arrives → page unfreezes | Request weather → page stays interactive → response arrives → update display |
| User sees: white screen, spinning cursor | User sees: loading spinner, responsive UI |
| Acceptable for: nothing in modern web | Required for: every API call, timer, user event |

> **Analogy — Restaurant Kitchen:**
> "Think of JavaScript as a restaurant with ONE chef. The chef can only do one thing at a time. If they stand at the oven waiting for a cake to bake (synchronous), no other orders get prepared. But a smart chef puts the cake in the oven, sets a timer, and starts preparing the next dish (asynchronous). When the timer rings, they pick up the cake. That oven is a **Web API**. The timer ringing is the **callback queue**. The chef deciding what to do next is the **event loop**."

**Slide: Today's Journey**

> ```
> Callbacks (2009)     →     Promises (2015)     →     async/await (2017)
> ┌──────────────┐       ┌──────────────────┐       ┌───────────────────┐
> │ function(cb)  │       │ .then().catch()   │       │ await fetch(url)  │
> │ cb(data)      │  →→   │ Promise chaining  │  →→   │ try/catch         │
> │ Pyramid doom  │       │ Flat chaining     │       │ Reads like sync   │
> └──────────────┘       └──────────────────┘       └───────────────────┘
>        ↑                       ↑                          ↑
>    The problem           The solution              The modern way
> ```
>
> "Same concept — three generations of syntax. Callbacks were the original pattern. Promises fixed the readability problem. `async/await` made async code read like normal synchronous code. We'll learn all three, because you'll see all three in production codebases."

---

#### Illustrations / Animations (Presentation) — 05:00–07:00

**Slide: The JavaScript Runtime**

> ```
> ┌─────────────────────────────────────────────────────────────────┐
> │                    BROWSER ENVIRONMENT                          │
> │                                                                 │
> │  ┌──────────────┐     ┌────────────────────────────────────┐   │
> │  │  CALL STACK   │     │          WEB APIs                  │   │
> │  │  ───────────  │     │  ┌────────┐ ┌───────┐ ┌────────┐ │   │
> │  │  greet()      │────→│  │ Timer  │ │ fetch │ │  DOM   │ │   │
> │  │  main()       │     │  │ API    │ │  API  │ │ Events │ │   │
> │  │  (global)     │     │  └───┬────┘ └───┬───┘ └───┬────┘ │   │
> │  └──────────────┘     └──────┼──────────┼────────┼────────┘   │
> │                               │          │        │            │
> │                               ▼          ▼        ▼            │
> │                      ┌─────────────────────────────────┐       │
> │                      │      CALLBACK QUEUE              │       │
> │                      │  [timer cb] [fetch cb] [click cb]│       │
> │                      └──────────────┬──────────────────┘       │
> │                                     │                          │
> │                         ┌───────────▼───────────┐              │
> │                         │     EVENT LOOP          │              │
> │                         │  "Is call stack empty?" │              │
> │                         │   Yes → move next cb    │              │
> │                         │   No  → wait            │              │
> │                         └─────────────────────────┘              │
> └─────────────────────────────────────────────────────────────────┘
> ```
>
> "Four components — memorize these:
> 1. **Call Stack** — where JavaScript executes code, one frame at a time
> 2. **Web APIs** — browser-provided services that handle waiting (timers, fetch, DOM events)
> 3. **Callback Queue** — completed callbacks waiting to be picked up
> 4. **Event Loop** — the traffic controller that moves callbacks from the queue to the stack when the stack is empty"
>
> "This is WHY `setTimeout(fn, 0)` doesn't execute immediately — the callback goes through the Web API → queue → event loop path, even with a 0ms delay. The event loop only moves it to the stack when the current execution is done."

**Slide: Synchronous vs Asynchronous — Visual Mental Model**

> ```
> SYNCHRONOUS (blocking)         ASYNCHRONOUS (non-blocking)
> ─────────────────────          ──────────────────────────
>
> Task A ████████                 Task A ████
> Task B         ████████         Task B     ████   (waiting in Web API)
> Task C                 ████     Task C ████████
>                                 Task B result       ████  (callback runs)
>
> Total: 12 seconds               Total: ~8 seconds
> ```
>
> "In synchronous execution, each task waits for the previous one to complete. In async, while one task is waiting (like a network request), JavaScript can do other work. The total time is shorter because waiting time overlaps with productive work."

---

#### "Let's see in Code now" (VS Code) — 07:00–16:00

> "Open VS Code. Create a new file: `weather-dashboard/app.js`. Let's prove that JavaScript is single-threaded but not single-capable."

```javascript
// ============================================
// Lecture 14 — Part 1: Why Async Matters
// Weather Dashboard & API Explorer
// NexusBerry Modern Frontend Course
// ============================================

// --- Demonstrating Blocking Behavior ---
// WARNING: This will freeze your browser/terminal!
// Uncomment to see blocking in action:

// console.log("⏱️ Before blocking loop");
// const start = Date.now();
// while (Date.now() - start < 3000) {} // Block for 3 seconds
// console.log("⏱️ After blocking loop");  // Nothing else can run during those 3 seconds

// In a browser, the UI freezes completely during this loop.
// No scrolling, no clicking, no animations.
// This is WHY we need async programming.

// --- setTimeout — Non-Blocking Timer ---
console.log("🔔 1. Before setTimeout");

setTimeout(() => {
  console.log("🔔 3. Inside setTimeout (runs AFTER current code finishes)");
}, 2000);  // 2 second delay

console.log("🔔 2. After setTimeout");

// Output order: 1, 2, 3
// setTimeout is non-blocking — JavaScript doesn't wait.
// The callback goes to the Web API, waits 2 seconds,
// then enters the callback queue, and the event loop
// moves it to the call stack when the stack is empty.

// --- The Famous 0ms setTimeout Puzzle ---
console.log("\n📋 A. First");

setTimeout(() => {
  console.log("📋 C. Inside setTimeout(fn, 0)");
}, 0);  // Zero milliseconds!

console.log("📋 B. Second");

// Output: A, B, C — even with 0ms delay!
// Why? setTimeout(fn, 0) still goes through:
//   1. Web API (registers timer)
//   2. Callback queue (after 0ms)
//   3. Event loop (waits for call stack to be empty)
// "B" runs first because it's on the call stack NOW.
// The setTimeout callback waits in the queue.

// --- setInterval — Repeated Timer ---
console.log("\n⏰ Starting interval...");

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`⏰ Tick ${count}`);

  if (count >= 3) {
    clearInterval(intervalId);  // MUST clear to prevent memory leak!
    console.log("⏰ Interval cleared — no more ticks");
  }
}, 1000);

// Important: Always store the interval ID and clear it when done.
// Forgetting clearInterval is a common memory leak in React apps.

// --- Multiple setTimeout — Demonstrating Async Ordering ---
console.log("\n🎯 Ordering demo:");
console.log("🎯 Start");

setTimeout(() => console.log("🎯 Timer 1 (500ms)"), 500);
setTimeout(() => console.log("🎯 Timer 2 (100ms)"), 100);
setTimeout(() => console.log("🎯 Timer 3 (300ms)"), 300);

console.log("🎯 End");

// Output: Start, End, Timer 2, Timer 3, Timer 1
// Timers execute based on delay duration, not code order.
// The synchronous code (Start, End) runs first regardless.
```

> **Teaching Flow:**
> 1. Run the setTimeout example first — show students the 1, 2, 3 ordering
> 2. Then the 0ms puzzle — this is the "aha" moment. "Even 0ms delay doesn't mean immediate!"
> 3. Show setInterval with clearInterval — emphasize the memory leak danger
> 4. Run the ordering demo — prove that synchronous code ALWAYS runs before any callback

> **Key Insight:**
> "The call stack processes ALL synchronous code first. Only when it's completely empty does the event loop move callbacks from the queue. This is why 0ms setTimeout still waits — it's not about the delay, it's about the queue."

---

#### Interactive Questions (Presentation/Verbal) — 16:00–19:00

**Interactive Question 1 — Predict Output: setTimeout Ordering**

> "Drop your answer in the chat. What's the console output?"

```javascript
console.log("X");
setTimeout(() => console.log("Y"), 0);
console.log("Z");
```

> **Pause for chat answers** (15 seconds)
>
> **Answer:** X, Z, Y
>
> "If you said X, Z, Y — you understand the event loop. `setTimeout` always yields to the callback queue, even with 0ms. The synchronous code (X, Z) runs first because it's already on the call stack. Y enters the queue and waits for the stack to clear."

**Interactive Question 2 — Concept Challenge: Why Doesn't setTimeout(fn, 0) Execute Immediately?**

> "Someone asks: 'If the delay is 0 milliseconds, why doesn't the callback run right away?'"
>
> **Pause for chat answers** (20 seconds)
>
> **Answer:** Because `setTimeout` doesn't put the callback on the call stack — it sends it to the Web API, which after 0ms moves it to the callback queue. The event loop only moves it to the call stack when the current synchronous code finishes. It's not about the delay — it's about the path: Web API → Queue → Event Loop → Stack.
>
> "This is the single most important concept in async JavaScript. The call stack must be empty before ANY callback runs. That's the event loop's rule."

**Interactive Question 3 — Quick-Fire Recall: 4 Components of the JS Runtime**

> "Quick-fire round! Name the four components of the JavaScript runtime. Drop them in the chat — 10 seconds!"
>
> **Pause** (10 seconds)
>
> **Answer:** Call Stack, Web APIs, Callback Queue, Event Loop
>
> "If you got all four, you've got the mental model. Every async operation in JavaScript flows through these four components. Keep this diagram in your head — it explains every 'weird' async behavior you'll ever encounter."

---

#### Live Debugging (VS Code) — 19:00–19:30

**Bug: setInterval Without clearInterval — Memory Leak**

```javascript
// 🐛 Bug: Forgotten interval — runs forever!
let counter = 0;
setInterval(() => {
  counter++;
  console.log(`Running... ${counter}`);
}, 1000);

// This interval NEVER stops. In a browser, it keeps running
// even after you navigate away from the component.
// In React, this causes memory leaks in useEffect.

// FIX: Always capture the ID and clear it
const id = setInterval(() => {
  counter++;
  console.log(`Running... ${counter}`);
  if (counter >= 5) clearInterval(id);
}, 1000);
```

> "In 25 years of code reviews, forgotten `clearInterval` is one of the top 5 memory leaks I've seen. In React, you'll clean this up in `useEffect`'s cleanup function — but the principle starts here: always have an exit condition for intervals."

---

#### Part Closing (Presentation) — 19:30–20:00

**Common Mistakes:**
- Thinking `setTimeout(fn, 0)` means "run immediately" — it means "run after the current call stack clears"
- Forgetting to capture and clear interval IDs — causes memory leaks
- Trying to use `return` inside `setTimeout` to return a value from the outer function — the callback runs later, the outer function already returned
- Confusing delay guarantee: `setTimeout(fn, 1000)` means "at least 1000ms" — not exactly 1000ms

**Optimization Tips:**
- Use `setTimeout` for debouncing user input (search boxes, form validation)
- Use `setInterval` sparingly — prefer `setTimeout` recursion for more control over timing
- In browsers, nested `setTimeout` has a minimum 4ms delay after 5 levels

**Best Practices:**
- Always clear timers you set — store the ID, clear on cleanup
- Prefer `setTimeout` over `setInterval` — recursive setTimeout gives you control over whether to schedule the next tick
- Never use busy-wait loops (`while(Date.now()...)`) — always use async timers

**Professional Insights:**
> "In production React apps, the pattern you'll use constantly is `useEffect` with cleanup — set a timer in the effect, clear it in the cleanup function. This prevents memory leaks when components unmount. Today's timer patterns are the foundation for that React pattern."

---

### Part 2: Callbacks & The Evolution to Promises (20:00 – 40:00)

---

#### Background / Motivation (Presentation) — 20:00–24:00

> **Talking Points:**
> "Now you know JavaScript can handle async operations through the event loop. But how do we actually WRITE async code? The first answer, historically, was **callbacks** — 'call me back when you're done.'"
>
> "A callback is just a function passed as an argument to another function, which gets called when the async operation completes. You already know this pattern from Lecture 11 — `forEach`, `map`, `filter` all take callback functions. The difference here is that these callbacks execute LATER, not immediately."
>
> "Callbacks work fine for one async operation. But what happens when you need to do three things in sequence — fetch a user, then fetch their orders, then fetch order details? You nest callbacks inside callbacks inside callbacks. This creates the infamous **Pyramid of Doom** — deeply indented, unreadable, unmaintainable code."
>
> "Promises were invented to solve this exact problem. Instead of nesting, you chain. Instead of indentation hell, you get flat, readable sequences."

**Slide: The Callback Pattern**

> ```
> function doSomethingAsync(callback) {
>   // ... async work happens ...
>   // When done, call the callback with the result:
>   callback(result);
> }
>
> doSomethingAsync(function(result) {
>   console.log(result);  // Handle the result here
> });
> ```
>
> "The callback is your 'phone number.' You give it to the function and say: 'Call me at this number when you have the result.' The function does its work, and when it's ready, it calls you back."

**Slide: Callback Hell — The Pyramid of Doom**

> ```javascript
> // 3 sequential operations — each depends on the previous result
> getUser(userId, function(user) {
>   getOrders(user.id, function(orders) {
>     getOrderDetails(orders[0].id, function(details) {
>       getShipping(details.shippingId, function(shipping) {
>         console.log(shipping.status);
>         // We're 4 levels deep... and this is a simple case!
>       });
>     });
>   });
> });
> ```
>
> "Look at that indentation pyramid. Four levels deep, and each level depends on the previous result. Now imagine adding error handling to each level. That's callback hell — readable by no human."

**Slide: Promise States — The Online Order Analogy**

> ```
> ┌─────────────────────────────────────────────────────────┐
> │                    PROMISE STATES                        │
> │                                                         │
> │         ┌──────────┐                                    │
> │         │ PENDING  │  ← Initial state (order placed)   │
> │         └────┬─────┘                                    │
> │              │                                          │
> │         ┌────┴────┐                                     │
> │         ▼         ▼                                     │
> │  ┌───────────┐  ┌──────────┐                           │
> │  │ FULFILLED │  │ REJECTED │                           │
> │  │ (success) │  │ (failed) │                           │
> │  │ .then()   │  │ .catch() │                           │
> │  └───────────┘  └──────────┘                           │
> │                                                         │
> │  .finally() ← runs in BOTH cases (cleanup)             │
> └─────────────────────────────────────────────────────────┘
> ```
>
> **Analogy — Online Order:**
> "When you place an online order, it starts as **pending** (processing). Eventually it either gets **fulfilled** (delivered to your door — success!) or **rejected** (canceled, out of stock — failure). You can't go back to pending once settled. A Promise works exactly the same way — it starts pending, then settles to fulfilled or rejected. Once settled, it stays that way forever."

---

#### Illustrations / Animations (Presentation) — 24:00–26:00

**Slide: Evolution — Callbacks → Promises → async/await**

> ```
> CALLBACKS (nested)              PROMISES (chained)              ASYNC/AWAIT (flat)
> ─────────────────               ─────────────────               ──────────────────
>
> getUser(id, (user) => {         getUser(id)                     async function load() {
>   getOrders(user.id, (orders)     .then(user =>                   const user = await getUser(id);
>     => {                            getOrders(user.id))           const orders = await getOrders(user.id);
>     getDetails(orders[0].id,      .then(orders =>                 const details = await getDetails(orders[0].id);
>       (details) => {                getDetails(orders[0].id))     console.log(details);
>       console.log(details);       .then(details =>              }
>     });                             console.log(details))
>   });                             .catch(err =>
> });                                 console.error(err));
>
> ↑ Pyramid of Doom               ↑ Flat chain                    ↑ Reads like synchronous code
> ↑ Hard to read                  ↑ Better, but .then everywhere  ↑ Best readability
> ```
>
> "Three ways to write the same logic. Each generation solved the previous one's readability problem. By the end of today, you'll prefer `async/await` for most code — but you'll understand all three because real codebases mix them."

---

#### "Let's see in Code now" (VS Code) — 26:00–36:00

> "Let's code the evolution. We'll simulate async operations, then refactor step by step."

```javascript
// ============================================
// Lecture 14 — Part 2: Callbacks & Promises
// Weather Dashboard & API Explorer
// NexusBerry Modern Frontend Course
// ============================================

// --- Callback Pattern: The Original Async ---

// Simulating an async operation (like an API call)
function fetchUserData(userId, callback) {
  console.log(`📡 Fetching user ${userId}...`);
  setTimeout(() => {
    const user = { id: userId, name: "Rana Ajmal", city: "Lahore" };
    callback(user);  // "Call back" with the result
  }, 1000);
}

// Using the callback
fetchUserData(1, (user) => {
  console.log(`✅ Got user: ${user.name} from ${user.city}`);
});

// The function CALLS YOU BACK when it has the result.
// You don't get a return value — you provide a function to receive the result.

// --- Callback Hell: The Pyramid of Doom ---

function fetchUser(id, callback) {
  setTimeout(() => callback({ id, name: "Rana Ajmal" }), 500);
}

function fetchOrders(userId, callback) {
  setTimeout(() => callback([
    { id: 101, product: "Laptop", userId },
    { id: 102, product: "Keyboard", userId }
  ]), 500);
}

function fetchOrderDetails(orderId, callback) {
  setTimeout(() => callback({
    id: orderId, status: "Delivered", total: 89999
  }), 500);
}

// Nested callbacks — each depends on the previous result:
fetchUser(1, (user) => {
  console.log(`\n👤 User: ${user.name}`);
  fetchOrders(user.id, (orders) => {
    console.log(`📦 Orders: ${orders.length} found`);
    fetchOrderDetails(orders[0].id, (details) => {
      console.log(`📋 Order ${details.id}: ${details.status} — Rs. ${details.total.toLocaleString()}`);
      // Imagine 2 more levels deep...
    });
  });
});

// This works, but it's hard to read, hard to debug,
// and adding error handling makes it 3x worse.

// --- Promises: The Solution ---

// Converting callback functions to Promise-based functions:
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("Invalid user ID"));
      }
      resolve({ id, name: "Rana Ajmal" });
    }, 500);
  });
}

function fetchOrdersPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) reject(new Error("User ID required"));
      resolve([
        { id: 101, product: "Laptop", userId },
        { id: 102, product: "Keyboard", userId }
      ]);
    }, 500);
  });
}

function fetchOrderDetailsPromise(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!orderId) reject(new Error("Order ID required"));
      resolve({ id: orderId, status: "Delivered", total: 89999 });
    }, 500);
  });
}

// Promise chaining — flat, readable, maintainable:
fetchUserPromise(1)
  .then(user => {
    console.log(`\n✨ Promise User: ${user.name}`);
    return fetchOrdersPromise(user.id);       // Return a Promise → chain continues
  })
  .then(orders => {
    console.log(`✨ Promise Orders: ${orders.length} found`);
    return fetchOrderDetailsPromise(orders[0].id);  // Return next Promise
  })
  .then(details => {
    console.log(`✨ Order ${details.id}: ${details.status} — Rs. ${details.total.toLocaleString()}`);
  })
  .catch(error => {
    console.error(`❌ Error: ${error.message}`);  // ONE catch handles ALL errors in the chain
  })
  .finally(() => {
    console.log("🏁 Operation complete (runs success OR failure)");
  });

// Key differences from callbacks:
// 1. Flat chain instead of nested pyramid
// 2. ONE .catch() handles errors from ANY step
// 3. .finally() runs cleanup regardless of outcome
// 4. Each .then() RETURNS a value → next .then() receives it

// --- Creating Promises from Scratch ---

// Custom Promise: simulate weather API call
function getWeather(city) {
  return new Promise((resolve, reject) => {
    console.log(`🌤️ Requesting weather for ${city}...`);

    setTimeout(() => {
      // Simulated data (we'll use real APIs in Part 4)
      const weatherData = {
        city,
        temp: Math.round(20 + Math.random() * 20),
        condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)]
      };

      if (city === "") {
        reject(new Error("City name cannot be empty"));
      } else {
        resolve(weatherData);
      }
    }, 1000);
  });
}

// Consuming the Promise:
getWeather("Lahore")
  .then(data => {
    console.log(`\n🌡️ ${data.city}: ${data.temp}°C, ${data.condition}`);
  })
  .catch(error => {
    console.error(`❌ Weather error: ${error.message}`);
  });

// Error case:
getWeather("")
  .then(data => console.log(data))            // Skipped on rejection
  .catch(error => console.error(`❌ ${error.message}`))  // Handles the error
  .finally(() => console.log("🏁 Weather request complete"));
```

> **Teaching Flow:**
> 1. Start with the callback pattern — "This is how jQuery-era JavaScript worked"
> 2. Show the pyramid of doom — let students SEE the indentation problem
> 3. Refactor to Promises — emphasize the flat chain
> 4. Highlight: `.then()` returns a NEW Promise, which is why chaining works
> 5. Show `.catch()` at the bottom — ONE handler catches ALL errors in the chain
> 6. Build the `getWeather` Promise from scratch — this is the pattern they'll use in React

> **Critical Point:**
> "The key insight is that `.then()` returns a **new Promise**. That's what enables chaining. When you `return` a value inside `.then()`, the next `.then()` receives it. When you `return` a Promise, the next `.then()` waits for it to resolve. This is the mechanic that makes the flat chain work."

---

#### Interactive Questions (Presentation/Verbal) — 36:00–39:00

**Interactive Question 4 — Spot the Error: Promise Without reject Path**

> "What's the potential problem with this code? Drop your answer in chat."

```javascript
function loadData(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data));
  });
}
```

> **Pause for chat answers** (20 seconds)
>
> **Answer:** There's no `reject` parameter and no error handling! If `fetch` fails (network error) or `.json()` fails (invalid JSON), the Promise hangs forever in the pending state — it never settles. Always include `reject` and a `.catch()`:
>
> ```javascript
> return new Promise((resolve, reject) => {
>   fetch(url)
>     .then(response => response.json())
>     .then(data => resolve(data))
>     .catch(error => reject(error));
> });
> ```
>
> "In production, a Promise that never settles is worse than one that rejects — at least rejection tells you something went wrong. A hung Promise silently leaks memory and leaves the UI in a loading state forever."

**Interactive Question 5 — Predict Output: .then().catch().finally() Order**

> "What's the output? Think carefully about which path executes."

```javascript
Promise.resolve("Hello")
  .then(value => {
    console.log("A:", value);
    throw new Error("Oops");
  })
  .then(value => {
    console.log("B:", value);     // Does this run?
  })
  .catch(error => {
    console.log("C:", error.message);
  })
  .finally(() => {
    console.log("D: Done");
  });
```

> **Pause for chat answers** (20 seconds)
>
> **Answer:**
> ```
> A: Hello
> C: Oops
> D: Done
> ```
> "A runs first — the Promise resolves with 'Hello.' Inside A, we `throw` an error. This converts the chain to a rejection, so B is SKIPPED — rejected Promises jump to the next `.catch()`. C catches the error. D runs regardless because `finally` always executes. This is exactly like the try/catch/finally flow from Lecture 13!"

**Interactive Question 6 — Concept Challenge: Why Does .then() Return a NEW Promise?**

> "Here's a design question: Why does every `.then()` return a brand new Promise instead of modifying the original one?"
>
> **Pause for chat answers** (20 seconds)
>
> **Answer:** Because Promises are **immutable** once settled — just like strings! Once a Promise resolves or rejects, its state can never change. By returning a new Promise, each `.then()` creates a fresh pipeline step that can resolve or reject independently. This also means you can branch a single Promise into multiple chains:
>
> ```javascript
> const userPromise = fetchUser(1);
> userPromise.then(user => loadOrders(user));   // Branch 1
> userPromise.then(user => loadProfile(user));  // Branch 2
> ```
>
> "Both branches share the same original Promise. If `.then()` mutated the original, the second branch would see the first branch's modifications. Immutability keeps things predictable."

---

#### Live Debugging (VS Code) — 39:00–39:30

**Bug: Forgetting to return Inside .then() — Next .then() Gets undefined**

```javascript
// 🐛 Bug: Missing return in .then() chain
fetchUserPromise(1)
  .then(user => {
    console.log(`Got user: ${user.name}`);
    fetchOrdersPromise(user.id);  // ← MISSING return!
  })
  .then(orders => {
    console.log(`Orders: ${orders.length}`);  // 💥 TypeError: Cannot read property 'length' of undefined
  })
  .catch(error => console.error(error.message));

// FIX: Add return
fetchUserPromise(1)
  .then(user => {
    console.log(`Got user: ${user.name}`);
    return fetchOrdersPromise(user.id);  // ← return the Promise!
  })
  .then(orders => {
    console.log(`Orders: ${orders.length}`);  // ✅ Works!
  })
  .catch(error => console.error(error.message));
```

> "This is the #1 Promise bug I see in code reviews. If you don't `return` inside `.then()`, the next `.then()` receives `undefined`. The chain continues, but with no data. With arrow functions, use the implicit return shorthand when possible: `.then(user => fetchOrdersPromise(user.id))` — no braces, automatic return."

---

#### Part Closing (Presentation) — 39:30–40:00

**Common Mistakes:**
- Forgetting to `return` inside `.then()` — next handler gets `undefined`
- Creating Promises without a `reject` path — the Promise hangs forever if something fails
- Putting `.catch()` in the middle of a chain instead of at the end — errors after the catch aren't caught
- Nesting `.then()` inside `.then()` — defeats the purpose of Promises (use flat chaining)

**Optimization Tips:**
- Use arrow functions with implicit return for clean chains: `.then(data => data.json())`
- Place `.catch()` at the end of the chain to catch ALL errors in one place
- Use `.finally()` for cleanup (hide loading spinner, close connections) that must happen regardless of outcome

**Best Practices:**
- Always handle both success AND failure — every Promise chain needs a `.catch()`
- Return values between `.then()` calls — this is how data flows through the chain
- Keep `.then()` callbacks short — if they grow beyond 3-4 lines, extract into named functions

**Professional Insights:**
> "In 25 years of code reviews, the pattern I enforce most is: every Promise chain must end with `.catch()`. Unhandled rejections are silent killers — the app doesn't crash, it just silently fails. Modern browsers log 'UnhandledPromiseRejection' warnings, but in production, those become invisible data loss. Catch everything."

---

### Part 3: Promise Combinators & async/await (40:00 – 58:00)

---

#### Background / Motivation (Presentation) — 40:00–43:00

> **Talking Points:**
> "So far we've fetched one thing at a time: user → orders → details, sequentially. But what if you need to fetch weather for five cities? Should you fetch them one by one — 5 seconds total? Or all at once — 1 second total?"
>
> "JavaScript gives you four **Promise combinators** — utility methods that take an array of Promises and combine them into one. Each has different behavior for handling success and failure. Think of them as different group ordering strategies at a restaurant."
>
> "After combinators, we'll learn `async/await` — the modern syntax that makes all this Promise code read like normal synchronous JavaScript. It's syntactic sugar over Promises — the same engine underneath, but dramatically cleaner syntax."

**Slide: The Four Promise Combinators**

| Combinator | Resolves When | Rejects When | Analogy |
|-----------|---------------|--------------|---------|
| `Promise.all` | ALL succeed | ANY ONE fails | Group dinner: everyone must arrive to be seated |
| `Promise.allSettled` | ALL settle (success or fail) | Never rejects | Survey: collect all responses, even errors |
| `Promise.race` | FIRST to settle (success or fail) | FIRST to settle if it fails | Taxi vs Uber: take whichever arrives first |
| `Promise.any` | FIRST to succeed | ALL fail | Backup servers: use whichever responds first |

> "Use `Promise.all` when you need ALL results and ANY failure is fatal. Use `Promise.allSettled` when you want results from whatever succeeded. Use `Promise.race` for timeout patterns. Use `Promise.any` for fallback patterns."

---

#### Illustrations / Animations (Presentation) — 43:00–44:00

**Slide: async/await — Same Promise, Better Syntax**

> ```javascript
> // PROMISE CHAIN                        // ASYNC/AWAIT EQUIVALENT
> fetchUser(1)                            async function loadData() {
>   .then(user =>                           const user = await fetchUser(1);
>     fetchOrders(user.id))                 const orders = await fetchOrders(user.id);
>   .then(orders =>                         const details = await fetchOrderDetails(orders[0].id);
>     fetchOrderDetails(orders[0].id))      console.log(details);
>   .then(details =>                      }
>     console.log(details))
>   .catch(err =>                         // Error handling:
>     console.error(err));                async function loadData() {
>                                           try {
>                                             const user = await fetchUser(1);
>                                             const orders = await fetchOrders(user.id);
>                                             console.log(orders);
>                                           } catch (err) {
>                                             console.error(err);  // Same as .catch()
>                                           }
>                                         }
> ```
>
> "`async/await` is NOT a different feature — it's a different syntax for the same Promise mechanic. `await` pauses the `async` function until the Promise resolves. `try/catch` replaces `.catch()`. It reads like synchronous code but runs asynchronously."

---

#### "Let's see in Code now" (VS Code) — 44:00–53:00

```javascript
// ============================================
// Lecture 14 — Part 3: Promise Combinators & async/await
// Weather Dashboard & API Explorer
// NexusBerry Modern Frontend Course
// ============================================

// Helper: simulate weather fetch for a city
function getWeatherForCity(city) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 500;  // 500-2500ms random delay
    setTimeout(() => {
      if (city === "Atlantis") {
        reject(new Error(`City not found: ${city}`));
      } else {
        resolve({
          city,
          temp: Math.round(20 + Math.random() * 25),
          humidity: Math.round(40 + Math.random() * 40)
        });
      }
    }, delay);
  });
}

// --- Promise.all — All Must Succeed ---
console.log("🌍 Promise.all — Fetching 3 cities simultaneously...");

Promise.all([
  getWeatherForCity("Lahore"),
  getWeatherForCity("Karachi"),
  getWeatherForCity("Islamabad")
])
  .then(results => {
    console.log("✅ All cities loaded:");
    results.forEach(w => console.log(`  ${w.city}: ${w.temp}°C, ${w.humidity}% humidity`));
  })
  .catch(error => {
    console.error(`❌ Promise.all failed: ${error.message}`);
    // If ANY one fails, the ENTIRE Promise.all rejects.
    // You don't get partial results!
  });

// What happens when one fails?
Promise.all([
  getWeatherForCity("Lahore"),
  getWeatherForCity("Atlantis"),  // This will reject!
  getWeatherForCity("Karachi")
])
  .then(results => console.log("This never runs"))
  .catch(error => console.error(`❌ All failed because: ${error.message}`));
// One bad apple spoils the bunch!

// --- Promise.allSettled — Collect Everything ---
console.log("\n📊 Promise.allSettled — Tolerant of failures...");

Promise.allSettled([
  getWeatherForCity("Lahore"),
  getWeatherForCity("Atlantis"),  // Will fail
  getWeatherForCity("Karachi")
])
  .then(results => {
    console.log("📊 All settled (never rejects):");
    results.forEach(result => {
      if (result.status === "fulfilled") {
        console.log(`  ✅ ${result.value.city}: ${result.value.temp}°C`);
      } else {
        console.log(`  ❌ Failed: ${result.reason.message}`);
      }
    });
  });
// allSettled NEVER rejects — you always get all results
// Each result has { status: "fulfilled", value } or { status: "rejected", reason }

// --- Promise.race — First One Wins ---
console.log("\n🏁 Promise.race — First to settle wins...");

// Timeout pattern: race fetch against a timer
function fetchWithTimeout(city, timeoutMs) {
  const fetchPromise = getWeatherForCity(city);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout: ${city} took too long`)), timeoutMs);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout("Lahore", 1000)
  .then(data => console.log(`🏁 Got ${data.city} within timeout: ${data.temp}°C`))
  .catch(error => console.error(`🏁 ${error.message}`));

// --- Promise.any — First SUCCESS Wins ---
console.log("\n🎯 Promise.any — First success wins...");

Promise.any([
  getWeatherForCity("Atlantis"),  // Will fail
  getWeatherForCity("Lahore"),    // Will succeed
  getWeatherForCity("Karachi")    // Will succeed
])
  .then(fastest => {
    console.log(`🎯 First successful: ${fastest.city} at ${fastest.temp}°C`);
  })
  .catch(error => {
    // Only rejects if ALL promises reject
    console.error(`🎯 All failed: ${error.message}`);
  });

// ============================================
// async/await — The Modern Syntax
// ============================================

// --- Rewriting Promise chains as async/await ---

async function loadWeatherData() {
  console.log("\n⚡ async/await — Loading weather...");

  // await pauses HERE until the Promise resolves
  const lahore = await getWeatherForCity("Lahore");
  console.log(`  ${lahore.city}: ${lahore.temp}°C`);

  // This line doesn't run until the above await completes
  const karachi = await getWeatherForCity("Karachi");
  console.log(`  ${karachi.city}: ${karachi.temp}°C`);

  return [lahore, karachi];  // async functions always return a Promise
}

// Calling an async function:
loadWeatherData().then(cities => {
  console.log(`⚡ Loaded ${cities.length} cities total`);
});

// --- Error Handling: try/catch with await ---
// THIS is where L13's try/catch/finally pays off!

async function loadWeatherSafe(city) {
  try {
    console.log(`\n🛡️ Safely loading weather for ${city}...`);
    const data = await getWeatherForCity(city);
    console.log(`🛡️ Success: ${data.city} — ${data.temp}°C`);
    return data;
  } catch (error) {
    console.error(`🛡️ Error: ${error.message}`);
    return null;  // Return a fallback instead of crashing
  } finally {
    console.log(`🛡️ Request for ${city} complete (success or failure)`);
  }
}

// Works with valid city:
loadWeatherSafe("Lahore");

// Handles error gracefully:
loadWeatherSafe("Atlantis");

// --- Combining async/await with Promise.all ---
// Best of both worlds: parallel execution + clean syntax

async function loadAllCities() {
  console.log("\n🚀 Parallel fetch with async/await...");

  try {
    // Launch ALL requests simultaneously, then await all at once
    const cities = await Promise.all([
      getWeatherForCity("Lahore"),
      getWeatherForCity("Karachi"),
      getWeatherForCity("Islamabad")
    ]);

    cities.forEach(c => console.log(`  🚀 ${c.city}: ${c.temp}°C`));
    return cities;
  } catch (error) {
    console.error(`🚀 Failed: ${error.message}`);
    return [];
  }
}

loadAllCities();
```

> **Teaching Flow:**
> 1. Show `Promise.all` with all successes first — students see parallel execution
> 2. Then add "Atlantis" — demonstrate the fail-fast behavior
> 3. Show `Promise.allSettled` as the tolerant alternative
> 4. `Promise.race` for the timeout pattern — very practical
> 5. Rewrite the same logic with `async/await` — the "aha" moment
> 6. Show `try/catch` with `await` — "This is the SAME try/catch from Lecture 13!"
> 7. Combine `async/await` + `Promise.all` — the production pattern

> **Critical Teaching Moment:**
> "Notice how `try/catch` with `await` is IDENTICAL to the `try/catch` you learned in Lecture 13. The only difference is that the code inside `try` now includes `await` expressions. L13 was the foundation, today is the application. This is why we learned error handling before async."

---

#### Interactive Questions (Presentation/Verbal) — 53:00–56:00

**Interactive Question 7 — Predict Output: Promise.all With One Rejection**

> "What happens? Drop your answer in chat."

```javascript
const results = await Promise.all([
  Promise.resolve("A"),
  Promise.reject(new Error("B failed")),
  Promise.resolve("C")
]);
console.log(results);
```

> **Pause for chat answers** (15 seconds)
>
> **Answer:** The `console.log` never runs! `Promise.all` rejects immediately when ANY Promise rejects. You'd need a `try/catch` around it, and the `catch` block would receive the Error "B failed". You don't get "A" or "C" — all or nothing.
>
> "This is the 'group dinner' rule — if one person cancels, the whole reservation falls through. If you need partial results, use `Promise.allSettled` instead."

**Interactive Question 8 — Concept Challenge: When Would You Use allSettled Over all?**

> "Give me a real scenario where `allSettled` is better than `all`. Think about it from a user's perspective."
>
> **Pause for chat answers** (20 seconds)
>
> **Answer:** When loading a dashboard with multiple independent data sources. If you're showing weather for 5 cities and one API call fails, you still want to display the other 4. With `Promise.all`, one failure would blank the entire dashboard. With `Promise.allSettled`, you show successful results and display an error message only for the failed city.
>
> "In React, you'll build dashboards with multiple `fetch` calls. `allSettled` + checking each result's `status` property is the production pattern. `Promise.all` is for when results MUST come together — like a checkout that needs shipping AND payment to both succeed."

**Interactive Question 9 — Spot the Error: async Function Without await**

> "What's wrong with this code?"

```javascript
async function getUser() {
  const response = fetch("https://api.example.com/user");
  const data = response.json();
  return data;
}

const user = getUser();
console.log(user.name);
```

> **Pause for chat answers** (15 seconds)
>
> **Answer:** Three problems! (1) `fetch` needs `await` — without it, `response` is a Promise, not a Response object. (2) `.json()` also needs `await` — it returns a Promise too. (3) `getUser()` returns a Promise, not the data — you need `await getUser()` or `.then()`. Fixed:
>
> ```javascript
> async function getUser() {
>   const response = await fetch("https://api.example.com/user");
>   const data = await response.json();
>   return data;
> }
>
> const user = await getUser();  // or getUser().then(user => ...)
> console.log(user.name);
> ```
>
> "This is the most common async bug. Forgetting `await` means you're working with Promise objects instead of their resolved values. The code doesn't crash — it just gives you `[object Promise]` instead of actual data."

---

#### Live Debugging (VS Code) — 56:00–57:00

**Bug: await in a Regular (Non-async) Function — SyntaxError**

```javascript
// 🐛 Bug: await outside an async function
function loadData() {
  const data = await fetch("https://api.example.com/data");  // SyntaxError!
  return data;
}

// SyntaxError: await is only valid in async functions and the top level of modules

// FIX: Add the async keyword
async function loadData() {
  const data = await fetch("https://api.example.com/data");  // ✅
  return data;
}

// Alternative: Top-level await (works in ES modules, Node.js with "type": "module")
// const data = await fetch("https://api.example.com/data");
```

> "`await` can ONLY be used inside an `async` function — or at the top level of an ES module. If you forget `async`, you get a SyntaxError. This is JavaScript enforcing that await only works in async contexts."

---

#### Part Closing (Presentation) — 57:00–58:00

**Common Mistakes:**
- Using `Promise.all` when you need partial results — use `allSettled` instead
- Forgetting `await` — you end up working with Promise objects, not values
- Using `await` in a regular function — must be inside an `async` function
- Sequential `await` when you could use `Promise.all` for parallel execution — huge performance difference

**Optimization Tips:**
- Use `Promise.all` when fetching independent data sources in parallel — 5 fetches in 1 second vs 5 seconds
- Combine `async/await` with `Promise.all` for clean parallel code: `const [a, b, c] = await Promise.all([...])`
- Use destructuring with `Promise.all` results for clean variable names

**Best Practices:**
- Default to `async/await` for readability — use `.then()` only when it's genuinely cleaner (rare)
- Always wrap `await` in `try/catch` for error handling — unhandled rejections crash Node.js and silently fail in browsers
- Use `Promise.allSettled` for UI dashboards, `Promise.all` for transactional operations

**Professional Insights:**
> "Here's a pattern I've used for decades: when I see sequential `await` calls that don't depend on each other, I immediately refactor to `Promise.all`. I've seen page load times drop from 8 seconds to 2 seconds with this one change. In a job interview, demonstrating that you know the difference between sequential and parallel async execution is a strong signal."

---

### Part 4: The fetch API & Working with REST APIs (58:00 – 74:00)

---

#### Background / Motivation (Presentation) — 58:00–61:00

> **Talking Points:**
> "You now know Promises and async/await — the mechanics of async code. Now let's use them for their most important real-world purpose: **talking to servers**."
>
> "Every frontend app needs data from somewhere. Weather data, user profiles, product listings, chat messages — all come from APIs. The `fetch` API is how JavaScript makes HTTP requests. It returns a Promise (so everything you just learned applies directly), and it's built into every modern browser."
>
> "Here's what makes `fetch` tricky: it has TWO potential failure points, not one. First, the network request itself might fail (no internet, server down, DNS error). Second, the server might respond with an error status (404 Not Found, 500 Server Error). `fetch` only rejects on network failure — it does NOT reject on HTTP errors like 404. This surprises everyone."

**Slide: fetch() — Two Failure Points**

> ```
> Your Code                    Network                      Server
> ─────────                    ───────                      ──────
>
> fetch(url) ────────────────→ ?                           ?
>
>            │ Network Error   │ HTTP 404/500              │ HTTP 200 OK
>            │ (no internet,   │ (resource missing,        │ (success!)
>            │  DNS failure)   │  server error)            │
>            ▼                 ▼                           ▼
>         REJECTS           RESOLVES with                RESOLVES with
>         (catch block)     response.ok = false          response.ok = true
>                           ⚠️ NOT a rejection!          ✅ Success
>                           Must check response.ok
> ```
>
> "This is the trap: `fetch` resolves for 404 and 500 errors. You have to check `response.ok` yourself. This is the #1 fetch mistake I see in junior developer code — assuming any response means success."

**Slide: The fetch Response Lifecycle**

> ```
> fetch(url)
>   │
>   ▼
> Promise<Response>          ← Step 1: Response object (headers arrive)
>   │
>   ▼
> response.ok?               ← Step 2: Check HTTP status
>   │
>   ▼
> response.json()            ← Step 3: Parse body (ALSO a Promise!)
>   │
>   ▼
> Promise<data>              ← Step 4: Actual usable data
> ```
>
> "Two awaits needed: one for the response, one for the body parsing. `response.json()` is itself async because the response body might still be streaming."

---

#### Illustrations / Animations (Presentation) — 61:00–62:00

**Slide: Loading / Error / Success — The Frontend Trinity**

> ```
> ┌─────────────────────────────────────────────────────────┐
> │                STATE MACHINE                             │
> │                                                         │
> │  ┌──────────┐        ┌───────────┐      ┌──────────┐  │
> │  │  IDLE    │──click──│  LOADING  │──────│ SUCCESS  │  │
> │  │          │         │  ⏳       │      │  ✅      │  │
> │  └──────────┘         └─────┬─────┘      └──────────┘  │
> │                              │                          │
> │                              │ error                    │
> │                              ▼                          │
> │                       ┌──────────┐                      │
> │                       │  ERROR   │                      │
> │                       │  ❌      │                      │
> │                       └──────────┘                      │
> └─────────────────────────────────────────────────────────┘
> ```
>
> "Every data-fetching UI has three states: loading (show spinner), success (show data), error (show message). This is the exact pattern you'll use in React with `useState` — `isLoading`, `data`, `error`. We build this pattern today with vanilla JS."

---

#### "Let's see in Code now" (VS Code) — 62:00–72:00

> "Let's make REAL HTTP requests to actual APIs. Open your browser's Network tab — you'll see the requests live."

```javascript
// ============================================
// Lecture 14 — Part 4: The fetch API & REST APIs
// Weather Dashboard & API Explorer
// NexusBerry Modern Frontend Course
// ============================================

// --- Basic fetch — GET Request to JSONPlaceholder ---
console.log("📡 Fetching a todo from JSONPlaceholder...");

async function fetchTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  // response.ok is true for HTTP 200-299
  console.log(`  Status: ${response.status}`);    // 200
  console.log(`  OK: ${response.ok}`);            // true
  console.log(`  Content-Type: ${response.headers.get("content-type")}`);

  // Parse JSON body (also async!)
  const todo = await response.json();
  console.log("  Todo:", todo);
  // { userId: 1, id: 1, title: "delectus aut autem", completed: false }

  return todo;
}

fetchTodo();

// --- Proper Error Handling — The Two Error Checks ---

async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Check 1: HTTP errors (404, 500, etc.) — fetch does NOT reject on these!
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Check 2: Parse the body — this can also fail (invalid JSON)
    const data = await response.json();
    return data;

  } catch (error) {
    // This catches: network errors, HTTP errors (from our throw), JSON parse errors
    console.error(`❌ Fetch failed: ${error.message}`);
    return null;  // Return fallback instead of crashing
  }
}

// Success case:
fetchData("https://jsonplaceholder.typicode.com/users/1")
  .then(user => {
    if (user) console.log(`\n👤 User: ${user.name} (${user.email})`);
  });

// HTTP error case (404):
fetchData("https://jsonplaceholder.typicode.com/users/99999")
  .then(user => {
    if (user) console.log(user);
    else console.log("📭 No user found");
  });

// --- AbortController — Canceling Fetch Requests ---
console.log("\n🛑 AbortController demo...");

async function fetchWithCancel(url, timeoutMs = 5000) {
  const controller = new AbortController();

  // Automatic timeout — cancel the request after timeoutMs
  const timeoutId = setTimeout(() => {
    controller.abort();  // Sends AbortError
    console.log(`⏱️ Request timed out after ${timeoutMs}ms`);
  }, timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);  // Cancel the timeout if fetch completes in time

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();

  } catch (error) {
    if (error.name === "AbortError") {
      console.log("🛑 Request was canceled");
      return null;
    }
    throw error;  // Re-throw non-abort errors
  }
}

// Using AbortSignal.timeout() — cleaner alternative (modern browsers)
async function fetchWithModernTimeout(url, timeoutMs = 5000) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === "TimeoutError") {
      console.log("⏱️ Request timed out");
      return null;
    }
    if (error.name === "AbortError") {
      console.log("🛑 Request canceled");
      return null;
    }
    throw error;
  }
}

// --- Loading / Error / Success State Pattern ---
console.log("\n🔄 State pattern demo...");

async function loadUserDashboard(userId) {
  // State: LOADING
  let state = { status: "loading", data: null, error: null };
  console.log(`  Status: ${state.status} ⏳`);

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // State: SUCCESS
    state = { status: "success", data, error: null };
    console.log(`  Status: ${state.status} ✅`);
    console.log(`  Welcome, ${data.name}!`);

  } catch (error) {
    // State: ERROR
    state = { status: "error", data: null, error: error.message };
    console.log(`  Status: ${state.status} ❌`);
    console.log(`  Error: ${state.error}`);
  }

  return state;
}

loadUserDashboard(1);   // Success
loadUserDashboard(999); // Error (404 user)

// --- Fetching Multiple Resources in Parallel ---
console.log("\n🌐 Parallel API fetching...");

async function loadDashboard() {
  try {
    const [users, posts, todos] = await Promise.all([
      fetchData("https://jsonplaceholder.typicode.com/users"),
      fetchData("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      fetchData("https://jsonplaceholder.typicode.com/todos?_limit=5")
    ]);

    console.log(`  📊 Dashboard loaded:`);
    if (users) console.log(`    👥 ${users.length} users`);
    if (posts) console.log(`    📝 ${posts.length} posts`);
    if (todos) console.log(`    ✅ ${todos.length} todos`);

  } catch (error) {
    console.error(`  ❌ Dashboard failed: ${error.message}`);
  }
}

loadDashboard();
```

> **Teaching Flow:**
> 1. Start with the simplest fetch — one URL, one response. Show the Network tab.
> 2. **Critical moment:** Show that fetch resolves on 404. Add the `response.ok` check.
> 3. Build the `fetchData` helper — this becomes their reusable pattern.
> 4. Introduce `AbortController` — "In React, when a user navigates away before fetch completes, you abort to prevent memory leaks and state updates on unmounted components."
> 5. Show the loading/error/success state pattern — "This is EXACTLY how React state management works."
> 6. Parallel fetching with `Promise.all` — the dashboard pattern.

> **Key Insight:**
> "Every React component that loads data follows this exact pattern: start loading, await fetch, check response, update state. The `useState` and `useEffect` hooks you'll learn in Module 3 are just wrappers around what you're writing today."

---

#### Interactive Questions (Presentation/Verbal) — 72:00–74:00

**Interactive Question 10 — Spot the Error: Not Checking response.ok**

> "This code has a subtle bug. What is it?"

```javascript
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed:", error);
  }
}
```

> **Pause for chat answers** (15 seconds)
>
> **Answer:** There's no `response.ok` check! If the server returns a 404 (user not found) or 500 (server error), `fetch` still resolves successfully. The code happily parses the error response as JSON and returns it as if it were a valid user. You need:
>
> ```javascript
> if (!response.ok) {
>   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
> }
> ```
>
> "This is THE most common fetch bug. `fetch` only rejects on network failures (no internet). HTTP errors like 404 and 500 come back as resolved Promises. You must check `response.ok` yourself."

**Interactive Question 11 — Concept Challenge: Why Does fetch Need TWO Error Checks?**

> "We check for errors twice with fetch: once for network errors, once for HTTP errors. Why doesn't `fetch` just reject for everything?"
>
> **Pause for chat answers** (15 seconds)
>
> **Answer:** Because a 404 or 500 response IS a successful HTTP transaction — the server received your request and sent back a response. The network did its job. It's the APPLICATION that says "not found" or "server error." `fetch` only rejects when the network itself fails (no connection, DNS error, CORS blocked). The HTTP status is an application-level concern, not a network-level one.
>
> "Think of it this way: if you mail a letter asking for information and get a reply that says 'we don't have that info,' the postal service didn't fail — they delivered the response. The answer just wasn't what you wanted. That's a 404."

---

#### Live Debugging (VS Code) — (Integrated into teaching flow above)

**Bug: CORS Error — What It Means**

> "Let me show you an error you WILL encounter. Try fetching a URL that doesn't allow cross-origin requests:"
>
> ```javascript
> // This will trigger a CORS error in the browser:
> // fetch("https://www.google.com")
> //   .then(r => r.text())
> //   .then(html => console.log(html));
> // → TypeError: Failed to fetch (CORS policy)
> ```
>
> "CORS — Cross-Origin Resource Sharing — is a browser security feature. It prevents JavaScript on one website from reading data from another website without permission. The APIs we're using (JSONPlaceholder, Open-Meteo) explicitly allow cross-origin requests. If you hit a CORS error, it means the API server hasn't given your frontend permission to access it. This is a server-side configuration, not something you fix in frontend code."

---

#### Part Closing (Presentation) — (Embedded in Part 4 flow)

**Common Mistakes:**
- Not checking `response.ok` — fetch resolves on 404 and 500
- Forgetting that `response.json()` is also async — needs `await`
- Not handling both network errors AND HTTP errors
- Not using `AbortController` for cancelable requests — leads to memory leaks in React

**Optimization Tips:**
- Use `Promise.all` with `fetch` for parallel API calls — dashboard pattern
- Use `AbortSignal.timeout()` for simple request timeouts
- Cache responses when appropriate — don't re-fetch data that hasn't changed

**Best Practices:**
- Always check `response.ok` before parsing the body
- Build a reusable `fetchData` helper that handles errors consistently
- Use the loading/error/success state pattern for every API call
- Always provide user-friendly error messages — never show raw error objects to users

**Professional Insights:**
> "In production apps, I wrap `fetch` in a custom function that handles authentication headers, error formatting, retry logic, and logging. You write it once and every API call in the app uses it. Today's `fetchData` function is the seed of that pattern. In React, libraries like `TanStack Query` do this for you — but understanding the foundation means you can debug when the library doesn't work as expected."

---

### Part 5: Weather Dashboard Capstone + TypeScript Async (74:00 – 86:00)

---

#### Background / Motivation (Presentation) — 74:00–76:00

> **Talking Points:**
> "Let's put everything together. We're going to build a Weather Dashboard that fetches real weather data from the Open-Meteo API — a free API that requires no API key. We'll demonstrate sequential vs parallel execution, retry logic, and TypeScript types for async code."
>
> "This capstone combines: `fetch` for HTTP requests, `async/await` for clean syntax, `try/catch` for error handling, `Promise.all` for parallel execution, and `AbortController` for cancellation. Every skill from today's lecture in one project."

---

#### Illustrations / Animations (Presentation) — 76:00–77:00

**Slide: Weather Dashboard Architecture**

> ```
> ┌────────────────────────────────────────────────────────┐
> │              WEATHER DASHBOARD                          │
> │                                                        │
> │  Input: City Names                                     │
> │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │
> │  │ Lahore   │ │ Karachi  │ │ London   │              │
> │  └────┬─────┘ └────┬─────┘ └────┬─────┘              │
> │       │            │            │                      │
> │       ▼            ▼            ▼                      │
> │  ┌──────────────────────────────────┐                 │
> │  │ Geocoding API (city → lat/lon)   │                 │
> │  └──────────────┬───────────────────┘                 │
> │                 │ Promise.all                          │
> │                 ▼                                      │
> │  ┌──────────────────────────────────┐                 │
> │  │ Weather API (lat/lon → weather)  │                 │
> │  └──────────────┬───────────────────┘                 │
> │                 │                                      │
> │                 ▼                                      │
> │  ┌──────────────────────────────────┐                 │
> │  │ Format & Display Results         │                 │
> │  └──────────────────────────────────┘                 │
> └────────────────────────────────────────────────────────┘
> ```

---

#### "Let's see in Code now" (VS Code) — 77:00–84:00

```javascript
// ============================================
// Lecture 14 — Part 5: Weather Dashboard Capstone
// Weather Dashboard & API Explorer
// NexusBerry Modern Frontend Course
// ============================================

// --- City Coordinates Database ---
const CITIES = {
  "Lahore":     { lat: 31.55, lon: 74.35 },
  "Karachi":    { lat: 24.86, lon: 67.01 },
  "Islamabad":  { lat: 33.69, lon: 73.04 },
  "Dubai":      { lat: 25.20, lon: 55.27 },
  "London":     { lat: 51.51, lon: -0.13 }
};

// --- Reusable fetch helper (from Part 4) ---
async function fetchJSON(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000)  // 10 second timeout
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// --- Fetch weather for a single city ---
async function getWeather(cityName) {
  const coords = CITIES[cityName];
  if (!coords) throw new Error(`Unknown city: ${cityName}`);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

  const data = await fetchJSON(url);

  return {
    city: cityName,
    temperature: data.current_weather.temperature,
    windSpeed: data.current_weather.windspeed,
    weatherCode: data.current_weather.weathercode,
    condition: decodeWeatherCode(data.current_weather.weathercode)
  };
}

// --- Weather code decoder ---
function decodeWeatherCode(code) {
  const codes = {
    0: "☀️ Clear sky",
    1: "🌤️ Mainly clear",
    2: "⛅ Partly cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Foggy",
    51: "🌦️ Light drizzle",
    61: "🌧️ Light rain",
    63: "🌧️ Moderate rain",
    65: "🌧️ Heavy rain",
    71: "🌨️ Light snow",
    80: "🌦️ Rain showers",
    95: "⛈️ Thunderstorm"
  };
  return codes[code] || `🌡️ Code ${code}`;
}

// --- Sequential vs Parallel Comparison ---

// SEQUENTIAL — one after another (slow)
async function fetchSequential(cities) {
  console.log("\n🐢 Sequential fetching...");
  const start = Date.now();
  const results = [];

  for (const city of cities) {
    const weather = await getWeather(city);  // Waits for EACH one
    results.push(weather);
  }

  const elapsed = Date.now() - start;
  console.log(`  ⏱️ Sequential time: ${elapsed}ms`);
  return results;
}

// PARALLEL — all at once (fast!)
async function fetchParallel(cities) {
  console.log("\n🚀 Parallel fetching...");
  const start = Date.now();

  const results = await Promise.all(
    cities.map(city => getWeather(city))  // All fire simultaneously
  );

  const elapsed = Date.now() - start;
  console.log(`  ⏱️ Parallel time: ${elapsed}ms`);
  return results;
}

// --- Display formatted results ---
function displayWeather(weatherData) {
  console.log("\n" + "═".repeat(50));
  console.log("  🌍 WEATHER DASHBOARD");
  console.log("═".repeat(50));

  weatherData.forEach(w => {
    console.log(`\n  📍 ${w.city}`);
    console.log(`     🌡️ Temperature: ${w.temperature}°C`);
    console.log(`     💨 Wind Speed:  ${w.windSpeed} km/h`);
    console.log(`     ${w.condition}`);
  });

  console.log("\n" + "═".repeat(50));
}

// --- Run the comparison ---
async function runDashboard() {
  const cities = ["Lahore", "Karachi", "Islamabad", "Dubai", "London"];

  try {
    // Sequential (slow — for comparison)
    const seqResults = await fetchSequential(cities);
    displayWeather(seqResults);

    // Parallel (fast — the production pattern!)
    const parResults = await fetchParallel(cities);
    displayWeather(parResults);

  } catch (error) {
    console.error(`❌ Dashboard error: ${error.message}`);
  }
}

runDashboard();

// --- Retry Logic with Exponential Backoff ---
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;

      if (isLastAttempt) {
        console.error(`❌ Failed after ${maxRetries} attempts: ${error.message}`);
        throw error;
      }

      const delay = Math.pow(2, attempt) * 1000;  // 2s, 4s, 8s
      console.log(`⚠️ Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage:
// const weather = await fetchWithRetry(() => getWeather("Lahore"));

// --- TypeScript Async Types (Preview) ---
// These won't run in the browser without a compiler,
// but this is what async TypeScript looks like:

/*
// Promise<T> — the return type of async functions
interface WeatherData {
  city: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
}

// Typed async function
async function getWeatherTyped(city: string): Promise<WeatherData> {
  const response = await fetch(url);
  const data = await response.json();
  return {
    city,
    temperature: data.current_weather.temperature,
    windSpeed: data.current_weather.windspeed,
    weatherCode: data.current_weather.weathercode,
    condition: decodeWeatherCode(data.current_weather.weathercode)
  };
}

// Generic fetch helper — works with ANY type!
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

// Usage with type inference:
const weather = await fetchJSON<WeatherData>(url);
//    ^ TypeScript knows this is WeatherData

const users = await fetchJSON<User[]>("/api/users");
//    ^ TypeScript knows this is User[]
*/
```

> **Teaching Flow:**
> 1. Build the weather fetcher using the real Open-Meteo API
> 2. Run sequential first — note the total time (shown in console)
> 3. Run parallel — dramatically faster! Students see the performance difference
> 4. Show retry logic — "This is how production apps handle flaky networks"
> 5. TypeScript preview — show the types in comments, explain `Promise<T>`

> **Critical Comparison:**
> "Run both sequential and parallel, then compare the times in the console. Five sequential requests might take 3-5 seconds. Five parallel requests finish in about the time of the SLOWEST single request — usually under 1 second. This is the power of `Promise.all`."

---

#### Interactive Questions (Presentation/Verbal) — 84:00–86:00

**Interactive Question 12 — Predict Output: Sequential await vs Promise.all Timing**

> "If each fetch takes 1 second, how long do these two approaches take?"

```javascript
// Approach A: Sequential
const a = await fetch(url1);  // 1 sec
const b = await fetch(url2);  // 1 sec
const c = await fetch(url3);  // 1 sec

// Approach B: Parallel
const [x, y, z] = await Promise.all([
  fetch(url1),  // All start at the same time
  fetch(url2),
  fetch(url3)
]);
```

> **Pause for chat answers** (10 seconds)
>
> **Answer:** Approach A takes ~3 seconds (1+1+1, sequential). Approach B takes ~1 second (all run simultaneously, total time = slowest single request). That's 3x faster for 3 requests. With 10 requests, it would be 10x faster.
>
> "This is the single biggest performance optimization in frontend development. Every dashboard, every page that loads multiple data sources — use `Promise.all` for independent requests."

**Interactive Question 13 — Concept Challenge: What Does Promise<WeatherData> Tell TypeScript?**

> "In TypeScript, what does `Promise<WeatherData>` as a return type communicate?"
>
> **Pause for chat answers** (15 seconds)
>
> **Answer:** It tells TypeScript two things: (1) This function returns a Promise (so you need `await` or `.then()` to get the value), and (2) When that Promise resolves, the value inside will be a `WeatherData` object (so you'll have access to `.city`, `.temperature`, etc. with full autocomplete and type checking). Without the generic `<WeatherData>`, TypeScript would only know it's `Promise<any>` — no type safety on the resolved value.
>
> "In React, every `fetch` call returns `Promise<Response>`. When you parse with `.json()`, you get `Promise<any>`. By typing it as `Promise<WeatherData>`, you get autocomplete on every field. This is why TypeScript makes async code safer — you catch mismatched field names at compile time, not at runtime."

---

#### Part Closing (Presentation) — (Embedded in flow)

**Common Mistakes:**
- Sequential `await` for independent requests — use `Promise.all` for parallel execution
- Not measuring performance — always compare sequential vs parallel timing
- Retry logic without exponential backoff — hammering a failing server makes things worse
- TypeScript `Promise<any>` instead of `Promise<T>` — loses all type safety

**Best Practices:**
- Use `Promise.all` for independent parallel requests, sequential `await` for dependent ones
- Implement retry with exponential backoff for production resilience
- Type your API responses with interfaces — `Promise<T>` gives you full autocomplete

**Professional Insights:**
> "In every React application I've built, the first utility I create is a typed `fetchJSON<T>` helper with error handling, timeout, and retry logic. This single function eliminates 80% of API-related bugs. Today you've built that exact function."

---

### Lecture Ending (86:00 – 90:00)

---

#### Cheat Sheet Slides (Presentation) — 86:00–87:30

> "Let's walk through the key reference points you'll use daily. These are your cheatsheet highlights."

**Reference slides to walk through:**
1. **Event Loop Diagram** — Call stack → Web APIs → Callback queue → Event loop
2. **Promise States** — Pending → Fulfilled / Rejected → .then() / .catch() / .finally()
3. **Promise Combinators** — all / allSettled / race / any — when to use each
4. **async/await Syntax** — `async function`, `await`, `try/catch`
5. **fetch Pattern** — Two-step: await response → check ok → await json
6. **AbortController** — cancel requests, timeout patterns
7. **Sequential vs Parallel** — `await` in loop vs `Promise.all`
8. **TypeScript Async** — `Promise<T>`, typing API responses

> "These are also in your cheatsheet. Keep it open when you code — async syntax takes a few projects to become automatic."

---

#### Assignment Introduction (Presentation) — 87:30–89:00

> "Your assignment is to build your own Weather Dashboard & API Explorer."

**Assignment requirements to highlight:**
1. Create a reusable `fetchJSON` helper with error handling and timeout
2. Fetch data from at least 2 different APIs (JSONPlaceholder + Open-Meteo)
3. Implement `Promise.all` for parallel data loading
4. Handle loading/error/success states for every fetch
5. Use `AbortController` for request cancellation
6. Implement retry logic with at least 2 retry attempts
7. Use `try/catch/finally` for all async error handling
8. Display formatted results in console with clear output
9. Include at least one `Promise.allSettled` usage for graceful partial failures
10. TypeScript comments showing typed versions of your async functions

> "This assignment pulls together everything — fetch, Promises, async/await, error handling, parallel execution. Take your time. Build piece by piece. Test each function individually before combining them."

---

#### Q&A (89:00–89:30)

**Anticipate these questions:**

- **"Do I need to memorize all four Promise combinators?"** → "No. Know that `Promise.all` exists for parallel execution and `allSettled` for partial failures. `race` and `any` are less common but valuable for timeout and fallback patterns. The cheatsheet has the comparison table."
- **"What about axios? Isn't it better than fetch?"** → "Axios is a library that wraps fetch with extra features: automatic JSON parsing, request interceptors, timeout config. It's popular, but `fetch` is built-in — no dependency. In this course, we use `fetch` to understand the fundamentals. Once you know fetch, axios is just convenience."
- **"Will we use fetch in React?"** → "Absolutely. Every React app that talks to a server uses fetch (or a library built on fetch). The `useEffect` + `fetch` + `AbortController` pattern we previewed today is the EXACT pattern you'll use in Module 3. You'll also learn TanStack Query, which handles caching, deduplication, and background refetching for you."

---

#### Next Lecture Teaser (89:30–90:00)

> "Today you talked to servers with Promises and fetch. You built objects to represent weather data, API responses, error states. Notice how much of today's code revolves around objects — `response.ok`, `data.current_weather.temperature`, `{ status: 'loading', data: null }`. Objects are everywhere."
>
> "In Lecture 15, you learn to CREATE your own objects with **classes** — blueprints for objects with built-in behavior, inheritance, and encapsulation. We'll build a **Task Management System with Role Hierarchy** — administrators, managers, developers, each with different permissions inherited through a class hierarchy. It's the architecture behind every React component."
>
> "See you next session — and remember: `try/catch` is your best friend for async code. Guard clauses for validation, `try/catch` for everything that can fail. That combination will serve you for your entire career."

---

## Phase 2: Share After Lecture

- [ ] Upload video recording to Google Classroom
- [ ] Push `code/` folder to course repo — `lectures/lecture-14/code/`
- [ ] Post `assignment.md` to Google Classroom — deadline: before Lecture 15
- [ ] Share `presentation/` (HTML) to Google Classroom
- [ ] Post `cheatsheet.md` to Google Classroom
- [ ] Upload `quiz.md` to online portal — students should attempt before Lecture 15

---

## Interactive Questions Summary

| Part | Type | Topic | Purpose |
|------|------|-------|---------|
| Part 1 | Predict Output | `setTimeout` 0ms ordering (X, Z, Y) | Prove event loop queuing — synchronous code always runs first |
| Part 1 | Concept Challenge | Why `setTimeout(fn, 0)` doesn't execute immediately | Understand the Web API → Queue → Event Loop path |
| Part 1 | Quick-Fire Recall | 4 components of JS runtime | Call Stack, Web APIs, Callback Queue, Event Loop |
| Part 2 | Spot the Error | Promise without `reject` path | Unresolved Promises hang forever — always handle failure |
| Part 2 | Predict Output | `.then().catch().finally()` execution order | Rejection skips `.then()`, `.catch()` handles error, `.finally()` always runs |
| Part 2 | Concept Challenge | Why `.then()` returns a new Promise | Immutability enables chaining and branching |
| Part 3 | Predict Output | `Promise.all` with one rejection | Fail-fast: one rejection cancels all results |
| Part 3 | Concept Challenge | When to use `allSettled` over `all` | Partial failure tolerance for dashboards vs all-or-nothing for transactions |
| Part 3 | Spot the Error | `async` function without `await` | Working with Promise objects instead of resolved values |
| Part 4 | Spot the Error | Not checking `response.ok` | fetch resolves on 404/500 — must check manually |
| Part 4 | Concept Challenge | Why fetch needs two error checks | Network errors vs HTTP errors are different layers |
| Part 5 | Predict Output | Sequential `await` vs `Promise.all` timing | Parallel execution is N times faster for independent requests |
| Part 5 | Concept Challenge | `Promise<WeatherData>` in TypeScript | Communicates both async nature AND resolved value type |

---

## Teaching Tips Summary

| Moment | Tip Type | Purpose |
|--------|----------|---------|
| Opening — restaurant chef analogy | Analogy | Single-threaded async concept before any code |
| JS runtime diagram (4 components) | Diagram | Visual model for event loop — draw it, refer back to it |
| setTimeout 0ms puzzle | "Aha" moment | Proves event loop queuing — the first major insight |
| Pyramid of doom visual | Visual shock | Students SEE why callbacks don't scale |
| Online order analogy for Promise states | Analogy | Pending/fulfilled/rejected mapped to familiar experience |
| Three generations side-by-side | Evolution | Callbacks → Promises → async/await progression |
| Missing `return` in .then() chain | Bug demo | #1 Promise mistake — visceral before theoretical |
| Group dinner analogy for Promise.all | Analogy | All-or-nothing behavior instantly understood |
| Taxi vs Uber for Promise.race | Analogy | First to arrive wins — timeout pattern context |
| try/catch connection to L13 | Bridge | "Same syntax, now with await" — validates prior learning |
| fetch two error checks | Critical insight | The most common fetch mistake in production |
| Loading/error/success state machine | React preview | Plants seed for useState pattern in Module 3 |
| Sequential vs parallel timing comparison | Performance demo | Students see real numbers — 3x-10x difference |
| TypeScript Promise<T> preview | React preparation | Types for async data — used daily in React |

---

## Emergency Recovery

| Problem | Solution |
|---------|----------|
| reveal.js CDN fails | Open presentation as local file. Fall back to VS Code full-screen + verbal explanation. |
| VS Code terminal not working | Use Chrome DevTools Console tab — paste code there and run fetch directly. |
| JSONPlaceholder API down | Switch to Open-Meteo API only, or use hardcoded mock data with setTimeout. |
| Open-Meteo API down | Use JSONPlaceholder (users, posts, todos) for all demos. Weather-specific code uses mock data. |
| CORS error on API call | Switch to an API known to work (JSONPlaceholder). Explain CORS briefly and move on. |
| Network completely down | Use mock functions with `setTimeout` to simulate all async behavior. Async concepts work without real APIs. |
| Student overwhelmed by async | "Everyone finds async confusing at first. The event loop diagram is your anchor — come back to it whenever something feels unclear. With practice, the pattern becomes natural." |
| Running behind schedule | Compress Part 5 capstone to verbal walkthrough with pre-typed code. Skip TypeScript preview to comments only. |
| Running ahead of schedule | Extend Part 5 — add weather caching, let students suggest cities. Show `async` generator preview. |

---

## Conversion Phrases (Sprinkle Throughout)

- *"This is what separates a bootcamp from a professional course — we're not just teaching fetch syntax, we're teaching you how production apps handle loading states, errors, retries, and cancellation."*
- *"In 25 years of production development, the #1 performance optimization I've applied is parallelizing API calls. The knowledge you're gaining today — sequential vs parallel, `Promise.all` vs sequential `await` — has saved companies millions in server costs and user frustration."*
- *"Every React app you'll ever build talks to a server. The fetch → check response → parse JSON → handle errors pattern you're writing today is THE foundation of every data-driven UI."*
- *"When you join a development team, you'll see `async/await` in every file. Understanding that it's syntactic sugar over Promises — and knowing when to use `.then()` chains vs `await` — shows you understand the fundamentals, not just the syntax."*
- *"The loading/error/success state pattern isn't just a code pattern — it's a UX pattern. Users expect loading indicators, error messages, and smooth transitions. Today you're building the engineering behind great user experiences."*

---

## Never Say

- "This is easy/simple" → Say "foundational"
- "You should know this" → Say "Let me show you"
- "Obviously..." → Just explain it
- "Everyone knows..." → Not everyone does — that's why they're here
- "Async is hard" → Say "Async has a learning curve, but the patterns are systematic"
- "Just use axios" → Say "We learn fetch to understand the foundation. Libraries like axios add convenience on top."
- "Don't worry about errors" → Every async call needs error handling — make it second nature
- "You'll never use callbacks" → Say "Callbacks appear in event handlers, `setTimeout`, and legacy code. Understanding them helps you read any codebase."

---
