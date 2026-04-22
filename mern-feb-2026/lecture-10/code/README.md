# Inventory Management System
Lecture 10: Loops, Iteration Patterns & Array Fundamentals

## What You'll Build
A complete inventory management system that processes a product catalog through multiple operations — listing, calculating totals, searching, filtering, category summarization, shipment processing, and report generation — using all 5 JavaScript loop types and core array methods.

## How to Run
1. Open `index.html` in your browser (Chrome recommended)
2. Open Chrome DevTools → Console tab (`F12` or `Ctrl+Shift+J`)
3. All output is logged to the console
4. Modify the `inventory` array in the `<script>` section to test different scenarios

## File Structure
```
code/
├── README.md          ← This file
└── index.html         ← Complete project (HTML + CSS + JS in one file)
```

## Key Concepts Covered
- **Part 1**: `for` loop — counting, stepping, accumulating, conditionals inside loops
- **Part 2**: `while` loop (search), `do...while` (validation), `break`/`continue`, nested loops
- **Part 3**: Array creation, zero-based indexing, mutating methods (`push`/`pop`/`shift`/`unshift`/`splice`), non-mutating methods (`concat`/`slice`/`indexOf`/`includes`), destructuring preview
- **Part 4**: Complete Inventory System — product listing, total value, search by name, low-stock filter, category summary, shipment processing, final report
- **Part 5**: `for...in` (object keys), `for...of` (array/string values), TypeScript array types preview

## Debug Exercises
Scroll to the bottom of the `<script>` section in `index.html` to find commented-out debug blocks:
- **Bug 1**: Off-by-one error with `<=` and array length
- **Bug 2**: Infinite loop from forgotten update in `while`
- **Bug 3**: Discarding `concat` return value
- **Bug 4**: Case-sensitive search comparison

Uncomment each block one at a time to observe the bug, then apply the fix.
