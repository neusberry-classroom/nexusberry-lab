# Data Transformation — Destructuring, Spread & Object Mastery Cheatsheet
<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

Quick reference for all data transformation patterns covered in Lecture 12.

---

## Property Shorthand & Computed Property Names

When a variable name matches the key, skip the repetition:

```javascript
const name = "TechCorp";
const industry = "Technology";
const employees = 250;

// Property shorthand
const company = { name, industry, employees };
// Same as: { name: name, industry: industry, employees: employees }
```

Dynamic keys with computed property names:

```javascript
const field = "revenue";
const year = 2025;

const report = {
    [field]: 5000000,              // key is "revenue"
    [`${field}_${year}`]: 5000000, // key is "revenue_2025"
    [field + "Growth"]: 12.5       // key is "revenueGrowth"
};
```

> **Pro Tip:** Property shorthand is the inverse of destructuring — destructuring extracts, shorthand constructs. Master both and you can reshape any data.

---

## Object Destructuring

Extract properties into variables in one statement. Matches by **property name**.

```javascript
const employee = {
    firstName: "Sara",
    role: "Senior Engineer",
    department: "Engineering",
    salary: 95000
};

// Basic extraction
const { firstName, role, department } = employee;

// Renaming — creates variable "jobTitle", NOT "role"
const { role: jobTitle, salary: annualPay } = employee;

// Default values — for properties that may not exist
const { team = "Unassigned", office = "HQ" } = employee;
```

> **Pro Tip:** After renaming (`role: jobTitle`), only `jobTitle` exists as a variable — using `role` would throw a ReferenceError.

---

## Array Destructuring

Extract elements by **position** (not by name).

```javascript
const scores = [95, 88, 72, 64, 91];

// Basic extraction
const [first, second, third] = scores;

// Skip elements with commas
const [, , thirdScore, , fifthScore] = scores;

// Swap variables — no temp variable needed!
let a = 10;
let b = 20;
[a, b] = [b, a];  // a → 20, b → 10
```

---

## Nested Destructuring

Reach into deeply nested objects in one statement:

```javascript
const record = {
    personal: {
        name: "Ali Khan",
        address: { city: "Lahore", country: "Pakistan" }
    },
    professional: {
        title: "Lead Developer",
        skills: ["React", "Node.js", "TypeScript"]
    }
};

const {
    personal: { name, address: { city } },
    professional: { title, skills: [primarySkill] }
} = record;
// name → "Ali Khan", city → "Lahore", primarySkill → "React"
// Note: `personal` and `professional` are NOT variables — they're paths
```

**Defensive destructuring** — provide defaults at each level:

```javascript
const { settings: { theme } = {} } = user;
// If settings is undefined, falls back to {}, then theme is undefined (no crash)
```

> **Pro Tip:** Keep nested destructuring to 2 levels max. Beyond that, extract intermediate variables for readability.

---

## Destructuring in Function Parameters

Self-documenting function signatures:

```javascript
function formatEmployee({ name, role, department, level = "Junior" }) {
    return `${name} | ${role} | ${department} (${level})`;
}

const emp = { name: "Hira", role: "Developer", department: "Frontend", level: "Senior" };
formatEmployee(emp);  // "Hira | Developer | Frontend (Senior)"
```

> **Pro Tip:** This is how every React component receives props — destructured right in the parameter list.

---

## Spread Operator (`...`) — Copying & Merging

Spread **expands** elements. Creates a new array or object (shallow copy).

```javascript
// Copy arrays
const teamCopy = [...originalTeam];

// Merge arrays
const fullStack = [...frontend, ...backend];

// Copy objects
const newEmployee = { ...baseEmployee, name: "Usman", level: "Senior" };
// Last value wins — "level" is overridden

// Merge objects — defaults pattern
const config = { ...defaults, ...userPrefs };
// User preferences override defaults
```

**Override order matters:** `{ ...defaults, ...overrides }` — put defaults first.

---

