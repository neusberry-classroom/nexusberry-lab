# JavaScript Fundamentals Cheatsheet
## Lecture 8 | NexusBerry Modern Frontend Course

Quick reference for all JavaScript fundamentals covered in Lecture 8.

---

## JavaScript as a Language

### Core Characteristics

| Characteristic | What It Means |
|----------------|---------------|
| **Interpreted / JIT** | Runs line-by-line; V8 engine optimizes hot code at runtime — no manual compile step |
| **Dynamically Typed** | Variable types are determined at runtime, not declared upfront |
| **Everywhere** | Browser (React), Mobile (React Native), Desktop (Electron), Server (Node.js) |

### Two Phases of Learning JavaScript

**Phase 1 — Pure Language (Lectures 8–16)**
Topics: Variables, Functions, Control Flow, Arrays, Objects, Async
Run with: `node filename.js` or browser console — no HTML needed yet

**Phase 2 — Browser & DOM** (later in the course)
Topics: DOM manipulation, Events, Fetch API, localStorage, React, Next.js

### Version History

| Version | Year | Significance |
|---------|------|--------------|
| JavaScript 1.0 | 1995 | Created by Brendan Eich in 10 days at Netscape |
| ES5 | 2009 | Modern baseline — `strict mode`, JSON, Array methods |
| **ES6 / ES2015** ★ | **2015** | **The revolution** — `let`/`const`, arrow functions, classes, modules, template literals |
| ES2020+ | ongoing | Optional chaining, nullish coalescing, top-level await |
| ES2024 | today | Current baseline for professional development |

> **Rule of thumb:** "Modern JavaScript" = ES6+. Everything you write in this course targets ES6 and above.

### Ways to Run JavaScript

| Method | When to Use |
|--------|-------------|
| Browser console (`F12`) | Instant REPL — zero setup, great for experiments |
| HTML `<script>` tag | Standard web usage — runs in the browser |
| Node.js (`node filename.js`) | Server-side, CLI scripts, Phase 1 exercises |
| Online (CodePen, StackBlitz) | Quick demos, sharing code snippets |

### JS Engines by Platform

| Engine | Platform |
|--------|----------|
| V8 | Chrome, Node.js, Edge |
| SpiderMonkey | Firefox |
| JavaScriptCore | Safari, React Native (iOS) |
| Hermes | React Native (Android) — optimized for mobile |

---

## Dynamic vs Static Typing

**Dynamically typed** (JavaScript) — the variable holds any type; type is checked at runtime.
**Statically typed** (TypeScript, C#, Java) — the type is declared upfront; checked at compile time.

```js
// JavaScript — dynamic (type can change at runtime)
let price = 999;        // number
price = "free";         // now a string — no error in JS

// C# — static (type is fixed at compile time)
// int price = 999;
// price = "free";  // ❌ compile error

// TypeScript — static on top of JS
let stock: number = 50;
// stock = "sold out"; // ❌ Type error caught before running
```

**Rule of thumb:** Dynamic typing = flexibility. Static typing = safety. TypeScript gives you both.

---

## Variable Declarations

### Comparison Table

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ*) | Yes (TDZ*) |
| Re-declare | Yes | No | No |
| Reassign | Yes | Yes | No |
| Modern use | Avoid | Yes | Preferred |

*TDZ = Temporal Dead Zone — variable exists but cannot be accessed before its declaration line.

### Scope Examples

```js
// Block scope — let and const
{
  let blockScoped = "I live here only";
  const alsoBlock = "me too";
}
// console.log(blockScoped); // ❌ ReferenceError

// Function scope — var
function showMenu() {
  var item = "Espresso";
}
// console.log(item); // ❌ ReferenceError (function scoped)

// var leaks out of blocks (not functions)
if (true) {
  var leaked = "I escaped!";
}
console.log(leaked); // ✅ "I escaped!" — var ignores block scope
```

### Hoisting Examples

```js
// var is hoisted and initialized to undefined
console.log(drink);   // undefined (no error — hoisted!)
var drink = "Coffee";
console.log(drink);   // "Coffee"

// let/const are hoisted but NOT initialized (TDZ)
// console.log(meal);  // ❌ ReferenceError: Cannot access before init
let meal = "Shawarma";

// Function declarations are fully hoisted
greet();              // ✅ "Hello, NexusBerry!" — works before declaration
function greet() {
  console.log("Hello, NexusBerry!");
}
```

