# Lecture 13: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 14**.
These questions evaluate your understanding of the concepts covered in Lecture 13: String Processing, Pattern Matching & Defensive Error Handling.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
const greeting = "Hello World";
console.log(greeting.indexOf("World"));
console.log(greeting.includes("world"));
```

**Question:** What are the two outputs?

- A) `6` and `true`
- B) `6` and `false`
- C) `5` and `true`
- D) `-1` and `false`

**Answer:** B) `6` and `false`

**Explanation:** `indexOf("World")` returns `6` because "World" starts at index 6 in "Hello World". `includes("world")` returns `false` because string comparisons in JavaScript are case-sensitive — "world" (lowercase w) is not found in the string. Option A is wrong because `includes` is case-sensitive. Option C has the wrong index — "W" is at position 6, not 5. Option D is wrong because `indexOf` does find "World" (with capital W).

---

## Question 2

**Context:**
```javascript
const name = "  JavaScript  ";
const result = name.trimStart().trimEnd();
console.log(result.length);
```

**Question:** What is logged to the console?

- A) `14`
- B) `12`
- C) `10`
- D) `8`

**Answer:** C) `10`

**Explanation:** The original string `"  JavaScript  "` has 2 leading spaces + 10 characters ("JavaScript") + 2 trailing spaces = 14 total characters. `trimStart()` removes the 2 leading spaces (12 remaining), and `trimEnd()` removes the 2 trailing spaces (10 remaining). The result is `"JavaScript"` with length 10. Option A is the original untrimmed length. Option B is after only trimming one side. Option D would require removing characters from the word itself.

---

## Question 3

**Context:**
```javascript
const csv = "apple,banana,,cherry";
const items = csv.split(",");
console.log(items.length);
```

**Question:** What is logged to the console?

- A) `3`
- B) `4`
- C) `2`
- D) `5`

**Answer:** B) `4`

**Explanation:** `split(",")` splits the string at every comma. The string `"apple,banana,,cherry"` has three commas, which produces four elements: `["apple", "banana", "", "cherry"]`. The empty string between the two consecutive commas becomes an empty string element in the array. Option A ignores the empty element. Option C undercounts. Option D would require an additional comma in the string.

---

## Question 4

**Context:**
```javascript
console.log("42".padStart(5, "0"));
console.log("Hi".padEnd(2, "!"));
```

**Question:** What are the two outputs?

- A) `"00042"` and `"Hi!"`
- B) `"00042"` and `"Hi"`
- C) `"42000"` and `"Hi!"`
- D) `"00042"` and `"Hi!!"`

**Answer:** B) `"00042"` and `"Hi"`

**Explanation:** `padStart(5, "0")` pads from the left until the string reaches length 5 — "42" needs 3 zeros → `"00042"`. `padEnd(2, "!")` pads from the right until length 2 — but "Hi" is already 2 characters long, so no padding is added and it returns `"Hi"` unchanged. Option A is wrong because `padEnd` only pads if the string is shorter than the target length. Option C pads from the wrong direction. Option D miscounts the padding needed.

---

## Question 5

**Context:**
```javascript
const regex = /^[a-z]+$/;
console.log(regex.test("hello"));
console.log(regex.test("Hello"));
console.log(regex.test("hello world"));
```

**Question:** What are the three outputs?

- A) `true`, `true`, `true`
- B) `true`, `false`, `true`
- C) `true`, `false`, `false`
- D) `true`, `true`, `false`

**Answer:** C) `true`, `false`, `false`

**Explanation:** The regex `/^[a-z]+$/` requires the entire string (anchored with `^` and `$`) to contain only lowercase letters (`[a-z]`), one or more (`+`). `"hello"` passes — all lowercase. `"Hello"` fails — capital "H" is not in `[a-z]`. `"hello world"` fails — the space is not in `[a-z]`. Option A would require the `i` flag for case-insensitivity. Option B is wrong because spaces are not lowercase letters. Option D would need `[a-zA-Z]` instead of `[a-z]`.

---

## Question 6

**Context:**
```javascript
const text = "The year 2024 had 365 days and 12 months.";
const numbers = text.match(/\d+/g);
console.log(numbers);
```

**Question:** What is logged?

- A) `["2", "0", "2", "4", "3", "6", "5", "1", "2"]`
- B) `["2024", "365", "12"]`
- C) `null`
- D) `["2024365", "12"]`

**Answer:** B) `["2024", "365", "12"]`

**Explanation:** The regex `\d+` matches one or more consecutive digits as a single match. It finds three groups of consecutive digits in the text: "2024", "365", and "12". The `g` flag ensures all matches are returned. Option A would be correct for `/\d/g` (matching individual digits). Option C would only happen if there were no digits at all. Option D wrongly merges sequences — `\d+` matches the longest sequence of digits at each position, not across word boundaries.

---

## Question 7

**Context:**
```javascript
const email = "user@example.com";
const parts = email.split("@");
console.log(parts[0]);
console.log(parts[1].split(".")[0]);
```

**Question:** What are the two outputs?

- A) `"user"` and `"example.com"`
- B) `"user"` and `"example"`
- C) `"user@example"` and `"com"`
- D) `"@"` and `"example"`

**Answer:** B) `"user"` and `"example"`

**Explanation:** `email.split("@")` produces `["user", "example.com"]`. `parts[0]` is `"user"`. Then `parts[1]` is `"example.com"`, and `.split(".")` on that produces `["example", "com"]`. Index `[0]` of that is `"example"`. Option A doesn't apply the second split. Option C incorrectly splits at the dot first. Option D confuses the split separator with array elements.

---

## Question 8

**Context:**
```javascript
function safeDivide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("Both arguments must be numbers");
    }
    if (b === 0) {
        throw new RangeError("Cannot divide by zero");
    }
    return a / b;
}

