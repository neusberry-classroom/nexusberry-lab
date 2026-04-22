# String Processing, Pattern Matching & Defensive Error Handling Cheatsheet
<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

Quick reference for all string methods, regex patterns, and error handling techniques covered in Lecture 13.

---

## String Fundamentals — Immutability & Character Access

Strings are **immutable** — every method returns a NEW string. The original is never modified.

```javascript
const title = "Smart Content Analyzer";

// Length
console.log(title.length);           // 22

// Character access (zero-based, like arrays)
console.log(title.charAt(0));        // "S"
console.log(title[6]);               // "C"
console.log(title.at(-1));           // "r"  (negative = from end)
console.log(title[title.length - 1]); // "r" (old way)
```

**Key fact:** Always use string primitives (`"hello"`), never `new String("hello")`.

> **Pro Tip:** `at(-1)` is cleaner than `str[str.length - 1]` for accessing the last character. It was added in ES2022 and works on both strings and arrays.

---

## Searching Strings

```javascript
const article = "JavaScript is versatile. JavaScript powers the web.";

// indexOf / lastIndexOf — returns position (-1 if not found)
article.indexOf("JavaScript");       // 0
article.lastIndexOf("JavaScript");   // 24
article.indexOf("Python");           // -1 (not found)

// includes — returns boolean
article.includes("versatile");       // true

// startsWith / endsWith — returns boolean
article.startsWith("JavaScript");    // true
article.endsWith("web.");            // true
```

| Method | Returns | Use When |
|--------|---------|----------|
| `indexOf()` | Position (`-1` if missing) | You need the location |
| `includes()` | `true` / `false` | You just need yes/no |
| `startsWith()` | `true` / `false` | Checking prefix |
| `endsWith()` | `true` / `false` | Checking suffix |

> **Pro Tip:** Use `includes()` for boolean checks — it's clearer than `indexOf() !== -1`.

---

## Extracting Substrings — `slice`

```javascript
const url = "https://www.nexusberry.com/courses/react";

url.slice(8, 27);    // "www.nexusberry.com"  (start, end)
url.slice(-5);        // "react"               (negative = from end)
url.substring(8, 27); // "www.nexusberry.com"  (same — but no negative support)
```

| Method | Negative Indices | Recommendation |
|--------|-----------------|----------------|
| `slice()` | Yes | **Always use this** |
| `substring()` | No | Avoid — less predictable |

---

## Transforming Strings

```javascript
const userInput = "   John DOE   ";

// Trimming whitespace
userInput.trim();        // "John DOE"
userInput.trimStart();   // "John DOE   "
userInput.trimEnd();     // "   John DOE"

// Case conversion
"Hello".toLowerCase();   // "hello"
"Hello".toUpperCase();   // "HELLO"

// Replacing content
"I love cats".replace("cats", "dogs");      // "I love dogs" (first only!)
"cats cats cats".replaceAll("cats", "dogs"); // "dogs dogs dogs" (all)
// For case-insensitive replace-all, use regex: str.replace(/cats/gi, "dogs")
```

> **Pro Tip:** Always `trim()` user input before processing. Invisible whitespace breaks comparisons, searches, and database lookups.

---

## Split & Join — String ↔ Array Bridge

```javascript
// split — string to array
"Laptop,Mouse,Keyboard".split(",");    // ["Laptop", "Mouse", "Keyboard"]
"Hello world".split(" ");              // ["Hello", "world"]

// join — array to string
["Laptop", "Mouse"].join(" | ");       // "Laptop | Mouse"

// Word count pattern
const wordCount = text.split(/\s+/).length;

// Parse & rebuild
const csv = "a,b,c";
const items = csv.split(",");  // ["a", "b", "c"]
items.join(" - ");             // "a - b - c"
```

> **Pro Tip:** Use `split(/\s+/)` instead of `split(" ")` for word splitting — it handles multiple spaces, tabs, and newlines correctly.

---

## Template Literals

```javascript
const product = { name: "Laptop", price: 89999, stock: 15 };

// Expression interpolation
console.log(`${product.name}: Rs. ${product.price.toLocaleString()}`);

// Multiline strings
const report = `
  Name:  ${product.name}
  Price: Rs. ${product.price.toLocaleString()}
  Status: ${product.stock > 0 ? "In Stock" : "Out of Stock"}
`;

// Nested template literals
const items = ["HTML", "CSS", "JS"];
console.log(`Skills: ${items.map(s => `[${s}]`).join(" ")}`);
// "Skills: [HTML] [CSS] [JS]"
```