**Professional rule:** Always use `const` by default. Use `let` only when you know the value will change. Never use `var`.

---

## 7 Primitive Data Types

| Type | Example | `typeof` Result |
|------|---------|-----------------|
| `number` | `42`, `3.14`, `-7`, `Infinity`, `NaN` | `"number"` |
| `string` | `"NexusBerry"`, `'hello'`, `` `world` `` | `"string"` |
| `boolean` | `true`, `false` | `"boolean"` |
| `null` | `null` | `"object"` ⚠️ |
| `undefined` | `undefined` | `"undefined"` |
| `symbol` | `Symbol("id")` | `"symbol"` |
| `bigint` | `9007199254740991n` | `"bigint"` |

### The `typeof null` Quirk

```js
console.log(typeof null);        // "object" — this is a historical JS bug!
console.log(typeof undefined);   // "undefined"
console.log(typeof 42);          // "number"
console.log(typeof "NexusBerry"); // "string"
console.log(typeof true);        // "boolean"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 42n);         // "bigint"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" — arrays are objects!
console.log(typeof function(){}); // "function"

// Safe null check — don't rely on typeof null
const val = null;
console.log(val === null);       // ✅ true — use strict equality for null
```

> **Pro Tip:** `typeof` is your debugging friend. Use it in the browser console whenever you're unsure what type a variable holds.

---

## Reference Types

Primitives are stored **by value**. Reference types (objects, arrays, functions) are stored **by reference**.

```js
// Primitives — copy by value
let a = 10;
let b = a;   // b gets a COPY of 10
b = 99;
console.log(a); // 10 — a is unchanged

// Objects — copy by reference
const menuItem = { name: "Latte", price: 450 };
const sameItem = menuItem;   // sameItem points to the SAME object
sameItem.price = 500;
console.log(menuItem.price); // 500 — original changed!

// Arrays — also by reference
const orders = ["Espresso", "Croissant"];
const moreOrders = orders;
moreOrders.push("Muffin");
console.log(orders); // ["Espresso", "Croissant", "Muffin"] — original changed!

// To make a true copy of an object:
const freshItem = { ...menuItem };  // spread operator — creates new object
```

---

## Nesting Types

```js
// Object inside an array (most common in real APIs)
const menu = [
  { id: 1, name: "Espresso", price: 250 },
  { id: 2, name: "Latte",    price: 350 },
  { id: 3, name: "Muffin",   price: 150 },
];

// Access: array index → object property
console.log(menu[0].name);    // "Espresso"
console.log(menu[1].price);   // 350

// Array inside an object
const cafe = {
  name: "NexusBerry Café",
  tags: ["coffee", "wifi", "coding-friendly"],
};
console.log(cafe.tags[2]);    // "coding-friendly"

// Object inside an object
const order = {
  id: 101,
  customer: {
    name: "Rana Ajmal",
    contact: "admin@nexusberry.com",
  },
};
console.log(order.customer.name);    // "Rana Ajmal"
console.log(order["customer"]["contact"]); // bracket notation — same result
```

---

## Input with `prompt()`

```js
// prompt() always returns a STRING (or null if cancelled)
const rawInput = prompt("Enter item price:");
console.log(typeof rawInput);  // "string"

// Convert to number before doing math
const price = Number(rawInput);
console.log(typeof price);     // "number"

// Full example — NexusBerry Café order total
const qty   = Number(prompt("How many items?"));
const cost  = Number(prompt("Price per item (PKR)?"));
const total = qty * cost;
console.log("Total: PKR " + total);

// Number() conversion results
console.log(Number("42"));     // 42
console.log(Number(""));       // 0
console.log(Number("abc"));    // NaN — not a valid number
console.log(Number(true));     // 1
console.log(Number(false));    // 0
console.log(Number(null));     // 0
console.log(Number(undefined));// NaN
```

---

## Arithmetic Operators

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `300 + 150` | `450` |
| `-` | Subtraction | `500 - 75` | `425` |
| `*` | Multiplication | `4 * 125` | `500` |
| `/` | Division | `1000 / 4` | `250` |
| `%` | Modulus (remainder) | `10 % 3` | `1` |
| `**` | Exponentiation | `2 ** 8` | `256` |
| `++` | Increment | `let x = 5; x++` | `x` becomes `6` |
| `--` | Decrement | `let x = 5; x--` | `x` becomes `4` |

