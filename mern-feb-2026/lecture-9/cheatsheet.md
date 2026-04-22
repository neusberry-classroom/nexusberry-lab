<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

# Conditional Logic & Program Flow Control Cheatsheet

Quick reference for all conditional constructs, user input with `prompt-sync`, and TypeScript narrowing covered in Lecture 9.

---

## if / else if / else

Use for **range checks** and **multi-way branching**.

```javascript
const totalScore = 72;

if (totalScore >= 80) {
    console.log("ADMITTED — Welcome to the program!");
} else if (totalScore >= 60) {
    console.log("WAITLISTED — You may be admitted if seats open.");
} else if (totalScore >= 40) {
    console.log("CONDITIONAL — Remedial courses required.");
} else {
    console.log("REJECTED — Score below minimum threshold.");
}
```

**Condition ordering rule:** Always check the **highest threshold first**, then work downward. If you check `>= 40` before `>= 80`, the first branch catches everything.

```javascript
// ❌ WRONG — lowest first catches everything
if (score >= 40) { ... }      // 95 >= 40 is true — stops here!
else if (score >= 80) { ... }  // Never reached

// ✅ CORRECT — highest first
if (score >= 80) { ... }       // Only 80+ enters here
else if (score >= 60) { ... }
else if (score >= 40) { ... }
else { ... }
```

**Flatten nested conditionals** with `&&`:

```javascript
// Instead of deeply nested if blocks:
if (academicScore >= 60 && hasEntrance && seatsAvailable > 0) {
    console.log("ADMITTED");
} else if (academicScore >= 60 && hasEntrance) {
    console.log("WAITLISTED — No seats");
} else if (academicScore >= 60) {
    console.log("REJECTED — No entrance exam");
} else {
    console.log("REJECTED — Low score");
}
```

> **Pro Tip:** If you're nesting more than 2 levels of `if` blocks, refactor — flatten with `&&`, early returns, or guard clauses. Deep nesting (the "pyramid of doom") is unreadable in production.

---

## switch

Use for **exact value matching** against known options. Uses `===` (strict equality) internally.

```javascript
const department = "Computer Science";

switch (department) {
    case "Computer Science":
        console.log("CS Department — Building 4, Floor 3");
        console.log("Prerequisites: Mathematics, Logic");
        break;
    case "Business Administration":
        console.log("Business — Building 2, Floor 1");
        break;
    case "Medicine":
        console.log("Medicine — Medical Campus");
        break;
    default:
        console.log("Unknown department — contact admissions");
}
```

**Intentional fall-through** — grouping cases:

```javascript
switch (dept) {
    case "Physics":
    case "Chemistry":
    case "Mathematics":
        console.log("Faculty of Sciences");
        break;
    case "Computer Science":
    case "Software Engineering":
        console.log("Faculty of Computing");
        break;
    default:
        console.log("General Faculty");
}
```

**Critical:** `switch` uses `===` — a string `"80"` will NOT match the number `80`.

```javascript
const input = "80";  // string from prompt-sync
switch (input) {
    case 80:    // ❌ Won't match — different types
        break;
    case "80":  // ✅ Matches — same type
        break;
}
// Always convert input type before switch!
```

> **Pro Tip:** Every `switch` must have `default`, and every case must have `break` — unless you're intentionally grouping cases. Add `// falls through` comment when intentional. ESLint's `no-fallthrough` rule catches accidental fall-through.

---

## Ternary Operator

Use for **simple value assignment** based on a condition.

```javascript
// Basic: condition ? ifTrue : ifFalse
const status = admissionScore >= 60 ? "Accepted" : "Rejected";

// Dynamic messages
const seatMessage = seatsLeft > 0
    ? `${seatsLeft} seat(s) available — Apply now!`
    : "No seats available — Join the waitlist.";

// Fee calculation
const totalFee = isInternational ? baseFee * 2 : baseFee;
```

**Nested ternary — when it's acceptable:**

```javascript
// ✅ Acceptable: 2-3 branches, pure value assignment, formatted vertically
const grade = studentScore >= 80 ? "A"
    : studentScore >= 60 ? "B"
    : studentScore >= 40 ? "C"
    : "F";
// Each line: one condition → one value — easy to read top-to-bottom
```

**Nested ternary — when it's NOT acceptable:**

