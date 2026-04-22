# Lecture 9: Conditional Logic & Program Flow Control

## PRESENTER ONLY (Not shared with students)

### Overview
- **Format**: Live Google Meet session
- **Style**: Presentation-driven (reveal.js) + live coding (VS Code)
- **Project**: University Admission Gateway
- **Goal**: Master every conditional construct in JavaScript — students leave knowing how to write branching logic with `if/else`, `switch`, ternary (including nested ternary decision-making), short-circuit evaluation, nullish coalescing, optional chaining, and logical assignment operators — collect interactive user input via `prompt-sync` in Node.js — and understand how TypeScript narrows types through these constructs — so they can build decision-driven applications from Lecture 10 onward

---

## Pre-Class Setup Checklist

- [ ] VS Code with clean dark theme (Dracula or One Dark Pro recommended)
- [ ] Font size set to 18–20px for screen-share readability
- [ ] Browser (Chrome) open with DevTools on Console tab, ready to run snippets
- [ ] Blank project folder created: `university-admission/`
- [ ] New file open and ready: `university-admission/admission.js`
- [ ] Presentation loaded: `presentation/index.html` open in browser tab
- [ ] reveal.js CDN verified — advance through first 3 slides to confirm it loads
- [ ] Node.js installed and `node --version` confirms LTS (for terminal demos and prompt-sync)
- [ ] `prompt-sync` pre-installed in the demo folder: `cd university-admission && npm init -y && npm install prompt-sync` — verify with `node -e "require('prompt-sync')"`
- [ ] Google Meet test run completed (audio, screen share, camera)
- [ ] Notifications silenced on all devices (phone on Do Not Disturb)
- [ ] Backup: Chrome DevTools Console ready as fallback for any VS Code issues
- [ ] Lecture-specific: Prepare a scratch file with intentionally nested `if` blocks (6+ levels deep) to show "pyramid of doom" anti-pattern
- [ ] Lecture-specific: TypeScript Playground open in a browser tab (typescriptlang.org/play) for Part 5 demos

---

## Phase 0: Before Lecture (Lecture 9 — starts after Lecture 8 review)

### Portal Quiz Review (from Lecture 8)

> **Talking Points:**
> "Let's start by looking at how you did on last lecture's portal quiz. These results tell me whether the JavaScript foundations are solid before we start making decisions with that knowledge today."

**Commonly Missed Areas to Watch For (JavaScript Fundamentals — Lecture 8):**

- **`typeof null === "object"` confusion**: Many students still pick `"null"` as the answer. Reinforce: this is a 1995 bug that will never be fixed. The correct check for null is `value === null`, not `typeof`.
- **`==` vs `===` distinction**: Students mix up which one performs coercion. Quick rule: `===` compares value AND type (strict — use this always). `==` coerces types first (loose — avoid).
- **Truthy/falsy surprises**: `"0"` is truthy (non-empty string), `0` is falsy. `[]` is truthy. `""` is falsy. This trips up students who confuse the string `"0"` with the number `0`.
- **Operator precedence**: `2 + 3 * 4` = 14, not 20. Multiplication happens first. Students who got this wrong need to remember: use parentheses when in doubt.
- **TypeScript type annotations**: Some students confuse `float` and `decimal` with `number`. TypeScript has a single `number` type for all numeric values — no `int`, `float`, or `double`.

> **Transition:**
> "Good. If you scored 7 or above — your JavaScript fundamentals are solid. If not, review the cheatsheet and recording. Today's lecture builds directly on truthy/falsy and operators — every `if` statement, every `switch`, every `&&` pattern uses what you learned last time. Let's make your code start making decisions."

---

### Assignment Feedback (Lecture 8 — Financial Calculator Suite)

> **Talking Points:**
> "Let me share what I saw in the Financial Calculator Suite assignments. This was your first real JavaScript project, and there were some strong submissions — but also patterns I need to address."

**Common Mistakes Observed:**

1. **Using `var` instead of `let`/`const`**: Several submissions still used `var`. The rule is absolute: `const` by default, `let` when you must reassign, `var` never. If you used `var`, go back and replace every instance.
2. **Missing input validation**: Calculators accepted negative numbers or zero for division without checking. In production, unvalidated input is a security risk and a UX failure. Always validate before calculating.
3. **`==` instead of `===`**: Some submissions used loose equality for comparisons. `==` introduces type coercion bugs. Always use `===` and `!==`.
4. **Not converting `prompt()` return values**: `prompt()` always returns a string. Forgetting `parseFloat()` or `Number()` means `"100" + "50"` becomes `"10050"` instead of `150`. Several submissions had this concatenation bug.
5. **All logic in one giant block**: No separation between calculators. Each calculator should be its own logical section with clear comments and variable names that don't collide.

**Good Examples to Highlight:**

- Praise any submission that used `const` for fixed rates and `let` only for mutable values
- Highlight use of template literals for formatted output: `` `Total: Rs. ${total.toFixed(2)}` ``
- Celebrate anyone who added a ternary operator for conditional messages (e.g., "Your tip is generous!" vs "Standard tip applied")
- Acknowledge students who included TypeScript-style comments showing type annotations

> **Encouragement:**
> "JavaScript takes practice. Your first project won't be perfect — mine wasn't either, 25 years ago. What matters is that you wrote working code, ran it, and saw results. Today we add the next layer: making that code *think*. Every real application makes decisions — and that's what control structures give us."

---

## Phase 1: Today's Lecture (90 Minutes)

---

### Part 1: Why Programs Need Decisions — `if/else` Foundations (00:00 – 22:00)

---

#### Background / Motivation (Presentation) — 00:00–05:00

> **Talking Points:**
> "Every calculator you built last lecture did the same thing every time. Enter a bill, get a tip. Enter a price, get a discount. No matter what values you entered, the code followed the same path — line by line, top to bottom."
>
> "But real applications don't work that way. An admission system needs to check: Is the student's score above the cutoff? Did they pass the entrance test? Is the program full? Each of these questions changes what happens next. The code *branches*."
>
> "Conditional statements are how programs make decisions. They're the branching logic that lets your code respond differently based on data. Without conditionals, every program would be a straight line. With them, your code becomes a decision tree."

**Slide: What Are Conditional Statements?**

> "A conditional statement evaluates a condition — something that resolves to truthy or falsy — and executes different code depending on the result. This is the foundation of all programming logic."
>
> **Analogy:** "Think of a traffic signal. Red? Stop. Green? Go. Yellow? Slow down. The signal *evaluates a condition* (what color is showing) and you *take a different action* based on the result. Every `if` statement in your code is a traffic signal — checking a condition and routing the program accordingly."

**Slide: Why We Need Conditionals**

> "Three core reasons:"
> 1. **Controlling program flow** — Execute code A or code B, not both
> 2. **Responding to user input** — Different input means different output
> 3. **Handling different data states** — What if the data is missing? What if it's invalid? What if the user is an admin vs. a guest?
>
> "Today we're building a University Admission Gateway. A student enters their scores, and our system decides: admitted, waitlisted, or rejected. Every `if` statement we write has real consequences."

**Slide: JavaScript's Complete List of Conditional Constructs**

> "JavaScript gives you seven tools for making decisions. Most languages have three or four. JavaScript has seven — and each has a purpose:"

| Construct | Use Case |
|-----------|----------|
| `if` | Single condition check |
| `if / else` | Two-way branch |
| `if / else if / else` | Multi-way branch |
| `switch` | Value matching against cases |
| Ternary `? :` | Inline conditional expression |
| Short-circuit `&&` / `||` | Guard clauses, defaults |
| Nullish coalescing `??` | Null/undefined-specific defaults |

> "We'll cover all seven today. By the end, you'll know which tool to reach for in any situation."

---

#### Illustrations / Animations (Presentation) — 05:00–07:00

**Slide: Flowchart — `if/else` Decision Tree**

> Show a visual flowchart:
> ```
>        [Score >= 80?]
>          /        \
>       YES          NO
>        |            |
>   [ADMITTED]   [Score >= 60?]
>                  /        \
>               YES          NO
>                |            |
>           [WAITLIST]   [REJECTED]
> ```
>
> "This is the admission logic we're building. One condition leads to another. Notice: the order matters. We check the highest score first, then work downward. This is the `if / else if / else` pattern."

**Slide: Block Scope Reminder**

> "Quick reminder from Lecture 8: everything inside `{ }` is a block. Variables declared with `let` or `const` inside an `if` block only exist inside that block. This matters when we start declaring variables inside conditions."

---

#### "Let's see in Code now" (VS Code) — 07:00–16:00

> "Open VS Code. Create a new file: `admission.js`. We're building the University Admission Gateway — starting with the most fundamental decision structure."