### Prefix vs Postfix `++`

```js
let counter = 10;

// Postfix: return THEN increment
console.log(counter++);  // 10 (returns original value first)
console.log(counter);    // 11 (now incremented)

let score = 5;

// Prefix: increment THEN return
console.log(++score);    // 6 (increments first, then returns)
console.log(score);      // 6

// String + number — concatenation (watch out!)
console.log("PKR " + 500);   // "PKR 500" — string concat
console.log("5" + 3);        // "53" — not 8!
console.log("5" - 3);        // 2 — minus triggers numeric conversion
```

---

## Operator Precedence Chart

Evaluated from **highest** to **lowest** priority:

| Priority | Operator(s) | Example |
|----------|-------------|---------|
| 1 — Highest | `()` Parentheses | `(2 + 3) * 4` → `20` |
| 2 | `**` Exponentiation | `2 ** 3` → `8` |
| 3 | `*` `/` `%` Multiplicative | `10 / 2 * 3` → `15` |
| 4 | `+` `-` Additive | `5 + 3 - 1` → `7` |
| 5 | `<` `>` `<=` `>=` `==` `===` `!=` `!==` Comparison | `5 > 3` → `true` |
| 6 | `!` Logical NOT | `!true` → `false` |
| 7 | `&&` Logical AND | `true && false` → `false` |
| 8 | `\|\|` Logical OR | `false \|\| true` → `true` |
| 9 | `?:` Ternary | `x > 0 ? "+" : "-"` |
| 10 — Lowest | `=` `+=` `-=` etc. Assignment | `x = 5` |

```js
// Precedence in action
let result = 2 + 3 * 4;       // 14 — not 20 (* before +)
let correct = (2 + 3) * 4;    // 20 — parens override

let discount = 500 - 100 / 2; // 450 — / before -
let bill = (500 - 100) / 2;   // 200 — parens first
```

---

## Comparison Operators

### `==` vs `===`

| Expression | `==` (loose) | `===` (strict) |
|------------|-------------|----------------|
| `1 == "1"` | `true` (coerces) | `false` |
| `0 == false` | `true` (coerces) | `false` |
| `null == undefined` | `true` | `false` |
| `0 == ""` | `true` (coerces) | `false` |
| `1 === 1` | `true` | `true` |
| `"abc" === "abc"` | `true` | `true` |

```js
// Loose equality — JS coerces types before comparing
console.log(1 == "1");         // true  — string coerced to number
console.log(0 == false);       // true  — false coerced to 0
console.log(null == undefined);// true  — special rule in JS spec

// Strict equality — no coercion, types must match
console.log(1 === "1");        // false — number !== string
console.log(0 === false);      // false — number !== boolean
console.log(null === undefined);// false — different types
```

**Always use `===` in production code.** Use `==` only when you intentionally want type coercion (rare).

---

## Truth Tables

### Logical AND (`&&`) — Both must be true

| A | B | A && B |
|---|---|--------|
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

### Logical OR (`||`) — At least one must be true

| A | B | A \|\| B |
|---|---|---------|
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

### Logical NOT (`!`) — Inverts the value

| A | !A |
|---|----|
| `true` | `false` |
| `false` | `true` |

---

## Short-Circuit Evaluation

JavaScript stops evaluating as soon as the result is determined.

```js
// && short-circuits at the FIRST FALSY value
false && console.log("never runs");    // stops at false
0 && console.log("never runs");        // stops at 0

// || short-circuits at the FIRST TRUTHY value
true || console.log("never runs");     // stops at true
"NexusBerry" || console.log("skipped"); // stops at "NexusBerry"
```

### Return Values (non-boolean operands)

`&&` returns the **first falsy value**, or the **last value** if all are truthy.
`||` returns the **first truthy value**, or the **last value** if all are falsy.

```js
// && examples
console.log("Rana" && 42);          // 42 — both truthy, returns last
console.log(0 && "NexusBerry");     // 0 — first falsy, stops here
console.log(null && "anything");    // null — first falsy

// || examples
console.log("" || "Anonymous");     // "Anonymous" — "" is falsy, returns second
console.log("Rana" || "Anonymous"); // "Rana" — first truthy
console.log(0 || null || false);    // false — all falsy, returns last
```

### Practical Patterns

