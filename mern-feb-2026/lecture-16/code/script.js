// ============================================
// Lecture 16 — Interactive Task Board with Drag & Drop
// DOM Manipulation & Event-Driven Programming
// NexusBerry Modern Frontend Course
// ============================================


// === Part 1: DOM Selection & Traversal ===

// By ID — returns ONE element (or null)
const title = document.getElementById("title");
console.log("getElementById:", title);
console.log("It's an object:", typeof title);    // "object"
console.log("Constructor:", title.constructor.name); // "HTMLHeadingElement"

// querySelector — returns FIRST match using CSS selector syntax
const firstCard = document.querySelector(".card");
console.log("querySelector:", firstCard);

// querySelectorAll — returns ALL matches as a NodeList
const allCards = document.querySelectorAll(".card");
console.log("querySelectorAll:", allCards);
console.log("Count:", allCards.length);  // 3

// NodeList supports forEach (but not map, filter, reduce!)
allCards.forEach((card, index) => {
  console.log(`  Card ${index + 1}:`, card.querySelector("strong").textContent);
});

// To use array methods, convert NodeList to Array:
const cardArray = [...allCards];
const highPriority = cardArray.filter(card => card.dataset.priority === "high");
console.log("High priority cards:", highPriority.length);  // 1

// Complex CSS selectors work too!
const highCards = document.querySelectorAll(".card.priority-high");
const todoCards = document.querySelectorAll('[data-status="todo"] .card');
const firstColumnHeading = document.querySelector(".column:first-child h2");
console.log("Complex selectors work:", firstColumnHeading.textContent); // "To Do"

// DOM Traversal — Walking the Tree
const board = document.getElementById("board");

console.log("\n--- Traversal ---");
console.log("Board children:", board.children);        // HTMLCollection(3)
console.log("First child:", board.firstElementChild);  // First .column
console.log("Last child:", board.lastElementChild);    // Last .column

// Parent
const card = document.querySelector(".card");
console.log("Card's parent:", card.parentElement);

// Siblings
const todoColumn = document.querySelector('[data-status="todo"]');
console.log("Next sibling:", todoColumn.nextElementSibling);
console.log("Prev sibling:", todoColumn.previousElementSibling); // null

// closest() — find nearest ANCESTOR matching a selector
const deepCard = document.querySelector('[data-id="1"]');
const parentColumn = deepCard.closest(".column");
console.log("closest('.column'):", parentColumn.dataset.status);  // "todo"
const parentBoard = deepCard.closest("#board");
console.log("closest('#board'):", parentBoard.id);  // "board"

// children vs childNodes
const column = document.querySelector(".column");
console.log("\nchildren (elements only):", column.children.length);
console.log("childNodes (all nodes):", column.childNodes.length);
// Always use children, firstElementChild, nextElementSibling
// Avoid childNodes, firstChild, nextSibling (include whitespace text nodes)


// === Part 2: Creating, Modifying & Removing Elements ===

// Creating Elements with createElement
function createTaskCard(id, title, description, priority = "medium") {
  const card = document.createElement("div");

  // Add classes
  card.classList.add("card", `priority-${priority}`);

  // Set attributes
  card.setAttribute("draggable", "true");
  card.dataset.id = id;
  card.dataset.priority = priority;

  // Set content
  card.innerHTML = `
    <strong>${title}</strong>
    <p>${description}</p>
    <button class="delete-btn" data-action="delete">&#10005;</button>
  `;

  return card;
}

// Modifying elements
const titleEl = document.getElementById("title");
console.log("\ntextContent:", titleEl.textContent);
console.log("innerHTML:", titleEl.innerHTML);

// textContent — safe, strips HTML
titleEl.textContent = "Interactive Task Board";

// classList Methods
const demoCard = document.querySelector(".card");
demoCard.classList.add("selected");
console.log("\nAfter add:", [...demoCard.classList]);
demoCard.classList.remove("selected");

// Styling Elements Directly (camelCase!)
const header = document.querySelector("h1");
header.style.borderBottom = "3px solid #990147";

// getComputedStyle — read ACTUAL applied styles
const computed = getComputedStyle(header);
console.log("\nComputed font-size:", computed.fontSize);

// data-* Attributes & dataset
const taskCard = document.querySelector('[data-id="1"]');
console.log("\ndataset.id:", taskCard.dataset.id);
console.log("dataset.priority:", taskCard.dataset.priority);


// === Part 3: Events — Listeners, Delegation & The Event Object ===

// Event Delegation — ONE listener on the board handles ALL interactions
const boardEl = document.getElementById("board");

boardEl.addEventListener("click", (event) => {
  // Check if a delete button was clicked
  const deleteBtn = event.target.closest('[data-action="delete"]');
  if (deleteBtn) {
    const card = deleteBtn.closest(".card");
    const cardId = card.dataset.id;
    console.log(`🗑️ Deleting card ${cardId}`);
    card.remove();
    updateColumnCounts();
    return;
  }

  // Check if a card was clicked (but not a button inside it)
  const clickedCard = event.target.closest(".card");
  if (clickedCard) {
    console.log(`📋 Card clicked: ${clickedCard.dataset.id}`);
    clickedCard.classList.toggle("selected");
    return;
  }
});

// Form Handling — preventDefault stops page reload
const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
let nextTaskId = 100;

