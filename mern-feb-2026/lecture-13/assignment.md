# Assignment: Smart Content Analyzer & Validator

## Overview
Build your own Smart Content Analyzer & Validator that processes raw text using string methods, validates data formats with regular expressions, and handles errors defensively with try/catch/finally and guard clauses. This is the kind of text processing logic found in every real-world application: form validators, content management systems, search engines, and data cleaning pipelines. Mastering it here means you can process, validate, and analyze any text data in any application.

---

## Requirements

Your Smart Content Analyzer & Validator must meet all of the following requirements.

### 1. Input Validation Function (`validateInput`)
- Create a `validateInput(input)` function using **guard clauses** (fail-fast pattern)
- Check for and return early on:
  - `null` or `undefined` → return an error message
  - Non-string types → return a `TypeError` message
  - Empty or whitespace-only strings (after `trim()`) → return an error message
  - Strings shorter than 20 characters → return a minimum length error
- If all guards pass, return the trimmed string
- Do NOT use nested `if/else` — use guard clauses (early returns) exclusively

### 2. Text Analysis Function (`analyzeText`)
- Create an `analyzeText(text)` function that returns an **object** with:
  - `charCount` — total characters (with spaces)
  - `charNoSpaces` — total characters (without spaces, using regex `\s` replacement)
  - `wordCount` — number of words (use `split(/\s+/)` for accurate splitting)
  - `sentenceCount` — number of sentences (split on `.`, `!`, `?`)
  - `avgWordLength` — average word length (rounded to 1 decimal)
  - `avgSentenceLength` — average words per sentence (rounded to 1 decimal)
- Filter out empty strings from split results using `.filter(s => s.trim().length > 0)`
- Call `validateInput()` at the start — if validation fails, throw an error

### 3. String Methods (use at least 6)
Demonstrate at least **6 string methods** from the following across your code:
- **Required:** `trim()` — clean user input before processing
- **Required:** `split()` — break text into words and sentences
- **Required:** `includes()` — check for substring existence
- **Required:** `slice()` — extract substrings from text
- **Required:** `replace()` or `replaceAll()` — transform text content
- **Required:** `toLowerCase()` or `toUpperCase()` — normalize case for comparisons
- Add a **comment** above each method call identifying which method it is

### 4. Regex Validation Functions (4 validators)
Create **4 separate validation functions**, each using regex:

#### a) `validateEmail(email)`
- Use the pattern: `/^[\w.-]+@[\w.-]+\.\w{2,}$/`
- Test against at least 3 valid and 3 invalid email addresses
- Return `true`/`false` with a descriptive message

#### b) `validatePhone(phone)`
- Validate Pakistan phone format: `/^(\+92|0)\d{3}-?\d{7}$/`
- Test against at least 3 valid and 3 invalid phone numbers
- Return `true`/`false` with a descriptive message

#### c) `checkPasswordStrength(password)`
- Check 5 criteria using **separate regex patterns**:
  - Length >= 8 characters
  - Contains uppercase: `/[A-Z]/`
  - Contains lowercase: `/[a-z]/`
  - Contains digit: `/\d/`
  - Contains special character: `/[!@#$%^&*]/`
- Return the number of checks passed and a strength label (Weak/Fair/Good/Strong)

#### d) `validateURL(url)`
- Use a regex pattern for `http://` or `https://` URLs
- Test against at least 2 valid and 2 invalid URLs
- Return `true`/`false` with a descriptive message

### 5. Capturing Groups — Date Extraction
- Given a date string like `"2024-01-15"`, use regex capturing groups to extract year, month, and day:
  ```javascript
  const match = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  ```
- Display each part separately: `Year: 2024, Month: 01, Day: 15`
- Test with at least 2 different date strings

### 6. Data Extraction with `match()` and `/g`
- Create a sample text block containing at least 2 emails, 2 phone numbers, and 2 URLs
- Use `match()` with the `g` flag to extract **all** of each type from the text
- Guard against `null` returns with `|| []`
- Display extracted data with labels

### 7. Error Handling (`try/catch/finally`)
- Implement `try/catch/finally` in at least **2 functions**:
  - **JSON parsing** — parse a JSON string with error recovery (provide a fallback value)
  - **One other function** — such as analyzeText or a validation function
- The `finally` block must perform a visible cleanup action (e.g., log "Cleanup complete")
- Never use empty catch blocks — always log or return the error information

