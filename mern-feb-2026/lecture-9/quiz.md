# Lecture 9: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 10**.
These questions evaluate your understanding of the concepts covered in Lecture 9: Conditional Logic & Program Flow Control.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
const age = 17;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

**Question:** What is logged to the console?

- A) `"Adult"`
- B) `"Minor"`
- C) `undefined`
- D) Nothing — the code throws an error

**Answer:** B) `"Minor"`

**Explanation:** The `if` condition checks whether `age >= 18`. Since `age` is `17`, the condition evaluates to `false`, so the `else` block executes and logs `"Minor"`. Option A would be correct if age were 18 or higher. Option C is wrong because `console.log` does produce visible output. Option D is wrong because this is perfectly valid JavaScript with no syntax or runtime errors.

---

## Question 2

**Context:**
```javascript
const score = 85;

if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
}
```

**Question:** If the student scores exactly 80, what happens?

- A) `"A"` is logged
- B) `"B"` is logged
- C) Both `"A"` and `"B"` are logged
- D) Nothing is logged — no condition matches 80

**Answer:** B) `"B"` is logged

**Explanation:** When `score` is `80`, the first condition `80 >= 90` is `false`, so JavaScript moves to the `else if`. The condition `80 >= 80` is `true` (the `>=` operator includes the boundary value), so `"B"` is logged. Option A is wrong because 80 is not ≥ 90. Option C is wrong because `else if` means only one branch executes. Option D would be true if the value were below 80, but 80 satisfies the `>=` check.

---

## Question 3

**Context:**
```javascript
const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of week");
        break;
    case "Friday":
        console.log("Almost weekend");
        break;
    default:
        console.log("Regular day");
}
```

**Question:** What comparison does `switch` use internally to match cases?

- A) `==` (loose equality with type coercion)
- B) `===` (strict equality without coercion)
- C) `.equals()` method
- D) `Object.is()`

**Answer:** B) `===` (strict equality without coercion)

**Explanation:** JavaScript's `switch` statement uses strict equality (`===`) to compare the expression against each `case` value. This means `switch("80")` will NOT match `case 80:` because the string `"80"` is not strictly equal to the number `80`. Option A (`==`) is wrong — if `switch` used loose equality, type coercion would cause unexpected matches. Option C (`.equals()`) is a Java/C# method that doesn't exist in JavaScript. Option D (`Object.is()`) is a real JavaScript method but is not what `switch` uses.

---

## Question 4

**Context:**
```javascript
const input = prompt("Enter your score: ");  // User types: 80
console.log(typeof input);
console.log(input + 10);
```

**Question:** What are the two values logged (assuming the user types `80`)?

- A) `"number"`, `90`
- B) `"string"`, `90`
- C) `"string"`, `"8010"`
- D) `"number"`, `"8010"`

**Answer:** C) `"string"`, `"8010"`

**Explanation:** Both browser `prompt()` and Node.js `prompt-sync` always return a **string**, regardless of what the user types. So `input` is the string `"80"`, and `typeof input` is `"string"`. When you use `+` with a string and a number, JavaScript concatenates instead of adding: `"80" + 10` produces `"8010"`. To get `90`, you must convert first: `Number(input) + 10`. Option A is wrong because `prompt` never returns a number. Option B is wrong because without `Number()`, the `+` operator concatenates. Option D is wrong because the type is `"string"`, not `"number"`.

---

## Question 5

**Context:**
```javascript
const username = "";
const display = username || "Anonymous";
console.log(display);
```

**Question:** What is logged and why?

- A) `""` — the OR operator preserves empty strings
- B) `"Anonymous"` — because `""` is falsy, OR moves to the right operand
- C) `undefined` — because `username` has no value
- D) `true` — because OR returns a boolean

**Answer:** B) `"Anonymous"` — because `""` is falsy, OR moves to the right operand

**Explanation:** The `||` operator evaluates the left operand first. An empty string `""` is one of JavaScript's falsy values, so `||` skips it and returns the right operand `"Anonymous"`. Option A is wrong because `||` treats all falsy values (including empty strings) as "skip and try the next one." Option C is wrong because `username` does have a value — it's an empty string. Option D is wrong because `||` in JavaScript returns one of its actual operands, not a boolean.

---

## Question 6

**Context:**
```javascript
const config = {
    theme: "dark",
    language: "en"
};

console.log(config.notifications?.enabled);
```

**Question:** What does this code log?

- A) `TypeError: Cannot read properties of undefined`
- B) `null`
- C) `false`
- D) `undefined`

**Answer:** D) `undefined`

**Explanation:** Optional chaining (`?.`) safely accesses properties on potentially `null` or `undefined` values. `config.notifications` is `undefined` (the property doesn't exist), so `?.enabled` short-circuits and returns `undefined` instead of throwing an error. Option A would be correct if we used regular dot access: `config.notifications.enabled` — that would crash. Option B (`null`) is wrong because optional chaining returns `undefined`, not `null`, when the chain breaks. Option C (`false`) is wrong because the property doesn't exist at all.

---

## Question 7

**Context:**
```javascript
const count = 0;
const label1 = count ?? "none";
const label2 = count || "none";
const label3 = count?.toString() ?? "missing";
```

**Question:** What are the values of `label1`, `label2`, and `label3`?

- A) `0`, `0`, `"0"`
- B) `"none"`, `"none"`, `"missing"`
- C) `0`, `"none"`, `"0"`
- D) `"none"`, `0`, `"missing"`

