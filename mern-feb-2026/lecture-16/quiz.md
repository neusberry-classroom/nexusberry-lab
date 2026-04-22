# Lecture 16: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 17**.
These questions evaluate your understanding of the concepts covered in Lecture 16.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Question:** What does `document.querySelector(".card")` return when there are 5 elements with the class `card` on the page?

- A) An array containing all 5 elements
- B) A NodeList containing all 5 elements
- C) The first matching element
- D) The last matching element

**Answer:** C) The first matching element

**Explanation:** `querySelector` always returns the FIRST element that matches the CSS selector, or `null` if nothing matches. To get ALL matching elements, use `querySelectorAll`, which returns a NodeList. Option A is wrong because `querySelector` never returns an array — that's not a return type for any DOM selection method. Option B describes what `querySelectorAll` returns, not `querySelector`. Option D is wrong because DOM traversal order is top-to-bottom (document order), so the first match is returned.

---

## Question 2

**Context:**
```javascript
const card = document.querySelector('[data-id="5"]');
console.log(card.dataset.id);
console.log(typeof card.dataset.id);
```

**Question:** What does the second `console.log` output?

- A) `"number"`
- B) `"string"`
- C) `"object"`
- D) `"undefined"`

**Answer:** B) `"string"`

**Explanation:** All `dataset` values are always strings, regardless of what they look like. Even though `data-id="5"` looks numeric, `dataset.id` returns the string `"5"`. To use it as a number, you must explicitly convert: `parseInt(card.dataset.id)` or `Number(card.dataset.id)`. Option A is a common assumption — HTML attributes are always text. Option C would be the type of the `dataset` object itself, not its individual values. Option D would only occur if the attribute didn't exist on the element.

---

## Question 3

**Question:** Which method adds an element as the FIRST child of a parent element?

- A) `parent.append(element)`
- B) `parent.prepend(element)`
- C) `parent.before(element)`
- D) `parent.insertBefore(element)`

**Answer:** B) `parent.prepend(element)`

**Explanation:** `prepend()` inserts an element as the first child of the parent — before all existing children. `append()` adds as the last child (Option A). `before()` inserts before the element itself as a sibling, not as a child (Option C). Option D is close but incorrect syntax — `insertBefore` requires two arguments: `parent.insertBefore(newNode, referenceNode)`, and it's an older API. Modern code uses `prepend` for this purpose.

---

## Question 4

**Context:**
```javascript
const el = document.createElement("div");
el.classList.add("card");
el.classList.add("active", "highlighted");
el.classList.remove("active");
console.log(el.classList.length);
```

**Question:** What is the output?

- A) 1
- B) 2
- C) 3
- D) 0

**Answer:** B) 2

**Explanation:** After `add("card")`, the element has 1 class. After `add("active", "highlighted")`, it has 3 classes (classList.add accepts multiple arguments). After `remove("active")`, it drops to 2 classes: `"card"` and `"highlighted"`. Option A forgets that `add` can accept multiple class names in a single call. Option C doesn't account for the `remove("active")` step. Option D would only be correct if all classes were removed.

---

## Question 5

**Context:**
```javascript
const container = document.querySelector(".column");

// Step 1: Add click handler to all cards
container.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => console.log("Clicked!"));
});

// Step 2: Add a new card
const newCard = document.createElement("div");
newCard.classList.add("card");
newCard.textContent = "New Task";
container.append(newCard);
```

**Question:** What happens when the user clicks on the newly created card?

- A) "Clicked!" is logged to the console
- B) Nothing — the new card has no click listener
- C) A TypeError is thrown
- D) The card is removed from the DOM

**Answer:** B) Nothing — the new card has no click listener

**Explanation:** `querySelectorAll` returns a static snapshot of elements at the time it's called. The `forEach` loop attaches click handlers to the 3 existing cards, but the new card created in Step 2 didn't exist when the loop ran. It has no listener attached. This is the core problem that event delegation solves — attaching a single listener on the parent handles all current AND future children. Option A would be correct if event delegation were used. Option C doesn't happen — clicking an element without a listener is simply ignored. Option D has no basis in the code.

---

## Question 6

**Context:**
```javascript
form.addEventListener("submit", (event) => {
  const title = document.getElementById("taskInput").value.trim();
  if (!title) return;
  
  const card = createTaskCard(title);
  todoColumn.append(card);
  taskInput.value = "";
});
```

**Question:** What critical line is missing from this form handler?

- A) `event.stopPropagation()` to prevent bubbling
- B) `event.preventDefault()` to stop page reload
- C) `form.reset()` to clear all fields
- D) `event.target.submit()` to process the form

**Answer:** B) `event.preventDefault()` to stop page reload

**Explanation:** When a form is submitted, the browser's default behavior is to send an HTTP request and reload the page — destroying all JavaScript state and DOM changes. Calling `event.preventDefault()` at the start of the handler stops this default behavior, letting JavaScript handle the form data. Option A is about event propagation, not form defaults — and wouldn't prevent the reload. Option C is a valid way to clear a form but doesn't address the reload problem. Option D would trigger the default submission behavior, which is exactly what we're trying to prevent.

---

## Question 7

**Context:**
```javascript
board.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (card) {
    console.log("Card ID:", card.dataset.id);
  }
});
```