```javascript
// ============================================
// Lecture 9 — Part 1: if/else Foundations
// University Admission Gateway
// NexusBerry Modern Frontend Course
// ============================================

// --- Basic if statement ---
const studentScore = 85;

if (studentScore >= 80) {
    console.log("🎓 Congratulations! You are ADMITTED.");
}
// If the condition is false, nothing happens — the code just skips the block

// --- if/else — Two-way branch ---
const entranceExamScore = 55;

if (entranceExamScore >= 60) {
    console.log("✅ Entrance exam: PASSED");
} else {
    console.log("❌ Entrance exam: FAILED");
}

// --- if / else if / else — Multi-way branch ---
// This is the core admission logic
const totalScore = 72;

if (totalScore >= 80) {
    console.log("🎓 Status: ADMITTED — Welcome to the program!");
    console.log("📧 Sending acceptance letter...");
} else if (totalScore >= 60) {
    console.log("⏳ Status: WAITLISTED — You may be admitted if seats open.");
    console.log("📧 Sending waitlist notification...");
} else if (totalScore >= 40) {
    console.log("📋 Status: CONDITIONAL — Remedial courses required.");
    console.log("📧 Sending conditional offer...");
} else {
    console.log("❌ Status: REJECTED — Score below minimum threshold.");
    console.log("📧 Sending feedback letter with improvement areas...");
}

// --- Order matters! ---
// WRONG: checking lower threshold first
const score = 95;

// BAD — this catches 95 in the first branch!
if (score >= 40) {
    console.log("Conditional admission");  // 95 >= 40 is true — stops here!
} else if (score >= 60) {
    console.log("Waitlisted");             // Never reached for 95
} else if (score >= 80) {
    console.log("Admitted");               // Never reached for 95
}

// CORRECT — check highest first
if (score >= 80) {
    console.log("Admitted");               // 95 >= 80 is true — correct!
} else if (score >= 60) {
    console.log("Waitlisted");
} else if (score >= 40) {
    console.log("Conditional");
} else {
    console.log("Rejected");
}

// --- Nested conditionals ---
const academicScore = 75;
const hasEntrance = true;
const seatsAvailable = 3;

if (academicScore >= 60) {
    if (hasEntrance) {
        if (seatsAvailable > 0) {
            console.log("✅ ADMITTED — All criteria met.");
        } else {
            console.log("⏳ WAITLISTED — No seats available.");
        }
    } else {
        console.log("❌ REJECTED — Entrance exam not passed.");
    }
} else {
    console.log("❌ REJECTED — Academic score too low.");
}

// --- Better: Flatten with logical AND ---
// Same logic, but cleaner:
if (academicScore >= 60 && hasEntrance && seatsAvailable > 0) {
    console.log("✅ ADMITTED");
} else if (academicScore >= 60 && hasEntrance) {
    console.log("⏳ WAITLISTED — No seats");
} else if (academicScore >= 60) {
    console.log("❌ REJECTED — No entrance exam");
} else {
    console.log("❌ REJECTED — Low score");
}
```

> **Narration while typing:**
> "Notice the pattern: `if` checks a condition. If truthy, the block runs. If falsy, we fall to `else if` or `else`. The critical lesson: order your conditions from most specific to least specific — highest threshold first."
>
> "Nested conditionals are valid JavaScript, but deep nesting — three, four, five levels — becomes unreadable fast. In production, we call this the 'pyramid of doom'. The flattened version using `&&` is easier to read and maintain. As a rule: if you're nesting more than two levels, refactor."

---

#### Interactive Questions (Presentation/Verbal) — 16:00–19:00

**Question 1 — Predict Output:**

> "Look at this code. What gets logged? Drop your answer in the chat."

```javascript
const grade = 72;

if (grade >= 90) {
    console.log("A");
} else if (grade >= 80) {
    console.log("B");
} else if (grade >= 70) {
    console.log("C");
} else {
    console.log("F");
}
```

> **Answer:** `"C"` — 72 is not ≥ 90, not ≥ 80, but IS ≥ 70. The first matching condition wins, and JavaScript stops checking further.
> **Teaching moment:** "Once a condition is `true`, the rest of the chain is skipped. This is why order matters — put the most restrictive condition first."

---

**Question 2 — Spot the Error:**

> "This code has a logic bug. Can you find it?"

```javascript
const age = 25;
const hasID = true;

if (age >= 18) {
    console.log("Age verified");
}
if (hasID) {
    console.log("ID verified");
}
console.log("Access granted");
```

> **Answer:** "Access granted" always prints — regardless of age or ID. The two `if` statements are independent (no `else`). To require BOTH conditions, use `if (age >= 18 && hasID)` or chain with `else`.
> **Teaching moment:** "Two separate `if` blocks are NOT the same as `if / else if`. They're independent decisions. This is one of the most common beginner bugs — thinking that two `if` blocks create a connected chain."

---

**Question 3 — Concept Challenge:**

> "When should you use nested `if` statements vs. a single `if` with `&&`?"

> **Answer:** Use `&&` when you're checking multiple conditions for the same outcome. Use nesting when different conditions lead to different outcomes at each level. If you're nesting deeper than 2 levels, refactor — flatten with `&&`, early returns, or guard clauses.

---

#### Live Debugging (VS Code) — 19:00–20:30

> "Let me show you a common mistake I've seen in production code."

```javascript
// Bug: Missing curly braces
const temperature = 35;

if (temperature > 30)
    console.log("It's hot!");
    console.log("Stay hydrated!"); // This ALWAYS runs — not inside the if!

// The second console.log is NOT part of the if block
// Without braces, only the FIRST line after if is conditional
// ALWAYS use braces — even for one-liners
```

> "In 25 years of code reviews, this bug appears every few months. A developer writes a single-line `if`, then adds a second line months later thinking it's still inside the condition. It's not. The fix is simple: always use curly braces. Every style guide enforces this. ESLint's `curly` rule catches it."

---

#### Part Closing (Presentation) — 20:30–22:00

**Common Mistakes:**
- Checking conditions in wrong order (lowest threshold first catches everything)
- Using `=` (assignment) instead of `===` (comparison) inside `if` — `if (x = 5)` assigns 5 to x, always truthy
- Nesting too deeply — if you're past 2 levels, refactor
- Forgetting `else` — leaving unhandled cases leads to silent failures
- Missing curly braces on single-line `if` — always use braces

**Optimization Tips:**
- Check the most common case first for performance in hot paths
- Use early returns (when inside functions) to reduce nesting
- Combine related conditions with `&&` and `||` instead of nesting

**Best Practices:**
- Always use `===` inside conditions, never `==`
- Always use curly braces, even for single-line blocks
- Keep condition chains under 4 branches — beyond that, consider `switch` or a lookup object
- Add comments for complex conditions: `if (age >= 18 && hasLicense && !isSuspended) // eligible driver`

**Professional Insights:**
> "Here's something YouTube tutorials skip: in every production codebase I've worked on, the most common source of logic bugs isn't the code inside the `if` — it's the condition itself. A wrong operator, a missing edge case, a threshold off by one. When you write a condition, ask yourself: what are all the possible values this variable could have? What happens at the boundaries? That kind of thinking separates junior developers from senior ones."

---

### Part 2: `switch` Statements & The Ternary Operator (22:00 – 44:00)

---

#### Background / Motivation (Presentation) — 22:00–26:00

> **Talking Points:**
> "We've covered `if/else` — the most flexible decision tool. But sometimes, you're not checking a range or a complex condition. Sometimes, you're comparing one value against a list of known options."
>
> "Which department did the student apply to? Computer Science, Business, Medicine, Law, Engineering. That's five exact matches. An `if/else if` chain works, but a `switch` statement is designed for exactly this pattern — matching one value against multiple cases."

**Slide: When to Use `switch` vs `if/else`**

| Use `if/else` when... | Use `switch` when... |
|------------------------|----------------------|
| Checking ranges (`>`, `<`, `>=`) | Matching exact values |
| Complex boolean expressions | One variable, many possible values |
| Different variables in each condition | Comparing against known constants |
| 2-3 branches | 4+ branches |

> "If you're writing `if (dept === "CS")` then `else if (dept === "Business")` then `else if (dept === "Medicine")` — that's a `switch` waiting to happen."

**Slide: Anatomy of a `switch` Statement**

> ```
> switch (expression) {
>     case value1:
>         // code
>         break;       ← stops execution
>     case value2:
>         // code
>         break;
>     default:
>         // fallback
> }
> ```
>
> "Three critical keywords: `case` defines a match. `break` stops execution — without it, code 'falls through' to the next case. `default` is your `else` — it runs when no case matches."

---

#### Illustrations / Animations (Presentation) — 26:00–27:00

**Slide: Fall-Through Behavior Visual**

> Show a visual of fall-through:
> ```
> switch ("B") {
>     case "A": → SKIP
>     case "B": → MATCH → runs this code
>     case "C": → falls through here too! (no break)
>     case "D": → and here!
>     default:  → and here!
> }
> ```
>
> "Without `break`, JavaScript keeps executing every case below the match. This is called 'fall-through'. It's sometimes intentional — but usually it's a bug. Every missing `break` is a potential logic error."

---

#### "Let's see in Code now" (VS Code) — 27:00–36:00

