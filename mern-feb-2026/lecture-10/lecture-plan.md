# Lecture 10: Loops, Iteration Patterns & Array Fundamentals

## PRESENTER ONLY (Not shared with students)

### Overview
- **Format**: Live Google Meet session
- **Style**: Presentation-driven (reveal.js) + live coding (VS Code)
- **Project**: Inventory Management System
- **Goal**: Master every loop construct in JavaScript — `for`, `while`, `do...while`, `for...in`, `for...of` — and the foundational array operations (creation, mutation, searching, slicing) — so students can iterate over data, transform collections, and build data-driven applications from Lecture 11 onward

---

## Pre-Class Setup Checklist

- [ ] VS Code with clean dark theme (Dracula or One Dark Pro recommended)
- [ ] Font size set to 18–20px for screen-share readability
- [ ] Browser (Chrome) open with DevTools on Console tab, ready to run snippets
- [ ] Blank project folder created: `inventory-system/`
- [ ] New file open and ready: `inventory-system/inventory.js`
- [ ] Presentation loaded: `presentation/index.html` open in browser tab
- [ ] reveal.js CDN verified — advance through first 3 slides to confirm it loads
- [ ] Node.js installed and `node --version` confirms LTS (for terminal demos)
- [ ] Google Meet test run completed (audio, screen share, camera)
- [ ] Notifications silenced on all devices (phone on Do Not Disturb)
- [ ] Backup: Chrome DevTools Console ready as fallback for any VS Code issues
- [ ] Lecture-specific: Prepare a scratch file with an intentional infinite `while(true)` loop to demonstrate (with `break` ready to paste) — do NOT run until the demo moment
- [ ] Lecture-specific: TypeScript Playground open in a browser tab (typescriptlang.org/play) for Part 5 demos
- [ ] Lecture-specific: Have a JSON file with 10+ product objects ready to paste for the capstone demo

---

## Phase 0: Before Lecture (Lecture 10 — starts after Lecture 9 review)

### Portal Quiz Review (from Lecture 9)

> **Talking Points:**
> "Let's start with your Lecture 9 quiz results. Conditionals are the decision-making backbone of every program you'll ever write — so let's see how well those patterns stuck before we build on them today."

**Commonly Missed Areas to Watch For (Decision Making & Control Structures — Lecture 9):**

- **`switch` fall-through forgetting `break`**: Many students expect `switch` cases to stop automatically. Reinforce: without `break`, execution "falls through" to the next case. This is by design — but almost never what you want.
- **`||` vs `??` confusion**: The most common mistake. `0 || 42` → 42 (treats 0 as falsy). `0 ?? 42` → 0 (only triggers on null/undefined). Rule: `??` for defaults, `||` only when you want to replace ALL falsy values.
- **Ternary operator nesting**: Students who tried nested ternaries for 3+ conditions produced unreadable code. Reinforce: 2 branches → ternary, 3+ branches → `if/else`.
- **Optional chaining `?.` on known values**: Some students used `?.` everywhere — even on variables they just declared. `?.` signals uncertainty — use it intentionally, only on data that might be null/undefined.
- **Discriminated union `switch` without `default`**: TypeScript's exhaustiveness checking only works when all cases are handled. Missing a case without `default` means unhandled branches.

> **Transition:**
> "Good. If you scored 7 or above — your conditional logic is solid. If not, revisit the cheatsheet and recording before the next assignment. Today we add the second fundamental pillar: repetition. Decisions let your code *choose*. Loops let your code *repeat*. Together, they can process any amount of data — one item at a time, making decisions along the way."

---

### Assignment Feedback (Lecture 9 — University Admission Gateway)

> **Talking Points:**
> "Let me share what I noticed in the University Admission Gateway submissions. This was your first decision-heavy project, and many of you showed strong conditional thinking."

**Common Mistakes Observed:**

1. **Using only `if/else` for everything**: Several submissions ignored `switch` for department routing and used long `if/else` chains instead. When you're matching exact string values, `switch` is cleaner and more readable. Pick the right tool for the decision type.
2. **Not using `??` for optional data**: Some submissions used `||` for default values on properties like `scholarship: 0`. Remember: `0 || 100` gives `100` — the student accidentally gets a full scholarship. `0 ?? 100` gives `0` — correct.
3. **Missing the formatted report**: The assignment asked for a complete admission decision report. Some submissions only printed individual values without a final summary. Formatting output is part of the deliverable.
4. **Hardcoded values instead of calculated**: Some students hardcoded the average score instead of calculating it from the scores object. In production, data changes — your code must compute from the source.
5. **No use of logical assignment operators**: The assignment required at least one `??=` or `||=`. Several submissions skipped this. These operators are modern JavaScript — practice them now.

**Good Examples to Highlight:**

- Praise submissions that used all 7 conditional constructs appropriately (each in its right context)
- Highlight anyone who added extra decision branches (e.g., international student rules, age-based conditions)
- Celebrate use of `?.` + `??` combo for nested optional data: `app.address?.state ?? "Not provided"`
- Acknowledge students who wrote clear console output with aligned labels and sections

> **Encouragement:**
> "Conditional logic is the first step toward real programming. You made code that *thinks*. Today we make code that *repeats* — and when you combine decisions with repetition, you can process entire databases, validate thousands of records, and build real systems. Let's start."

---

## Phase 1: Today's Lecture (90 Minutes)

---

### Part 1: Why Programs Need Repetition — The `for` Loop (00:00 – 20:00)

---

#### Background / Motivation (Presentation) — 00:00–05:00

> **Talking Points:**
> "In Lecture 9, your admission gateway processed one student. One application, one decision. But a real university processes thousands of applications. How do you run the same admission logic for 5,000 students without writing 5,000 copies of the same code?"
>
> "The answer is loops. A loop repeats a block of code until a condition is met. You write the logic once, and the loop applies it to as many items as you need — 10, 1,000, or 10 million."
>
> "Today we're building an Inventory Management System. A store has hundreds of products. We need to: count total stock, find specific items, calculate values, flag low-stock products, and generate reports. Every one of these tasks requires iteration — processing items one by one."

**Slide: What Are Loops?**

> "A loop is a control structure that repeats a block of code while a condition remains true. When the condition becomes false, the loop stops and execution continues to the next line."
>
> **Analogy:** "Think of a factory assembly line. Each station performs the same task — tighten a bolt, attach a wheel, paint a panel — on every car that comes through. The station doesn't change. The cars keep coming. That's a loop: same code, different data, repeated until done."

**Slide: JavaScript's Loop Types**

| Loop | Use Case |
|------|----------|
| `for` | Known number of iterations (counting) |
| `while` | Unknown iterations, condition-first |
| `do...while` | Unknown iterations, body-first (runs at least once) |
| `for...in` | Iterate over object keys |
| `for...of` | Iterate over array/string values |

> "We'll cover all five today. Plus `break` and `continue` for controlling flow inside loops, and nested loops for processing multi-dimensional data. By the end, you'll know which loop to reach for in any situation."

---

#### Illustrations / Animations (Presentation) — 05:00–07:00

**Slide: Anatomy of a `for` Loop**

> Show visual breakdown:
> ```
>     for (let i = 0;  i < 5;  i++)
>          ─────────   ─────   ───
>          initialize   test    update
>              │          │       │
>              ▼          ▼       ▼
>         runs once   checked   runs after
>         at start    before    each iteration
>                     each run
> ```
>
> "Three parts, semicolon-separated. Initialization runs once. The condition is checked before every iteration — if false, the loop stops. The update runs after each iteration. Miss any part and your loop either never starts, never stops, or never progresses."

**Slide: Loop Execution Flow**

> ```
>    ┌──→ [Check condition] ──false──→ EXIT loop
>    │          │
>    │        true
>    │          ▼
>    │    [Run loop body]
>    │          │
>    └───[Run update]
> ```
>
> "Notice: the condition is checked BEFORE the body runs. If the condition is false from the start, the body never executes. This is important — a `for` loop with `i < 0` as the condition runs zero times."

---

#### "Let's see in Code now" (VS Code) — 07:00–15:00

> "Open VS Code. Create a new file: `inventory.js`. We're building the Inventory Management System — starting with the most fundamental loop."

