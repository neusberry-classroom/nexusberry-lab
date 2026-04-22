# Lecture 12: Data Transformation — Destructuring, Spread & Object Mastery

## PRESENTER ONLY (Not shared with students)

### Overview
- **Format**: Live Google Meet session
- **Style**: Presentation-driven (reveal.js) + live coding (VS Code)
- **Project**: Enterprise Data Transformer
- **Goal**: Master the modern JavaScript patterns for working with structured data — destructuring objects and arrays, spread/rest operators, shallow vs deep copies, immutability, Object/Array static methods, and JSON serialization — so students can confidently reshape, merge, transform, and protect data in real-world applications, with TypeScript interfaces and type aliases ensuring type safety throughout

---

## Pre-Class Setup Checklist

- [ ] VS Code with clean dark theme (Dracula or One Dark Pro recommended)
- [ ] Font size set to 18–20px for screen-share readability
- [ ] Browser (Chrome) open with DevTools on Console tab, ready to run snippets
- [ ] Blank project folder created: `enterprise-data-transformer/`
- [ ] New file open and ready: `enterprise-data-transformer/transformer.js`
- [ ] Presentation loaded: `presentation/index.html` open in browser tab
- [ ] reveal.js CDN verified — advance through first 3 slides to confirm it loads
- [ ] Node.js installed and `node --version` confirms LTS (for terminal demos)
- [ ] Google Meet test run completed (audio, screen share, camera)
- [ ] Notifications silenced on all devices (phone on Do Not Disturb)
- [ ] Backup: Chrome DevTools Console ready as fallback for any VS Code issues
- [ ] Lecture-specific: Prepare a sample employee dataset (5–6 objects with nested addresses, departments, skills arrays) in a scratch file — used throughout all Parts
- [ ] Lecture-specific: TypeScript Playground open in a browser tab (typescriptlang.org/play) for Part 5 demos
- [ ] Lecture-specific: Have a JSON API response sample ready (e.g., mock user data from jsonplaceholder) to demonstrate real-world data transformation

---

## Phase 0: Before Lecture (Lecture 12 — starts after Lecture 11 review)

### Portal Quiz Review (from Lecture 11)

> **Talking Points:**
> "Let's start with your Lecture 11 quiz results. Functions and higher-order array methods are the tools you'll use every single day in professional JavaScript — they're essential. Let's see where we stand."

**Commonly Missed Areas to Watch For (Functions, Closures & Higher-Order Array Methods — Lecture 11):**

- **Arrow function implicit return confusion**: Students forget that wrapping the body in `{ }` requires an explicit `return`. `const double = x => x * 2` works, but `const double = x => { x * 2 }` returns `undefined`. The braces make it a function body, not an expression.
- **`map` vs `forEach` confusion**: `map` returns a new array, `forEach` returns `undefined`. Students who used `forEach` expecting a new array got `undefined` assigned to their variable. Rule: need a new array? Use `map`. Just doing something? Use `forEach`.
- **`filter` predicate must return boolean**: Some students returned the element itself inside `filter` instead of a condition. `filter(item => item.age)` works only because truthy/falsy — but `filter(item => item.age > 18)` is explicit and correct.
- **`reduce` accumulator confusion**: The most common mistake is forgetting the initial value. `reduce((acc, item) => acc + item.price)` without an initial value uses the first element as `acc` — which is an object, not a number. Always provide the initial value.
- **Closure scope misunderstanding**: Students confuse closure with simply having nested functions. A closure is a function that remembers variables from its enclosing scope *after* that scope has finished executing. The "counter factory" pattern trips students up.
- **Rest parameters vs spread**: `...args` in a function signature collects (rest). `...arr` in a function call or array literal spreads. Students mix up the direction — today we'll clarify this distinction thoroughly.

> **Transition:**
> "Good. Functions let you encapsulate logic. Higher-order methods let you transform arrays. But here's the limitation: every `map`, `filter`, and `reduce` you wrote in Lecture 11 worked with simple data — numbers, strings, flat objects. Real-world data isn't flat. It's nested. It's messy. It's objects inside objects inside arrays. Today, we learn how to reach into that data, pull out exactly what we need, reshape it, and protect it from accidental mutation. This is data transformation — and it's what separates scripts from production code."

---

### Assignment Feedback (Lecture 11 — Employee Profile Generator)

> **Talking Points:**
> "Let me share what I saw in the Employee Profile Generator assignments. This was your first project using higher-order array methods to build something real, and there were some creative solutions."

**Common Mistakes Observed:**

1. **Using `forEach` instead of `map` for transformation**: Several submissions used `forEach` with `push` to build a new array. That works, but `map` does it in one line and returns the new array directly. If you're building a new array from an existing one — `map` is the tool.
2. **Mutating the original array**: Some students sorted the employees array directly with `.sort()`, which mutates in place. The original data should remain untouched. Today we'll learn why immutability matters and how spread/slice prevent this.
3. **Chaining too many operations without clarity**: Long chains of `.filter().map().reduce()` are powerful but hard to debug. If your chain is more than 3 methods long, consider breaking it into named intermediate variables.
4. **Not using `find` when appropriate**: Students who used `filter()[0]` to get a single match should have used `find` — it stops at the first match and is more readable.
5. **Ignoring `reduce` entirely**: Some submissions avoided `reduce` and used `forEach` with a manual accumulator variable. `reduce` is the professional pattern — get comfortable with it now.

**Good Examples to Highlight:**

- Praise any submission that chained `filter` → `map` → `sort` cleanly
- Highlight use of `reduce` for aggregating salary totals or grouping by department
- Celebrate anyone who used `some`/`every` for validation checks
- Acknowledge students who wrote clean arrow functions with implicit returns

> **Encouragement:**
> "Higher-order methods take time to internalize. The fact that you completed the Employee Profile Generator means you can read and write functional array transformations. Today we add the next layer: instead of just filtering and mapping flat data, we'll destructure nested objects, spread them into new shapes, and build transformation pipelines that handle real enterprise data structures."

---

## Phase 1: Today's Lecture (90 Minutes)

---

### Part 1: Objects Deep Dive & Destructuring Foundations (00:00 – 22:00)

---

#### Background / Motivation (Presentation) — 00:00–05:00

> **Talking Points:**
> "Every project you've built so far — the Financial Calculator, the Admission Gateway, the Inventory System, the Employee Profile Generator — used objects. You created them with `{ }`, accessed properties with dot notation, and iterated with `for...in` and `Object.entries`. You know the basics."
>
> "But here's what you haven't done yet: efficiently extract data from complex, nested objects. Imagine an API response with 50 fields — you only need 3. Or an employee record nested 4 levels deep — department, team, lead, email. Dot notation works, but it's verbose and fragile."
>
> "Destructuring is JavaScript's built-in syntax for extracting data from objects and arrays in a single, elegant statement. It was introduced in ES6, and today it's used in virtually every React component, every API handler, every modern JavaScript file you'll encounter."

**Slide: What Is Destructuring?**

> "Destructuring is a syntax that lets you unpack values from arrays or properties from objects into distinct variables — in one line. Instead of writing three separate lines to extract `name`, `age`, and `role` from an object, you write one line that does all three."
>
> **Analogy:** "Think of destructuring like unpacking a suitcase. The suitcase is your object. Instead of reaching in for each item one at a time, destructuring lets you lay everything out on the bed in one motion — shirt here, pants there, shoes over here. One operation, multiple results."

**Slide: Objects Recap — What You Already Know**

> "Quick refresher before we go deeper:"

| Concept | Syntax | Status |
|---------|--------|--------|
| Object literal | `{ key: value }` | ✅ Covered in L8 |
| Dot notation | `obj.key` | ✅ Covered in L8 |
| Bracket notation | `obj["key"]` | ✅ Covered in L8 |
| `for...in` loop | `for (let key in obj)` | ✅ Covered in L10 |
| `Object.keys/values/entries` | Static methods | 🆕 Deep dive today |
| Destructuring | `const { a, b } = obj` | 🆕 New today |
| Spread/Rest | `{ ...obj }` / `{ ...rest }` | 🆕 New today |

> "Today we go from using objects to mastering them."

**Slide: Why This Matters for React**

> "In about 5 lectures, you'll start writing React components. Every React component receives data through something called 'props' — and you destructure those props on the very first line. Every API response you fetch gets destructured. Every state update uses the spread operator. What we learn today is the foundation for everything in Module 3."

---

#### Illustrations / Animations (Presentation) — 05:00–07:00

**Slide: Visual — Object Destructuring**

> Show a visual diagram:
> ```
>   const employee = {
>     name: "Sara",          ──→  const name = "Sara"
>     role: "Engineer",      ──→  const role = "Engineer"
>     level: 3               ──→  const level = 3
>   };
>
>   const { name, role, level } = employee;
> ```
>
> "The left side mirrors the shape of the right side. The variable names match the property names. JavaScript does the extraction automatically."

