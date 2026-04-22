# Lecture 12: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 13**.
These questions evaluate your understanding of the concepts covered in Lecture 12: Data Transformation — Destructuring, Spread & Object Mastery.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
const product = { name: "Laptop", price: 75000, brand: "Dell" };
const { name, price } = product;
```

**Question:** After this destructuring, what is the value of `name`?

- A) `undefined` — destructuring doesn't extract values
- B) `"Laptop"`
- C) `{ name: "Laptop" }`
- D) `"name"`

**Answer:** B) `"Laptop"`

**Explanation:** Object destructuring extracts the value of the `name` property from `product` into a variable called `name`. The variable receives the property's value, not the key string or a wrapped object. Option A is wrong because the property exists on the object. Option C confuses destructuring with creating a new object. Option D confuses property names (keys) with property values.

---

## Question 2

**Context:**
```javascript
const colors = ["red", "green", "blue", "yellow"];
const [, second, , fourth] = colors;
```

**Question:** What are the values of `second` and `fourth`?

- A) `"red"` and `"blue"`
- B) `"green"` and `"yellow"`
- C) `"green"` and `undefined`
- D) `undefined` and `"yellow"`

**Answer:** B) `"green"` and `"yellow"`

**Explanation:** Array destructuring extracts by position. Each comma advances one index: the first comma skips index 0 (`"red"`), `second` receives index 1 (`"green"`), the next comma skips index 2 (`"blue"`), and `fourth` receives index 3 (`"yellow"`). Option A incorrectly maps the first and third positions. Option C forgets that index 3 exists. Option D confuses which positions are skipped.

---

## Question 3

**Context:**
```javascript
const settings = { volume: 80, brightness: 60 };
const { volume, contrast = 50 } = settings;
```

**Question:** What is the value of `contrast`?

- A) `undefined` — property doesn't exist
- B) `60` — takes the last property's value
- C) `50` — default value is used
- D) `null` — missing properties default to null

**Answer:** C) `50` — default value is used

**Explanation:** When a destructured property doesn't exist on the source object, the default value (specified with `= 50`) is used. Since `settings` has no `contrast` property, the default `50` kicks in. Option A would be correct if no default were provided. Option B confuses `contrast` with `brightness`. Option D is wrong because JavaScript doesn't default missing properties to `null` — they're `undefined` without a default.

---

## Question 4

**Context:**
```javascript
const nums = [10, 20, 30, 40, 50];
const copy = [...nums];
copy.push(60);
```

**Question:** What is `nums.length` after this code runs?

- A) `5` — the original array is unchanged
- B) `6` — push affects both arrays
- C) `4` — spread removes the last element
- D) `0` — spread empties the original

**Answer:** A) `5` — the original array is unchanged

**Explanation:** The spread operator `[...nums]` creates a new array with the same elements. `copy` is an independent array, so `copy.push(60)` only affects `copy`. The original `nums` array still has 5 elements. Option B confuses spread with reference assignment (`const copy = nums` would share the reference). Options C and D misunderstand what the spread operator does — it copies elements, it doesn't remove or empty them.

---

## Question 5

**Context:**
```javascript
const employee = {
    name: "Ali",
    role: "Developer",
    salary: 90000,
    department: "Engineering"
};
const { salary, ...publicProfile } = employee;
```

**Question:** What does `publicProfile` contain?

- A) `{ salary: 90000 }` — rest collects the named property
- B) `{ name: "Ali", role: "Developer", department: "Engineering" }` — everything except salary
- C) `["name", "role", "department"]` — an array of remaining keys
- D) `{ name: "Ali", role: "Developer", salary: 90000, department: "Engineering" }` — a full copy

**Answer:** B) `{ name: "Ali", role: "Developer", department: "Engineering" }` — everything except salary

**Explanation:** The rest operator (`...publicProfile`) in object destructuring collects all remaining properties that were NOT explicitly destructured. Since `salary` was extracted separately, `publicProfile` contains everything else. Option A reverses the logic — rest collects what's left, not what was named. Option C is wrong because object rest produces an object, not an array. Option D is wrong because `salary` was extracted and excluded from the rest.

---

## Question 6

**Context:**
```javascript
const baseConfig = {
    theme: "dark",
    lang: "en",
    notifications: { email: true, sms: false }
};
const userConfig = {
    theme: "light",
    notifications: { email: false }
};
const merged = { ...baseConfig, ...userConfig };
```

**Question:** What is `merged.notifications.sms`?

- A) `false` — preserved from baseConfig
- B) `true` — overridden by userConfig
- C) `undefined` — the nested property was lost
- D) `null` — missing properties become null

**Answer:** C) `undefined` — the nested property was lost

**Explanation:** Object spread performs a shallow merge. When `userConfig.notifications` overrides `baseConfig.notifications`, the entire `notifications` object is replaced — not merged property by property. The new `notifications` is `{ email: false }`, which has no `sms` property, so `merged.notifications.sms` is `undefined`. Option A would be correct if spread performed a deep merge. To preserve nested defaults, you'd need: `notifications: { ...baseConfig.notifications, ...userConfig.notifications }`.

---

## Question 7

**Context:**
```javascript
const data = { x: 10, y: 20, z: 30 };