```javascript
// ============================================
// Lecture 10 — Part 1: The for Loop
// Inventory Management System
// NexusBerry Modern Frontend Course
// ============================================

// --- Basic for loop — counting ---
console.log("📦 Counting warehouse shelves:");
for (let shelf = 1; shelf <= 5; shelf++) {
    console.log(`  Shelf ${shelf}: Checked ✅`);
}
// Output: Shelf 1 through Shelf 5

// --- Why a loop? Without one: ---
// console.log("Shelf 1: Checked");
// console.log("Shelf 2: Checked");
// console.log("Shelf 3: Checked");
// console.log("Shelf 4: Checked");
// console.log("Shelf 5: Checked");
// What if you had 500 shelves? 5,000? This doesn't scale.

// --- Counting down ---
console.log("\n⏳ Countdown to store opening:");
for (let seconds = 5; seconds >= 1; seconds--) {
    console.log(`  ${seconds}...`);
}
console.log("  🏪 Store is OPEN!");

// --- Stepping by intervals ---
console.log("\n📊 Stock check every 10th item:");
for (let itemId = 0; itemId <= 50; itemId += 10) {
    console.log(`  Item #${itemId}: Spot-checked`);
}
// 0, 10, 20, 30, 40, 50

// --- Accumulating a total ---
// Calculate total value of 5 products priced incrementally
let totalValue = 0;
for (let i = 1; i <= 5; i++) {
    const price = i * 100;  // Rs. 100, 200, 300, 400, 500
    totalValue += price;
    console.log(`Product ${i}: Rs. ${price} | Running total: Rs. ${totalValue}`);
}
console.log(`\n💰 Total inventory value: Rs. ${totalValue}`);
// 100 + 200 + 300 + 400 + 500 = 1500

// --- Loop with conditional logic (L9 meets L10) ---
console.log("\n🔍 Stock level check:");
for (let i = 1; i <= 8; i++) {
    const stock = Math.floor(Math.random() * 50);  // Random stock 0-49

    if (stock === 0) {
        console.log(`  Product ${i}: ❌ OUT OF STOCK`);
    } else if (stock < 10) {
        console.log(`  Product ${i}: ⚠️ LOW STOCK (${stock} units)`);
    } else {
        console.log(`  Product ${i}: ✅ In stock (${stock} units)`);
    }
}
// Each iteration makes a DECISION — loops + conditionals together
```

> **Narration while typing:**
> "Watch how the loop variable `i` or `shelf` or `itemId` changes on every iteration. The loop body is the same code — but the data it operates on is different each time. That's the power: write once, process many."
>
> "Notice how naturally loops and conditionals combine. The `for` loop iterates through products, and the `if/else` inside makes a decision about each one. This is how real inventory systems work — scan every item, classify each one."

---

#### Interactive Questions (Presentation/Verbal) — 15:00–18:00

**Question 1 — Predict Output:**

> "What does this loop print?"

```javascript
for (let i = 3; i >= 0; i--) {
    console.log(i);
}
```

> **Answer:** `3`, `2`, `1`, `0` — starts at 3, decrements, stops when `i` becomes -1 (condition `i >= 0` is false). It prints 0 because the condition is checked BEFORE the body runs, and 0 >= 0 is true.
> **Teaching moment:** "Students often think it stops at 1. Remember: the condition is checked before the body. `0 >= 0` is true, so 0 gets printed. Then `i--` makes it -1, and `-1 >= 0` is false — NOW the loop stops."

**Question 2 — Spot the Error:**

> "This loop is supposed to print 1 through 5. What's wrong?"

```javascript
for (let i = 1; i <= 5; i--) {
    console.log(i);
}
```

> **Answer:** The update is `i--` instead of `i++`. The loop starts at 1, decrements to 0, -1, -2... The condition `i <= 5` is always true for negative numbers. This is an **infinite loop** — it never stops.
> **Teaching moment:** "An off-by-one error in the update is the #1 cause of infinite loops with `for`. Always verify: does your update move the variable TOWARD the condition becoming false?"

---

#### Live Debugging (VS Code) — 18:00–19:00

> "Here's a mistake I've seen in production inventory code."

```javascript
// Bug: Off-by-one error in loop bounds
const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];

// WRONG: using <= with length
for (let i = 0; i <= products.length; i++) {
    console.log(`Product: ${products[i]}`);
}
// Output includes: "Product: undefined" on the last iteration
// products.length is 5, but indices are 0-4
// products[5] is undefined — accessing beyond the array

// FIX: Use < (strictly less than) with length
for (let i = 0; i < products.length; i++) {
    console.log(`Product: ${products[i]}`);
}
// Correct: prints all 5 products, no undefined
```

> "This is called an 'off-by-one' error — the most common bug in all of programming. Arrays are zero-indexed: 5 items means indices 0 through 4. `products.length` is 5, not 4. Using `<=` instead of `<` accesses index 5, which doesn't exist. The rule: always use `< array.length`, never `<=`."

---

#### Part Closing (Presentation) — 19:00–20:00

**Common Mistakes:**
- Using `<=` instead of `<` with array length — produces `undefined` on the last iteration
- Wrong update direction (`i--` instead of `i++`) — creates infinite loops
- Declaring loop variable with `var` instead of `let` — `var` leaks to outer scope
- Forgetting that the condition is checked BEFORE the body — a `for` loop can run zero times

**Optimization Tips:**
- Cache `array.length` in a variable if the array doesn't change during iteration (modern engines optimize this, but it communicates intent)
- Start from 0 (not 1) when working with arrays — match the zero-based indexing
- Use `i++` (post-increment) as convention — `++i` works identically in `for` loops but `i++` is standard

**Best Practices:**
- Name loop variables meaningfully for nested loops: `row`, `col` instead of `i`, `j`
- Keep loop bodies short — if the body exceeds 15 lines, extract a function (we'll learn this in Lecture 11)
- Prefer `const` inside loop bodies — the loop variable is `let`, but values derived inside should be `const`

**Professional Insights:**
> "In 25 years of code reviews, the `for` loop is where I catch the most bugs from junior developers. Not because loops are hard — but because off-by-one errors are subtle. Your loop runs 99 times correctly and fails on the 100th. The fix is always the same: verify your start, condition, and update before you write the body. Measure twice, loop once."

---

### Part 2: `while`, `do...while` & Loop Control Flow (20:00 – 38:00)

---

#### Background / Motivation (Presentation) — 20:00–23:00

> **Talking Points:**
> "The `for` loop is perfect when you know how many times to iterate — 5 shelves, 10 products, `array.length` items. But what about situations where you don't know in advance?"
>
> "A customer search: you scan products until you find a match — could be the first item or the 500th. An input validator: you keep asking until the user provides valid data. A stock monitor: you keep checking until levels drop below a threshold. For these, we use `while` and `do...while`."

**Slide: `while` vs `do...while`**

| Feature | `while` | `do...while` |
|---------|---------|--------------|
| Condition check | Before body | After body |
| Minimum runs | 0 (may never run) | 1 (always runs once) |
| Use case | "Check first, then act" | "Act first, then check" |

> **Analogy:** "`while` is like checking the weather before going outside — if it's raining, you stay in. `do...while` is like going outside first and THEN checking — you always go out at least once, and then decide if you should stay out."

**Slide: Infinite Loops — The Danger Zone**

> "A loop that never stops is called an infinite loop. It freezes your program, crashes your browser tab, and in production, it can take down a server. Every `while` loop must have a condition that eventually becomes false. Every iteration must make progress toward that condition."

---

#### Illustrations / Animations (Presentation) — 23:00–24:00

**Slide: `while` vs `do...while` Flow**

> ```
> WHILE:                        DO...WHILE:
>
> ┌──→ [condition?]─false→ EXIT    ┌──→ [body]
> │        │                       │       │
> │      true                      │    [condition?]─false→ EXIT
> │        ▼                       │       │
> │     [body]                     │     true
> └────────┘                       └───────┘
> ```
>
> "The key difference: `while` checks first, `do...while` acts first. For input validation — where you must get at least one attempt from the user — `do...while` is the natural choice."

---

#### "Let's see in Code now" (VS Code) — 24:00–33:00

```javascript
// ============================================
// Lecture 10 — Part 2: while, do...while & Loop Control
// Inventory Management System
// NexusBerry Modern Frontend Course
// ============================================

