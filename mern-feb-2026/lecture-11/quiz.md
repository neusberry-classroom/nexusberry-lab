# Lecture 11: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 12**.
These questions evaluate your understanding of the concepts covered in Lecture 11.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Question:** What is the key difference between a function declaration and a function expression in JavaScript?

- A) Function declarations use `const`, function expressions use `let`
- B) Function declarations are hoisted, function expressions are not
- C) Function expressions can accept parameters, function declarations cannot
- D) Function declarations cannot return values, function expressions can

**Answer:** B) Function declarations are hoisted, function expressions are not

**Explanation:** Function declarations (`function greet() {}`) are hoisted to the top of their scope during the compilation phase, meaning they can be called before they appear in the code. Function expressions (`const greet = function() {}`) and arrow functions (`const greet = () => {}`) are treated like regular variable assignments — they only exist after the line where they're defined. Options A, C, and D are all incorrect because both forms use the same parameter and return mechanics, and `const`/`let` is only relevant to expressions.

---

## Question 2

**Context:**
```javascript
const formatName = (first, last = "Unknown") => `${first} ${last}`;
console.log(formatName("Sara"));
```

**Question:** What does this code log?

- A) "Sara undefined"
- B) "Sara null"
- C) "Sara Unknown"
- D) SyntaxError — arrow functions don't support default parameters

**Answer:** C) "Sara Unknown"

**Explanation:** Default parameters provide a fallback value when an argument is not passed or is `undefined`. Since `last` is not provided in the call, it defaults to `"Unknown"`, producing `"Sara Unknown"`. Option A would occur without a default parameter. Option B is incorrect because JavaScript uses `undefined` for missing arguments, not `null`. Option D is wrong — arrow functions fully support default parameters.

---

## Question 3

**Question:** What does it mean for a function to be "pure"?

- A) It has no parameters and returns nothing
- B) It only uses arrow function syntax
- C) Given the same input, it always produces the same output and has no side effects
- D) It is defined inside another function using closures

**Answer:** C) Given the same input, it always produces the same output and has no side effects

**Explanation:** A pure function produces the same output for the same input every time and does not modify any external state (no side effects like `console.log`, DOM changes, or network calls). Option A describes a function with no interface, not purity. Option B describes syntax preference, not a behavioral property. Option D describes a nested function or closure, which can be either pure or impure depending on what it does.

---

## Question 4

**Question:** Which higher-order array method should you use when you need to transform every element of an array into a new value and get a new array back?

- A) `forEach`
- B) `filter`
- C) `find`
- D) `map`

**Answer:** D) `map`

**Explanation:** `map` applies a callback to every element and returns a new array of the transformed values, always with the same length as the original. `forEach` iterates but returns `undefined` — it's for side effects only, not for producing new arrays. `filter` returns a subset of elements that pass a condition, not transformed values. `find` returns a single element (the first match), not an array.

---

## Question 5

**Context:**
```javascript
function createMultiplier(factor) {
    return (number) => number * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5) + triple(5));
```

**Question:** What does this code log?

- A) 10
- B) 15
- C) 25
- D) 30

**Answer:** C) 25

**Explanation:** `createMultiplier` returns a closure that remembers the `factor` from its enclosing scope. `double` closes over `factor = 2`, so `double(5)` returns `5 * 2 = 10`. `triple` closes over `factor = 3`, so `triple(5)` returns `5 * 3 = 15`. The sum is `10 + 15 = 25`. Each call to `createMultiplier` creates an independent closure with its own `factor` value — they don't share or interfere with each other.

---

## Question 6

**Context:**
```javascript
const employees = [
    { name: "Sara", salary: 95000, active: true },
    { name: "Ali", salary: 72000, active: false },
    { name: "Hina", salary: 88000, active: true },
    { name: "Omar", salary: 65000, active: true }
];

const result = employees
    .filter(emp => emp.active)
    .map(emp => emp.name);
```

**Question:** What is the value of `result`?

- A) `["Sara", "Ali", "Hina", "Omar"]`
- B) `["Sara", "Hina", "Omar"]`
- C) `[{ name: "Sara" }, { name: "Hina" }, { name: "Omar" }]`
- D) `["Sara", "Hina"]`

**Answer:** B) `["Sara", "Hina", "Omar"]`

**Explanation:** `filter` keeps only employees where `active` is `true`, removing Ali (who is `false`). That leaves Sara, Hina, and Omar. Then `map` extracts just the `name` property from each remaining object, producing `["Sara", "Hina", "Omar"]`. Option A ignores the filter. Option C would be the result if `map` returned objects instead of strings. Option D would only be correct if Omar's `active` were `false`.

---

## Question 7

**Context:**
```javascript
const departments = ["Engineering", "Marketing", "Sales", "Engineering", "Sales"];
const counts = departments.reduce((acc, dept) => {
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
}, {});
```