```javascript
// ❌ Bad: deeply nested, complex logic, or side effects
// const result = a > 10
//     ? b > 5
//         ? c > 0
//             ? "deep-1"
//             : "deep-2"
//         : "mid"
//     : "low";
// Use if/else instead — this is unreadable
```

**Decision framework — ternary vs if/else:**

| Use ternary when... | Use if/else when... |
|----------------------|---------------------|
| Assigning a value (not side effects) | Side effects (console.log, API calls) |
| 2 outcomes (or 3 with vertical format) | 4+ branches |
| Condition fits on a readable line | Complex combined conditions |
| Single expression per branch | Multiple statements per branch |

> **Pro Tip:** If someone reading your ternary has to think for more than 3 seconds — rewrite it as `if/else`. Readability always beats cleverness. With `const`, ternary lets you assign in one expression instead of needing `let`.

---

## Short-Circuit Evaluation (`||` and `&&`)

`||` and `&&` return **values**, not just booleans.

```javascript
// || returns the first TRUTHY value (or the last value)
const displayName = studentName || "Anonymous Student";
// If studentName is "", returns "Anonymous Student" (empty string is falsy)

const major = userInput || "Undeclared";
// If userInput is null, returns "Undeclared"
```

```javascript
// && returns the first FALSY value (or the last value)
student && student.isActive && console.log(`Processing: ${student.name}`);
// Only runs if student exists AND isActive is true
```

| Operator | Behavior | Returns |
|----------|----------|---------|
| `A \|\| B` | If A is truthy, return A. Otherwise, return B. | First truthy (or last) |
| `A && B` | If A is falsy, return A. Otherwise, return B. | First falsy (or last) |

> **Pro Tip:** In React, `{user && <UserProfile />}` is short-circuit evaluation used for conditional rendering. Learning this now means React patterns will feel natural in Module 3.

---

## Nullish Coalescing (`??`)

Use `??` for defaults when **only** `null` and `undefined` should trigger the fallback. Preserves `0`, `""`, and `false`.

```javascript
const prerequisitesPassed = 0;  // Valid data!
const wrong = prerequisitesPassed || "No data";   // "No data" — WRONG! 0 is falsy
const right = prerequisitesPassed ?? "No data";   // 0 — CORRECT! ?? only triggers on null/undefined

const middleName = null;
const display = middleName ?? "N/A";              // "N/A" — null triggers ??

const emptyString = "";
const result = emptyString ?? "fallback";          // "" — empty string is NOT null/undefined
```

**The critical difference:**

| Value | `\|\|` treats as "missing" | `??` treats as "missing" |
|-------|--------------------------|-------------------------|
| `null` | Yes | Yes |
| `undefined` | Yes | Yes |
| `0` | Yes (bug!) | **No** (preserved) |
| `""` | Yes (bug!) | **No** (preserved) |
| `false` | Yes (bug!) | **No** (preserved) |

> **Pro Tip:** Default to `??` for fallback values. Use `||` only when you deliberately want to replace ALL falsy values. A scholarship system using `||` instead of `??` accidentally gives 100% scholarships to students with 0% discount.

---

## Optional Chaining (`?.`)

Safely access nested properties without crashing on `null` or `undefined`.

```javascript
// Property access
console.log(student.address?.city);          // undefined if address is missing — no crash

// Array element access
console.log(student.scores?.[0]);            // undefined if scores is missing — no crash

// Method call
console.log(student.getGPA?.());             // undefined if getGPA is missing — no crash

// The power combo: ?. + ??
const city = student.address?.city ?? "City not provided";
// Safe access + meaningful default in one line
```

Without `?.`, accessing `student.address.city` when `address` is `undefined` throws:
`TypeError: Cannot read properties of undefined (reading 'city')`

> **Pro Tip:** The `?.` + `??` combo is the most useful pattern in modern JavaScript. Use it for all external or optional data. `data?.user?.email ?? "No email"` — one line replaces ten lines of null checks.

---

## Logical Assignment Operators

Conditional assignment in a single expression (ES2021).