```js
// Guard check — only access property if object exists
const user = { name: "Rana", email: "admin@nexusberry.com" };
console.log(user && user.name);      // "Rana" — safe access

const guest = null;
console.log(guest && guest.name);    // null — won't throw error

// Default value — use || to provide fallback
const inputName = "";                // empty string from prompt
const displayName = inputName || "Anonymous Customer";
console.log(displayName);           // "Anonymous Customer"

// Nullish coalescing (preview — Lecture 10)
// const name = input ?? "Anonymous"; // only falls back for null/undefined
```

---

## Ternary Operator

Compact shorthand for a simple if/else expression.

**Syntax:** `condition ? valueIfTrue : valueIfFalse`

```js
// Basic ternary
const age = 20;
const access = age >= 18 ? "Allowed" : "Denied";
console.log(access);  // "Allowed"

// Practical example — NexusBerry order discount
const orderTotal = 2500;
const discount    = orderTotal >= 2000 ? "10% OFF" : "No discount";
console.log(discount); // "10% OFF"

// Ternary in a string (template literal)
const items = 3;
const label = `You have ${items} ${items === 1 ? "item" : "items"} in your cart`;
console.log(label); // "You have 3 items in your cart"

// Nested ternary (use sparingly — hurts readability)
const score = 75;
const grade = score >= 90 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : "F";
console.log(grade); // "B"
```

---

## The 6 Falsy Values

These are the **only** values that evaluate to `false` in a boolean context:

| Value | Type | Notes |
|-------|------|-------|
| `false` | boolean | Literal false |
| `0` | number | Zero (also `-0` and `0n`) |
| `""` | string | Empty string (also `''` and ` `` `) |
| `null` | null | Intentional absence of value |
| `undefined` | undefined | Variable declared but not assigned |
| `NaN` | number | Result of invalid math (`"abc" * 2`) |

```js
// All 6 falsy values in boolean context
if (false)     console.log("falsy"); // skipped
if (0)         console.log("falsy"); // skipped
if ("")        console.log("falsy"); // skipped
if (null)      console.log("falsy"); // skipped
if (undefined) console.log("falsy"); // skipped
if (NaN)       console.log("falsy"); // skipped

// Quick test
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
```

---

## Truthy Surprises

Everything NOT in the falsy list is truthy — including these common surprises:

| Value | Truthy? | Why People Expect False |
|-------|---------|------------------------|
| `"0"` | ✅ truthy | Looks like zero, but it's a non-empty string |
| `[]` | ✅ truthy | Empty array is still an object |
| `{}` | ✅ truthy | Empty object is still an object |
| `-1` | ✅ truthy | Any non-zero number (including negative) is truthy |
| `"false"` | ✅ truthy | The string "false" is non-empty |
| `Infinity` | ✅ truthy | Any number except 0 and NaN |

```js
// Truthy surprises in action
if ("0")      console.log('"0" is truthy!');    // runs!
if ([])       console.log('"[]" is truthy!');   // runs!
if ({})       console.log('"{}" is truthy!');   // runs!
if (-1)       console.log('"-1" is truthy!');   // runs!
if ("false")  console.log('"false" is truthy!'); // runs!

// Common mistake — checking if array is "empty"
const orders = [];
if (orders) {
  console.log("This runs even though array is empty!");
}
// Correct check for empty array:
if (orders.length > 0) {
  console.log("Now this only runs if orders exist");
}
```

---

## Logical Operators with Non-Boolean Operands

| Expression | Returns | Because |
|------------|---------|---------|
| `"Rana" && 42` | `42` | Both truthy → returns last |
| `0 && "NexusBerry"` | `0` | First falsy → short-circuits |
| `null && "anything"` | `null` | First falsy → short-circuits |
| `"" \|\| "Anonymous"` | `"Anonymous"` | First truthy found |
| `"Rana" \|\| "Guest"` | `"Rana"` | First truthy found |
| `0 \|\| null \|\| false` | `false` | All falsy → returns last |
| `!0` | `true` | NOT converts to boolean first |
| `!!"NexusBerry"` | `true` | Double NOT = explicit boolean cast |

```js
// Double NOT (!!) — convert any value to its boolean equivalent
console.log(!!"");          // false — empty string is falsy
console.log(!!"NexusBerry");// true  — non-empty string is truthy
console.log(!!0);           // false
console.log(!!42);          // true
console.log(!!null);        // false
console.log(!![]);          // true  — arrays are always truthy
```