### 8. Custom Errors with `throw`
- Use `throw` to create at least **2 custom errors** with appropriate types:
  - `throw new TypeError(...)` — for wrong input type
  - `throw new RangeError(...)` — for values outside valid range
- Each thrown error must include a descriptive message explaining what went wrong
- Demonstrate catching these errors with `try/catch` and logging `error.name` and `error.message`

### 9. Guard Clause Pattern (Fail-Fast)
- Implement guard clauses in at least **2 functions** (one can be `validateInput`)
- Use the pattern: check → return early on failure → happy path at bottom
- Do NOT use nested `if/else` pyramids — keep the happy path at the lowest indentation level
- Add a comment `// Guard clause` above each guard

### 10. Formatted Report
- Generate a final report using **template literals** that includes:
  - All text analysis results (character count, word count, sentence count, averages)
  - All validation test results (email, phone, password, URL)
  - All extracted data (emails, phones, URLs found in text)
- Use `padStart()` or `padEnd()` for at least 2 aligned columns
- Use `"─".repeat(n)` or `"═".repeat(n)` for visual separators
- The report must be readable and professionally formatted

---

## Example Structure

The example below shows the expected code pattern. Your full submission should follow this same style across all sections.

```javascript
// ============================================
// Smart Content Analyzer & Validator
// Assignment — Lecture 13
// Your Name
// ============================================

// --- Input Validation (Guard Clauses) ---

function validateInput(input) {
    // Guard clause — null/undefined check
    if (input === null || input === undefined) return "Error: No input provided";
    // Guard clause — type check
    if (typeof input !== "string") return `Error: Expected string, got ${typeof input}`;
    // Guard clause — empty check
    const trimmed = input.trim();  // trim() — remove whitespace
    if (trimmed.length === 0) return "Error: Input is empty";
    // Guard clause — minimum length
    if (trimmed.length < 20) return "Error: Input too short (min 20 characters)";

    // Happy path
    return trimmed;
}

// --- Text Analysis ---

function analyzeText(text) {
    const validated = validateInput(text);
    if (validated.startsWith("Error:")) throw new Error(validated);

    const charCount = validated.length;
    const charNoSpaces = validated.replace(/\s/g, "").length;  // replace() with regex
    const words = validated.split(/\s+/);  // split() — string to array
    const wordCount = words.length;
    // ... more analysis ...

    return { charCount, charNoSpaces, wordCount /* ... */ };
}

// --- Email Validation ---

function validateEmail(email) {
    if (typeof email !== "string") throw new TypeError("Email must be a string");
    const trimmed = email.trim().toLowerCase();  // toLowerCase() — normalize
    if (!trimmed.includes("@")) return { valid: false, message: "Missing @ symbol" };  // includes()
    return {
        valid: /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(trimmed),
        message: /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(trimmed) ? "Valid email" : "Invalid format"
    };
}

// --- Phone Validation ---
// ... your phone validator here ...

// --- Password Strength ---
// ... your password checker here ...

// --- URL Validation ---
// ... your URL validator here ...

// --- Date Extraction (Capturing Groups) ---
const dateStr = "2024-01-15";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(`Year: ${dateMatch[1]}, Month: ${dateMatch[2]}, Day: ${dateMatch[3]}`);

// --- Data Extraction from Text ---
const sampleText = `
    Contact: admin@nexusberry.com or support@example.com
    Call: 0300-1234567 or 0321-9876543
    Visit: https://www.nexusberry.com or https://example.com
`;

const extractedEmails = sampleText.match(/[\w.-]+@[\w.-]+\.\w{2,}/g) || [];
// ... extract phones and URLs ...

// --- JSON Parsing with Error Handling ---
function safeParseJSON(jsonString) {
    let result = null;
    try {
        result = JSON.parse(jsonString);
        console.log("Parsed:", result);
    } catch (error) {
        console.log(`Parse failed: ${error.message}`);
        result = null;
    } finally {
        console.log("Cleanup complete");
    }
    return result;
}

safeParseJSON('{"name": "Laptop"}');  // Valid
safeParseJSON('invalid json');         // Invalid — caught

// --- Custom Errors ---
function validateAge(age) {
    if (typeof age !== "number") throw new TypeError(`Age must be number, got ${typeof age}`);
    if (age < 0 || age > 150) throw new RangeError(`Age out of range: ${age}`);
    return age;
}

try {
    validateAge("twenty");
} catch (error) {
    console.log(`${error.name}: ${error.message}`);
}

// --- Final Report ---
const divider = "═".repeat(50);
console.log(`
${divider}
   SMART CONTENT ANALYZER — REPORT