**Question:** A user clicks on a `<p>` tag that is nested inside a `.card` div. What does `event.target.closest(".card")` return?

- A) `null` — the `<p>` doesn't match `.card`
- B) The `<p>` element itself
- C) The `.card` div that contains the `<p>`
- D) The `board` element where the listener is attached

**Answer:** C) The `.card` div that contains the `<p>`

**Explanation:** `closest()` starts at the element itself and walks UP the DOM tree, returning the first ancestor that matches the selector. Since the `<p>` is inside a `.card` div, `closest(".card")` finds and returns that `.card` parent. This is exactly why `closest()` is essential for event delegation — no matter which child element is clicked, you can always find the containing parent. Option A is wrong because `closest()` checks the element AND its ancestors. Option B is wrong because `<p>` doesn't have the class `.card`. Option D is wrong because `closest()` returns the NEAREST match while walking up, not the farthest.

---

## Question 8

**Context:**
```javascript
const el = document.querySelector(".sidebar");
el.textContent = "Hello";
```

**Question:** If no element with class `sidebar` exists in the DOM, what happens?

- A) An empty string is returned and the assignment is silently ignored
- B) A new element with class `sidebar` is automatically created
- C) `TypeError: Cannot set properties of null` — the code crashes
- D) `undefined` is returned and the assignment is silently ignored

**Answer:** C) `TypeError: Cannot set properties of null` — the code crashes

**Explanation:** `querySelector` returns `null` when no matching element is found. Attempting to access or set a property on `null` throws a `TypeError`. This is the most common JavaScript error in web applications. The fix is to check for null first: `if (el) { el.textContent = "Hello"; }` or use optional chaining: `el?.textContent`. Option A is wrong because `querySelector` returns `null`, not an empty string. Option B is wrong — the DOM never auto-creates elements. Option D confuses `null` with `undefined` — and neither would silently accept property assignment.

---

## Question 9

**Context:**
```javascript
const column = document.querySelector(".column");

column.addEventListener("dragover", (event) => {
  console.log("Dragover detected");
});

column.addEventListener("drop", (event) => {
  console.log("Dropped!");
  const cardId = event.dataTransfer.getData("text/plain");
  // ... move the card
});
```

**Question:** A user drags a card over the column and releases it. What happens?

- A) Both "Dragover detected" and "Dropped!" are logged
- B) Only "Dragover detected" is logged — the drop event never fires
- C) Only "Dropped!" is logged — dragover is not needed
- D) Neither fires — drag events require a special library

**Answer:** B) Only "Dragover detected" is logged — the drop event never fires

**Explanation:** The browser's default behavior for `dragover` is to REJECT drops. Without calling `event.preventDefault()` in the `dragover` handler, the `drop` event is never dispatched. You must add `event.preventDefault()` inside the dragover handler to signal that the element accepts drops. This is the most counterintuitive aspect of HTML5 drag and drop — you prevent the default to ENABLE dropping. Option A would be correct if `preventDefault()` were called. Option C is wrong because `dragover` with `preventDefault()` is required to enable dropping. Option D is wrong because HTML5 provides native drag and drop events.

---

## Question 10

**Context:**
```javascript
// Approach A
for (let i = 0; i < 200; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  container.append(div);
}

// Approach B
const fragment = document.createDocumentFragment();
for (let i = 0; i < 200; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.append(div);
}
container.append(fragment);
```

**Question:** What is the primary performance difference between Approach A and Approach B?

- A) Approach B uses less memory because DocumentFragment is lightweight
- B) Approach A is faster because it doesn't create an intermediate object
- C) Approach A triggers 200 reflows; Approach B triggers 1 reflow
- D) There is no performance difference — both approaches are identical

**Answer:** C) Approach A triggers 200 reflows; Approach B triggers 1 reflow

**Explanation:** Each time `container.append(div)` is called in Approach A, the browser must recalculate the layout (reflow) to accommodate the new element. With 200 iterations, that's 200 layout recalculations. A `DocumentFragment` exists only in memory — appending to it causes no reflow. When the fragment is finally appended to the container, all 200 elements are inserted in a single DOM operation, triggering only 1 reflow. Option A is misleading — the fragment itself is lightweight, but that's not the primary benefit. Option B is wrong — the fragment overhead is negligible compared to 200 reflows. Option D is wrong — for large numbers of elements, the performance difference is visually noticeable.

---

## Self-Assessment

Rate your confidence in each topic:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| Selecting elements (querySelector, querySelectorAll) | | | |
| DOM traversal (parentElement, children, closest) | | | |
| Creating & inserting elements (createElement, append, prepend) | | | |
| Modifying elements (textContent, innerHTML, classList) | | | |
| data-* attributes & dataset | | | |
| Event listeners (addEventListener, removeEventListener) | | | |
| Event object (target, currentTarget, preventDefault) | | | |
| Event delegation (closest pattern) | | | |
| Form handling & validation | | | |
| Drag & drop events | | | |
| DOM performance (DocumentFragment, batch updates) | | | |
| TypeScript DOM types | | | |

**If 3+ topics are "Lost":** Re-watch the lecture recording and work through the cheatsheet examples before starting the assignment.
