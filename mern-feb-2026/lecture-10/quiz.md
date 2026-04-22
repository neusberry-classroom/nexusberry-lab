# Lecture 10: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 11**.
These questions evaluate your understanding of the concepts covered in Lecture 10: Loops, Iteration Patterns & Array Fundamentals.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
for (let i = 0; i < 4; i++) {
    console.log(i);
}
```

**Question:** How many times does `console.log(i)` execute, and what is the last value printed?

- A) 4 times, last value is `4`
- B) 4 times, last value is `3`
- C) 3 times, last value is `3`
- D) 5 times, last value is `4`

**Answer:** B) 4 times, last value is `3`

**Explanation:** The loop starts at `i = 0` and runs while `i < 4`, so it executes for values 0, 1, 2, and 3 — that's 4 iterations. When `i` becomes 4, the condition `4 < 4` is `false` and the loop stops. Option A is wrong because `i` is incremented to 4 *after* the body runs for `i = 3`, so 4 is never printed. Option C undercounts — the loop runs for 0, 1, 2, and 3. Option D would require `<=` instead of `<`.

---

## Question 2

**Context:**
```javascript
const colors = ["Red", "Green", "Blue"];
console.log(colors[3]);
```

**Question:** What is logged to the console?

- A) `"Blue"`
- B) `null`
- C) `undefined`
- D) `RangeError: Index out of bounds`

**Answer:** C) `undefined`

**Explanation:** JavaScript arrays are zero-indexed, so `colors[0]` is "Red", `colors[1]` is "Green", and `colors[2]` is "Blue". Index 3 does not exist, but JavaScript does not throw an error for out-of-bounds array access — it silently returns `undefined`. Option A is the value at index 2, not 3. Option B is wrong because JavaScript uses `undefined` (not `null`) for missing array elements. Option D is wrong because JavaScript arrays do not throw range errors on invalid indices.

---

## Question 3

**Question:** Which loop type guarantees the body runs at least once, even if the condition is initially false?

- A) `for`
- B) `while`
- C) `do...while`
- D) `for...of`

**Answer:** C) `do...while`

**Explanation:** The `do...while` loop checks its condition *after* executing the body, so the body always runs at least once regardless of the condition. Both `for` and `while` check the condition *before* the body — if the condition is false from the start, the body never executes. `for...of` iterates over an iterable's values and runs zero times if the iterable is empty.

---

## Question 4

**Context:**
```javascript
const items = ["Apple", "Banana", "Cherry"];
items.push("Date");
console.log(items.length);
```

**Question:** What is logged to the console?

- A) `3`
- B) `4`
- C) `"Date"`
- D) `undefined`

**Answer:** B) `4`

**Explanation:** The `push` method adds one or more elements to the *end* of an array and modifies it in place. The original array had 3 elements; after `push("Date")`, it has 4. `items.length` returns `4`. Option A is the length before the push. Option C is wrong because `items.length` returns the count of elements, not the last element. Option D is wrong because `length` is always a number on arrays.

---

## Question 5

**Context:**
```javascript
const nums = [10, 20, 30, 40, 50];
const result = nums.slice(1, 3);
console.log(result);
console.log(nums.length);
```

**Question:** What are the two outputs?

- A) `[20, 30]` and `5`
- B) `[20, 30, 40]` and `5`
- C) `[20, 30]` and `3`
- D) `[10, 20, 30]` and `2`

**Answer:** A) `[20, 30]` and `5`

**Explanation:** `slice(1, 3)` extracts elements from index 1 (inclusive) to index 3 (exclusive), returning `[20, 30]`. Crucially, `slice` is non-mutating — the original array `nums` is unchanged, so `nums.length` remains `5`. Option B is wrong because the end index in `slice` is exclusive (does not include index 3). Option C is wrong because `slice` does not modify the original array. Option D confuses the `slice` parameters with different behavior entirely.

---

## Question 6

**Context:**
```javascript
for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) continue;
    console.log(i);
}
```

**Question:** Which values are printed?

- A) `1, 3, 5, 7, 9`
- B) `2, 4, 6, 8, 10`
- C) `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`
- D) Nothing — `continue` stops the loop

**Answer:** B) `2, 4, 6, 8, 10`

**Explanation:** When `i % 2 !== 0` is `true` (i.e., `i` is odd), `continue` skips the rest of that iteration — so `console.log(i)` is skipped for odd numbers. For even numbers, the condition is `false`, `continue` is not triggered, and `console.log(i)` runs. Option A would be correct if the condition were `i % 2 === 0` (skip evens). Option C is wrong because `continue` does skip iterations. Option D confuses `continue` with `break` — `continue` only skips the *current* iteration, not the entire loop.

---

## Question 7

**Context:**
```javascript
const products = [
    { name: "Laptop", price: 999 },
    { name: "Mouse", price: 29 },
    { name: "Keyboard", price: 79 }
];

