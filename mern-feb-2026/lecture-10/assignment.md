# Assignment: Inventory Management System

## Overview
Build your own Inventory Management System that processes a product catalog through multiple operations — listing, calculating, searching, filtering, updating, and reporting — using every loop type and array method covered in Lecture 10. This is the kind of data processing logic found in every real-world application: e-commerce product catalogs, warehouse management, logistics tracking, and financial reporting. Mastering it here means you can process any dataset anywhere.

---

## Requirements

Your Inventory Management System must meet all of the following requirements.

### 1. Product Inventory Data
- Create an inventory array with **at least 10 product objects**, each containing:
  - `id` (number), `name` (string), `category` (string), `price` (number), `stock` (number)
- Include **at least 3 different categories** (e.g., Electronics, Furniture, Stationery, Clothing, Food)
- Include **at least 2 products with `stock: 0`** (out of stock)
- Include **at least 2 products with stock below 10** (low stock)
- Use realistic product names and prices (in Rs.)

### 2. Product Listing (`for` loop with index)
- Use a `for` loop to display all products in a **formatted table**
- Each row must include: number (1-based), product name, category, price (formatted with `toLocaleString()`), stock quantity, and a **status indicator**:

| Stock Level | Status |
|-------------|--------|
| 0 | OUT OF STOCK |
| 1–9 | LOW STOCK |
| 10+ | In Stock |

- Use **conditional logic inside the loop** (L9 + L10 combined) to determine each status
- Add visual separators (e.g., `─` repeat lines) above and below the listing

### 3. Total Inventory Value (`for` loop + accumulator)
- Calculate the **total inventory value** by multiplying `price × stock` for each product
- Track the **total number of items** across all products
- Display both values after the product listing
- The accumulator must be declared **before** the loop and used **after** it