---

## Padding & Repeating

```javascript
// padStart — pad from the left (great for numbers)
"5".padStart(3, "0");      // "005"
"42".padStart(3, "0");     // "042"

// padEnd — pad from the right
"Hi".padEnd(10, ".");      // "Hi........"

// repeat — repeat a string N times
"─".repeat(30);            // 30 dashes (great for separators)

// Real-world: invoice numbers
const invoiceNum = String(42).padStart(6, "0");
console.log(`INV-${invoiceNum}`);  // "INV-000042"
```

---

## Regular Expressions — Creating & Testing

```javascript
// Two ways to create regex
const literal = /hello/i;              // Literal — fixed patterns
const dynamic = new RegExp("hello", "i"); // Constructor — dynamic patterns

// test() — returns boolean (fastest for validation)
/\d/.test("abc123");     // true — contains a digit
/\d/.test("abcdef");     // false

// search() — returns index of first match
"abc123".search(/\d/);   // 3

// match() — returns matches
"a1b2c3".match(/\d/g);   // ["1", "2", "3"] (with g flag)
"abc".match(/\d/g);       // null (NOT empty array!)
```

> **Pro Tip:** `match()` returns `null` when no matches are found — not an empty array. Always guard with `|| []` when chaining: `str.match(/pattern/g) || []`

---

## Regex Character Classes

```
\d  →  [0-9]           Any digit
\D  →  [^0-9]          Any NON-digit
\w  →  [a-zA-Z0-9_]    Any word character
\W  →  [^a-zA-Z0-9_]   Any NON-word character
\s  →  [ \t\n\r]       Any whitespace
\S  →  [^ \t\n\r]      Any NON-whitespace
.   →  Any character (except newline)
```

**Rule:** Uppercase = negation. `\d` matches digits, `\D` matches everything that ISN'T a digit.

---

## Regex Quantifiers

| Quantifier | Meaning | Example |
|-----------|---------|---------|
| `*` | 0 or more | `/\d*/` — zero or more digits |
| `+` | 1 or more | `/\d+/` — one or more digits |
| `?` | 0 or 1 (optional) | `/colou?r/` — matches "color" and "colour" |
| `{n}` | Exactly n | `/\d{3}/` — exactly 3 digits |
| `{n,m}` | Between n and m | `/\d{2,4}/` — 2 to 4 digits |
| `{n,}` | n or more | `/\d{2,}/` — 2+ digits |

---

## Regex Anchors & Boundaries

```javascript
const text = "cat catalog scattered";

/cat/g.test(text);       // Matches "cat" everywhere (3 matches)
/^cat/.test(text);       // Matches "cat" only at start
/\bcat\b/g;              // Matches "cat" as whole word only (not in "catalog")
```

| Anchor | Meaning |
|--------|---------|
| `^` | Start of string |
| `$` | End of string |
| `\b` | Word boundary |

> **Pro Tip:** ALWAYS use `^` and `$` in validation regex. `/\d{5}/` means "contains 5 digits somewhere." `/^\d{5}$/` means "is EXACTLY 5 digits."

---

## Regex Groups & Flags

```javascript
// Capturing groups — extract parts of a match
const dateStr = "2024-01-15";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
// dateMatch[0] = "2024-01-15" (full match)
// dateMatch[1] = "2024" (year)
// dateMatch[2] = "01"   (month)
// dateMatch[3] = "15"   (day)

// Alternation — OR
"I have a cat and a dog".match(/(cat|dog)/g);  // ["cat", "dog"]

// replace with regex (global + case-insensitive)
"Cats CATS cats".replace(/cats/gi, "dogs");  // "dogs dogs dogs"
```

| Flag | Meaning |
|------|---------|
| `g` | Global — find ALL matches |
| `i` | Case-insensitive |
| `m` | Multiline (`^`/`$` match line starts/ends) |

---

## Practical Regex Patterns

