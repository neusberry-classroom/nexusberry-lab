# Lecture 14: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 15**.
These questions evaluate your understanding of the concepts covered in Lecture 14.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 1000);

console.log("End");
```

**Question:** In what order do the three messages appear in the console?

- A) Start, Timer, End
- B) Timer, Start, End
- C) Start, End, Timer
- D) End, Start, Timer

**Answer:** C) Start, End, Timer

**Explanation:** JavaScript executes synchronous code first — `"Start"` and `"End"` are logged immediately from the call stack. The `setTimeout` callback is sent to the Web API, waits 1 second, then enters the callback queue. The event loop moves it to the call stack only after the synchronous code completes. Option A is wrong because `setTimeout` is non-blocking — JavaScript doesn't pause and wait for the timer. Option B is wrong because callbacks never run before synchronous code. Option D is wrong because `console.log` statements execute in the order they appear on the call stack.

---

## Question 2

**Question:** What is the role of the **callback queue** in the JavaScript runtime?

- A) It stores all variable declarations until they are needed
- B) It holds completed async callbacks until the call stack is empty
- C) It runs callbacks in parallel with the call stack
- D) It schedules which Web API should handle each request

**Answer:** B) It holds completed async callbacks until the call stack is empty

**Explanation:** The callback queue is a waiting area for callbacks that have finished their async work (e.g., a timer that expired, a fetch that completed). The event loop checks: "Is the call stack empty?" If yes, it moves the next callback from the queue to the stack. Option A is wrong because variables are stored in memory/scope, not the queue. Option C is wrong because JavaScript is single-threaded — the queue and stack don't run in parallel. Option D is wrong because the call stack decides which Web API to use when it encounters an async operation.

---

## Question 3

**Question:** Which of the following correctly creates a Promise that resolves with the value `42`?

- A) `const p = Promise(42);`
- B) `const p = new Promise(42);`
- C) `const p = new Promise((resolve) => resolve(42));`
- D) `const p = new Promise(() => return 42);`

**Answer:** C) `const p = new Promise((resolve) => resolve(42));`

**Explanation:** The `Promise` constructor takes an executor function with `resolve` and `reject` parameters. Calling `resolve(42)` transitions the Promise from pending to fulfilled with the value `42`. Option A is wrong because `Promise` must be called with `new`. Option B is wrong because the constructor requires a function, not a raw value — `Promise.resolve(42)` would work for that. Option D is wrong because the executor function's return value is ignored — you must call `resolve()` to settle the Promise.

---

## Question 4

**Context:**
```javascript
async function greet() {
  return "Hello";
}

const result = greet();
console.log(result);
```

**Question:** What does `console.log(result)` display?

- A) `"Hello"`
- B) `undefined`
- C) `Promise { "Hello" }`
- D) An error — async functions can't return strings

**Answer:** C) `Promise { "Hello" }`

**Explanation:** An `async` function always returns a Promise, even if you `return` a plain value. The string `"Hello"` is automatically wrapped in `Promise.resolve("Hello")`. To get the actual value, you need `await greet()` or `greet().then(val => console.log(val))`. Option A is wrong because `greet()` returns a Promise, not the raw string. Option B is wrong because the Promise does have a resolved value. Option D is wrong because async functions can return any value — it just gets wrapped in a Promise.

---

## Question 5

**Context:**
```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("A");
  await delay(1000);
  console.log("B");
  await delay(1000);
  console.log("C");
}

run();
console.log("D");
```

**Question:** What is the output order of A, B, C, D?

- A) A, B, C, D
- B) A, D, B, C
- C) D, A, B, C
- D) A, B, D, C

**Answer:** B) A, D, B, C

**Explanation:** `run()` logs `"A"` synchronously, then hits `await delay(1000)` which pauses the async function and returns control to the caller. The synchronous `console.log("D")` runs immediately after `run()` is called. After 1 second, `"B"` logs, then after another second, `"C"` logs. Option A is wrong because `await` pauses the async function, allowing `"D"` to run before `"B"`. Option C is wrong because `"A"` runs synchronously before any await is encountered. Option D is wrong because `"D"` runs before `"B"` — the first `await` pauses the function before `"B"`.

---

## Question 6

**Context:**
```javascript
const promise = new Promise((resolve, reject) => {
  resolve("first");
  resolve("second");
  reject(new Error("third"));
});

promise.then(val => console.log(val));
```

**Question:** What does this code log?

- A) `"first"` then `"second"`
- B) `"second"` (last resolve wins)
- C) `"first"`
- D) Throws an Error with message `"third"`

**Answer:** C) `"first"`

**Explanation:** A Promise can only be settled once. The first call to `resolve("first")` transitions the Promise from pending to fulfilled. All subsequent calls to `resolve()` or `reject()` are silently ignored — the Promise is already settled. Option A is wrong because the second `resolve` is ignored. Option B is wrong because it's the first settlement that counts, not the last. Option D is wrong because `reject` is also ignored since the Promise was already resolved.

---

## Question 7

**Context:**
```javascript
async function fetchUser() {
  const response = await fetch("https://api.example.com/users/1");
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}

fetchUser()
  .then(user => console.log(user.name))
  .catch(err => console.log("Error:", err.message));
