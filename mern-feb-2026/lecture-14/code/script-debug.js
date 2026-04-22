// DEBUG VERSION — contains intentional bugs for live debugging demo
// Lecture 14: Asynchronous JavaScript
// NexusBerry Modern Frontend Course
//
// Instructions: Run this file and find the 4 bugs.
// Each bug is marked with a 🐛 comment.
// Try to fix each one before looking at the FIX comment below it.

// ============================================
// 🐛 Bug 1: setInterval Without clearInterval — Memory Leak
// See Part 1: Timer cleanup
// ============================================

console.log("🐛 Bug 1: Interval that never stops");

let counter = 0;
setInterval(() => {
  counter++;
  console.log(`Running... ${counter}`);
}, 1000);

// This interval NEVER stops. In a browser, it keeps running
// even after you navigate away from the component.
// In React, this causes memory leaks in useEffect.

// FIX: Always capture the ID and clear it
// const id = setInterval(() => {
//   counter++;
//   console.log(`Running... ${counter}`);
//   if (counter >= 5) clearInterval(id);
// }, 1000);


// ============================================
// 🐛 Bug 2: Missing return Inside .then() Chain
// See Part 2: Promise chaining
// ============================================

console.log("\n🐛 Bug 2: Missing return in .then() chain");

function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Rana Ajmal" }), 300);
  });
}

function getOrdersForUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 101, product: "Laptop" }]), 300);
  });
}

getUser(1)
  .then(user => {
    console.log(`Got user: ${user.name}`);
    getOrdersForUser(user.id);  // ← BUG: MISSING return!
  })
  .then(orders => {
    // orders is undefined because the previous .then() didn't return a Promise
    console.log(`Orders: ${orders.length}`);  // 💥 TypeError: Cannot read property 'length' of undefined
  })
  .catch(error => console.error(`Caught: ${error.message}`));

// FIX: Add return before getOrdersForUser(user.id);
// .then(user => {
//   console.log(`Got user: ${user.name}`);
//   return getOrdersForUser(user.id);  // ← return the Promise!
// })


// ============================================
// 🐛 Bug 3: await in a Regular (Non-async) Function
// See Part 3: async/await rules
// ============================================

console.log("\n🐛 Bug 3: await outside async function");

// Uncomment the function below to see the SyntaxError:
// function loadData() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//   return data;
// }
// SyntaxError: await is only valid in async functions and the top level of modules

// FIX: Add the async keyword
// async function loadData() {
//   const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//   return data;
// }

console.log("  (Uncomment the function above to see the SyntaxError)");


// ============================================
// 🐛 Bug 4: Not Checking response.ok with fetch
// See Part 4: fetch two failure points
// ============================================

console.log("\n🐛 Bug 4: fetch without response.ok check");

async function getUserBuggy(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    // BUG: No response.ok check!
    // fetch resolves even for 404 — it only rejects on network failures.
    // For id=99999, the server returns 404 but this code treats it as success.
    const user = await response.json();
    console.log(`  Got user: ${JSON.stringify(user)}`);
    return user;
  } catch (error) {
    console.error(`  Failed: ${error.message}`);
  }
}

// This will "succeed" even though the user doesn't exist!
getUserBuggy(99999).then(user => {
  if (user && Object.keys(user).length === 0) {
    console.log("  ⚠️ Empty object returned — the 404 wasn't caught!");
  }
});

// FIX: Add the response.ok check
// async function getUserFixed(id) {
//   try {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
//     const user = await response.json();
//     console.log(`  Got user: ${user.name}`);
//     return user;
//   } catch (error) {
//     console.error(`  Failed: ${error.message}`);
//     return null;
//   }
// }