### 4. Product Search (`while` + `break`)
- Implement a search feature using a `while` loop
- Search must be **case-insensitive** (normalize with `.toLowerCase()`)
- Use `break` to stop searching after the first match
- Display the found product's full details, or a "not found" message
- Search for at least **2 different terms** in your code (one that finds a match, one that doesn't)

### 5. Filtered Display (`for` + `continue`)
- Use `continue` to skip products that don't match a condition
- Implement at least **one** of these filters:
  - Low stock items (stock < threshold)
  - Products in a specific category
  - Products above a certain price
- Build a results array using `push` during the filtered iteration
- Display the count of filtered items at the end

### 6. Nested Loop Feature
Use a nested loop for at least **one** of these features:
- **Cross-checking**: Compare two arrays (e.g., order list vs inventory) to find available/unavailable items
- **Grid display**: Generate a warehouse grid (rows × columns) with slot IDs
- **Multi-criteria processing**: Check each product against multiple conditions

### 7. Array Methods (at least 3)
Demonstrate at least **3 array methods** from the following:
- **Required:** `push` (used in at least one feature)
- **Required:** `splice` (insert, remove, or replace at least one product)
- **Required:** One non-mutating method: `slice`, `concat`, `indexOf`, or `includes`
- Add a **comment** above each method call explaining what it does and whether it mutates

### 8. Iteration with `for...of` and `for...in`
- Use `for...of` for at least **one** array iteration (e.g., final report summary)
- Use `for...in` for at least **one** object iteration (e.g., displaying a single product's properties, or iterating a category summary object)
- Add a comment noting which gives **values** and which gives **keys**

### 9. Array Destructuring (Preview)
- Use array destructuring to extract values from an array in at least **one** place
- Example: `const [first, second, ...rest] = topProducts;`
- This is a preview — you do not need to use it extensively

### 10. Final Inventory Report
Print a **formatted summary report** to the console that includes:
- Total number of products
- Count of in-stock vs out-of-stock products
- Number of items needing reorder (low stock)
- Total inventory value (formatted with `toLocaleString()`)
- Use visual separators (e.g., `========` lines) for readability

---

## Example Structure

The example below shows the expected code pattern for the product listing section. Your full submission should follow this same style across all sections.

```javascript
// ============================================
// Inventory Management System
// Assignment — Lecture 10
// Your Name
// ============================================

// --- Product Inventory Data ---
const inventory = [
    { id: 1, name: "Laptop", category: "Electronics", price: 89999, stock: 15 },
    { id: 2, name: "Mouse", category: "Electronics", price: 1999, stock: 150 },
    // ... at least 10 products total ...
];

// --- Feature 1: Product Listing (for loop) ---
console.log("========================================");
console.log("   INVENTORY MANAGEMENT SYSTEM");
console.log("========================================\n");

for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];  // Extract for cleaner access
    const status = product.stock === 0 ? "OUT OF STOCK"
        : product.stock < 10 ? "LOW STOCK"
        : "In Stock";

    console.log(`  ${product.id}. ${product.name} | ${product.category} | Rs. ${product.price.toLocaleString()} | Stock: ${product.stock} | ${status}`);
}

// --- Feature 2: Total Value (accumulator) ---
let totalValue = 0;
for (let i = 0; i < inventory.length; i++) {
    totalValue += inventory[i].price * inventory[i].stock;
}
console.log(`Total Value: Rs. ${totalValue.toLocaleString()}`);

// --- Feature 3: Search (while + break) ---
const searchTerm = "laptop";
let idx = 0;
let found = null;

while (idx < inventory.length) {
    if (inventory[idx].name.toLowerCase().includes(searchTerm.toLowerCase())) {
        found = inventory[idx];
        break;  // Stop on first match
    }
    idx++;
}

// --- Feature 4: Filter (for + continue) ---
// ... your filtered display here ...

// --- Feature 5: Nested Loop ---
// ... your cross-check or grid here ...

// --- Feature 6: Array Methods ---
// push — add a new product (MUTATES original)
inventory.push({ id: 11, name: "Tablet", category: "Electronics", price: 45999, stock: 20 });

// splice — remove product at index 2 (MUTATES original)
inventory.splice(2, 1);

// includes — check if a name exists (NON-MUTATING)
const names = inventory.map(p => p.name);  // or use a for loop
console.log("Has Laptop?", names.includes("Laptop"));

// --- Feature 7: for...of and for...in ---
// for...of gives VALUES (use for arrays)
for (const product of inventory) {
    // process each product...
}

// for...in gives KEYS (use for objects)
const sampleProduct = inventory[0];
for (const key in sampleProduct) {
    console.log(`${key}: ${sampleProduct[key]}`);
}

// --- Feature 8: Destructuring Preview ---
const [topSeller, runnerUp, ...others] = inventory;
console.log("Top seller:", topSeller.name);

// --- Feature 9: Final Report ---
console.log("========================================");
console.log("   FINAL INVENTORY REPORT");
// ... summary statistics ...
console.log("========================================");
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class — contains all loop types and array method reference tables
- **MDN Reference**: [for statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- **MDN Reference**: [while statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)
- **MDN Reference**: [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **MDN Reference**: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

---

## Submission Instructions

1. Create a folder named `assignment-10-your-name/`
2. Include your project file: `inventory.js`
3. Compress to ZIP or push to a GitHub repository
4. Upload to Google Classroom before the deadline
5. **Important:** Your file must run without errors using `node inventory.js` in the terminal

**Deadline:** Before Lecture 11

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] Inventory array has at least 10 products with id, name, category, price, stock
- [ ] At least 3 categories, 2 out-of-stock products, 2 low-stock products
- [ ] `for` loop displays all products with numbering and status indicators
- [ ] Accumulator pattern calculates total inventory value (declared before loop, used after)
- [ ] `while` loop implements case-insensitive search with `break` on first match
- [ ] `continue` skips non-matching products in a filter feature
- [ ] At least one nested loop (cross-check, grid, or multi-criteria)
- [ ] `push` used at least once (with comment noting it mutates)
- [ ] `splice` used at least once (insert, remove, or replace)
- [ ] One non-mutating method used (`slice`, `concat`, `indexOf`, or `includes`)
- [ ] `for...of` used for at least one array iteration
- [ ] `for...in` used for at least one object iteration
- [ ] Array destructuring used at least once
- [ ] Final report includes: total products, in-stock count, out-of-stock count, reorder count, total value
- [ ] No `var` anywhere — only `const` and `let`
- [ ] All comparisons use `===` and `!==` (never `==` or `!=`)
- [ ] Code runs without errors: `node inventory.js`

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **Product Data & Listing** — 10+ products with required fields, `for` loop display with status indicators, formatted output with separators | 15 |
| **Calculations & Accumulation** — Total inventory value using accumulator pattern, total items count, correct `price × stock` computation | 15 |
| **Search Feature** — `while` loop with `break`, case-insensitive `.toLowerCase()`, found/not-found messages, 2+ search demos | 15 |
| **Filtering & Loop Control** — `continue` to skip non-matching items, `push` to build results array, filtered count display | 15 |
| **Nested Loop & Array Methods** — Nested loop feature (cross-check/grid/multi-criteria), `push` + `splice` + one non-mutating method with comments | 15 |
| **Modern Iteration & Destructuring** — `for...of` for arrays, `for...in` for objects, array destructuring, final formatted report with all stats | 15 |
| **Code Quality & Best Practices** — Proper indentation, meaningful variable names, `const`/`let` only, `===` only, Part comments, runs without errors | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A submission that attempts all sections but has minor bugs will score higher than one that perfects only three sections.

---

> **You've made code that repeats, searches, filters, and reports.** That's the foundation of every data-driven application you'll ever build. In Lecture 11, these loops get superpowers — `map`, `filter`, `reduce` replace entire loop blocks with single lines. Keep building. Every professional started exactly where you are now.

---

*NexusBerry Modern Frontend Course — Lecture 10*
*Instructor: Rana M. Ajmal*
