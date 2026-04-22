# Assignment: Employee Profile Generator

## Overview

Build a complete Employee Profile Generator that demonstrates your mastery of JavaScript functions, closures, and higher-order array methods. You'll create reusable functions, use closures for data encapsulation, and process employee data using the full HOF toolkit — the exact skills you'll use daily when building React applications and working with API data.

---

## Requirements

Your Employee Profile Generator must include:

### 1. Functions & Closures
- Write a `generateId` **closure factory** that accepts a department prefix and returns a function that produces sequential IDs (e.g., `ENG-0001`, `ENG-0002`, `MKT-0001`)
- Create at least **3 pure functions** for data formatting:
  - A function that formats an employee's full display name
  - A function that formats a salary as currency (e.g., `Rs. 95,000`)
  - A function that generates a rating display (e.g., `★★★★★★★★☆☆ 8/10` or `8/10 — Excellent`)
- Use **default parameters** in at least one function
- Use **rest parameters** (`...args`) in at least one function

### 2. Employee Data
- Create an array of **at least 8 employee objects**, each with these properties:

| Property | Type | Description |
|----------|------|-------------|
| **name** | `string` | Employee full name |
| **department** | `string` | At least 3 different departments used |
| **salary** | `number` | Monthly salary |
| **rating** | `number` | Performance rating (1-10) |
| **active** | `boolean` | Currently active or not |
| **joinDate** | `string` | Date joined (e.g., `"2024-03-15"`) |

### 3. Higher-Order Array Methods
Use **every** one of the following methods at least once:

| Method | Your Usage |
|--------|-----------|
| **`forEach`** | Print a formatted employee directory to the console |
| **`map`** | Create an array of display cards with transformed data |
| **`filter`** | Create at least **3 different filtered views** (by department, by rating, by active status) |
| **`find`** | Look up a specific employee by name |
| **`some`** | Check if any employee meets a condition (e.g., rating === 10) |
| **`every`** | Check if all employees meet a condition (e.g., salary > 0) |
| **`reduce`** | Calculate at least **2 aggregate values** (total payroll, average rating, or department breakdown) |
| **`sort`** | Sort employees by at least **2 different criteria** (salary, name, rating) — always on a copy! |

### 4. Method Chaining
- Build at least **2 chained pipelines** that combine multiple HOFs (e.g., `filter` + `sort` + `map`)
- Example pipeline: "Active engineers, sorted by rating descending, formatted as report strings"

### 5. Technical Requirements
- Use only `const` and `let` — never `var`
- Use `const` for all function expressions and arrow functions
- All `sort` calls must sort a **copy** using `[...arr].sort()` — never mutate the original
- Always provide a comparator function to `sort()` when sorting numbers
- Add clear comments marking each section (e.g., `// === Closure Factory ===`)
- All code must run without errors in the browser console or Node.js

---

## Example Structure

```javascript
// ============================================
// Assignment 11 — Employee Profile Generator
// Your Name
// NexusBerry Modern Frontend Course
// ============================================

// === Closure Factory: ID Generator ===
function createIdGenerator(prefix) {
    let nextId = 1;
    return function(name) {
        const id = `${prefix}-${String(nextId).padStart(4, "0")}`;
        nextId++;
        return { id, name };
    };
}

const generateEngId = createIdGenerator("ENG");
console.log(generateEngId("Your Name"));  // { id: "ENG-0001", name: "Your Name" }

// === Pure Functions ===
const formatName = (firstName, lastName) => `${firstName} ${lastName}`;
const formatSalary = (amount) => `Rs. ${amount.toLocaleString()}`;

// === Employee Data ===
const employees = [
    { name: "...", department: "...", salary: 0, rating: 0, active: true, joinDate: "2024-01-15" },
    // ... at least 8 employees
];

// === forEach: Employee Directory ===
employees.forEach((emp, index) => {
    console.log(`${index + 1}. ${emp.name} — ${emp.department}`);
});

// === map: Display Cards ===
const cards = employees.map(emp => ({
    displayName: emp.name.toUpperCase(),
    salary: formatSalary(emp.salary),
    status: emp.active ? "Active" : "Inactive"
}));

// === filter: Filtered Views ===
const activeEmployees = employees.filter(emp => emp.active);

// === Chained Pipeline ===
const report = employees
    .filter(emp => emp.active && emp.department === "Engineering")
    .sort((a, b) => b.rating - a.rating)
    .map(emp => `${emp.name} — Rating: ${emp.rating}/10`);
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class
- **MDN Array Methods**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

---

## Submission Instructions

1. Create a folder named `assignment-11-your-name/`
2. Include your JavaScript file (e.g., `profiles.js`)
3. Optionally include `index.html` if you want browser-based output
4. Compress to ZIP or push to a GitHub repository
5. Upload to Google Classroom before the deadline

**Deadline:** Before Lecture 12

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] Closure factory (`generateId`) works and produces sequential IDs
- [ ] At least 3 pure functions are implemented for formatting
- [ ] Employee array has at least 8 objects with all 6 required properties
- [ ] All 8 HOF methods are used: `forEach`, `map`, `filter`, `find`, `some`, `every`, `reduce`, `sort`
- [ ] `sort` always operates on a copy (`[...arr].sort(...)`) — never on the original
- [ ] `sort` on numbers uses a comparator function (not default string sort)
- [ ] At least 2 chained pipelines are implemented
- [ ] Code runs without errors in the console (`node profiles.js` or browser DevTools)
- [ ] Clear comments mark each section
- [ ] Only `const` and `let` used — no `var`

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **Functions & Closures** — ID generator factory, 3 pure functions, default/rest params | 25 |
| **Higher-Order Array Methods** — All 8 methods used correctly with meaningful operations | 25 |
| **Data & Filtering** — 8+ employees, 3 filtered views, find lookup, some/every checks | 20 |
| **Chaining & Aggregation** — 2+ pipelines, reduce for totals/averages/grouping | 15 |
| **Code Quality & Best Practices** — const/let only, sort on copies, clear comments, no errors | 15 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A working submission with some missing methods scores higher than a non-working submission that attempts everything.

---

## Tips for Success

1. **Build incrementally** — start with the employee data array, then add functions one at a time
2. **Test each method individually** — run your code after adding each HOF to catch bugs early
3. **Use the cheatsheet** — the Quick Decision Guide tells you exactly which method to use for each task
4. **console.log everything** — verify each step produces the expected output before moving on
5. **Copy the lecture code patterns** — the assignment uses the same patterns you saw in class

---

## Common Mistakes to Avoid

- Using `forEach` to build a new array (use `map` instead)
- Forgetting `return` inside arrow functions with curly braces `{ }`
- Returning an object literal from an arrow function without wrapping in `( )` — `() => ({ key: val })`
- Sorting the original array instead of a copy — always use `[...arr].sort()`
- Using `sort()` on numbers without a comparator — default sort is lexicographic (string-based)
- Using `filter()[0]` when `find` is the correct choice
- Submitting without running the code — open the console and check for errors!

---

## Need Help?

- Review the **lecture recording** on Google Classroom
- Check the **`cheatsheet.md`** file — it has code examples for every method
- Post questions in the **Google Classroom comments** (classmates can help too)
- Attend office hours (schedule posted on Google Classroom)

Every function you write, every `map` and `filter` you chain — these are the exact patterns you'll use in React components, API data processing, and real client projects. This isn't a classroom exercise; it's practice for the work you'll do professionally. Keep building.