**Answer:** C) `0`, `"none"`, `"0"`

**Explanation:** `??` only triggers on `null`/`undefined` — since `count` is `0` (not null/undefined), `label1` stays `0`. `||` triggers on all falsy values — `0` is falsy, so `label2` becomes `"none"`. For `label3`, `count?.toString()` works because `count` is `0` (not null/undefined), so `toString()` runs and returns `"0"`, and `??` doesn't trigger. Option A is wrong because `||` does replace `0`. Option B is wrong because `??` preserves `0`. Option D has `??` and `||` behavior reversed.

---

## Question 8

**Context:**
```javascript
const status = "active";

switch (status) {
    case "active":
        console.log("Welcome back");
    case "pending":
        console.log("Verification needed");
        break;
    case "banned":
        console.log("Access denied");
        break;
    default:
        console.log("Unknown status");
}
```

**Question:** What is logged when `status` is `"active"`?

- A) Only `"Welcome back"`
- B) `"Welcome back"` then `"Verification needed"`
- C) `"Welcome back"`, `"Verification needed"`, `"Access denied"`, then `"Unknown status"`
- D) `"Verification needed"` only

**Answer:** B) `"Welcome back"` then `"Verification needed"`

**Explanation:** The `"active"` case matches and logs `"Welcome back"`, but there is no `break` after it. Without `break`, JavaScript "falls through" to the next case — `"pending"` — and executes its code, logging `"Verification needed"`. The `break` after the `"pending"` case then stops execution. Option A would be correct only if there were a `break` after the `"active"` case. Option C is wrong because the `break` in the `"pending"` case stops further fall-through. Option D is wrong because the `"active"` case does match and its code runs first.

---

## Question 9

**Context:**
```javascript
let settings = null;
settings ??= { theme: "light", language: "en" };
console.log(settings.theme);

let prefs = { theme: "dark" };
prefs ??= { theme: "light", language: "en" };
console.log(prefs.theme);
```

**Question:** What are the two values logged, in order?

- A) `"light"`, `"light"`
- B) `"light"`, `"dark"`
- C) `"dark"`, `"dark"`
- D) `null`, `"dark"`

**Answer:** B) `"light"`, `"dark"`

**Explanation:** The `??=` (nullish assignment) operator assigns the right-hand value only if the left-hand variable is `null` or `undefined`. `settings` is `null`, so `??=` assigns the new object — `settings.theme` is `"light"`. `prefs` is already an object (not null/undefined), so `??=` does NOT overwrite it — `prefs.theme` remains `"dark"`. Option A is wrong because `??=` does not overwrite existing non-null values. Option C is wrong because the first `settings` was `null` so it does get replaced. Option D is wrong because after `??=`, `settings` is no longer `null`.

---

## Question 10

**Context:**
```javascript
const level = points >= 100 ? "Gold"
    : points >= 50 ? "Silver"
    : "Bronze";
```

**Question:** A code reviewer sees this nested ternary. Which assessment is correct?

- A) This is always bad practice — nested ternaries should never be used in production
- B) This is acceptable — it's pure value assignment with 3 clear branches formatted vertically
- C) This is fine because ternaries can be nested to any depth without readability issues
- D) This will cause a syntax error — ternaries cannot be nested in JavaScript

**Answer:** B) This is acceptable — it's pure value assignment with 3 clear branches formatted vertically

**Explanation:** Nested ternaries are acceptable when they meet three criteria: (1) pure value assignment (no side effects), (2) 2-3 branches, and (3) formatted vertically with one condition per line. This example satisfies all three — each line maps one condition to one value, and it reads clearly top-to-bottom. Option A is too strict — a blanket ban ignores valid use cases for short value mapping. Option C is too permissive — deeply nested ternaries (4+ levels) or ternaries with side effects are code review red flags. Option D is wrong — nested ternaries are valid JavaScript syntax.

---

## Self-Assessment

After completing the quiz, rate your understanding of each topic:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| if / else if / else (branching, condition order) | [ ] | [ ] | [ ] |
| switch (cases, break, fall-through, default) | [ ] | [ ] | [ ] |
| Ternary operator (basic + nested ternary decision framework) | [ ] | [ ] | [ ] |
| Short-circuit evaluation (|| and &&) | [ ] | [ ] | [ ] |
| Nullish coalescing (??) vs OR (||) | [ ] | [ ] | [ ] |
| Optional chaining (?.) | [ ] | [ ] | [ ] |
| Logical assignment operators (??=, ||=, &&=) | [ ] | [ ] | [ ] |
| User input with prompt-sync (Number() conversion) | [ ] | [ ] | [ ] |

If you marked "Need Review" or "Lost" on any topic, revisit the cheatsheet and lecture recording before Lecture 10. Pay special attention to the difference between `??` and `||` — this distinction appears constantly in professional JavaScript and React codebases.