form.addEventListener("submit", (event) => {
  event.preventDefault();  // Stop page reload!

  const titleValue = taskInput.value.trim();
  if (!titleValue) return;  // Guard clause

  // Validate: no special characters (basic sanitization)
  if (!/^[a-zA-Z0-9\s\-_.,!?]+$/.test(titleValue)) {
    taskInput.style.borderColor = "#FF4C6A";
    console.warn("⚠️ Invalid characters in task title");
    return;
  }

  // Create and add the new card
  const newCard = createTaskCard(
    nextTaskId++,
    titleValue,
    "User-created task",
    prioritySelect.value
  );

  const todoCol = document.querySelector('[data-status="todo"]');
  todoCol.append(newCard);

  // Reset form
  taskInput.value = "";
  taskInput.style.borderColor = "";
  taskInput.focus();

  updateColumnCounts();
  console.log(`✅ Created task: "${titleValue}" [${prioritySelect.value}]`);
});

// Real-time input feedback
taskInput.addEventListener("input", (event) => {
  const value = event.target.value;
  const charCount = value.length;

  if (charCount > 50) {
    taskInput.style.borderColor = "#FF4C6A";  // Error red
  } else if (charCount > 30) {
    taskInput.style.borderColor = "#FF8C42";  // Warning orange
  } else {
    taskInput.style.borderColor = "";  // Reset to default
  }
});

// Keyboard shortcuts on input
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    taskInput.value = "";
    taskInput.blur();
  }
});


// === Part 4: Task Board Capstone — Drag & Drop, Forms & Dynamic UI ===

// --- Drag & Drop Implementation ---

// DRAGSTART — when user starts dragging a card
boardEl.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;

  event.dataTransfer.setData("text/plain", card.dataset.id);
  event.dataTransfer.effectAllowed = "move";

  // Visual feedback
  card.classList.add("dragging");
  console.log(`🎯 Dragging card ${card.dataset.id}`);
});

// DRAGEND — cleanup after drag
boardEl.addEventListener("dragend", (event) => {
  const card = event.target.closest(".card");
  if (card) {
    card.classList.remove("dragging");
  }
  // Remove highlight from all columns
  document.querySelectorAll(".column").forEach(col => {
    col.classList.remove("drag-over");
  });
});

// DRAGOVER — MUST preventDefault to allow dropping!
boardEl.addEventListener("dragover", (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";

  const column = event.target.closest(".column");
  if (column) {
    // Remove highlight from other columns first
    document.querySelectorAll(".column").forEach(col => {
      col.classList.remove("drag-over");
    });
    column.classList.add("drag-over");
  }
});

// DRAGLEAVE — remove highlight when leaving a column
boardEl.addEventListener("dragleave", (event) => {
  const column = event.target.closest(".column");
  if (column && !column.contains(event.relatedTarget)) {
    column.classList.remove("drag-over");
  }
});

// DROP — handle the actual drop
boardEl.addEventListener("drop", (event) => {
  event.preventDefault();

  const column = event.target.closest(".column");
  if (!column) return;

  const cardId = event.dataTransfer.getData("text/plain");
  const card = document.querySelector(`[data-id="${cardId}"]`);

  if (card) {
    column.append(card);
    column.classList.remove("drag-over");

    console.log(`📦 Card ${cardId} moved to ${column.dataset.status}`);
    updateColumnCounts();
  }
});

// --- Column Count Display ---

function updateColumnCounts() {
  const columns = document.querySelectorAll(".column");
  columns.forEach(column => {
    const count = column.querySelectorAll(".card").length;

    let counter = column.querySelector(".column-count");
    if (!counter) {
      counter = document.createElement("span");
      counter.classList.add("column-count");
      column.querySelector("h2").append(counter);
    }
    counter.textContent = count;
  });
}

// Initial count
updateColumnCounts();

// --- Column Toggle (click heading to collapse/expand) ---

document.querySelectorAll(".column h2").forEach(heading => {
  heading.addEventListener("click", (event) => {
    // Don't toggle if clicking the count badge
    if (event.target.classList.contains("column-count")) return;

    const column = heading.closest(".column");
    const cards = column.querySelectorAll(".card");

    cards.forEach(card => {
      card.classList.toggle("hidden");
    });

    column.classList.toggle("collapsed");
  });
});

// --- DocumentFragment for Batch Insertion ---

function addMultipleTasks(tasks) {
  const fragment = document.createDocumentFragment();

  tasks.forEach(task => {
    const card = createTaskCard(
      nextTaskId++,
      task.title,
      task.description,
      task.priority
    );
    fragment.append(card);  // Add to fragment (in memory)
  });

  // ONE DOM insertion — one reflow!
  const todoCol = document.querySelector('[data-status="todo"]');
  todoCol.append(fragment);
  updateColumnCounts();

  console.log(`✅ Added ${tasks.length} tasks in one batch`);
}

// Demo: Add sample tasks on load using DocumentFragment
addMultipleTasks([
  { title: "Write README", description: "Project documentation", priority: "medium" },
  { title: "Fix Login Bug", description: "Session timeout issue", priority: "high" },
  { title: "Add Dark Mode", description: "Theme switcher", priority: "low" }
]);

console.log("\n🎉 Task Board initialized! Try:");
console.log("   • Add a task using the form above");
console.log("   • Drag cards between columns");
console.log("   • Click ✕ to delete a card");
console.log("   • Click a column heading to collapse/expand");
console.log("   • Click a card to select/deselect it");
