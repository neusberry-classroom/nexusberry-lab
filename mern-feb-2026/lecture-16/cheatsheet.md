<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

# DOM Manipulation & Event-Driven Programming Cheatsheet

Quick reference for all DOM and event concepts covered in Lecture 16.

---

## Selecting Elements

Use CSS selector syntax to find elements in the DOM.

```javascript
// By ID — returns ONE element (or null)
const title = document.getElementById("title");

// querySelector — returns FIRST match
const firstCard = document.querySelector(".card");

// querySelectorAll — returns ALL matches as a NodeList
const allCards = document.querySelectorAll(".card");
console.log(allCards.length);  // 3

// Complex CSS selectors work too!
const highCards = document.querySelectorAll(".card.priority-high");
const todoCards = document.querySelectorAll('[data-status="todo"] .card');
```

| Method | Returns | Null if not found? |
|--------|---------|-------------------|
| `getElementById("id")` | One element | `null` |
| `querySelector(".css")` | First match | `null` |
| `querySelectorAll(".css")` | NodeList (all matches) | Empty NodeList (never null) |

```javascript
// NodeList → Array (to use map, filter, reduce)
const cardArray = [...document.querySelectorAll(".card")];
const highPriority = cardArray.filter(card => card.dataset.priority === "high");
```

> **Pro Tip:** Use `querySelector` / `querySelectorAll` for everything — one API, CSS syntax you already know. `getElementById` is faster for ID lookups but rarely matters.

---

## DOM Traversal

Navigate the DOM tree from any element.

```javascript
const board = document.getElementById("board");

// Children — element nodes only
board.children;                // HTMLCollection of child elements
board.firstElementChild;       // First child element
board.lastElementChild;        // Last child element

// Parent
card.parentElement;            // Direct parent element

// Siblings
column.nextElementSibling;     // Next sibling element
column.previousElementSibling; // Previous sibling element

// closest() — find nearest ANCESTOR matching a selector (walks UP)
const card = document.querySelector('[data-id="1"]');
const column = card.closest(".column");      // Finds parent column
const board = card.closest("#board");        // Finds grandparent board
```

| Property | Direction | Returns |
|----------|-----------|---------|
| `parentElement` | Up (1 level) | Parent element |
| `children` | Down | HTMLCollection of child elements |
| `firstElementChild` | Down | First child element |
| `lastElementChild` | Down | Last child element |
| `nextElementSibling` | Sideways | Next sibling element |
| `previousElementSibling` | Sideways | Previous sibling element |
| `closest(".selector")` | Up (any levels) | Nearest matching ancestor |

> **Pro Tip:** Always use `closest()` instead of chaining `parentElement` calls. `closest('.column')` is resilient to HTML structure changes — `parentElement.parentElement` breaks if you add a wrapper div.

---

## Creating & Inserting Elements

```javascript
// Step 1: Create
const card = document.createElement("div");

// Step 2: Configure
card.classList.add("card", "priority-high");
card.setAttribute("draggable", "true");
card.dataset.id = "42";
card.dataset.priority = "high";

// Step 3: Set content
card.innerHTML = `
  <strong>Task Title</strong>
  <p>Task description</p>
`;

// Step 4: Insert into DOM
parent.append(card);      // Last child
parent.prepend(card);     // First child
sibling.before(card);     // Before sibling
sibling.after(card);      // After sibling

// insertAdjacentHTML — insert HTML string without destroying existing content
column.insertAdjacentHTML("beforeend", `<div class="card">New Card</div>`);
```

| Method | Position |
|--------|----------|
| `parent.append(el)` | Last child of parent |
| `parent.prepend(el)` | First child of parent |
| `sibling.before(el)` | Before the sibling |
| `sibling.after(el)` | After the sibling |
| `insertAdjacentHTML(pos, html)` | `"beforebegin"`, `"afterbegin"`, `"beforeend"`, `"afterend"` |

> **Pro Tip:** Use `createElement` + `append` when content includes user data (safe from XSS). Use `insertAdjacentHTML` to add HTML strings without destroying existing event listeners (unlike `innerHTML +=`).

---

## Modifying Elements — textContent, innerHTML & classList

```javascript
// textContent — safe, plain text only
element.textContent = "Hello World";       // No HTML parsing

// innerHTML — parses HTML (⚠️ XSS risk with user input!)
element.innerHTML = "<strong>Bold</strong>"; // Renders as HTML
// NEVER: element.innerHTML = userInput;     // Security vulnerability!

// classList — surgical CSS class management
element.classList.add("active");           // Add class
element.classList.remove("active");        // Remove class
element.classList.toggle("active");        // Add if missing, remove if present
element.classList.contains("active");      // Check → boolean
element.classList.replace("old", "new");   // Swap classes
```

| Operation | textContent | innerHTML |
|-----------|-------------|-----------|
| HTML parsing | No (safe) | Yes (XSS risk) |
| Performance | Faster | Slower (re-parses) |
| Use for | User-provided text | Structured HTML you control |

---

## Styling Elements

