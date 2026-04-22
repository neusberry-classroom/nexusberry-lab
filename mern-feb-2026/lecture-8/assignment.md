# Assignment: Financial Calculator Suite

## Overview
Build your own multi-calculator web page using the JavaScript fundamentals covered in Lecture 8 — variables, data types, operators, and user input/output. This is your first real JavaScript project, and it will demonstrate that you can write working, readable code from scratch.

---

## Requirements

Your Financial Calculator Suite must meet all of the following requirements.

### 1. Variables & Declarations
- Use `const` for values that never change (tax rates, conversion rates, fixed fees)
- Use `let` for values that change (running totals, calculated results, user inputs stored in variables)
- **No `var` anywhere in your code** — this is a hard rule
- At least **8 variable declarations total** across the entire project

### 2. Data Types
Your code must correctly use all of these primitive types:

| Type | Required Use |
|------|--------------|
| `number` | All calculation inputs and results |
| `string` | Labels, messages, formatted output |
| `boolean` | Validation flags (e.g., `let isValid = true;`) |
| `null` | Initialize a variable before it has a value |
| `undefined` | Demonstrate awareness (e.g., comment explaining it) |

Use `typeof` at least once in your code (e.g., for input validation or a comment-driven demonstration).

### 3. Operators
Your calculators must use all of these operator types:

- **Arithmetic** (`+`, `-`, `*`, `/`, `%`) — in your calculation logic
- **Comparison** (`===`, `!==`, `>`, `<`) — for input validation (strict equality required; `==` is not acceptable)
- **Logical** (`&&`, `||`, `!`) — for combining validation conditions
- **Ternary** (`condition ? valueIfTrue : valueIfFalse`) — for at least one conditional result or label

### 4. Input & Output
- Accept user input via `prompt()` **or** HTML `<input>` fields (your choice, or mix both)
- If using `prompt()`, convert the result to a number with `parseFloat()` or `Number()` before calculating
- Display results inside an HTML element (e.g., update `innerHTML` or `textContent` of a `<p>` or `<div>`)
- Use `console.log()` for at least one intermediate debugging step (leave it in the final submission)

### 5. Calculators (minimum 3)
Choose **any 3** from the list below:

- Tip Calculator
- Loan EMI Calculator
- Currency Converter (minimum 3 currencies)
- Sales Tax Calculator
- Discount Price Calculator
- Salary / Hourly Rate Calculator
- BMI Calculator
- Investment Return Calculator

**Each calculator must:**
- Accept user input (via `prompt()` or HTML input fields)
- Display the result in the browser inside an HTML element — not just `alert()` or `console.log()`
- Use arithmetic operators for the core calculation
- Use comparison operators to validate input (e.g., reject negative amounts, reject zero as a divisor)
- Show an error message in the browser if input is invalid (do not silently fail)

---

## Example Structure