**Slide: Visual — Before vs After Destructuring**

> ```
>   // BEFORE — 3 lines
>   const name = employee.name;
>   const role = employee.role;
>   const level = employee.level;
>
>   // AFTER — 1 line
>   const { name, role, level } = employee;
> ```
>
> "Same result. One-third the code. And it scales — whether you need 2 properties or 10, it's still one line."

---

#### "Let's see in Code now" (VS Code) — 07:00–16:00

> "Open VS Code. Create a new file: `transformer.js`. We're building the Enterprise Data Transformer — starting with objects and destructuring."

```javascript
// ============================================
// Lecture 12 — Part 1: Objects & Destructuring
// Enterprise Data Transformer
// NexusBerry Modern Frontend Course
// ============================================

// --- Objects recap: property shorthand ---
const name = "TechCorp";
const industry = "Technology";
const employees = 250;

// OLD way — repetitive
const companyOld = { name: name, industry: industry, employees: employees };

// NEW way — property shorthand (when variable name matches key)
const company = { name, industry, employees };
console.log(company);
// { name: "TechCorp", industry: "Technology", employees: 250 }

// --- Computed property names ---
const field = "revenue";
const year = 2025;

const report = {
    [field]: 5000000,              // key is "revenue"
    [`${field}_${year}`]: 5000000, // key is "revenue_2025"
    [field + "Growth"]: 12.5       // key is "revenueGrowth"
};
console.log(report);
// { revenue: 5000000, revenue_2025: 5000000, revenueGrowth: 12.5 }

// --- Object destructuring basics ---
const employee = {
    firstName: "Sara",
    lastName: "Ahmed",
    role: "Senior Engineer",
    department: "Engineering",
    salary: 95000,
    isRemote: true
};

// Extract specific properties into variables
const { firstName, role, department } = employee;
console.log(firstName);   // "Sara"
console.log(role);        // "Senior Engineer"
console.log(department);  // "Engineering"

// --- Renaming during destructuring ---
// What if a variable named "role" already exists?
const { role: jobTitle, salary: annualPay } = employee;
console.log(jobTitle);    // "Senior Engineer"
console.log(annualPay);   // 95000

// --- Default values ---
const { firstName: fName, team = "Unassigned", office = "HQ" } = employee;
console.log(fName);    // "Sara"
console.log(team);     // "Unassigned" (doesn't exist on employee)
console.log(office);   // "HQ" (doesn't exist on employee)

// --- Array destructuring ---
const scores = [95, 88, 72, 64, 91];

const [first, second, third] = scores;
console.log(first);   // 95
console.log(second);  // 88
console.log(third);   // 72

// Skipping elements
const [, , thirdScore, , fifthScore] = scores;
console.log(thirdScore);  // 72
console.log(fifthScore);  // 91

// Swapping variables — the classic destructuring trick
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(a); // 20
console.log(b); // 10
// No temporary variable needed!

// --- Nested destructuring ---
const employeeRecord = {
    id: "EMP-001",
    personal: {
        name: "Ali Khan",
        age: 30,
        address: {
            city: "Lahore",
            country: "Pakistan"
        }
    },
    professional: {
        title: "Lead Developer",
        skills: ["React", "Node.js", "TypeScript"]
    }
};

// Extract nested values in one statement
const {
    personal: {
        name: empName,
        address: { city, country }
    },
    professional: { title, skills: [primarySkill] }
} = employeeRecord;

console.log(empName);       // "Ali Khan"
console.log(city);          // "Lahore"
console.log(country);       // "Pakistan"
console.log(title);         // "Lead Developer"
console.log(primarySkill);  // "React"
// Note: `personal` and `professional` are NOT variables — they're paths
```

> **Narration while typing:**
> "Property shorthand saves keystrokes when the variable name matches the key. Computed property names let you build keys dynamically — critical when building data structures from user input or API fields."
>
> "Destructuring mirrors the shape of the data. On the left of `=`, you write a pattern that matches the object's structure. JavaScript matches the pattern to the data and extracts the values. Renaming uses a colon — `role: jobTitle` means 'take the `role` property and store it in a variable called `jobTitle`'. Default values use `=` — if the property doesn't exist, the default kicks in."
>
> "Nested destructuring goes as deep as your data. But be careful — if any intermediate property is `undefined`, you'll get a runtime error. We'll address that with optional chaining and defensive patterns later."

---

#### Interactive Questions (Presentation/Verbal) — 16:00–19:00

**Question 1 — Predict Output:**

> "What does this log? Think carefully about renaming."

```javascript
const config = { host: "localhost", port: 3000, debug: true };
const { host: server, port, verbose = false } = config;
console.log(server, port, verbose);
```

> **Answer:** `"localhost" 3000 false` — `host` is renamed to `server`, `port` stays as-is, `verbose` doesn't exist on `config` so the default `false` is used.
> **Teaching moment:** "Renaming (`host: server`) creates a variable called `server`, not `host`. If you try to use `host` after this, you'll get a ReferenceError. The original property name is just a path — the variable is what comes after the colon."

---

**Question 2 — Spot the Error:**

> "This code crashes. Why?"

```javascript
const user = { name: "Zara", settings: undefined };
const { settings: { theme } } = user;
```

> **Answer:** `settings` is `undefined`, and you can't destructure `undefined`. This throws `TypeError: Cannot destructure property 'theme' of undefined`.
> **Teaching moment:** "Nested destructuring assumes every intermediate level exists. If there's any chance a nested property is `undefined` or `null`, use a default value: `const { settings: { theme } = {} } = user;` — the `= {}` provides a fallback empty object."

---

**Question 3 — Concept Challenge:**

> "How would you extract the second and fourth elements from this array, ignoring the rest?"

```javascript
const colors = ["red", "green", "blue", "yellow", "purple"];
```

> **Answer:** `const [, second, , fourth] = colors;` — commas skip positions. `second` = `"green"`, `fourth` = `"yellow"`.
> **Teaching moment:** "Array destructuring is positional — it matches by index, not by name. Each comma advances one position. This is different from object destructuring, which matches by property name."

---

#### Live Debugging (VS Code) — 19:00–20:30

> "Let me show you a mistake I've seen in production."

```javascript
// Common bug: destructuring a non-existent nested path
const apiResponse = {
    data: {
        users: [
            { name: "Ali", email: "ali@test.com" }
        ]
    }
};

// This works:
const { data: { users: [firstUser] } } = apiResponse;
console.log(firstUser); // { name: "Ali", email: "ali@test.com" }

// But what if the API returns an empty array?
const emptyResponse = { data: { users: [] } };
const { data: { users: [firstUserSafe] } } = emptyResponse;
console.log(firstUserSafe); // undefined — no crash, but no data

// What if the API returns no `users` key at all?
const brokenResponse = { data: {} };
// const { data: { users: [user1] } } = brokenResponse;
// ❌ TypeError! Cannot destructure property 'users' of undefined... wait,
// actually: Cannot read properties of undefined (reading '0')
// Because `data.users` is undefined, and you can't access [0] on undefined

// Fix: provide defaults at each level
const { data: { users: [user1] = [] } = {} } = brokenResponse;
console.log(user1); // undefined — safe, no crash
```

> "Defensive destructuring means providing defaults at every level of nesting. The `= []` ensures that even if `users` is missing, we get an empty array to destructure from. This pattern is essential when working with API data."

---

#### Part Closing (Presentation) — 20:30–22:00

**Common Mistakes:**
- Forgetting that renaming (`key: variable`) doesn't create a variable with the original key name
- Destructuring `undefined` or `null` values without providing defaults — causes runtime crashes
- Confusing object destructuring (`{ }`) with array destructuring (`[ ]`) — objects match by name, arrays by position
- Using `const { name }` when a variable named `name` already exists in scope — shadowing issues

**Optimization Tips:**
- Only destructure what you need — extracting all 20 properties of an object clutters your scope
- Use renaming to create descriptive variable names: `{ err: connectionError }` is clearer than just `{ err }`
- Provide defaults for optional data to avoid defensive `if` checks later

**Best Practices:**
- Destructure at the point of use, not at the top of a long function
- Keep nested destructuring to 2 levels max — beyond that, extract intermediate variables
- Always provide defaults when destructuring API responses or user input
- Use property shorthand when constructing objects from variables — it's the inverse of destructuring

**Professional Insights:**
> "In 25 years of building systems, the single biggest source of 'undefined is not an object' errors in production comes from destructuring API responses without defaults. The API contract says the field will be there — but APIs change, networks fail, and edge cases exist. Defensive destructuring with defaults at every level is a habit that prevents production incidents. Every senior developer I know does this automatically."

---

### Part 2: Spread, Rest & The Art of Copying Data (22:00 – 44:00)

---

#### Background / Motivation (Presentation) — 22:00–26:00