```javascript
// Email validation
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
emailRegex.test("user@example.com");     // true
emailRegex.test("invalid@");             // false

// Pakistan phone number
const phoneRegex = /^(\+92|0)\d{3}-?\d{7}$/;
phoneRegex.test("0300-1234567");         // true
phoneRegex.test("+923001234567");        // true

// Password strength (individual checks)
password.length >= 8;           // Length check
/[A-Z]/.test(password);        // Has uppercase
/[a-z]/.test(password);        // Has lowercase
/\d/.test(password);           // Has digit
/[!@#$%^&*]/.test(password);  // Has special character

// URL validation
const urlRegex = /^https?:\/\/[\w.-]+(:\d+)?(\/[\w./\-?&#=]*)?$/;
urlRegex.test("https://www.nexusberry.com");  // true

// Data extraction from text
const text = "Email admin@nexusberry.com or call 0328-4500073";
text.match(/[\w.-]+@[\w.-]+\.\w{2,}/g);   // ["admin@nexusberry.com"]
text.match(/\d{3,4}-\d{7,8}/g);            // ["0328-4500073"]
```

> **Pro Tip:** Break complex validation into multiple simple patterns (like the password checker) instead of one massive regex. It's more readable AND lets you give specific feedback to the user.

---

## JavaScript Error Types

| Error Type | When It Happens | Example |
|-----------|----------------|---------|
| `SyntaxError` | Invalid code structure | `if (true {` |
| `TypeError` | Wrong type operation | `null.toString()` |
| `ReferenceError` | Undefined variable | `console.log(x)` |
| `RangeError` | Value out of range | `new Array(-1)` |

`TypeError` is the most common in production — "Cannot read properties of undefined."

---

## try / catch / finally

```javascript
function parseJSON(jsonString) {
    let result = null;
    try {
        result = JSON.parse(jsonString);
        console.log("✅ Parsed:", result);
    } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        result = null;
    } finally {
        console.log("🔄 Cleanup (always runs)");
    }
    return result;
}

parseJSON('{"name": "Laptop"}');  // ✅ Works
parseJSON('invalid');              // ❌ Caught, program continues
```

**Flow:**
- `try` — wraps risky code
- `catch` — runs ONLY if try throws an error
- `finally` — ALWAYS runs (cleanup: close connections, hide spinners)

**The Error object:**
```javascript
catch (error) {
    error.name;     // "TypeError"
    error.message;  // "Cannot read properties of undefined"
    error.stack;    // Full stack trace (for debugging)
}
```

---

## throw — Custom Errors

```javascript
function validateAge(age) {
    if (typeof age !== "number") {
        throw new TypeError(`Age must be a number, got ${typeof age}`);
    }
    if (age < 0 || age > 150) {
        throw new RangeError(`Age must be 0-150, got ${age}`);
    }
    return `✅ Valid age: ${age}`;
}

try {
    validateAge("thirty");  // ❌ TypeError
} catch (error) {
    console.log(`${error.name}: ${error.message}`);
}
```

Use specific error types: `TypeError` for type issues, `RangeError` for bounds, `Error` for general.

---

## Guard Clauses — Fail Fast, Return Early

```javascript
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

// GOOD: Guard clauses — flat and readable
function processUser(user) {
    if (!user) return "❌ No user provided";
    if (!user.name) return "❌ User has no name";
    if (user.name.trim().length === 0) return "❌ Name is empty";

    // Happy path — only reached if all guards pass
    return `✅ Processing ${user.name}`;
}
```

**Principle:** Validate at the top, return early on failure. The happy path stays at the lowest indentation level.

> **Pro Tip:** Use guard clauses for EXPECTED conditions (null, empty, wrong type). Use try/catch for UNEXPECTED failures (JSON parsing, API calls). Guards are proactive; try/catch is reactive.

---

## Combining Regex + Error Handling

```javascript
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

try {
    const email = validateEmail("  USER@Gmail.COM  ");
    console.log(`✅ Valid: "${email}"`);  // "user@gmail.com"
} catch (error) {
    console.log(`❌ ${error.message}`);
}
```

---

## TypeScript String Types (Preview)

```typescript
// String union types — restrict values
type Status = "loading" | "success" | "error";

// Template literal types — generate combinations
type Color = "red" | "green" | "blue";
type Size = "sm" | "md" | "lg";
type CSSClass = `${Size}-${Color}`;
// "sm-red" | "sm-green" | "sm-blue" | "md-red" | ... (9 combinations)

// Exhaustive switch — TypeScript enforces all cases
function handle(status: Status) {
    switch (status) {
        case "loading": return "⏳";
        case "success": return "✅";
        case "error":   return "❌";
    }
}
```

---

## Common Mistakes to Avoid

**1. Calling string methods without capturing the result:**
```javascript
// ❌ WRONG — trim() returns a new string, doesn't modify original
const input = "  Hello  ";
input.trim();
console.log(input);  // "  Hello  " — unchanged!

// ✅ CORRECT — capture the return value
const cleaned = input.trim();
console.log(cleaned);  // "Hello"
```

