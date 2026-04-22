// ============================================
// Lecture 16 — DEBUG VERSION (Intentional Bugs)
// Interactive Task Board with Drag & Drop
// NexusBerry Modern Frontend Course
// ============================================
// This file contains intentional bugs discussed during the lecture.
// Each bug is marked with 🐛 and followed by the fix.
// Use this for debugging practice!


// === Bug 1: querySelector Returns null — Unchecked Access ===

// 🐛 Bug: Element doesn't exist — querySelector returns null
const sidebar = document.querySelector(".sidebar");  // null!
// console.log(sidebar.textContent);
// 💥 TypeError: Cannot read properties of null

// FIX: Always check before accessing properties
const sidebar2 = document.querySelector(".sidebar");
if (sidebar2) {
  console.log(sidebar2.textContent);
} else {
  console.log("Bug 1: Sidebar not found — handled gracefully");
}

// Alternative: Optional chaining
const sidebarText = document.querySelector(".sidebar")?.textContent;
console.log("Bug 1 (optional chaining):", sidebarText);  // undefined — no crash


// === Bug 2: innerHTML Wipes Event Listeners ===

// 🐛 Bug: innerHTML destroys existing event listeners!
const demoColumn = document.querySelector(".column");

// Assume we added click handlers to all cards...
// demoColumn.querySelectorAll(".card").forEach(card => {
//   card.addEventListener("click", () => console.log("Card clicked!"));
// });
//
// // Now add a new card with innerHTML:
// demoColumn.innerHTML += '<div class="card">New Card</div>';
// 💥 ALL existing card click handlers are GONE!

// FIX: Use createElement + append
// const newCard = document.createElement("div");
// newCard.classList.add("card");
// newCard.textContent = "New Card";
// demoColumn.append(newCard);
// ✅ Existing event listeners preserved!
console.log("Bug 2: innerHTML += destroys listeners — use append() instead");


// === Bug 3: Listeners on Dynamic Elements Don't Work ===

// 🐛 Bug: Adding listeners BEFORE elements exist
// document.querySelectorAll(".card").forEach(card => {
//   card.addEventListener("click", () => {
//     console.log("Card clicked:", card.dataset.id);
//   });
// });
//
// // Later: add a new card dynamically
// const newCard = createTaskCard(99, "New", "Desc", "high");
// todoColumn.append(newCard);
// 💥 Clicking newCard does NOTHING — not in original NodeList!

// FIX: Use event delegation on the parent
// board.addEventListener("click", (e) => {
//   const card = e.target.closest(".card");
//   if (card) {
//     console.log("Card clicked:", card.dataset.id);  // ✅ Works for ALL cards
//   }
// });
console.log("Bug 3: Use event delegation for dynamic elements");


// === Bug 4: removeEventListener with Arrow Function ===

// 🐛 Bug: Can't remove anonymous function
const testBtn = document.createElement("button");
testBtn.textContent = "Test Button";

// This does NOT work:
// testBtn.addEventListener("click", () => console.log("Clicked!"));
// testBtn.removeEventListener("click", () => console.log("Clicked!"));
// Each arrow function is a NEW reference — they don't match!

// FIX: Store the reference
const handler = () => console.log("Bug 4: Named handler clicked!");
testBtn.addEventListener("click", handler);
// testBtn.removeEventListener("click", handler);  // ✅ Works with same reference
console.log("Bug 4: Store handler in variable for removeEventListener");


// === Bug 5: Drag & Drop — Forgot preventDefault on dragover ===

// 🐛 Bug: Drop event never fires!
// column.addEventListener("dragover", (event) => {
//   // Missing: event.preventDefault();
//   console.log("Dragover fires, but drop won't work!");
// });
//
// column.addEventListener("drop", (event) => {
//   console.log("This NEVER fires without preventDefault on dragover");
// });

// FIX: Always preventDefault on dragover
// column.addEventListener("dragover", (event) => {
//   event.preventDefault();  // ← This enables dropping
//   event.dataTransfer.dropEffect = "move";
// });
console.log("Bug 5: Must preventDefault() on dragover to allow drops");


// === Bug 6: className Overwrites All Classes ===

// 🐛 Bug: className replaces everything
const bugCard = document.querySelector(".card");
if (bugCard) {
  const originalClasses = [...bugCard.classList];
  console.log("Bug 6: Original classes:", originalClasses);

  // DON'T DO THIS:
  // bugCard.className = "highlighted";
  // 💥 Removes "card", "priority-high", everything!

  // FIX: Use classList.add
  // bugCard.classList.add("highlighted");
  // ✅ Keeps all existing classes, adds new one
  console.log("Bug 6: Use classList.add(), never set className directly");
}


// === Bug 7: dataset Values Are Always Strings ===

// 🐛 Bug: Comparing string to number
const testCard = document.querySelector('[data-id="1"]');
if (testCard) {
  // This is ALWAYS false:
  const wrongComparison = testCard.dataset.id === 1;
  console.log("Bug 7: dataset.id === 1 →", wrongComparison);  // false!

  // FIX: Convert to number first
  const rightComparison = parseInt(testCard.dataset.id) === 1;
  console.log("Bug 7: parseInt(dataset.id) === 1 →", rightComparison);  // true!
}


console.log("\n🐛 All debug examples loaded. Review each bug and its fix above.");
console.log("   Switch to script.js for the working version.");
