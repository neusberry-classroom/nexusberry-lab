# Lecture 8: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 9**.
These questions evaluate your understanding of the concepts covered in Lecture 8: JavaScript Variables, Data Types, and Operators.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
const PI = 3.14159;
PI = 3.14;
```

**Question:** What happens when this code runs?

- A) `PI` is updated to `3.14`
- B) `TypeError: Assignment to constant variable`
- C) `SyntaxError: Unexpected token`
- D) `PI` remains `3.14159` with no error

**Answer:** B) `TypeError: Assignment to constant variable`

**Explanation:** `const` declares a variable whose binding cannot be reassigned after initialization. Attempting to assign a new value to a `const` variable at runtime throws a `TypeError` — not a `SyntaxError`, because the syntax is technically valid; JavaScript only detects the violation when it executes that line. Options A and D are wrong because `const` strictly prevents reassignment. Option C is wrong because `SyntaxError` would be thrown at parse time for structurally invalid code, which this is not.

---

## Question 2

**Context:**
```javascript
console.log(typeof null);
```

**Question:** What does `typeof null` evaluate to?

- A) `"null"`
- B) `"undefined"`
- C) `"object"`
- D) `"boolean"`

**Answer:** C) `"object"`

**Explanation:** This is one of JavaScript's most famous quirks — a bug from the language's original 1995 implementation that was never fixed to preserve backward compatibility. `null` represents the intentional absence of a value, but `typeof null` incorrectly returns `"object"`. The correct way to check for `null` is strict equality: `value === null`. Option A (`"null"`) would be the intuitive answer but is wrong. Options B and D bear no relation to `null`.

---

## Question 3

**Context:**
```javascript
const input = prompt("Enter your age:");
console.log(typeof input);
```

**Question:** What type does `typeof input` return, assuming the user types `25`?

- A) `"number"`
- B) `"any"`
- C) `"string"`
- D) `"undefined"`

**Answer:** C) `"string"`

**Explanation:** `prompt()` always returns a string, regardless of what the user types. Even if the user types `25`, JavaScript receives the string `"25"`, not the number `25`. This is why you must always convert prompt input before doing arithmetic: `const age = parseFloat(prompt("Enter your age:"))`. Option A is wrong — no automatic conversion happens. Option B (`"any"`) is a TypeScript concept, not a JavaScript runtime type. Option D would only apply if the user cancels the dialog, in which case `prompt()` returns `null`.

---

## Question 4

**Context:**
```javascript
console.log(2 + 3 * 4);
```

**Question:** What value is logged to the console?

- A) 20
- B) 14
- C) 24
- D) 10

**Answer:** B) 14

**Explanation:** JavaScript follows standard mathematical operator precedence — multiplication (`*`) is evaluated before addition (`+`). So `3 * 4` is calculated first, giving `12`, and then `2 + 12` gives `14`. Option A (`20`) is the result of evaluating left-to-right without precedence: `(2 + 3) * 4 = 20` — this is a very common mistake. Option C and D have no logical basis from this expression. If you want left-to-right evaluation, use parentheses: `(2 + 3) * 4`.

---

## Question 5

**Context:**
```javascript
console.log("5" == 5);
console.log("5" === 5);
```

**Question:** What are the two values logged, in order?

- A) `false`, `false`
- B) `true`, `true`
- C) `true`, `false`
- D) `false`, `true`

**Answer:** C) `true`, `false`

**Explanation:** The loose equality operator (`==`) performs type coercion — it converts both operands to the same type before comparing, so `"5"` is converted to the number `5`, making the comparison `5 == 5` which is `true`. The strict equality operator (`===`) compares both value AND type with no coercion — `"5"` (string) and `5` (number) are different types, so it returns `false`. In professional JavaScript, always use `===` to avoid the subtle bugs that type coercion can introduce. The `==` operator exists for historical reasons; most style guides ban it.

---

## Question 6

**Context:**
```javascript
console.log(null || "default");
```

**Question:** What is logged to the console?

- A) `null`
- B) `false`
- C) `undefined`
- D) `"default"`

**Answer:** D) `"default"`

**Explanation:** The `||` (OR) operator uses short-circuit evaluation. It evaluates the left side first — if the left side is falsy, it returns the right side. `null` is a falsy value in JavaScript (along with `0`, `""`, `false`, `NaN`, and `undefined`), so `||` moves to the right operand and returns `"default"`. This pattern is widely used in JavaScript to provide fallback values: `const name = userInput || "Anonymous"`. Option A is wrong because `null` is falsy so the OR moves past it. Options B and C are unrelated to the operands in this expression.

---

## Question 7

**Question:** Which of the following values is **truthy** in JavaScript?

- A) `0`
- B) `""`
- C) `"0"`
- D) `null`

**Answer:** C) `"0"`

**Explanation:** `"0"` is a non-empty string — it contains one character, the digit zero — so JavaScript treats it as truthy. This surprises many beginners who assume `"0"` should be falsy because the number `0` is falsy. The complete list of falsy values in JavaScript is exactly: `false`, `0`, `-0`, `0n`, `""` (empty string), `null`, `undefined`, and `NaN`. Everything else — including `"0"`, `"false"`, `[]`, `{}`, and any non-empty string — is truthy. Option A (`0`) is falsy. Option B (`""`) is an empty string, which is falsy. Option D (`null`) is explicitly falsy.

---

## Question 8

**Context:**
```javascript
console.log("Rana" && 42);
```

**Question:** What is logged to the console?

- A) `true`
- B) `"Rana"`
- C) `42`
- D) `false`

**Answer:** C) `42`

**Explanation:** The `&&` (AND) operator does not simply return `true` or `false` — it returns the actual value of one of its operands. When both operands are truthy, `&&` returns the **last** (rightmost) operand. `"Rana"` is a truthy non-empty string, so `&&` continues and evaluates `42`, which is also truthy — and since there are no more operands, it returns `42`. If the left side had been falsy (e.g., `null && 42`), the result would have been `null` (short-circuit). Option A (`true`) is wrong — `&&` returns an operand value, not a boolean. Option B (`"Rana"`) would be correct only if the right side were falsy.

---

## Question 9

**Context:**
```javascript
// TypeScript — which annotation is correct?
const price = 19.99;
```

**Question:** Which TypeScript type annotation correctly types this variable?

- A) `const price: string = 19.99;`
- B) `const price: number = 19.99;`
- C) `const price: float = 19.99;`
- D) `const price: decimal = 19.99;`

**Answer:** B) `const price: number = 19.99;`

**Explanation:** TypeScript uses a single `number` type for all numeric values — integers, floats, and decimals alike. There is no `float`, `int`, `double`, or `decimal` type in TypeScript (unlike languages such as Java or C#). Option A is wrong because `19.99` is not a string. Option C (`float`) and Option D (`decimal`) do not exist as TypeScript primitive types — using them would cause a TypeScript compile error (`Cannot find name 'float'`). When TypeScript infers types automatically, `const price = 19.99` is already inferred as `number`, so the explicit annotation is optional but valid for documentation purposes.

---

## Question 10

**Context:**
```javascript
// JavaScript version history
// 1995 → ES1 → ES5 → ??? → ES2024
```

**Question:** Which ECMAScript version is considered "the revolution" — introducing `let`/`const`, arrow functions, classes, template literals, and modules all at once?

- A) ES3 (1999)
- B) ES5 (2009)
- C) ES6 / ES2015
- D) ES2020

**Answer:** C) ES6 / ES2015

**Explanation:** ES6 (officially ES2015) was the single most impactful update in JavaScript's history. Released in 2015 after six years of development, it introduced `let` and `const` (block-scoped variables replacing `var`), arrow functions, classes, template literals, destructuring, default parameters, modules (`import`/`export`), Promises, and much more. This is why modern JavaScript is often called "ES6+" — everything from ES6 onward is the baseline for professional development. ES5 (2009) was the previous milestone that standardized `strict mode` and JSON support. ES2020 added optional chaining and nullish coalescing, but ES6 remains the watershed moment. When you hear "modern JavaScript," ES6 is where it begins.

---

## Self-Assessment

After completing the quiz, rate your understanding of each topic:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| JavaScript as a Language (characteristics, phases, history) | [ ] | [ ] | [ ] |
| Variable Declarations (`const`, `let`, `var`) | [ ] | [ ] | [ ] |
| Data Types & `typeof` | [ ] | [ ] | [ ] |
| Operators (arithmetic, comparison, logical) | [ ] | [ ] | [ ] |
| Truthy & Falsy Values | [ ] | [ ] | [ ] |
| TypeScript Basics | [ ] | [ ] | [ ] |

If you marked "Need Review" or "Lost" on any topic, revisit the cheatsheet and lecture recording before Lecture 9. Pay special attention to the truthy/falsy table and the difference between `==` and `===` — these appear constantly in real JavaScript codebases.
