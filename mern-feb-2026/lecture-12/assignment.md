# Assignment: Enterprise Data Transformer

## Overview
Build your own Enterprise Data Transformer that processes a dataset of employee records through multiple transformation stages — using every data manipulation pattern covered in Lecture 12. Your transformer destructures nested data, creates immutable copies, builds transformation pipelines with Object methods, and serializes results with JSON. This is the data layer work found in every real-world frontend application: parsing API responses, reshaping data for UI components, merging user preferences with defaults, and stripping sensitive fields before display. Mastering it here means you're ready for React state management in Module 3.

---

## Requirements

Your Enterprise Data Transformer must meet all of the following requirements.

### 1. Employee Dataset (8+ Records)
- Create an array of at least **8 employee objects**, each containing:
  - `id` (string, e.g., "EMP-001")
  - `personal` — nested object with: `name` (string), `age` (number), `address` (nested object with `city`, `country`)
  - `professional` — nested object with: `title` (string), `department` (string), `salary` (number), `startDate` (string)
  - `skills` — array of at least 3 strings
  - `isActive` (boolean)
- Employees must span at least **3 different departments** (e.g., Engineering, Design, Marketing)
- At least 2 employees should have `isActive: false`
- At least 1 employee should have a missing/undefined nested property (e.g., no `address.country`)

### 2. Object & Array Destructuring
- Use **object destructuring** to extract specific fields from at least 3 different employees:
  - Basic extraction: `const { personal, professional } = employee;`
  - Renaming: `const { personal: { name: empName } } = employee;`
  - Default values: `const { professional: { bonus = 0 } } = employee;`
- Use **array destructuring** to:
  - Extract the first and second skills from an employee's skills array
  - Skip elements using commas
  - Swap two variables without a temporary variable
- Use **nested destructuring** to extract a deeply nested property (e.g., `address.city`) in one statement
- Use **destructuring in function parameters** for at least one function:
  ```javascript
  function formatEmployee({ personal: { name }, professional: { title, department } }) {
      return `${name} — ${title} (${department})`;
  }
  ```

### 3. Spread Operator (3+ Patterns)
Demonstrate at least **3 different spread patterns**:
- **Array spread**: Merge two arrays (e.g., combining skills from two departments)
- **Object spread**: Create a modified copy of an employee (e.g., promote to a new title) without mutating the original
- **Override pattern**: Merge a defaults object with user-specific overrides using `{ ...defaults, ...overrides }`
- After each spread operation, **verify the original is unchanged** by logging it

### 4. Rest Operator — Public Profile
- Use rest destructuring to strip sensitive fields from employee objects:
  ```javascript
  const { professional: { salary }, ...publicData } = employee;
  ```
- Create a `getPublicProfiles(employees)` function that returns an array of employee objects with `salary` removed
- Log both the original employee and the public version to demonstrate no mutation

### 5. Immutability (`Object.freeze`)
- Create an `APP_CONFIG` object with at least 5 properties (including a nested object or array)
- Apply `Object.freeze()` to the config
- **Demonstrate** that top-level modifications fail (attempt to change a property, attempt to add a new one)
- **Demonstrate** that nested modifications still work (showing freeze is shallow)
- Add a comment explaining how you would achieve deep immutability

### 6. Data Transformation Pipelines (3 Pipelines)
Build at least **3 transformation pipelines** using `Object.entries()` → HOFs → `Object.fromEntries()`:

**Pipeline A — Department Grouping:**
- Group all active employees by department
- Use `reduce` with spread and computed property names
- Output: `{ Engineering: [...], Design: [...], Marketing: [...] }`

**Pipeline B — Salary Statistics:**
- For each department, calculate: `count`, `totalSalary`, `avgSalary`, `highestPaid` (name)
- Use `Object.entries` + `map` + `reduce` patterns
- Output: an object keyed by department name with statistics

**Pipeline C — Filtered & Reshaped Display Data:**
- Filter active employees from a specific department
- Transform into display format: `{ fullName, initials, title, yearsAtCompany }` (calculate years from `startDate`)
- Use destructuring in the `map` callback

### 7. JSON Serialization
- Use `JSON.stringify` to produce:
  - A compact JSON string of one employee
  - A **pretty-printed** version (with `null, 2` spacing)
  - A filtered version using a **replacer array** (only public fields)