// --- while loop — search until found ---
const warehouse = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam", "Headset", "USB Hub"];

let searchIndex = 0;
const target = "Monitor";

while (searchIndex < warehouse.length) {
    if (warehouse[searchIndex] === target) {
        console.log(`🔍 Found "${target}" at position ${searchIndex}`);
        break;  // Stop searching — we found it
    }
    searchIndex++;
}

if (searchIndex === warehouse.length) {
    console.log(`❌ "${target}" not found in warehouse`);
}

// --- while loop — stock depletion simulation ---
let stock = 25;
let day = 1;
console.log("\n📉 Stock depletion simulation:");

while (stock > 0) {
    const sold = Math.floor(Math.random() * 8) + 1;  // 1-8 units sold per day
    stock = Math.max(0, stock - sold);  // Don't go below 0
    console.log(`  Day ${day}: Sold ${sold} → ${stock} remaining`);
    day++;
}
console.log(`⚠️ Stock depleted after ${day - 1} days — reorder needed!`);

// --- do...while — input validation pattern ---
// Simulating user input validation (in real apps, this would use prompt or form input)
const simulatedInputs = ["", "abc", "-5", "42"];  // Simulated attempts
let inputIndex = 0;
let validQuantity;

do {
    const input = simulatedInputs[inputIndex];
    const parsed = Number(input);

    if (input !== "" && !isNaN(parsed) && parsed > 0) {
        validQuantity = parsed;
        console.log(`✅ Valid quantity accepted: ${validQuantity}`);
    } else {
        console.log(`❌ Invalid input "${input}" — must be a positive number`);
    }
    inputIndex++;
} while (validQuantity === undefined && inputIndex < simulatedInputs.length);

if (validQuantity === undefined) {
    console.log("⚠️ No valid input received after all attempts");
}

// --- break — exit early ---
console.log("\n🔍 Finding first out-of-stock product:");
const stockLevels = [15, 8, 22, 0, 12, 3, 0, 9];

for (let i = 0; i < stockLevels.length; i++) {
    if (stockLevels[i] === 0) {
        console.log(`  ❌ Product at index ${i} is OUT OF STOCK`);
        break;  // Found one — stop searching
    }
    console.log(`  ✅ Product at index ${i}: ${stockLevels[i]} in stock`);
}
// Stops at index 3 — doesn't check indices 4-7

// --- continue — skip current iteration ---
console.log("\n📋 Active products only (skipping out-of-stock):");
const inventory = [
    { name: "Laptop", stock: 12 },
    { name: "Mouse", stock: 0 },
    { name: "Keyboard", stock: 25 },
    { name: "Monitor", stock: 0 },
    { name: "Webcam", stock: 7 }
];

for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].stock === 0) {
        continue;  // Skip this product — move to next iteration
    }
    console.log(`  📦 ${inventory[i].name}: ${inventory[i].stock} units`);
}
// Prints Laptop, Keyboard, Webcam — skips Mouse and Monitor

// --- Nested loops — generating a grid/table ---
console.log("\n📊 Warehouse Grid (3 rows × 4 columns):");
for (let row = 1; row <= 3; row++) {
    let rowDisplay = `  Row ${row}: `;
    for (let col = 1; col <= 4; col++) {
        const slotId = `${row}-${col}`;
        rowDisplay += `[${slotId}] `;
    }
    console.log(rowDisplay);
}
// Row 1: [1-1] [1-2] [1-3] [1-4]
// Row 2: [2-1] [2-2] [2-3] [2-4]
// Row 3: [3-1] [3-2] [3-3] [3-4]

// --- Nested loop — comparing items across two lists ---
console.log("\n🔄 Cross-checking warehouse vs order:");
const warehouseItems = ["Laptop", "Mouse", "Keyboard", "Monitor"];
const orderItems = ["Mouse", "Tablet", "Keyboard"];

for (let o = 0; o < orderItems.length; o++) {
    let found = false;
    for (let w = 0; w < warehouseItems.length; w++) {
        if (orderItems[o] === warehouseItems[w]) {
            found = true;
            break;  // No need to check remaining warehouse items
        }
    }
    if (found) {
        console.log(`  ✅ "${orderItems[o]}" — Available`);
    } else {
        console.log(`  ❌ "${orderItems[o]}" — Not in warehouse`);
    }
}
```

> **Narration while typing:**
> "Notice when `while` is the right choice: the stock depletion simulation doesn't know how many days it will take — it depends on random sales. The `do...while` for input validation always runs at least once because you need at least one attempt before you can validate."
>
> "`break` and `continue` are your precision tools. `break` says 'I'm done, exit the loop entirely.' `continue` says 'skip this one item, but keep going.' In the inventory filter, `continue` skips out-of-stock products without stopping the loop."
>
> "Nested loops multiply iterations. 3 rows × 4 columns = 12 total iterations. Be careful: nested loops inside large datasets can become slow — 1,000 × 1,000 = 1 million iterations. We'll learn more efficient patterns in Lecture 11 with higher-order array methods."

---

#### Interactive Questions (Presentation/Verbal) — 33:00–36:00

**Question 1 — Predict Output:**

> "What does this code print?"

```javascript
let count = 10;
while (count > 0) {
    count -= 3;
}
console.log(count);
```

> **Answer:** `-2`. The loop runs: 10→7→4→1→-2. When `count` becomes -2, the condition `count > 0` is false, so the loop stops. It does NOT stop at 1 — the check happens after subtracting.
> **Teaching moment:** "Loops don't stop the moment the variable crosses the threshold. They finish the current iteration, THEN check the condition. -2, not 0 or 1."

**Question 2 — Concept Challenge:**

> "When would you use `do...while` instead of `while`? Give a real-world example."

> **Answer:** When the action must happen at least once before checking the condition. Examples: showing a menu (display options at least once before asking if user wants to continue), input validation (get input at least once before validating), game loop (render at least one frame before checking if game is over).
> **Teaching moment:** "If the body must run at least once, `do...while`. If the body might not run at all, `while`. In practice, `do...while` appears in about 5% of loops — but when you need it, nothing else fits."

**Question 3 — Quick-Fire Recall:**

> "What's the difference between `break` and `continue`?"

> **Answer:** `break` exits the loop entirely — no more iterations. `continue` skips the rest of the current iteration and moves to the next one. `break` = stop the whole loop. `continue` = skip this one.

---

#### Live Debugging (VS Code) — 36:00–37:00

> "Here's an infinite loop that looks correct at first glance."

```javascript
// Bug: Infinite loop — forgotten update
let i = 0;
while (i < 5) {
    console.log(`Processing item ${i}`);
    // i++ is missing! i stays 0 forever
}

