# Lecture 13: String Processing, Pattern Matching & Defensive Error Handling

## PRESENTER ONLY (Not shared with students)

### Overview
- **Format**: Live Google Meet session
- **Style**: Presentation-driven (reveal.js) + live coding (VS Code)
- **Project**: Smart Content Analyzer & Validator
- **Goal**: Master JavaScript's string manipulation toolkit — from foundational methods to regular expressions for pattern matching — and build robust error handling with try/catch/finally, custom errors, and defensive programming patterns that prevent failures before they happen

---

## Pre-Class Setup Checklist

- [ ] VS Code with clean dark theme (Dracula or One Dark Pro recommended)
- [ ] Font size set to 18–20px for screen-share readability
- [ ] Browser (Chrome) open with DevTools on Console tab, ready to run snippets
- [ ] Blank project folder created: `content-analyzer/`
- [ ] New file open and ready: `content-analyzer/analyzer.js`
- [ ] Presentation loaded: `presentation/index.html` open in browser tab
- [ ] reveal.js CDN verified — advance through first 3 slides to confirm it loads
- [ ] Node.js installed and `node --version` confirms LTS (for terminal demos)
- [ ] Google Meet test run completed (audio, screen share, camera)
- [ ] Notifications silenced on all devices (phone on Do Not Disturb)
- [ ] Backup: Chrome DevTools Console ready as fallback for any VS Code issues
- [ ] Lecture-specific: Regex101.com open in a browser tab for live regex testing and visualization
- [ ] Lecture-specific: TypeScript Playground open in a browser tab (typescriptlang.org/play) for Part 5 demos
- [ ] Lecture-specific: Have sample text strings ready to paste for pattern matching demos (emails, phone numbers, URLs)
- [ ] Lecture-specific: Prepare a scratch file with intentionally bad user inputs (empty strings, numbers, special characters) for error handling demos

---

## Phase 0: Before Lecture (Lecture 13 — starts after Lecture 12 review)

### Portal Quiz Review (from Lecture 12)

> **Talking Points:**
> "Let's open with your Lecture 12 quiz results. Data transformation is the bridge between raw data and usable information — destructuring, spread, and object mastery are tools you'll reach for every single day as a professional developer. Let's see how those patterns landed."

**Commonly Missed Areas to Watch For (Data Transformation — Destructuring, Spread & Object Mastery — Lecture 12):**

- **Destructuring assignment vs object literal confusion**: Students sometimes write `const { name } = person` and expect `name` to become a property of some new object. Reinforce: destructuring EXTRACTS — it pulls values OUT of an object into individual variables.
- **Spread shallow copy trap**: `const copy = { ...original }` only copies one level deep. If `original.address` is an object, `copy.address` points to the SAME object. This is the most common mutation bug in JavaScript. Use `structuredClone()` for deep copies.
- **Rest vs spread confusion**: The `...` operator does two different things depending on context. In a function parameter or destructuring target → REST (collects). In an array/object literal → SPREAD (expands). Same syntax, opposite direction.
- **`Object.freeze` vs `Object.seal`**: Freeze prevents adding, removing, AND modifying. Seal prevents adding and removing but ALLOWS modification. Students often think freeze only prevents adding.
- **`Object.entries` returning arrays of arrays**: `Object.entries({ a: 1, b: 2 })` returns `[["a", 1], ["b", 2]]` — an array of `[key, value]` pairs. Students expect objects, not arrays.

> **Transition:**
> "Good. If you scored 7 or above — your data transformation skills are solid. If not, revisit the cheatsheet and recording before the next assignment. Today we tackle two essential skills that every developer needs: working with text and protecting your code from failure. Strings are everywhere — user input, API responses, file content, URLs. And things go wrong — invalid data, network failures, unexpected formats. Today you learn to process text with precision AND handle errors with confidence."

---

### Assignment Feedback (Lecture 12 — Enterprise Data Transformer)

> **Talking Points:**
> "Let me share what I noticed in the Enterprise Data Transformer submissions. This was your most data-heavy project yet, and many of you showed strong transformation thinking."

**Common Mistakes Observed:**

1. **Not using destructuring in function parameters**: Several submissions passed entire objects and then accessed properties with `data.name`, `data.price` inside the function. When a function only needs 2-3 properties, destructure in the parameter: `function process({ name, price })` — cleaner, self-documenting.
2. **Using spread to clone arrays of objects — then mutating the inner objects**: `const newList = [...original]` copies the array, but the objects inside are still shared references. Several students modified objects in `newList` and were surprised that `original` also changed. For arrays of objects, use `structuredClone()` or map with spread: `original.map(item => ({ ...item }))`.
3. **Forgetting `Object.fromEntries` for the reverse transformation**: Many submissions used `Object.entries()` to convert objects to arrays, transformed them with HOFs, but then manually rebuilt the object with a `for` loop instead of using `Object.fromEntries()` to convert back. The entries→transform→fromEntries pipeline is the idiomatic pattern.
4. **Not leveraging computed property names**: When building objects dynamically, `{ [key]: value }` is cleaner than creating an empty object and assigning properties. Several submissions used multiple lines where one computed property would suffice.
5. **Ignoring `structuredClone` for deep copies**: The assignment required deep cloning. Some submissions used `JSON.parse(JSON.stringify())` — which works but fails on `undefined`, functions, `Date`, `Map`, `Set`, and circular references. `structuredClone` handles all of these correctly.

**Good Examples to Highlight:**

- Praise submissions that chained `Object.entries` → `filter` → `map` → `Object.fromEntries` for clean data pipelines
- Highlight anyone who used nested destructuring effectively: `const { address: { city, zip } } = employee`
- Celebrate use of the rest operator for "everything except" patterns: `const { password, ...safeUser } = user`
- Acknowledge students who used `Object.freeze` on configuration objects to enforce immutability

> **Encouragement:**
> "Data transformation is the backbone of frontend development — every API response you receive in React will need reshaping, filtering, and reformatting. You've now got destructuring, spread, and object methods in your toolkit. Today we add string processing and error handling — the two remaining pieces that make your JavaScript complete for real-world applications."

---

## Phase 1: Today's Lecture (90 Minutes)

---

### Part 1: String Fundamentals & Core Methods (00:00 – 22:00)

---

#### Background / Motivation (Presentation) — 00:00–05:00

> **Talking Points:**
> "In Lecture 12, you transformed objects and arrays — structured data with keys and values. But a massive amount of real-world data arrives as plain text. User names, email addresses, search queries, API responses, CSV files, form input, URLs — all strings. To work with this data, you need string methods."
>
> "Today's project is the Smart Content Analyzer & Validator. Think of it as a tool that takes raw text — articles, user input, form data — and analyzes it: word counts, readability, pattern detection, format validation. Every content management system, every form processor, every search engine starts with string operations."
>
> "We'll cover string methods, template literals, regular expressions for pattern matching, and defensive error handling — the complete toolkit for text processing and failure prevention."

**Slide: Why Strings Matter**

| Where You'll Use Strings | Example |
|--------------------------|---------|
| Form validation | Is this a valid email? |
| Search features | Find products matching "laptop" |
| Data formatting | Convert "john doe" → "John Doe" |
| URL parsing | Extract domain from a full URL |
| API responses | Parse JSON text into usable data |
| Content analysis | Word count, readability score |

> "Strings are the most common data type you'll process in frontend development. Every user interaction that involves text — typing in a search bar, filling out a form, reading content — requires string manipulation. Today you learn every tool JavaScript gives you."

**Slide: Strings Are Immutable**

> "A critical concept before we start: strings in JavaScript are **immutable**. Every string method returns a NEW string — it never modifies the original. This is different from arrays, where methods like `push` and `splice` mutate in place."

```javascript
const name = "hello";
name.toUpperCase();    // Returns "HELLO" — but name is still "hello"
const upper = name.toUpperCase();  // You must capture the return value
```

> **Analogy:** "Think of strings like printed text on paper. You can't erase a letter and write a new one — you have to print a whole new page. Every string operation creates a new string and leaves the original untouched. This is actually a good thing — it means you can safely pass strings around without worrying about something else modifying them. In React, immutability is king — and strings already follow that rule."

---

#### Illustrations / Animations (Presentation) — 05:00–07:00

**Slide: String Character Access**

> Show visual breakdown:
> ```
>     "H e l l o"
>      0 1 2 3 4    ← index (zero-based, just like arrays)
>
>      charAt(0) → "H"
>      [1]       → "e"
>      at(-1)    → "o"     ← negative index counts from end
>      length    → 5
> ```
>
> "Strings are indexed exactly like arrays — zero-based. `charAt(0)` or bracket notation `[0]` gives the first character. The `at()` method (new in ES2022) accepts negative indices — `at(-1)` gives the last character without needing `str[str.length - 1]`."

**Slide: String Methods Categories**

> ```
> ┌─────────────────────────────────────────────────┐
> │                 STRING METHODS                    │
> ├──────────────┬──────────────┬────────────────────┤
> │   SEARCH     │  TRANSFORM   │     EXTRACT        │
> ├──────────────┼──────────────┼────────────────────┤
> │ indexOf      │ toUpperCase  │ slice              │
> │ lastIndexOf  │ toLowerCase  │ substring          │
> │ includes     │ trim         │ split              │
> │ startsWith   │ trimStart    │                    │
> │ endsWith     │ trimEnd      │                    │
> │              │ replace      │                    │
> │              │ replaceAll   │                    │
> │              │ padStart     │                    │
> │              │ padEnd       │                    │
> │              │ repeat       │                    │
> └──────────────┴──────────────┴────────────────────┘
> ```
>
> "We'll group them into three categories: searching (finding things IN a string), transforming (changing the content), and extracting (pulling pieces OUT). Every method returns a new value — the original string is never modified."

---

#### "Let's see in Code now" (VS Code) — 07:00–16:00

> "Open VS Code. Create a new file: `analyzer.js`. We're building the Smart Content Analyzer — starting with the foundational string methods."