**Question:** What is the value of `counts`?

- A) `{ Engineering: 1, Marketing: 1, Sales: 1 }`
- B) `["Engineering", "Marketing", "Sales"]`
- C) `{ Engineering: 2, Marketing: 1, Sales: 2 }`
- D) `5`

**Answer:** C) `{ Engineering: 2, Marketing: 1, Sales: 2 }

**Explanation:** `reduce` iterates through the array, accumulating into an object (initialized as `{}`). For each department, `acc[dept] || 0` gets the current count (or 0 if the key doesn't exist yet), then adds 1. Engineering appears twice, Marketing once, Sales twice. Option A would be correct only if each department appeared once. Option B confuses `reduce` with removing duplicates. Option D confuses the accumulator with the array length.

---

## Question 8

**Context:**
```javascript
const numbers = [100, 5, 50, 25, 10];
const sorted = numbers.sort();
console.log(sorted);
```

**Question:** What does this code log?

- A) `[5, 10, 25, 50, 100]`
- B) `[100, 50, 25, 10, 5]`
- C) `[10, 100, 25, 5, 50]`
- D) `[5, 10, 25, 50, 100]` and `numbers` is unchanged

**Answer:** C) `[10, 100, 25, 5, 50]`

**Explanation:** Without a comparator function, JavaScript's `sort()` converts all values to strings and sorts them lexicographically (dictionary order). As strings: `"10" < "100" < "25" < "5" < "50"` because string comparison works character by character (`"1" < "2" < "5"`). The correct way to sort numbers is `[...numbers].sort((a, b) => a - b)`. Option A would be the result with a proper numeric comparator. Option D is wrong because `sort()` mutates the original array — `numbers` is also changed.

---

## Question 9

**Context:**
```javascript
const users = [
    { name: "Sara", role: "admin" },
    { name: "Ali", role: "user" },
    { name: "Hina", role: "user" },
    { name: "Omar", role: "admin" }
];

const hasAdmin = users.some(u => u.role === "admin");
const allAdmins = users.every(u => u.role === "admin");
const adminCount = users.filter(u => u.role === "admin").length;
```

**Question:** What are the values of `hasAdmin`, `allAdmins`, and `adminCount`?

- A) `true`, `true`, `4`
- B) `true`, `false`, `2`
- C) `false`, `false`, `0`
- D) `true`, `false`, `4`

**Answer:** B) `true`, `false`, `2`

**Explanation:** `some` returns `true` because at least one user (Sara) has `role === "admin"`. `every` returns `false` because not all users are admins — Ali and Hina are "user". `filter` creates an array of admin objects (Sara and Omar), and `.length` gives us `2`. `some` short-circuits at the first `true`, and `every` short-circuits at the first `false`, making them efficient for large arrays.

---

## Question 10

**Context:**
```javascript
function createLogger(prefix) {
    const logs = [];

    return {
        log: (message) => {
            logs.push(`[${prefix}] ${message}`);
        },
        getLogs: () => [...logs]
    };
}

const appLogger = createLogger("APP");
const dbLogger = createLogger("DB");

appLogger.log("Started");
appLogger.log("Ready");
dbLogger.log("Connected");

console.log(appLogger.getLogs().length);
console.log(dbLogger.getLogs().length);
```

**Question:** What does this code log?

- A) `3` then `3`
- B) `2` then `1`
- C) `2` then `3`
- D) `0` then `0`

**Answer:** B) `2` then `1`

**Explanation:** Each call to `createLogger` creates a new closure with its own independent `logs` array and `prefix`. `appLogger` has its own `logs` that receives "Started" and "Ready" (2 entries). `dbLogger` has a separate `logs` that receives only "Connected" (1 entry). They don't share state because each closure captures its own variables. Option A would be true if they shared the same `logs` array. `getLogs` returns a copy (`[...logs]`), demonstrating both closures and the spread operator for safe data access.

---

## Self-Assessment

After completing the quiz, rate your understanding:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| Function declarations, expressions & arrow functions | [ ] | [ ] | [ ] |
| Default & rest parameters | [ ] | [ ] | [ ] |
| Scope (global, function, block) & scope chain | [ ] | [ ] | [ ] |
| Closures & factory pattern | [ ] | [ ] | [ ] |
| Pure functions | [ ] | [ ] | [ ] |
| forEach, map, filter, find | [ ] | [ ] | [ ] |
| some, every, reduce | [ ] | [ ] | [ ] |
| sort (comparator & mutation) | [ ] | [ ] | [ ] |
| Method chaining (data pipelines) | [ ] | [ ] | [ ] |
| TypeScript function types & generics | [ ] | [ ] | [ ] |

If you marked "Need Review" or "Lost" on any topic, revisit the cheatsheet and lecture recording before the next class.