> **Talking Points:**
> "In Lecture 11, I mentioned that `.sort()` mutates the original array. Some of you discovered that the hard way in the Employee Profile Generator — your original employee list was rearranged permanently after sorting."
>
> "This is the mutation problem. When you assign an object or array to a new variable, you don't get a copy — you get a reference. Both variables point to the same data in memory. Change one, the other changes too."
>
> "The spread operator (`...`) solves this. It lets you copy arrays, copy objects, merge multiple sources into one, and do it all without touching the original data. Combined with rest (`...rest` in destructuring), these three dots are the most versatile syntax in modern JavaScript."

**Slide: Reference vs Value — The Core Problem**

> "Remember from Lecture 8: primitive types (strings, numbers, booleans) are copied by value. Objects and arrays are copied by reference."

```
Primitive:         Reference:
let a = 5;        let arr = [1, 2, 3];
let b = a;        let copy = arr;
b = 10;           copy.push(4);
a → 5 ✅          arr → [1, 2, 3, 4] 😱
b → 10            copy → [1, 2, 3, 4]
                  // Both point to same array!
```

> "The spread operator creates a NEW array or object with the same contents — breaking the reference link."

**Slide: Spread vs Rest — Same Syntax, Different Context**

| Context | Syntax | Name | What It Does |
|---------|--------|------|-------------|
| Function call / array literal | `...arr` | Spread | Expands elements |
| Function parameter | `...args` | Rest | Collects into array |
| Destructuring | `...rest` | Rest | Collects remaining |

> "Three dots, two meanings. The context determines which one JavaScript uses. If you're unpacking — it's spread. If you're collecting — it's rest."

---

#### Illustrations / Animations (Presentation) — 26:00–27:00

**Slide: Visual — Spread Copies, Rest Collects**

> ```
>   SPREAD (expanding):
>   [1, 2, 3]  →  ...  →  1, 2, 3  →  [1, 2, 3, 4, 5]
>                           ↑ individual values
>
>   REST (collecting):
>   { a, b, ...rest } = { a:1, b:2, c:3, d:4 }
>   a → 1, b → 2, rest → { c:3, d:4 }
> ```
>
> "Spread opens the container and pours out the elements. Rest gathers up whatever's left and packs it into a new container."

---

#### "Let's see in Code now" (VS Code) — 27:00–38:00

```javascript
// ============================================
// Lecture 12 — Part 2: Spread, Rest & Copying
// Enterprise Data Transformer
// NexusBerry Modern Frontend Course
// ============================================

// --- The mutation problem ---
const originalTeam = ["Sara", "Ali", "Zara"];
const teamRef = originalTeam;           // NOT a copy — same reference
teamRef.push("Hassan");
console.log(originalTeam); // ["Sara", "Ali", "Zara", "Hassan"] — mutated!

// --- Spread operator: copying arrays ---
const teamCopy = [...originalTeam];     // NEW array with same elements
teamCopy.push("Fatima");
console.log(originalTeam); // ["Sara", "Ali", "Zara", "Hassan"] — unchanged ✅
console.log(teamCopy);     // ["Sara", "Ali", "Zara", "Hassan", "Fatima"]

// --- Merging arrays ---
const frontend = ["React", "Vue", "Angular"];
const backend = ["Node", "Django", "Laravel"];
const fullStack = [...frontend, ...backend];
console.log(fullStack);
// ["React", "Vue", "Angular", "Node", "Django", "Laravel"]

// Adding elements during spread
const allSkills = ["HTML", "CSS", ...frontend, "TypeScript", ...backend];
console.log(allSkills);
// ["HTML", "CSS", "React", "Vue", "Angular", "TypeScript", "Node", "Django", "Laravel"]

// --- Spread operator: copying objects ---
const baseEmployee = {
    company: "TechCorp",
    department: "Engineering",
    level: "Mid",
    benefits: ["health", "dental"]
};

const newEmployee = { ...baseEmployee, name: "Usman", level: "Senior" };
console.log(newEmployee);
// { company: "TechCorp", department: "Engineering", level: "Senior",
//   benefits: ["health", "dental"], name: "Usman" }
// Note: "level" was overridden — last value wins!

console.log(baseEmployee.level); // "Mid" — original unchanged ✅

// --- Merging objects ---
const personalInfo = { name: "Ayesha", age: 28 };
const jobInfo = { role: "Designer", department: "Creative" };
const locationInfo = { city: "Lahore", remote: true };

const fullProfile = { ...personalInfo, ...jobInfo, ...locationInfo };
console.log(fullProfile);
// { name: "Ayesha", age: 28, role: "Designer", department: "Creative",
//   city: "Lahore", remote: true }

// --- Override order matters ---
const defaults = { theme: "dark", language: "en", notifications: true };
const userPrefs = { theme: "light", language: "ur" };

// User preferences override defaults
const config = { ...defaults, ...userPrefs };
console.log(config);
// { theme: "light", language: "ur", notifications: true }
// "light" overwrites "dark", "ur" overwrites "en", notifications kept

// --- Rest in destructuring: objects ---
const fullEmployee = {
    id: "EMP-042",
    name: "Bilal",
    role: "Architect",
    salary: 120000,
    department: "Engineering",
    startDate: "2020-03-15"
};

const { id, salary, ...publicInfo } = fullEmployee;
console.log(id);         // "EMP-042" — extracted
console.log(salary);     // 120000 — extracted
console.log(publicInfo); // { name: "Bilal", role: "Architect",
                         //   department: "Engineering", startDate: "2020-03-15" }
// Perfect for stripping sensitive fields!

// --- Rest in destructuring: arrays ---
const rankings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [gold, silver, bronze, ...others] = rankings;
console.log(gold);    // 1
console.log(silver);  // 2
console.log(bronze);  // 3
console.log(others);  // [4, 5, 6, 7, 8, 9, 10]

// --- Destructuring in function parameters ---
function formatEmployee({ name, role, department, level = "Junior" }) {
    return `${name} | ${role} | ${department} (${level})`;
}

const emp = { name: "Hira", role: "Developer", department: "Frontend", level: "Senior" };
console.log(formatEmployee(emp));
// "Hira | Developer | Frontend (Senior)"

// Without destructuring you'd write:
// function formatEmployee(employee) {
//     return `${employee.name} | ${employee.role} | ...`;
// }
// Destructuring in params is cleaner and self-documenting

// --- Rest in function parameters (recap from L11, now combined) ---
function createTeam(lead, ...members) {
    return {
        lead,
        members,
        size: members.length + 1
    };
}
console.log(createTeam("Sara", "Ali", "Zara", "Hassan"));
// { lead: "Sara", members: ["Ali", "Zara", "Hassan"], size: 4 }

// --- SHALLOW vs DEEP copy — the critical distinction ---
const department = {
    name: "Engineering",
    lead: "Sara",
    members: ["Ali", "Zara", "Hassan"],  // nested array (reference!)
    config: { budget: 50000 }             // nested object (reference!)
};

const deptCopy = { ...department };

// Top-level properties are independent:
deptCopy.name = "Product";
console.log(department.name);  // "Engineering" — unchanged ✅

// BUT nested references are still shared!
deptCopy.members.push("Fatima");
console.log(department.members); // ["Ali", "Zara", "Hassan", "Fatima"] — MUTATED! 😱

deptCopy.config.budget = 75000;
console.log(department.config.budget); // 75000 — MUTATED! 😱

// --- Deep copy with structuredClone ---
const deptDeepCopy = structuredClone(department);
deptDeepCopy.members.push("Usman");
deptDeepCopy.config.budget = 100000;

console.log(department.members.length); // 4 — unchanged ✅
console.log(department.config.budget);  // 75000 — unchanged ✅

// structuredClone is the modern, correct way to deep copy
// (JSON.parse/JSON.stringify also works — we'll see that in Part 4)
```

> **Narration while typing:**
> "Spread creates a shallow copy — the top level is independent, but nested objects and arrays still share references. This is the most common source of mutation bugs in JavaScript applications. The fix is `structuredClone()` — added to all browsers and Node.js. It creates a true deep copy where nothing is shared."
>
> "Rest in destructuring is the inverse of spread: spread expands, rest collects. Use rest to strip specific fields from an object — extracting `id` and `salary` while collecting `...publicInfo` is a pattern you'll use constantly when preparing data for display."
>
> "Destructuring in function parameters is self-documenting: the function signature tells you exactly what properties it expects. This is how every React component receives its props."

---

#### Interactive Questions (Presentation/Verbal) — 38:00–41:00

**Question 1 — Predict Output:**

> "What does `original.tags` contain after this code runs?"

```javascript
const original = { name: "Report", tags: ["urgent", "Q1"] };
const copy = { ...original };
copy.tags.push("reviewed");
copy.name = "Report v2";
console.log(original.name);
console.log(original.tags);
```

> **Answer:** `original.name` → `"Report"` (unchanged — top-level string). `original.tags` → `["urgent", "Q1", "reviewed"]` (mutated! — shallow copy shares the nested array reference).
> **Teaching moment:** "This is the shallow copy trap. Spread copies the top level, but nested arrays and objects are still shared. If you're modifying nested data, you need `structuredClone()` or nested spreads."

