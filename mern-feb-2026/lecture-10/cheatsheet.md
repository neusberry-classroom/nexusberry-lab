# Loops, Iteration Patterns & Array Fundamentals Cheatsheet
<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

Quick reference for all loop types and array operations covered in Lecture 10.

---

## The `for` Loop — Known Count, Index-Based

Use when you know how many iterations you need, or when iterating arrays by index.

```javascript
// Basic counting
for (let shelf = 1; shelf <= 5; shelf++) {
    console.log(`Shelf ${shelf}: Checked ✅`);
}

// Counting down
for (let seconds = 5; seconds >= 1; seconds--) {
    console.log(`${seconds}...`);
}

// Stepping by intervals
for (let itemId = 0; itemId <= 50; itemId += 10) {
    console.log(`Item #${itemId}: Spot-checked`);
}

// Accumulator pattern — calculating totals
let totalValue = 0;
for (let i = 1; i <= 5; i++) {
    const price = i * 100;
    totalValue += price;
}
console.log(`Total: Rs. ${totalValue}`);  // 1500
```

**Anatomy:**

```
for (let i = 0;  i < 5;  i++)
     ─────────   ─────   ───
     initialize   test    update
     (once)     (before  (after
                 each)   each)
```

**Iterating arrays:**

```javascript
const products = ["Laptop", "Mouse", "Keyboard"];

for (let i = 0; i < products.length; i++) {
    console.log(`${i + 1}. ${products[i]}`);
}
```

> **Pro Tip:** Always use `< array.length`, never `<=`. Arrays are zero-indexed: 5 items = indices 0–4. `products[products.length]` is `undefined`.

---

## `while` Loop — Unknown Count, Condition-First

Use when you don't know the number of iterations in advance. Checks condition **before** the body — may run 0 times.

```javascript
// Search until found
const warehouse = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];
let searchIndex = 0;
const target = "Monitor";

while (searchIndex < warehouse.length) {
    if (warehouse[searchIndex] === target) {
        console.log(`Found "${target}" at position ${searchIndex}`);
        break;
    }
    searchIndex++;
}

// Stock depletion simulation
let stock = 25;
let day = 1;

while (stock > 0) {
    const sold = Math.floor(Math.random() * 8) + 1;
    stock = Math.max(0, stock - sold);
    console.log(`Day ${day}: Sold ${sold} → ${stock} remaining`);
    day++;
}
```

> **Pro Tip:** Every `while` loop must change the condition variable inside its body. Forgetting the update is the #1 cause of infinite loops.

---

## `do...while` Loop — Body-First, Runs at Least Once

Use when the body must execute at least once before checking the condition.

```javascript
// Input validation — must attempt at least once
const simulatedInputs = ["", "abc", "-5", "42"];
let inputIndex = 0;
let validQuantity;

do {
    const input = simulatedInputs[inputIndex];
    const parsed = Number(input);

    if (input !== "" && !isNaN(parsed) && parsed > 0) {
        validQuantity = parsed;
        console.log(`✅ Valid quantity: ${validQuantity}`);
    } else {
        console.log(`❌ Invalid input "${input}"`);
    }
    inputIndex++;
} while (validQuantity === undefined && inputIndex < simulatedInputs.length);
```

| Feature | `while` | `do...while` |
|---------|---------|--------------|
| Condition check | Before body | After body |
| Minimum runs | 0 | 1 |
| Use case | "Check first, then act" | "Act first, then check" |

---

## `break` & `continue` — Loop Control

```javascript
// break — exit the loop entirely
const stockLevels = [15, 8, 22, 0, 12, 3, 0, 9];

for (let i = 0; i < stockLevels.length; i++) {
    if (stockLevels[i] === 0) {
        console.log(`Product at index ${i} is OUT OF STOCK`);
        break;  // Stop — found what we needed
    }
}

// continue — skip current iteration, keep going
const inventory = [
    { name: "Laptop", stock: 12 },
    { name: "Mouse", stock: 0 },
    { name: "Keyboard", stock: 25 }
];

for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].stock === 0) {
        continue;  // Skip out-of-stock items
    }
    console.log(`${inventory[i].name}: ${inventory[i].stock} units`);
}
// Prints Laptop and Keyboard — skips Mouse
```

| Keyword | Effect |
|---------|--------|
| `break` | Exit the entire loop immediately |
| `continue` | Skip to the next iteration |

---

## Nested Loops

Outer loop × inner loop = total iterations. Use descriptive variable names.

```javascript
// Grid generation
for (let row = 1; row <= 3; row++) {
    let rowDisplay = `Row ${row}: `;
    for (let col = 1; col <= 4; col++) {
        rowDisplay += `[${row}-${col}] `;
    }
    console.log(rowDisplay);
}

// Cross-checking two lists
const warehouseItems = ["Laptop", "Mouse", "Keyboard", "Monitor"];
const orderItems = ["Mouse", "Tablet", "Keyboard"];