const result = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value * 2])
);
```

**Question:** What is `result`?

- A) `{ x: 10, y: 20, z: 30 }` — the original is returned
- B) `{ x: 20, y: 40, z: 60 }` — all values doubled
- C) `[[" x", 20], ["y", 40], ["z", 60]]` — an array of pairs
- D) `{ x: 20 }` — only the first entry is processed

**Answer:** B) `{ x: 20, y: 40, z: 60 }` — all values doubled

**Explanation:** `Object.entries(data)` converts the object to `[["x",10],["y",20],["z",30]]`. `.map()` transforms each pair to `[key, value * 2]`, producing `[["x",20],["y",40],["z",60]]`. `Object.fromEntries()` converts these pairs back to an object. Option A is wrong because the map transforms the values. Option C describes the intermediate array before `fromEntries` is applied. Option D is wrong because `map` processes all entries, not just the first.

---

## Question 8

**Context:**
```javascript
const config = Object.freeze({
    apiUrl: "https://api.example.com",
    retries: 3,
    headers: { "Content-Type": "application/json" }
});

config.retries = 5;
config.headers["Authorization"] = "Bearer token123";
```

**Question:** After this code runs, what is true?

- A) Both modifications succeed — freeze doesn't work on objects
- B) `config.retries` is `5` and `headers` has `Authorization`
- C) `config.retries` is still `3`, but `headers` now has `Authorization`
- D) Neither modification succeeds — freeze protects everything

**Answer:** C) `config.retries` is still `3`, but `headers` now has `Authorization`

**Explanation:** `Object.freeze` prevents modifications to the frozen object's own properties, so `config.retries = 5` silently fails. However, `Object.freeze` is **shallow** — it doesn't freeze nested objects. `config.headers` is a reference to a nested object that is NOT frozen, so adding `Authorization` to it succeeds. Option A is wrong because freeze does prevent top-level changes. Option B is wrong because `retries` is protected. Option D is wrong because freeze doesn't recursively protect nested objects.

---

## Question 9

**Context:**
```javascript
const original = {
    id: 1,
    name: "Sara",
    scores: [90, 85, 92],
    getAvg: function() {
        return this.scores.reduce((a, b) => a + b) / this.scores.length;
    }
};

const cloned = JSON.parse(JSON.stringify(original));
```

**Question:** Which properties does `cloned` have?

- A) All four: `id`, `name`, `scores`, `getAvg`
- B) Three: `id`, `name`, `scores` — function is dropped
- C) Two: `id`, `name` — arrays and functions are dropped
- D) One: `name` — only strings survive JSON serialization

**Answer:** B) Three: `id`, `name`, `scores` — function is dropped

**Explanation:** `JSON.stringify` serializes data types that JSON supports: strings, numbers, booleans, null, arrays, and plain objects. Functions are NOT valid JSON, so `getAvg` is silently dropped. Numbers (`id`), strings (`name`), and arrays of numbers (`scores`) are all valid JSON and survive the round-trip. Option A is wrong because functions cannot be represented in JSON. Option C is wrong because arrays of primitives are valid JSON. Option D is wrong because numbers and arrays are valid JSON types.

---

## Question 10

**Context:**
```typescript
interface Vehicle {
    readonly vin: string;
    make: string;
    model: string;
    year?: number;
}

const car: Vehicle = { vin: "ABC123", make: "Toyota", model: "Corolla" };
```

**Question:** Which of the following operations will TypeScript allow?

- A) `car.vin = "XYZ789"` — reassign the VIN
- B) `car.color = "red"` — add a new property
- C) `car.year = 2025` — assign to an optional property
- D) `delete car.make` — remove a required property

**Answer:** C) `car.year = 2025` — assign to an optional property

**Explanation:** Optional properties (`year?: number`) can be assigned after initialization — the `?` means the property may or may not exist, not that it's read-only. Option A is wrong because `vin` is `readonly` and cannot be reassigned. Option B is wrong because `Vehicle` doesn't define a `color` property — TypeScript won't allow adding properties not in the interface. Option D is wrong because `make` is a required property — deleting it would violate the interface contract.

---

## Self-Assessment

After completing this quiz, rate your confidence in each topic:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| Object destructuring (extract, rename, defaults) | | | |
| Array destructuring (positional, skipping) | | | |
| Spread operator (copying arrays & objects) | | | |
| Rest operator (collecting remaining properties) | | | |
| Shallow vs deep copy (spread limitations) | | | |
| Object.freeze & Object.seal | | | |
| Object.entries / fromEntries pipelines | | | |
| JSON.stringify / JSON.parse (what's lost) | | | |
| TypeScript interfaces (optional, readonly) | | | |

**Scoring Guide:**
- **9–10 correct:** Excellent — you've mastered data transformation patterns
- **7–8 correct:** Good foundation — review the topics you missed using the cheatsheet
- **5–6 correct:** Revisit the lecture recording, especially Parts 2 and 3
- **Below 5:** Schedule time to re-watch the recording and rework the code examples before Lecture 13