```javascript
// ============================================
// Lecture 9 — Part 2: switch & Ternary
// University Admission Gateway
// NexusBerry Modern Frontend Course
// ============================================

// --- switch statement: Department routing ---
const department = "Computer Science";

switch (department) {
    case "Computer Science":
        console.log("🖥️ Welcome to CS — Building 4, Floor 3");
        console.log("📋 Prerequisites: Mathematics, Logic");
        break;
    case "Business Administration":
        console.log("📊 Welcome to Business — Building 2, Floor 1");
        console.log("📋 Prerequisites: Economics, Statistics");
        break;
    case "Medicine":
        console.log("🏥 Welcome to Medicine — Medical Campus");
        console.log("📋 Prerequisites: Biology, Chemistry");
        break;
    case "Law":
        console.log("⚖️ Welcome to Law — Building 6, Floor 2");
        console.log("📋 Prerequisites: English, Social Studies");
        break;
    default:
        console.log("❓ Unknown department — please visit the admin office.");
        console.log("📞 Contact: 042-36440443");
}

// --- Fall-through: Intentional use ---
// Group departments by faculty
const dept = "Physics";

switch (dept) {
    case "Physics":
    case "Chemistry":
    case "Mathematics":
        console.log("🔬 Faculty of Sciences");
        break;
    case "Computer Science":
    case "Software Engineering":
        console.log("💻 Faculty of Computing");
        break;
    case "Business Administration":
    case "Accounting":
        console.log("📊 Faculty of Management");
        break;
    default:
        console.log("📁 General Faculty");
}
// Physics, Chemistry, and Mathematics all fall through to "Faculty of Sciences"
// This is the ONE valid use of fall-through — grouping cases

// --- Fall-through BUG (what happens without break) ---
const status = "waitlisted";

switch (status) {
    case "admitted":
        console.log("Send acceptance letter");
    // MISSING break! Falls through to next case
    case "waitlisted":
        console.log("Send waitlist notification");
    // MISSING break! Falls through again
    case "rejected":
        console.log("Send rejection letter");
    // MISSING break!
    default:
        console.log("Update records");
}
// Output for "waitlisted":
// "Send waitlist notification"
// "Send rejection letter"        ← BUG! Student gets rejection AND waitlist
// "Update records"               ← Also runs

// --- switch uses STRICT equality (===) ---
const inputScore = "80";  // string from prompt()

switch (inputScore) {
    case 80:               // number 80 — strict comparison
        console.log("This will NOT match '80' (string)");
        break;
    case "80":             // string "80" — strict comparison
        console.log("This WILL match '80' (string)");
        break;
}
// Always convert your input type before using switch!

// ============================================
// --- Ternary Operator ---
// ============================================

// --- Basic ternary: condition ? ifTrue : ifFalse ---
const admissionScore = 78;
const admissionStatus = admissionScore >= 60 ? "Accepted" : "Rejected";
console.log(`Status: ${admissionStatus}`);
// Output: "Status: Accepted"

// --- Ternary for dynamic messages ---
const seatsLeft = 0;
const seatMessage = seatsLeft > 0
    ? `${seatsLeft} seat(s) available — Apply now!`
    : "No seats available — Join the waitlist.";
console.log(seatMessage);

// --- Ternary for fee calculation ---
const isInternational = true;
const baseFee = 50000;
const totalFee = isInternational ? baseFee * 2 : baseFee;
console.log(`Tuition: Rs. ${totalFee.toLocaleString()}`);
// Output: "Tuition: Rs. 100,000"

// --- Nested ternary: When it's acceptable ---
// ✅ Acceptable: 2-3 branches, pure value assignment, well-formatted
const studentScore2 = 75;
const grade = studentScore2 >= 80 ? "A"
    : studentScore2 >= 60 ? "B"
    : studentScore2 >= 40 ? "C"
    : "F";
console.log(`Grade: ${grade}`);  // "Grade: B"

// This works for SIMPLE value assignment with 3-4 clear branches
// Each line is one condition → one value, formatted vertically for readability

// --- Nested ternary: When it's NOT acceptable ---
// ❌ Bad: Side effects, complex logic, or too many branches
// DON'T do this:
// const result = a > 10
//     ? b > 5
//         ? c > 0
//             ? "deep-1"
//             : "deep-2"
//         : "mid"
//     : "low";
// This is unreadable — use if/else instead

// --- Decision Framework: Ternary vs if/else ---
// ✅ Use ternary when:
//    1. You're ASSIGNING a value (not executing side effects)
//    2. You have 2 outcomes (or 3 with one nested level, formatted vertically)
//    3. The condition and values fit on a readable line

// ❌ Use if/else when:
//    1. You need side effects (console.log, API calls, DOM updates)
//    2. You have 4+ branches
//    3. The logic is complex (multiple conditions combined)
//    4. Each branch has multiple statements

// --- When to use ternary vs if/else ---
// ✅ Ternary: assigning a value based on one condition
const label = admissionScore >= 18 ? "Adult" : "Minor";

// ❌ Ternary: multiple actions or side effects
// Don't do this:
// score >= 60 ? (console.log("Pass"), sendEmail()) : (console.log("Fail"), sendAlert());
// Use if/else instead — ternary is for VALUES, not actions
```

> **Narration while typing:**
> "Notice how `switch` uses `===` strict equality internally. If your value is a string `"80"` from `prompt()`, it won't match the number `80` in a case. Always convert your data type before feeding it to a switch."
>
> "The ternary operator is elegant for simple decisions — especially when assigning a value. A nested ternary can work for 2-3 branches if you format it vertically — one condition per line, pure value assignment. But the moment you need more than three branches, side effects, or complex logic, switch back to `if/else`. Deeply nested ternaries are a code review red flag in every team I've led."
>
> "Here's my rule of thumb: if someone reading your ternary has to think for more than 3 seconds to understand what it does — rewrite it as `if/else`. Readability always beats cleverness."

---

#### Interactive Questions (Presentation/Verbal) — 36:00–39:00

**Question 1 — Predict Output:**

> "What happens when this code runs? Think carefully about the `break` keyword."

```javascript
const color = "green";

switch (color) {
    case "red":
        console.log("Stop");
        break;
    case "yellow":
        console.log("Caution");
    case "green":
        console.log("Go");
    case "blue":
        console.log("Rare signal");
        break;
    default:
        console.log("Unknown");
}
```

> **Answer:** `"Go"` then `"Rare signal"` — `"green"` matches its case, but there's no `break` after `"Go"`, so it falls through to `"blue"` and prints `"Rare signal"`, then the `break` there stops it.
> **Teaching moment:** "Fall-through is the default behavior. `break` is what stops it. Missing `break` = code running that shouldn't. ESLint has a `no-fallthrough` rule for this."

---

**Question 2 — Concept Challenge:**

> "Rewrite this `if/else` as a ternary. Drop it in the chat."

```javascript
let message;
if (score >= 50) {
    message = "Pass";
} else {
    message = "Fail";
}
```

> **Answer:** `const message = score >= 50 ? "Pass" : "Fail";`
> **Bonus:** "Notice we can use `const` with the ternary because the value is assigned in one expression. With `if/else`, we needed `let` because the assignment happens on different lines."

---

**Question 3 — Quick-Fire Recall:**

> "In a `switch` statement, what keyword handles the 'none of the cases matched' scenario? Type it in the chat — one word."

> **Answer:** `default`
> **Follow-up:** "And what does `switch` use internally for comparison — `==` or `===`?"
> **Answer:** `===` (strict equality)

---

**Question 4 — Concept Challenge:**

> "Is this nested ternary acceptable in production code? Why or why not?"

```javascript
const level = points >= 100 ? "Gold"
    : points >= 50 ? "Silver"
    : "Bronze";
```

> **Answer:** Yes — this is acceptable. It's pure value assignment, only 3 branches, and formatted vertically with one condition per line. It's easy to read top-to-bottom: 100+ is Gold, 50+ is Silver, otherwise Bronze.
> **Follow-up:** "But if I added a fourth level AND each branch needed to also update a counter — that's when you switch to `if/else`. Ternary is for values. `if/else` is for logic."

---

#### Live Debugging (VS Code) — 39:00–41:00

> "Here's a bug that shows up in university enrollment systems — and in production code everywhere."

```javascript
// Bug: Using assignment (=) instead of comparison (===) in switch
const userRole = "student";

switch (true) {  // Intentional: checking boolean expressions
    case userRole = "admin":  // BUG! This is assignment, not comparison
        console.log("Admin dashboard");
        break;
    case userRole === "student":
        console.log("Student portal");
        break;
}
// userRole is now "admin" — the assignment changed it!
// This bug is subtle and won't throw an error
```

> "This is why strict linting matters. ESLint's `no-cond-assign` rule catches `=` inside conditions. In production, this bug silently changes user roles — imagine granting admin access because of a typo. I've seen it happen. Use `===` always, and let your linter enforce it."

---

#### Part Closing (Presentation) — 41:00–44:00