for (let o = 0; o < orderItems.length; o++) {
    let found = false;
    for (let w = 0; w < warehouseItems.length; w++) {
        if (orderItems[o] === warehouseItems[w]) {
            found = true;
            break;  // No need to keep checking
        }
    }
    console.log(`"${orderItems[o]}" — ${found ? "Available" : "Not in warehouse"}`);
}
```

> **Pro Tip:** Use `break` inside inner loops when you find a match — it prevents unnecessary comparisons. Name variables `row`/`col` or `o`/`w` instead of `i`/`j` for readability.

---

## `for...in` vs `for...of`

```javascript
// for...in — iterates KEYS (use for objects)
const productDetails = { name: "Laptop", price: 89999, stock: 15 };

for (const key in productDetails) {
    console.log(`${key}: ${productDetails[key]}`);
}
// name: Laptop, price: 89999, stock: 15

// for...of — iterates VALUES (use for arrays & strings)
const items = ["Laptop", "Mouse", "Keyboard"];

for (const item of items) {
    console.log(item);
}
// Laptop, Mouse, Keyboard
```

| Feature | `for...in` | `for...of` |
|---------|-----------|-----------|
| Iterates | Object **keys** | Iterable **values** |
| On arrays | String indices (`"0"`, `"1"`) | Actual values |
| On objects | Property names | **TypeError** |
| Best for | Objects | Arrays, strings |

> **Pro Tip:** Remember: **in** = keys **in** an object. **of** = values **of** a collection. Using `for...of` on a plain object throws a TypeError.

---

## Arrays — Creating & Accessing

```javascript
// Create an array
const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];

// Access by index (zero-based)
console.log(products[0]);                    // "Laptop" (first)
console.log(products[products.length - 1]);  // "Webcam" (last)
console.log(products[99]);                   // undefined (no error!)

// Array length
console.log(products.length);  // 5
```

---

## Array Methods — Mutating (Changes Original)

These methods modify the original array in place.

```javascript
const products = ["Laptop", "Mouse", "Keyboard"];

// push — add to END
products.push("Headset");
// ["Laptop", "Mouse", "Keyboard", "Headset"]

// pop — remove from END
const removed = products.pop();   // "Headset"
// ["Laptop", "Mouse", "Keyboard"]

// unshift — add to START
products.unshift("Router");
// ["Router", "Laptop", "Mouse", "Keyboard"]

// shift — remove from START
const first = products.shift();   // "Router"
// ["Laptop", "Mouse", "Keyboard"]

// splice — INSERT, REMOVE, or REPLACE at any position
products.splice(2, 1);               // Remove 1 at index 2
// ["Laptop", "Mouse"]

products.splice(1, 0, "Tablet");     // Insert at index 1
// ["Laptop", "Tablet", "Mouse"]

products.splice(1, 1, "Wireless Mouse");  // Replace at index 1
// ["Laptop", "Wireless Mouse", "Mouse"]
```

| Method | Position | Returns |
|--------|----------|---------|
| `push(item)` | End + | New length |
| `pop()` | End - | Removed item |
| `unshift(item)` | Start + | New length |
| `shift()` | Start - | Removed item |
| `splice(i, n, ...items)` | Any | Removed items array |

> **Pro Tip:** `push`/`pop` are O(1) — fast. `unshift`/`shift` are O(n) — every element shifts. Prefer end operations for performance-critical code.

---

## Array Methods — Non-Mutating (Original Unchanged)

These methods return new values without touching the original.

```javascript
const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];

// concat — merge arrays (returns new array)
const accessories = ["USB Cable", "Mouse Pad"];
const fullCatalog = products.concat(accessories);
// products is still 5 items — fullCatalog has 7

// slice — extract portion (start inclusive, end exclusive)
const topThree = products.slice(0, 3);   // ["Laptop", "Mouse", "Keyboard"]
const lastTwo = products.slice(-2);       // ["Monitor", "Webcam"]

// indexOf — find position (-1 if not found)
products.indexOf("Monitor");   // 3
products.indexOf("Phone");     // -1

// includes — check existence (returns boolean)
products.includes("Laptop");   // true
products.includes("Phone");    // false
```

| Method | Returns | Use when |
|--------|---------|----------|
| `concat(arr)` | New merged array | Combining arrays |
| `slice(start, end)` | New sub-array | Extracting a portion |
| `indexOf(item)` | Index or `-1` | Need the position |
| `includes(item)` | `true`/`false` | Just checking existence |

> **Pro Tip:** `splice` (mutates) vs `slice` (non-mutating) — one letter difference, completely different behavior. `splice` has a **P** — it **P**lucks from the original.

---

## Array Destructuring Preview

A taste of Lecture 12 — extract values from arrays by position.

```javascript
const topProducts = ["Laptop", "Monitor", "Tablet", "Mouse", "Webcam"];

// Traditional
const first = topProducts[0];
const second = topProducts[1];

// Destructuring
const [best, runnerUp, ...rest] = topProducts;
console.log(best);      // "Laptop"
console.log(runnerUp);  // "Monitor"
console.log(rest);      // ["Tablet", "Mouse", "Webcam"]
```

---

## TypeScript Arrays (Preview)

```typescript
// Typed arrays — two equivalent syntaxes
const prices: number[] = [89999, 1999, 24999, 299];
const names: Array<string> = ["Laptop", "Mouse", "Desk Chair"];

