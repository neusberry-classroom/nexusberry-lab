# Lecture 11: Functions, Closures & Higher-Order Array Methods

## PRESENTER ONLY (Not shared with students)

### Overview
- **Format**: Live Google Meet session
- **Style**: Presentation-driven (reveal.js) + live coding (VS Code)
- **Project**: Employee Profile Generator
- **Goal**: Master JavaScript functions from declaration to closures, then unlock the power of higher-order array methods — students leave knowing how to write reusable functions, understand scope and closures, and transform data using `forEach`, `map`, `filter`, `find`, `reduce`, `sort`, and method chaining — so they can build data-driven applications from Lecture 12 onward

---

## Pre-Class Setup Checklist

- [ ] VS Code with clean dark theme (Dracula or One Dark Pro recommended)
- [ ] Font size set to 18–20px for screen-share readability
- [ ] Browser (Chrome) open with DevTools on Console tab, ready to run snippets
- [ ] Blank project folder created: `employee-profiles/`
- [ ] New file open and ready: `employee-profiles/profiles.js`
- [ ] Presentation loaded: `presentation/index.html` open in browser tab
- [ ] reveal.js CDN verified — advance through first 3 slides to confirm it loads
- [ ] Node.js installed and `node --version` confirms LTS (for terminal demos)
- [ ] Google Meet test run completed (audio, screen share, camera)
- [ ] Notifications silenced on all devices (phone on Do Not Disturb)
- [ ] Backup: Chrome DevTools Console ready as fallback for any VS Code issues
- [ ] Lecture-specific: Prepare a sample `employees` array (8-10 objects) in a scratch file for HOF demos
- [ ] Lecture-specific: Have a second scratch file with intentional closure bugs for debugging section

---

## Phase 0: Before Lecture (Lecture 11 — starts after Lecture 10 review)

### Portal Quiz Review (from Lecture 10)

> **Talking Points:**
> "Let's start by reviewing your Lecture 10 portal quiz results. Loops and arrays are the backbone of every data-driven application — if these fundamentals aren't solid, today's higher-order methods will feel like magic instead of logic. Let's make sure the foundation is strong."

**Commonly Missed Areas to Watch For (Loops, Iteration & Arrays — Lecture 10):**

- **Off-by-one errors in `for` loops**: Students using `<=` instead of `<` with `array.length`, accessing one index past the end. Reinforce: `for (let i = 0; i < arr.length; i++)` — the `<` is intentional because arrays are zero-indexed.
- **`for...in` vs `for...of` confusion**: `for...in` gives you keys (indices for arrays, property names for objects). `for...of` gives you values. For arrays, almost always use `for...of`. `for...in` is for objects — and even then, we'll learn better approaches today.
- **Mutating vs non-mutating array methods**: `push`, `pop`, `splice` change the original array. `concat`, `slice` return a new one. Students who mixed these up likely got unexpected results. Today we'll add `map`, `filter`, `reduce` to the non-mutating toolkit.
- **`break` vs `continue` inside loops**: `break` exits the entire loop. `continue` skips the current iteration and moves to the next. Students confuse which one stops everything vs which one skips one cycle.
- **Array destructuring syntax**: `const [first, second] = arr` — some students confused this with object destructuring or forgot that array destructuring is positional, not named. We'll use this again today when destructuring function parameters.

> **Transition:**
> "Good. If you scored 7 or above — loops and arrays are clicking. If not, rewatch the recording and redo the exercises. Today we're taking everything you know about arrays and supercharging it. Instead of writing `for` loops to transform data, you'll use `map`. Instead of `for` loops to find items, you'll use `filter` and `find`. But first — we need functions. Functions are the engine that makes all of this work."

---

### Assignment Feedback (Lecture 10 — Inventory Management System)

> **Talking Points:**
> "Let me share what I saw in the Inventory Management System assignments. This was your first project combining loops with arrays — and the quality varied significantly."

**Common Mistakes Observed:**

1. **Infinite loops from wrong loop conditions**: Several submissions had `while` loops without proper exit conditions or with conditions that never became `false`. Always trace your loop logic mentally: "Will this condition eventually become false?" If you're not sure, add a safety counter.
2. **Modifying arrays while iterating**: Using `splice` inside a `for` loop to remove items shifts indices and causes skipped elements. Either iterate backwards, collect indices first, or — better yet — use `filter` (which you'll learn today).
3. **Not using `const` for the array itself**: The array variable should be `const` — you can still `push`, `pop`, and `splice` a `const` array. `const` prevents reassignment, not mutation. Several students used `let` unnecessarily.
4. **String comparison bugs**: Comparing product names with `==` instead of converting to lowercase first. `"Apple" === "apple"` is `false`. Always normalize: `name.toLowerCase() === search.toLowerCase()`.
5. **Giant monolithic code blocks**: No separation between inventory operations (add, remove, search, report). Each operation should be in its own section. Today we'll learn functions — the proper way to organize logic into reusable, named blocks.

**Good Examples to Highlight:**

- Praise any submission that used `for...of` to iterate arrays instead of manual indexing
- Highlight anyone who created helper comments like `// --- Search Operation ---` to organize code
- Celebrate use of `includes()` for search functionality instead of manual character-by-character comparison
- Acknowledge students who handled edge cases: empty arrays, items not found, duplicate entries

> **Encouragement:**
> "Your Inventory Management System was essentially a mini database with CRUD operations — create, read, update, delete. That's the foundation of every application you'll ever build. Today, we learn functions — reusable blocks of logic that turn 50 lines of repeated code into 5. And then we learn higher-order array methods — the modern JavaScript way to process collections. After today, you'll never write a `for` loop to transform an array again."

---

## Phase 1: Today's Lecture (90 Minutes)

---

### Part 1: Functions — Your First Reusable Building Blocks (00:00 – 22:00)

---

#### Background / Motivation (Presentation) — 00:00–05:00

> **Talking Points:**
> "In Lecture 10, you wrote loops that calculated inventory totals. Loops that searched for products. Loops that generated reports. Now imagine you need that same total calculation in three different places in your code. Do you copy-paste the loop three times?"
>
> "That's what programming looked like before functions. Copy. Paste. Pray nothing changes. And when the business logic changed — you had to find and update every copy. Miss one? Bug in production."
>
> "Functions solve this. A function is a reusable block of logic with a name. You write it once, call it anywhere. Change the logic in one place, every call gets the update. Functions are the most important concept in all of programming — more important than loops, more important than conditionals. Everything we build from here — React components, API handlers, event listeners — they're all functions."

**Slide: What Is a Function?**

> "A function is a named, reusable block of code that:
> 1. **Accepts input** (parameters)
> 2. **Performs a task** (the function body)
> 3. **Returns output** (the return value)
>
> **Analogy:** Think of a function like a vending machine. You insert money (input/parameter), the machine processes your request (function body), and it gives you a snack (return value). The machine doesn't care who uses it or when — it does the same job every time. That's a function."

**Slide: Three Ways to Write Functions in JavaScript**

| Syntax | Name | Hoisted? |
|--------|------|----------|
| `function greet() {}` | Function Declaration | Yes — can call before defining |
| `const greet = function() {}` | Function Expression | No — must define before calling |
| `const greet = () => {}` | Arrow Function | No — must define before calling |

> "JavaScript gives you three syntaxes. Each has a purpose. By the end of Part 1, you'll know exactly when to use which."

---

#### Illustrations / Animations (Presentation) — 05:00–07:00

**Slide: Function Anatomy Diagram**

> Show a labeled diagram of a function:
> ```
>   function calculateBonus(salary, rating) {    ← name + parameters
>       const bonus = salary * (rating / 10);    ← function body
>       return bonus;                             ← return value
>   }
>
>   const result = calculateBonus(50000, 8);     ← function call + arguments
>   // result = 40000
> ```
>
> "Parameters are the placeholders. Arguments are the actual values you pass in. The function body is where your logic lives. `return` sends the result back to wherever the function was called."

**Slide: Hoisting — Declaration vs Expression**

> ```
>   greet();  // ✅ Works — declarations are hoisted
>   function greet() { console.log("Hello!"); }
>
>   farewell();  // ❌ ReferenceError — expressions are NOT hoisted
>   const farewell = function() { console.log("Bye!"); };
> ```
>
> "JavaScript reads your code in two passes. First pass: it finds all `function` declarations and moves them to the top (hoisting). Second pass: it executes line by line. Function expressions and arrow functions are treated like regular variables — they only exist after the line where they're defined."

---

#### "Let's see in Code now" (VS Code) — 07:00–16:00

> "Open VS Code. Create `profiles.js` inside the `employee-profiles` folder. Let's build the Employee Profile Generator — starting with functions."

```javascript
// ============================================
// Lecture 11 — Part 1: Function Fundamentals
// Employee Profile Generator
// NexusBerry Modern Frontend Course
// ============================================

// --- Function Declaration ---
// Hoisted — can be called before it's defined in the file
function formatEmployeeName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

console.log(formatEmployeeName("Sara", "Ahmed"));  // "Sara Ahmed"
console.log(formatEmployeeName("Ali", "Khan"));    // "Ali Khan"

// --- Function Expression ---
// NOT hoisted — must be defined before use
const calculateSalary = function(basePay, hoursWorked) {
    return basePay * hoursWorked;
};

console.log(calculateSalary(2500, 160));  // 400000

// --- Arrow Function ---
// Concise syntax, implicit return for single expressions
const getFullTitle = (name, department) => `${name} — ${department}`;

console.log(getFullTitle("Sara Ahmed", "Engineering"));
// "Sara Ahmed — Engineering"

// Arrow with function body (multiple lines need curly braces + explicit return)
const generateEmployeeId = (department, index) => {
    const prefix = department.substring(0, 3).toUpperCase();
    const paddedIndex = String(index).padStart(4, "0");
    return `${prefix}-${paddedIndex}`;
};

console.log(generateEmployeeId("Engineering", 42));  // "ENG-0042"
console.log(generateEmployeeId("Marketing", 7));     // "MAR-0007"

// --- Default Parameters ---
const createProfile = (name, role = "Junior Developer", department = "Unassigned") => {
    return { name, role, department };
};

console.log(createProfile("Ali Khan"));
// { name: "Ali Khan", role: "Junior Developer", department: "Unassigned" }
console.log(createProfile("Sara Ahmed", "Senior Engineer", "Engineering"));
// { name: "Sara Ahmed", role: "Senior Engineer", department: "Engineering" }

// --- Rest Parameters ---
// Collects all remaining arguments into an array
const logActivity = (employeeName, ...activities) => {
    console.log(`${employeeName}'s activities:`);
    for (const activity of activities) {
        console.log(`  - ${activity}`);
    }
};