**Common Mistakes:**
- Forgetting `break` in `switch` — causes fall-through bugs
- Using `switch` for range checks — `switch` is for exact matches, use `if/else` for ranges
- Deeply nested ternaries (4+ levels) — readable for the author, confusing for everyone else
- Using ternary for side effects (console.log, API calls) — ternary returns a value, it's not a control structure
- Not handling `default` in `switch` — always include a default case

**Optimization Tips:**
- For 2-3 simple branches, use ternary or `if/else`
- For 4+ exact value matches, use `switch`
- For 10+ cases, consider an object lookup: `const routes = { "CS": "Building 4", "Law": "Building 6" }; console.log(routes[dept])`
- Group related `switch` cases using intentional fall-through (no code between cases)
- Nested ternary is acceptable for 2-3 branch value assignment — format vertically, one condition per line

**Best Practices:**
- Always include `break` unless you intentionally want fall-through — add a `// falls through` comment when intentional
- Always include `default` in every `switch`
- Use ternary only for value assignment — one line, two options (or 3 with vertical formatting)
- When ternary grows beyond three branches or needs side effects, switch to `if/else`
- ESLint rules: `no-fallthrough`, `no-cond-assign`, `curly`

**Professional Insights:**
> "In 25 years, I've reviewed thousands of `switch` statements. The ones that cause production incidents almost always have a missing `break` or a missing `default`. The fix is a team rule: every `switch` must have `default`, and every case must have `break` unless there's a comment saying `// falls through intentionally`. That simple rule eliminates an entire category of bugs."
>
> "On nested ternaries — I've seen teams ban them entirely, and I've seen teams allow them for simple 3-branch value assignment. My rule: if you format it vertically with one condition per line and it's pure value assignment, it's fine. The moment someone has to scroll or squint — it's an `if/else`."

---

### Part 3: Short-Circuit Evaluation, Defaults & Guard Patterns (44:00 – 62:00)

---

#### Background / Motivation (Presentation) — 44:00–48:00

> **Talking Points:**
> "In Lecture 8, we learned that `&&` and `||` don't just return `true` or `false` — they return actual values. `null || 'default'` returns `'default'`. `'Rana' && 42` returns `42`. Today, we use that power as a control structure."
>
> "In professional React code, you'll see this pattern constantly: `{user && <UserProfile />}`. That's not an `if` statement — it's short-circuit evaluation used for conditional rendering. Understanding this pattern now means React will feel natural when we get to Module 3."

**Slide: Short-Circuit Rules**

| Operator | Behavior | Returns |
|----------|----------|---------|
| `A \|\| B` | If A is truthy, return A. Otherwise, return B. | First truthy value (or last value) |
| `A && B` | If A is falsy, return A. Otherwise, return B. | First falsy value (or last value) |

> "The key insight: these operators don't always return booleans. They return the *value* that determined the result. This makes them incredibly useful for default values and guard clauses."

**Slide: Nullish Coalescing vs OR**

> "But `||` has a problem. What if zero is a valid value?"

```javascript
const seats = 0;
const display = seats || "No data";    // "No data" — WRONG! 0 is valid
const display2 = seats ?? "No data";   // 0 — CORRECT! ?? only triggers on null/undefined
```

> "The `??` operator was added in ES2020 to fix this exact problem. `||` treats ALL falsy values as 'missing'. `??` only treats `null` and `undefined` as 'missing'. When zero, empty string, or `false` are valid values — use `??`."

---

#### Illustrations / Animations (Presentation) — 48:00–49:00

**Slide: Decision Tree — Which Operator?**

> ```
> "Do I need a default/fallback value?"
>     → YES: "Could the value be 0, '', or false legitimately?"
>         → YES: Use ??
>         → NO:  Use ||
>     → NO: "Do I need to guard against a falsy value before proceeding?"
>         → YES: Use &&
>         → NO:  Use if/else
> ```

**Slide: Optional Chaining Visual**

> ```
> student.address.city          → ERROR if address is undefined
> student?.address?.city        → undefined (no error)
> student?.scores?.[0]          → undefined (no error)
> student?.getGPA?.()           → undefined (no error)
> ```
>
> "Optional chaining `?.` stops evaluation and returns `undefined` the moment it hits `null` or `undefined`. No more `Cannot read properties of undefined` — the most common JavaScript runtime error."

---

#### "Let's see in Code now" (VS Code) — 49:00–57:00

```javascript
// ============================================
// Lecture 9 — Part 3: Short-Circuit & Modern Operators
// University Admission Gateway
// NexusBerry Modern Frontend Course
// ============================================

// --- Short-circuit with || (OR) — Default values ---
const studentName = "";  // Student didn't enter their name
const displayName = studentName || "Anonymous Student";
console.log(`Welcome, ${displayName}`);
// Output: "Welcome, Anonymous Student" — empty string is falsy

const userInput = null;
const major = userInput || "Undeclared";
console.log(`Major: ${major}`);
// Output: "Major: Undeclared"

// --- The || problem: falsy vs actually missing ---
const prerequisitesPassed = 0;  // Student passed zero prerequisites (valid data!)
const prereqDisplay = prerequisitesPassed || "No data available";
console.log(`Prerequisites: ${prereqDisplay}`);
// Output: "Prerequisites: No data available" — WRONG! 0 is valid data

// --- Nullish coalescing ?? — null/undefined only ---
const prereqCorrect = prerequisitesPassed ?? "No data available";
console.log(`Prerequisites: ${prereqCorrect}`);
// Output: "Prerequisites: 0" — CORRECT! ?? only triggers on null/undefined

// More ?? examples:
const middleName = null;
const displayMiddle = middleName ?? "N/A";
console.log(`Middle name: ${displayMiddle}`);  // "Middle name: N/A"

const gpa = undefined;
const displayGPA = gpa ?? "Not calculated yet";
console.log(`GPA: ${displayGPA}`);  // "GPA: Not calculated yet"

const emptyString = "";
const displayEmpty = emptyString ?? "fallback";
console.log(`Result: ${displayEmpty}`);  // "Result: " — empty string is NOT null/undefined

// --- Short-circuit with && (AND) — Guard clauses ---
const student = {
    name: "Ayesha Khan",
    scores: { math: 88, english: 76 },
    isActive: true
};

// Guard: only access scores if student exists AND is active
student && student.isActive && console.log(`Processing: ${student.name}`);
// Output: "Processing: Ayesha Khan"

const inactiveStudent = { name: "Test", isActive: false };
inactiveStudent && inactiveStudent.isActive && console.log("This won't run");
// Nothing — isActive is false, && short-circuits

// --- Optional chaining ?. ---
const fullStudent = {
    name: "Ahmed Ali",
    address: {
        city: "Lahore",
        zip: "54000"
    },
    scores: [85, 90, 78],
    getGPA() {
        return 3.5;
    }
};

// Property access
console.log(fullStudent.address.city);         // "Lahore"
console.log(fullStudent.address?.city);        // "Lahore" (same, but safe)

// Without optional chaining — accessing missing property
const incompleteStudent = { name: "Sara" };
// console.log(incompleteStudent.address.city);  // TypeError: Cannot read properties of undefined
console.log(incompleteStudent.address?.city);    // undefined — no error!

// Array element access
console.log(fullStudent.scores?.[0]);            // 85
console.log(incompleteStudent.scores?.[0]);      // undefined — no error

// Method call
console.log(fullStudent.getGPA?.());             // 3.5
console.log(incompleteStudent.getGPA?.());       // undefined — no error

// --- Combining ?. with ?? — The power combo ---
const studentCity = incompleteStudent.address?.city ?? "City not provided";
console.log(`City: ${studentCity}`);
// Output: "City: City not provided"

// This pattern is everywhere in production:
// value = data?.deeply?.nested?.property ?? "default";

// --- Logical assignment operators (ES2021) ---
// ||=  : assign if current value is falsy
// &&=  : assign if current value is truthy
// ??=  : assign if current value is null/undefined

let studentEmail = "";
studentEmail ||= "no-email@university.edu";
console.log(studentEmail);  // "no-email@university.edu" (was falsy "")

let studentPhone = "0300-1234567";
studentPhone ||= "no-phone";
console.log(studentPhone);  // "0300-1234567" (was truthy — not overwritten)

let notes = null;
notes ??= "No notes available";
console.log(notes);  // "No notes available" (was null)

let existingNotes = "";
existingNotes ??= "No notes available";
console.log(existingNotes);  // "" (empty string is NOT null/undefined — ??= preserves it)

// &&= — assign only if current value is truthy
let userPreference = "dark-mode";
userPreference &&= userPreference.toUpperCase();
console.log(userPreference);  // "DARK-MODE"

let noPreference = null;
noPreference &&= noPreference.toUpperCase();  // safe — doesn't execute .toUpperCase()
console.log(noPreference);  // null
```