```javascript
// Inline styles (camelCase!)
element.style.color = "#E04A7A";
element.style.fontSize = "2.5rem";        // NOT font-size
element.style.borderBottom = "3px solid #990147";

// Read computed styles
const computed = getComputedStyle(element);
console.log(computed.fontSize);            // "40px"

// CSS Custom Properties via JavaScript
document.documentElement.style.setProperty("--brand-color", "#990147");
const value = getComputedStyle(document.documentElement)
  .getPropertyValue("--brand-color");
```

> **Pro Tip:** Prefer `classList.add("highlighted")` over inline styles. CSS classes are reusable, maintainable, and batch all style changes into one reflow.

---

## data-* Attributes & dataset

Store custom metadata directly on HTML elements.

```html
<div data-id="42" data-priority="high" data-created-at="2026-04-01">
```

```javascript
// Read
element.dataset.id;          // "42"
element.dataset.priority;    // "high"
element.dataset.createdAt;   // "2026-04-01" (kebab → camelCase)

// Write
element.dataset.assignee = "Rana Ajmal";
// HTML: data-assignee="Rana Ajmal"

// All values are STRINGS — convert for numbers
const id = parseInt(element.dataset.id);  // 42
```

| HTML Attribute | JavaScript Property |
|---------------|-------------------|
| `data-id` | `dataset.id` |
| `data-user-id` | `dataset.userId` |
| `data-created-at` | `dataset.createdAt` |

---

## Removing & Replacing Elements

```javascript
// Remove element from DOM
element.remove();

// Replace one element with another
oldElement.replaceWith(newElement);
```

---

## Event Listeners

```javascript
// Add a listener
element.addEventListener("click", (event) => {
  console.log("Clicked!", event.target);
});

// Remove a listener (must use named function)
function handleClick(event) {
  console.log("Clicked!");
}
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);

// Listener options
element.addEventListener("click", handler, { once: true });    // Auto-removes after first fire
element.addEventListener("scroll", handler, { passive: true }); // Smoother scrolling
```

> **Pro Tip:** Anonymous/arrow functions can't be removed with `removeEventListener` — each creates a new reference. Always store handlers in named variables if you need to remove them later.

---

## Event Object

```javascript
element.addEventListener("click", (event) => {
  event.target;           // Element that was CLICKED (source)
  event.currentTarget;    // Element the LISTENER is on
  event.type;             // "click", "submit", "keydown", etc.
  event.preventDefault(); // Stop default behavior (form submit, link navigation)
  event.stopPropagation(); // Stop bubbling to parent listeners
});
```

| Property / Method | Purpose |
|-------------------|---------|
| `event.target` | Element the event originated from |
| `event.currentTarget` | Element the listener is attached to |
| `event.type` | Event type string |
| `event.key` | Key pressed (for keyboard events) |
| `event.preventDefault()` | Prevent default browser behavior |
| `event.stopPropagation()` | Stop event from bubbling up |

---

## Common Events

| Event | Fires When | Element |
|-------|------------|---------|
| `click` | Mouse click or touch | Any |
| `input` | Value changes (every keystroke) | Input, textarea |
| `change` | Value changes (on blur) | Input, select |
| `submit` | Form submitted | Form |
| `keydown` / `keyup` | Key pressed / released | Any (usually input) |
| `focus` / `blur` | Element gains / loses focus | Input, button |
| `mouseenter` / `mouseleave` | Mouse enters / leaves (no bubbling) | Any |
| `dragstart` / `dragover` / `drop` | Drag & drop events | Draggable elements |

---

## Event Delegation

ONE listener on a parent handles events from ALL children — including dynamically added ones.

```javascript
// ✅ Delegation — one listener, handles everything
board.addEventListener("click", (event) => {
  // Check what was clicked using closest()
  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (deleteBtn) {
    const card = deleteBtn.closest(".card");
    card.remove();
    return;
  }

  const card = event.target.closest(".card");
  if (card) {
    card.classList.toggle("selected");
    return;
  }
});

// ❌ Without delegation — breaks for new elements
cards.forEach(card => {
  card.addEventListener("click", handler);  // New cards won't have listeners!
});
```

> **Pro Tip:** Event delegation is how React handles events internally — one root listener for the entire app. Use `event.target.closest('.selector')` to identify which child triggered the event.

---

## Form Handling

```javascript
form.addEventListener("submit", (event) => {
  event.preventDefault();  // Stop page reload!

  const title = document.getElementById("taskInput").value.trim();
  if (!title) return;  // Guard clause

  // Validate with regex (from L13)
  if (!/^[a-zA-Z0-9\s\-_.,!?]+$/.test(title)) {
    console.warn("Invalid characters");
    return;
  }

  // Process the form data...
  input.value = "";     // Clear input
  input.focus();        // Return focus
});

// Real-time input feedback
input.addEventListener("input", (event) => {
  const length = event.target.value.length;
  input.style.borderColor = length > 50 ? "#FF4C6A" : "#4D70FF";
});
```

---

## DOM Performance