logActivity("Sara", "Code Review", "Sprint Planning", "Deployment");
// Sara's activities:
//   - Code Review
//   - Sprint Planning
//   - Deployment
```

> **Narration while typing:**
> "Three syntaxes, one purpose. Function declarations are hoisted — use them for top-level utility functions that you want available everywhere in the file. Arrow functions are concise — use them for short transformations and callbacks (you'll see why in Part 3). Function expressions are the middle ground — rarely the best choice, but you'll see them in legacy code."
>
> "Default parameters eliminate the need for `if (role === undefined) role = 'Junior Developer'`. Rest parameters (`...activities`) collect any number of extra arguments into a real array — not the old `arguments` object. Rest must always be the last parameter."

---

#### Interactive Questions (Presentation/Verbal) — 16:00–19:00

**Question 1 — Predict Output:**

> "What gets logged? Drop your answer in the chat."

```javascript
console.log(multiply(3, 4));

function multiply(a, b) {
    return a * b;
}
```

> **Answer:** `12` — Function declarations are hoisted. The function exists before the call. This would fail with `const multiply = (a, b) => a * b` — arrow functions are NOT hoisted.
> **Teaching moment:** "Hoisting is why function declarations are ideal for utility functions. You can organize your code with all calls at the top and definitions below — like a table of contents."

---

**Question 2 — Spot the Error:**

> "This function has a bug. Can you find it?"

```javascript
const greet = (name) => {
    `Hello, ${name}! Welcome aboard.`
};

console.log(greet("Sara"));
```

> **Answer:** `undefined` — The function body has curly braces, which means it needs an explicit `return`. Without `return`, the function returns `undefined`. Fix: either add `return` before the template literal, or remove the curly braces for implicit return: `const greet = (name) => \`Hello, ${name}! Welcome aboard.\``;
> **Teaching moment:** "This is the #1 arrow function bug. Curly braces = explicit return required. No curly braces = implicit return. I've seen senior developers spend 30 minutes debugging this."

---

**Question 3 — Concept Challenge:**

> "When should you use a function declaration vs an arrow function?"