// Fix: Always ensure the condition variable changes
let j = 0;
while (j < 5) {
    console.log(`Processing item ${j}`);
    j++;  // This is critical — without it, the loop never ends
}
```

> "This is the #1 `while` loop bug. In a `for` loop, the update is right there in the header — hard to forget. In a `while` loop, the update is inside the body — easy to forget. Every `while` loop you write: ask yourself, 'What changes on each iteration to eventually make the condition false?'"

---

#### Part Closing (Presentation) — 37:00–38:00

**Common Mistakes:**
- Forgetting the update in `while` loops — infinite loop guaranteed
- Using `break` where restructuring the condition would be cleaner
- Nested loops with same variable name (`i` inside both) — shadowing bugs
- `do...while` missing the semicolon after the closing parenthesis: `} while (condition);`

**Optimization Tips:**
- Use `break` with labeled loops to exit specific outer loops in nested scenarios
- `while (true)` with an internal `break` is a valid pattern for complex exit conditions — don't fear it
- In cross-checking loops (like our warehouse example), `break` on match saves unnecessary comparisons

**Best Practices:**
- Default to `for` when you know the iteration count — it's the clearest signal to readers
- Use `while` for event-driven or unknown-length iteration
- Use `do...while` only when the body must execute at least once
- Name nested loop variables descriptively: `row`/`col`, not `i`/`j`

**Professional Insights:**
> "In production code, I rarely write raw `while` loops anymore — most iteration is over known collections using `for` or `for...of`. But `while` appears in: polling systems (check every N seconds until a response arrives), parsers (read tokens until end-of-file), and retry logic (attempt until success or max retries). Know all your loop tools — the right one depends on the problem."

---

### Part 3: Arrays — JavaScript's Ordered Collections (38:00 – 56:00)

---

#### Background / Motivation (Presentation) — 38:00–41:00

> **Talking Points:**
> "So far, every variable we've created holds one value. One name, one score, one price. But an inventory system has hundreds of products. A university has thousands of students. A website has millions of users."
>
> "Arrays are JavaScript's answer to 'I need to store multiple values in order.' An array is an ordered list of values, accessed by position (index). Think of it as a numbered shelf in a warehouse — position 0, position 1, position 2, and so on."
>
> "Arrays unlock the real power of loops. A `for` loop that counts from 0 to 10 is useful. A `for` loop that processes every product in a 500-item inventory — that's production code."

**Slide: What Is an Array?**

> "An array is an ordered collection of values. Each value has a numeric index starting at 0. Arrays can hold any data type — numbers, strings, objects, even other arrays."

| Feature | Value |
|---------|-------|
| Ordered | Yes — position matters |
| Zero-indexed | First item is `[0]`, not `[1]` |
| Dynamic size | Grows and shrinks automatically |
| Mixed types | Can hold different types (but shouldn't) |
| Reference type | Passed by reference, not copied |

> **Analogy:** "An array is a numbered filing cabinet. Drawer 0, drawer 1, drawer 2. You can add drawers at the end, remove drawers from the front, or insert drawers in the middle. The number (index) tells you exactly where to find each item."

**Slide: Two Categories of Array Methods**

| Category | Methods | What Happens |
|----------|---------|--------------|
| **Mutating** | `push`, `pop`, `shift`, `unshift`, `splice` | Changes the original array |
| **Non-mutating** | `concat`, `slice`, `indexOf`, `includes` | Returns new value, original unchanged |

> "This distinction matters. Mutating methods change your data in place. Non-mutating methods are safe — they return new values without touching the original. In React (Module 3), you'll almost exclusively use non-mutating methods because React depends on detecting when data changes."

---

#### Illustrations / Animations (Presentation) — 41:00–42:00

**Slide: Array Visual — Index Mapping**

> ```
> Index:     0          1          2          3          4
>         ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
>         │Laptop│  │Mouse │  │ Key- │  │Moni- │  │Webcam│
>         │      │  │      │  │board │  │tor   │  │      │
>         └──────┘  └──────┘  └──────┘  └──────┘  └──────┘
>
> products.length = 5
> products[0] = "Laptop"     (first)
> products[4] = "Webcam"     (last)
> products[5] = undefined    (out of bounds — NOT an error!)
> ```

**Slide: Mutating Methods Visual**

> ```
> push("Tablet")     → adds to END      [L, M, K, Mo, W, T]
> pop()              → removes from END  [L, M, K, Mo, W]
> unshift("Router")  → adds to START     [R, L, M, K, Mo, W]
> shift()            → removes from START [L, M, K, Mo, W]
> splice(2, 1)       → removes at INDEX  [L, M, Mo, W]
> ```

---

#### "Let's see in Code now" (VS Code) — 42:00–52:00

```javascript
// ============================================
// Lecture 10 — Part 3: Arrays — Ordered Collections
// Inventory Management System
// NexusBerry Modern Frontend Course
// ============================================

// --- Creating arrays ---
const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];
console.log("📦 Products:", products);
console.log("📏 Total items:", products.length);  // 5

// --- Accessing elements (zero-indexed) ---
console.log("\n🔢 Array indexing:");
console.log("  First item:", products[0]);           // "Laptop"
console.log("  Third item:", products[2]);           // "Keyboard"
console.log("  Last item:", products[products.length - 1]);  // "Webcam"
console.log("  Out of bounds:", products[99]);       // undefined (no error!)

// --- Mutating methods: push / pop (END of array) ---
console.log("\n--- push / pop (work at the END) ---");
products.push("Headset");
console.log("After push('Headset'):", products);
// ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam", "Headset"]

const removed = products.pop();
console.log(`After pop(): removed "${removed}"`, products);
// ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"]

// --- Mutating methods: unshift / shift (START of array) ---
console.log("\n--- unshift / shift (work at the START) ---");
products.unshift("Router");
console.log("After unshift('Router'):", products);
// ["Router", "Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"]

const first = products.shift();
console.log(`After shift(): removed "${first}"`, products);
// ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"]

// --- splice — the Swiss Army knife (INSERT, REMOVE, REPLACE at any position) ---
console.log("\n--- splice (any position) ---");

// Remove 1 item at index 2
const spliced = products.splice(2, 1);
console.log(`Removed "${spliced}" at index 2:`, products);
// ["Laptop", "Mouse", "Monitor", "Webcam"]

// Insert "Tablet" at index 2 (remove 0 items, add 1)
products.splice(2, 0, "Tablet");
console.log("Inserted 'Tablet' at index 2:", products);
// ["Laptop", "Mouse", "Tablet", "Monitor", "Webcam"]

// Replace item at index 1
products.splice(1, 1, "Wireless Mouse");
console.log("Replaced index 1:", products);
// ["Laptop", "Wireless Mouse", "Tablet", "Monitor", "Webcam"]

// --- Non-mutating methods: concat, slice ---
console.log("\n--- Non-mutating: concat & slice ---");
const accessories = ["USB Cable", "Mouse Pad"];
const fullCatalog = products.concat(accessories);
console.log("concat result:", fullCatalog);
console.log("Original unchanged:", products);  // Still 5 items

// slice — extract a portion (start inclusive, end exclusive)
const topThree = products.slice(0, 3);
console.log("slice(0, 3):", topThree);
// ["Laptop", "Wireless Mouse", "Tablet"]

const lastTwo = products.slice(-2);
console.log("slice(-2):", lastTwo);
// ["Monitor", "Webcam"]

// --- Searching: indexOf, includes ---
console.log("\n--- Searching arrays ---");
console.log("indexOf('Monitor'):", products.indexOf("Monitor"));   // 3
console.log("indexOf('Phone'):", products.indexOf("Phone"));       // -1 (not found)
console.log("includes('Laptop'):", products.includes("Laptop"));   // true
console.log("includes('Phone'):", products.includes("Phone"));     // false

// --- Iterating arrays with for loop ---
console.log("\n📋 Full inventory list:");
for (let i = 0; i < products.length; i++) {
    console.log(`  ${i + 1}. ${products[i]}`);
}

// --- Building new arrays from loops ---
const prices = [999, 29, 499, 349, 79];
const discountedPrices = [];

for (let i = 0; i < prices.length; i++) {
    const discounted = prices[i] * 0.9;  // 10% off
    discountedPrices.push(discounted);
}
console.log("\n💰 Original prices:", prices);
console.log("🏷️  After 10% discount:", discountedPrices);

// --- Array destructuring preview (teaser for Lecture 12) ---
console.log("\n--- Array Destructuring Preview ---");
const topProducts = ["Laptop", "Monitor", "Tablet", "Mouse", "Webcam"];

// Traditional way:
const firstProduct = topProducts[0];
const secondProduct = topProducts[1];