// Tuples — fixed-length, typed at each position
type Product = [string, number, boolean];  // [name, price, inStock]
const laptop: Product = ["Laptop", 89999, true];   // ✅
const broken: Product = [89999, "Laptop", true];   // ❌ Error

// readonly — prevent mutation
const DEPARTMENTS: readonly string[] = ["Electronics", "Furniture"];
// DEPARTMENTS.push("Food");  ← TypeScript ERROR
```

| Type | Syntax | Purpose |
|------|--------|---------|
| `number[]` | `Array<number>` | All elements same type |
| `[string, number]` | — | Tuple: fixed positions |
| `readonly string[]` | — | Immutable array |

> **Pro Tip:** `readonly` arrays prevent ALL mutation methods (`push`, `pop`, `splice`). In React, readonly arrays help prevent accidental state mutations.

---

## Common Mistakes to Avoid

### Off-by-one with array length
```javascript
// ❌ WRONG — accesses undefined at products[5]
for (let i = 0; i <= products.length; i++) {
    console.log(products[i]);
}

// ✅ CORRECT — use < not <=
for (let i = 0; i < products.length; i++) {
    console.log(products[i]);
}
```

### Wrong update direction → infinite loop
```javascript
// ❌ WRONG — i-- instead of i++, loops forever
for (let i = 1; i <= 5; i--) {
    console.log(i);
}

// ✅ CORRECT
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### Forgotten update in while loop
```javascript
// ❌ WRONG — i never changes, infinite loop
let i = 0;
while (i < 5) {
    console.log(i);
    // missing i++
}

// ✅ CORRECT
let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}
```

### Forgetting to capture concat result
```javascript
// ❌ WRONG — concat doesn't modify original
const original = [10, 20, 30];
original.concat([40, 50]);
console.log(original);  // [10, 20, 30] — unchanged!

// ✅ CORRECT — capture the return value
const extended = original.concat([40, 50]);
console.log(extended);  // [10, 20, 30, 40, 50]
```

### Case-sensitive search
```javascript
// ❌ WRONG — "wireless mouse" !== "Wireless Mouse"
if (product.name === searchTerm) { ... }

// ✅ CORRECT — normalize both sides
if (product.name.toLowerCase() === searchTerm.toLowerCase()) { ... }
```

### Confusing splice vs slice
```javascript
// splice MUTATES — removes/inserts in place
products.splice(2, 1);    // Removes 1 item at index 2 from products

// slice DOES NOT MUTATE — returns a copy
const portion = products.slice(0, 3);  // products unchanged
```

---

## Which Loop to Use?

| Situation | Best Loop |
|-----------|-----------|
| Known count / array with index | `for` |
| Array values (no index needed) | `for...of` |
| Object keys/properties | `for...in` |
| Unknown count, may run 0 times | `while` |
| Must run at least once | `do...while` |
| Search with early exit | `while` + `break` or `for` + `break` |
| Skip certain items | `for` + `continue` |

---

## VS Code Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| Run file in terminal | `Ctrl + `` ` then `node file.js` | `Cmd + `` ` then `node file.js` |
| Duplicate line | `Shift + Alt + ↓` | `Shift + Option + ↓` |
| Move line up/down | `Alt + ↑/↓` | `Option + ↑/↓` |
| Select next occurrence | `Ctrl + D` | `Cmd + D` |
| Toggle line comment | `Ctrl + /` | `Cmd + /` |
| Multi-cursor | `Ctrl + Alt + ↑/↓` | `Cmd + Option + ↑/↓` |

---

## Quick Reference Table

| Concept | Syntax | Key Point |
|---------|--------|-----------|
| `for` | `for (init; test; update) {}` | Three parts, semicolons |
| `while` | `while (condition) {}` | Checks before body |
| `do...while` | `do {} while (condition);` | Checks after body (semicolon!) |
| `break` | `break;` | Exit entire loop |
| `continue` | `continue;` | Skip to next iteration |
| `for...in` | `for (const key in obj) {}` | Object keys only |
| `for...of` | `for (const val of arr) {}` | Array/string values |
| `push/pop` | End of array | Fast (O(1)) |
| `unshift/shift` | Start of array | Slow (O(n)) |
| `splice` | Any position | Mutates original |
| `slice` | Any range | Non-mutating copy |
| `indexOf` | Find position | Returns -1 if not found |
| `includes` | Check existence | Returns boolean |
| `concat` | Merge arrays | Non-mutating — capture result! |

---

## What's Next?

**Lecture 11: Functions, Closures & Higher-Order Array Methods**
- Project: Employee Profile Generator
- Function declarations, expressions, and arrow functions
- Closures — functions that remember their scope
- Higher-order array methods: `forEach`, `map`, `filter`, `find`, `reduce`, `sort`
- Every `for` loop you wrote today gets a more powerful one-line alternative

> Instead of a `for` loop with `push`, you'll write `inventory.map(p => p.name)` — one line instead of five. Functions are how JavaScript scales.

---

*NexusBerry Modern Frontend Course — Lecture 10*
*Instructor: Rana M. Ajmal*