---

**Question 2 — Quick-Fire Recall:**

> "Three dots (`...`). Two different names depending on context. What are they and when is each used?"

> **Answer:** Spread = expanding elements (in array/object literals, function calls). Rest = collecting elements (in destructuring, function parameters). Same syntax, context decides.
> **Teaching moment:** "If you're creating/building something — it's spread. If you're receiving/collecting — it's rest."

---

**Question 3 — Concept Challenge:**

> "How would you create a copy of this object but with `password` removed and `role` changed to 'admin'?"

```javascript
const user = { name: "Ali", email: "ali@test.com", password: "secret", role: "user" };
```

> **Answer:** `const { password, ...safeUser } = user; const admin = { ...safeUser, role: "admin" };`
> Or in one expression: `const { password, ...admin } = { ...user, role: "admin" };`
> **Teaching moment:** "Rest destructuring to strip fields + spread to override — this two-step pattern is everywhere in production. You'll use it in React to remove props before passing to DOM elements."

---

#### Live Debugging (VS Code) — 41:00–42:30

> "Let me show you a mutation bug that's hard to spot."

```javascript
// A function that's supposed to add a skill without mutating
function addSkill(employee, newSkill) {
    employee.skills.push(newSkill);  // ❌ Mutates the original!
    return employee;
}

const dev = { name: "Zara", skills: ["JS", "CSS"] };
const updatedDev = addSkill(dev, "React");

console.log(dev.skills);        // ["JS", "CSS", "React"] — original mutated!
console.log(updatedDev === dev); // true — same object!

// Fix: return a new object with a new skills array
function addSkillSafe(employee, newSkill) {
    return {
        ...employee,
        skills: [...employee.skills, newSkill]
    };
}

const dev2 = { name: "Zara", skills: ["JS", "CSS"] };
const updatedDev2 = addSkillSafe(dev2, "React");

console.log(dev2.skills);          // ["JS", "CSS"] — original safe! ✅
console.log(updatedDev2.skills);   // ["JS", "CSS", "React"]
console.log(updatedDev2 === dev2); // false — different objects
```

> "The safe version uses spread at both levels — object spread for the employee, array spread for the skills. This nested spread pattern is how React state updates work. You'll see this exact pattern in every `useState` update with complex state."

---

#### Part Closing (Presentation) — 42:30–44:00

**Common Mistakes:**
- Assuming spread creates a deep copy — it only copies one level deep
- Pushing to a spread-copied array's nested array — still mutates the original
- Putting rest (`...rest`) anywhere except the last position in destructuring — syntax error
- Forgetting that spread in objects overwrites left-to-right: `{ ...defaults, ...overrides }` — order matters

**Optimization Tips:**
- Use `structuredClone()` for deep copies instead of `JSON.parse(JSON.stringify())` — it handles `Date`, `RegExp`, `Map`, `Set`, and circular references
- For performance-critical code, avoid unnecessary copies — spread every time in a tight loop can be expensive
- Nested spread (`{ ...obj, nested: { ...obj.nested, key: value } }`) is fine for 2 levels — beyond that, use `structuredClone` and mutate the clone

**Best Practices:**
- Default to immutable patterns: always return new objects/arrays instead of mutating parameters
- Use rest destructuring to strip sensitive fields (`{ password, ...safeUser }`) before sending data to the client
- When merging, put defaults first: `{ ...defaults, ...userConfig }` ensures user values override
- Name your rest variable meaningfully: `...publicInfo` not `...rest`

**Professional Insights:**
> "Immutability isn't just academic — it's the foundation of every modern frontend framework. React won't re-render if you mutate state directly because it compares references, not values. Redux requires immutable updates. Even in backend code, accidental mutation of shared data structures causes race conditions and subtle bugs. The spread + destructuring patterns you're learning today are the same patterns used in every production React codebase I've worked on or reviewed."

---

### Part 3: Immutability & Object Static Methods (44:00 – 62:00)

---

#### Background / Motivation (Presentation) — 44:00–47:00

> **Talking Points:**
> "We just saw that spread creates shallow copies and `structuredClone` creates deep copies. But what if you want to prevent an object from being modified at all? What if you want to lock down a configuration object so no one — not even your future self — can accidentally change it?"
>
> "JavaScript provides two built-in mechanisms for this: `Object.freeze()` and `Object.seal()`. These enforce immutability at the language level."
>
> "And then there's the other side: JavaScript gives you powerful static methods on the `Object` constructor — `keys`, `values`, `entries`, `assign`, `fromEntries` — that let you inspect, iterate, and transform objects. Combined with the higher-order array methods from Lecture 11, these become data transformation powerhouses."

**Slide: `Object.freeze` vs `Object.seal`**

| Feature | `Object.freeze` | `Object.seal` |
|---------|-----------------|---------------|
| Add new properties | ❌ No | ❌ No |
| Delete properties | ❌ No | ❌ No |
| Modify existing values | ❌ No | ✅ Yes |
| Reconfigure properties | ❌ No | ❌ No |
| Use case | Constants, config | Schemas, templates |

> "Freeze: nothing changes. Seal: shape is locked, but values can change. Think of freeze as a museum display case — look but don't touch. Seal is a form with fixed fields — you can fill in values, but you can't add or remove fields."

**Slide: Object Static Methods Overview**

| Method | Returns | Purpose |
|--------|---------|---------|
| `Object.keys(obj)` | `string[]` | All enumerable property names |
| `Object.values(obj)` | `any[]` | All enumerable property values |
| `Object.entries(obj)` | `[string, any][]` | Key-value pairs as arrays |
| `Object.assign(target, ...sources)` | `target` | Copy properties (mutates target) |
| `Object.fromEntries(entries)` | `object` | Create object from key-value pairs |

> "These five methods let you convert objects to arrays (and back), merge objects, and build transformation pipelines."

---

#### Illustrations / Animations (Presentation) — 47:00–48:00

**Slide: Visual — Object ↔ Array Round-Trip**

> ```
>   Object.entries()              Array methods              Object.fromEntries()
>   { a: 1, b: 2 }  ──→  [["a",1],["b",2]]  ──→ filter/map ──→  { b: 2 }
>         ↑                                                          ↓
>         └──────────── Object ←── Array ←── Transform ←── Array ←──┘
> ```
>
> "This is the pattern: convert an object to an array, transform it with `filter`/`map`, convert it back. `Object.entries` + HOFs + `Object.fromEntries` = object transformation pipeline."

---

#### "Let's see in Code now" (VS Code) — 48:00–56:00

```javascript
// ============================================
// Lecture 12 — Part 3: Immutability & Object Methods
// Enterprise Data Transformer
// NexusBerry Modern Frontend Course
// ============================================

// --- Object.freeze ---
const APP_CONFIG = Object.freeze({
    apiUrl: "https://api.techcorp.com",
    version: "2.1.0",
    maxRetries: 3,
    features: ["dashboard", "reports"]  // nested array!
});

APP_CONFIG.apiUrl = "https://hacked.com";  // silently fails in non-strict
console.log(APP_CONFIG.apiUrl);            // "https://api.techcorp.com" — unchanged

APP_CONFIG.newProp = "test";               // silently fails
console.log(APP_CONFIG.newProp);           // undefined

// ⚠️ WARNING: freeze is shallow!
APP_CONFIG.features.push("admin-panel");   // This WORKS!
console.log(APP_CONFIG.features);
// ["dashboard", "reports", "admin-panel"] — nested mutation still possible

// Deep freeze would require a recursive function or structuredClone + freeze

// --- Object.seal ---
const formTemplate = Object.seal({
    name: "",
    email: "",
    role: "user"
});

formTemplate.name = "Ali";     // ✅ Can modify existing values
formTemplate.email = "ali@x";  // ✅ Can modify existing values
formTemplate.age = 25;         // ❌ Can't add new properties
delete formTemplate.role;      // ❌ Can't delete properties

console.log(formTemplate);
// { name: "Ali", email: "ali@x", role: "user" }

// --- Object.keys / values / entries ---
const employee = {
    name: "Hira",
    role: "Designer",
    department: "Creative",
    salary: 85000,
    isRemote: true
};

const keys = Object.keys(employee);
console.log(keys);
// ["name", "role", "department", "salary", "isRemote"]

const values = Object.values(employee);
console.log(values);
// ["Hira", "Designer", "Creative", 85000, true]

const entries = Object.entries(employee);
console.log(entries);
// [["name","Hira"], ["role","Designer"], ["department","Creative"],
//  ["salary",85000], ["isRemote",true]]

// --- Iterating objects with Object.entries + HOFs ---
// Transform: get only string-valued properties
const stringProps = Object.entries(employee)
    .filter(([key, value]) => typeof value === "string")
    .map(([key, value]) => `${key}: ${value.toUpperCase()}`);

console.log(stringProps);
// ["name: HIRA", "role: DESIGNER", "department: CREATIVE"]

// --- Object.fromEntries: array → object ---
// Transform: create a new object with all salaries increased by 10%
const team = {
    sara: 95000,
    ali: 88000,
    zara: 92000,
    hassan: 78000
};

const raisedTeam = Object.fromEntries(
    Object.entries(team).map(([name, salary]) => [name, salary * 1.1])
);
console.log(raisedTeam);
// { sara: 104500, ali: 96800, zara: 101200, hassan: 85800 }

// --- Filter object properties ---
// Remove employees earning below 90000
const seniorTeam = Object.fromEntries(
    Object.entries(team).filter(([name, salary]) => salary >= 90000)
);
console.log(seniorTeam);
// { sara: 95000, zara: 92000 }

// --- Object.assign (older pattern — spread is preferred) ---
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

Object.assign(target, source1, source2);
console.log(target); // { a: 1, b: 3, c: 5, d: 6 }
// ⚠️ Object.assign MUTATES the target!
// Prefer: const result = { ...target, ...source1, ...source2 };

// --- for...in revisited (from L10) + Object.entries comparison ---
const project = { name: "Phoenix", status: "active", priority: "high" };

// for...in — iterates keys (also inherited properties!)
for (const key in project) {
    console.log(`${key}: ${project[key]}`);
}

// Object.entries — only own properties, works with HOFs
Object.entries(project).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
// Same output, but Object.entries is safer (no inherited properties)
// and can be chained with map/filter/reduce

// --- Array static methods ---
// Array.from — convert array-like or iterable to real array
const name2 = "JavaScript";
const chars = Array.from(name2);
console.log(chars); // ["J","a","v","a","S","c","r","i","p","t"]

// Array.from with mapping function
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(numbers); // [1, 2, 3, 4, 5]

// Array.isArray — reliable type check
console.log(Array.isArray([1, 2, 3]));    // true
console.log(Array.isArray("hello"));       // false
console.log(Array.isArray({ length: 3 })); // false — not a real array

// Array.of — create array from arguments (rarely used, but good to know)
const nums = Array.of(1, 2, 3);
console.log(nums); // [1, 2, 3]
```