// Destructuring way (Lecture 12 deep dive):
const [best, runnerUp, ...rest] = topProducts;
console.log("Best seller:", best);           // "Laptop"
console.log("Runner up:", runnerUp);         // "Monitor"
console.log("Everything else:", rest);       // ["Tablet", "Mouse", "Webcam"]
// The ... is called the "rest" operator — collects remaining items
// We'll master this in Lecture 12
```

> **Narration while typing:**
> "Two things to burn into memory. First: `push` and `pop` work at the END. `unshift` and `shift` work at the START. `splice` works ANYWHERE. Second: `concat` and `slice` are non-mutating — they return new arrays without changing the original. This matters enormously in React."
>
> "The destructuring preview at the end — `const [best, runnerUp, ...rest] = topProducts` — is a taste of Lecture 12. For now, just recognize the syntax. It extracts values from arrays by position, and the `...rest` collects whatever is left. Clean, powerful, and everywhere in modern JavaScript."

---

#### Interactive Questions (Presentation/Verbal) — 52:00–54:30

**Question 1 — Predict Output:**

> "What does this code produce?"

```javascript
const items = ["A", "B", "C", "D"];
items.splice(1, 2);
console.log(items);
```

> **Answer:** `["A", "D"]` — `splice(1, 2)` starts at index 1 and removes 2 elements ("B" and "C"). "A" at index 0 and "D" at index 3 remain.
> **Teaching moment:** "`splice` is the most powerful but also most confusing array method. First argument is the start index. Second is how many to remove. Any additional arguments are inserted at that position."

**Question 2 — Concept Challenge:**

> "Why does `products[products.length]` return `undefined` instead of throwing an error?"

> **Answer:** JavaScript arrays don't throw errors for out-of-bounds access — they return `undefined`. This is by design (dynamic nature of JS), but it can hide bugs silently. If your loop uses `<=` instead of `<`, you won't get an error — you'll get `undefined` mixed into your results.
> **Teaching moment:** "This is why TypeScript's `noUncheckedIndexedAccess` option exists — it forces you to handle `undefined` from array access. Silent failures are worse than loud errors."

---

#### Live Debugging (VS Code) — 54:30–55:30

> "A common trap with array methods."

```javascript
// Bug: Confusing mutating vs non-mutating methods
const original = [10, 20, 30];

// concat does NOT modify original
original.concat([40, 50]);
console.log(original);  // [10, 20, 30] — WHERE DID 40, 50 GO?

// Fix: concat returns a NEW array — you must capture it
const extended = original.concat([40, 50]);
console.log(extended);  // [10, 20, 30, 40, 50]

// push DOES modify original
original.push(40, 50);
console.log(original);  // [10, 20, 30, 40, 50] — modified in place
```

> "This confusion costs hours of debugging. `concat` returns a new array — if you don't assign the result, the work is lost. `push` modifies in place — the return value is just the new length. Know which methods mutate and which don't."

---

#### Part Closing (Presentation) — 55:30–56:00

**Common Mistakes:**
- Confusing `splice` (mutates) with `slice` (non-mutating) — one letter difference, completely different behavior
- Forgetting to capture the return value of `concat` — it doesn't modify the original
- Using `indexOf` and checking `=== 0` for "not found" — `indexOf` returns `-1` for not found, and `0` means "found at first position"
- Accessing `array[array.length]` — always `undefined`, use `array[array.length - 1]` for the last item

**Optimization Tips:**
- `push`/`pop` (end operations) are O(1) — fast. `unshift`/`shift` (start operations) are O(n) — every element must shift. For performance-critical code, prefer end operations.
- Use `includes` for existence checks (returns boolean). Use `indexOf` only when you need the position.
- Spread `[...array]` creates a shallow copy — same as `array.slice()` but more readable

**Best Practices:**
- Prefer `const` for arrays — `const` prevents reassignment, not mutation. You can `push` to a `const` array.
- Use non-mutating methods when building new data. Use mutating methods only when modifying in place is intentional.
- In Lecture 12, we'll learn immutable patterns with spread. For now, be aware of which methods change your data.

**Professional Insights:**
> "The mutating vs non-mutating distinction seems academic now, but it becomes critical in React. React re-renders when it detects state changes. If you mutate an array in place, React can't detect the change — your UI won't update. This is the #1 source of React bugs for developers who learned JavaScript without understanding array mutation. We're building that awareness now so it's second nature when we reach Module 3."

---

### Part 4: Building the Inventory Management System (56:00 – 78:00)

---

#### Background / Motivation (Presentation) — 56:00–58:00

> **Talking Points:**
> "We've learned every loop type and the core array operations. Now we combine them into a real application — just like we combined all conditional constructs into the Admission Gateway in Lecture 9."
>
> "The Inventory Management System processes a collection of products through multiple operations: listing all items, calculating totals, searching by name, filtering by stock level, and generating a formatted report. Every loop and array method we've covered has a role."

**Slide: System Feature Map**

> ```
> Inventory Management System
>     │
>     ├── Display all products (for loop + array indexing)
>     ├── Calculate total value (for loop + accumulator)
>     ├── Search by name (while + break)
>     ├── Filter low-stock items (for + continue)
>     ├── Category summary (nested loops + for...in)
>     └── Generate formatted report (everything combined)
> ```

---

#### Illustrations / Animations (Presentation) — 58:00–59:00

**Slide: The Product Data Structure**

> Show the data students will work with:

```javascript
const inventory = [
    { id: 1, name: "Laptop", category: "Electronics", price: 89999, stock: 15 },
    { id: 2, name: "Mouse", category: "Electronics", price: 1999, stock: 150 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 24999, stock: 8 },
    { id: 4, name: "Notebook", category: "Stationery", price: 299, stock: 500 },
    { id: 5, name: "Monitor", category: "Electronics", price: 34999, stock: 0 },
    { id: 6, name: "Bookshelf", category: "Furniture", price: 15999, stock: 3 },
    { id: 7, name: "Pen Set", category: "Stationery", price: 599, stock: 200 },
    { id: 8, name: "Webcam", category: "Electronics", price: 4999, stock: 45 }
];
```

> "Eight products, three categories, varying stock levels (including zero). This data gives us enough complexity to demonstrate every loop pattern."

---

#### "Let's see in Code now" (VS Code) — 59:00–73:00

```javascript
// ============================================
// Lecture 10 — Part 4: Inventory Management System
// Complete Application — All Loops & Arrays Combined
// NexusBerry Modern Frontend Course
// ============================================

// --- Product Database ---
const inventory = [
    { id: 1, name: "Laptop", category: "Electronics", price: 89999, stock: 15 },
    { id: 2, name: "Mouse", category: "Electronics", price: 1999, stock: 150 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 24999, stock: 8 },
    { id: 4, name: "Notebook", category: "Stationery", price: 299, stock: 500 },
    { id: 5, name: "Monitor", category: "Electronics", price: 34999, stock: 0 },
    { id: 6, name: "Bookshelf", category: "Furniture", price: 15999, stock: 3 },
    { id: 7, name: "Pen Set", category: "Stationery", price: 599, stock: 200 },
    { id: 8, name: "Webcam", category: "Electronics", price: 4999, stock: 45 }
];

// ============================================
// Feature 1: Display All Products (for loop)
// ============================================
console.log("========================================");
console.log("   📦 INVENTORY MANAGEMENT SYSTEM");
console.log("   NexusBerry Store");
console.log("========================================\n");

console.log("📋 Complete Product Listing:");
console.log("─".repeat(60));

for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];
    const status = product.stock === 0 ? "❌ OUT OF STOCK"
        : product.stock < 10 ? "⚠️ LOW STOCK"
        : "✅ In Stock";

    console.log(
        `  ${product.id}. ${product.name.padEnd(15)} | ` +
        `${product.category.padEnd(12)} | ` +
        `Rs. ${product.price.toLocaleString().padStart(8)} | ` +
        `Stock: ${String(product.stock).padStart(3)} | ${status}`
    );
}
console.log("─".repeat(60));

// ============================================
// Feature 2: Calculate Total Inventory Value (for loop + accumulator)
// ============================================
let totalValue = 0;
let totalItems = 0;

for (let i = 0; i < inventory.length; i++) {
    const itemValue = inventory[i].price * inventory[i].stock;
    totalValue += itemValue;
    totalItems += inventory[i].stock;
}
console.log(`\n💰 Total Inventory Value: Rs. ${totalValue.toLocaleString()}`);
console.log(`📊 Total Items in Stock: ${totalItems}`);

// ============================================
// Feature 3: Search by Name (while + break)
// ============================================
const searchTerm = "desk";  // Case-insensitive search
let searchIdx = 0;
let foundProduct = null;

while (searchIdx < inventory.length) {
    if (inventory[searchIdx].name.toLowerCase().includes(searchTerm.toLowerCase())) {
        foundProduct = inventory[searchIdx];
        break;
    }
    searchIdx++;
}

console.log(`\n🔍 Search for "${searchTerm}":`);
if (foundProduct) {
    console.log(`  Found: ${foundProduct.name} — Rs. ${foundProduct.price.toLocaleString()} (${foundProduct.stock} in stock)`);
} else {
    console.log(`  No product matching "${searchTerm}"`);
}