> **Narration while typing:**
> "The combo of `?.` and `??` is the most useful pattern in modern JavaScript. You'll use it every single day. API responses have missing fields, user profiles have optional data, database records have nullable columns. Instead of writing five `if` checks, you write: `data?.user?.email ?? 'No email'`. One line replaces ten."
>
> "Logical assignment operators are newer — ES2021. You'll see them in production codebases that target modern browsers. `??=` is the most useful: set a default only if the value is truly missing (null or undefined), not just falsy."

---

#### Interactive Questions (Presentation/Verbal) — 57:00–60:00

**Question 1 — Predict Output:**

> "What's the difference between these two lines? Drop both outputs in the chat."

```javascript
console.log(0 || 42);
console.log(0 ?? 42);
```

> **Answer:** `0 || 42` → `42` (because 0 is falsy). `0 ?? 42` → `0` (because 0 is NOT null/undefined).
> **Teaching moment:** "This is the entire reason `??` exists. When zero is a valid value — like 'zero seats available' or 'zero balance' — use `??` to preserve it."

---

**Question 2 — Predict Output:**

> "What does this line produce?"

```javascript
const result = null?.toString();
console.log(result);
```

> **Answer:** `undefined` — optional chaining on `null` short-circuits and returns `undefined`. No error thrown.
> **Teaching moment:** "Without `?.`, calling `null.toString()` would crash your program with a TypeError. Optional chaining turns crashes into `undefined`."

---

**Question 3 — Hidden Fact Reveal:**

> "What does this expression return?"

```javascript
console.log("" ?? "fallback");
```

> **Answer:** `""` (empty string) — `??` only triggers on `null` and `undefined`. Empty string is neither, so it's preserved.
> **Reveal:** "This surprises many developers. `??` treats empty strings and zero as *valid values*, not missing data. If you want to replace empty strings too, use `||` instead. Know the difference — it prevents real production bugs."

---

#### Live Debugging (VS Code) — 60:00–61:00

> "Here's a production bug from an actual enrollment system I worked on."

```javascript
// Bug: Using || when ?? was needed
const scholarship = 0;  // 0% scholarship (no discount — valid!)

const finalScholarship = scholarship || 100;  // BUG: treats 0 as "no data"
console.log(`Scholarship: ${finalScholarship}%`);
// Output: "Scholarship: 100%" — Student gets full scholarship by accident!

// Fix: Use ??
const fixedScholarship = scholarship ?? 100;
console.log(`Scholarship: ${fixedScholarship}%`);
// Output: "Scholarship: 0%" — Correct!
```

> "Imagine a scholarship system that accidentally gives 100% scholarships to every student who has 0% discount. The `||` operator treated `0` as falsy and replaced it. One character difference — `||` vs `??` — and the university loses millions in tuition. This is why these operators matter."

---

#### Part Closing (Presentation) — 61:00–62:00

**Common Mistakes:**
- Using `||` when `??` is needed — loses valid falsy values (0, "", false)
- Forgetting that `&&` and `||` return values, not booleans
- Chaining too many `?.` — if your chain is 5+ levels deep, your data structure needs refactoring
- Mixing `?.` with regular `.` inconsistently — be intentional about which properties can be null

**Optimization Tips:**
- `?.` + `??` replaces verbose `if (x && x.y && x.y.z)` chains — use them
- Logical assignment `??=` is perfect for initializing config defaults
- Short-circuit `&&` for conditional execution replaces simple `if` blocks

**Best Practices:**
- Default rule: Use `??` for defaults, `||` only when you deliberately want to replace ALL falsy values
- Use `?.` whenever accessing properties of potentially nullable objects
- Combine `?.` and `??` as a pair: `value?.property ?? defaultValue`
- Don't use `?.` on values you know exist — it signals uncertainty to other developers

**Professional Insights:**
> "Optional chaining and nullish coalescing were added to JavaScript in 2020. Before that, production code was littered with `if (obj && obj.prop && obj.prop.nested)` chains. I've refactored entire codebases from the old pattern to `?.` and `??` — the code shrinks by 30% and becomes dramatically more readable. When you join a team, one of the first signals of a modern codebase is whether they use these operators."

---

### Part 4: User Input & Building the University Admission Gateway (62:00 – 80:00)

---

#### Background / Motivation (Presentation) — 62:00–65:00

> **Talking Points:**
> "We've learned every conditional tool JavaScript offers — `if/else`, `switch`, ternary, short-circuit, `??`, `?.`, and logical assignment. Now we combine them all into a real application."
>
> "But first — every example so far has used hardcoded values. `const studentScore = 85`. In a real application, data comes from the user. In the browser, we have `prompt()`. But we're running JavaScript in Node.js — and Node.js doesn't have `prompt()` built in."
>
> "This is where `prompt-sync` comes in — a lightweight npm package that gives us interactive terminal input in Node.js. It's perfect for building CLI tools and learning programs."

**Slide: Why User Input Matters**

> "Three reasons we need user input right now:"
> 1. **Realistic programs** — Hardcoded values are for demos. Real programs respond to real data.
> 2. **Type conversion practice** — `prompt-sync` returns strings, just like browser `prompt()`. You MUST convert to numbers with `Number()` or `parseInt()`. This reinforces Lecture 8.
> 3. **Conditional logic comes alive** — When YOU type the score, the admission decision changes. That's the power of conditionals — your code reacts to different inputs differently.

**Slide: `prompt-sync` — Getting User Input in Node.js**

> ```
> // Step 1: Install (one-time setup)
> npm init -y
> npm install prompt-sync
>
> // Step 2: Require it in your file
> const prompt = require("prompt-sync")();
>
> // Step 3: Use it — just like browser prompt()
> const name = prompt("Enter your name: ");
> console.log(`Hello, ${name}!`);
>
> // Step 4: Run with Node.js
> node admission.js
> ```
>
> "That's it. Four lines of setup, and you have interactive input. Notice the double parentheses — `require('prompt-sync')()`. The first `()` imports the module, the second `()` creates a prompt instance. This is a factory pattern — we'll learn about those when we cover functions in Lecture 11."

**Slide: The Critical Rule — Always Convert Input**

> ```javascript
> const input = prompt("Enter score: ");  // Always returns a STRING
> console.log(typeof input);              // "string"
>
> // ❌ Bug: string math
> console.log(input + 10);               // "8010" not 90!
>
> // ✅ Fix: convert first
> const score = Number(input);
> console.log(score + 10);               // 90
> ```
>
> "This is the SAME bug from Lecture 8 assignment feedback — `prompt()` returns strings. `Number()` converts to a number. `parseInt()` also works for whole numbers. Always convert before doing math."

---

#### Illustrations / Animations (Presentation) — 65:00–66:00

**Slide: Application Decision Flow**

> ```
> Student Application (Interactive Input via prompt-sync)
>     │
>     ├── Collect Data (prompt-sync — name, scores, department)
>     ├── Validate & Convert (Number() — string to number)
>     ├── Classify Score (if/else — range checks)
>     ├── Route to Department (switch — exact match)
>     ├── Calculate Scholarship (ternary — simple condition)
>     ├── Check Prerequisites (?. && — guard clauses)
>     └── Determine Final Status (if/else if/else — multi-way)
> ```

---

#### "Let's see in Code now" (VS Code) — 66:00–76:00

> "Let's build the complete University Admission Gateway — with real user input. Open VS Code. Make sure you're in the `university-admission/` folder and that `prompt-sync` is installed."

