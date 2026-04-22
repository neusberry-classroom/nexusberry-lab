# Assignment: Interactive Task Board with Drag & Drop

## Overview
Build your own Interactive Task Board — a fully functional Kanban-style project management tool built entirely with vanilla JavaScript DOM manipulation and event-driven programming. Users can create tasks through a form, drag them between status columns, delete individual cards, and see real-time statistics. This is the exact UI pattern behind tools like Trello, Jira, and GitHub Projects — and the foundation for every React application you'll build in Module 3.

---

## Requirements

Your Interactive Task Board must meet all of the following requirements.

### 1. HTML Structure & Board Layout
- Create a complete HTML page with a title, subtitle, and a task board
- The board must have **at least 3 columns** with different statuses (e.g., To Do, In Progress, Done)
- Each column must have a heading (`<h2>`) and a `data-status` attribute identifying its purpose
- Include **at least 3 pre-built task cards** in the initial HTML (not all in the same column)
- Each card must have:
  - A `data-id` attribute (unique number)
  - A `data-priority` attribute (`"low"`, `"medium"`, or `"high"`)
  - `draggable="true"` attribute
  - A title (`<strong>`), description (`<p>`), and a delete button
- Style with NexusBerry colors or your own dark theme — the board must be visually clean and readable

### 2. Task Creation Form
- Create a form above the board with:
  - A **text input** for the task title (required)
  - A **select dropdown** for priority (low, medium, high)
  - A **submit button**
- On submit:
  - Call `event.preventDefault()` to prevent page reload
  - Validate the title: reject empty/whitespace-only strings (guard clause)
  - Validate with regex: only allow letters, numbers, spaces, and basic punctuation (`/^[a-zA-Z0-9\s\-_.,!?]+$/`)
  - Create a new card using `document.createElement` (not innerHTML with user input)
  - Append the card to the "To Do" column
  - Clear the input and return focus to it
  - Update column counts
- Add **real-time input feedback**: change the input border color when the title exceeds 40 characters (use the `input` event)

### 3. Event Delegation
- Attach **ONE click event listener** on the board (or a shared parent) that handles:
  - **Delete button clicks**: identify the delete button with `event.target.closest('[data-action="delete"]')`, find the parent card, remove it, and update counts
  - **Card clicks**: identify cards with `event.target.closest('.card')` and toggle a visual "selected" state using `classList.toggle`
- Do NOT attach individual listeners to each card — delegation must handle all current and dynamically created cards
- Add a `console.log` in each delegation branch so you can verify which action triggered

### 4. Drag & Drop Between Columns
- Implement HTML5 drag and drop using these events (all via delegation on the board):
  - `dragstart`: store the card's `data-id` using `event.dataTransfer.setData()`, add visual feedback (opacity or class change)
  - `dragover`: call `event.preventDefault()` to allow dropping, add a highlight class to the target column
  - `dragleave`: remove the highlight class from the column
  - `drop`: retrieve the card ID from `dataTransfer.getData()`, find the card by `[data-id]` selector, append it to the target column, remove highlight, update counts
  - `dragend`: clean up visual feedback (restore opacity, remove all highlights)
- Verify by dragging a card from one column to another and checking:
  - The card moves visually
  - Column counts update
  - Console logs confirm the action

### 5. data-* Attributes & dataset
- Every card must use `data-id` and `data-priority` attributes
- Every column must use `data-status`
- Use `card.dataset.id` and `card.dataset.priority` in your JavaScript (not `getAttribute`)
- Priority should be reflected visually (e.g., colored left border: red for high, orange for medium, green for low)

### 6. Column Counts
- Create an `updateColumnCounts()` function that:
  - Iterates all columns
  - Counts cards in each column using `querySelectorAll(".card").length`
  - Creates or updates a count badge (`<span>`) inside each column heading
- Call this function:
  - On initial page load
  - After adding a task
  - After deleting a task
  - After dropping a task in a new column