---

## Practical Patterns

```js
// 1. Default value with ||
const rawName   = prompt("Your name:") || "Anonymous";
const itemPrice = Number(prompt("Price:")) || 0;

// 2. Guard check with && (safe property access)
const customer = { name: "Rana", plan: "Premium" };
const planName = customer && customer.plan;  // "Premium"

const noCustomer = null;
const safePlan = noCustomer && noCustomer.plan; // null — no error!

// 3. Conditional execution with &&
const isLoggedIn = true;
isLoggedIn && console.log("Welcome to NexusBerry Café!");

// 4. Type coercion in arithmetic
const qty   = Number(prompt("Quantity:"));
const price = Number(prompt("Unit price:"));
const tax   = 0.17;  // 17% GST
const total = qty * price * (1 + tax);
console.log(`Total with tax: PKR ${total.toFixed(2)}`);

// 5. Nullish coalescing ?? (ES2020 — preview)
// Returns right side ONLY if left is null or undefined (not 0 or "")
const rating = 0;
console.log(rating || "No rating");   // "No rating" — 0 is falsy!
console.log(rating ?? "No rating");   // 0 — 0 is not null/undefined
```

---

## TypeScript Basics (Preview)

TypeScript adds **type annotations** to JavaScript variables. Errors are caught before code runs.

### Variable Annotations

```ts
// Syntax: let variableName: type = value;
let productName: string  = "NexusBerry Café Menu";
let itemPrice:   number  = 450;
let isAvailable: boolean = true;
let orderId:     null    = null;

// Type error — caught at compile time, before running
// let quantity: number = "five"; // ❌ Type 'string' is not assignable to type 'number'
```

### `any` vs `unknown`

```ts
// any — turns off type checking (avoid in production)
let flexible: any = "hello";
flexible = 42;        // ✅ no error
flexible = true;      // ✅ no error
flexible.toFixed(2);  // ✅ no compile error — but may crash at runtime!

// unknown — safe alternative to any
let safeVal: unknown = "hello";
// safeVal.toUpperCase(); // ❌ must check type first

if (typeof safeVal === "string") {
  console.log(safeVal.toUpperCase()); // ✅ type narrowed — safe to use
}
```

### Array & Object Annotations

```ts
// Array type annotation
let prices:   number[] = [250, 350, 450];
let itemNames: string[] = ["Espresso", "Latte", "Muffin"];

// Object type annotation
let menuItem: { name: string; price: number; available: boolean } = {
  name:      "Cold Brew",
  price:     550,
  available: true,
};

// Accessing typed properties
console.log(menuItem.name);    // "Cold Brew"
console.log(menuItem.price);   // 550
```

### Type Inference

TypeScript can **infer** the type without explicit annotation:

```ts
// TypeScript infers the type from the initial value
let cafe      = "NexusBerry";   // inferred: string
let tableNum  = 7;              // inferred: number
let isOpen    = true;           // inferred: boolean

// Reassigning wrong type still causes an error
// cafe = 123;  // ❌ Type 'number' is not assignable to type 'string'
```

### `const` vs `let` — Type Inference Difference

```ts
// let → widened type (can be any value of that type)
let status = "active";       // inferred: string  (can be reassigned to any string)
status = "inactive";         // ✅ allowed

// const → literal type (TS knows the exact value)
const direction = "north";   // inferred: "north"  (not just "string")
// direction = "south";      // ❌ Type '"south"' is not assignable to type '"north"'
```

**Rule of thumb:** Annotate function parameters always; let TypeScript infer types for variable assignments.

### TypeScript Catches What JavaScript Misses

| | JavaScript | TypeScript |
|--|------------|------------|
| **Type errors** | Discovered at runtime — users hit bugs in production | Caught at compile time — before you ship |
| **Example** | `const total = "199" + 33.83` → `"19933.83"` (silent bug) | `const price: number = "199"` → Error immediately |

```ts
// Bug that JS silently ignores, TS catches instantly
const price: number = "199";  // ❌ Type 'string' is not assignable to type 'number'

// In JS, this works but gives wrong result:
const total = "199" + 33.83;  // "19933.83" — concatenation, not addition!
```

> **Pro Tip:** Enable `"strict": true` in `tsconfig.json` to catch the widest range of type errors. This is the professional default for all new TypeScript projects.