The example below shows one complete calculator — a Tip Calculator — to illustrate the expected pattern. Your three calculators should follow the same structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Financial Calculator Suite</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
        .calculator { border: 1px solid #ccc; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
        h2 { color: #990147; }
        input { padding: 8px; width: 100%; box-sizing: border-box; margin-bottom: 10px; }
        button { background: #990147; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        .result { margin-top: 12px; font-size: 1.1em; font-weight: bold; color: #0020C2; }
        .error { color: red; }
    </style>
</head>
<body>

    <h1>Financial Calculator Suite</h1>

    <!-- Calculator 1: Tip Calculator -->
    <div class="calculator">
        <h2>Tip Calculator</h2>
        <input type="number" id="billAmount" placeholder="Enter bill amount (PKR)" />
        <input type="number" id="tipPercent" placeholder="Tip percentage (e.g. 15)" />
        <button onclick="calculateTip()">Calculate Tip</button>
        <div class="result" id="tipResult"></div>
    </div>

    <!-- Add your other 2 calculators here following the same pattern -->

    <script>
        // ── Tip Calculator ──────────────────────────────────────────────
        function calculateTip() {
            // Convert string input to number — prompt() and input fields always return strings
            const billAmount = parseFloat(document.getElementById("billAmount").value);
            const tipPercent = parseFloat(document.getElementById("tipPercent").value);

            const resultEl = document.getElementById("tipResult");

            // Validate input using strict comparison and logical operators
            const isValidBill = !isNaN(billAmount) && billAmount > 0;
            const isValidTip  = !isNaN(tipPercent) && tipPercent >= 0;

            if (!isValidBill || !isValidTip) {
                resultEl.className = "result error";
                resultEl.textContent = "Please enter valid positive numbers.";
                return;
            }

            // Core calculation
            const tipAmount  = billAmount * (tipPercent / 100);
            const totalBill  = billAmount + tipAmount;

            // Ternary: label changes based on tip generosity
            const label = tipPercent >= 20 ? "Generous tip!" : "Standard tip";

            // Debug step — leave this in your submission
            console.log("Tip calculation:", { billAmount, tipPercent, tipAmount, totalBill });

            // Display result in the browser
            resultEl.className = "result";
            resultEl.innerHTML =
                `Tip: PKR ${tipAmount.toFixed(2)} &nbsp;|&nbsp; Total: PKR ${totalBill.toFixed(2)} &nbsp;(${label})`;
        }
    </script>
</body>
</html>
```

Your submission should be a **single HTML file** with all three calculators on the same page, each in its own clearly labelled section.

---

## Resources

- **MDN — JavaScript Data Types**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
- **MDN — Expressions and Operators**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators
- **MDN — parseFloat()**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
- **Lecture Cheatsheet**: `lectures/lecture-8/cheatsheet.md` — keep it open while coding
- **Placeholder images (if needed)**: `https://picsum.photos/600/200`

---

## Submission Instructions

1. Save your work as a single HTML file named `financial-calculator-suite.html`
2. Test every calculator in your browser before submitting — open it in Chrome, use DevTools Console to check for errors
3. Add your **full name and student ID** as an HTML comment at the top of the file: `<!-- Student: [Your Name] | ID: [Your ID] -->`
4. Upload the file to Google Classroom under the **Lecture 8 Assignment** task

---

## Pre-Submission Checklist

Before you submit, go through every item below:

- [ ] No `var` anywhere in my JavaScript
- [ ] At least 8 `const` or `let` declarations are present
- [ ] All five primitive types (number, string, boolean, null, undefined) are used or demonstrated
- [ ] `typeof` is used at least once
- [ ] Arithmetic, comparison (strict `===`), logical, and ternary operators are all present
- [ ] Each calculator converts `prompt()` or `<input>` values to a number before calculating
- [ ] Each calculator displays its result inside an HTML element (not just `alert()`)
- [ ] Each calculator shows an error message for invalid input
- [ ] At least one `console.log()` is present for debugging
- [ ] The file opens in Chrome without any red errors in the DevTools Console

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| 3 working calculators (correct logic, input validation, result displayed in browser) | 40 |
| Variable declarations (`const`/`let`, no `var`) | 20 |
| Type conversion (converting `prompt()`/input strings to numbers before calculating) | 15 |
| Ternary operator used for at least one conditional result or label | 15 |
| Code quality & comments | 10 |
| **Total** | **100** |

---

## Tips for Success

1. **Build one calculator at a time.** Get the first one fully working — input, calculation, validation, display — before starting the second.
2. **Open DevTools before you write a single line of code.** `F12` → Console tab. Any error you make will show up there immediately.
3. **Always convert input strings to numbers.** `prompt()` and `<input>` values are always strings. `"10" + 5` gives `"105"`, not `15`. Use `parseFloat()` or `Number()`.
4. **Use `console.log()` generously while building.** Log every variable after you assign it. Remove none of them before submitting — it shows your thought process.
5. **Comment your logic.** One short comment per function explaining what it does is worth more than a paragraph of explanation elsewhere.

---

## Common Mistakes to Avoid

- **Using `==` instead of `===`** — Always use strict equality. `"5" == 5` is `true` in JavaScript, which can cause silent bugs in calculations.
- **Forgetting to convert `prompt()` output** — `prompt()` always returns a string. `parseFloat("19.99")` → `19.99`. Skip this step and your math will break.
- **Dividing without checking for zero** — `1 / 0` returns `Infinity` in JavaScript, not an error. Always validate before dividing.
- **Declaring variables inside `if` blocks with `const` and then using them outside** — `const` and `let` are block-scoped. Declare them before the `if` block if you need them after.
- **Using `var`** — Even one `var` will cost you 5 points. There is no reason to use `var` in modern JavaScript. Treat it as a forbidden keyword.

---

## Need Help?

- **Review the lecture recording** posted on Google Classroom
- **Check the cheatsheet** (`lectures/lecture-8/cheatsheet.md`) for quick syntax reference
- **Post questions** in the Google Classroom comments — describe what you tried and paste the error from the Console
- **Attend office hours** (schedule posted on Google Classroom)

This is your first JavaScript assignment — the beginning of building real, interactive web applications. Every professional developer you admire started exactly here. Take your time, experiment freely, and don't be afraid to break things in DevTools. That curiosity is what separates developers who grow from those who stay stuck. You've got this.
