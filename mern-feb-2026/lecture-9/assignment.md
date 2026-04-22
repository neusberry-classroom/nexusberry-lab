# Assignment: University Admission Gateway

## Overview
Build your own University Admission Gateway that processes a student application through multiple decision stages — using every conditional construct covered in Lecture 9. Your gateway collects real user input via `prompt-sync`, runs it through decision logic, and outputs a formatted admission report. This is the kind of decision logic found in every real-world application: enrollment systems, e-commerce checkout flows, form validation engines, and role-based access control. Mastering it here means you can implement it anywhere.

---

## Requirements

Your University Admission Gateway must meet all of the following requirements.

### 1. Interactive User Input (`prompt-sync`)
- Use `prompt-sync` to collect student data from the terminal:
  - Student name (string)
  - Age (number — must convert with `Number()`)
  - Scores for **3 subjects** (numbers — must convert with `Number()`)
  - Department choice (string)
  - Entrance exam status (yes/no — convert to boolean)
- All numeric input must be converted using `Number()` immediately — no string math allowed
- Run your project with `node admission.js`

### 2. Student Application Object
- After collecting input, create a student application object with **at least 8 properties** including:
  - `name` (string), `age` (number), `department` (string)
  - `scores` — a nested object with at least **3 subject scores** (e.g., `{ math: 82, english: 74, science: 91 }`)
  - `entranceExam` (boolean — converted from user's yes/no input)
  - `address` — a nested object with `city` (other address fields are optional)
  - At least **one property set to `null`** (e.g., scholarship not yet determined)
  - At least **one property set to `undefined`** or missing entirely (e.g., optional referral)

### 3. Score Classification (`if / else if / else`)
- Calculate the **average score** across all subjects
- Classify the student into **exactly 4 tiers** based on the average:

| Tier | Condition | Label |
|------|-----------|-------|
| Tier 1 | Average ≥ 80 | Excellent — Direct Admission |
| Tier 2 | Average ≥ 60 | Good — Standard Admission |
| Tier 3 | Average ≥ 40 | Conditional — Remedial Required |
| Tier 4 | Average < 40 | Below Minimum — Not Eligible |

- Conditions **must be ordered from highest to lowest** (most restrictive first)

### 4. Department Routing (`switch`)
- Use a `switch` statement to route the student to one of **at least 4 departments**
- Each case must:
  - Print the department name and building/location
  - Check **one department-specific prerequisite** (e.g., CS requires math ≥ 70, Medicine requires science ≥ 85)
  - Set a `prerequisitesMet` boolean based on the check
- Include a `default` case that handles unknown departments
- Include `break` in every case
- **Bonus**: Use intentional fall-through to group at least 2 departments into the same faculty (e.g., Physics and Chemistry → Faculty of Sciences)

### 5. Ternary Operator (at least 3 uses)
Use ternary operators for at least **3 simple value assignments**, such as:
- Scholarship message: different text based on scholarship percentage
- Prerequisite display: "Met ✅" vs "Not Met ❌"
- Fee calculation: international vs domestic tuition
- Seat availability message

**Rule:** Each ternary must be a value assignment. Simple two-way ternaries are preferred. A vertically-formatted nested ternary for 2-3 branch value assignment (like the scholarship calculation) is acceptable — but do not use deeply nested ternaries (4+) or ternaries with side effects.

### 6. Default Values & Safe Access (`||`, `??`, `?.`)
- Use `||` to provide a default for at least one truly empty/falsy value (e.g., empty name → "Anonymous")
- Use `??` to provide a default for at least one `null`/`undefined` value (e.g., scholarship → calculated value)
- **Demonstrate the difference** between `||` and `??` with a comment explaining why you chose each
- Use `?.` (optional chaining) to safely access at least **2 nested properties** that might be missing (e.g., `application.address?.state`, `application.referral?.name`)
- Combine `?.` with `??` at least once: `value?.property ?? "default"`

### 7. Logical Assignment Operators
- Use at least **one** logical assignment operator (`??=`, `||=`, or `&&=`)
- Add a comment explaining what it does and when it assigns

### 8. Final Admission Decision
- Write a multi-condition `if / else if / else` chain that combines:
  - Average score
  - Prerequisites status
  - Entrance exam status
- Produce one of these outcomes: ADMITTED, WAITLISTED, CONDITIONAL, or REJECTED
- Each outcome must have a distinct message

### 9. Console Report
Print a **formatted admission report** to the console that includes:
- Student name, age, department
- Average score (formatted to 1 decimal place using `.toFixed(1)`)
- Eligibility tier
- Prerequisites status
- Entrance exam status
- Scholarship percentage
- Final admission decision
- Use visual separators (e.g., `========` lines) for readability

---

## Example Structure

The example below shows the expected code pattern. Your full submission should follow this same style across all sections.

```javascript
// ============================================
// University Admission Gateway
// Assignment — Lecture 9
// Your Name
// ============================================

// --- Setup: prompt-sync ---
const prompt = require("prompt-sync")();

// --- Step 1: Collect Student Data (User Input) ---
console.log("\n========================================");
console.log("   UNIVERSITY ADMISSION GATEWAY");
console.log("========================================\n");

const studentName = prompt("Enter student name: ");
const studentAge = Number(prompt("Enter age: "));
const mathScore = Number(prompt("Enter Math score (0-100): "));
// ... collect more input ...

const entranceExamInput = prompt("Passed entrance exam? (yes/no): ");
const entranceExam = entranceExamInput.toLowerCase() === "yes";

// --- Step 2: Build Application Object ---
const application = {
    name: studentName,
    age: studentAge,
    scores: { math: mathScore, /* ... */ },
    department: /* from input */,
    entranceExam: entranceExam,
    address: { city: "Lahore" },
    scholarship: null,       // not yet determined
    referral: undefined       // optional field
};

// --- Step 3: Score Classification (if/else) ---
const avgScore = (application.scores.math +
    application.scores.english +
    application.scores.science) / 3;

let eligibility;

if (avgScore >= 80) {
    eligibility = "Excellent — Direct Admission";
} else if (avgScore >= 60) {
    eligibility = "Good — Standard Admission";
} else if (avgScore >= 40) {
    eligibility = "Conditional — Remedial Required";
} else {
    eligibility = "Below Minimum — Not Eligible";
}

// --- Step 4: Department Routing (switch) ---
// ... your switch statement here ...

// --- Step 5: Ternary Operators ---
const prereqLabel = prerequisitesMet ? "Met ✅" : "Not Met ❌";

// --- Step 6: Defaults & Safe Access ---
const city = application.address?.city ?? "City not provided";
// Using ?? because city could be null/undefined — but 0 or "" would be valid

// --- Step 7: Logical Assignment ---
let studentNotes = application.notes;
studentNotes ??= "No additional notes";  // assigns only if null/undefined

// --- Step 8: Final Decision ---
// ... your multi-condition if/else here ...

// --- Step 9: Console Report ---
console.log("========================================");
console.log("   ADMISSION DECISION REPORT");
// ... formatted output ...
console.log("========================================");
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class — contains all operator reference tables and `prompt-sync` setup guide
- **MDN Reference**: [Conditional Statements](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals)
- **MDN Reference**: [Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- **MDN Reference**: [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- **npm Reference**: [prompt-sync](https://www.npmjs.com/package/prompt-sync)

---

## Submission Instructions

1. Create a folder named `assignment-9-your-name/`
2. Initialize the project: `npm init -y` and `npm install prompt-sync`
3. Include all project files: `admission.js`, `package.json`
4. Compress to ZIP or push to a GitHub repository
5. Upload to Google Classroom before the deadline
6. **Important:** Do NOT include the `node_modules/` folder in your ZIP — only `admission.js` and `package.json`

**Deadline:** Before Lecture 10

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] `prompt-sync` is installed and `const prompt = require("prompt-sync")()` is at the top of your file
- [ ] All numeric input converted with `Number()` — no string concatenation bugs
- [ ] Running `node admission.js` starts the interactive input and produces output
- [ ] Student application object has at least 8 properties (including null and undefined values)
- [ ] `if / else if / else` correctly classifies into exactly 4 tiers (highest threshold checked first)
- [ ] `switch` routes to at least 4 departments with `break` and `default`
- [ ] At least 3 ternary operators used for value assignments
- [ ] Both `||` and `??` are used with a comment explaining the choice
- [ ] `?.` (optional chaining) used at least twice for nested property access
- [ ] At least one `?.` + `??` combination exists
- [ ] At least one logical assignment operator (`??=`, `||=`, or `&&=`) is used
- [ ] Final decision uses a multi-condition `if/else` combining score + prerequisites + entrance exam
- [ ] Formatted console report includes all required fields
- [ ] No `var` anywhere — only `const` and `let`
- [ ] All comparisons use `===` and `!==` (never `==` or `!=`)
- [ ] Code runs without errors: `node admission.js`

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **Interactive Input** — `prompt-sync` setup, collects all required data, `Number()` conversion for all numeric input, yes/no to boolean conversion | 15 |
| **Score Classification** — Correct `if/else if/else` with 4 tiers, proper ordering, average calculation | 15 |
| **Department Routing** — `switch` with 4+ departments, `break`, `default`, prerequisite check per department | 15 |
| **Ternary & Value Assignment** — 3+ ternaries for value assignments, correct usage | 15 |
| **Modern Operators** — `||` vs `??` with explanation, `?.` for safe access, `?.` + `??` combo, logical assignment | 15 |
| **Final Decision & Report** — Multi-condition decision logic, formatted console output with all fields | 15 |
| **Code Quality & Best Practices** — Proper indentation, meaningful variable names, `const`/`let` only, `===` only, comments explaining key decisions | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A submission that attempts all sections but has minor bugs will score higher than one that perfects only two sections.

---

## Tips for Success

1. **Set up prompt-sync first** — run `npm init -y` and `npm install prompt-sync`, then test with a simple `const name = prompt("Name: "); console.log(name);` before building the full gateway
2. **Follow the Part order** — build your code in the same sequence as the lecture: input → data object → score check → department → ternary → operators → decision → report
3. **Test after each step** — run `node admission.js` after completing each section, don't wait until the end
4. **Use the cheatsheet** — the "Quick Reference Table" has every operator and when to use it
5. **Try different inputs** — enter different scores, departments, and exam statuses to make sure all branches work (not just the "happy path")

---

## Common Mistakes to Avoid

- **Forgetting `Number()` on input**: `prompt-sync` returns strings. `"80" + "70"` gives `"8070"`, not `150`. Always wrap numeric input in `Number()`
- **Wrong condition order**: Checking `score >= 40` before `score >= 80` — the first truthy condition wins, so 95 would match "Conditional" instead of "Excellent"
- **Missing `break` in switch**: Without `break`, code falls through to the next case — a student routed to "CS" might also get "Business" output
- **Using `||` when `??` is needed**: If a scholarship is `0` (valid — no discount), `||` replaces it with a default. Use `??` to preserve zero.
- **Forgetting `default` in switch**: Always handle the "none matched" case
- **Using `==` instead of `===`**: Loose equality causes type coercion bugs. Always use strict equality.
- **Not including `package.json`**: Your submission must include `package.json` so the grader can run `npm install` and then `node admission.js`

---

## Need Help?

- Review the **lecture recording** on Google Classroom
- Check the **`cheatsheet.md`** file for quick reference — especially the "Which Construct?" and "User Input with prompt-sync" sections
- Post questions in the **Google Classroom comments** (classmates can help too)
- Attend office hours (schedule posted on Google Classroom)

Every professional developer started exactly where you are — writing `if` statements and `switch` cases for the first time. The code you're writing today is the same decision logic that powers every application on the internet. The difference between a beginner and a senior developer isn't knowing more syntax — it's knowing which tool to reach for. This assignment builds exactly that judgment. Keep going.