```javascript
// ??= — assign if null/undefined
let notes = null;
notes ??= "No notes available";       // "No notes available" (was null)

let existing = "";
existing ??= "No notes available";    // "" (empty string is NOT null/undefined — preserved)

// ||= — assign if falsy
let email = "";
email ||= "no-email@university.edu";  // "no-email@university.edu" (was falsy "")

let phone = "0300-1234567";
phone ||= "no-phone";                 // "0300-1234567" (was truthy — not overwritten)

// &&= — assign if truthy
let pref = "dark-mode";
pref &&= pref.toUpperCase();          // "DARK-MODE" (was truthy — executes)

let noPref = null;
noPref &&= noPref.toUpperCase();      // null (was null — safe, no crash)
```

| Operator | Condition to Assign | Use Case |
|----------|---------------------|----------|
| `x ??= y` | x is `null` or `undefined` | Initialize missing config values |
| `x \|\|= y` | x is falsy | Replace any empty/zero/false value |
| `x &&= y` | x is truthy | Transform existing value safely |

---

## User Input with `prompt-sync`

Getting interactive user input in Node.js projects.

### Setup

```bash
# One-time setup in your project folder
npm init -y
npm install prompt-sync
```

### Usage

```javascript
// Require prompt-sync (note the double parentheses)
const prompt = require("prompt-sync")();

// String input — works directly
const name = prompt("Enter your name: ");
console.log(`Hello, ${name}!`);

// Numeric input — MUST convert with Number()
const score = Number(prompt("Enter score (0-100): "));
console.log(score + 10);  // Correct math — not string concatenation

// Yes/No input — convert to boolean
const examInput = prompt("Passed exam? (yes/no): ");
const passed = examInput.toLowerCase() === "yes";
```

### Run Your Script

```bash
node admission.js
```

**The critical rule:** `prompt-sync` always returns a **string** — just like browser `prompt()`.

```javascript
const input = prompt("Enter score: ");  // Always a STRING
console.log(typeof input);              // "string"

// ❌ Bug: string concatenation instead of math
console.log(input + 10);               // "8010" not 90!

// ✅ Fix: convert first
const score = Number(input);
console.log(score + 10);               // 90
```

> **Pro Tip:** Wrap every numeric input in `Number()` immediately at the point of entry. This prevents the string concatenation bug — the #1 beginner mistake with user input. `parseInt()` also works for whole numbers.

---

## TypeScript Narrowing (Preview)

TypeScript narrows types based on conditional checks — it knows more about a variable's type after a check.

### `typeof` Guards — Primitive Type Checks

```typescript
function formatScore(score: string | number): string {
    if (typeof score === "string") {
        return score.toUpperCase();       // TS knows: score is string
    } else {
        return `${score.toFixed(1)}%`;    // TS knows: score is number
    }
}
```

### Truthiness Narrowing — Null/Undefined Elimination

```typescript
function getCity(address: { city: string } | null | undefined): string {
    if (address) {
        return address.city;              // TS knows: address exists
    }
    return "City not provided";
}
```

### Discriminated Unions — Object Type Differentiation

```typescript
type AdmissionResult =
    | { status: "admitted"; department: string; scholarship: number }
    | { status: "waitlisted"; position: number }
    | { status: "rejected"; reason: string };

function processResult(result: AdmissionResult): string {
    switch (result.status) {
        case "admitted":
            return `Welcome to ${result.department}!`;  // TS knows: has department
        case "waitlisted":
            return `Position #${result.position}`;      // TS knows: has position
        case "rejected":
            return `Rejected: ${result.reason}`;        // TS knows: has reason
    }
}
```

If you remove a `case`, TypeScript shows a compile-time error — exhaustiveness checking ensures you handle every possible variant.

> **Pro Tip:** Discriminated unions + `switch` is the pattern React uses for component states: `{ status: 'loading' } | { status: 'success', data: T } | { status: 'error', message: string }`. Learning this now means React state management will feel familiar in Module 3.

---

## Common Mistakes to Avoid

### 1. Condition ordering — lowest first catches everything

```javascript
// ❌ Wrong
if (score >= 40) { console.log("Conditional"); }    // 95 >= 40 is true!
else if (score >= 80) { console.log("Admitted"); }   // Never reached