let total = 0;
for (const product of products) {
    total += product.price;
}
console.log(total);
```

**Question:** What is logged, and why is `for...of` appropriate here?

- A) `1107` — `for...of` gives each product object directly, no index needed
- B) `NaN` — `for...of` returns indices as strings, not objects
- C) `1107` — but `for...in` would be better for arrays
- D) `"0 1 2"` — `for...of` gives indices, not values

**Answer:** A) `1107` — `for...of` gives each product object directly, no index needed

**Explanation:** `for...of` iterates over the *values* of an iterable. For arrays, each iteration gives the actual element — in this case, each product object. So `product.price` accesses the price correctly: 999 + 29 + 79 = 1107. Option B describes `for...in` behavior on arrays (gives string keys), not `for...of`. Option C is wrong because `for...in` on arrays gives string indices, not objects — `for...of` is the correct choice. Option D also describes `for...in`, not `for...of`.

---

## Question 8

**Context:**
```javascript
const data = [5, 10, 15];
data.concat([20, 25]);
console.log(data);
```

**Question:** What is logged to the console?

- A) `[5, 10, 15, 20, 25]`
- B) `[5, 10, 15]`
- C) `[20, 25, 5, 10, 15]`
- D) `undefined`

**Answer:** B) `[5, 10, 15]`

**Explanation:** `concat` is a non-mutating method — it returns a *new* array containing the merged elements but does *not* modify the original. Since the return value is not captured (`const merged = data.concat(...)` was not written), the new array is discarded and `data` remains unchanged. Option A would be correct if `push(20, 25)` were used instead (which mutates). This is one of the most common JavaScript array bugs — forgetting to capture the result of a non-mutating method.

---

## Question 9

**Context:**
```javascript
const inventory = { name: "Laptop", price: 89999, category: "Electronics" };

for (const key in inventory) {
    console.log(key);
}
```

**Question:** What values are logged?

- A) `"Laptop"`, `89999`, `"Electronics"`
- B) `"name"`, `"price"`, `"category"`
- C) `0`, `1`, `2`
- D) `TypeError: inventory is not iterable`

**Answer:** B) `"name"`, `"price"`, `"category"`

**Explanation:** `for...in` iterates over the *keys* (property names) of an object, not the values. So it logs the strings `"name"`, `"price"`, and `"category"`. Option A describes the values, which you'd get with `Object.values(inventory)` or `inventory[key]` inside the loop. Option C would be the result if `inventory` were an array (indices as strings). Option D describes what happens with `for...of` on a plain object — but `for...in` works perfectly on objects.

---

## Question 10

**Context:**
```javascript
const scores = [88, 72, 95, 60, 84];
let highest = scores[0];

for (let i = 1; i < scores.length; i++) {
    if (scores[i] > highest) {
        highest = scores[i];
    }
}
console.log(highest);
```

**Question:** What would go wrong if `highest` were initialized to `0` instead of `scores[0]`?

- A) Nothing — it produces the same result since all scores are positive
- B) The loop would crash with a TypeError
- C) It works here but would fail with an array of all negative numbers — `0` would incorrectly remain the "highest"
- D) It works here but would fail with an empty array — `scores[0]` handles that case

**Answer:** C) It works here but would fail with an array of all negative numbers — `0` would incorrectly remain the "highest"

**Explanation:** With all positive numbers, initializing to `0` happens to produce the correct answer because every score is greater than 0. But consider `[-5, -10, -3]` — no element exceeds `0`, so `highest` would stay `0`, which is not in the array at all. Initializing to `scores[0]` guarantees the starting value is an actual element. Option A is partially true for this specific array but wrong in the general case. Option B is wrong because comparing numbers to 0 doesn't throw errors. Option D is also a valid concern (empty array makes `scores[0]` undefined), but the *primary* bug with `0` initialization is the negative number case.

---

## Self-Assessment

After completing the quiz, rate your confidence on each topic:

| Topic | Confident | Need Review | Lost |
|-------|:---------:|:-----------:|:----:|
| `for` loop syntax (init, test, update) | | | |
| `while` and `do...while` differences | | | |
| `break` and `continue` keywords | | | |
| Array creation and zero-based indexing | | | |
| Mutating methods: `push`, `pop`, `shift`, `unshift`, `splice` | | | |
| Non-mutating methods: `concat`, `slice`, `indexOf`, `includes` | | | |
| `for...in` (object keys) vs `for...of` (array values) | | | |
| Accumulator pattern in loops | | | |
| TypeScript array types and tuples | | | |

**Scoring Guide:**
- **8–10 correct:** Excellent — loops and arrays are solid. Ready for Lecture 11 (Functions & HOFs).
- **5–7 correct:** Good foundation — review the cheatsheet on topics you missed.
- **Below 5:** Re-watch the lecture recording and redo the code examples before Lecture 11.