// ============================================
// Feature 4: Filter Low-Stock Items (for + continue)
// ============================================
const LOW_STOCK_THRESHOLD = 10;
const lowStockItems = [];

console.log(`\n⚠️ Low Stock Alert (below ${LOW_STOCK_THRESHOLD} units):`);
for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].stock >= LOW_STOCK_THRESHOLD) {
        continue;  // Skip items with sufficient stock
    }
    lowStockItems.push(inventory[i]);
    console.log(
        `  🔴 ${inventory[i].name}: ${inventory[i].stock} units remaining — REORDER NEEDED`
    );
}
console.log(`  Total items needing reorder: ${lowStockItems.length}`);

// ============================================
// Feature 5: Category Summary (for loop + object accumulation)
// ============================================
console.log("\n📊 Category Summary:");

// Build category totals using a loop
const categories = {};

for (let i = 0; i < inventory.length; i++) {
    const cat = inventory[i].category;

    if (categories[cat] === undefined) {
        categories[cat] = { count: 0, totalStock: 0, totalValue: 0 };
    }

    categories[cat].count++;
    categories[cat].totalStock += inventory[i].stock;
    categories[cat].totalValue += inventory[i].price * inventory[i].stock;
}

// Display using for...in (iterates object keys)
for (const category in categories) {
    const data = categories[category];
    console.log(
        `  📁 ${category.padEnd(12)} | ` +
        `${data.count} products | ` +
        `${String(data.totalStock).padStart(4)} units | ` +
        `Rs. ${data.totalValue.toLocaleString()}`
    );
}

// ============================================
// Feature 6: Stock Update Simulation (do...while)
// ============================================
console.log("\n🔄 Processing incoming shipment...");
const shipment = [
    { name: "Monitor", quantity: 20 },
    { name: "Bookshelf", quantity: 10 },
    { name: "Tablet", quantity: 15 }     // Not in inventory — new product
];

let shipmentIdx = 0;
do {
    const item = shipment[shipmentIdx];
    let updated = false;

    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].name === item.name) {
            inventory[i].stock += item.quantity;
            console.log(`  ✅ ${item.name}: +${item.quantity} units → Now ${inventory[i].stock} in stock`);
            updated = true;
            break;
        }
    }

    if (!updated) {
        console.log(`  ⚠️ "${item.name}" not in inventory — needs to be added as new product`);
    }

    shipmentIdx++;
} while (shipmentIdx < shipment.length);

// ============================================
// Feature 7: Final Report (for...of for clean iteration)
// ============================================
console.log("\n========================================");
console.log("   📊 FINAL INVENTORY REPORT");
console.log("========================================");

let reportTotal = 0;
let inStockCount = 0;
let outOfStockCount = 0;

for (const product of inventory) {
    const value = product.price * product.stock;
    reportTotal += value;

    if (product.stock > 0) {
        inStockCount++;
    } else {
        outOfStockCount++;
    }
}

console.log(`  Total Products:     ${inventory.length}`);
console.log(`  In Stock:           ${inStockCount}`);
console.log(`  Out of Stock:       ${outOfStockCount}`);
console.log(`  Items Needing Reorder: ${lowStockItems.length}`);
console.log(`  Total Inventory Value: Rs. ${reportTotal.toLocaleString()}`);
console.log("========================================\n");
```

> **Narration while typing:**
> "Look at how each loop type fits its feature naturally. The `for` loop with index handles the product listing — we need the index for numbering. The accumulator pattern (`totalValue += ...`) calculates the total — a pattern you'll use hundreds of times in your career."
>
> "The `while` loop for search is natural — we don't know when we'll find the product, and we stop early with `break` when we do. The `continue` in the filter skips products with sufficient stock — cleaner than wrapping the entire body in an `if`."
>
> "`for...in` iterates object keys — perfect for our category summary object. `for...of` iterates array values — perfect for the final report where we don't need the index, just the products. Each loop type earns its place."

---

#### Interactive Questions (Presentation/Verbal) — 73:00–76:00

**Question 1 — Concept Challenge:**

> "In Feature 5 (Category Summary), why did we check `categories[cat] === undefined` before adding to it? What would happen without that check?"

> **Answer:** Without the check, the first time we encounter a category, `categories[cat].count` would be `undefined.count` — a TypeError crash. We must initialize the category object first (`{ count: 0, totalStock: 0, totalValue: 0 }`) before incrementing its properties.
> **Teaching moment:** "This is the 'initialize before accumulate' pattern. Every time you build an object dynamically in a loop, you must handle the first occurrence. In Lecture 12, we'll learn `??=` and destructuring patterns that make this cleaner."

**Question 2 — Predict Output:**

> "After the shipment processing in Feature 6, what is the stock level of 'Monitor'?"

> **Answer:** `20`. The Monitor started with `stock: 0` (out of stock) and received a shipment of `+20` units. `0 + 20 = 20`. The `do...while` loop found "Monitor" in inventory and updated it in place.
> **Teaching moment:** "This is array mutation in action — we changed the original `inventory` array's object. The Monitor went from out-of-stock to fully stocked. In React, we'd create a new array instead of mutating — but in plain JavaScript, mutation is direct and simple."

---

#### Live Debugging (VS Code) — 76:00–77:00

> "A real-world bug from an inventory processing system."

```javascript
// Bug: Searching with === when data has different casing
const products = [
    { name: "Wireless Mouse", stock: 50 },
    { name: "USB Keyboard", stock: 30 }
];

const search = "wireless mouse";

let result = null;
for (let i = 0; i < products.length; i++) {
    if (products[i].name === search) {  // BUG: case-sensitive
        result = products[i];
        break;
    }
}
console.log(result);  // null — "Wireless Mouse" !== "wireless mouse"

// Fix: Normalize both sides to lowercase
for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase() === search.toLowerCase()) {
        result = products[i];
        break;
    }
}
console.log(result);  // { name: "Wireless Mouse", stock: 50 }
```

> "String comparison with `===` is case-sensitive. Users type 'wireless mouse' but your database has 'Wireless Mouse'. Every search feature needs case normalization — `.toLowerCase()` on both sides. I've seen this bug in production search systems that returned 'no results found' when the product was right there."

---

#### Part Closing (Presentation) — 77:00–78:00

**Common Mistakes:**
- Forgetting to initialize accumulator variables before the loop (`let total = 0`, not just `let total`)
- Mutating the array you're iterating over (adding/removing items mid-loop shifts indices)
- Not normalizing strings in search comparisons — case sensitivity bugs
- Using the wrong loop type — `for` when you need `while`, or vice versa

**Optimization Tips:**
- Extract repeated property access: `const product = inventory[i]` at the top of the loop body — cleaner and avoids repeated indexing
- `break` on search is essential — don't scan remaining items after finding the match
- Build result arrays with `push` during iteration — don't create separate arrays manually

**Best Practices:**
- Match the loop to the task: `for` with index for numbered lists, `for...of` for clean value iteration, `while` for search/unknown-length, `for...in` for object keys
- Keep accumulator patterns clear: declare before loop, update inside, use after
- Process data in stages: list → calculate → search → filter → report

**Professional Insights:**
> "The Inventory Management System is a miniature version of what runs in every retail company. Real systems process millions of SKUs with the same patterns: iterate, accumulate, filter, search. The data structures get more complex — nested categories, regional warehouses, real-time updates — but the loop patterns you wrote today are identical. You're learning the foundations of enterprise software."

---

### Part 5: `for...in`, `for...of` & TypeScript Arrays (78:00 – 86:00)

---

#### Background / Motivation (Presentation) — 78:00–80:00

> **Talking Points:**
> "We used `for...in` and `for...of` in the capstone, but let's solidify the distinction. These two loops look almost identical — one word different — but they iterate over completely different things."
>
> "And just as we previewed TypeScript narrowing in Lecture 9, today we preview TypeScript's array type system — how TypeScript ensures your arrays contain the right data."

**Slide: `for...in` vs `for...of`**

| Feature | `for...in` | `for...of` |
|---------|-----------|-----------|
| Iterates over | Object **keys** (property names) | Iterable **values** (array elements, string chars) |
| On an array | Gives indices as strings (`"0"`, `"1"`) | Gives actual values |
| On an object | Gives property names | TypeError (objects aren't iterable) |
| Best for | Objects | Arrays, strings, Maps, Sets |

> "Rule of thumb: `in` for objects (keys **in** an object), `of` for arrays (values **of** a collection). If you confuse them, you'll get indices instead of values or errors instead of results."

---

#### Illustrations / Animations (Presentation) — 80:00–81:00

**Slide: Side-by-Side Comparison**

> ```javascript
> const fruits = ["Apple", "Banana", "Cherry"];
>
> for (const key in fruits) {
>     console.log(key);      // "0", "1", "2" (string indices!)
> }
>
> for (const value of fruits) {
>     console.log(value);    // "Apple", "Banana", "Cherry"
> }
> ```
>
> "See the difference? `for...in` gives you the keys — which for arrays are string indices. `for...of` gives you the values — the actual elements. 99% of the time with arrays, you want `for...of`."

**Slide: TypeScript Array Types**

> ```typescript
> // Two syntaxes — identical meaning
> const prices: number[] = [29, 99, 149];
> const names: Array<string> = ["Laptop", "Mouse"];
>
> // Tuple — fixed-length, typed positions
> const product: [string, number] = ["Laptop", 89999];
>
> // readonly — prevent mutation
> const CATEGORIES: readonly string[] = ["Electronics", "Furniture"];
> // CATEGORIES.push("Food"); ← TypeScript ERROR
> ```

---

#### "Let's see in Code now" (VS Code) — 81:00–85:00

```typescript
// ============================================
// Lecture 10 — Part 5: for...in, for...of & TypeScript Arrays
// Inventory Management System (TS Preview)
// NexusBerry Modern Frontend Course
// ============================================