> **Answer:** Function declarations for standalone, reusable utility functions (they're hoisted, named in stack traces). Arrow functions for callbacks, short transformations, and anywhere you want lexical `this` (critical in React). In practice, most modern JavaScript uses arrow functions for almost everything — but declarations still matter for top-level functions.

---

#### Live Debugging (VS Code) — 19:00–20:30

> "Let me show you a sneaky bug with arrow functions and objects."

```javascript
// Bug: Trying to return an object with implicit return
const createEmployee = (name, role) => { name: name, role: role };

// This doesn't return an object — JavaScript thinks { } is a code block!
// The fix: wrap the object in parentheses
const createEmployeeFixed = (name, role) => ({ name: name, role: role });

console.log(createEmployee("Sara", "Engineer"));      // undefined
console.log(createEmployeeFixed("Sara", "Engineer"));  // { name: "Sara", role: "Engineer" }
```

> "When you use an arrow function with implicit return and want to return an object literal, JavaScript sees `{` and thinks it's a code block, not an object. The fix: wrap the object in `( )`. You'll use this pattern constantly in React: `array.map(item => ({ id: item.id, label: item.name }))`. Remember the parentheses."

---

#### Part Closing (Presentation) — 20:30–22:00

**Common Mistakes:**
- Forgetting `return` inside arrow functions with curly braces
- Returning an object literal without wrapping in `( )` — JS treats `{}` as a code block
- Putting rest parameters before other parameters — rest must always be last
- Using `var` for function expressions — use `const` (the function reference shouldn't be reassigned)
- Forgetting that hoisting only applies to `function` declarations, not `const`/`let` expressions

**Optimization Tips:**
- Name your functions descriptively: `calculateAnnualSalary` not `calc` or `doStuff`
- Keep functions small — if a function does more than one thing, split it
- Use default parameters instead of conditional checks inside the body
- Return early for edge cases (guard clauses) to reduce nesting

**Best Practices:**
- `const` for all function expressions and arrow functions — prevents accidental reassignment
- One function, one job — the Single Responsibility Principle
- Pure naming conventions: verbs for actions (`calculate`, `format`, `generate`), nouns for factories (`createProfile`)
- Document parameters with clear names — `basePay` not `bp`, `hoursWorked` not `h`

**Professional Insights:**
> "Here's something YouTube tutorials skip: in 25 years of code reviews, the most maintainable codebases have small, well-named functions. Not clever one-liners. Not 200-line monsters. Functions that do one thing with a name that tells you what that thing is. When you read `calculateAnnualBonus(employee)`, you don't need to read the function body to understand what it does. That's the goal. Code that reads like English."

---

### Part 2: Scope, Closures & Pure Functions (22:00 – 42:00)

---

#### Background / Motivation (Presentation) — 22:00–26:00

> **Talking Points:**
> "You can write functions now. But where do variables live? If you declare a variable inside a function, can code outside that function see it? What about variables inside an `if` block inside a function?"
>
> "Scope determines variable visibility — where a variable can be accessed. Get this wrong and you'll have variables colliding, overwriting each other, or being undefined when you expect them to have values."
>
> "And then there's closures — arguably the most powerful concept in JavaScript. A closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing. Closures are how React hooks work. They're how event handlers remember data. They're how private variables exist in JavaScript. Understanding closures separates JavaScript beginners from JavaScript developers."

**Slide: Three Levels of Scope**

| Scope | Created By | Visibility |
|-------|-----------|------------|
| Global | Top-level code | Everywhere in the program |
| Function | `function` keyword | Only inside that function |
| Block | `{ }` with `let`/`const` | Only inside that block (`if`, `for`, etc.) |

> "Variables declared with `let` and `const` respect all three. Variables declared with `var` ignore block scope — another reason we never use `var`."

**Slide: The Scope Chain**

> ```
>   Global Scope
>      └── Function Scope (outer)
>            └── Function Scope (inner)
>                  └── Block Scope (if/for)
> ```
>
> "When JavaScript encounters a variable, it looks in the current scope first. Not found? It looks in the parent scope. Still not found? The grandparent scope. All the way up to global. This lookup path is the scope chain. It only goes up — never down or sideways."

---

#### Illustrations / Animations (Presentation) — 26:00–28:00

**Slide: Closure — A Function That Remembers**

> Show a visual with two boxes:
> ```
>   ┌─────────────────────────────────┐
>   │  createCounter()                │
>   │  ┌───────────────────────────┐  │
>   │  │  let count = 0            │  │  ← This variable "lives on"
>   │  │                           │  │
>   │  │  return function() {      │  │
>   │  │      count++;             │  │  ← The returned function
>   │  │      return count;        │  │     remembers `count`
>   │  │  }                        │  │
>   │  └───────────────────────────┘  │
>   └─────────────────────────────────┘
>
>   const counter = createCounter();
>   counter();  // 1
>   counter();  // 2
>   counter();  // 3  ← count persists between calls!
> ```
>
> "Normally, when a function finishes executing, its local variables are garbage collected — they disappear. But if that function returns another function that references those variables, JavaScript keeps them alive. The inner function 'closes over' the outer variables. That's a closure."

**Slide: Pure Functions — Predictable & Testable**

> ```
>   // PURE — same input always gives same output
>   function add(a, b) { return a + b; }
>
>   // IMPURE — depends on external state
>   let tax = 0.17;
>   function addTax(price) { return price * (1 + tax); }
>   // If tax changes, same input gives different output!
> ```
>
> "Pure functions are the foundation of predictable code. React components should be pure functions of their props. Redux reducers must be pure. Testing is trivial — pass inputs, check outputs. No external dependencies to mock."

---

#### "Let's see in Code now" (VS Code) — 28:00–36:00

```javascript
// ============================================
// Lecture 11 — Part 2: Scope, Closures & Pure Functions
// Employee Profile Generator
// ============================================

// --- Scope Demonstration ---

// Global scope
const companyName = "NexusBerry";

function createDepartmentReport(deptName) {
    // Function scope — only visible inside this function
    const reportTitle = `${deptName} Department Report`;

    if (deptName === "Engineering") {
        // Block scope — only visible inside this if block
        const bonus = 15;
        console.log(`${reportTitle} — Bonus: ${bonus}%`);
    }

    // console.log(bonus);  // ❌ ReferenceError — bonus is block-scoped
    console.log(reportTitle);   // ✅ Works — same function scope
    console.log(companyName);   // ✅ Works — global scope (scope chain lookup)
}

createDepartmentReport("Engineering");

// --- Scope Chain in Action ---
const globalRate = 0.1;

function calculatePayroll(employees) {
    const departmentRate = 0.05;

    function calculateBonus(salary) {
        // This function can access:
        // - its own scope (salary parameter)
        // - parent scope (departmentRate)
        // - global scope (globalRate)
        return salary * (globalRate + departmentRate);
    }

    for (const emp of employees) {
        console.log(`${emp.name}: Bonus = ${calculateBonus(emp.salary)}`);
    }
}

calculatePayroll([
    { name: "Sara", salary: 80000 },
    { name: "Ali", salary: 65000 }
]);
// Sara: Bonus = 12000
// Ali: Bonus = 9750

// --- Closures ---

// Closure Example 1: Counter
function createCounter(startValue = 0) {
    let count = startValue;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => { count = startValue; }
    };
}

const taskCounter = createCounter();
console.log(taskCounter.increment());  // 1
console.log(taskCounter.increment());  // 2
console.log(taskCounter.increment());  // 3
console.log(taskCounter.decrement());  // 2
console.log(taskCounter.getCount());   // 2

// Each call to createCounter creates a NEW closure with its own `count`
const bugCounter = createCounter(10);
console.log(bugCounter.getCount());    // 10 — independent from taskCounter
console.log(taskCounter.getCount());   // 2 — unaffected

// Closure Example 2: Employee ID Generator (factory pattern)
function createIdGenerator(prefix) {
    let nextId = 1;

    return function(name) {
        const id = `${prefix}-${String(nextId).padStart(4, "0")}`;
        nextId++;
        return { id, name };
    };
}

const generateEngineerId = createIdGenerator("ENG");
const generateMarketingId = createIdGenerator("MKT");

console.log(generateEngineerId("Sara Ahmed"));    // { id: "ENG-0001", name: "Sara Ahmed" }
console.log(generateEngineerId("Ali Khan"));      // { id: "ENG-0002", name: "Ali Khan" }
console.log(generateMarketingId("Hina Malik"));   // { id: "MKT-0001", name: "Hina Malik" }

// --- Pure Functions ---

// PURE: Same input → same output, no side effects
function calculateAnnualSalary(monthlySalary) {
    return monthlySalary * 12;
}

// PURE: Transforms data without modifying input
function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

console.log(formatCurrency(calculateAnnualSalary(85000)));
// "Rs. 1,020,000"

// IMPURE: Depends on external variable
let exchangeRate = 278;  // PKR to USD
function convertToUSD(pkrAmount) {
    return pkrAmount / exchangeRate;  // Result changes if exchangeRate changes!
}

// FIXED — Make it pure by passing the rate as a parameter
function convertCurrency(amount, rate) {
    return amount / rate;
}
```

> **Narration while typing:**
> "Watch the scope chain: `calculateBonus` can see `salary` (its own parameter), `departmentRate` (parent function), and `globalRate` (global). It looks upward through the chain until it finds the variable."
>
> "Now closures — `createCounter` returns an object with functions that reference `count`. Even after `createCounter` finishes, `count` stays alive because the returned functions still reference it. Each call to `createCounter` creates a separate closure with its own `count`. This is how you create private state in JavaScript — before classes, this was the only way."
>
> "Pure functions are the ideal. Same input, same output. No surprises. When you write React components, they should be pure functions of their props. When you write `map` and `filter` callbacks, they should be pure. Impure functions — those that depend on external state — are harder to test and debug."

---

#### Interactive Questions (Presentation/Verbal) — 36:00–39:00

**Question 1 — Predict Output:**

> "What does this log? Think carefully about closures."

```javascript
function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeter("Hello");
const saySalam = createGreeter("Assalam-o-Alaikum");

console.log(sayHello("Ali"));
console.log(saySalam("Sara"));
```

> **Answer:** `"Hello, Ali!"` then `"Assalam-o-Alaikum, Sara!"` — Each call to `createGreeter` creates a new closure. `sayHello` closes over `greeting = "Hello"`. `saySalam` closes over `greeting = "Assalam-o-Alaikum"`. They're independent.
> **Teaching moment:** "This is the factory pattern with closures. You configure a function once, then use it many times. React's `useState` hook uses exactly this pattern under the hood."

---

**Question 2 — Predict Output (Tricky):**

> "What values get logged?"

```javascript
function createFunctions() {
    const functions = [];

    for (let i = 0; i < 3; i++) {
        functions.push(() => i);
    }

    return functions;
}

const fns = createFunctions();
console.log(fns[0](), fns[1](), fns[2]());
```

> **Answer:** `0, 1, 2` — Because `let` creates a new binding for each loop iteration, each arrow function closes over its own `i`. If this used `var` instead of `let`, all three would return `3` (the final value of `i` after the loop). This is a classic interview question — and another reason we never use `var`.
> **Teaching moment:** "This bug plagued JavaScript for 20 years before `let` was introduced in ES6. With `var`, there's only one `i` shared across all iterations. With `let`, each iteration gets its own copy. Closures + `let` = correct behavior."

---

**Question 3 — Concept Challenge:**

> "Is this function pure or impure? Why?"

```javascript
function getEmployeeLabel(employee) {
    return `${employee.name} (${employee.department})`;
}
```

> **Answer:** Pure. Same input object → same output string. It doesn't modify the input or depend on any external state. It has no side effects (no `console.log`, no DOM changes, no network calls).
> **Teaching moment:** "Notice it reads from the parameter only — not from any global variable. That's the key test: does the function depend on anything other than its arguments?"

---

#### Live Debugging (VS Code) — 39:00–40:30

> "Here's a closure bug that catches even experienced developers."

```javascript
// Bug: Stale closure — function captures a reference, not a snapshot
let employeeCount = 5;

const getCount = () => employeeCount;

employeeCount = 10;

console.log(getCount());  // What do you expect?
// Answer: 10 — NOT 5!
// The closure captures a REFERENCE to employeeCount, not its value at creation time
// When employeeCount changes, the closure sees the new value

// This is how React's stale closure bug works!
// State updates but the event handler still sees the old value
// Solution in React: dependency arrays in useEffect
```

> "Closures capture a reference to the variable — not a copy of the value. When the variable changes, the closure sees the updated value. This is actually useful most of the time. But in React, it causes the infamous 'stale closure' bug when you forget to add variables to your dependency arrays. We'll see this firsthand in Module 3."

---

#### Part Closing (Presentation) — 40:30–42:00

**Common Mistakes:**
- Assuming closures capture values (they capture references)
- Accidentally creating closures over `var` in loops — use `let` instead
- Writing impure functions that depend on global state when pure alternatives exist
- Not recognizing scope chain lookup — debugging "variable is not defined" errors
- Confusing function scope with block scope — `var` leaks out of blocks, `let`/`const` don't

**Optimization Tips:**
- Use closures for data privacy — expose only what's needed through returned functions
- Prefer pure functions — they're easier to test, debug, and parallelize
- Minimize global variables — closures let you encapsulate state without polluting global scope
- Use the factory pattern (closure returning a configured function) to avoid repetitive parameterization

**Best Practices:**
- When a function needs configuration that doesn't change, use a closure factory instead of passing the same argument every time
- Keep closures simple — if you're closing over more than 2-3 variables, the function is doing too much
- Document closure behavior: if a function returns a function, explain what state it captures
- Use `const` for function references to prevent accidental reassignment of closures

**Professional Insights:**
> "In 25 years of JavaScript development, closures are the single concept that separates developers who 'use' JavaScript from developers who 'understand' it. React hooks — `useState`, `useEffect`, `useCallback` — are all closures. Redux middleware is closures. Express middleware is closures. Event handlers with context are closures. Once you truly understand closures, you'll see them everywhere — and suddenly, code that seemed magical becomes straightforward."

---

### Part 3: Callbacks & Higher-Order Functions — `forEach`, `map`, `filter` (42:00 – 62:00)

---

#### Background / Motivation (Presentation) — 42:00–46:00

> **Talking Points:**
> "Now we connect everything. You know functions. You know closures. You know arrays from Lecture 10. Now we combine them."
>
> "A callback is a function passed as an argument to another function. You've already seen this — `setTimeout(function, delay)` is a callback. Event listeners use callbacks. Today, we meet the most important callbacks in JavaScript: the higher-order array methods."
>
> "A higher-order function (HOF) is a function that either takes a function as an argument OR returns a function. `map`, `filter`, `reduce` — they all take a callback function and apply it to every element of an array. These methods replace `for` loops for data transformation. In React, you'll use `map` in every single component that renders a list."

**Slide: First-Class Functions — Functions Are Values**

> "In JavaScript, functions are 'first-class citizens' — they're values, just like numbers and strings:"

| You can... | Example |
|-----------|---------|
| Store in a variable | `const greet = (name) => \`Hi ${name}\`` |
| Pass as an argument | `array.map(greet)` |
| Return from a function | `return () => count++` |
| Store in an array | `[add, subtract, multiply]` |
| Store in an object | `{ calculate: (a, b) => a + b }` |

> "This is what makes higher-order functions possible. If functions weren't values, you couldn't pass them to `map` or `filter`."

**Slide: From `for` Loop to HOF**

> ```
>   // OLD: Imperative — tell the computer HOW
>   const results = [];
>   for (let i = 0; i < employees.length; i++) {
>       results.push(employees[i].name.toUpperCase());
>   }
>
>   // NEW: Declarative — tell the computer WHAT
>   const results = employees.map(emp => emp.name.toUpperCase());
> ```
>
> "Same result. Half the code. Zero indexing bugs. No off-by-one errors. No accidental mutations. This is the modern JavaScript way."

---

#### Illustrations / Animations (Presentation) — 46:00–48:00

**Slide: How `map` Works — Visual Pipeline**

> ```
>   Input Array:  [ "sara", "ali", "hina" ]
>                     ↓       ↓       ↓
>   Callback:    toUpperCase  toUpperCase  toUpperCase
>                     ↓       ↓       ↓
>   Output Array: [ "SARA", "ALI", "HINA" ]
> ```
>
> "Each element goes through the callback. A new array is returned. The original array is untouched."

**Slide: How `filter` Works — Visual Gate**

> ```
>   Input:  [ 85000, 45000, 92000, 38000, 71000 ]
>               ↓       ↓       ↓       ↓       ↓
>   Test:    ≥50000?  ≥50000?  ≥50000?  ≥50000?  ≥50000?
>              ✅       ❌       ✅       ❌       ✅
>               ↓                ↓                ↓
>   Output: [ 85000,          92000,           71000 ]
> ```
>
> "`filter` applies a test to each element. Only elements that pass (return `true`) make it into the new array."

---

#### "Let's see in Code now" (VS Code) — 48:00–57:00

```javascript
// ============================================
// Lecture 11 — Part 3: Callbacks & HOFs
// Employee Profile Generator
// ============================================

// --- Our Employee Data ---
const employees = [
    { name: "Sara Ahmed", department: "Engineering", salary: 95000, rating: 9, active: true },
    { name: "Ali Khan", department: "Marketing", salary: 72000, rating: 7, active: true },
    { name: "Hina Malik", department: "Engineering", salary: 88000, rating: 8, active: false },
    { name: "Omar Farooq", department: "Sales", salary: 65000, rating: 6, active: true },
    { name: "Fatima Noor", department: "Engineering", salary: 105000, rating: 10, active: true },
    { name: "Zain Abbas", department: "Marketing", salary: 58000, rating: 5, active: true },
    { name: "Ayesha Siddiqui", department: "Sales", salary: 70000, rating: 8, active: true },
    { name: "Hassan Raza", department: "Engineering", salary: 92000, rating: 7, active: false }
];

// --- Callback Functions ---
// A callback is a function passed as an argument to another function

function processEmployees(employeeList, callback) {
    for (const employee of employeeList) {
        callback(employee);
    }
}

// Passing different callbacks to the same function
processEmployees(employees, (emp) => {
    console.log(`${emp.name} — ${emp.department}`);
});

processEmployees(employees, (emp) => {
    if (emp.rating >= 8) {
        console.log(`⭐ ${emp.name} is a top performer!`);
    }
});

// --- forEach — Iterate without creating a new array ---
// Deferred from Lecture 10 — now you understand callbacks!
console.log("\n--- forEach ---");
employees.forEach((employee, index) => {
    console.log(`${index + 1}. ${employee.name} (${employee.department})`);
});

// forEach returns undefined — it's for side effects only (logging, updating DOM)
// Do NOT use forEach when you need a result — use map instead

// --- map — Transform each element, return new array ---
console.log("\n--- map ---");
const employeeNames = employees.map(emp => emp.name);
console.log(employeeNames);
// ["Sara Ahmed", "Ali Khan", "Hina Malik", ...]

const employeeCards = employees.map(emp => ({
    displayName: emp.name.toUpperCase(),
    label: `${emp.department} — Rating: ${emp.rating}/10`,
    status: emp.active ? "Active" : "Inactive"
}));
console.log(employeeCards);

// map with index — generate numbered badges
const badges = employees.map((emp, index) => ({
    badgeNumber: index + 1,
    name: emp.name,
    department: emp.department
}));
console.log(badges);

// --- filter — Select elements by condition ---
console.log("\n--- filter ---");

// Active employees only
const activeEmployees = employees.filter(emp => emp.active);
console.log(`Active employees: ${activeEmployees.length}`);
// 6 out of 8

// High performers (rating >= 8)
const topPerformers = employees.filter(emp => emp.rating >= 8);
console.log("Top performers:", topPerformers.map(emp => emp.name));
// ["Sara Ahmed", "Hina Malik", "Fatima Noor", "Ayesha Siddiqui"]

// Engineering department
const engineers = employees.filter(emp => emp.department === "Engineering");
console.log(`Engineers: ${engineers.length}`);

// Multiple conditions — active AND high salary
const seniorActiveStaff = employees.filter(emp => emp.active && emp.salary >= 80000);
console.log("Senior active staff:", seniorActiveStaff.map(emp => emp.name));

// --- find / findIndex — Locate first matching element ---
console.log("\n--- find / findIndex ---");

// find returns the FIRST matching element (or undefined)
const sara = employees.find(emp => emp.name === "Sara Ahmed");
console.log(sara);  // { name: "Sara Ahmed", department: "Engineering", ... }

// findIndex returns the INDEX of the first match (or -1)
const saraIndex = employees.findIndex(emp => emp.name === "Sara Ahmed");
console.log(`Sara is at index: ${saraIndex}`);  // 0

// find vs filter: find stops at the first match, filter checks all
const firstEngineer = employees.find(emp => emp.department === "Engineering");
const allEngineers = employees.filter(emp => emp.department === "Engineering");
console.log(`First engineer: ${firstEngineer.name}`);       // Sara Ahmed
console.log(`All engineers: ${allEngineers.length} found`);  // 4 found
```

> **Narration while typing:**
> "Notice the pattern: `forEach` is for doing things (side effects — logging, DOM updates). `map` is for transforming things (returns a new array). `filter` is for selecting things (returns a subset). `find` is for locating one thing (returns the first match or undefined)."
>
> "The callback to `map` receives three arguments: the current element, its index, and the full array. Most of the time you only need the element. Sometimes the index is useful — like generating badge numbers."
>
> "Key difference: `find` stops at the first match. `filter` checks every element. If you need just one, use `find` — it's more efficient."

---

#### Interactive Questions (Presentation/Verbal) — 57:00–60:00

**Question 1 — Predict Output:**

> "What does this return?"

```javascript
const nums = [1, 2, 3, 4, 5];
const result = nums.map(n => n * 2).filter(n => n > 6);
console.log(result);
```

> **Answer:** `[8, 10]` — `map` doubles each: `[2, 4, 6, 8, 10]`. Then `filter` keeps only values > 6: `[8, 10]`. This is method chaining — the output of `map` feeds directly into `filter`.
> **Teaching moment:** "This is the pattern you'll use in React to transform and filter data before rendering. Two methods, one line, no temporary variables."

---

**Question 2 — Concept Challenge:**

> "`forEach` or `map`? Which would you use to build an array of employee display names?"

> **Answer:** `map` — because you want a new array back. `forEach` returns `undefined`. Using `forEach` to push into an external array works but defeats the purpose. `map` is the declarative, clean approach.
> **Teaching moment:** "If you need a new array → `map`. If you're just doing something (logging, updating DOM) → `forEach`. This is the most common decision you'll make with HOFs."

---

**Question 3 — Quick-Fire Recall:**

> "I'll name a task, you name the method. Drop answers in chat:"
> - "Get only employees with salary > 70000" → `filter`
> - "Get every employee's name as an array" → `map`
> - "Find the first employee in Sales" → `find`
> - "Log each employee to the console" → `forEach`
> - "Get the index of the first inactive employee" → `findIndex`

> "If you got all five — the mental model is clicking. Each method has one job. Pick the right tool for the task."

---

#### Live Debugging (VS Code) — 60:00–61:00

> "Common mistake with `filter`:"

```javascript
// Bug: Using the wrong return type in filter
const highSalary = employees.filter(emp => {
    emp.salary >= 80000;  // Missing return!
});
console.log(highSalary);  // [] — empty array!

// The callback returns undefined (falsy) for every element
// Fix: add return or use implicit return
const highSalaryFixed = employees.filter(emp => emp.salary >= 80000);
```

> "Same bug as Part 1 — curly braces without `return`. In `filter`, the callback must return `true` or `false`. If it returns `undefined` (no return statement), every element is filtered OUT. You get an empty array with no error. Silent bugs are the worst kind."

---

#### Part Closing (Presentation) — 61:00–62:00

**Common Mistakes:**
- Using `forEach` when you need a result — use `map` instead
- Forgetting `return` in `filter`/`map` callbacks with curly braces
- Mutating the original array inside `map` or `filter` callbacks — these should be pure
- Using `find` when you need all matches (use `filter`) or vice versa
- Not understanding that `map` always returns an array of the same length; `filter` can return fewer elements

**Optimization Tips:**
- Use `find` instead of `filter()[0]` when you only need the first match — `find` stops early
- Chain methods left to right: filter first (reduce data), then map (transform remaining)
- Use implicit arrow function returns for simple callbacks — less code, fewer bugs

**Best Practices:**
- Keep callbacks pure — don't modify external variables inside `map`/`filter`
- Name complex callbacks: `const isActive = emp => emp.active; employees.filter(isActive)`
- Use destructuring in callbacks: `employees.map(({ name, department }) => ...)`

**Professional Insights:**
> "In production React codebases, `map` and `filter` appear in almost every component. `{users.map(user => <UserCard key={user.id} user={user} />)}` — that's how you render lists. Understanding these methods isn't optional for a modern frontend developer — it's table stakes."

---

### Part 4: `some`, `every`, `reduce`, `sort` & Chaining (62:00 – 80:00)

---

#### Background / Motivation (Presentation) — 62:00–65:00

> **Talking Points:**
> "We've covered the four most common HOFs: `forEach`, `map`, `filter`, `find`. Now let's complete the toolkit."
>
> "`some` and `every` are boolean tests — does any element pass? Do all elements pass? `reduce` is the most powerful — it accumulates an entire array into a single value. Totals, averages, grouping, flattening — `reduce` handles them all. And `sort` lets you order data with a custom comparator."
>
> "After this part, you'll know every higher-order array method that matters. And then we chain them together into data pipelines — the modern JavaScript way to process collections."

**Slide: The Complete HOF Toolkit**

| Method | Returns | Purpose |
|--------|---------|---------|
| `forEach` | `undefined` | Iterate (side effects only) |
| `map` | New array (same length) | Transform each element |
| `filter` | New array (≤ length) | Select by condition |
| `find` | Single element or `undefined` | First match |
| `findIndex` | Index or `-1` | First match position |
| `some` | `boolean` | At least one passes? |
| `every` | `boolean` | All pass? |
| `reduce` | Any value | Accumulate into single result |
| `sort` | Same array (mutated!) | Order elements |

> "Notice `sort` is the odd one out — it mutates the original array. Every other method here either returns a new array or a single value without touching the original. We'll handle that."

---

#### Illustrations / Animations (Presentation) — 65:00–66:00

**Slide: How `reduce` Works — Step by Step**

> ```
>   array.reduce((accumulator, current) => newAccumulator, initialValue)
>
>   [10, 20, 30].reduce((sum, num) => sum + num, 0)
>
>   Step 1: sum = 0,  num = 10 → 0 + 10  = 10
>   Step 2: sum = 10, num = 20 → 10 + 20 = 30
>   Step 3: sum = 30, num = 30 → 30 + 30 = 60
>
>   Result: 60
> ```
>
> "`reduce` carries a running result (the accumulator) through each element. The callback returns the new accumulator. The second argument (`0`) is the initial value — always provide it."

---

#### "Let's see in Code now" (VS Code) — 66:00–75:00

```javascript
// ============================================
// Lecture 11 — Part 4: some, every, reduce, sort & Chaining
// Employee Profile Generator
// ============================================

// Using the same employees array from Part 3

// --- some — Does at least one element pass the test? ---
console.log("\n--- some / every ---");

const hasTopPerformer = employees.some(emp => emp.rating === 10);
console.log(`Has a 10-rated employee: ${hasTopPerformer}`);  // true

const hasIntern = employees.some(emp => emp.department === "Internship");
console.log(`Has interns: ${hasIntern}`);  // false

// some stops as soon as it finds the first match — efficient!

// --- every — Do ALL elements pass the test? ---
const allActive = employees.every(emp => emp.active);
console.log(`All employees active: ${allActive}`);  // false

const allPaid = employees.every(emp => emp.salary > 0);
console.log(`All employees have salary: ${allPaid}`);  // true

// Use case: form validation — are ALL fields valid?
// const formValid = fields.every(field => field.isValid);

// --- reduce — Accumulate array into a single value ---
console.log("\n--- reduce ---");

// Total payroll
const totalPayroll = employees.reduce((total, emp) => total + emp.salary, 0);
console.log(`Total monthly payroll: Rs. ${totalPayroll.toLocaleString()}`);
// Rs. 645,000

// Average salary
const avgSalary = totalPayroll / employees.length;
console.log(`Average salary: Rs. ${avgSalary.toLocaleString()}`);

// Average rating
const avgRating = employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length;
console.log(`Average rating: ${avgRating.toFixed(1)}/10`);

// Count by department using reduce
const departmentCounts = employees.reduce((counts, emp) => {
    counts[emp.department] = (counts[emp.department] || 0) + 1;
    return counts;
}, {});
console.log("Department breakdown:", departmentCounts);
// { Engineering: 4, Marketing: 2, Sales: 2 }

// Highest salary using reduce
const topEarner = employees.reduce((highest, emp) =>
    emp.salary > highest.salary ? emp : highest
);
console.log(`Top earner: ${topEarner.name} — Rs. ${topEarner.salary.toLocaleString()}`);

// --- sort — Order elements (MUTATES the array!) ---
console.log("\n--- sort ---");

// IMPORTANT: sort mutates the original array!
// Always sort a COPY to avoid side effects
const sortedBySalary = [...employees].sort((a, b) => b.salary - a.salary);
console.log("By salary (highest first):");
sortedBySalary.forEach(emp =>
    console.log(`  ${emp.name}: Rs. ${emp.salary.toLocaleString()}`)
);

// Sort by rating (ascending)
const sortedByRating = [...employees].sort((a, b) => a.rating - b.rating);

// Sort by name (alphabetical)
const sortedByName = [...employees].sort((a, b) => a.name.localeCompare(b.name));
console.log("Alphabetical:", sortedByName.map(emp => emp.name));

// How sort comparator works:
// Return negative → a comes first
// Return positive → b comes first
// Return zero → keep original order

// --- Chaining HOFs — Data Pipelines ---
console.log("\n--- Chaining ---");

// Pipeline: Active engineers, sorted by rating, formatted as report
const engineeringReport = employees
    .filter(emp => emp.active && emp.department === "Engineering")
    .sort((a, b) => b.rating - a.rating)
    .map(emp => `${emp.name} — Rating: ${emp.rating}/10 — Rs. ${emp.salary.toLocaleString()}`);

console.log("Active Engineering Team (by rating):");
engineeringReport.forEach(line => console.log(`  ${line}`));

// Pipeline: Department salary report
const departmentSalaryReport = employees
    .filter(emp => emp.active)
    .reduce((report, emp) => {
        if (!report[emp.department]) {
            report[emp.department] = { total: 0, count: 0 };
        }
        report[emp.department].total += emp.salary;
        report[emp.department].count += 1;
        return report;
    }, {});

console.log("Department salary summary:", departmentSalaryReport);

// Pipeline: Top 3 performers with formatted output
const topThree = [...employees]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((emp, index) => `${index + 1}. ${emp.name} (${emp.rating}/10)`);

console.log("Top 3 performers:");
topThree.forEach(line => console.log(`  ${line}`));
```

> **Narration while typing:**
> "`some` and `every` are your boolean validators. `some` is like logical OR across an array — at least one must pass. `every` is logical AND — all must pass. Both short-circuit: `some` stops at the first `true`, `every` stops at the first `false`."
>
> "`reduce` is the Swiss Army knife — it can do anything `map` and `filter` can do, plus more. But use it only when `map` or `filter` won't work. `reduce` is harder to read, so reach for it last."
>
> "Critical: `sort` mutates the original array! Always sort a copy: `[...array].sort(...)`. The spread operator creates a shallow copy first. The comparator function returns a number: negative puts `a` first, positive puts `b` first, zero keeps the order."
>
> "Chaining is the payoff. Filter → sort → map → forEach. Each method returns a result that feeds into the next. Read it like a recipe: start with all employees, keep only active engineers, sort by rating, format as strings, print each one."

---

#### Interactive Questions (Presentation/Verbal) — 75:00–78:00

**Question 1 — Predict Output:**

> "What's the result?"

```javascript
const scores = [72, 85, 91, 68, 95, 88];
const allPassing = scores.every(score => score >= 70);
const anyPerfect = scores.some(score => score === 100);

console.log(allPassing, anyPerfect);
```

> **Answer:** `false, false` — Not all scores are ≥ 70 (68 fails), and no score is exactly 100.
> **Teaching moment:** "`every` stops at 68 — it found one failure and immediately returns `false`. Efficient."

---

**Question 2 — Predict Output:**

> "What does this reduce produce?"

```javascript
const words = ["Hello", "World", "From", "NexusBerry"];
const sentence = words.reduce((result, word) => result + " " + word);
console.log(sentence);
```

> **Answer:** `"Hello World From NexusBerry"` — Without an initial value, `reduce` uses the first element (`"Hello"`) as the starting accumulator and begins iteration from the second element. Each step concatenates a space and the next word.
> **Teaching moment:** "No initial value means the first element is the starting accumulator. This works for some cases but can be tricky — I recommend always providing an initial value for clarity."

---

**Question 3 — Spot the Error:**

> "What's wrong with this code?"

```javascript
const names = ["Sara", "Ali", "Hina"];
names.sort();
console.log(names);
```

> **Answer:** The sort works correctly for strings — alphabetical order. But the bug is that `names` has been mutated! If `names` was used elsewhere, it's now changed. Should be: `const sorted = [...names].sort()`. Always copy before sorting if you need the original intact.
> **Teaching moment:** "`sort` is the black sheep of array methods. Every other HOF we learned returns a new array without touching the original. `sort` mutates in-place. In a React state update, mutating state directly breaks re-rendering. Always sort a copy."

---

#### Live Debugging (VS Code) — 78:00–79:00

> "The most infamous `sort` bug in JavaScript:"

```javascript
// Bug: Sorting numbers without a comparator
const prices = [200, 30, 1000, 5, 80];
console.log(prices.sort());
// [1000, 200, 30, 5, 80]  ← WRONG! Sorted as strings!

// Default sort converts to strings: "1000" < "200" < "30" < "5" < "80"
// Fix: always provide a numeric comparator
console.log([...prices].sort((a, b) => a - b));
// [5, 30, 80, 200, 1000]  ← Correct!
```

> "JavaScript's `sort` without a comparator converts everything to strings and sorts lexicographically. `'1000'` comes before `'200'` because `'1'` < `'2'`. This bug has been in JavaScript since 1995 and will never be fixed. The rule: always provide a comparator for numbers."

---

#### Part Closing (Presentation) — 79:00–80:00

**Common Mistakes:**
- Using `sort()` without a comparator for numbers — lexicographic sort by default
- Forgetting that `sort()` mutates the original array — always sort a copy with `[...arr].sort()`
- Forgetting the initial value in `reduce` — can lead to unexpected results with empty arrays
- Overusing `reduce` — if `map` or `filter` works, use them instead (more readable)
- Putting `sort` before `filter` in a chain — filter first to reduce the dataset, then sort

**Optimization Tips:**
- Filter before sorting — sort a smaller dataset
- Use `some`/`every` instead of `filter().length > 0` or `filter().length === arr.length`
- For finding the max/min, `reduce` is more readable than `sort()[0]` and doesn't require a full sort
- Short-circuit: `some` stops at first `true`, `every` stops at first `false`

**Best Practices:**
- Always provide a comparator to `sort()`
- Always spread before sorting: `[...arr].sort(...)` preserves the original
- Provide an initial value to `reduce()` — always
- Chain in logical order: filter → sort → map → forEach
- Use `map` + `filter` instead of `reduce` when possible — readability wins

**Professional Insights:**
> "Here's something YouTube tutorials skip: `reduce` is powerful but overused. I've seen developers write 20-line `reduce` calls that should have been a simple `filter` plus `map`. The measure of a senior developer isn't using the most powerful tool — it's using the simplest tool that gets the job done. Use `reduce` for totals, grouping, and flattening. Use `map`/`filter` for everything else."

---

### Part 5: TypeScript Functions — Types, Generics & Safety (80:00 – 86:00)

---

#### Background / Motivation (Presentation) — 80:00–82:00

> **Talking Points:**
> "We've written functions, closures, and higher-order methods — all in JavaScript. Now let's add TypeScript to make them safer."
>
> "TypeScript for functions means: parameter types, return types, optional parameters, and a first look at generics. Generics are how TypeScript makes functions work with any type while still being type-safe — and they're how React's `useState<T>` works."

**Slide: TypeScript Function Signatures**

> ```typescript
>   // Parameter types + return type
>   function add(a: number, b: number): number {
>       return a + b;
>   }
>
>   // Arrow function with types
>   const greet = (name: string): string => `Hello, ${name}!`;
>
>   // Optional parameter (must come after required ones)
>   const createTag = (name: string, color?: string): string => {
>       return color ? `[${color}] ${name}` : name;
>   };
>
>   // Default parameter (type inferred from default value)
>   const formatSalary = (amount: number, currency = "PKR"): string => {
>       return `${currency} ${amount.toLocaleString()}`;
>   };
> ```

---

#### "Let's see in Code now" (VS Code) — 82:00–85:00

```typescript
// ============================================
// Lecture 11 — Part 5: TypeScript Functions
// Employee Profile Generator
// ============================================

// --- Basic function types ---
function calculateBonus(salary: number, rating: number): number {
    return salary * (rating / 10);
}

// TypeScript catches errors at compile time:
// calculateBonus("50000", 8);  // ❌ Error: string is not assignable to number
// calculateBonus(50000);       // ❌ Error: expected 2 arguments, got 1

// --- Arrow function with types ---
const formatEmployee = (name: string, dept: string): string => {
    return `${name} (${dept})`;
};

// --- Optional & default parameters ---
const createProfile = (
    name: string,
    role: string = "Junior Developer",
    department?: string
): { name: string; role: string; department: string } => {
    return {
        name,
        role,
        department: department ?? "Unassigned"
    };
};

console.log(createProfile("Sara Ahmed"));
console.log(createProfile("Ali Khan", "Senior Engineer", "Engineering"));

// --- Typing callback functions ---
// Define the shape of a callback
type EmployeeFilter = (emp: { name: string; salary: number }) => boolean;

const filterEmployees = (
    employees: { name: string; salary: number }[],
    predicate: EmployeeFilter
): { name: string; salary: number }[] => {
    return employees.filter(predicate);
};

// --- Generics — Functions that work with any type ---
// The T is a type variable — it's filled in when you call the function
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

const firstNumber = getFirst([10, 20, 30]);        // TypeScript knows: number
const firstString = getFirst(["hello", "world"]);  // TypeScript knows: string

// Generic filter function
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate);
}

// TypeScript infers T from usage — no manual annotation needed
const highSalary = filterItems(
    [{ name: "Sara", salary: 95000 }, { name: "Ali", salary: 72000 }],
    emp => emp.salary > 80000
);
// TypeScript knows highSalary is { name: string; salary: number }[]

// --- Preview: This is how React useState works! ---
// function useState<T>(initial: T): [T, (newValue: T) => void]
// const [count, setCount] = useState<number>(0);
// const [name, setName] = useState<string>("");
```

> **Narration while typing:**
> "TypeScript function types catch entire categories of bugs at compile time. Passing a string where a number is expected? Caught. Forgetting a required argument? Caught. Returning the wrong type? Caught."
>
> "Generics are the big concept here. `getFirst<T>` says: 'I work with arrays of any type T, and I return that same type T.' When you call `getFirst([10, 20, 30])`, TypeScript fills in T = number. When you call `getFirst(["hello"])`, T = string. One function, any type, full type safety."
>
> "This is exactly how React's `useState` works. `useState<number>(0)` says: this state is a number. The setter only accepts numbers. TypeScript enforces it everywhere you use that state."

---

#### Interactive Questions (Presentation/Verbal) — 85:00–85:30

**Question 1 — Spot the Error:**

> "What TypeScript error does this produce?"

```typescript
function multiply(a: number, b: number): number {
    return a * b;
}

const result = multiply(5, "3");
```

> **Answer:** `Argument of type 'string' is not assignable to parameter of type 'number'`. TypeScript won't let you pass `"3"` where `number` is expected — even though JavaScript would coerce it and give you `15`. TypeScript is strict, and that strictness prevents real bugs.

---

#### Part Closing (Presentation) — 85:30–86:00

**Common Mistakes:**
- Forgetting return types — TypeScript can infer them, but explicit types serve as documentation
- Using `any` to bypass type errors — defeats the purpose of TypeScript
- Putting optional parameters before required ones — optional params must come last
- Not providing generic types when they can't be inferred — `useState()` vs `useState<string>("")`

**Best Practices:**
- Always type function parameters — return types can often be inferred
- Use generics when a function works with multiple types — avoid `any`
- Type your callbacks: `(item: T) => boolean` is clearer than `Function`
- Start simple — you don't need complex generics yet; basic `<T>` covers most cases

**Professional Insights:**
> "Generics feel abstract now. In Module 3, you'll use them every day: `useState<string>`, `useRef<HTMLInputElement>`, `Array<User>`. Understanding generics now means React's type system feels natural instead of magical. You're investing now for a smoother React experience later."

---

### Lecture Ending (86:00 – 90:00)

---

#### Cheat Sheet Slides (Presentation) — 86:00–87:30

> "Let me walk you through the key reference points from today — these are in your cheatsheet file."

**Slide: Function Syntax**
- Declaration: `function name() {}` — hoisted, named in stack traces
- Expression: `const name = function() {}` — not hoisted
- Arrow: `const name = () => {}` — concise, lexical `this`, not hoisted

**Slide: Scope & Closures**
- Global → Function → Block scope (scope chain looks upward)
- Closures: inner functions remember their enclosing scope
- Pure functions: same input → same output, no side effects

**Slide: Higher-Order Array Methods**

| Need | Use |
|------|-----|
| Iterate (side effects) | `forEach` |
| Transform → new array | `map` |
| Select subset | `filter` |
| Find one element | `find` / `findIndex` |
| Test any/all | `some` / `every` |
| Accumulate to one value | `reduce` |
| Order elements | `[...arr].sort(comparator)` |

**Slide: Chaining Pattern**
```
data
  .filter(condition)    // narrow down
  .sort(comparator)     // order
  .map(transform)       // reshape
  .forEach(action)      // output
```

> "The full cheat sheet is shared after class. It covers every function syntax, every HOF, and a decision guide for choosing the right method."

---

#### Assignment Introduction (Presentation) — 87:30–89:00

> "Your assignment for this lecture: build a complete Employee Profile Generator."

**Assignment: Employee Profile Generator (Lecture 11)**

Requirements:
1. Create a `generateId` closure factory that produces sequential IDs with a department prefix
2. Write at least 3 pure functions for data formatting (name, salary, rating display)
3. Create an array of at least 8 employee objects with properties: name, department, salary, rating, active, joinDate
4. Use `forEach` to print a formatted employee directory
5. Use `map` to create display cards with transformed data
6. Use `filter` to create at least 3 different filtered views (by department, by rating, by active status)
7. Use `find` to look up a specific employee by name
8. Use `some` and `every` for at least 2 validation checks
9. Use `reduce` to calculate at least 2 aggregate values (total payroll, average rating, or department breakdown)
10. Use `sort` (on a copy!) with a custom comparator for at least 2 different orderings
11. Build at least 2 chained pipelines combining filter + sort + map

> "Submit via Google Classroom by the next session. The grading criteria are in the `assignment.md` file."

---

#### Q&A — 89:00–89:30

> "Any questions before we close? Today was our biggest lecture yet — functions, scope, closures, pure functions, callbacks, and seven higher-order array methods. That's a lot. The recording, cheatsheet, and code files are your reference. Practice the HOFs — `map`, `filter`, and `reduce` are your daily tools from now on."

*Common questions to anticipate:*
- "When do I use `reduce` vs a simple loop?" → Use `reduce` for accumulating to a single value (totals, grouping). If `map` or `filter` can do it, prefer them — they're more readable. Use a loop only if you need `break`/`continue`.
- "What's the difference between a closure and a regular function?" → Every function in JavaScript is technically a closure. But we use the term specifically for functions that reference variables from an outer scope after that scope has finished executing.
- "Do I need to memorize all these array methods?" → Don't memorize — understand the pattern. `map` transforms, `filter` selects, `find` locates, `reduce` accumulates. Practice and it becomes muscle memory.
- "Will we use `sort` in React?" → Constantly. Sorting lists, tables, search results. Always sort a copy of state — never mutate state directly.

---

#### Next Lecture Teaser — 89:30–90:00

> *Show the "Next Lecture" closing slide.*
>
> "In Lecture 12, we tackle **Data Transformation — Destructuring, Spread & Object Mastery**. You'll learn to pull values out of objects and arrays with destructuring — `const { name, salary } = employee`. You'll merge and clone data with spread — `{ ...employee, role: 'Manager' }`. And you'll combine these with the HOFs you learned today to build real data transformation pipelines. The `map` and `filter` callbacks you wrote today become even more elegant when you destructure parameters directly: `employees.filter(({ active }) => active)`. That's next. See you in Lecture 12."

---

## Phase 2: Share After Lecture

- [ ] Upload video recording to Google Classroom
- [ ] Push `code/` folder (with `profiles.js`) to course repo
- [ ] Post `assignment.md` to Google Classroom
- [ ] Share `presentation/` folder (HTML export or direct link)
- [ ] Post `cheatsheet.md` to Google Classroom
- [ ] Upload `quiz.md` to online portal — students should attempt before Lecture 12

---

## Interactive Questions Summary

| Part | Type | Topic | Purpose |
|------|------|-------|---------|
| Part 1 | Predict Output | Hoisted function declaration called before definition → `12` | Teach hoisting difference between declaration and expression |
| Part 1 | Spot the Error | Arrow function with curly braces missing `return` → `undefined` | Highlight #1 arrow function bug: implicit vs explicit return |
| Part 1 | Concept Challenge | When to use declaration vs arrow function | Build mental model for syntax selection |
| Part 2 | Predict Output | Two closures from `createGreeter` factory → independent greetings | Demonstrate that each closure captures its own scope |
| Part 2 | Predict Output | `let` in `for` loop with closures → `0, 1, 2` (not `3, 3, 3`) | Classic closure + loop question; reinforce why `let` > `var` |
| Part 2 | Concept Challenge | Is `getEmployeeLabel(employee)` pure? → Yes | Teach purity test: depends only on parameters, no side effects |
| Part 3 | Predict Output | `map` then `filter` chain → `[8, 10]` | Introduce method chaining concept |
| Part 3 | Concept Challenge | `forEach` vs `map` for building display names → `map` | Reinforce: need result = `map`, need side effect = `forEach` |
| Part 3 | Quick-Fire Recall | Name the method for 5 tasks (filter, map, find, forEach, findIndex) | Solidify mental mapping of task → method |
| Part 4 | Predict Output | `every` + `some` on score array → `false, false` | Practice boolean array testing methods |
| Part 4 | Predict Output | `reduce` without initial value on word array → concatenated sentence | Teach reduce behavior without initial value |
| Part 4 | Spot the Error | `sort` mutates original array → should spread first | Highlight sort's mutation side effect |
| Part 5 | Spot the Error | `multiply(5, "3")` TypeScript error → type mismatch | Show TypeScript catching runtime bugs at compile time |

---

## Teaching Tips Summary

| Moment | Tip Type | Purpose |
|--------|----------|---------|
| Opening — vending machine analogy | Analogy | Make functions concrete before any syntax |
| Hoisting comparison — declaration vs expression | Live comparison | Show consequences of hoisting — not just theory |
| Arrow function `({ })` return bug | Bug demo | High-impact "aha" — curly braces vs parentheses |
| Closure counter with independent instances | Live demo | Prove that each closure has its own private state |
| `var` vs `let` in loop closures | Classic interview question | Historical context + practical consequence |
| `for` loop vs `map` side-by-side | Before/after comparison | Motivate HOFs by showing the cleaner alternative |
| Quick-fire recall (5 methods) | Rapid engagement | Lock in the mental model: task → method mapping |
| `sort` mutation bug | Production war story | Connect to React state mutation rule |
| Generics → React `useState<T>` preview | Forward reference | Plant seed for Module 3 — generics become daily tools |
| Closing teaser — destructuring in callbacks | Anticipation building | Connect today's HOFs to next lecture's destructuring |

---

## Emergency Recovery

| Problem | Solution |
|---------|----------|
| reveal.js CDN fails | Open presentation as local file or switch to VS Code full-screen + verbal explanation |
| VS Code terminal not working | Use Chrome DevTools Console tab — paste code there and run it live |
| Running behind schedule | Shorten Part 5 TypeScript to slides only (skip live coding). Condense Part 4 sort examples. |
| Running ahead of schedule | Add bonus: `flatMap` demo, or let students suggest data transformations and code them live |
| Student confused by closures | Draw the "backpack" analogy: the inner function carries a backpack with all the variables from its creation scope |
| Student confused by `reduce` | Walk through step-by-step on whiteboard/chat: show accumulator value at each iteration |
| `sort` comparator confusion | Use the "subtract" mnemonic: `a - b` for ascending, `b - a` for descending. That's it. |

---

## Conversion Phrases (Sprinkle Throughout)

- *"This is what YouTube tutorials skip — they show you `map` syntax but not how to chain five methods into a data pipeline. Knowing the syntax is step one. Knowing which method to reach for in each situation — that's the skill."*
- *"In 25 years of production development, the codebases that were easiest to maintain had small, pure functions with clear names. Not clever one-liners. Not 200-line functions. Small, named, testable blocks of logic."*
- *"Closures are how React works. `useState`, `useEffect`, `useCallback` — all closures. When you understand closures, React hooks stop being magic and start being obvious."*
- *"When we get to React in Module 3, every list component you build will use `map`. Every search feature will use `filter`. Every dashboard will use `reduce`. These aren't JavaScript curiosities — they're your daily tools."*
- *"Generics look intimidating today. But `useState<string>('')` is a generic. You'll write it hundreds of times. Starting to understand generics now means Module 3 goes smoothly instead of being a wall."*

---

## Never Say
- "This is easy/simple" → Say **"foundational"**
- "You should know this" → Say **"Let me show you"**
- "Obviously..." → Just explain it
- "As I said before..." → Repeat it fresh
- "Let's move on quickly" → Just move