${divider}

Text Analysis:
   ${"Characters:".padEnd(25)} ${charCount}
   ${"Words:".padEnd(25)} ${wordCount}
   // ... more results ...

Validation Results:
   // ... email, phone, password, URL results ...

Extracted Data:
   // ... emails, phones, URLs found ...

${divider}
`);
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class — contains all string methods, regex patterns, and error handling reference
- **MDN Reference**: [String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **MDN Reference**: [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)
- **MDN Reference**: [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- **Regex Testing**: [regex101.com](https://regex101.com) — paste your patterns to test and debug

---

## Submission Instructions

1. Create a folder named `assignment-13-your-name/`
2. Include your project file: `analyzer.js`
3. Compress to ZIP or push to a GitHub repository
4. Upload to Google Classroom before the deadline
5. **Important:** Your file must run without errors using `node analyzer.js` in the terminal

**Deadline:** Before Lecture 14

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] `validateInput()` uses guard clauses (not nested if/else) for null, type, empty, and length checks
- [ ] `analyzeText()` returns an object with charCount, charNoSpaces, wordCount, sentenceCount, avgWordLength, avgSentenceLength
- [ ] At least 6 string methods used with identifying comments: `trim`, `split`, `includes`, `slice`, `replace`/`replaceAll`, `toLowerCase`/`toUpperCase`
- [ ] Email validator uses regex with anchors and tests 3+ valid and 3+ invalid emails
- [ ] Phone validator uses Pakistan format regex and tests 3+ valid and 3+ invalid numbers
- [ ] Password strength checker uses 5 separate regex checks and returns a strength label
- [ ] URL validator uses regex for http/https and tests 2+ valid and 2+ invalid URLs
- [ ] Capturing groups extract year, month, day from at least 2 date strings
- [ ] `match()` with `/g` extracts all emails, phones, URLs from a text block (with `|| []` guard)
- [ ] `try/catch/finally` used in at least 2 functions (including JSON parsing)
- [ ] `throw new TypeError(...)` and `throw new RangeError(...)` used with descriptive messages
- [ ] Guard clauses used in at least 2 functions (early returns, no nested pyramids)
- [ ] Final report uses template literals, `padStart`/`padEnd`, and `repeat()` separators
- [ ] No `var` anywhere — only `const` and `let`
- [ ] All comparisons use `===` and `!==` (never `==` or `!=`)
- [ ] Code runs without errors: `node analyzer.js`

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **Input Validation & Guard Clauses** — `validateInput()` with guard clauses (no nested if/else), at least 2 functions using fail-fast pattern, descriptive error returns | 15 |
| **Text Analysis** — `analyzeText()` returns all required metrics (charCount, charNoSpaces, wordCount, sentenceCount, averages), proper use of `split(/\s+/)` and `.filter()` | 15 |
| **String Methods** — At least 6 methods used correctly (`trim`, `split`, `includes`, `slice`, `replace`/`replaceAll`, case normalization), with identifying comments | 15 |
| **Regex Validation** — 4 validators (email, phone, password, URL) with correct patterns, anchored validation, multiple test cases for each | 20 |
| **Error Handling** — `try/catch/finally` in 2+ functions, `throw` with TypeError and RangeError, descriptive messages, no silent catch blocks | 15 |
| **Data Extraction & Report** — Capturing groups for dates, `match(/g)` for bulk extraction with `\|\| []` guard, formatted report with template literals and padStart/padEnd | 10 |
| **Code Quality & Best Practices** — Proper indentation, meaningful variable names, `const`/`let` only, `===` only, Part comments, runs without errors | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A submission that attempts all sections but has minor bugs will score higher than one that perfects only three sections.

---

> **You've built a complete text processing and validation toolkit.** Every form on every website, every search engine, every content management system uses the exact patterns you implemented today — string methods for processing, regex for validation, and try/catch for resilience. In Lecture 14, these error handling skills become essential when you start making API calls with `async/await`. Keep building. This skill translates directly to freelance and job projects.

---

*NexusBerry Modern Frontend Course — Lecture 13*
*Instructor: Rana M. Ajmal*