> **Narration while typing:**
> "`Object.freeze` is your tool for constants that should never change — API configs, feature flags, static lookup tables. But remember: it's shallow, just like spread. Nested objects inside a frozen object can still be mutated."
>
> "The `Object.entries` → transform → `Object.fromEntries` pipeline is incredibly powerful. It lets you use all the HOFs from Lecture 11 — `filter`, `map`, `reduce` — on objects. You convert to an array of pairs, transform, and convert back. This pattern handles 90% of object transformation needs."
>
> "`Object.assign` mutates the target, which is why modern code prefers spread: `{ ...a, ...b }`. But you'll see `Object.assign` in older codebases and libraries, so you need to recognize it."

---

#### Interactive Questions (Presentation/Verbal) — 56:00–59:00

**Question 1 — Predict Output:**

> "What does `result` look like?"

```javascript
const prices = { apple: 2, banana: 1, cherry: 4, date: 3 };

const result = Object.fromEntries(
    Object.entries(prices)
        .filter(([fruit, price]) => price > 2)
        .map(([fruit, price]) => [fruit, price * 100])
);
```

> **Answer:** `{ cherry: 400, date: 300 }` — filter keeps only cherry (4) and date (3), then map multiplies by 100.
> **Teaching moment:** "This is the `entries → filter → map → fromEntries` pipeline. Read it step by step: convert to pairs, keep pairs where price > 2, transform each price to cents, convert back to object."

---

**Question 2 — Hidden Fact Reveal:**

> "True or false: `Object.freeze` prevents ALL modifications to an object and everything nested inside it."

> **Answer:** FALSE — `Object.freeze` is shallow. Nested objects and arrays inside a frozen object CAN still be modified. To truly deep-freeze, you'd need to recursively freeze every nested object.
> **Teaching moment:** "This catches even experienced developers. If you `freeze` a config object that has nested arrays, those arrays can still be pushed to. The safe pattern: `Object.freeze` the outer object AND `structuredClone` any nested data before modifying."

---

**Question 3 — Spot the Error:**

> "This code is supposed to create a new object without mutating `target`. What's wrong?"

```javascript
const target = { a: 1 };
const source = { b: 2 };
const merged = Object.assign(target, source);
```

> **Answer:** `Object.assign` mutates `target` — both `target` and `merged` are now `{ a: 1, b: 2 }`, and `merged === target` is `true`. Fix: `const merged = Object.assign({}, target, source);` or better: `const merged = { ...target, ...source };`
> **Teaching moment:** "The first argument to `Object.assign` IS the target — it gets mutated and returned. To avoid mutation, pass an empty object `{}` as the first argument. But honestly, just use spread — it's cleaner and always creates a new object."

---

#### Live Debugging (VS Code) — 59:00–60:30

> "Here's a subtle bug with `for...in` that `Object.entries` avoids."

```javascript
// Prototype pollution with for...in
function Employee(name) {
    this.name = name;
}
Employee.prototype.company = "TechCorp"; // Inherited property

const emp = new Employee("Ali");
emp.role = "Developer";

// for...in iterates inherited properties too!
for (const key in emp) {
    console.log(key); // "name", "role", "company" — includes prototype!
}

// Fix 1: hasOwnProperty check
for (const key in emp) {
    if (emp.hasOwnProperty(key)) {
        console.log(key); // "name", "role" — own properties only
    }
}

// Fix 2: Object.keys — only own properties, no prototype
Object.keys(emp).forEach(key => {
    console.log(key); // "name", "role"
});

// Fix 3 (best): Object.entries with destructuring
Object.entries(emp).forEach(([key, value]) => {
    console.log(`${key}: ${value}`); // "name: Ali", "role: Developer"
});
```

> "`for...in` iterates inherited properties from the prototype chain. `Object.keys/entries` don't. This is why modern code prefers `Object.entries` over `for...in` for object iteration. You won't have this problem if you stick to object literals and avoid prototypes — but we cover prototypes in Lecture 15, and you'll encounter this in older codebases."

---

#### Part Closing (Presentation) — 60:30–62:00

**Common Mistakes:**
- Using `Object.assign` thinking it doesn't mutate — the first argument IS the target
- Assuming `Object.freeze` is deep — it's shallow, just like spread
- Forgetting to destructure the `[key, value]` pair in `Object.entries().forEach()` — you get the whole array
- Using `for...in` without `hasOwnProperty` — iterates inherited properties

**Optimization Tips:**
- `Object.entries` → `filter` → `fromEntries` is readable but creates intermediate arrays. For large objects in hot paths, a plain `for...in` with `hasOwnProperty` can be faster
- Cache `Object.keys(obj).length` if you're checking it multiple times in a loop
- `Object.fromEntries` is the inverse of `Object.entries` — remember this symmetry

**Best Practices:**
- Use `Object.freeze` for application constants (API URLs, feature flags, enum-like objects)
- Prefer `Object.entries` + HOFs over `for...in` for object iteration — safer and chainable
- Prefer spread over `Object.assign` for merging — no mutation risk, cleaner syntax
- Use `Array.isArray()` for type checking arrays — `typeof []` returns `"object"`

**Professional Insights:**
> "In enterprise codebases, accidental mutation of shared configuration objects causes some of the hardest bugs to trace. The config works in one module, but another module silently modified it, and now a third module gets wrong values. `Object.freeze` on your config objects catches these immediately — in strict mode, it throws an error; in non-strict mode, the modification silently fails but the original stays safe. I've added `Object.freeze` to config files in every production project I've led."

---

### Part 4: JSON, Data Pipelines & Real-World Transformation (62:00 – 80:00)

---

#### Background / Motivation (Presentation) — 62:00–65:00

> **Talking Points:**
> "Every web application communicates with APIs. And the lingua franca of API communication is JSON — JavaScript Object Notation. When you fetch data from an API, it arrives as a JSON string. When you send data to an API, you convert your object to a JSON string."
>
> "`JSON.stringify` and `JSON.parse` are the conversion functions. But they're more than just serialization tools — they're also a quick (if imperfect) way to deep clone objects, and they're essential for local storage, debugging, and data logging."
>
> "In this part, we combine everything from today — destructuring, spread, Object methods, JSON — into real-world data transformation pipelines. This is where it all comes together."

**Slide: JSON.stringify & JSON.parse**

| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| `JSON.stringify(obj)` | Object/Array | JSON string | Serialization |
| `JSON.parse(str)` | JSON string | Object/Array | Deserialization |

> "Stringify converts JavaScript to a string. Parse converts a string back to JavaScript. Together, they're a round-trip — object → string → object."

**Slide: What JSON Cannot Serialize**