```javascript
// ============================================
// Lecture 9 — Part 4: University Admission Gateway
// Complete Application — All Constructs Combined
// With Interactive User Input (prompt-sync)
// NexusBerry Modern Frontend Course
// ============================================

// --- Setup: prompt-sync for Node.js user input ---
const prompt = require("prompt-sync")();

// ============================================
// Step 1: Collect Student Data (User Input)
// ============================================
console.log("\n========================================");
console.log("   UNIVERSITY ADMISSION GATEWAY");
console.log("   NexusBerry University System");
console.log("========================================\n");

const studentName = prompt("Enter student name: ");
const studentAge = Number(prompt("Enter age: "));
const mathScore = Number(prompt("Enter Math score (0-100): "));
const englishScore = Number(prompt("Enter English score (0-100): "));
const scienceScore = Number(prompt("Enter Science score (0-100): "));
const department = prompt("Enter department (Computer Science / Business Administration / Medicine / Law): ");
const entranceExamInput = prompt("Passed entrance exam? (yes/no): ");
const entranceExam = entranceExamInput.toLowerCase() === "yes";

// --- Build the application object ---
const application = {
    name: studentName,
    age: studentAge,
    scores: { math: mathScore, english: englishScore, science: scienceScore },
    department: department,
    entranceExam: entranceExam,
    address: { city: "Lahore", country: "Pakistan" },
    scholarship: null,   // not yet determined
    referral: undefined  // optional field
};

// ============================================
// Step 2: Score Classification (if/else — range checks)
// ============================================
const avgScore = (application.scores.math + application.scores.english + application.scores.science) / 3;
console.log(`\n📊 Average Score: ${avgScore.toFixed(1)}`);

let eligibilityStatus;

if (avgScore >= 80) {
    eligibilityStatus = "Excellent — Direct Admission";
} else if (avgScore >= 60) {
    eligibilityStatus = "Good — Standard Admission";
} else if (avgScore >= 40) {
    eligibilityStatus = "Conditional — Remedial Required";
} else {
    eligibilityStatus = "Below Minimum — Not Eligible";
}
console.log(`📋 Eligibility: ${eligibilityStatus}`);

// ============================================
// Step 3: Department Routing (switch — exact match)
// ============================================
let departmentInfo;
let prerequisitesMet = false;

switch (application.department) {
    case "Computer Science":
        departmentInfo = "🖥️ CS Department — Building 4, Floor 3";
        prerequisitesMet = application.scores.math >= 70;
        break;
    case "Business Administration":
        departmentInfo = "📊 Business — Building 2, Floor 1";
        prerequisitesMet = application.scores.english >= 60;
        break;
    case "Medicine":
        departmentInfo = "🏥 Medicine — Medical Campus";
        prerequisitesMet = application.scores.science >= 85;
        break;
    case "Law":
        departmentInfo = "⚖️ Law — Building 6, Floor 2";
        prerequisitesMet = application.scores.english >= 70;
        break;
    default:
        departmentInfo = "❓ Department not found — contact admissions";
        prerequisitesMet = false;
}
console.log(departmentInfo);
console.log(`📚 Prerequisites: ${prerequisitesMet ? "Met ✅" : "Not Met ❌"}`);

// ============================================
// Step 4: Scholarship Calculation (ternary + ??)
// ============================================
const scholarshipPercent = avgScore >= 90 ? 100
    : avgScore >= 80 ? 50
    : avgScore >= 70 ? 25
    : 0;

// Use ?? to check if scholarship was manually set
const finalScholarship = application.scholarship ?? scholarshipPercent;
console.log(`💰 Scholarship: ${finalScholarship}%`);

// Scholarship message using ternary
const scholarshipMessage = finalScholarship > 0
    ? `Congratulations! You receive a ${finalScholarship}% tuition waiver.`
    : "No scholarship awarded. Full tuition applies.";
console.log(scholarshipMessage);

// ============================================
// Step 5: Optional Data (?.  &&  ??)
// ============================================
// Safe access with optional chaining
const city = application.address?.city ?? "City not provided";
const state = application.address?.state ?? "State not provided";
const referralName = application.referral?.name ?? "No referral";
console.log(`📍 Location: ${city}`);
console.log(`📍 State: ${state}`);
console.log(`🤝 Referral: ${referralName}`);

// Guard clause with &&
application.entranceExam && console.log("✅ Entrance exam completed");
!application.entranceExam && console.log("⚠️ Entrance exam pending");

// ============================================
// Step 6: Final Admission Decision (all combined)
// ============================================
let finalDecision;
let decisionColor;

if (avgScore >= 60 && prerequisitesMet && application.entranceExam) {
    finalDecision = "🎓 ADMITTED";
    decisionColor = "green";
} else if (avgScore >= 60 && application.entranceExam) {
    finalDecision = "⏳ WAITLISTED — Prerequisites not met";
    decisionColor = "orange";
} else if (avgScore >= 60) {
    finalDecision = "📋 CONDITIONAL — Complete entrance exam";
    decisionColor = "yellow";
} else {
    finalDecision = "❌ REJECTED — Below minimum score";
    decisionColor = "red";
}

// ============================================
// Step 7: Final Report
// ============================================
console.log("\n========================================");
console.log("   ADMISSION DECISION REPORT");
console.log("========================================");
console.log(`   Applicant:    ${application.name}`);
console.log(`   Age:          ${application.age}`);
console.log(`   Department:   ${application.department}`);
console.log(`   Avg Score:    ${avgScore.toFixed(1)}%`);
console.log(`   Eligibility:  ${eligibilityStatus}`);
console.log(`   Prerequisites:${prerequisitesMet ? " Met ✅" : " Not Met ❌"}`);
console.log(`   Entrance Exam:${application.entranceExam ? " Passed ✅" : " Pending ⏳"}`);
console.log(`   Scholarship:  ${finalScholarship}%`);
console.log(`   Location:     ${city}`);
console.log("----------------------------------------");
console.log(`   DECISION:     ${finalDecision}`);
console.log("========================================\n");

// ============================================
// Logical Assignment — Initialize defaults
// ============================================
let studentNotes = application.notes;
studentNotes ??= "No additional notes";
console.log(`📝 Notes: ${studentNotes}`);

let contactEmail = application.email;
contactEmail ??= `${application.name.toLowerCase().replace(" ", ".")}@student.nexusberry.edu`;
console.log(`📧 Email: ${contactEmail}`);
```

> **Narration while typing:**
> "Notice how the `prompt-sync` setup is just two lines at the top — require it and call it. Then every `prompt()` call works exactly like the browser version, except we're in the terminal."
>
> "The critical moment is `Number(prompt(...))` — wrapping every numeric input in `Number()`. Without it, your math breaks silently. `"82" + "74"` gives `"8274"`, not `156`. This is the exact bug students hit in the Lecture 8 assignment."
>
> "Look at how naturally each construct fits its role. `if/else` handles the score ranges — because ranges need `>=` comparisons. `switch` handles the department — because it's an exact string match against known values. Ternary handles scholarship — because it's a simple value assignment. `?.` and `??` handle optional data — because the address might be incomplete and the referral might be missing. And `&&` handles the guard clause for entrance exam status."
>
> "This is how professional code reads. You don't use one construct for everything — you pick the right tool for each decision. That judgment is what makes a developer senior."

---

#### Interactive Questions (Presentation/Verbal) — 76:00–78:00

**Question 1 — Concept Challenge:**

> "In the admission gateway, why did we use `??` instead of `||` for the scholarship calculation? What would go wrong with `||`?"

> **Answer:** If `application.scholarship` were `0` (zero percent — no scholarship), `||` would treat it as falsy and replace it with the calculated scholarship. `??` preserves `0` because it only triggers on `null`/`undefined`. A student who should get 0% scholarship would accidentally get one.
> **Teaching moment:** "This is the exact production bug we debugged in Part 3. The concept becomes concrete when you see it in a real feature."

---

**Question 2 — Predict Output:**

> "If the student enters `entranceExam: 'no'` and their `avgScore` was 75, what would `finalDecision` be?"

> **Answer:** `"📋 CONDITIONAL — Complete entrance exam"` — because `avgScore >= 60` is true but `application.entranceExam` is false (we converted "no" to `false`), so the first two conditions fail. The third condition (`avgScore >= 60`) is true, so it hits the "CONDITIONAL" branch.

---

**Question 3 — Quick-Fire Recall:**

> "What does `prompt-sync` always return — a string or a number?"

> **Answer:** Always a string — just like browser `prompt()`. You must use `Number()` or `parseInt()` to convert numeric input.
> **Teaching moment:** "This is why we wrapped every score input in `Number()`. Forgetting this conversion is the #1 beginner bug with user input."

---

#### Live Debugging (VS Code) — 78:00–79:00

> "Let me show you a real-world edge case."

```javascript
// Edge case: What if scores object is missing entirely?
const incompleteApp = {
    name: "Test Student",
    department: "Law"
    // no scores, no entranceExam, no address
};

// WITHOUT optional chaining — CRASHES
// const avg = (incompleteApp.scores.math + incompleteApp.scores.english) / 2;
// TypeError: Cannot read properties of undefined (reading 'math')

// WITH optional chaining + nullish coalescing — SAFE
const safeMath = incompleteApp.scores?.math ?? 0;
const safeEnglish = incompleteApp.scores?.english ?? 0;
const safeAvg = (safeMath + safeEnglish) / 2;
console.log(`Safe average: ${safeAvg}`);  // 0
// No crash, handles missing data gracefully
```

> "In production, you never control what data you receive. API responses can be incomplete. User input can be missing. Database records can have null fields. Defensive coding with `?.` and `??` is not paranoia — it's professionalism."

---

#### Part Closing (Presentation) — 79:00–80:00

**Common Mistakes:**
- Using only one conditional construct for everything — each has its strengths
- Not handling all edge cases (missing data, zero values, null fields)
- Writing the decision logic before validating the input data
- Forgetting to handle the `default` / `else` case — always have a fallback
- Forgetting `Number()` on `prompt-sync` input — leads to string concatenation bugs
- Not installing `prompt-sync` before running the script — `Error: Cannot find module 'prompt-sync'`

**Optimization Tips:**
- Validate early, decide later — check data integrity before running decision logic
- Use `?.` + `??` for all external/optional data — it's cheaper than try/catch
- Object lookups replace long `switch` statements when you only need a mapping
- Wrap all numeric prompt-sync input in `Number()` immediately — convert at the point of entry

**Best Practices:**
- Match the construct to the decision type: ranges → `if/else`, exact values → `switch`, simple values → ternary, defaults → `??`, guards → `&&`
- Process data in a pipeline: collect input → validate → transform → decide → output
- Keep decision functions small — if a function has 50 lines of conditionals, split it
- Always convert user input to the correct type before using it in conditionals or calculations