**2. Case-sensitive comparison on user input:**
```javascript
// ❌ WRONG — "Gmail.COM" !== "gmail.com"
const domain = email.split("@")[1];
if (domain === "gmail.com") { /* never matches */ }

// ✅ CORRECT — normalize both sides
if (domain.toLowerCase() === "gmail.com") { /* works */ }
```

**3. Regex validation without anchors:**
```javascript
// ❌ WRONG — accepts "abc12345xyz" (5 digits found inside)
/\d{5}/.test("abc12345xyz");   // true!

// ✅ CORRECT — requires EXACTLY 5 digits
/^\d{5}$/.test("abc12345xyz"); // false
```

**4. Unescaped dot in regex:**
```javascript
// ❌ WRONG — dot matches ANY character
/example.com/.test("exampleXcom");  // true!

// ✅ CORRECT — escaped dot matches literal period
/example\.com/.test("exampleXcom"); // false
```

**5. Using `replace()` expecting all matches:**
```javascript
// ❌ WRONG — replace() only replaces first occurrence
"cats cats cats".replace("cats", "dogs");  // "dogs cats cats"

// ✅ CORRECT — use replaceAll() or regex with /g
"cats cats cats".replaceAll("cats", "dogs");      // "dogs dogs dogs"
"cats cats cats".replace(/cats/g, "dogs");         // "dogs dogs dogs"
```

**6. Silent catch blocks:**
```javascript
// ❌ WRONG — error silently swallowed
try { riskyOperation(); } catch { return 0; }

// ✅ CORRECT — always log or surface errors
try {
    riskyOperation();
} catch (error) {
    console.error(`Failed: ${error.message}`);
    return { success: false, error: error.message };
}
```

---

## VS Code Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Find & Replace | `Ctrl + H` | `Cmd + H` |
| Find with Regex | `Ctrl + H` → click `.*` button | `Cmd + H` → click `.*` |
| Toggle line comment | `Ctrl + /` | `Cmd + /` |
| Select all occurrences | `Ctrl + Shift + L` | `Cmd + Shift + L` |
| Multi-cursor select | `Alt + Click` | `Option + Click` |
| Duplicate line | `Shift + Alt + ↓` | `Shift + Option + ↓` |
| Move line up/down | `Alt + ↑/↓` | `Option + ↑/↓` |

---

## Quick Reference Table

### String Methods at a Glance

| Category | Method | Returns | Purpose |
|----------|--------|---------|---------|
| **Search** | `indexOf(str)` | Number (-1 if missing) | Find position |
| | `lastIndexOf(str)` | Number | Find last position |
| | `includes(str)` | Boolean | Existence check |
| | `startsWith(str)` | Boolean | Prefix check |
| | `endsWith(str)` | Boolean | Suffix check |
| **Transform** | `toUpperCase()` | New string | ALL CAPS |
| | `toLowerCase()` | New string | all lowercase |
| | `trim()` | New string | Remove whitespace (both ends) |
| | `trimStart()` | New string | Remove leading whitespace |
| | `trimEnd()` | New string | Remove trailing whitespace |
| | `replace(a, b)` | New string | Replace first match |
| | `replaceAll(a, b)` | New string | Replace all matches |
| | `padStart(n, ch)` | New string | Pad from left |
| | `padEnd(n, ch)` | New string | Pad from right |
| | `repeat(n)` | New string | Repeat n times |
| **Extract** | `slice(start, end)` | New string | Extract substring |
| | `charAt(i)` | String (1 char) | Character at index |
| | `at(i)` | String (1 char) | Character (supports negative) |
| | `split(sep)` | Array | Break into array |

### Regex Methods at a Glance

| Method | Called On | Returns | Use For |
|--------|----------|---------|---------|
| `test(str)` | Regex | Boolean | Validation |
| `match(regex)` | String | Array or null | Extraction |
| `search(regex)` | String | Index (-1 if missing) | Find position |
| `replace(regex, str)` | String | New string | Substitution |

---

## What's Next?

**Lecture 14: Asynchronous JavaScript — Callbacks, Promises & Async/Await**

- Why JavaScript is single-threaded and the event loop model
- Callbacks → Promises → `async/await` evolution
- `fetch` API for HTTP requests and API integration
- `AbortController` for canceling requests
- `try/catch` with `async/await` — **today's error handling applied to async code**
- **Project:** Weather Dashboard & API Explorer

---