try {
    console.log(safeDivide(10, 0));
} catch (error) {
    console.log(error.name);
}
```

**Question:** What is logged to the console?

- A) `"TypeError"`
- B) `"RangeError"`
- C) `Infinity`
- D) `"Error"`

**Answer:** B) `"RangeError"`

**Explanation:** Both `10` and `0` are numbers, so the TypeError check passes. The second check catches `b === 0` and throws a `RangeError`. The catch block logs `error.name`, which is `"RangeError"`. Option A is wrong because both arguments pass the type check. Option C would be the result of `10 / 0` in JavaScript without the guard clause — but the guard throws before division happens. Option D is wrong because `new RangeError()` creates an error with name `"RangeError"`, not `"Error"`.

---

## Question 9

**Context:**
```javascript
let value = "default";
try {
    value = "try";
    JSON.parse("invalid json");
    value = "after parse";
} catch (error) {
    value = "catch";
} finally {
    value = value + " + finally";
}
console.log(value);
```

**Question:** What is logged to the console?

- A) `"try + finally"`
- B) `"after parse + finally"`
- C) `"catch + finally"`
- D) `"default + finally"`

**Answer:** C) `"catch + finally"`

**Explanation:** The try block sets `value = "try"`, then `JSON.parse("invalid json")` throws a SyntaxError. The line `value = "after parse"` is never reached (skipped after the error). Execution jumps to catch, which sets `value = "catch"`. Then finally runs and appends `" + finally"`, making the result `"catch + finally"`. Option A would require the catch block to not execute. Option B would require the JSON parse to succeed. Option D would require an error before `value = "try"`.

---

## Question 10

**Context:**
```javascript
function processInput(input) {
    if (input === null || input === undefined) return "empty";
    if (typeof input !== "string") return "invalid type";

    const trimmed = input.trim();
    if (trimmed.length === 0) return "blank";

    try {
        const data = JSON.parse(trimmed);
        return data;
    } catch {
        return trimmed.toUpperCase();
    }
}
```

**Question:** What does `processInput('  not json  ')` return?

- A) `"empty"`
- B) `"blank"`
- C) `"NOT JSON"`
- D) An error is thrown

**Answer:** C) `"NOT JSON"`

**Explanation:** The input `'  not json  '` passes the null/undefined check (it's a string), passes the type check (it is a string), and after `trim()` becomes `"not json"` which has length > 0 (passes the blank check). `JSON.parse("not json")` throws a SyntaxError, which is caught by the catch block. The catch block returns `"not json".toUpperCase()` → `"NOT JSON"`. Option A would require null or undefined. Option B would require a whitespace-only string. Option D is wrong because the try/catch handles the parse error — it doesn't propagate.

---

## Self-Assessment

After completing the quiz, rate your confidence in each topic:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| String searching methods (indexOf, includes, startsWith) | ☐ | ☐ | ☐ |
| String transformation (trim, case, replace) | ☐ | ☐ | ☐ |
| split & join (string ↔ array) | ☐ | ☐ | ☐ |
| padStart / padEnd for formatting | ☐ | ☐ | ☐ |
| Regex character classes & quantifiers | ☐ | ☐ | ☐ |
| Regex anchors (^, $) for validation | ☐ | ☐ | ☐ |
| match() with /g flag for extraction | ☐ | ☐ | ☐ |
| try / catch / finally flow | ☐ | ☐ | ☐ |
| throw & custom error types | ☐ | ☐ | ☐ |
| Guard clauses & defensive programming | ☐ | ☐ | ☐ |

**Scoring Guide:**
- 9-10: Excellent — ready for Lecture 14 (Async JavaScript)
- 7-8: Good — review the topics you missed before next class
- 5-6: Needs work — rewatch the recording and redo the cheatsheet exercises
- Below 5: Schedule office hours or ask in the WhatsApp group

---