// --- for...in — iterates KEYS (use for objects) ---
const productDetails = {
    name: "Laptop",
    price: 89999,
    category: "Electronics",
    stock: 15
};

console.log("📋 Product details (for...in on object):");
for (const key in productDetails) {
    console.log(`  ${key}: ${productDetails[key]}`);
}
// name: Laptop
// price: 89999
// category: Electronics
// stock: 15

// --- for...in on arrays — gives string indices (AVOID this) ---
const items = ["Laptop", "Mouse", "Keyboard"];
console.log("\n⚠️ for...in on array (not recommended):");
for (const index in items) {
    console.log(`  Type of index: ${typeof index}, value: ${index}`);
}
// Type of index: string, value: "0"
// Type of index: string, value: "1"
// Type of index: string, value: "2"
// Indices are STRINGS, not numbers — this can cause unexpected behavior

// --- for...of — iterates VALUES (use for arrays/strings) ---
console.log("\n✅ for...of on array (recommended):");
for (const item of items) {
    console.log(`  ${item}`);
}
// Laptop, Mouse, Keyboard — clean and direct

// --- for...of on strings ---
console.log("\n🔤 for...of on string:");
const sku = "NXB-2024";
for (const char of sku) {
    process.stdout.write(`[${char}]`);
}
console.log();  // [N][X][B][-][2][0][2][4]

// ============================================
// TypeScript Array Types (Preview)
// ============================================

// --- Basic array types ---
// const prices: number[] = [89999, 1999, 24999, 299];
// const productNames: string[] = ["Laptop", "Mouse", "Desk Chair"];
// const inStock: boolean[] = [true, true, false, true];

// --- Alternative generic syntax ---
// const prices: Array<number> = [89999, 1999, 24999];

// --- Tuples — fixed-length, typed at each position ---
// type Product = [string, number, boolean];  // [name, price, inStock]
// const laptop: Product = ["Laptop", 89999, true];   // ✅ Correct
// const broken: Product = [89999, "Laptop", true];   // ❌ Error: number not assignable to string

// --- readonly arrays — prevent accidental mutation ---
// const DEPARTMENTS: readonly string[] = ["Electronics", "Furniture", "Stationery"];
// DEPARTMENTS.push("Food");  // ❌ Error: push does not exist on readonly string[]
// This catches accidental mutations at compile time!

// --- Typed array in a loop ---
// const inventory: { name: string; price: number; stock: number }[] = [
//     { name: "Laptop", price: 89999, stock: 15 },
//     { name: "Mouse", price: 1999, stock: 150 }
// ];
//
// for (const product of inventory) {
//     // TypeScript knows: product.name is string, product.price is number
//     console.log(`${product.name}: Rs. ${product.price}`);
//     // product.color  ← Error: 'color' does not exist
// }

