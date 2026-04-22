# Functions, Closures & Higher-Order Array Methods Cheatsheet
<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

Quick reference for all function patterns and higher-order array methods covered in Lecture 11.

---

## Function Syntax — Three Ways to Write Functions

```javascript
// Function Declaration — hoisted, named in stack traces
function formatEmployeeName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

// Function Expression — NOT hoisted
const calculateSalary = function(basePay, hoursWorked) {
    return basePay * hoursWorked;
};

// Arrow Function — concise, implicit return for single expressions
const getFullTitle = (name, department) => `${name} — ${department}`;

// Arrow with body (multiple lines → curly braces + explicit return)
const generateEmployeeId = (department, index) => {
    const prefix = department.substring(0, 3).toUpperCase();
    const paddedIndex = String(index).padStart(4, "0");
    return `${prefix}-${paddedIndex}`;
};
```

| Syntax | Hoisted? | Best For |
|--------|----------|----------|
| `function name() {}` | Yes | Top-level utility functions |
| `const name = function() {}` | No | Legacy code, named expressions |
| `const name = () => {}` | No | Callbacks, short transforms, React |

> **Pro Tip:** Use function declarations for standalone utilities (hoisted, named in error stack traces). Use arrow functions for callbacks and anything inside React components.

---

## Parameters — Defaults & Rest

```javascript
// Default Parameters — eliminate manual undefined checks
const createProfile = (name, role = "Junior Developer", department = "Unassigned") => {
    return { name, role, department };
};

// Rest Parameters — collect remaining arguments into an array
const logActivity = (employeeName, ...activities) => {
    console.log(`${employeeName}'s activities:`);
    for (const activity of activities) {
        console.log(`  - ${activity}`);
    }
};

logActivity("Sara", "Code Review", "Sprint Planning", "Deployment");
```

> **Pro Tip:** Rest parameters (`...args`) must always be the last parameter. They replace the old `arguments` object with a real array.

---

## Scope — Where Variables Live

```javascript
const companyName = "NexusBerry";       // Global scope — visible everywhere

function createDepartmentReport(deptName) {
    const reportTitle = `${deptName} Report`;  // Function scope — this function only

    if (deptName === "Engineering") {
        const bonus = 15;               // Block scope — this if block only
        console.log(`${reportTitle} — Bonus: ${bonus}%`);
    }

    // console.log(bonus);  // ❌ ReferenceError — bonus is block-scoped
    console.log(companyName);  // ✅ Global scope (scope chain lookup)
}
```

| Scope | Created By | Visibility |
|-------|-----------|------------|
| Global | Top-level code | Everywhere |
| Function | `function` keyword | Inside that function |
| Block | `{ }` with `let`/`const` | Inside that block |

Scope chain looks **upward only** — inner can see outer, never the reverse.

---

## Closures — Functions That Remember

A closure is a function that retains access to variables from its enclosing scope, even after that scope has finished executing.

```javascript
// Factory pattern: configure once, use many times
function createIdGenerator(prefix) {
    let nextId = 1;  // This variable "lives on" in the closure

    return function(name) {
        const id = `${prefix}-${String(nextId).padStart(4, "0")}`;
        nextId++;
        return { id, name };
    };
}