---

## Common Mistakes to Avoid

### 1. Using `var` in Modern Code

```js
// WRONG — var leaks out of blocks
if (true) {
  var total = 500;
}
console.log(total); // 500 — leaked! Unexpected behavior

// CORRECT — let/const respect block scope
if (true) {
  let total = 500;
}
// console.log(total); // ❌ ReferenceError — safely contained
```

### 2. Using `==` Instead of `===`

```js
// WRONG — loose equality causes hidden bugs
const input = "0";
if (input == false) {
  console.log("This runs!"); // Unexpected — "0" == false is true
}

// CORRECT — strict equality, no surprises
if (input === false) {
  console.log("This won't run"); // "0" !== false
}
```

### 3. Forgetting `const` Must Be Initialized

```js
// WRONG — const with no value
// const itemName; // ❌ SyntaxError: Missing initializer

// CORRECT — always provide a value
const itemName = "Espresso";  // ✅
```

### 4. `typeof null === "object"` Quirk

```js
// WRONG assumption
const data = null;
if (typeof data === "object") {
  console.log(data.name); // ❌ TypeError — data is null, not a real object!
}

// CORRECT — check for null explicitly first
if (data !== null && typeof data === "object") {
  console.log(data.name); // ✅ safe
}
// Or simply:
if (data === null) {
  console.log("No data available");
}
```

### 5. Assuming `"0"` Is Falsy

```js
// WRONG — developer expects "0" to be falsy
const input = "0"; // string from prompt()
if (!input) {
  console.log("No input"); // Never runs — "0" is truthy!
}

// CORRECT — compare value explicitly
if (input === "" || Number(input) === 0) {
  console.log("Zero or empty input");
}
```

### 6. `prompt()` Always Returns a String

```js
// WRONG — using raw prompt result in math
const qty   = prompt("Quantity:");
const price = prompt("Price:");
const total = qty * price;   // Works accidentally due to coercion
const bill  = qty + price;   // "25" + "100" = "25100" — concatenation!

// CORRECT — always convert before arithmetic
const quantity  = Number(prompt("Quantity:"));
const unitPrice = Number(prompt("Price:"));
const orderTotal = quantity * unitPrice; // ✅ correct math
const receipt    = quantity + unitPrice; // ✅ 25 + 100 = 125
```

---

## VS Code Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + /` | Toggle line comment |
| `Ctrl + D` | Select next occurrence of current word |
| `Alt + ↑ / ↓` | Move line up or down |
| `Shift + Alt + ↓` | Duplicate line downward |
| `Ctrl + \`` | Open / focus terminal |
| `Ctrl + Space` | Trigger IntelliSense (autocomplete) |
| `F2` | Rename symbol (safe rename across file) |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + P` | Quick file open |
| `Ctrl + B` | Toggle sidebar |

> **Pro Tip:** Use `Ctrl + D` to select and rename multiple occurrences of a variable simultaneously — much faster than find-and-replace!

---

## Quick Reference Table

| What you want | How to do it |
|---------------|--------------|
| Declare a constant | `const name = "value";` |
| Declare a changeable variable | `let count = 0;` |
| Get user input | `const input = prompt("Enter value:");` |
| Convert string to number | `Number(input)` or `parseInt(input)` |
| Check type of a variable | `typeof variable` |
| Strict equality check | `a === b` |
| Default value if falsy | `value \|\| "default"` |
| Guard before accessing property | `obj && obj.property` |
| Compact if/else | `condition ? "yes" : "no"` |
| Remainder / modulus | `10 % 3` → `1` |
| Power / exponent | `2 ** 10` → `1024` |
| Convert to boolean | `!!value` |
| Check if null specifically | `value === null` |
| Annotate type in TypeScript | `let x: number = 5;` |
| Safe unknown type in TypeScript | `let x: unknown = getData();` |

---

## What's Next?

In **Lecture 9: University Admission Gateway**, you'll learn:

- `if`, `else if`, `else` — branching logic
- `switch` statements — multi-case decisions
- `for`, `while`, `do...while` loops
- Loop control: `break` and `continue`
- Combining everything into a real admission decision engine

> *"Knowing your data types and operators is the foundation. Next lecture, you'll use them to make decisions — that's where programs come alive."*

---

*Keep this cheatsheet handy while working on your assignments!*