- Use `JSON.parse` to parse a JSON string back into an object
- Demonstrate the **JSON clone limitation**: create an object with a `Date`, a function, and `undefined`, then show what `JSON.parse(JSON.stringify(...))` produces vs `structuredClone`

### 8. TypeScript Interfaces (Comments or TS Playground)
Define TypeScript types for your data structures (as comments or in TypeScript Playground):
- An `Employee` interface with all required properties (use nested interfaces for `personal` and `professional`)
- Mark `id` as `readonly`
- Mark optional properties with `?` (e.g., `address.country?`)
- A `Department` type alias as a string union
- An `EmployeeDisplayData` interface for the transformed display format
- At least one interface that `extends` another

---

## Example Structure

The example below shows the expected code pattern. Your full submission should follow this same style across all sections.

```javascript
// ============================================
// Enterprise Data Transformer
// Assignment — Lecture 12
// NexusBerry Modern Frontend Course
// Your Name Here
// ============================================

// === Section 1: Employee Dataset ===
const employees = [
    {
        id: "EMP-001",
        personal: {
            name: "Sara Ahmed",
            age: 32,
            address: { city: "Lahore", country: "Pakistan" }
        },
        professional: {
            title: "Lead Engineer",
            department: "Engineering",
            salary: 95000,
            startDate: "2021-03-15"
        },
        skills: ["React", "TypeScript", "Node.js"],
        isActive: true
    },
    // ... 7+ more employees
];

// === Section 2: Destructuring ===
// Object destructuring with renaming
const { personal: { name: leadName }, professional: { title: leadTitle } } = employees[0];
console.log(`Lead: ${leadName} — ${leadTitle}`);

// Array destructuring — extract first two skills
const { skills: [primarySkill, secondarySkill] } = employees[0];
console.log(`Top skills: ${primarySkill}, ${secondarySkill}`);

// Destructuring in function params
function formatEmployee({ personal: { name }, professional: { title, department } }) {
    return `${name} — ${title} (${department})`;
}
console.log(formatEmployee(employees[0]));

// === Section 3: Spread — Modified copy ===
const promoted = {
    ...employees[0],
    professional: {
        ...employees[0].professional,
        title: "Principal Engineer",
        salary: employees[0].professional.salary * 1.15
    }
};
console.log("Original title:", employees[0].professional.title);  // unchanged
console.log("Promoted title:", promoted.professional.title);

// === Section 4: Rest — Strip salary ===
function getPublicProfile(emp) {
    const { professional: { salary, ...publicProfessional }, ...rest } = emp;
    return { ...rest, professional: publicProfessional };
}
console.log(getPublicProfile(employees[0]));  // no salary field

// === Section 6: Pipeline — Group by department ===
const byDepartment = employees
    .filter(({ isActive }) => isActive)
    .reduce((groups, emp) => {
        const dept = emp.professional.department;
        return { ...groups, [dept]: [...(groups[dept] || []), emp] };
    }, {});
console.log(byDepartment);

// ... continue with remaining sections
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class — contains all destructuring, spread, Object method, and JSON patterns
- **MDN Reference**: [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- **MDN Reference**: [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- **MDN Reference**: [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- **MDN Reference**: [Object.fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
- **MDN Reference**: [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)

---

## Submission Instructions

1. Create a folder named `assignment-12-your-name/`
2. Include your project file: `transformer.js`
3. Compress to ZIP or push to a GitHub repository
4. Upload to Google Classroom before the deadline
5. **Important:** Your code must run without errors: `node transformer.js`

**Deadline:** Before Lecture 13

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] Dataset has at least 8 employee objects with nested `personal`, `professional`, `skills`, and `isActive`
- [ ] Employees span at least 3 different departments
- [ ] At least 1 employee has a missing/undefined nested property
- [ ] Object destructuring demonstrated: basic extraction, renaming, and default values
- [ ] Array destructuring demonstrated: positional extraction, skipping elements, variable swapping
- [ ] Nested destructuring used to extract a deep property in one statement
- [ ] At least 1 function uses destructuring in its parameters
- [ ] At least 3 spread patterns demonstrated (array merge, object copy with override, defaults merge)
- [ ] Original data verified unchanged after each spread operation
- [ ] Rest destructuring strips salary from employee objects
- [ ] `getPublicProfiles` function returns employees without salary
- [ ] `Object.freeze` applied to config; top-level modification shown to fail
- [ ] Shallow freeze limitation demonstrated (nested mutation works)
- [ ] Pipeline A: employees grouped by department using `reduce`
- [ ] Pipeline B: salary statistics per department (count, total, average, highest paid)
- [ ] Pipeline C: filtered + reshaped display data with destructuring in `map`
- [ ] `JSON.stringify` demonstrated: compact, pretty-printed, and with replacer
- [ ] JSON clone limitation demonstrated (`Date`, function, `undefined`)
- [ ] TypeScript interfaces defined as comments (Employee, Department, display type, extends)
- [ ] No `var` anywhere — only `const` and `let`
- [ ] All code runs without errors: `node transformer.js`

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **Employee Dataset** — 8+ employees with nested structure, 3+ departments, missing property, active/inactive mix | 10 |
| **Destructuring** — Object (basic, rename, default), array (positional, skip, swap), nested, function params | 20 |
| **Spread & Rest** — 3+ spread patterns with verification, rest to strip sensitive fields, public profile function | 20 |
| **Immutability** — `Object.freeze` on config, top-level fail demo, shallow limitation demo, deep freeze comment | 10 |
| **Data Pipelines** — 3 pipelines using `entries/fromEntries` + HOFs: grouping, statistics, display transform | 20 |
| **JSON Serialization** — stringify (compact, pretty, replacer), parse, clone limitation demo with `structuredClone` comparison | 10 |
| **Code Quality & Best Practices** — Proper indentation, meaningful names, `const`/`let` only, organized by section, comments explaining key patterns, TypeScript interfaces as comments | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A submission that attempts all sections but has minor bugs will score higher than one that perfects only three sections.

---

## Tips for Success

1. **Build section by section** — complete Section 1 (dataset), test it, then move to Section 2 (destructuring), and so on
2. **Log after every operation** — use `console.log` to verify your destructured values, spread copies, and pipeline outputs
3. **Verify immutability** — after every spread/copy, log the original to prove it wasn't mutated
4. **Start with Pipeline A** (grouping) — it's the foundation that Pipelines B and C build on
5. **Use the cheatsheet** — the "Quick Reference Table" has every pattern and its syntax
6. **Test with `node transformer.js`** — make sure it runs end-to-end without errors before submitting

---

## Common Mistakes to Avoid

- **Shallow copy trap**: Using `{ ...employee }` and then modifying `employee.skills.push(...)` — the nested array is still shared. Use nested spread: `{ ...emp, skills: [...emp.skills] }`
- **Rest not last**: `const { ...rest, name } = obj` is a SyntaxError — rest must be the last element
- **Forgetting defaults in nested destructuring**: If a nested property might be `undefined`, provide a default: `const { address: { country } = {} } = personal;`
- **Confusing `Object.entries` output**: Each entry is `[key, value]` — destructure it: `.map(([key, value]) => ...)`
- **Using `Object.assign` instead of spread**: `Object.assign(target, source)` mutates the target. Use `{ ...target, ...source }` instead
- **Forgetting `Object.fromEntries`**: After filtering/mapping entries, convert back to an object — don't return an array of pairs
- **Not converting `startDate` for year calculation**: Use `new Date(startDate).getFullYear()` to extract the year for "years at company" calculation

---

## Need Help?

- Review the **lecture recording** on Google Classroom
- Check the **`cheatsheet.md`** file for quick reference — especially the "Quick Reference Table" and "Data Transformation Pipelines" sections
- Post questions in the **Google Classroom comments** (classmates can help too)
- Attend office hours (schedule posted on Google Classroom)

Every data-driven application you'll ever build — React dashboards, API integrations, e-commerce platforms — relies on the exact patterns you're practicing here: destructure the data, spread it into new shapes, transform it through pipelines, and serialize it for transport. These aren't academic exercises — they're the daily toolkit of every professional JavaScript developer. The code you write in this assignment uses the same patterns you'll see in production React codebases starting in Module 3. Keep building.