const generateEngineerId = createIdGenerator("ENG");
console.log(generateEngineerId("Sara Ahmed"));   // { id: "ENG-0001", name: "Sara Ahmed" }
console.log(generateEngineerId("Ali Khan"));     // { id: "ENG-0002", name: "Ali Khan" }
```

> **Pro Tip:** Closures capture **references**, not values. If the outer variable changes, the closure sees the updated value. This causes React's "stale closure" bug when dependency arrays are incomplete.

---

## Pure Functions — Predictable & Testable

```javascript
// PURE — same input → same output, no side effects
function calculateAnnualSalary(monthlySalary) {
    return monthlySalary * 12;
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

// IMPURE — depends on external state
let exchangeRate = 278;
function convertToUSD(pkrAmount) {
    return pkrAmount / exchangeRate;  // Result changes if exchangeRate changes!
}

// FIXED — pass rate as parameter
function convertCurrency(amount, rate) {
    return amount / rate;
}
```

**Purity test:** Does the function depend on anything other than its arguments? If yes → impure.

---

## Higher-Order Array Methods

### `forEach` — Iterate (Side Effects Only)

```javascript
employees.forEach((employee, index) => {
    console.log(`${index + 1}. ${employee.name} (${employee.department})`);
});
// Returns undefined — use for logging, DOM updates only
```

### `map` — Transform Each Element → New Array

```javascript
const employeeNames = employees.map(emp => emp.name);

const employeeCards = employees.map(emp => ({
    displayName: emp.name.toUpperCase(),
    label: `${emp.department} — Rating: ${emp.rating}/10`,
    status: emp.active ? "Active" : "Inactive"
}));
```

### `filter` — Select by Condition → New Array

```javascript
const activeEmployees = employees.filter(emp => emp.active);
const topPerformers = employees.filter(emp => emp.rating >= 8);
const seniorActive = employees.filter(emp => emp.active && emp.salary >= 80000);
```

### `find` / `findIndex` — Locate First Match

```javascript
const sara = employees.find(emp => emp.name === "Sara Ahmed");
// Returns the object or undefined

const saraIndex = employees.findIndex(emp => emp.name === "Sara Ahmed");
// Returns the index or -1
```

### `some` / `every` — Boolean Tests

```javascript
const hasTopPerformer = employees.some(emp => emp.rating === 10);   // true
const allActive = employees.every(emp => emp.active);               // false
```

### `reduce` — Accumulate → Single Value

```javascript
const totalPayroll = employees.reduce((total, emp) => total + emp.salary, 0);

const departmentCounts = employees.reduce((counts, emp) => {
    counts[emp.department] = (counts[emp.department] || 0) + 1;
    return counts;
}, {});
// { Engineering: 4, Marketing: 2, Sales: 2 }
```

### `sort` — Order Elements (Mutates!)

```javascript
// ALWAYS sort a copy — sort mutates the original!
const sortedBySalary = [...employees].sort((a, b) => b.salary - a.salary);
const sortedByName = [...employees].sort((a, b) => a.name.localeCompare(b.name));

// Comparator: negative → a first, positive → b first, zero → keep order
```

> **Pro Tip:** `sort()` without a comparator converts to strings and sorts lexicographically. `[200, 30, 1000].sort()` → `[1000, 200, 30]`. Always provide a comparator for numbers.

---

## Method Chaining — Data Pipelines

```javascript
// Filter → Sort → Map → forEach
const engineeringReport = employees
    .filter(emp => emp.active && emp.department === "Engineering")
    .sort((a, b) => b.rating - a.rating)
    .map(emp => `${emp.name} — Rating: ${emp.rating}/10 — Rs. ${emp.salary.toLocaleString()}`);

// Top 3 performers
const topThree = [...employees]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((emp, index) => `${index + 1}. ${emp.name} (${emp.rating}/10)`);
```

**Chain order:** `filter` first (reduce data) → `sort` (order remaining) → `map` (transform) → `forEach` (output)

---

## Quick Decision Guide

| What You Need | Use This |
|---------------|----------|
| Iterate for side effects | `forEach` |
| Transform → new array | `map` |
| Select subset → new array | `filter` |
| Find one element | `find` |
| Find one element's index | `findIndex` |
| Does any element pass? | `some` |
| Do all elements pass? | `every` |
| Accumulate to single value | `reduce` |
| Order elements | `[...arr].sort(comparator)` |
| Need result array → | **Never** `forEach` |
| Need just one match → | `find` (not `filter()[0]`) |

---

## TypeScript Functions

```typescript
// Parameter types + return type
function calculateBonus(salary: number, rating: number): number {
    return salary * (rating / 10);
}

// Arrow function with types
const formatEmployee = (name: string, dept: string): string => {
    return `${name} (${dept})`;
};

// Optional & default parameters
const createProfile = (
    name: string,
    role: string = "Junior Developer",
    department?: string
): { name: string; role: string; department: string } => {
    return { name, role, department: department ?? "Unassigned" };
};

// Generics — functions that work with any type
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}
const firstNum = getFirst([10, 20, 30]);       // TypeScript knows: number
const firstStr = getFirst(["hello", "world"]); // TypeScript knows: string
```

> **Pro Tip:** Generics are how React's `useState<T>` works. `useState<number>(0)` means the state is a number and the setter only accepts numbers. Understanding generics now makes React smoother later.

---

## Common Mistakes to Avoid

### 1. Missing `return` in Arrow Functions with Curly Braces
```javascript
/* WRONG */
const greet = (name) => {
    `Hello, ${name}!`
};
greet("Sara");  // undefined

/* CORRECT */
const greet = (name) => `Hello, ${name}!`;
// OR
const greet = (name) => {
    return `Hello, ${name}!`;
};
```
Curly braces require explicit `return`. No braces = implicit return.

### 2. Returning Object Literal Without Parentheses
```javascript
/* WRONG */
const createEmployee = (name, role) => { name: name, role: role };
// JavaScript thinks {} is a code block, returns undefined

/* CORRECT */
const createEmployee = (name, role) => ({ name: name, role: role });
// Parentheses tell JS this is an object expression
```

### 3. Using `forEach` to Build an Array
```javascript
/* WRONG */
const names = [];
employees.forEach(emp => names.push(emp.name));

/* CORRECT */
const names = employees.map(emp => emp.name);
```
`map` is the declarative approach — returns the new array directly.

### 4. Sorting Without a Copy
```javascript
/* WRONG */
employees.sort((a, b) => b.salary - a.salary);
// Mutates the original array!

/* CORRECT */
const sorted = [...employees].sort((a, b) => b.salary - a.salary);
// Spread creates a copy first
```

### 5. Sorting Numbers Without a Comparator
```javascript
/* WRONG */
[200, 30, 1000].sort();
// [1000, 200, 30] — lexicographic (string) sort!

/* CORRECT */
[200, 30, 1000].sort((a, b) => a - b);
// [30, 200, 1000] — numeric ascending
```

### 6. Using `filter()[0]` Instead of `find`
```javascript
/* WRONG */
const sara = employees.filter(emp => emp.name === "Sara Ahmed")[0];
// Checks every element, creates a full array, then takes the first

/* CORRECT */
const sara = employees.find(emp => emp.name === "Sara Ahmed");
// Stops at the first match — more efficient
```

---

## VS Code Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + D` | Select next occurrence of current word |
| `Ctrl + /` | Toggle line comment |
| `Alt + ↑/↓` | Move line up/down |
| `Ctrl + Shift + K` | Delete entire line |
| `Ctrl + Space` | Trigger IntelliSense (autocomplete) |
| `F2` | Rename symbol across file |
| `Ctrl + Shift + L` | Select all occurrences of current selection |

---

## What's Next?

In **Lecture 12: Data Transformation — Destructuring, Spread & Object Mastery**, you'll learn:
- Object & array destructuring — `const { name, salary } = employee`
- Spread operator — `{ ...employee, role: 'Manager' }`
- Rest operator in destructuring — `const { name, ...rest } = employee`
- Combining destructuring + spread + HOFs for data transformation pipelines
- Destructuring in function parameters: `employees.filter(({ active }) => active)`
- TypeScript interfaces and type aliases for objects

---

*Keep this cheatsheet handy while working on your assignment!*