```javascript
// DocumentFragment — batch multiple insertions into ONE reflow
const fragment = document.createDocumentFragment();

tasks.forEach(task => {
  const card = document.createElement("div");
  card.textContent = task.title;
  fragment.append(card);  // In memory — no reflow
});

container.append(fragment);  // ONE reflow for all elements

// Batch style changes with classList (not individual style properties)
// BAD:  el.style.left = "10px"; el.style.top = "20px";  // Multiple reflows
// GOOD: el.classList.add("moved");                       // One reflow via CSS
```

| Technique | Impact |
|-----------|--------|
| `DocumentFragment` | Batch multiple insertions → 1 reflow |
| `classList` over `style.*` | Batch style changes via CSS class |
| `insertAdjacentHTML` over `innerHTML +=` | Adds without re-parsing existing content |
| Cache DOM queries | Don't call `querySelector` repeatedly for same element |

---

## TypeScript DOM Types

```typescript
// Element types mirror the DOM hierarchy
const div = document.createElement("div");     // HTMLDivElement
const btn = document.createElement("button");  // HTMLButtonElement
const input = document.createElement("input"); // HTMLInputElement

// querySelector returns Element | null — narrow with type assertion
const card = document.querySelector(".card") as HTMLDivElement;

// Event handler typing
function handleClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  console.log(target.dataset.id);
}

// Common types: HTMLElement, HTMLInputElement, MouseEvent, KeyboardEvent
```

---

## Common Mistakes to Avoid

**querySelector returns null:**
```javascript
// ❌ WRONG — crashes if element doesn't exist
const el = document.querySelector(".sidebar");
console.log(el.textContent);  // TypeError: Cannot read properties of null

// ✅ RIGHT — always check for null
const el = document.querySelector(".sidebar");
console.log(el?.textContent);  // undefined — no crash
```

**innerHTML += destroys event listeners:**
```javascript
// ❌ WRONG — re-parses ALL content, destroys existing listeners
container.innerHTML += '<div class="card">New</div>';

// ✅ RIGHT — preserves existing content and listeners
container.insertAdjacentHTML("beforeend", '<div class="card">New</div>');
// OR
const card = document.createElement("div");
container.append(card);
```

**className overwrites all classes:**
```javascript
// ❌ WRONG — overwrites every class on the element
element.className = "active";       // Removes all other classes!

// ✅ RIGHT — surgical class management
element.classList.add("active");     // Only adds, keeps existing
```

**dataset values are always strings:**
```javascript
// ❌ WRONG — comparing string to number
if (card.dataset.id === 42) { ... }  // Always false!

// ✅ RIGHT — convert to number first
if (parseInt(card.dataset.id) === 42) { ... }
```

**removeEventListener with anonymous function:**
```javascript
// ❌ WRONG — creates a new function reference, can't match
btn.addEventListener("click", () => console.log("Hi"));
btn.removeEventListener("click", () => console.log("Hi")); // No effect!

// ✅ RIGHT — store the reference
const handler = () => console.log("Hi");
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);  // Works!
```

**Drag & drop — forgot preventDefault on dragover:**
```javascript
// ❌ WRONG — drop event never fires!
column.addEventListener("dragover", (e) => { /* nothing */ });

// ✅ RIGHT — must prevent default to allow dropping
column.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});
```

---

## VS Code Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + I` | Open Chrome DevTools |
| `Ctrl + Shift + C` | Inspect element (DevTools) |
| `Ctrl + Shift + J` | Open Console panel |
| Right-click → Inspect | Inspect specific element |
| `$0` in Console | References currently selected element in Elements tab |
| `$$(".card")` in Console | Shorthand for `document.querySelectorAll(".card")` |

---

## Quick Reference Table

| Category | Method | Purpose |
|----------|--------|---------|
| **Select** | `querySelector(css)` | Find first matching element |
| **Select** | `querySelectorAll(css)` | Find all matching elements |
| **Traverse** | `closest(css)` | Find nearest ancestor |
| **Create** | `createElement(tag)` | Create new element |
| **Insert** | `append(el)` / `prepend(el)` | Add as last / first child |
| **Modify** | `textContent` | Set plain text (safe) |
| **Modify** | `innerHTML` | Set HTML content (XSS risk) |
| **Modify** | `classList.toggle(cls)` | Toggle CSS class on/off |
| **Modify** | `dataset.key` | Read/write `data-*` attributes |
| **Remove** | `remove()` | Delete element from DOM |
| **Events** | `addEventListener(type, fn)` | Attach event handler |
| **Events** | `event.target.closest(css)` | Delegation pattern |
| **Events** | `event.preventDefault()` | Stop default behavior |
| **Perf** | `createDocumentFragment()` | Batch DOM insertions |

---

## What's Next?

**Lecture 17: The React Mindset** — You'll transition from manual DOM manipulation to React's component-based architecture. Instead of `document.createElement`, you'll write JSX. Instead of `addEventListener`, you'll use `onClick`. Instead of tracking DOM state manually, you'll use `useState` and React re-renders automatically. Everything you learned today is what React automates — understanding the DOM makes you a better React developer.