```

**Question:** If the server returns HTTP status 404, what happens?

- A) `fetch` throws a network error caught by `.catch()`
- B) `response.json()` returns `null`
- C) The `if (!response.ok)` check throws, caught by `.catch()` logging `"Error: HTTP 404"`
- D) The code crashes with an unhandled rejection

**Answer:** C) The `if (!response.ok)` check throws, caught by `.catch()` logging `"Error: HTTP 404"`

**Explanation:** `fetch` resolves even for HTTP 404 — it only rejects on network failures (no internet, DNS error). The `response.ok` property is `false` for status codes outside 200-299, so the `if` check triggers and throws a custom Error. This rejection propagates through the async function's returned Promise and is caught by `.catch()`. Option A is wrong because `fetch` does not reject on HTTP error statuses. Option B is wrong because `response.json()` is never reached — the throw happens first. Option D is wrong because the `.catch()` handler properly catches the thrown error.

---

## Question 8

**Context:**
```javascript
async function loadData() {
  try {
    const data = await fetch("/api/data");
    return data;
  } catch (error) {
    console.log("Caught:", error.message);
  } finally {
    console.log("Cleanup done");
  }
}
```

**Question:** If the fetch succeeds (HTTP 200), what does `loadData()` resolve to?

- A) The parsed JSON data
- B) The raw Response object
- C) `undefined` because `finally` overrides the return
- D) A Promise that never settles

**Answer:** B) The raw Response object

**Explanation:** The variable `data` holds the raw `Response` object from `fetch`, not parsed JSON. To get the actual data, you'd need `await data.json()` as a second step. The `finally` block runs but does NOT override the return value — `finally` only overrides if it contains its own `return` statement. Option A is wrong because `response.json()` is never called — the code returns the Response object directly. Option C is wrong because `finally` without a `return` does not affect the function's return value. Option D is wrong because the fetch succeeded and the Promise resolves normally with the Response.

---

## Question 9

**Context:**
```javascript
const urls = ["/api/a", "/api/b", "/api/c"];
const results = [];

for (const url of urls) {
  const response = await fetch(url);
  const data = await response.json();
  results.push(data);
}
```

**Question:** What is the performance problem with this code, and what's the fix?

- A) `for...of` doesn't work with `await` — use `forEach` instead
- B) The loop fetches sequentially; use `Promise.all` with `urls.map()` for parallel execution
- C) `results.push()` mutates the array — use spread operator instead
- D) The code is already optimal — loops with `await` are the standard pattern

**Answer:** B) The loop fetches sequentially; use `Promise.all` with `urls.map()` for parallel execution

**Explanation:** Each `await` in the loop pauses until the previous fetch completes, making three requests run sequentially (e.g., 3 seconds total for 1-second-each requests). Since these fetches are independent, they should run in parallel with `Promise.all(urls.map(url => fetch(url).then(r => r.json())))`, reducing total time to ~1 second. Option A is wrong because `for...of` works perfectly with `await` — it's just slow for independent operations. Option C is wrong because `push()` is fine for building an array. Option D is wrong because sequential execution wastes time when requests don't depend on each other.

---

## Question 10

**Context:**
```javascript
const controller = new AbortController();

setTimeout(() => controller.abort(), 3000);

try {
  const response = await fetch("/api/slow-endpoint", {
    signal: controller.signal
  });
  const data = await response.json();
  console.log("Data:", data);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was canceled");
  } else {
    console.log("Other error:", error.message);
  }
}
```

**Question:** If the server takes 5 seconds to respond, what happens?

- A) The fetch waits the full 5 seconds, then logs the data
- B) After 3 seconds, `controller.abort()` cancels the request and `"Request was canceled"` is logged
- C) The code throws an `AbortError` that crashes the application
- D) `fetch` ignores the signal and completes normally after 5 seconds

**Answer:** B) After 3 seconds, `controller.abort()` cancels the request and `"Request was canceled"` is logged

**Explanation:** The `AbortController` creates a signal that can cancel an in-flight fetch. When `controller.abort()` fires after 3 seconds (before the server's 5-second response), the fetch is canceled and throws an `AbortError`. The `catch` block checks `error.name === "AbortError"` and handles it gracefully. Option A is wrong because the abort signal interrupts the fetch before the response arrives. Option C is wrong because the `try/catch` properly handles the `AbortError` — it doesn't crash. Option D is wrong because `fetch` honors the `signal` parameter and will abort when signaled. This pattern is essential in React's `useEffect` cleanup to prevent updating state on unmounted components.

---

## Self-Assessment

After completing the quiz, rate your understanding:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| Event loop & async execution order | [ ] | [ ] | [ ] |
| setTimeout / setInterval behavior | [ ] | [ ] | [ ] |
| Callbacks & the pyramid of doom | [ ] | [ ] | [ ] |
| Promise creation & states (pending/fulfilled/rejected) | [ ] | [ ] | [ ] |
| .then() / .catch() / .finally() chaining | [ ] | [ ] | [ ] |
| Promise combinators (all, allSettled, race, any) | [ ] | [ ] | [ ] |
| async/await syntax & error handling | [ ] | [ ] | [ ] |
| fetch API & response.ok checking | [ ] | [ ] | [ ] |
| AbortController & request cancellation | [ ] | [ ] | [ ] |
| Sequential vs parallel async execution | [ ] | [ ] | [ ] |

If you marked "Need Review" or "Lost" on any topic, revisit the cheatsheet and lecture recording before the next class.

---

## Scoring Guide

| Score | Level | Action |
|-------|-------|--------|
| 9–10 | Excellent | You're ready for Lecture 15 — OOP with classes |
| 7–8 | Good | Review the 1-2 topics you missed using the cheatsheet |
| 5–6 | Needs work | Re-watch the lecture recording, especially Parts 2-4 |
| Below 5 | Revisit | Schedule time to review the full lecture + cheatsheet before moving on |