### 7. classList.toggle Feature
- Implement at least ONE feature using `classList.toggle`:
  - **Option A — Card selection**: clicking a card toggles a "selected" visual state (border glow, different color)
  - **Option B — Column collapse**: clicking a column heading toggles card visibility (collapse/expand)
  - **Option C — Priority filter**: a button toggles hiding/showing low-priority cards
- The toggle must work in both directions (on → off → on)

### 8. DocumentFragment for Batch Insertion
- Create an `addMultipleTasks(tasks)` function that:
  - Takes an array of task objects: `[{ title, description, priority }, ...]`
  - Creates a `DocumentFragment`
  - Loops through the array, creates each card, appends to the fragment
  - Appends the fragment to a column in ONE DOM operation
- Call this function on page load with at least **3 initial tasks**
- Add a `console.log` showing how many tasks were batch-inserted

### 9. Keyboard Support
- Add at least ONE keyboard interaction:
  - **Escape** clears the input field and removes focus
  - **Enter** in the input triggers form submission (via `dispatchEvent` or native behavior)
- Use the `keydown` event and check `event.key`

### 10. Console Output
- Your task board must produce clear, descriptive console output for every action:
  - Task creation: `"✅ Created task: 'Title' [priority]"`
  - Task deletion: `"🗑️ Deleted card ID"`
  - Drag & drop: `"📦 Card ID moved to [column status]"`
  - Batch insertion: `"✅ Added N tasks in one batch"`
- Use template literals for all console messages

---

## Example Structure

The example below shows the expected code pattern. Your full submission should follow this style.