console.log("\n📝 TypeScript Array Type Examples (see comments above):");
console.log("  number[]           — array of numbers");
console.log("  string[]           — array of strings");
console.log("  Array<string>      — generic syntax (same as string[])");
console.log("  [string, number]   — tuple (fixed positions)");
console.log("  readonly string[]  — immutable array");
```

> **Narration while typing:**
> "`for...in` gives keys, `for...of` gives values. For objects, use `for...in`. For arrays, use `for...of`. If you use `for...in` on an array, you get string indices — not the values — and that can cause subtle type-related bugs."
>
> "The TypeScript preview shows how types protect your arrays. `number[]` means every element must be a number. Tuples like `[string, number]` lock down the type at each position. And `readonly string[]` prevents mutation entirely — `push`, `pop`, `splice` all become compile-time errors. When we reach React, readonly arrays help prevent accidental state mutations."

---

#### Interactive Questions (Presentation/Verbal) — 85:00–85:30

**Question 1 — Hidden Fact Reveal:**

> "What happens if you use `for...of` on a plain object?"

```javascript
const obj = { a: 1, b: 2 };
for (const val of obj) { console.log(val); }
```

> **Answer:** `TypeError: obj is not iterable`. Plain objects are NOT iterable — `for...of` only works with arrays, strings, Maps, Sets, and other iterables. For objects, use `for...in` or `Object.entries()` (Lecture 12).
> **Reveal:** "This is a common mistake. `for...of` and `for...in` are NOT interchangeable. Remember: `in` = keys `in` an object, `of` = values `of` a collection."

---

#### Part Closing (Presentation) — 85:30–86:00

**Common Mistakes (for...in / for...of / TypeScript):**
- Using `for...in` on arrays — gives string indices, not values
- Using `for...of` on plain objects — throws TypeError
- Confusing `number[]` (array of numbers) with `[number]` (tuple with one number element)
- Forgetting that `readonly` arrays prevent ALL mutation methods

**Best Practices:**
- `for...of` for arrays and strings. `for...in` for objects. Never mix them.
- Use `number[]` syntax (shorter) over `Array<number>` for simple types
- Use tuples for fixed-structure data like coordinates `[number, number]` or key-value pairs `[string, unknown]`
- `readonly` is free safety — use it for arrays that should never be modified

**Professional Insights:**
> "TypeScript's `readonly` modifier on arrays seems strict, but it catches an entire category of bugs at compile time. In every React codebase I've worked on, readonly arrays are standard practice — they prevent developers from accidentally mutating state, which is the most common source of rendering bugs. We're building the habit now."

---

### Lecture Ending (86:00 – 90:00)

---

#### Cheat Sheet Slides (Presentation) — 86:00–87:30

> "Let me walk you through the key reference points from today — these are in your cheatsheet file."

**Slide: The 5 Loop Types**
- `for` — known count, index-based iteration
- `while` — unknown count, condition-first (0+ runs)
- `do...while` — unknown count, body-first (1+ runs)
- `for...in` — object keys (property names)
- `for...of` — iterable values (array elements, string chars)

**Slide: Loop Control**
- `break` — exit the loop entirely
- `continue` — skip to the next iteration
- Nested loops — outer loop × inner loop = total iterations

**Slide: Array Methods Quick Reference**
- **Mutating:** `push` (end+), `pop` (end-), `unshift` (start+), `shift` (start-), `splice` (any position)
- **Non-mutating:** `concat` (merge), `slice` (extract), `indexOf` (position), `includes` (exists?)
- **Remember:** `splice` ≠ `slice` — one mutates, one doesn't

**Slide: TypeScript Arrays**
- `number[]` / `Array<number>` — typed arrays
- `[string, number]` — tuples (fixed positions)
- `readonly string[]` — immutable arrays

> "The full cheat sheet is shared after class. It covers every loop type, all array methods with examples, and the TypeScript types."

---

#### Assignment Introduction (Presentation) — 87:30–89:00

> "Your assignment for this lecture: build a complete Inventory Management System."

**Assignment: Inventory Management System (Lecture 10)**

Requirements:
1. Create an inventory array with at least 10 product objects (each with: id, name, category, price, stock)
2. Use a `for` loop to display all products in a formatted table with numbering and stock status indicators
3. Use a `for` loop with an accumulator to calculate total inventory value (price × stock for each product)
4. Use a `while` loop with `break` to implement a product search feature (case-insensitive)
5. Use `continue` to filter and display only products matching a specific condition (e.g., low stock, specific category)
6. Use a nested loop for at least one feature (e.g., cross-checking, grid display, multi-criteria processing)
7. Use at least 3 array methods: `push`, `splice`, and one non-mutating method (`slice`, `concat`, `indexOf`, or `includes`)
8. Use `for...of` for at least one iteration and `for...in` for at least one object iteration
9. Include array destructuring for at least one extraction (preview from today's lesson)
10. Print a formatted final inventory report with summary statistics to the console

> "Submit via Google Classroom by the next session. The grading criteria are in the `assignment.md` file."

---

#### Q&A — 89:00–89:30

> "Any questions before we close? Today was a big one — five loop types, array fundamentals, and a full system combining them. If anything feels unclear, the cheatsheet, recording, and code files will help."

*Common questions to anticipate:*
- "When should I use `for` vs `for...of`?" → Use `for` when you need the index. Use `for...of` when you only need values. In most cases, `for...of` is cleaner.
- "Can I use `forEach` on arrays?" → Yes — but we'll cover `forEach` in Lecture 11 with higher-order functions. For now, use `for` or `for...of`.
- "What's the difference between `splice` and `slice`?" → `splice` mutates (changes original), `slice` doesn't. `splice(index, count)` removes. `slice(start, end)` extracts a copy.
- "Do I need TypeScript for the assignment?" → Not yet — the assignment is JavaScript only. TypeScript becomes required from Lecture 17 onward. But adding type comments shows initiative.

---

#### Next Lecture Teaser — 89:30–90:00

> *Show the "Next Lecture" closing slide.*
>
> "In Lecture 11, we build the **Employee Profile Generator** — and for that, we need functions. Function declarations, arrow functions, closures, and higher-order array methods: `forEach`, `map`, `filter`, `find`, `reduce`, and `sort`. Every loop you wrote today gets a more powerful alternative. Instead of a `for` loop that builds a new array with `push`, you'll write `inventory.map(product => product.name)` — one line instead of five. Functions are how JavaScript scales — and higher-order methods are how modern JavaScript processes data. See you in Lecture 11."

---

## Phase 2: Share After Lecture

- [ ] Upload video recording to Google Classroom
- [ ] Push `code/` folder (with `inventory.js`) to course repo
- [ ] Post `assignment.md` to Google Classroom
- [ ] Share `presentation/` folder (HTML export or direct link)
- [ ] Post `cheatsheet.md` to Google Classroom
- [ ] Upload `quiz.md` to online portal — students should attempt before Lecture 11

---

## Interactive Questions Summary

| Part | Type | Topic | Purpose |
|------|------|-------|---------|
| Part 1 | Predict Output | `for` loop counting down from 3 to 0 | Teach that condition is checked before body runs |
| Part 1 | Spot the Error | `for` loop with `i--` instead of `i++` | Identify infinite loop from wrong update direction |
| Part 2 | Predict Output | `while` loop `count -= 3` from 10 → -2 | Show loops don't stop at exact threshold |
| Part 2 | Concept Challenge | When to use `do...while` vs `while` | Real-world examples of body-first execution |
| Part 2 | Quick-Fire Recall | `break` vs `continue` difference | Rapid recall of loop control keywords |
| Part 3 | Predict Output | `splice(1, 2)` on `["A","B","C","D"]` | Understand splice parameters (start, deleteCount) |
| Part 3 | Concept Challenge | Why `array[array.length]` returns `undefined` | JavaScript's silent out-of-bounds behavior |
| Part 4 | Concept Challenge | Why initialize object before accumulating in loop | Prevent TypeError on first category encounter |
| Part 4 | Predict Output | Monitor stock after shipment processing | Trace mutation through nested loop logic |
| Part 5 | Hidden Fact Reveal | `for...of` on plain object throws TypeError | Objects aren't iterable — use `for...in` |

---

## Teaching Tips Summary

| Moment | Tip Type | Purpose |
|--------|----------|---------|
| Opening — assembly line analogy | Analogy | Make abstract concept of iteration concrete before code |
| `for` loop anatomy visual | Diagram | Three parts (init, test, update) mapped visually |
| Off-by-one `<=` vs `<` | Bug demo | The most common loop bug — visceral before theoretical |
| `while` vs `do...while` weather analogy | Analogy | "Check first" vs "act first" — intuitive distinction |
| Infinite loop demonstration | Live danger | Show what happens (with recovery plan) — memorable |
| Array visual with filing cabinet | Analogy | Zero-indexing feels natural when mapped to physical drawers |
| Mutating vs non-mutating methods table | Classification | The distinction that prevents React bugs later |
| Inventory Management System capstone | All patterns combined | Proves each loop type has a natural use case |
| `for...in` vs `for...of` side-by-side | Direct comparison | One word difference, completely different behavior |
| TypeScript readonly preview | React preparation | Plant seed for immutable state patterns in Module 3 |
| Closing teaser to L11 functions/HOFs | Anticipation building | Connect loops to their more powerful functional alternatives |

---

## Emergency Recovery

| Problem | Solution |
|---------|----------|
| reveal.js CDN fails | Open presentation as local file (most features still work). Fall back to VS Code full-screen + verbal explanation. |
| VS Code terminal not working | Use Chrome DevTools Console tab — paste code there and run it live |
| TypeScript Playground not loading | Skip Part 5 TS live demo — use slides only. TypeScript is a preview, not a requirement today. |
| Infinite loop crashes Node.js | Ctrl+C to kill process. Explain this is exactly why infinite loops are dangerous. Use it as a teaching moment. |
| Students confused by `splice` vs `slice` | Write both side-by-side: `splice` = remove/add IN PLACE (mutates). `slice` = copy a PORTION (non-mutating). "splice has a P — it PLUCKS from the original." |
| Running behind schedule | Shorten Part 5 TypeScript to slides only (skip live coding). Compress Feature 5 and 6 of capstone to verbal walkthrough with pre-typed code. |
| Running ahead of schedule | Extend Part 4 — let students suggest new inventory features and code them live. Or add a bonus section on `Array.from()` and `Array.isArray()`. |
| Student asks about `map`/`filter`/`reduce` | "Excellent question — those are called higher-order array methods, and they're the star of Lecture 11. They replace most `for` loops with single-line expressions. Today we build the foundation. Next time, we level up." |

---

## Conversion Phrases (Sprinkle Throughout)

- *"This is what separates classroom learning from YouTube tutorials — we're not just showing syntax, we're building a complete system that uses every loop type in its natural context."*
- *"In 25 years of production code, the off-by-one error is still the most common bug I see in code reviews. Not architecture mistakes. Not design pattern failures. Off-by-one. Master your loop bounds and you eliminate an entire class of defects."*
- *"The mutating vs non-mutating distinction feels academic right now, but in React — which is 60% of this course — it's the difference between a working UI and a broken one. React detects changes by comparing references. Mutate in place? React doesn't see it. Create a new array? React re-renders. We're building that awareness from day one."*
- *"When you join a development team, you'll see `for...of` everywhere and `for...in` on objects. Confusing them is an immediate code review flag. Knowing the difference signals that you understand JavaScript's iteration model — not just the syntax."*
- *"Every e-commerce site, every logistics system, every banking application processes data in loops. The patterns you wrote today — accumulate, search, filter, cross-check — are the building blocks of enterprise software. Scale changes, patterns don't."*

---

## Never Say

- "This is easy/simple" → Say "foundational"
- "You should know this" → Say "Let me show you"
- "Obviously..." → Just explain it
- "Everyone knows..." → Not everyone does — that's why they're here
- "Just use for loops for everything" → Teach the right loop for each situation
- "Arrays are easy" → Arrays have subtle behaviors (mutation, reference types) that trip up even experienced developers

---