| Type | What Happens |
|------|-------------|
| `undefined` | Omitted from output |
| Functions | Omitted from output |
| `Date` objects | Converted to ISO string |
| `Map` / `Set` | Converted to `{}` / empty |
| `Infinity` / `NaN` | Converted to `null` |
| Circular references | Throws `TypeError` |

> "JSON is a data format — it only handles data types: strings, numbers, booleans, null, arrays, and objects. Anything else is either converted or dropped."

---

#### Illustrations / Animations (Presentation) — 65:00–66:00

**Slide: Visual — Data Transformation Pipeline**

> ```
>   API Response (JSON string)
>        ↓ JSON.parse()
>   Raw JavaScript Object
>        ↓ Destructure (extract needed fields)
>        ↓ Object.entries() → filter/map
>        ↓ Spread (merge with defaults)
>        ↓ Object.fromEntries()
>   Transformed Object
>        ↓ JSON.stringify()
>   Ready to send / store / display
> ```
>
> "This is the data transformation pipeline you'll use in every real application. Parse → extract → transform → merge → serialize. Every step uses a tool we learned today."

---

#### "Let's see in Code now" (VS Code) — 66:00–75:00

```javascript
// ============================================
// Lecture 12 — Part 4: JSON & Data Pipelines
// Enterprise Data Transformer
// NexusBerry Modern Frontend Course
// ============================================

// --- JSON.stringify basics ---
const employee = {
    name: "Sara Ahmed",
    role: "Lead Engineer",
    salary: 95000,
    skills: ["React", "TypeScript", "Node.js"],
    isRemote: true
};

const jsonString = JSON.stringify(employee);
console.log(jsonString);
// '{"name":"Sara Ahmed","role":"Lead Engineer","salary":95000,...}'
console.log(typeof jsonString); // "string"

// Pretty-printed JSON (great for debugging)
console.log(JSON.stringify(employee, null, 2));
// {
//   "name": "Sara Ahmed",
//   "role": "Lead Engineer",
//   ...
// }

// --- JSON.parse ---
const parsed = JSON.parse(jsonString);
console.log(parsed.name); // "Sara Ahmed"
console.log(parsed.skills[0]); // "React"

// --- JSON deep clone workaround ---
const original = {
    name: "Engineering",
    members: ["Sara", "Ali"],
    config: { budget: 50000 }
};

const deepClone = JSON.parse(JSON.stringify(original));
deepClone.members.push("Zara");
deepClone.config.budget = 75000;

console.log(original.members);       // ["Sara", "Ali"] — safe ✅
console.log(original.config.budget);  // 50000 — safe ✅

// ⚠️ JSON clone limitations:
const problematic = {
    date: new Date(),        // becomes a string
    fn: function() {},       // disappears
    undef: undefined,        // disappears
    regex: /test/gi          // becomes {}
};
console.log(JSON.parse(JSON.stringify(problematic)));
// { date: "2026-03-30T...", regex: {} }
// fn and undef are gone! Use structuredClone instead for these cases.

// --- JSON.stringify with replacer ---
// Only include specific fields
const publicJSON = JSON.stringify(employee, ["name", "role", "skills"]);
console.log(publicJSON);
// '{"name":"Sara Ahmed","role":"Lead Engineer","skills":["React","TypeScript","Node.js"]}'

// Custom replacer function — redact salary
const safeJSON = JSON.stringify(employee, (key, value) => {
    if (key === "salary") return undefined;  // omit
    return value;
});
console.log(safeJSON);
// '{"name":"Sara Ahmed","role":"Lead Engineer","skills":[...],"isRemote":true}'

// ============================================
// REAL-WORLD DATA TRANSFORMATION PIPELINES
// ============================================

// --- Pipeline 1: API Response → Display Data ---
const apiResponse = JSON.stringify({
    data: {
        employees: [
            { id: 1, firstName: "Sara", lastName: "Ahmed", dept: "ENG", salary: 95000, active: true },
            { id: 2, firstName: "Ali", lastName: "Khan", dept: "ENG", salary: 88000, active: true },
            { id: 3, firstName: "Zara", lastName: "Malik", dept: "DES", salary: 82000, active: false },
            { id: 4, firstName: "Hassan", lastName: "Raza", dept: "ENG", salary: 91000, active: true },
            { id: 5, firstName: "Hira", lastName: "Shah", dept: "DES", salary: 86000, active: true }
        ],
        meta: { total: 5, page: 1 }
    }
});

// Step 1: Parse the JSON
const { data: { employees, meta } } = JSON.parse(apiResponse);

// Step 2: Filter active engineers only
const activeEngineers = employees.filter(
    ({ dept, active }) => dept === "ENG" && active
);

// Step 3: Transform into display format
const displayData = activeEngineers.map(({ firstName, lastName, salary }) => ({
    fullName: `${firstName} ${lastName}`,
    salary: `Rs. ${salary.toLocaleString()}`,
    initials: `${firstName[0]}${lastName[0]}`
}));

console.log(displayData);
// [
//   { fullName: "Sara Ahmed", salary: "Rs. 95,000", initials: "SA" },
//   { fullName: "Ali Khan", salary: "Rs. 88,000", initials: "AK" },
//   { fullName: "Hassan Raza", salary: "Rs. 91,000", initials: "HR" }
// ]

// --- Pipeline 2: Group employees by department ---
const byDepartment = employees.reduce((groups, employee) => {
    const { dept, ...info } = employee;
    return {
        ...groups,
        [dept]: [...(groups[dept] || []), info]
    };
}, {});

console.log(byDepartment);
// {
//   ENG: [{ id: 1, firstName: "Sara", ... }, { id: 2, ... }, { id: 4, ... }],
//   DES: [{ id: 3, firstName: "Zara", ... }, { id: 5, ... }]
// }

// --- Pipeline 3: Create department summary ---
const deptSummary = Object.fromEntries(
    Object.entries(byDepartment).map(([dept, members]) => [
        dept,
        {
            count: members.length,
            totalSalary: members.reduce((sum, { salary }) => sum + salary, 0),
            avgSalary: Math.round(
                members.reduce((sum, { salary }) => sum + salary, 0) / members.length
            ),
            names: members.map(({ firstName }) => firstName)
        }
    ])
);

console.log(deptSummary);
// {
//   ENG: { count: 3, totalSalary: 274000, avgSalary: 91333, names: ["Sara","Ali","Hassan"] },
//   DES: { count: 2, totalSalary: 168000, avgSalary: 84000, names: ["Zara","Hira"] }
// }

// --- Pipeline 4: Merge configs with defaults ---
const systemDefaults = {
    theme: "dark",
    language: "en",
    notifications: { email: true, sms: false, push: true },
    dashboard: { layout: "grid", itemsPerPage: 10 }
};

const userConfig = {
    theme: "light",
    language: "ur",
    notifications: { email: false },
    // dashboard not specified — use defaults
};

// Shallow merge loses nested defaults:
const shallowMerge = { ...systemDefaults, ...userConfig };
console.log(shallowMerge.notifications);
// { email: false } — sms and push are GONE! ❌

// Deep merge preserves nested defaults:
const deepMerge = {
    ...systemDefaults,
    ...userConfig,
    notifications: { ...systemDefaults.notifications, ...userConfig.notifications },
    dashboard: { ...systemDefaults.dashboard, ...(userConfig.dashboard || {}) }
};
console.log(deepMerge.notifications);
// { email: false, sms: false, push: true } ✅
console.log(deepMerge.dashboard);
// { layout: "grid", itemsPerPage: 10 } ✅

// --- Pipeline 5: Object transformation with rename and reshape ---
const rawUsers = [
    { user_name: "sara_ahmed", user_email: "sara@tech.com", user_role: "admin" },
    { user_name: "ali_khan", user_email: "ali@tech.com", user_role: "editor" },
    { user_name: "zara_malik", user_email: "zara@tech.com", user_role: "viewer" }
];

// Transform: snake_case keys → camelCase, add computed fields
const transformedUsers = rawUsers.map(({ user_name, user_email, user_role }) => ({
    username: user_name,
    email: user_email,
    role: user_role,
    displayName: user_name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
    isAdmin: user_role === "admin"
}));

console.log(transformedUsers);
// [
//   { username: "sara_ahmed", email: "sara@tech.com", role: "admin",
//     displayName: "Sara Ahmed", isAdmin: true },
//   ...
// ]
```

> **Narration while typing:**
> "Pipeline 1 is the bread and butter: parse API data, filter what you need, destructure to extract fields, transform into display format. You'll write this pattern hundreds of times in React."
>
> "Pipeline 2 — grouping with `reduce` — is the most powerful pattern here. The computed property name `[dept]` creates dynamic keys, spread gathers existing members, and the `|| []` handles the first entry. This is a real enterprise pattern."
>
> "Pipeline 4 shows why shallow merge isn't enough for nested configs. You need to spread at each level — this is exactly what happens in React when you update nested state."
>
> "Pipeline 5 — renaming API fields from snake_case to camelCase — is something you'll do when integrating with Python/Ruby APIs that use different naming conventions."