// ✅ Correct
if (score >= 80) { console.log("Admitted"); }        // 95 >= 80 — correct
else if (score >= 40) { console.log("Conditional"); }
```

### 2. Using `||` when `??` is needed — losing valid falsy values

```javascript
const scholarship = 0;  // Valid: 0% scholarship
// ❌ Wrong
const display = scholarship || 100;   // 100 — treats 0 as "no data"
// ✅ Correct
const correct = scholarship ?? 100;   // 0 — preserves valid zero
```

### 3. Missing `break` in switch — fall-through bug

```javascript
switch (status) {
    case "admitted":
        console.log("Acceptance letter");
        // ❌ Missing break! Falls through to next case
    case "rejected":
        console.log("Rejection letter");  // Admitted student gets this too!
        break;
}
```

### 4. Forgetting `Number()` on `prompt-sync` input

```javascript
const input = prompt("Enter score: ");  // Returns "80" (string)
// ❌ Bug: string concatenation
console.log(input + 10);               // "8010"
// ✅ Fix: convert first
console.log(Number(input) + 10);       // 90
```

### 5. Using ternary for side effects

```javascript
// ❌ Wrong — ternary is for VALUES, not actions
score >= 60 ? console.log("Pass") : console.log("Fail");

// ✅ Correct — use if/else for side effects
if (score >= 60) {
    console.log("Pass");
} else {
    console.log("Fail");
}
```

### 6. Missing curly braces on single-line if

```javascript
// ❌ Bug
if (temperature > 30)
    console.log("It's hot!");
    console.log("Stay hydrated!");  // ALWAYS runs — not inside the if!

// ✅ Fix — always use braces
if (temperature > 30) {
    console.log("It's hot!");
    console.log("Stay hydrated!");
}
```

---

## VS Code Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| Open terminal | `` Ctrl + ` `` | `` Cmd + ` `` |
| Run file in terminal | `node filename.js` | `node filename.js` |
| Toggle comment | `Ctrl + /` | `Cmd + /` |
| Duplicate line | `Shift + Alt + Down` | `Shift + Option + Down` |
| Move line up/down | `Alt + Up/Down` | `Option + Up/Down` |
| Select word | `Ctrl + D` | `Cmd + D` |
| Multi-cursor | `Ctrl + Alt + Down` | `Cmd + Option + Down` |
| Quick fix (ESLint) | `Ctrl + .` | `Cmd + .` |
| Go to line | `Ctrl + G` | `Cmd + G` |
| Format document | `Shift + Alt + F` | `Shift + Option + F` |

---

## Quick Reference Table

| Scenario | Tool to Use | Example |
|----------|-------------|---------|
| Range check (>, <, >=) | `if / else if / else` | Score tiers: 80+, 60+, 40+ |
| Exact value matching | `switch` | Department routing |
| Simple value assignment | Ternary `? :` | `const label = x ? "A" : "B"` |
| 3-branch value assignment | Nested ternary (vertical) | `x >= 80 ? "A" : x >= 60 ? "B" : "C"` |
| Default for any falsy | `\|\|` | `name \|\| "Anonymous"` |
| Default for null/undefined only | `??` | `score ?? 0` |
| Guard / conditional exec | `&&` | `user && console.log(user.name)` |
| Safe nested access | `?.` | `obj?.prop?.nested` |
| Safe access + default | `?.` + `??` | `obj?.prop ?? "default"` |
| Conditional assignment | `??=` / `\|\|=` / `&&=` | `notes ??= "None"` |
| Get user input (Node.js) | `prompt-sync` | `const x = prompt("Input: ")` |
| Convert input to number | `Number()` | `Number(prompt("Score: "))` |
| Primitive type check (TS) | `typeof` guard | `typeof x === "string"` |
| Null/undefined check (TS) | Truthiness narrowing | `if (address) { ... }` |
| Object variant check (TS) | Discriminated union | `switch (result.status)` |

---

## What's Next?

**Lecture 10: Loops, Iteration Patterns & Array Fundamentals**
- *Project: Inventory Management System*
- `for`, `while`, `do...while` loops
- `break` and `continue` for loop control
- Nested loops for grids and tables
- `for...in` and `for...of` iteration
- Arrays: creating, mutating methods, non-mutating methods
- Array destructuring preview

Every `if` statement from today appears inside loops — checking conditions on each iteration. Decisions inside repetition is where programs become truly powerful.

---

*NexusBerry Modern Frontend Course — Lecture 9 Cheatsheet*
*Instructor: Rana M. Ajmal*

[MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) | [MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) | [MDN: Ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) | [MDN: Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) | [MDN: Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) | [npm: prompt-sync](https://www.npmjs.com/package/prompt-sync)