## Rest Operator (`...`) — Collecting Remaining

Rest **collects** remaining elements. Must be last in destructuring.

```javascript
// Rest in objects — strip sensitive fields
const { id, salary, ...publicInfo } = fullEmployee;
// publicInfo has everything EXCEPT id and salary

// Rest in arrays — separate first items from the rest
const [gold, silver, bronze, ...others] = rankings;

// Rest in function parameters
function createTeam(lead, ...members) {
    return { lead, members, size: members.length + 1 };
}
```

> **Pro Tip:** Use rest to strip sensitive fields before sending data: `const { password, ...safeUser } = user;`

---

## Shallow vs Deep Copy

| Method | Depth | Handles Functions | Handles Date/Map/Set | Circular Refs |
|--------|-------|-------------------|----------------------|---------------|
| Spread `{ ...obj }` | Shallow (1 level) | N/A (copies ref) | N/A (copies ref) | ❌ |
| `Object.assign()` | Shallow (1 level) | N/A (copies ref) | N/A (copies ref) | ❌ |
| `JSON.parse(JSON.stringify())` | Deep | ❌ Drops them | ❌ Converts/drops | ❌ Throws |
| `structuredClone()` | Deep | ❌ Throws | ✅ Preserves | ✅ Handles |

```javascript
// Shallow — nested references are SHARED
const copy = { ...department };
copy.members.push("New");  // MUTATES original.members!

// Deep — completely independent
const deepCopy = structuredClone(department);
deepCopy.members.push("New");  // Original is safe ✅
```

> **Pro Tip:** Always use `structuredClone()` for deep copies. It's the modern standard, handles more types than JSON clone, and is available in all modern environments.

---

## Immutability — `Object.freeze` & `Object.seal`

| Feature | `Object.freeze` | `Object.seal` |
|---------|-----------------|---------------|
| Add new properties | ❌ | ❌ |
| Delete properties | ❌ | ❌ |
| Modify existing values | ❌ | ✅ |
| Use case | Constants, config | Schemas, templates |

```javascript
const APP_CONFIG = Object.freeze({
    apiUrl: "https://api.techcorp.com",
    version: "2.1.0",
    features: ["dashboard", "reports"]
});

APP_CONFIG.apiUrl = "hacked";      // Silently fails — unchanged
APP_CONFIG.features.push("admin"); // ⚠️ WORKS — freeze is SHALLOW!
```

> **Pro Tip:** `Object.freeze` is shallow — nested objects and arrays can still be mutated. For truly immutable configs, freeze at every level or use `structuredClone` before modifying nested data.

---

## Object Static Methods

```javascript
const employee = { name: "Hira", role: "Designer", salary: 85000 };

Object.keys(employee);     // ["name", "role", "salary"]
Object.values(employee);   // ["Hira", "Designer", 85000]
Object.entries(employee);  // [["name","Hira"], ["role","Designer"], ["salary",85000]]
```

### The Transformation Pipeline: `entries → HOFs → fromEntries`

```javascript
const team = { sara: 95000, ali: 88000, zara: 92000, hassan: 78000 };

// Give everyone a 10% raise
const raised = Object.fromEntries(
    Object.entries(team).map(([name, salary]) => [name, salary * 1.1])
);

// Filter: only salaries >= 90000
const senior = Object.fromEntries(
    Object.entries(team).filter(([name, salary]) => salary >= 90000)
);
```

### `Object.assign` (prefer spread instead)

```javascript
// ⚠️ MUTATES the target!
Object.assign(target, source1, source2);

// Safe alternative:
const merged = { ...target, ...source1, ...source2 };
```

> **Pro Tip:** Prefer `Object.entries` + HOFs over `for...in` for object iteration — it only returns own properties (no inherited prototype properties) and is chainable.

---

## Array Static Methods