**Professional Insights:**
> "The University Admission Gateway is a simplified version of what I've built for real universities. The production version has 200+ conditions across scholarship rules, department quotas, international student rules, and government regulations. The key to managing that complexity? The same principles we used today: right tool for each decision, clear data flow, and defensive coding for every edge case."
>
> "User input is the most dangerous data in any application. It could be empty, the wrong type, or malicious. The habit of converting and validating immediately — before any logic runs — is a habit that will protect you throughout your career. We'll see more sophisticated validation when we learn functions in Lecture 11."

---

### Part 5: TypeScript Narrowing — Type-Safe Decisions (80:00 – 86:00)

---

#### Background / Motivation (Presentation) — 80:00–82:00

> **Talking Points:**
> "In Lecture 8, we previewed TypeScript — adding type annotations to variables. Today we see why TypeScript and conditionals are a powerful combination."
>
> "TypeScript can *narrow* types based on your conditional checks. When you write `if (typeof x === 'string')`, TypeScript knows that inside that block, `x` is definitely a string. This is called 'type narrowing' — and it's one of TypeScript's most powerful features."

**Slide: What Is Type Narrowing?**

> "Type narrowing is TypeScript's ability to refine a variable's type based on control flow. After a conditional check, TypeScript knows more about the type than before the check."

```typescript
function process(input: string | number) {
    // Here, input could be string OR number
    if (typeof input === "string") {
        // Here, TypeScript KNOWS input is a string
        console.log(input.toUpperCase());  // ✅ No error
    } else {
        // Here, TypeScript KNOWS input is a number
        console.log(input.toFixed(2));     // ✅ No error
    }
}
```

> "Without the `if` check, calling `.toUpperCase()` on `input` would be an error — because `input` might be a number. After the `typeof` check, TypeScript narrows the type and allows string methods inside that block."

**Slide: Three Narrowing Techniques**

| Technique | Example | When to Use |
|-----------|---------|-------------|
| `typeof` guards | `typeof x === "string"` | Primitive type checks |
| Truthiness narrowing | `if (x)` | Null/undefined elimination |
| Discriminated unions | `if (shape.kind === "circle")` | Object type differentiation |

---

#### "Let's see in Code now" (VS Code) — 82:00–85:00

> "Let me show you these three patterns. Imagine this is the TypeScript version of our admission gateway."

```typescript
// ============================================
// Lecture 9 — Part 5: TypeScript Narrowing
// University Admission Gateway (TS Preview)
// NexusBerry Modern Frontend Course
// ============================================

// --- typeof guards ---
function formatScore(score: string | number): string {
    if (typeof score === "string") {
        // TypeScript knows: score is string here
        return score.toUpperCase();  // e.g., "EXCELLENT"
    } else {
        // TypeScript knows: score is number here
        return `${score.toFixed(1)}%`;  // e.g., "82.5%"
    }
}

console.log(formatScore(82.5));        // "82.5%"
console.log(formatScore("excellent")); // "EXCELLENT"

// --- Truthiness narrowing ---
function getStudentCity(address: { city: string } | null | undefined): string {
    if (address) {
        // TypeScript knows: address is NOT null/undefined here
        return address.city;  // ✅ Safe — no error
    }
    return "City not provided";
}

console.log(getStudentCity({ city: "Lahore" }));  // "Lahore"
console.log(getStudentCity(null));                 // "City not provided"
console.log(getStudentCity(undefined));            // "City not provided"

// --- Discriminated unions ---
// Each type has a "status" property that uniquely identifies it
type AdmissionResult =
    | { status: "admitted"; department: string; scholarship: number }
    | { status: "waitlisted"; position: number }
    | { status: "rejected"; reason: string };

function processResult(result: AdmissionResult): string {
    switch (result.status) {
        case "admitted":
            // TypeScript knows: result has department & scholarship
            return `Welcome to ${result.department}! Scholarship: ${result.scholarship}%`;
        case "waitlisted":
            // TypeScript knows: result has position
            return `Waitlisted at position #${result.position}`;
        case "rejected":
            // TypeScript knows: result has reason
            return `Application rejected: ${result.reason}`;
    }
}

// TypeScript enforces that you handle ALL cases
const result1: AdmissionResult = {
    status: "admitted",
    department: "Computer Science",
    scholarship: 50
};
console.log(processResult(result1));
// "Welcome to Computer Science! Scholarship: 50%"