```javascript
// ============================================
// Lecture 13 — Part 1: String Fundamentals & Core Methods
// Smart Content Analyzer & Validator
// NexusBerry Modern Frontend Course
// ============================================

// --- Primitives vs String Objects ---
const primitive = "Hello";           // String primitive (use this)
const object = new String("Hello");  // String object (avoid this)

console.log(typeof primitive);  // "string"
console.log(typeof object);    // "object" — different!

// Rule: ALWAYS use string primitives. Never use new String().
// JavaScript auto-wraps primitives when you call methods on them.

// --- Length & Character Access ---
const title = "Smart Content Analyzer";

console.log(`📏 Length: ${title.length}`);           // 22
console.log(`🔤 First char: "${title.charAt(0)}"`);  // "S"
console.log(`🔤 Bracket notation: "${title[6]}"`);   // "C"
console.log(`🔤 Last char (at): "${title.at(-1)}"`); // "r"
console.log(`🔤 Last char (old): "${title[title.length - 1]}"`); // "r"

// --- Unicode Basics ---
const emoji = "Hello 🌍";
console.log(`\n🌐 Unicode length: ${emoji.length}`);  // 8 (not 7!)
// Emoji 🌍 is a two-unit character — .length counts UTF-16 code units, not visible characters

// --- Searching Strings ---
const article = "JavaScript is versatile. JavaScript powers the web.";

console.log("\n🔍 Searching Methods:");
console.log(`  indexOf("JavaScript"): ${article.indexOf("JavaScript")}`);       // 0
console.log(`  lastIndexOf("JavaScript"): ${article.lastIndexOf("JavaScript")}`); // 24
console.log(`  indexOf("Python"): ${article.indexOf("Python")}`);               // -1 (not found)
console.log(`  includes("versatile"): ${article.includes("versatile")}`);       // true
console.log(`  startsWith("JavaScript"): ${article.startsWith("JavaScript")}`); // true
console.log(`  endsWith("web."): ${article.endsWith("web.")}`);                 // true

// includes vs indexOf — when to use which:
// includes() → returns boolean → use for yes/no checks
// indexOf() → returns position → use when you need the location

// --- Extracting Substrings ---
const url = "https://www.nexusberry.com/courses/react";

console.log("\n✂️ Extracting Substrings:");
console.log(`  slice(8, 27): "${url.slice(8, 27)}"`);         // "www.nexusberry.com"
console.log(`  slice(-5): "${url.slice(-5)}"`);                // "react"
console.log(`  substring(8, 27): "${url.substring(8, 27)}"`);  // "www.nexusberry.com"

// slice vs substring:
// slice() supports negative indices — substring() does not
// slice() returns empty for invalid ranges — substring() swaps start/end
// Recommendation: Always use slice() — it's more predictable

// --- Transforming Strings ---
const userInput = "   John DOE   ";

console.log("\n🔄 Transforming Strings:");
console.log(`  Original: "${userInput}"`);
console.log(`  trim(): "${userInput.trim()}"`);               // "John DOE"
console.log(`  trimStart(): "${userInput.trimStart()}"`);     // "John DOE   "
console.log(`  trimEnd(): "${userInput.trimEnd()}"`);         // "   John DOE"
console.log(`  toLowerCase(): "${userInput.trim().toLowerCase()}"`);  // "john doe"
console.log(`  toUpperCase(): "${userInput.trim().toUpperCase()}"`);  // "JOHN DOE"

// --- Replacing Content ---
const sentence = "I love cats. Cats are great. CATS rule.";

console.log("\n🔁 Replacing Content:");
console.log(`  replace("cats", "dogs"): "${sentence.replace("cats", "dogs")}"`);
// Only replaces FIRST occurrence: "I love dogs. Cats are great. CATS rule."

console.log(`  replaceAll("cats", "dogs"): "${sentence.replaceAll("cats", "dogs")}"`);
// Replaces ALL exact matches: "I love dogs. Cats are great. CATS rule."
// Note: case-sensitive! "Cats" and "CATS" are NOT replaced

// For case-insensitive replacement, use regex (Part 3)

// --- Split & Join — String ↔ Array Bridge ---
const csv = "Laptop,Mouse,Keyboard,Monitor";
const words = csv.split(",");
console.log("\n🔗 Split & Join:");
console.log(`  split(","): `, words);           // ["Laptop", "Mouse", "Keyboard", "Monitor"]
console.log(`  join(" | "): "${words.join(" | ")}"`);  // "Laptop | Mouse | Keyboard | Monitor"

// Real-world: parse CSV data, split URLs, tokenize search queries
const paragraph = "Hello world. How are you.";
const wordCount = paragraph.split(" ").length;
console.log(`  Word count: ${wordCount}`);  // 5

// --- Template Literals Deep Dive ---
const product = { name: "Laptop", price: 89999, stock: 15 };

console.log("\n📝 Template Literals:");

// Expression interpolation — any JS expression works
console.log(`  ${product.name}: Rs. ${product.price.toLocaleString()}`);

// Multiline strings — no \n needed
const report = `
  Product Report
  ─────────────
  Name:  ${product.name}
  Price: Rs. ${product.price.toLocaleString()}
  Stock: ${product.stock} units
  Value: Rs. ${(product.price * product.stock).toLocaleString()}
  Status: ${product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
`;
console.log(report);

// Nested template literals
const items = ["HTML", "CSS", "JavaScript"];
console.log(`Skills: ${items.map(s => `[${s}]`).join(" ")}`);
// "Skills: [HTML] [CSS] [JavaScript]"

// --- Padding & Repeating ---
console.log("\n📐 Padding & Repeating:");
console.log(`  "5".padStart(3, "0"): "${"5".padStart(3, "0")}"`);       // "005"
console.log(`  "42".padStart(3, "0"): "${"42".padStart(3, "0")}"`);     // "042"
console.log(`  "Hi".padEnd(10, "."): "${"Hi".padEnd(10, ".")}"`);       // "Hi........"
console.log(`  "─".repeat(30): "${"─".repeat(30)}"`);                    // 30 dashes

// Real-world: formatting invoice numbers, aligning console output, creating separators
const invoiceNum = String(42).padStart(6, "0");
console.log(`  Invoice: INV-${invoiceNum}`);  // INV-000042
```

> **Narration while typing:**
> "Notice how every method returns a new string. `trim()` doesn't modify `userInput` — it creates a cleaned copy. That's immutability in action. You must capture the result: `const cleaned = userInput.trim()`."
>
> "The `split` and `join` methods are the bridge between strings and arrays. `split` breaks a string into an array, `join` merges an array back into a string. This is how you parse CSV data, tokenize search queries, and build formatted output."
>
> "Template literals with backticks are your go-to for string construction in modern JavaScript. Forget string concatenation with `+` — template literals are cleaner, support multiline, and allow any expression inside `${}`."

---

#### Interactive Questions (Presentation/Verbal) — 16:00–19:00

**Question 1 — Predict Output:**

> "What does this code print?"

```javascript
const text = "Hello World";
console.log(text.slice(6));
console.log(text.slice(-5));
```

> **Answer:** `"World"` and `"World"`. `slice(6)` starts at index 6 to the end. `slice(-5)` starts 5 characters from the end. Both extract "World" — but for different reasons.
> **Teaching moment:** "Negative indices in `slice` count from the end. `-1` is the last character, `-5` is 5 from the end. This is a cleaner alternative to `str.slice(str.length - 5)`."

**Question 2 — Spot the Error:**

> "This code should clean and compare user input. What's wrong?"

```javascript
const input = "  Hello  ";
input.trim();
if (input === "Hello") {
    console.log("Match!");
}
```

> **Answer:** `trim()` returns a new string — it doesn't modify `input`. The original `input` still has spaces. Fix: `const cleaned = input.trim()` then compare `cleaned === "Hello"`.
> **Teaching moment:** "This is THE most common string bug. Students call `trim()` or `toLowerCase()` and forget to capture the result. Strings are immutable — every method returns a NEW string."

**Question 3 — Quick-Fire Recall:**

> "What's the difference between `includes()` and `indexOf()`?"

> **Answer:** `includes()` returns `true`/`false` — use it for existence checks. `indexOf()` returns the position (or `-1`) — use it when you need to know WHERE something is. Both search for substrings, but their return types serve different purposes.

---

#### Live Debugging (VS Code) — 19:00–20:30

> "Here's a common bug from form validation code."

```javascript
// Bug: Case-sensitive comparison fails on user input
const userEmail = "John.Doe@Gmail.COM";
const allowedDomain = "gmail.com";

// WRONG: Direct comparison is case-sensitive
const domain = userEmail.split("@")[1];
if (domain === allowedDomain) {
    console.log("Gmail user!");  // Never runs!
}
console.log(`Domain extracted: "${domain}"`);  // "Gmail.COM"

// FIX: Normalize to lowercase before comparing
const domainNormalized = userEmail.split("@")[1].toLowerCase();
if (domainNormalized === allowedDomain) {
    console.log("Gmail user!");  // ✅ Now works
}
```

> "Email domains are case-insensitive by spec (RFC 5321), but JavaScript string comparison is case-sensitive. Always normalize with `.toLowerCase()` before comparing. I've seen this bug in production sign-up forms — users with 'Gmail.COM' couldn't register because the validator only checked for 'gmail.com'. One `.toLowerCase()` call prevents thousands of support tickets."

---

#### Part Closing (Presentation) — 20:30–22:00

**Common Mistakes:**
- Calling string methods without capturing the return value — strings are immutable
- Using `substring` instead of `slice` — `slice` supports negative indices and is more predictable
- Forgetting that `replace()` only replaces the FIRST occurrence — use `replaceAll()` for all
- Not normalizing case before comparisons — `"Hello" !== "hello"`

**Optimization Tips:**
- Chain methods for clean pipelines: `input.trim().toLowerCase().split(" ")`
- Use `includes()` for boolean checks, `indexOf()` only when you need the position
- `at(-1)` is cleaner than `str[str.length - 1]` for the last character
- `padStart` is perfect for formatting numbers: `String(n).padStart(3, "0")` → "007"

**Best Practices:**
- Always `trim()` user input before processing — whitespace is invisible but breaks comparisons
- Always normalize case for comparisons — use `toLowerCase()` on both sides
- Use template literals instead of string concatenation — cleaner, more readable
- Use `slice()` over `substring()` — it's the modern standard

**Professional Insights:**
> "In 25 years, the string bugs I've seen most often in production are: forgetting to trim user input, case-sensitive comparisons on case-insensitive data, and calling `replace` expecting it to replace ALL occurrences. These three mistakes cause more form validation failures than any other category. Master these fundamentals and you eliminate entire classes of user-facing bugs."

---

### Part 2: Regular Expressions — Pattern Matching Fundamentals (22:00 – 44:00)

---

#### Background / Motivation (Presentation) — 22:00–27:00

> **Talking Points:**
> "String methods are powerful for exact matches — `includes("hello")`, `startsWith("http")`. But what about flexible patterns? 'Find any phone number in this text.' 'Check if this string is a valid email format.' 'Replace all dates in DD/MM/YYYY format.' For these, you need regular expressions."
>
> "A regular expression — regex — is a pattern that describes a set of strings. Instead of searching for one exact string, you search for any string that matches a pattern. It's like a search template with wildcards."
>
> "Regex is one of the most powerful tools in programming — and one of the most feared. The syntax looks intimidating at first. But once you understand the building blocks, you can read and write patterns with confidence. Today we break it down systematically."

**Slide: What Are Regular Expressions?**

| Without Regex | With Regex |
|---------------|-----------|
| Check if string contains digits manually with loops | `/\d+/` matches any digits |
| Validate email with 10+ string method calls | `/^[\w.-]+@[\w.-]+\.\w+$/` — one line |
| Find all phone numbers with nested conditions | `/\d{3}-\d{3}-\d{4}/g` finds all matches |
| Replace multiple date formats with cascading replaceAll | One regex handles all variations |

> "Regex replaces dozens of lines of manual string checking with a single pattern. Every programming language supports them — learn regex once, use it everywhere."

**Slide: Regex Building Blocks**

> "A regex is built from 5 categories of building blocks:"

| Category | What It Does | Examples |
|----------|-------------|---------|
| **Character classes** | Match types of characters | `\d` (digit), `\w` (word), `\s` (space) |
| **Character sets** | Match specific ranges | `[a-z]`, `[0-9]`, `[aeiou]` |
| **Quantifiers** | How many times | `*` (0+), `+` (1+), `?` (0-1), `{3}` (exactly 3) |
| **Anchors** | Position in string | `^` (start), `$` (end), `\b` (word boundary) |
| **Groups** | Combine patterns | `()` grouping, `|` alternation (OR) |

> **Analogy:** "Think of regex like a combination lock. Each position (slot) can accept certain characters. The pattern `/\d{3}-\d{4}/` says: 'three digits, then a dash, then four digits.' Any string matching that pattern opens the lock — '555-1234', '800-9999', '123-4567'. The pattern defines the shape, not the exact value."

---

#### Illustrations / Animations (Presentation) — 27:00–29:00

**Slide: Anatomy of a Regex**

> ```
>     /^\d{3}-\d{3}-\d{4}$/g
>      │ │  │  │  │  │   │ │
>      │ │  │  │  │  │   │ └─ flag: g = global (find all)
>      │ │  │  │  │  │   └─── $ = must end here
>      │ │  │  │  │  └─────── {4} = exactly 4 digits
>      │ │  │  │  └────────── \d = any digit [0-9]
>      │ │  │  └───────────── - = literal dash
>      │ │  └──────────────── {3} = exactly 3 digits
>      │ └─────────────────── \d = any digit [0-9]
>      └───────────────────── ^ = must start here
> ```
>
> "Every regex lives between forward slashes. Flags come after the closing slash. `^` and `$` anchor the pattern — the string must match from start to finish, not just contain the pattern somewhere in the middle."

**Slide: Character Classes Visual**

> ```
> \d  →  [0-9]          Any digit
> \D  →  [^0-9]         Any NON-digit
> \w  →  [a-zA-Z0-9_]   Any word character
> \W  →  [^a-zA-Z0-9_]  Any NON-word character
> \s  →  [ \t\n\r\f]    Any whitespace
> \S  →  [^ \t\n\r\f]   Any NON-whitespace
> .   →  (any character except newline)
> ```
>
> "Uppercase = negation. `\d` matches digits, `\D` matches everything that ISN'T a digit. Same pattern for `\w`/`\W` and `\s`/`\S`. Memorize the lowercase ones and you get the uppercase for free."

---

#### "Let's see in Code now" (VS Code) — 29:00–39:00

```javascript
// ============================================
// Lecture 13 — Part 2: Regular Expressions Fundamentals
// Smart Content Analyzer & Validator
// NexusBerry Modern Frontend Course
// ============================================

// --- Creating Regex ---
// Two ways to create:
const literal = /hello/;           // Regex literal — use when pattern is fixed
const dynamic = new RegExp("hello"); // Constructor — use when pattern is a variable

// When to use which:
// /pattern/ → most of the time (cleaner, faster)
// new RegExp(variable) → when the pattern comes from user input or a variable
const searchTerm = "laptop";
const dynamicRegex = new RegExp(searchTerm, "i");  // "i" flag = case-insensitive

// --- Character Classes ---
console.log("📋 Character Classes:");

const testString = "Order #42 shipped on 2024-01-15";

console.log(`  \\d test: "${testString}".match(/\\d+/g)`);
console.log(`  Result:`, testString.match(/\d+/g));   // ["42", "2024", "01", "15"]

console.log(`  \\w test: "hello world!".match(/\\w+/g)`);
console.log(`  Result:`, "hello world!".match(/\w+/g));  // ["hello", "world"]

console.log(`  \\s test: "a b  c".match(/\\s+/g)`);
console.log(`  Result:`, "a b  c".match(/\s+/g));  // [" ", "  "]

console.log(`  .  test: "a1 b2".match(/./g)`);
console.log(`  Result:`, "a1 b2".match(/./g));  // ["a", "1", " ", "b", "2"]

// --- Character Sets ---
console.log("\n🎯 Character Sets:");

// Custom ranges
console.log(`  [aeiou]: "Hello World".match(/[aeiou]/gi)`);
console.log(`  Result:`, "Hello World".match(/[aeiou]/gi));  // ["e", "o", "o"]

console.log(`  [A-Z]: "Hello World".match(/[A-Z]/g)`);
console.log(`  Result:`, "Hello World".match(/[A-Z]/g));    // ["H", "W"]

console.log(`  [^0-9]: "abc123".match(/[^0-9]/g)`);
console.log(`  Result:`, "abc123".match(/[^0-9]/g));        // ["a", "b", "c"]
// ^ inside [] means NEGATION — match anything NOT in the set

// --- Quantifiers ---
console.log("\n🔢 Quantifiers:");

const quantTest = "aaa bb c dddd";
console.log(`  String: "${quantTest}"`);
console.log(`  /a+/:`, quantTest.match(/a+/g));      // ["aaa"] — 1 or more a's
console.log(`  /b*/:`, quantTest.match(/b+/g));      // ["bb"] — 1 or more b's
console.log(`  /d{2}/:`, quantTest.match(/d{2}/g));  // ["dd", "dd"] — exactly 2 d's
console.log(`  /d{2,3}/:`, quantTest.match(/d{2,3}/g)); // ["ddd"] — 2 to 3 d's (greedy)

// ? = optional (0 or 1)
console.log(`\n  "colour" matches /colou?r/:`, /colou?r/.test("colour"));  // true
console.log(`  "color" matches /colou?r/:`, /colou?r/.test("color"));    // true
// The "u" is optional — matches both British and American spelling

// --- Anchors & Boundaries ---
console.log("\n⚓ Anchors & Boundaries:");

const text = "cat catalog scattered";
console.log(`  String: "${text}"`);
console.log(`  /cat/ (no anchor):`, text.match(/cat/g));        // ["cat", "cat", "cat"]
console.log(`  /^cat/ (start):`, text.match(/^cat/g));          // ["cat"] — only at start
console.log(`  /\\bcat\\b/ (word boundary):`, text.match(/\bcat\b/g)); // ["cat"] — whole word only

// Word boundary \b = edge between word char and non-word char
// "cat" in "catalog" — no boundary after "cat" → no match with \b
// "cat" standalone — boundary before "c" and after "t" → matches with \b

// --- Groups & Alternation ---
console.log("\n🔗 Groups & Alternation:");

// Alternation — OR
console.log(`  /(cat|dog)/:`, "I have a cat and a dog".match(/(cat|dog)/g));
// ["cat", "dog"]

// Capturing groups
const dateStr = "2024-01-15";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(`\n  Date: "${dateStr}"`);
console.log(`  Full match: "${dateMatch[0]}"`);   // "2024-01-15"
console.log(`  Year: "${dateMatch[1]}"`);          // "2024"
console.log(`  Month: "${dateMatch[2]}"`);         // "01"
console.log(`  Day: "${dateMatch[3]}"`);           // "15"
// Groups capture parts of the match — indexed from 1

// --- Flags ---
console.log("\n🚩 Regex Flags:");

const flagText = "Hello hello HELLO";
console.log(`  String: "${flagText}"`);
console.log(`  /hello/g:`, flagText.match(/hello/g));      // ["hello"] — case-sensitive
console.log(`  /hello/gi:`, flagText.match(/hello/gi));    // ["Hello", "hello", "HELLO"]
// g = global (find all), i = case-insensitive, m = multiline

// --- Regex with String Methods ---
console.log("\n🛠️ Regex + String Methods:");

// test() — returns boolean (called on the regex)
console.log(`  /\\d/.test("abc123"):`, /\d/.test("abc123"));  // true
console.log(`  /\\d/.test("abcdef"):`, /\d/.test("abcdef"));  // false

// search() — returns index of first match (like indexOf but with regex)
console.log(`  "abc123".search(/\\d/):`, "abc123".search(/\d/));  // 3

// match() — returns matches (with g flag: all matches)
console.log(`  "a1b2c3".match(/\\d/g):`, "a1b2c3".match(/\d/g)); // ["1", "2", "3"]

// replace() with regex — replaces ALL when using /g
const mixed = "I love cats. Cats are great. CATS rule.";
console.log(`\n  Before: "${mixed}"`);
console.log(`  After:  "${mixed.replace(/cats/gi, "dogs")}"`);
// "I love dogs. dogs are great. dogs rule."
// /gi = global + case-insensitive — replaces ALL occurrences regardless of case
```

> **Narration while typing:**
> "Look at the power difference. Earlier, `replace("cats", "dogs")` only replaced the first lowercase occurrence. With `/cats/gi`, we replace ALL occurrences regardless of case — one regex does what would take multiple `replaceAll` calls."
>
> "Capturing groups in `match()` are incredibly useful. The date pattern `/(\d{4})-(\d{2})-(\d{2})/` doesn't just find the date — it extracts year, month, and day into separate groups. You get structured data from unstructured text."
>
> "The `\b` word boundary is your secret weapon for precise matching. Without it, `/cat/g` matches 'cat' inside 'catalog' and 'scattered'. With `\bcat\b`, it only matches the standalone word 'cat'. This matters for search features — users searching for 'cat' don't want results for 'caterpillar'."

---

#### Interactive Questions (Presentation/Verbal) — 39:00–42:00

**Question 1 — Predict Output:**

> "What does this code return?"

```javascript
const result = "abc 123 def 456".match(/\d+/g);
console.log(result);
```

> **Answer:** `["123", "456"]`. `\d+` matches one or more digits. The `g` flag finds all matches. It finds two sequences of digits in the string.
> **Teaching moment:** "Without the `g` flag, `match` returns only the first match plus capturing group info. With `g`, it returns an array of ALL matches. The `g` flag changes the return type — this trips up many developers."

**Question 2 — Concept Challenge:**

> "What's the difference between `\d` and `[0-9]`?"

> **Answer:** They're functionally identical in most cases — both match a single digit character 0-9. `\d` is the shorthand. However, in Unicode-aware mode, `\d` can match digits from other scripts (Arabic, Thai, etc.), while `[0-9]` strictly matches ASCII digits 0-9. For web forms accepting standard input, they're interchangeable.
> **Teaching moment:** "Use `\d` for readability — it's shorter and universally understood. Use `[0-9]` when you explicitly need only ASCII digits."

**Question 3 — Spot the Error:**

> "This regex should validate that a string contains ONLY digits. What's wrong?"

```javascript
const isAllDigits = /\d+/.test("abc123");
console.log(isAllDigits);  // true — but "abc123" isn't all digits!
```

> **Answer:** Missing anchors. `/\d+/` means "contains one or more digits somewhere." Fix: `/^\d+$/` — the `^` and `$` anchors force the ENTIRE string to match. `^` = must start with digits, `$` = must end with digits, `+` = one or more.
> **Teaching moment:** "Anchors are the most commonly forgotten part of validation regex. Without `^` and `$`, you're testing 'does this contain the pattern?' — not 'does this match the pattern entirely?'"

---

#### Live Debugging (VS Code) — 42:00–43:00

> "Here's a regex validation bug that made it to production."

```javascript
// Bug: Regex without anchors accepts partial matches
function isValidZipCode(zip) {
    return /\d{5}/.test(zip);  // Looks correct...
}

console.log(isValidZipCode("12345"));      // true ✅
console.log(isValidZipCode("123456789"));  // true — WRONG! Too many digits
console.log(isValidZipCode("abc12345xyz")); // true — WRONG! Contains non-digits

// FIX: Add anchors to enforce exact match
function isValidZipCodeFixed(zip) {
    return /^\d{5}$/.test(zip);  // Must be EXACTLY 5 digits, nothing else
}

console.log(isValidZipCodeFixed("12345"));      // true ✅
console.log(isValidZipCodeFixed("123456789"));  // false ✅
console.log(isValidZipCodeFixed("abc12345xyz")); // false ✅
```

> "Without `^` and `$`, the regex found 5 digits WITHIN the string and said 'yes.' With anchors, it requires the ENTIRE string to be exactly 5 digits. This is the difference between a validator that works and one that lets garbage through. I've seen this exact bug in zip code fields that accepted credit card numbers."

---

#### Part Closing (Presentation) — 43:00–44:00

**Common Mistakes:**
- Forgetting anchors `^` and `$` in validation patterns — accepts partial matches
- Not using the `g` flag when you want ALL matches — `match` returns only the first
- Forgetting to escape special characters — `.` matches ANY character, use `\.` for a literal dot
- Using `\d` when you need `\d+` — `\d` matches ONE digit, `\d+` matches a sequence

**Optimization Tips:**
- Use regex101.com for testing — it explains each part of your regex visually
- Keep regex patterns readable — comment complex patterns or break them into named variables
- Use `test()` for boolean checks (fastest), `match()` when you need the actual matches
- Prefer literal regex `/pattern/` over `new RegExp()` unless the pattern is dynamic

**Best Practices:**
- Always anchor validation patterns: `/^\d{5}$/` not `/\d{5}/`
- Escape literal special characters: `\.`, `\*`, `\+`, `\?`, `\(`, `\)`
- Use character classes for readability: `\d` over `[0-9]`, `\w` over `[a-zA-Z0-9_]`
- Test regex against valid AND invalid input — a regex that accepts everything validates nothing

**Professional Insights:**
> "Regular expressions have a reputation for being unreadable. That's earned — poorly written regex IS unreadable. But well-structured regex with clear intent is one of the most powerful tools in your toolkit. In my career, I've used regex in: log parsing, data migration scripts, search engines, form validators, code linters, and content filters. Learn it once, use it for 25 years."

---

### Part 3: Practical Regex Patterns & Real-World Validation (44:00 – 58:00)

---

#### Background / Motivation (Presentation) — 44:00–47:00

> **Talking Points:**
> "Now you know the building blocks — character classes, quantifiers, anchors, groups. Let's put them together for real-world patterns. The four most common validation tasks in web development are: email format, phone numbers, password strength, and URL validation."
>
> "A word of caution: regex validates FORMAT, not existence. `/^[\w.-]+@[\w.-]+\.\w+$/` checks that a string looks like an email — it doesn't verify the inbox exists. For that, you send a confirmation email. Regex is your first line of defense — quick, client-side format checking before the data even hits your server."

**Slide: The Validation Layer Cake**

> ```
> ┌──────────────────────────────────┐
> │  Layer 1: HTML5 attributes       │  type="email", required, pattern
> ├──────────────────────────────────┤
> │  Layer 2: JavaScript regex       │  Real-time format validation ← TODAY
> ├──────────────────────────────────┤
> │  Layer 3: Business logic         │  Password strength, username rules
> ├──────────────────────────────────┤
> │  Layer 4: Server validation      │  Never trust client-side alone
> └──────────────────────────────────┘
> ```
>
> "Client-side validation improves user experience — instant feedback without a server round-trip. But NEVER rely on it for security. A user can disable JavaScript or modify the request directly. Server-side validation is the final authority."

---

#### Illustrations / Animations (Presentation) — 47:00–48:00

**Slide: Email Pattern Breakdown**

> ```
> /^[\w.-]+@[\w.-]+\.\w{2,}$/
>   │      │ │      │ │
>   │      │ │      │ └── 2+ word chars (domain extension: com, org, co.uk)
>   │      │ │      └──── literal dot (escaped)
>   │      │ └─────────── domain: word chars, dots, hyphens
>   │      └───────────── @ symbol (literal)
>   └──────────────────── local part: word chars, dots, hyphens
> ```
>
> "Each piece of the email regex maps to a part of the email structure. The `+` after each set means 'one or more.' The `\.` is an escaped dot — because `.` alone means 'any character.' `\w{2,}` means 'at least 2 word characters' for the domain extension."

---

#### "Let's see in Code now" (VS Code) — 48:00–55:00

```javascript
// ============================================
// Lecture 13 — Part 3: Practical Regex Patterns
// Smart Content Analyzer & Validator
// NexusBerry Modern Frontend Course
// ============================================

// --- Email Format Validation ---
console.log("📧 Email Validation:");

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

const emails = [
    "user@example.com",        // ✅ valid
    "john.doe@company.co.uk",  // ✅ valid
    "name@domain",             // ❌ missing extension
    "@example.com",            // ❌ missing local part
    "user@.com",               // ❌ missing domain name
    "user name@example.com"    // ❌ space in local part
];

for (const email of emails) {
    const isValid = emailRegex.test(email);
    console.log(`  ${isValid ? "✅" : "❌"} "${email}"`);
}

// Note: This is a practical validation — not RFC 5322 compliant
// For production email validation, send a confirmation email

// --- Phone Number Validation (Pakistan format) ---
console.log("\n📱 Phone Number Validation:");

// Pakistan formats: 0300-1234567, 03001234567, +923001234567
const phoneRegex = /^(\+92|0)\d{3}-?\d{7}$/;

const phones = [
    "0300-1234567",     // ✅ with dash
    "03001234567",      // ✅ without dash
    "+923001234567",    // ✅ international format
    "300-1234567",      // ❌ missing leading 0 or +92
    "0300-123456",      // ❌ too few digits
    "0300-12345678"     // ❌ too many digits
];

for (const phone of phones) {
    const isValid = phoneRegex.test(phone);
    console.log(`  ${isValid ? "✅" : "❌"} "${phone}"`);
}

// --- Password Strength Validation ---
console.log("\n🔐 Password Strength Checker:");

function checkPasswordStrength(password) {
    const checks = {
        length:    password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit:     /\d/.test(password),
        special:   /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    const passed = Object.values(checks).filter(Boolean).length;

    let strength;
    if (passed <= 2) strength = "🔴 Weak";
    else if (passed <= 3) strength = "🟡 Fair";
    else if (passed <= 4) strength = "🟠 Good";
    else strength = "🟢 Strong";

    return { ...checks, passed, strength };
}

const passwords = ["password", "Password1", "P@ssw0rd!", "12345678", "Tr0ub4dor&3"];
for (const pw of passwords) {
    const result = checkPasswordStrength(pw);
    console.log(`  ${result.strength}: "${pw}" (${result.passed}/5 checks)`);
}

// --- URL Validation ---
console.log("\n🌐 URL Validation:");

const urlRegex = /^https?:\/\/[\w.-]+(:\d+)?(\/[\w./\-?&#=]*)?$/;

const urls = [
    "https://www.nexusberry.com",           // ✅
    "http://localhost:3000",                 // ✅
    "https://api.example.com/users?id=42",  // ✅
    "ftp://files.example.com",              // ❌ not http(s)
    "www.example.com",                      // ❌ missing protocol
    "https://",                             // ❌ missing domain
];

for (const url of urls) {
    const isValid = urlRegex.test(url);
    console.log(`  ${isValid ? "✅" : "❌"} "${url}"`);
}

// --- Practical: Extract All Data from Text ---
console.log("\n📊 Data Extraction from Text:");

const contactInfo = `
    Contact us:
    Email: admin@nexusberry.com or support@nexusberry.com
    Phone: 0328-4500073 or 042-36440443
    Website: https://www.nexusberry.com
    Postal Code: 54000
`;

const extractedEmails = contactInfo.match(/[\w.-]+@[\w.-]+\.\w{2,}/g) || [];
const extractedPhones = contactInfo.match(/\d{3,4}-\d{7,8}/g) || [];
const extractedUrls = contactInfo.match(/https?:\/\/[\w.-]+/g) || [];
const extractedZips = contactInfo.match(/\b\d{5}\b/g) || [];

console.log(`  Emails found: ${extractedEmails.join(", ")}`);
console.log(`  Phones found: ${extractedPhones.join(", ")}`);
console.log(`  URLs found:   ${extractedUrls.join(", ")}`);
console.log(`  Zip codes:    ${extractedZips.join(", ")}`);
```

> **Narration while typing:**
> "The password strength checker uses multiple small regex patterns — one for each requirement. This is better than one massive regex because: it's readable, you can give specific feedback to the user ('missing uppercase'), and you can adjust individual rules without rewriting the whole pattern."
>
> "The data extraction example shows regex at its most powerful. From a block of unstructured text, we pull out emails, phone numbers, URLs, and zip codes — each with a single `match()` call. This is how content analysis tools, web scrapers, and log parsers work."
>
> "Notice the `|| []` after each `match()`. When `match()` finds nothing, it returns `null`, not an empty array. Calling `.join()` on `null` would crash. The `|| []` provides a safe fallback — defensive programming in action. We'll cover this formally in Part 4."

---

#### Interactive Questions (Presentation/Verbal) — 55:00–57:00

**Question 1 — Hidden Fact Reveal:**

> "What does `match()` return when there are NO matches and the `g` flag is used?"

> **Answer:** `null` — NOT an empty array. This is why you need `|| []` as a fallback when chaining methods on the result. `"abc".match(/\d/g)` returns `null`, and `null.length` would throw a TypeError.
> **Reveal:** "This is one of JavaScript's design inconsistencies. `match` with `g` returns an array of matches OR null — not an empty array. Always guard with `|| []` when you plan to iterate or access `.length` on the result."

**Question 2 — Predict Output:**

> "Does this password pass the uppercase check?"

```javascript
const password = "hello world 123";
console.log(/[A-Z]/.test(password));
```

> **Answer:** `false`. The password contains lowercase letters, spaces, and digits — but no uppercase letter. `[A-Z]` requires at least one character in the A-Z range.
> **Teaching moment:** "Each regex check is independent. A password can pass the digit check but fail the uppercase check. That's why we use separate patterns — granular feedback is better UX than 'password invalid.'"

---

#### Live Debugging (VS Code) — 57:00–57:30

> "A real bug from a URL validation function."

```javascript
// Bug: Forgot to escape the dot in regex
const badUrlRegex = /^https?:\/\/[\w-]+.[\w.]+$/;  // . matches ANY character!

console.log(badUrlRegex.test("https://exampleXcom"));  // true — WRONG!
// The . matches "X" (or any character) — not just a literal dot

// FIX: Escape the dot
const goodUrlRegex = /^https?:\/\/[\w-]+\.[\w.]+$/;  // \. matches only a literal dot

console.log(goodUrlRegex.test("https://exampleXcom"));  // false ✅
console.log(goodUrlRegex.test("https://example.com"));  // true ✅
```

> "An unescaped `.` in regex matches ANY character. `example.com` and `exampleXcom` both match `/example.com/`. Always escape dots with `\.` when you mean a literal period. This is the #1 regex bug — and it appears in almost every beginner's URL or email validator."

---

#### Part Closing (Presentation) — 57:30–58:00

**Common Mistakes:**
- Unescaped special characters — `.` matches any character, not just a dot
- Regex too strict — rejecting valid inputs (e.g., emails with `+` signs)
- Regex too loose — accepting garbage (missing anchors)
- `match()` returning `null` instead of empty array — crashes when chaining

**Optimization Tips:**
- Break complex validation into multiple simple patterns (like the password checker)
- Use `test()` for validation (boolean), `match()` for extraction
- Compile regex patterns once as `const` — don't create them inside loops
- Use regex101.com for testing and explaining complex patterns

**Best Practices:**
- Client-side regex is for UX — server-side validation is for security
- Don't write your own email regex for production — use a library like `validator.js`
- Test against edge cases: empty strings, very long strings, special characters, Unicode
- Comment complex regex patterns: `// Format: YYYY-MM-DD` above the pattern

**Professional Insights:**
> "In production systems, I use regex for quick format checks — is this roughly shaped like an email? If yes, send a confirmation link. The regex isn't the validator — the confirmation email is. Regex gates the input so you don't waste server resources on obviously invalid data. Keep your regex practical, not perfect."

---

### Part 4: Defensive Error Handling — try/catch/finally (58:00 – 78:00)

---

#### Background / Motivation (Presentation) — 58:00–63:00

> **Talking Points:**
> "We've been writing code that works when everything goes right. But in production, things go wrong constantly. Users enter garbage. APIs go down. Data arrives in unexpected formats. Network connections drop."
>
> "An unhandled error in JavaScript crashes your program. In a browser, it freezes the UI. In Node.js, it kills the server. In React, it can take down your entire application with a white screen of death."
>
> "Error handling is how professional code survives the unexpected. Instead of crashing, your code catches the error, handles it gracefully, and continues running. The user sees a friendly message instead of a broken page."
>
> "This is also why we placed this lecture before Lecture 14 (Async Programming). Every `async/await` call needs `try/catch` around it. If you don't understand error handling, you can't write safe async code. Today is the foundation for everything async."

**Slide: JavaScript's Error Types**

| Error Type | When It Happens | Example |
|-----------|----------------|---------|
| `SyntaxError` | Invalid code structure | `if (true {` — missing `)` |
| `TypeError` | Wrong type operation | `null.toString()` — can't call method on null |
| `ReferenceError` | Undefined variable | `console.log(x)` — `x` doesn't exist |
| `RangeError` | Value out of range | `new Array(-1)` — negative length |

> "These are the four errors you'll encounter most often. `TypeError` is the most common in production — it happens when you try to access a property or method on `undefined` or `null`. The dreaded 'Cannot read properties of undefined' message."

**Slide: The try/catch/finally Flow**

> ```
>    try {
>        // Code that MIGHT fail
>        // If error → jump to catch
>        // If no error → skip catch
>    } catch (error) {
>        // Handle the error
>        // Only runs if try block threw
>    } finally {
>        // ALWAYS runs
>        // Cleanup code goes here
>        // Runs after try OR catch
>    }
> ```
>
> "Three blocks, one flow. `try` wraps the risky code. `catch` handles the failure. `finally` runs cleanup regardless of success or failure. `finally` is optional but valuable — it's where you close connections, stop loading spinners, or release resources."

> **Analogy:** "Think of `try/catch/finally` like a safety net at a circus. The trapeze artist (your code) attempts the trick (`try`). If they fall, the net catches them (`catch`) — they don't hit the ground. And regardless of whether the trick succeeded or failed, the crew cleans up the stage (`finally`) for the next act."

---

#### Illustrations / Animations (Presentation) — 63:00–64:00

**Slide: Error Object Anatomy**

> ```
>    catch (error) {
>        error.name      → "TypeError"
>        error.message   → "Cannot read properties of undefined"
>        error.stack     → Full call stack trace (for debugging)
>    }
> ```
>
> "Every error in JavaScript is an object with three key properties. `name` tells you the category. `message` describes what went wrong. `stack` shows you the exact file and line number — your best friend when debugging."

**Slide: Error Flow Visualization**

> ```
>    try {
>        line 1  ✅ runs
>        line 2  ✅ runs
>        line 3  💥 ERROR — jumps to catch
>        line 4  ⏭️ SKIPPED (never runs)
>    } catch (error) {
>        handle error ✅ runs
>    } finally {
>        cleanup ✅ ALWAYS runs
>    }
>
>    next code ✅ continues (program NOT crashed)
> ```
>
> "When an error occurs on line 3, JavaScript immediately jumps to `catch` — lines 4 and beyond in the `try` block are skipped. After `catch` runs, `finally` runs, and then execution continues normally. Without `try/catch`, the error would crash the program at line 3."

---

#### "Let's see in Code now" (VS Code) — 64:00–73:00

```javascript
// ============================================
// Lecture 13 — Part 4: Defensive Error Handling
// Smart Content Analyzer & Validator
// NexusBerry Modern Frontend Course
// ============================================

// --- Error Types Demo ---
console.log("💥 JavaScript Error Types:\n");

// TypeError — the most common production error
try {
    const user = undefined;
    console.log(user.name);  // 💥 Cannot read properties of undefined
} catch (error) {
    console.log(`  TypeError caught: ${error.message}`);
    console.log(`  Error name: ${error.name}`);
}

// ReferenceError — using undeclared variables
try {
    console.log(unknownVariable);  // 💥 unknownVariable is not defined
} catch (error) {
    console.log(`  ReferenceError caught: ${error.message}`);
}

// RangeError — values out of allowed range
try {
    const arr = new Array(-1);  // 💥 Invalid array length
} catch (error) {
    console.log(`  RangeError caught: ${error.message}`);
}

// --- try/catch/finally — The Full Pattern ---
console.log("\n🛡️ try/catch/finally:");

function parseJSON(jsonString) {
    let result = null;
    try {
        console.log(`  Parsing: "${jsonString}"`);
        result = JSON.parse(jsonString);
        console.log(`  ✅ Parsed successfully:`, result);
    } catch (error) {
        console.log(`  ❌ Parse failed: ${error.message}`);
        result = null;  // Explicit fallback
    } finally {
        console.log(`  🔄 Cleanup complete (finally block always runs)`);
    }
    return result;
}

parseJSON('{"name": "Laptop", "price": 89999}');  // ✅ Valid JSON
parseJSON('{"name": broken}');                      // ❌ Invalid JSON
parseJSON('');                                      // ❌ Empty string

// --- The Error Object ---
console.log("\n📋 Error Object Properties:");

try {
    null.toString();
} catch (error) {
    console.log(`  name:    ${error.name}`);     // "TypeError"
    console.log(`  message: ${error.message}`);  // "Cannot read properties of null"
    console.log(`  stack:   ${error.stack.split("\n")[0]}`);  // First line of stack trace
}

// --- throw — Creating Custom Errors ---
console.log("\n🚨 Custom Errors with throw:");

function validateAge(age) {
    if (typeof age !== "number") {
        throw new TypeError(`Age must be a number, got ${typeof age}`);
    }
    if (age < 0 || age > 150) {
        throw new RangeError(`Age must be 0-150, got ${age}`);
    }
    return `✅ Valid age: ${age}`;
}

const testAges = [25, "thirty", -5, 200, 0, 150];
for (const age of testAges) {
    try {
        console.log(`  ${validateAge(age)}`);
    } catch (error) {
        console.log(`  ❌ ${error.name}: ${error.message}`);
    }
}

// --- Defensive Programming — Guard Clauses ---
console.log("\n🛡️ Defensive Programming — Guard Clauses:");

// BAD: Deeply nested validation
function processUserBad(user) {
    if (user) {
        if (user.name) {
            if (user.name.length > 0) {
                return `Processing ${user.name}`;
            }
        }
    }
    return "Invalid user";
}

// GOOD: Guard clauses — fail fast, return early
function processUser(user) {
    if (!user) return "❌ No user provided";
    if (!user.name) return "❌ User has no name";
    if (user.name.trim().length === 0) return "❌ User name is empty";

    // Happy path — only reached if all guards pass
    return `✅ Processing ${user.name}`;
}

console.log(`  ${processUser(null)}`);
console.log(`  ${processUser({})}`);
console.log(`  ${processUser({ name: "   " })}`);
console.log(`  ${processUser({ name: "Rana" })}`);

// --- Input Validation — Combining Regex + Error Handling ---
console.log("\n🔍 Input Validation with Regex + try/catch:");

function validateEmail(email) {
    if (typeof email !== "string") {
        throw new TypeError("Email must be a string");
    }

    const trimmed = email.trim();

    if (trimmed.length === 0) {
        throw new Error("Email cannot be empty");
    }

    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(trimmed)) {
        throw new Error(`Invalid email format: "${trimmed}"`);
    }

    return trimmed.toLowerCase();
}

const emailTests = ["admin@nexusberry.com", "", "not-an-email", 42, "  USER@Gmail.COM  "];
for (const input of emailTests) {
    try {
        const validated = validateEmail(input);
        console.log(`  ✅ Valid: "${validated}"`);
    } catch (error) {
        console.log(`  ❌ ${error.message}`);
    }
}

// --- Fail-Fast Pattern ---
console.log("\n⚡ Fail-Fast Pattern:");

function calculateDiscount(price, discountPercent) {
    // Validate inputs FIRST — before any processing
    if (typeof price !== "number" || isNaN(price)) {
        throw new TypeError(`Price must be a valid number, got: ${price}`);
    }
    if (price < 0) {
        throw new RangeError(`Price cannot be negative: ${price}`);
    }
    if (typeof discountPercent !== "number" || discountPercent < 0 || discountPercent > 100) {
        throw new RangeError(`Discount must be 0-100, got: ${discountPercent}`);
    }

    // Safe to proceed — inputs are validated
    const discount = price * (discountPercent / 100);
    const finalPrice = price - discount;

    return {
        original: price,
        discount: Math.round(discount * 100) / 100,
        final: Math.round(finalPrice * 100) / 100
    };
}

const discountTests = [
    [1000, 20],
    [500, 110],
    [-100, 10],
    ["free", 50]
];

for (const [price, discount] of discountTests) {
    try {
        const result = calculateDiscount(price, discount);
        console.log(`  ✅ Rs. ${result.original} → ${discount}% off → Rs. ${result.final}`);
    } catch (error) {
        console.log(`  ❌ ${error.name}: ${error.message}`);
    }
}

// --- Error Handling Best Practices ---
console.log("\n📌 When to Catch vs When to Propagate:");

// CATCH: When you can handle it meaningfully
function safeParse(json) {
    try {
        return { success: true, data: JSON.parse(json) };
    } catch {
        return { success: false, data: null };
    }
}

// PROPAGATE: When the caller should decide how to handle it
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");  // Don't catch — let caller decide
    return a / b;
}

// The caller handles it based on context
try {
    console.log(`  10 / 2 = ${divide(10, 2)}`);
    console.log(`  10 / 0 = ${divide(10, 0)}`);
} catch (error) {
    console.log(`  ❌ ${error.message} — showing user-friendly message instead`);
}
```

> **Narration while typing:**
> "Notice the difference between 'catch and handle' versus 'throw and propagate.' `safeParse` catches the error because it CAN handle it — return a default value. `divide` throws the error because it SHOULDN'T decide what to do — maybe the caller shows a message, maybe it retries, maybe it logs and continues. The function that knows the context should make the decision."
>
> "Guard clauses eliminate nested `if/else` pyramids. Instead of indenting deeper and deeper, you validate at the top and return early. The happy path — the code that runs when everything is valid — stays at the lowest indentation level. This is how production code reads: checks first, logic second."
>
> "The fail-fast pattern validates ALL inputs before ANY processing. If the price is invalid, don't calculate the discount — throw immediately. This prevents half-processed data, corrupted state, and debugging nightmares."

---

#### Interactive Questions (Presentation/Verbal) — 73:00–76:00

**Question 1 — Predict Output:**

> "What does this code print?"

```javascript
try {
    console.log("A");
    throw new Error("oops");
    console.log("B");
} catch (error) {
    console.log("C");
} finally {
    console.log("D");
}
console.log("E");
```

> **Answer:** `A`, `C`, `D`, `E`. Line "A" prints. The `throw` immediately jumps to `catch` — "B" is skipped. "C" prints in catch. "D" prints in finally (always runs). "E" prints because the error was caught — execution continues normally.
> **Teaching moment:** "Without the `try/catch`, this code would print 'A' and then crash. With it, the error is handled and the program continues. That's the whole point — graceful recovery."

**Question 2 — Concept Challenge:**

> "Should you wrap EVERY line of code in try/catch?"

> **Answer:** No. Only wrap code that can fail for reasons outside your control: user input, JSON parsing, API calls, file operations. Don't wrap `2 + 2` — it can't fail. Don't wrap `array.push(item)` — if the array exists, push always works. Wrap the boundaries — where external data enters your system.
> **Teaching moment:** "Over-catching hides bugs. If you wrap everything in try/catch, you might silently swallow a TypeError that indicates a real bug in your logic. Catch specific, expected failures — let unexpected bugs crash loudly so you can fix them."

**Question 3 — Quick-Fire Recall:**

> "What's the difference between a guard clause and try/catch?"

> **Answer:** Guard clauses prevent errors by checking conditions before they fail — they use `if/return`. try/catch recovers FROM errors after they occur — it wraps code that might throw. Guard clauses are proactive (prevent). try/catch is reactive (recover). Use both: guards for known conditions, try/catch for unpredictable failures.

---

#### Live Debugging (VS Code) — 76:00–77:00

> "Here's a silent error that cost a company money."

```javascript
// Bug: Catching errors but not logging them — silent failures
function processOrder(orderJson) {
    try {
        const order = JSON.parse(orderJson);
        return order.total;
    } catch {
        return 0;  // BUG: Silently returns 0 — bad orders look like $0 orders
    }
}

// This bad JSON returns 0 instead of flagging an error
console.log(processOrder('invalid'));  // 0 — looks like a $0 order, not an error!

// FIX: Always log errors, even when providing a fallback
function processOrderFixed(orderJson) {
    try {
        const order = JSON.parse(orderJson);
        return { success: true, total: order.total };
    } catch (error) {
        console.error(`Order processing failed: ${error.message}`);
        return { success: false, total: 0, error: error.message };
    }
}

const result = processOrderFixed('invalid');
console.log(result);  // { success: false, total: 0, error: "..." }
// Now the caller KNOWS it failed — and can handle it appropriately
```

> "Silent catch blocks are one of the most dangerous patterns in programming. The code 'works' — no crashes, no errors in the console. But the data is wrong. $0 orders slip through, reports are inaccurate, and nobody knows why. Always log or surface errors, even when you provide a fallback value."

---

#### Part Closing (Presentation) — 77:00–78:00

**Common Mistakes:**
- Empty catch blocks — silently swallowing errors hides bugs
- Catching too broadly — wrapping 100 lines in one try/catch makes it impossible to know which line failed
- Using `throw "error message"` instead of `throw new Error("message")` — string throws lack stack traces
- Not using `finally` for cleanup — leads to resource leaks (open connections, stuck loading spinners)

**Optimization Tips:**
- Keep `try` blocks small — wrap only the code that can actually fail
- Return structured results `{ success, data, error }` instead of mixed return types
- Use specific error types: `TypeError` for type issues, `RangeError` for bounds, `Error` for general
- `finally` is ideal for: hiding loading spinners, closing database connections, resetting state

**Best Practices:**
- Guard clauses for predictable conditions (null checks, type checks, range checks)
- try/catch for unpredictable failures (JSON parsing, API calls, user input)
- Never catch and ignore — always log, return a status, or re-throw
- Validate at system boundaries — where external data enters your functions

**Professional Insights:**
> "In 25 years of building production systems, the most expensive bugs I've seen weren't crashes — they were silent failures. Code that caught errors, returned default values, and kept running. The system 'worked' but produced wrong results. Financial reports off by millions, user data silently lost, orders processed incorrectly. A crash is annoying. Silent corruption is catastrophic. When you catch an error, make sure someone knows about it."

---

### Part 5: Smart Content Analyzer — Capstone + TypeScript String Types (78:00 – 86:00)

---

#### Background / Motivation (Presentation) — 78:00–79:00

> **Talking Points:**
> "Let's combine everything — string methods, regex, and error handling — into the Smart Content Analyzer. This tool takes raw text and produces a complete analysis: word count, sentence count, readability metrics, and input validation."
>
> "We'll also preview TypeScript's string-specific type features — template literal types and string union narrowing — that make your validators even more robust."

---

#### Illustrations / Animations (Presentation) — 79:00–79:30

**Slide: Content Analyzer Architecture**

> ```
> ┌──────────────┐
> │   Raw Text   │ (user input, API data, form content)
> └──────┬───────┘
>        ▼
> ┌──────────────┐
> │  Validation  │ Guard clauses + try/catch
> └──────┬───────┘
>        ▼
> ┌──────────────┐
> │  Processing  │ String methods + regex
> └──────┬───────┘
>        ▼
> ┌──────────────┐
> │   Analysis   │ Word count, readability, patterns
> └──────┬───────┘
>        ▼
> ┌──────────────┐
> │   Report     │ Formatted output
> └──────────────┘
> ```

---

#### "Let's see in Code now" (VS Code) — 79:30–84:00

```javascript
// ============================================
// Lecture 13 — Part 5: Smart Content Analyzer (Capstone)
// Combining Strings, Regex & Error Handling
// NexusBerry Modern Frontend Course
// ============================================

// --- Content Analyzer Function ---
function analyzeContent(text) {
    // Guard clauses — validate input
    if (typeof text !== "string") {
        throw new TypeError(`Expected string, got ${typeof text}`);
    }

    const trimmed = text.trim();

    if (trimmed.length === 0) {
        throw new Error("Content cannot be empty");
    }

    // --- Basic Statistics ---
    const charCount = trimmed.length;
    const charNoSpaces = trimmed.replace(/\s/g, "").length;
    const words = trimmed.split(/\s+/);
    const wordCount = words.length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // --- Readability ---
    const avgWordLength = charNoSpaces / wordCount;
    const avgSentenceLength = wordCount / sentenceCount;

    let readabilityLevel;
    if (avgSentenceLength <= 10) readabilityLevel = "🟢 Easy";
    else if (avgSentenceLength <= 20) readabilityLevel = "🟡 Moderate";
    else readabilityLevel = "🔴 Complex";

    // --- Pattern Detection ---
    const emails = trimmed.match(/[\w.-]+@[\w.-]+\.\w{2,}/g) || [];
    const urls = trimmed.match(/https?:\/\/[\w.-]+(\/[\w./-]*)?/g) || [];
    const numbers = trimmed.match(/\b\d+\.?\d*\b/g) || [];

    // --- Word Frequency (top 5) ---
    const wordFreq = {};
    const cleanWords = trimmed.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    for (const word of cleanWords) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
    const topWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // --- Longest & Shortest Words ---
    const uniqueWords = [...new Set(words.map(w => w.replace(/[^a-zA-Z]/g, "").toLowerCase()))].filter(w => w.length > 0);
    const longestWord = uniqueWords.reduce((a, b) => a.length >= b.length ? a : b, "");
    const shortestWord = uniqueWords.reduce((a, b) => a.length <= b.length ? a : b, uniqueWords[0] || "");

    return {
        charCount,
        charNoSpaces,
        wordCount,
        sentenceCount,
        paragraphCount,
        avgWordLength: Math.round(avgWordLength * 10) / 10,
        avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
        readabilityLevel,
        emails,
        urls,
        numbers,
        topWords,
        longestWord,
        shortestWord
    };
}

// --- Report Generator ---
function generateReport(analysis) {
    const divider = "═".repeat(50);

    return `
${divider}
   📊 SMART CONTENT ANALYZER — REPORT
${divider}

📏 Basic Statistics:
   Characters (with spaces):    ${analysis.charCount}
   Characters (without spaces): ${analysis.charNoSpaces}
   Words:                        ${analysis.wordCount}
   Sentences:                    ${analysis.sentenceCount}
   Paragraphs:                   ${analysis.paragraphCount}

📖 Readability:
   Avg word length:     ${analysis.avgWordLength} characters
   Avg sentence length: ${analysis.avgSentenceLength} words
   Reading level:       ${analysis.readabilityLevel}

🔤 Word Analysis:
   Longest word:  "${analysis.longestWord}"
   Shortest word: "${analysis.shortestWord}"
   Top words: ${analysis.topWords.map(([w, c]) => `${w} (${c})`).join(", ")}

🔍 Detected Patterns:
   Emails: ${analysis.emails.length > 0 ? analysis.emails.join(", ") : "None found"}
   URLs:   ${analysis.urls.length > 0 ? analysis.urls.join(", ") : "None found"}
   Numbers: ${analysis.numbers.length > 0 ? analysis.numbers.join(", ") : "None found"}

${divider}`;
}

// --- Test with Real Content ---
const sampleText = `
NexusBerry Training and Solutions offers the best programming courses in Lahore.
Our Modern Frontend course covers 36 lectures over 3 months. Students learn HTML, CSS, JavaScript, TypeScript, React, and Next.js.

Contact us at admin@nexusberry.com or visit https://www.nexusberry.com for details.
Phone: 0328-4500073. We have trained over 500 students since 2020.

Our instructors have 25 years of production experience. Join the next batch starting soon!
`;

try {
    const analysis = analyzeContent(sampleText);
    console.log(generateReport(analysis));
} catch (error) {
    console.log(`❌ Analysis failed: ${error.message}`);
}

// --- Test Error Handling ---
console.log("\n🧪 Error Handling Tests:");

const errorTests = [null, "", 42, "   "];
for (const input of errorTests) {
    try {
        analyzeContent(input);
        console.log(`  ✅ "${input}" — analyzed`);
    } catch (error) {
        console.log(`  ❌ ${error.name}: ${error.message}`);
    }
}

// --- TypeScript String Utilities Preview ---
console.log("\n📘 TypeScript String Types (Preview):");
console.log("  Template literal types create precise string patterns:");
console.log('  type Color = "red" | "green" | "blue";');
console.log('  type Size = "sm" | "md" | "lg";');
console.log('  type CSSClass = `${Size}-${Color}`;');
console.log('  // "sm-red" | "sm-green" | "sm-blue" | "md-red" | ... (9 combinations)');
console.log("");
console.log("  String union narrowing with switch:");
console.log('  function handle(status: "loading" | "success" | "error") {');
console.log('    switch (status) {');
console.log('      case "loading": return "⏳";');
console.log('      case "success": return "✅";');
console.log('      case "error": return "❌";');
console.log("    }  // TypeScript ensures all cases covered");
console.log("  }");
```

> **Narration while typing:**
> "Look at how the three topics converge. The `analyzeContent` function starts with guard clauses — defensive programming. It processes text with string methods — `split`, `replace`, `trim`. It extracts patterns with regex — emails, URLs, numbers. And the whole thing is wrapped in try/catch at the call site."
>
> "The word frequency analysis uses a pattern you learned in Lecture 10 — accumulating into an object inside a loop. But now we extract words using regex (`/\b[a-z]{3,}\b/g`) instead of a simple `split`. Regex gives us cleaner tokens — only words of 3+ characters, no punctuation."
>
> "The TypeScript preview shows template literal types — a powerful feature where TypeScript generates string combinations automatically. `type CSSClass = \`${Size}-${Color}\`` creates all 9 valid combinations. If you try to use `'xl-purple'`, TypeScript flags it at compile time. We'll use this extensively in React for component prop types."

---

#### Interactive Questions (Presentation/Verbal) — 84:00–85:30

**Question 1 — Concept Challenge:**

> "In the `analyzeContent` function, why do we use guard clauses instead of wrapping everything in try/catch?"

> **Answer:** Guard clauses handle EXPECTED invalid input — null, empty strings, wrong types. These aren't "errors" — they're predictable conditions. try/catch is for UNEXPECTED failures — like a regex that somehow fails on valid input. Guard clauses are cheaper (no exception overhead), clearer (explicit conditions), and don't mask real bugs.
> **Teaching moment:** "If you wrap guard conditions in try/catch, you're using exception handling for flow control — that's an anti-pattern. Exceptions should be exceptional. Predictable validation should use `if/return`."

**Question 2 — Predict Output:**

> "What does this regex extract?"

```javascript
const text = "Call 0300-1234567 or email support@example.com today!";
const words = text.match(/\b[a-z]{3,}\b/g);
console.log(words);
```

> **Answer:** `["all", "email", "support", "example", "com", "today"]`. The regex matches sequences of 3+ lowercase letters bounded by word boundaries. "Call" doesn't match because of the uppercase C (no `i` flag). Numbers and punctuation are excluded.
> **Teaching moment:** "Regex extraction gives you surgical precision. By specifying `[a-z]{3,}`, we filter out short words like 'or', numbers, and punctuation in one operation. Add the `i` flag to include capitalized words."

---

#### Part Closing (Presentation) — 85:30–86:00

**Common Mistakes:**
- Not guarding for `null` and `undefined` before calling string methods — instant TypeError
- Using `split(" ")` for word counting — double spaces create empty strings in the result
- Forgetting `|| []` after `match()` with regex — `null.length` crashes
- Returning inconsistent types — sometimes a string, sometimes null, sometimes undefined

**Best Practices:**
- Use `split(/\s+/)` instead of `split(" ")` for word splitting — handles multiple spaces, tabs, newlines
- Use `filter(s => s.trim().length > 0)` after split to remove empty entries
- Return structured objects `{ success, data, error }` from functions that can fail
- Combine guard clauses + try/catch: guards for known conditions, try/catch for the unexpected

**Professional Insights:**
> "The content analyzer you built today is a miniature version of tools used by every CMS, email platform, and document editor. WordPress counts words. Gmail checks email format. Google Docs analyzes readability. The patterns — string processing, regex extraction, defensive validation — are identical at scale. You've built the foundation."

---

### Lecture Ending (86:00 – 90:00)

---

#### Cheat Sheet Slides (Presentation) — 86:00–87:30

> "Let me walk you through the key reference points from today — these are in your cheatsheet file."

**Slide: String Methods Quick Reference**
- **Search:** `indexOf`, `includes`, `startsWith`, `endsWith`
- **Transform:** `toUpperCase`, `toLowerCase`, `trim`, `replace`, `replaceAll`
- **Extract:** `slice`, `split`, `at`
- **Format:** `padStart`, `padEnd`, `repeat`
- **Remember:** All methods return new strings — originals are immutable

**Slide: Regex Essentials**
- **Character classes:** `\d` (digit), `\w` (word), `\s` (space), `.` (any)
- **Quantifiers:** `*` (0+), `+` (1+), `?` (0-1), `{n}` (exact), `{n,m}` (range)
- **Anchors:** `^` (start), `$` (end), `\b` (word boundary)
- **Flags:** `g` (global), `i` (case-insensitive), `m` (multiline)
- **Methods:** `test()` → boolean, `match()` → array/null, `replace()` → new string

**Slide: Error Handling Patterns**
- **Guard clauses:** `if (!input) return` — fail fast, return early
- **try/catch/finally:** Wrap risky code, handle failures, always cleanup
- **throw:** Create custom errors with `throw new Error("message")`
- **Rule:** Catch specific, log always, never silently swallow

**Slide: TypeScript String Types**
- Template literal types: `` type Route = `/${string}` ``
- String unions: `type Status = "loading" | "success" | "error"`
- Exhaustive switch: TypeScript enforces all union cases are handled

> "The full cheat sheet is shared after class. It covers every string method, the regex cheat sheet, and the error handling patterns."

---

#### Assignment Introduction (Presentation) — 87:30–89:00

> "Your assignment for this lecture: build a complete Smart Content Analyzer & Validator."

**Assignment: Smart Content Analyzer & Validator (Lecture 13)**

Requirements:
1. Create a `validateInput()` function using guard clauses — check for null, non-string types, empty strings, and strings below minimum length (20 characters)
2. Create an `analyzeText()` function that returns: character count (with/without spaces), word count, sentence count, average word length, and average sentence length
3. Use at least 6 string methods from today's lecture: `trim`, `split`, `includes`, `slice`, `replace/replaceAll`, `toLowerCase/toUpperCase`
4. Create 4 regex validation functions: email validator, phone number validator (Pakistan format), password strength checker, and URL validator — each with clear pass/fail output
5. Use capturing groups to extract parts from a date string (`"2024-01-15"` → year, month, day)
6. Use `match()` with the `g` flag to extract all emails, phone numbers, and URLs from a block of text
7. Implement try/catch/finally in at least 2 functions — including JSON parsing with error recovery
8. Use `throw` to create at least 2 custom errors with appropriate error types (`TypeError`, `RangeError`, or `Error`)
9. Implement the guard clause pattern (fail-fast, early returns) in at least 2 functions
10. Generate a formatted report (using template literals and `padStart`/`padEnd`) showing all analysis results

> "Submit via Google Classroom by the next session. The grading criteria are in the `assignment.md` file."

---

#### Q&A — 89:00–89:30

> "Any questions before we close? Today covered a lot of ground — string methods, regular expressions, and error handling. These are three of the most practical topics in all of JavaScript. If anything feels unclear, the cheatsheet, recording, and code files will help."

*Common questions to anticipate:*
- "Do I need to memorize all string methods?" → No — memorize the categories (search, transform, extract). Then look up the specific method when you need it. Over time, `includes`, `trim`, `split`, `replace`, and `slice` become automatic.
- "How do I learn to write complex regex?" → Start small. Use regex101.com — it explains every part. Build patterns piece by piece. The patterns from today's lecture cover 90% of real-world needs.
- "Should I use try/catch everywhere?" → Only around code that can fail unpredictably — JSON parsing, API calls, user input processing. For known conditions, use guard clauses. Over-catching hides bugs.
- "What about TypeScript string types — will we use them?" → Yes, extensively in React. Component prop types often use string unions (`"small" | "medium" | "large"`) and template literal types for CSS classes. Today was the preview — React is the main event.

---

#### Next Lecture Teaser — 89:30–90:00

> *Show the "Next Lecture" closing slide.*
>
> "In Lecture 14, we enter the world of **Asynchronous JavaScript** — and the project is the **Weather Dashboard & API Explorer**. You'll learn why JavaScript is single-threaded, how the event loop works, and the evolution from callback hell through Promises to the clean `async/await` syntax."
>
> "Here's why today's error handling matters: every `fetch()` call to an API can fail — network errors, server errors, invalid responses. Without `try/catch`, one failed API call crashes your entire app. With it, you show a friendly error message and let the user retry. The `try/catch` you learned today is the foundation of every async operation you'll write from Lecture 14 onward. See you in Lecture 14."

---

## Phase 2: Share After Lecture

- [ ] Upload video recording to Google Classroom
- [ ] Push `code/` folder (with `analyzer.js`) to course repo
- [ ] Post `assignment.md` to Google Classroom
- [ ] Share `presentation/` folder (HTML export or direct link)
- [ ] Post `cheatsheet.md` to Google Classroom
- [ ] Upload `quiz.md` to online portal — students should attempt before Lecture 14

---

## Interactive Questions Summary

| Part | Type | Topic | Purpose |
|------|------|-------|---------|
| Part 1 | Predict Output | `slice(6)` and `slice(-5)` on "Hello World" | Teach positive and negative slice indexing |
| Part 1 | Spot the Error | `trim()` without capturing return value | Reinforce string immutability — must capture result |
| Part 1 | Quick-Fire Recall | `includes()` vs `indexOf()` difference | Boolean vs position — different return types for different needs |
| Part 2 | Predict Output | `match(/\d+/g)` on mixed string | Understand `\d+` and global flag behavior |
| Part 2 | Concept Challenge | `\d` vs `[0-9]` difference | Functionally identical but Unicode edge case awareness |
| Part 2 | Spot the Error | Regex `/\d+/` without anchors for validation | Anchors `^$` required for full-string validation |
| Part 3 | Hidden Fact Reveal | `match()` returns `null` not `[]` on no match | Guard with `\|\| []` to prevent crashes on chaining |
| Part 3 | Predict Output | Password uppercase check on all-lowercase string | Independent regex checks give granular feedback |
| Part 4 | Predict Output | try/throw/catch/finally execution order | Understand skip behavior after throw, finally always runs |
| Part 4 | Concept Challenge | Should you wrap everything in try/catch? | Catch specific failures — over-catching hides bugs |
| Part 4 | Quick-Fire Recall | Guard clause vs try/catch | Proactive prevention vs reactive recovery |
| Part 5 | Concept Challenge | Guard clauses vs try/catch for validation | Expected conditions vs unexpected failures |
| Part 5 | Predict Output | Regex `\b[a-z]{3,}\b` extraction | Surgical word extraction — case-sensitive, length-filtered |

---

## Teaching Tips Summary

| Moment | Tip Type | Purpose |
|--------|----------|---------|
| Opening — strings as printed paper analogy | Analogy | Immutability concept before any code |
| String methods categories table | Classification | Search / Transform / Extract — organized recall |
| `trim()` without capture bug | Bug demo | Most common string mistake — visceral before theoretical |
| Regex combination lock analogy | Analogy | Pattern matching = shape matching, not exact matching |
| Regex anatomy visual breakdown | Diagram | Every symbol explained positionally |
| Zip code validation without anchors | Bug demo | Anchors are validation's most forgotten element |
| Password strength with multiple patterns | Design pattern | Small focused regex > one monster regex |
| Circus safety net analogy for try/catch | Analogy | Error recovery concept before syntax |
| Guard clauses vs nested if/else | Refactoring | Clean code pattern — fail fast, reduce nesting |
| Silent catch block danger | Bug demo | Most expensive production bugs are silent, not loud |
| Content Analyzer capstone | All patterns combined | Proves strings + regex + error handling work together |
| TypeScript template literal types | React preparation | Plant seed for component prop types in Module 3 |
| L14 teaser connecting try/catch to async | Anticipation building | Today's error handling enables tomorrow's async code |

---

## Emergency Recovery

| Problem | Solution |
|---------|----------|
| reveal.js CDN fails | Open presentation as local file. Fall back to VS Code full-screen + verbal explanation. |
| VS Code terminal not working | Use Chrome DevTools Console tab — paste code there and run it live. |
| Regex101.com not loading | Use Chrome DevTools Console for regex testing. Type regex patterns directly and show results. |
| TypeScript Playground not loading | Skip Part 5 TS live demo — use slides only. TypeScript is a preview, not a requirement today. |
| Student overwhelmed by regex | Reassure: "Nobody memorizes regex. You learn the building blocks and use regex101.com for testing. With practice, the common patterns become automatic." |
| Running behind schedule | Compress Part 3 practical patterns to 2 validators instead of 4. Shorten Part 5 capstone to verbal walkthrough with pre-typed code. Skip TypeScript preview to slides only. |
| Running ahead of schedule | Extend Part 3 — let students suggest validation patterns and build them live. Add bonus: named capturing groups `/(?<year>\d{4})/`. |
| Student asks about async error handling | "That's exactly what Lecture 14 covers — `try/catch` with `async/await`. Today we build the foundation, next time we apply it to API calls and network requests." |

---

## Conversion Phrases (Sprinkle Throughout)

- *"This is what separates a bootcamp from a professional course — we're not just teaching regex syntax, we're teaching you when to use regex, when not to, and how to debug it when it doesn't work."*
- *"In 25 years of production code, the bugs I've seen most often with strings are: forgetting to trim, case-sensitive comparisons on case-insensitive data, and replace only replacing the first occurrence. Three methods — `trim()`, `toLowerCase()`, `replaceAll()` — prevent thousands of support tickets."*
- *"Every form on every website you've ever used has validation behind it. The email check, the password strength meter, the phone number formatter — all built with the exact regex patterns you learned today."*
- *"Error handling isn't about preventing mistakes — it's about surviving them gracefully. The difference between a junior and senior developer isn't that seniors write bug-free code. It's that senior code fails gracefully instead of catastrophically."*
- *"When you join a development team, your code reviews will check three things first: input validation, error handling, and edge cases. Master these and you'll pass code reviews that reject 80% of junior submissions."*

---

## Never Say

- "This is easy/simple" → Say "foundational"
- "You should know this" → Say "Let me show you"
- "Obviously..." → Just explain it
- "Everyone knows..." → Not everyone does — that's why they're here
- "Regex is hard" → Say "Regex has a learning curve, but the building blocks are systematic"
- "Just memorize the patterns" → Say "Understand the building blocks, then combine them"
- "You'll never use this" → Every topic today is used daily in production

---