```javascript
// ============================================
// Interactive Task Board with Drag & Drop
// Assignment — Lecture 16
// Your Name
// ============================================

// --- Helper: Create Task Card ---

function createTaskCard(id, title, description, priority = "medium") {
  const card = document.createElement("div");
  card.classList.add("card", `priority-${priority}`);
  card.setAttribute("draggable", "true");
  card.dataset.id = id;
  card.dataset.priority = priority;
  card.innerHTML = `
    <strong>${title}</strong>
    <p>${description}</p>
    <button class="delete-btn" data-action="delete">&#10005;</button>
  `;
  return card;
}

// --- Event Delegation on Board ---

const board = document.getElementById("board");

board.addEventListener("click", (event) => {
  // Delete button
  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (deleteBtn) {
    const card = deleteBtn.closest(".card");
    console.log(`🗑️ Deleted card ${card.dataset.id}`);
    card.remove();
    updateColumnCounts();
    return;
  }

  // Card selection toggle
  const card = event.target.closest(".card");
  if (card) {
    card.classList.toggle("selected");
    return;
  }
});

// --- Form Submission ---

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;  // Guard clause
  if (!/^[a-zA-Z0-9\s\-_.,!?]+$/.test(title)) return;  // Regex validation

  const newCard = createTaskCard(nextId++, title, "User task", priority.value);
  todoColumn.append(newCard);
  taskInput.value = "";
  taskInput.focus();
  updateColumnCounts();
  console.log(`✅ Created task: "${title}" [${priority.value}]`);
});

// --- Drag & Drop ---

board.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  event.dataTransfer.setData("text/plain", card.dataset.id);
  card.style.opacity = "0.5";
});

board.addEventListener("dragover", (event) => {
  event.preventDefault();  // Required to allow dropping!
  // ... highlight column ...
});

board.addEventListener("drop", (event) => {
  event.preventDefault();
  const column = event.target.closest(".column");
  if (!column) return;
  const cardId = event.dataTransfer.getData("text/plain");
  const card = document.querySelector(`[data-id="${cardId}"]`);
  if (card) {
    column.append(card);
    updateColumnCounts();
    console.log(`📦 Card ${cardId} moved to ${column.dataset.status}`);
  }
});

// --- Column Counts ---

function updateColumnCounts() {
  document.querySelectorAll(".column").forEach(column => {
    const count = column.querySelectorAll(".card").length;
    let badge = column.querySelector(".count-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.classList.add("count-badge");
      column.querySelector("h2").append(badge);
    }
    badge.textContent = count;
  });
}

// --- Batch Insertion with DocumentFragment ---

function addMultipleTasks(tasks) {
  const fragment = document.createDocumentFragment();
  tasks.forEach(task => {
    fragment.append(createTaskCard(nextId++, task.title, task.description, task.priority));
  });
  todoColumn.append(fragment);
  updateColumnCounts();
  console.log(`✅ Added ${tasks.length} tasks in one batch`);
}

addMultipleTasks([
  { title: "Write README", description: "Documentation", priority: "medium" },
  { title: "Fix Login Bug", description: "Session issue", priority: "high" },
  { title: "Add Dark Mode", description: "Theme toggle", priority: "low" }
]);
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class — contains all DOM methods, event patterns, and performance tips
- **MDN Reference**: [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- **MDN Reference**: [Event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
- **MDN Reference**: [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- **MDN Reference**: [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

---

## Submission Instructions

1. Create a folder named `assignment-16-your-name/`
2. Include your project files: `index.html`, `style.css`, `script.js`
3. Compress to ZIP or push to a GitHub repository
4. Upload to Google Classroom before the deadline
5. **Important:** Your project must work by opening `index.html` in a browser — no build tools required

**Deadline:** Before Lecture 17

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] HTML has at least 3 columns with `data-status` attributes and 3+ pre-built cards
- [ ] Each card has `data-id`, `data-priority`, `draggable="true"`, title, description, and delete button
- [ ] Form has text input, priority select, and submit button
- [ ] `event.preventDefault()` is called on form submit — page does NOT reload
- [ ] Form validates input: rejects empty strings (guard clause) and invalid characters (regex)
- [ ] New cards are created with `createElement` (not innerHTML with user input) — no XSS risk
- [ ] Event delegation: ONE listener on the board handles delete clicks and card clicks
- [ ] Delegation works for dynamically created cards (add a new card, then click/delete it)
- [ ] Drag & drop works: `dragstart` stores ID, `dragover` has `preventDefault()`, `drop` moves card
- [ ] Column counts update after every add, delete, and drag-drop operation
- [ ] `classList.toggle` used for at least one feature (select, collapse, or filter)
- [ ] `DocumentFragment` used for batch insertion of 3+ initial cards
- [ ] At least one keyboard interaction (Escape or Enter on input)
- [ ] Console output uses template literals with descriptive messages for every action
- [ ] No `var` anywhere — only `const` and `let`
- [ ] All comparisons use `===` and `!==`
- [ ] Project works by opening `index.html` in a browser — no errors in console

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **HTML Structure & Styling** — 3+ columns with `data-status`, 3+ cards with `data-id`/`data-priority`/`draggable`, delete buttons, clean visual layout with priority colors | 15 |
| **Task Creation Form** — Form with input/select/submit, `preventDefault`, guard clause validation, regex validation, `createElement` (not innerHTML for user input), input feedback on `input` event | 20 |
| **Event Delegation** — ONE click listener on board handles delete and card selection, works for both existing and dynamically created cards, uses `closest()` for element identification | 20 |
| **Drag & Drop** — `dragstart` with `dataTransfer.setData`, `dragover` with `preventDefault`, `drop` moves card to target column, `dragend` cleanup, visual feedback during drag | 20 |
| **Dynamic UI** — `updateColumnCounts()` updates badges on every change, `classList.toggle` for select/collapse/filter, `DocumentFragment` batch insertion of 3+ initial cards, keyboard support | 15 |
| **Code Quality & Best Practices** — `const`/`let` only, `===` only, descriptive console logs with template literals, `data-*` attributes accessed via `dataset`, meaningful variable names, clean indentation | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A submission that implements all features with minor bugs will score higher than one that perfects only a few features.

---

> **You just built a real interactive web application from scratch.** Every project management tool — Trello, Jira, Notion, GitHub Projects — uses the exact DOM patterns you implemented today: element creation, event delegation, drag & drop, and dynamic state management. In Lecture 17, you'll learn React — and everything you built manually today is what React automates. Understanding the DOM makes you a better React developer, not just a React user. Keep building.

---

*NexusBerry Modern Frontend Course — Lecture 16*
*Instructor: Rana M. Ajmal*