const result2: AdmissionResult = {
    status: "rejected",
    reason: "Score below minimum threshold"
};
console.log(processResult(result2));
// "Application rejected: Score below minimum threshold"
```

> **Narration while typing:**
> "Discriminated unions are the most powerful narrowing pattern. You define a shared property — `status` in our case — and TypeScript uses it to determine which type you're working with inside each `case`. In production React code, this pattern appears everywhere: API responses with different shapes, form states, component variants."
>
> "Notice how `switch` and TypeScript narrowing are a perfect match. Each `case` narrows the type automatically. If you add a fourth status later, TypeScript will warn you that you haven't handled it — compile-time exhaustiveness checking."

---

#### Interactive Questions (Presentation/Verbal) — 85:00–85:30

**Question 1 — Concept Challenge:**

> "If I remove the `case 'rejected'` from the `processResult` switch — what happens in TypeScript?"

> **Answer:** TypeScript will show a compile-time error — the function claims to return a `string`, but the `"rejected"` case is unhandled, meaning it could fall through without returning. This is exhaustiveness checking — TypeScript ensures you handle every possible case.
> **Teaching moment:** "This is why discriminated unions + switch is such a powerful pattern. TypeScript becomes your safety net. Add a new status? Every switch that handles that type will show an error until you add the new case."

---

#### Part Closing (Presentation) — 85:30–86:00

**Common Mistakes (TypeScript Narrowing):**
- Using `typeof` on objects — `typeof {}` is `"object"`, not helpful for distinguishing object shapes
- Forgetting that `typeof null` is `"object"` — truthiness checks (`if (x)`) are safer for null elimination
- Not using discriminated unions — checking `"kind"` or `"type"` properties manually without TypeScript's help

**Best Practices:**
- Use `typeof` for primitives (string, number, boolean)
- Use truthiness checks for null/undefined elimination
- Use discriminated unions (shared `kind`/`type`/`status` property) for object variants
- Let TypeScript's exhaustiveness checking catch unhandled cases — it's a free safety net

**Professional Insights:**
> "Discriminated unions changed how I write TypeScript. Before them, I used `any` and manual type checks everywhere. Now, I define the union, add a `switch`, and TypeScript tells me if I missed a case. In React, this pattern models component states perfectly: `{ status: 'loading' } | { status: 'success', data: T } | { status: 'error', message: string }`. We'll use this exact pattern when we reach React in Module 3."

---

### Lecture Ending (86:00 – 90:00)

---

#### Cheat Sheet Slides (Presentation) — 86:00–87:30

> "Let me walk you through the key reference points from today — these are in your cheatsheet file."

**Slide: The 7 Conditional Constructs**
- `if / else if / else` — range checks, multi-way branching
- `switch` — exact value matching (uses `===`)
- Ternary `? :` — inline value assignment (nested OK for 2-3 branches, formatted vertically)
- `||` — default for ANY falsy value
- `??` — default for null/undefined ONLY
- `&&` — guard clause (execute only if truthy)
- `?.` — safe property access (no crash on null/undefined)

**Slide: Which Construct to Use?**
- Ranges (>, <, >=) → `if/else`
- Exact value matching → `switch`
- Simple value assignment → ternary
- Default values → `??` (prefer over `||`)
- Guard/conditional execution → `&&`
- Nested optional data → `?.`

**Slide: User Input with `prompt-sync`**
- Install: `npm install prompt-sync`
- Require: `const prompt = require("prompt-sync")()`
- Use: `const name = prompt("Enter name: ")`
- Convert numbers: `const score = Number(prompt("Enter score: "))`
- Run: `node filename.js`

**Slide: Logical Assignment Operators**
- `x ||= y` — assign y if x is falsy
- `x ??= y` — assign y if x is null/undefined
- `x &&= y` — assign y if x is truthy

**Slide: TypeScript Narrowing**
- `typeof` → primitives
- Truthiness → null/undefined check
- Discriminated unions → object variants with `switch`

> "The full cheat sheet is shared after class. It covers everything from today with code examples for each construct."

---

#### Assignment Introduction (Presentation) — 87:30–89:00

> "Your assignment for this lecture: build a complete University Admission Gateway with interactive user input."

**Assignment: University Admission Gateway (Lecture 9)**

Requirements:
1. Use `prompt-sync` to collect student data interactively: name, age, scores for 3 subjects, department choice, and entrance exam status (yes/no)
2. Convert all numeric input using `Number()` — no string math allowed
3. Create a student application object with at least 8 properties (including at least one `null` and one `undefined` property)
4. Use `if / else if / else` to classify the student into one of 4 admission tiers based on average score
5. Use a `switch` statement to route the student to a department and check department-specific prerequisites
6. Use ternary operators for at least 3 simple value assignments (scholarship message, status label, fee calculation)
7. Use `||` and `??` to provide default values for missing/optional data — demonstrate when each is appropriate
8. Use `?.` (optional chaining) to safely access at least 2 nested properties that might be missing
9. Use at least one logical assignment operator (`??=` or `||=`)
10. Print a formatted admission decision report to the console

> "Submit via Google Classroom by the next session. Run your project with `node admission.js` and make sure the interactive input works. The grading criteria are in the `assignment.md` file."

---

#### Q&A — 89:00–89:30

> "Any questions before we close? Today was packed — seven conditional constructs, user input with prompt-sync, TypeScript narrowing, and a full application combining them all. If anything feels unclear, the cheatsheet, recording, and code files will help."

*Common questions to anticipate:*
- "When should I use `??` vs `||`?" → `??` for null/undefined only (preserves 0, "", false). `||` for all falsy values. Default to `??` — it's safer.
- "Can I use optional chaining everywhere?" → You can, but don't use it on values you know exist. `?.` signals to other developers that the value might be missing. Use it intentionally.
- "Is the nested ternary really bad?" → For 2 branches, ternary is great. For 3 with vertical formatting and pure value assignment, it's acceptable. For 4+ or with side effects, use `if/else`.
- "Do I need to know TypeScript narrowing for the assignment?" → Not yet — the assignment is JavaScript only. TypeScript becomes required from Lecture 16 onward. But understanding narrowing now makes the transition smoother.
- "What if the user enters invalid input like 'abc' for a score?" → `Number("abc")` gives `NaN`. For now, assume valid input — we'll learn proper validation with functions in Lecture 11.
- "Can I use `prompt-sync` in the browser?" → No — `prompt-sync` is Node.js only. In the browser, use the built-in `prompt()` function. We'll use browser APIs when we reach the DOM in Lecture 16.

---

#### Next Lecture Teaser — 89:30–90:00

> *Show the "Next Lecture" closing slide.*
>
> "In Lecture 10, we build the **Inventory Management System** — and for that, we need loops. `for` loops, `while` loops, `do-while` loops, and nested loops. We'll iterate over arrays of products, calculate totals across inventories, and build search functionality that scans through data. Every `if` statement you learned today appears inside those loops — checking conditions on each iteration. Decisions inside repetition — that's where programs become truly powerful. See you in Lecture 10."

---

## Phase 2: Share After Lecture

- [ ] Upload video recording to Google Classroom
- [ ] Push `code/` folder (with `admission.js` and `admission-interactive.js`) to course repo
- [ ] Post `assignment.md` to Google Classroom
- [ ] Share `presentation/` folder (HTML export or direct link)
- [ ] Post `cheatsheet.md` to Google Classroom
- [ ] Upload `quiz.md` to online portal — students should attempt before Lecture 10

---

## Interactive Questions Summary

| Part | Type | Topic | Purpose |
|------|------|-------|---------|
| Part 1 | Predict Output | `if/else if` chain with grade 72 → "C" | Teach that first matching condition wins; order matters |
| Part 1 | Spot the Error | Independent `if` blocks vs chained `if/else` | Reveal common bug: separate `if`s are not connected |
| Part 1 | Concept Challenge | Nested `if` vs flattened `&&` — when to use which | Teach refactoring deep nesting into readable flat conditions |
| Part 2 | Predict Output | `switch` fall-through with missing `break` | Show fall-through behavior; stress `break` importance |
| Part 2 | Concept Challenge | Rewrite `if/else` as ternary | Practice ternary syntax; note `const` benefit |
| Part 2 | Quick-Fire Recall | `default` keyword + `===` in switch | Rapid recall of switch fundamentals |
| Part 2 | Concept Challenge | Nested ternary acceptability check | Teach when nested ternary is OK vs when to use if/else |
| Part 3 | Predict Output | `0 \|\| 42` vs `0 ?? 42` | Core lesson: `??` preserves valid falsy values |
| Part 3 | Predict Output | `null?.toString()` → `undefined` | Show optional chaining prevents crashes |
| Part 3 | Hidden Fact Reveal | `"" ?? "fallback"` → `""` | Reveal that `??` preserves empty strings |
| Part 4 | Concept Challenge | Why `??` instead of `\|\|` for scholarship | Connect theory to real feature; reinforce Part 3 lesson |
| Part 4 | Predict Output | Admission with `entranceExam: 'no'` and avg 75 | Trace through multi-condition `if/else` chain |
| Part 4 | Quick-Fire Recall | `prompt-sync` return type — always string | Reinforce type conversion requirement |
| Part 5 | Concept Challenge | Removing a `case` from discriminated union switch | Teach TypeScript exhaustiveness checking |

---

## Teaching Tips Summary

| Moment | Tip Type | Purpose |
|--------|----------|---------|
| Opening — traffic signal analogy | Analogy | Make abstract concept of branching concrete before any code |
| `if/else` order demonstration | Live comparison (wrong vs right) | Show the consequence of condition ordering — not just theory |
| `switch` fall-through | Bug demo | High-impact "aha" moment — show code running where it shouldn't |
| Nested ternary decision framework | Decision framework | Teach WHEN nested ternary is acceptable — not just "never use it" |
| `||` vs `??` with zero | Production bug story | Real-world consequence makes the operator difference memorable |
| `?.` + `??` combo pattern | Production pattern | Show the modern JavaScript pattern they'll use daily |
| `prompt-sync` introduction | New tool + type conversion | Bridge from hardcoded demos to interactive programs; reinforce L8 concepts |
| Admission Gateway with user input | All constructs combined | Demonstrate that each tool has its place — selection is the skill |
| TypeScript discriminated unions | React preview | Plant seed for Module 3 — component state modeling |
| Closing teaser | Anticipation building | Connect today's decisions to next lecture's loops |

---

## Emergency Recovery

| Problem | Solution |
|---------|----------|
| reveal.js CDN fails | Open presentation as local file (most features still work). Fall back to VS Code full-screen + verbal explanation. |
| VS Code terminal not working | Use Chrome DevTools Console tab — paste code there and run it live (browser `prompt()` instead of `prompt-sync`). |
| `prompt-sync` not installed / crashes | Fall back to hardcoded values. Type the values manually: "Imagine the student typed 'Fatima' — we'll use that as our value." Install after class. |
| TypeScript Playground not loading | Skip Part 5 live demo — use the slides only to show narrowing concepts. TypeScript is a preview, not a requirement today. |
| Students confused by `??` vs `||` | Run side-by-side comparison in console: `0 || 42` → 42, `0 ?? 42` → 0. The visual difference makes it click immediately. |
| Running behind schedule | Shorten Part 5 TypeScript to slides only (skip live coding). In Part 4, demo prompt-sync briefly then switch to hardcoded values for the rest of the gateway. |
| Running ahead of schedule | Extend Part 4 — let students suggest different inputs and run the gateway live. Or add a bonus section on `switch(true)` pattern for range matching. |
| Student asks about loops inside conditionals | "Great question — that's exactly Lecture 10. Today we make the decisions. Next time, we repeat them over data. They combine perfectly." |
| Student asks about input validation | "Right now we trust the user — `Number('abc')` gives `NaN`. In Lecture 11 we learn functions, and that's where proper validation lives. For today, assume valid input." |

---

## Conversion Phrases (Sprinkle Throughout)

- *"This is what YouTube tutorials skip — they show you `if/else` syntax but not which construct to use when. Knowing the right tool is the difference between clean code and spaghetti code."*
- *"In 25 years of production code reviews, the #1 conditional bug I see: using `||` when `??` is needed. Zero, empty string, false — all lost. One operator change fixes an entire class of bugs."*
- *"Optional chaining was added to JavaScript in 2020. Before that, every property access needed a manual null check. Codebases had thousands of lines of `if (x && x.y && x.y.z)`. Now it's `x?.y?.z`. The language evolved — and so should your code."*
- *"When we reach React in Module 3, you'll see `{user && <UserProfile />}` and `{error ?? <DefaultMessage />}` everywhere. Today's short-circuit patterns ARE React's conditional rendering. You're learning React before you even know it."*
- *"Discriminated unions in TypeScript are how every serious React codebase models loading, success, and error states. We're previewing it now so that when you see it in Module 3, it's already familiar."*
- *"With `prompt-sync`, your programs are no longer demos — they're interactive tools. A user types their data, your code makes decisions, and the output changes. That's what real software does."*

---

## Never Say

- "This is easy/simple" → Say "foundational"
- "You should know this" → Say "Let me show you"
- "Obviously..." → Just explain it
- "Everyone knows..." → Not everyone does — that's why they're here
- "Just use if/else for everything" → Teach the right tool for each decision
- "Ternary is always better than if/else" → Each has its use case
- "Never use nested ternaries" → Teach when they're acceptable and when they're not

---

*End of Lecture 9 Plan — PRESENTER ONLY — Not shared with students.*