```javascript
// Array.from — convert iterable to array, with optional map
const chars = Array.from("JavaScript");
// ["J","a","v","a","S","c","r","i","p","t"]

const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
// [1, 2, 3, 4, 5]

// Array.isArray — reliable type check (typeof [] returns "object")
Array.isArray([1, 2, 3]);    // true
Array.isArray("hello");       // false
Array.isArray({ length: 3 }); // false
```

---

## JSON — Serialization & Deep Clone

```javascript
// Stringify: object → JSON string
JSON.stringify(employee);                  // compact
JSON.stringify(employee, null, 2);         // pretty-printed
JSON.stringify(employee, ["name", "role"]); // only specific fields

// Parse: JSON string → object
const data = JSON.parse(jsonString);

// Replacer function — redact sensitive fields
JSON.stringify(employee, (key, value) => {
    if (key === "salary") return undefined;  // omit
    return value;
});
```

**What JSON drops:**

| Type | Result |
|------|--------|
| `undefined` | Omitted |
| Functions | Omitted |
| `Date` | Becomes ISO string |
| `Map` / `Set` | Becomes `{}` |
| `Infinity` / `NaN` | Becomes `null` |

---

## Data Transformation Pipelines

### Pipeline: API → Filter → Transform → Display

```javascript
// Parse API response
const { data: { employees } } = JSON.parse(apiResponse);

// Filter active engineers
const active = employees.filter(({ dept, active }) => dept === "ENG" && active);

// Transform to display format
const display = active.map(({ firstName, lastName, salary }) => ({
    fullName: `${firstName} ${lastName}`,
    salary: `Rs. ${salary.toLocaleString()}`,
    initials: `${firstName[0]}${lastName[0]}`
}));
```

### Pipeline: Group by Key with `reduce`

```javascript
const byDepartment = employees.reduce((groups, employee) => {
    const { dept, ...info } = employee;
    return {
        ...groups,
        [dept]: [...(groups[dept] || []), info]
    };
}, {});
```

### Pipeline: Deep Merge Nested Configs

```javascript
// ❌ Shallow merge loses nested defaults
const broken = { ...defaults, ...overrides };

// ✅ Deep merge — spread at each level
const correct = {
    ...defaults,
    ...overrides,
    notifications: { ...defaults.notifications, ...overrides.notifications },
    dashboard: { ...defaults.dashboard, ...(overrides.dashboard || {}) }
};
```

---

## TypeScript — Interfaces & Type Aliases

```typescript
// Interface — define object shape
interface Employee {
    id: string;
    name: string;
    role: string;
    salary: number;
    isRemote: boolean;
}

// Optional properties — may or may not exist
interface Config {
    apiUrl: string;
    timeout: number;
    retries?: number;    // optional
    debugMode?: boolean; // optional
}

// Readonly — cannot be reassigned after creation
interface AppSettings {
    readonly appName: string;
    readonly version: string;
    theme: string;  // mutable
}

// Type alias — for unions and complex types
type Department = "Engineering" | "Design" | "Marketing" | "Sales";

// Extending interfaces — build type hierarchies
interface Person {
    name: string;
    age: number;
}
interface Developer extends Person {
    skills: string[];
    level: "junior" | "mid" | "senior";
}

// Index signature — dynamic keys
interface SalaryMap {
    [name: string]: number;
}
```

> **Pro Tip:** Convention: use `interface` for object shapes (supports `extends` and declaration merging). Use `type` for unions, intersections, and utility types.

---

## Common Mistakes to Avoid

### 1. Renaming creates a NEW variable — original key name is gone

```javascript
// ❌ Wrong — host doesn't exist after renaming
const { host: server } = config;
console.log(host);  // ReferenceError!

// ✅ Correct — use the new name
console.log(server);  // "localhost"
```

### 2. Destructuring `undefined` crashes without defaults

```javascript
// ❌ Crashes — settings is undefined
const { settings: { theme } } = { settings: undefined };

// ✅ Safe — provide default empty object
const { settings: { theme } = {} } = { settings: undefined };
```

### 3. Spread is SHALLOW — nested references are shared