---

#### Interactive Questions (Presentation/Verbal) — 75:00–77:00

**Question 1 — Predict Output:**

> "What does `JSON.parse(JSON.stringify(data))` return?"

```javascript
const data = {
    name: "Test",
    count: 0,
    active: false,
    items: undefined,
    greet: () => "hello"
};
```

> **Answer:** `{ name: "Test", count: 0, active: false }` — `items` (undefined) and `greet` (function) are both stripped by `JSON.stringify`. Numbers `0` and boolean `false` survive because they're valid JSON types.
> **Teaching moment:** "`JSON.stringify` drops `undefined` and functions. `0`, `false`, `null`, and empty string `""` are valid JSON values — they survive. This is why `structuredClone` is preferred for cloning: it preserves more types."

---

**Question 2 — Concept Challenge:**

> "How would you create an object that maps each employee's name to their salary, but only for employees earning above 85000?"

```javascript
const team = [
    { name: "Sara", salary: 95000 },
    { name: "Ali", salary: 88000 },
    { name: "Zara", salary: 82000 },
    { name: "Hassan", salary: 91000 }
];
```

> **Answer:**
> ```javascript
> const highEarners = Object.fromEntries(
>     team
>         .filter(({ salary }) => salary > 85000)
>         .map(({ name, salary }) => [name, salary])
> );
> // { Sara: 95000, Ali: 88000, Hassan: 91000 }
> ```
> **Teaching moment:** "Filter first, then map to `[key, value]` pairs, then `Object.fromEntries`. This is the standard pipeline for converting arrays to filtered objects."

---

#### Live Debugging (VS Code) — 77:00–78:30

> "Let me show you the nested merge trap that causes bugs in config management."

```javascript
// The nested merge trap
const appDefaults = {
    api: { baseUrl: "https://api.default.com", timeout: 5000, retries: 3 },
    ui: { theme: "dark", animations: true }
};

const envConfig = {
    api: { baseUrl: "https://api.production.com" }
    // Only overriding baseUrl — want to keep timeout and retries!
};

// WRONG — shallow spread replaces entire api object
const broken = { ...appDefaults, ...envConfig };
console.log(broken.api);
// { baseUrl: "https://api.production.com" }
// timeout and retries are GONE! ❌

// CORRECT — spread at each nested level
const correct = {
    ...appDefaults,
    ...envConfig,
    api: { ...appDefaults.api, ...envConfig.api },
    ui: { ...appDefaults.ui, ...(envConfig.ui || {}) }
};
console.log(correct.api);
// { baseUrl: "https://api.production.com", timeout: 5000, retries: 3 } ✅
```

> "This is a real production bug I've seen multiple times. Someone overrides one field in a nested config, and the shallow spread wipes out all the other fields. The fix: spread at every level of nesting. In React, this is called 'immutable nested state update' and it's the same pattern."

---

#### Part Closing (Presentation) — 78:30–80:00

**Common Mistakes:**
- Using `JSON.parse(JSON.stringify())` for cloning objects that contain functions, Dates, or undefined — data loss
- Forgetting that `JSON.stringify` drops `undefined` values — different from `null` (which is kept)
- Shallow merging nested configs and losing deep defaults
- Not parsing JSON before trying to access properties — `jsonString.name` is `undefined` on a string

**Optimization Tips:**
- Use `JSON.stringify(obj, null, 2)` for readable debugging output
- Use the replacer parameter to filter sensitive fields before logging: `JSON.stringify(data, ["name", "role"])`
- `structuredClone` is faster than `JSON.parse(JSON.stringify())` for deep cloning and handles more types
- For repeated transformations, extract the pipeline into a named function

**Best Practices:**
- Always validate JSON with `try/catch` before parsing: `JSON.parse` throws on invalid JSON
- Use `structuredClone` for deep cloning, `JSON.parse(JSON.stringify())` only when `structuredClone` isn't available
- Build data pipelines from small, composable steps: filter → map → fromEntries
- When merging nested objects, explicitly spread at each nesting level

**Professional Insights:**
> "In production systems, data transformation pipelines are everywhere — between your API layer and your UI components, between form submissions and API requests, between database responses and client payloads. The pattern is always the same: receive data in one shape, transform it into another. Mastering `destructuring + spread + Object.entries + fromEntries` gives you a toolkit that handles 95% of these transformations without any external libraries. I've reviewed code from teams using Lodash just for `_.merge` and `_.pick` — you now know how to do that natively."

---

### Part 5: TypeScript — Interfaces, Type Aliases & Object Types (80:00 – 86:00)

---

#### Background / Motivation (Presentation) — 80:00–81:30

> **Talking Points:**
> "Every Part today involved objects with specific shapes — employees with names, roles, and salaries. What if someone passes an employee object without a `name`? What if `salary` is a string instead of a number? In JavaScript, you'd only discover these bugs at runtime."
>
> "TypeScript catches these bugs at write-time. And the tools it uses are `interfaces` and `type aliases` — which define the shape an object must have. This is the TypeScript equivalent of everything we've done today."

**Slide: TypeScript Object Types**

| Feature | Syntax | Purpose |
|---------|--------|---------|
| Interface | `interface Employee { ... }` | Define object shape |
| Type alias | `type Employee = { ... }` | Define any type |
| Optional | `name?: string` | Property may be missing |
| Readonly | `readonly id: string` | Property cannot be reassigned |

> "Interfaces and type aliases both define object shapes. Interfaces can be extended and merged; type aliases are more flexible (unions, intersections). For objects, either works — the community convention is: interfaces for objects, types for everything else."

---

#### "Let's see in Code now" (VS Code) — 81:30–84:30

> "Switch to TypeScript Playground. Let's type our data transformation patterns."

```typescript
// ============================================
// Lecture 12 — Part 5: TypeScript Object Types
// Enterprise Data Transformer
// NexusBerry Modern Frontend Course
// ============================================

// --- Interface: defining object shape ---
interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    salary: number;
    isRemote: boolean;
}

// TypeScript enforces the shape
const sara: Employee = {
    id: "EMP-001",
    name: "Sara Ahmed",
    role: "Lead Engineer",
    department: "Engineering",
    salary: 95000,
    isRemote: true
};

// ❌ Missing property — TypeScript error!
// const ali: Employee = { id: "EMP-002", name: "Ali" };
// Error: missing role, department, salary, isRemote

// --- Optional properties ---
interface Config {
    apiUrl: string;
    timeout: number;
    retries?: number;      // optional — may or may not exist
    debugMode?: boolean;    // optional
}

const prodConfig: Config = { apiUrl: "https://api.com", timeout: 5000 };
// ✅ Valid — retries and debugMode are optional

// --- Readonly properties ---
interface AppSettings {
    readonly appName: string;
    readonly version: string;
    theme: string;         // mutable
}

const settings: AppSettings = {
    appName: "Enterprise Transformer",
    version: "2.0.0",
    theme: "dark"
};

settings.theme = "light";      // ✅ Allowed
// settings.appName = "Hacked"; // ❌ Error: cannot assign to readonly

// --- Type aliases ---
type Department = "Engineering" | "Design" | "Marketing" | "Sales";
type Salary = number;

interface TypedEmployee {
    name: string;
    department: Department;   // can only be one of 4 values
    salary: Salary;
}

const hira: TypedEmployee = {
    name: "Hira",
    department: "Design",     // ✅ Valid
    salary: 85000
};

// const invalid: TypedEmployee = {
//     name: "Test",
//     department: "Accounting", // ❌ Error: not in Department union
//     salary: 0
// };

// --- Interfaces with destructuring ---
function formatEmployee({ name, role, department }: Employee): string {
    return `${name} — ${role} (${department})`;
}

// --- Typing Object.entries and transformation pipelines ---
interface SalaryMap {
    [name: string]: number;  // index signature
}

const teamSalaries: SalaryMap = {
    sara: 95000,
    ali: 88000,
    zara: 92000
};

// Object.entries returns [string, number][]
const raised: SalaryMap = Object.fromEntries(
    Object.entries(teamSalaries).map(([name, salary]): [string, number] => [
        name,
        salary * 1.1
    ])
);

// --- Extending interfaces ---
interface Person {
    name: string;
    age: number;
}

interface Developer extends Person {
    skills: string[];
    level: "junior" | "mid" | "senior";
}

const dev: Developer = {
    name: "Ali Khan",
    age: 28,
    skills: ["React", "TypeScript"],
    level: "mid"
};
// Developer has all Person properties plus its own
```

> **Narration while typing:**
> "Interfaces are contracts. They tell TypeScript: any object claiming to be an `Employee` must have these exact fields with these exact types. Miss one? Error. Wrong type? Error. This is caught before your code ever runs."
>
> "Optional properties with `?` are critical for configs and API responses where not every field is guaranteed. Readonly properties are the TypeScript equivalent of `Object.freeze` — but enforced at compile time, not runtime."
>
> "The `extends` keyword lets you build type hierarchies. `Developer extends Person` means every Developer is a Person with extra fields. This maps directly to class inheritance in Lecture 15."

