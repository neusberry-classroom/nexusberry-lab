# Smart Content Analyzer & Validator
Lecture 13: String Processing, Pattern Matching & Defensive Error Handling

## What You'll Build
A content analysis tool that processes raw text using string methods, validates data formats with regular expressions, and handles errors defensively with try/catch/finally, guard clauses, and custom errors.

## How to Run
1. Open `index.html` in a browser
2. Open DevTools Console (`F12` → Console tab) to see all output
3. Or run directly with Node.js: `node script.js`

## File Structure
```
code/
├── README.md           ← This file
├── index.html          ← Browser entry point (links to script.js)
├── style.css           ← Minimal styling for the page
├── script.js           ← All lecture code organized by Parts
└── script-debug.js     ← Debug version with intentional bugs for live debugging
```

## Key Concepts Covered
- **Part 1:** String fundamentals (immutability, character access), searching, extracting, transforming, split/join, template literals, padding
- **Part 2:** Regular expressions (character classes, quantifiers, anchors, groups, flags), regex with string methods
- **Part 3:** Practical regex patterns (email, phone, password strength, URL validation), data extraction from text
- **Part 4:** Error types, try/catch/finally, the Error object, throw/custom errors, guard clauses, fail-fast patterns
- **Part 5:** Smart Content Analyzer capstone (combining all concepts), TypeScript string types preview