```javascript
// ❌ Mutates original nested array
const copy = { ...original };
copy.tags.push("new");  // original.tags is also mutated!

// ✅ Deep copy for nested data
const safe = structuredClone(original);
safe.tags.push("new");  // original is safe
```

### 4. Rest must be LAST in destructuring

```javascript
// ❌ SyntaxError
const { ...rest, name } = obj;

// ✅ Correct — rest is last
const { name, ...rest } = obj;
```

### 5. `Object.assign` MUTATES the target

```javascript
// ❌ target is mutated
const merged = Object.assign(target, source);

// ✅ Pass empty object as target
const merged = Object.assign({}, target, source);

// ✅ Even better — use spread
const merged = { ...target, ...source };
```

### 6. `Object.freeze` is shallow — nested objects are NOT frozen

```javascript
// ❌ Nested array still mutable
const config = Object.freeze({ features: ["a", "b"] });
config.features.push("c");  // Works! Not frozen at depth.

// ✅ Use structuredClone for deep immutability
```

### 7. Shallow merge overwrites nested objects entirely

```javascript
// ❌ Loses nested defaults
const config = { ...defaults, ...overrides };
// If overrides.notifications = { email: false }
// You LOSE defaults.notifications.sms and .push

// ✅ Spread at each nested level
const config = {
    ...defaults,
    ...overrides,
    notifications: { ...defaults.notifications, ...overrides.notifications }
};
```

---

## VS Code Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + D` | Select next occurrence of current word |
| `Ctrl + Shift + K` | Delete entire line |
| `Alt + ↑ / ↓` | Move line up/down |
| `Ctrl + /` | Toggle line comment |
| `Ctrl + Shift + [` / `]` | Fold/unfold code block |
| `Ctrl + Space` | Trigger IntelliSense autocomplete |
| `F2` | Rename symbol across file |
| `Ctrl + Shift + L` | Select ALL occurrences of current word |

---

## Quick Reference Table

| Pattern | Syntax | Purpose |
|---------|--------|---------|
| Object destructure | `const { a, b } = obj` | Extract by name |
| Array destructure | `const [a, b] = arr` | Extract by position |
| Rename | `const { a: newName } = obj` | Extract + rename |
| Default | `const { a = fallback } = obj` | Fallback for missing |
| Nested | `const { inner: { deep } } = obj` | Deep extraction |
| Param destructure | `function f({ a, b }) {}` | Clean function signatures |
| Array spread | `[...arr1, ...arr2]` | Merge/copy arrays |
| Object spread | `{ ...obj1, ...obj2 }` | Merge/copy objects (last wins) |
| Array rest | `const [first, ...rest] = arr` | Collect remaining elements |
| Object rest | `const { id, ...rest } = obj` | Collect remaining properties |
| Deep copy | `structuredClone(obj)` | True independent copy |
| Freeze | `Object.freeze(obj)` | Prevent all changes (shallow) |
| Seal | `Object.seal(obj)` | Lock shape, allow value changes |
| Keys | `Object.keys(obj)` | Array of property names |
| Values | `Object.values(obj)` | Array of property values |
| Entries | `Object.entries(obj)` | Array of [key, value] pairs |
| From entries | `Object.fromEntries(pairs)` | Object from [key, value] pairs |
| Stringify | `JSON.stringify(obj, null, 2)` | Object → JSON string |
| Parse | `JSON.parse(str)` | JSON string → Object |

---

## What's Next?

**Lecture 13: String Processing, Pattern Matching & Defensive Error Handling**
- Master every string method JavaScript offers — searching, extracting, transforming
- Learn Regular Expressions for pattern matching — email validation, password strength, URL detection
- Build defensive error handling with `try/catch/finally`
- Project: **Smart Content Analyzer & Validator** — validates and processes text input using regex and error handling

> Every data transformation pipeline you built today could fail with bad input. Lecture 13 teaches you how to validate that input and handle failures gracefully.

---