---

#### Interactive Questions (Presentation/Verbal) — 84:30–85:30

**Question 1 — Quick-Fire Recall:**

> "Three quick questions. What's the difference between `interface` and `type` for objects?"

> **Answer:** Both can define object shapes. Key differences: interfaces can be extended with `extends` and merged (declaration merging). Type aliases support unions (`A | B`) and intersections (`A & B`). Convention: interfaces for object shapes, types for unions and utilities.

---

**Question 2 — Spot the Error:**

> "Will TypeScript accept this?"

```typescript
interface Product {
    readonly id: string;
    name: string;
    price?: number;
}

const item: Product = { id: "P001", name: "Widget" };
item.name = "Super Widget";
item.price = 29.99;
item.id = "P002";
```

> **Answer:** The first two modifications are fine — `name` is mutable and `price` is optional (can be added). But `item.id = "P002"` is an error — `id` is `readonly` and cannot be reassigned after initialization.
> **Teaching moment:** "`readonly` prevents reassignment, not deep mutation. A `readonly skills: string[]` still allows `push()`. For deep immutability, you need `readonly` on nested types too — or use `Readonly<T>` utility type (covered in React module)."

---

#### Part Closing (Presentation) — 85:30–86:00

**Common Mistakes:**
- Confusing `interface` and `type` — both work for objects, but `interface` supports `extends` and declaration merging
- Forgetting that `readonly` is compile-time only — it doesn't add runtime protection like `Object.freeze`
- Making every property optional (`?`) — if data is always present, it should be required

**Best Practices:**
- Use interfaces for object shapes you'll extend or implement
- Use type aliases for unions, intersections, and utility types
- Mark IDs and timestamps as `readonly` — they shouldn't change after creation
- Only use `?` for truly optional data — don't make everything optional "just in case"

**Professional Insights:**
> "In every enterprise TypeScript project I've worked on, well-defined interfaces are the difference between a maintainable codebase and chaos. When your `Employee` interface says `salary: number`, every developer on the team knows what to expect — no guessing, no runtime checks, no bugs from passing a string where a number was expected. TypeScript interfaces are documentation that the compiler enforces."

---

### Lecture Ending (86:00 – 90:00)

---

#### Cheat Sheet Slides (Presentation) — 86:00–87:30

> "Let me walk you through the key reference points from today — these are in your cheatsheet file."

**Slide: Destructuring Cheat Sheet**
- Object: `const { a, b } = obj` — extract by name
- Array: `const [a, b] = arr` — extract by position
- Rename: `const { a: newName } = obj`
- Default: `const { a = fallback } = obj`
- Nested: `const { inner: { deep } } = obj`
- Params: `function f({ a, b }) { }`

**Slide: Spread & Rest**
- Array spread: `[...arr1, ...arr2]` — merge/copy
- Object spread: `{ ...obj1, ...obj2 }` — merge/copy (last wins)
- Array rest: `const [first, ...rest] = arr`
- Object rest: `const { id, ...rest } = obj`
- Shallow copy only! Use `structuredClone()` for deep copy

**Slide: Object Static Methods**
- `Object.keys(obj)` → array of keys
- `Object.values(obj)` → array of values
- `Object.entries(obj)` → array of [key, value] pairs
- `Object.fromEntries(pairs)` → object from pairs
- `Object.freeze(obj)` → immutable (shallow)
- `Object.seal(obj)` → fixed shape, mutable values

**Slide: Data Transformation Pipeline**
- Parse: `JSON.parse(string)` → object
- Extract: Destructuring → specific fields
- Transform: `Object.entries()` → `filter/map` → `Object.fromEntries()`
- Merge: `{ ...defaults, ...overrides }` (spread at each level for nested)
- Serialize: `JSON.stringify(obj)` → string

**Slide: TypeScript Object Types**
- `interface Name { prop: type }` — object shape
- `type Name = { prop: type }` — any type
- `prop?: type` — optional
- `readonly prop: type` — immutable
- `interface B extends A` — inheritance

> "The full cheat sheet is shared after class. It covers everything from today with code examples for each pattern."

---

#### Assignment Introduction (Presentation) — 87:30–89:00

> "Your assignment for this lecture: build a complete Enterprise Data Transformer."

**Assignment: Enterprise Data Transformer (Lecture 12)**

Requirements:
1. Create a dataset of at least 8 employee objects with nested properties (personal info, professional info, address, skills array)
2. Use destructuring to extract specific fields from individual employees (both object and array destructuring)
3. Use the spread operator to create modified copies of employees without mutating originals — demonstrate at least 3 different spread patterns
4. Use rest destructuring to strip sensitive fields (salary, SSN) from employee objects — create a "public profile" view
5. Use `Object.freeze` on a config object and demonstrate that modifications fail
6. Build at least 3 data transformation pipelines using `Object.entries()` → HOFs → `Object.fromEntries()`:
   - Group employees by department
   - Calculate department salary statistics
   - Filter and reshape data for display
7. Use `JSON.stringify` and `JSON.parse` for data serialization — include a pretty-printed report
8. Define TypeScript interfaces for all your data structures (use comments or TypeScript Playground)

> "Submit via Google Classroom by the next session. The grading criteria are in the `assignment.md` file."

---

#### Q&A — 89:00–89:30

> "Any questions before we close? Today was packed — destructuring, spread/rest, immutability, Object methods, JSON, data pipelines, and TypeScript interfaces. These are patterns you'll use in every React component starting in Module 3."

*Common questions to anticipate:*
- "When should I use `structuredClone` vs `JSON.parse(JSON.stringify)`?" → `structuredClone` is better — it handles Dates, RegExps, Maps, Sets, and circular references. Use JSON clone only when `structuredClone` isn't available (very old environments).
- "Should I always destructure function parameters?" → For objects with more than 2 properties you'll use, yes. For simple functions with 1-2 params, regular parameters are fine.
- "Interface or type — which should I use?" → Community convention: interfaces for object shapes (they can be extended). Type aliases for unions, intersections, and utility types.
- "Do I need to use `Object.freeze` in real projects?" → For shared config objects and constants, yes. For local variables that only live in one function, it's unnecessary overhead.

---

#### Next Lecture Teaser — 89:30–90:00

> *Show the "Next Lecture" closing slide.*
>
> "In Lecture 13, we build the **Smart Content Analyzer & Validator** — and for that, we need two critical skills: string processing and error handling. We'll master every string method JavaScript offers, learn regular expressions for pattern matching — email validation, password strength, URL detection — and then build defensive error handling with `try/catch`. Every data transformation pipeline you built today could fail with bad input. Lecture 13 teaches you how to validate that input and handle failures gracefully. See you in Lecture 13."

---

## Phase 2: Share After Lecture

- [ ] Upload video recording to Google Classroom
- [ ] Push `code/` folder (with `transformer.js`) to course repo
- [ ] Post `assignment.md` to Google Classroom
- [ ] Share `presentation/` folder (HTML export or direct link)
- [ ] Post `cheatsheet.md` to Google Classroom
- [ ] Upload `quiz.md` to online portal — students should attempt before Lecture 13

---

## Interactive Questions Summary

| Part | Type | Topic | Purpose |
|------|------|-------|---------|
| Part 1 | Predict Output | Destructuring with rename and default value | Teach that renamed vars replace original key names |
| Part 1 | Spot the Error | Nested destructuring on `undefined` | Show defensive destructuring with `= {}` defaults |
| Part 1 | Concept Challenge | Array destructuring with skipping | Reinforce positional extraction with comma placeholders |
| Part 2 | Predict Output | Shallow copy mutation of nested array | Demonstrate that spread is shallow — nested refs shared |
| Part 2 | Quick-Fire Recall | Spread vs Rest — context determines meaning | Cement the mental model: expanding vs collecting |
| Part 2 | Concept Challenge | Strip field + override with spread/rest | Real-world pattern: rest to remove, spread to override |
| Part 3 | Predict Output | `entries → filter → map → fromEntries` pipeline | Practice reading multi-step object transformation |
| Part 3 | Hidden Fact Reveal | `Object.freeze` is shallow, not deep | Correct common misconception about freeze depth |
| Part 3 | Spot the Error | `Object.assign` mutates target | Teach the mutation risk of `assign` vs spread |
| Part 4 | Predict Output | `JSON.stringify` drops undefined and functions | Teach JSON serialization limitations |
| Part 4 | Concept Challenge | Array → filtered object pipeline | Practice the filter + map + fromEntries pattern |
| Part 5 | Quick-Fire Recall | Interface vs type alias differences | Clarify when to use each for object shapes |
| Part 5 | Spot the Error | Readonly property reassignment | Teach that `readonly` prevents reassignment only |
