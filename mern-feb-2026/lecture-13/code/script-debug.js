// ============================================
// Lecture 13 — Debug Version (Intentional Bugs)
// Smart Content Analyzer & Validator
// NexusBerry Modern Frontend Course
// ============================================
// This file contains intentional bugs from the "Live Debugging" sections.
// Use this to practice finding and fixing common string/regex/error handling mistakes.

// ============================================
// Bug 1: Case-sensitive comparison fails on user input
// (Part 1 — Live Debugging)
// ============================================

console.log("🐛 Bug 1: Case-Sensitive Domain Comparison\n");

const userEmail = "John.Doe@Gmail.COM";
const allowedDomain = "gmail.com";

// WRONG: Direct comparison is case-sensitive
const domain = userEmail.split("@")[1];
if (domain === allowedDomain) {
    console.log("Gmail user!");  // Never runs!
} else {
    console.log(`  ❌ Domain "${domain}" didn't match "${allowedDomain}"`);
    console.log("  BUG: Case-sensitive comparison — Gmail.COM !== gmail.com");
}

// FIX: Normalize to lowercase before comparing
// const domainNormalized = userEmail.split("@")[1].toLowerCase();
// if (domainNormalized === allowedDomain) {
//     console.log("Gmail user!");  // ✅ Now works
// }


// ============================================
// Bug 2: Regex without anchors accepts partial matches
// (Part 2 — Live Debugging)
// ============================================

console.log("\n🐛 Bug 2: Regex Without Anchors\n");

function isValidZipCode(zip) {
    return /\d{5}/.test(zip);  // Looks correct...
}

console.log(`  isValidZipCode("12345"):       ${isValidZipCode("12345")}`);       // true ✅
console.log(`  isValidZipCode("123456789"):   ${isValidZipCode("123456789")}`);   // true — WRONG!
console.log(`  isValidZipCode("abc12345xyz"): ${isValidZipCode("abc12345xyz")}`); // true — WRONG!
console.log("  BUG: Without ^ and $, regex finds 5 digits WITHIN the string");

// FIX: Add anchors to enforce exact match
// function isValidZipCodeFixed(zip) {
//     return /^\d{5}$/.test(zip);
// }


// ============================================
// Bug 3: Forgot to escape the dot in regex
// (Part 3 — Live Debugging)
// ============================================

console.log("\n🐛 Bug 3: Unescaped Dot in Regex\n");

const badUrlRegex = /^https?:\/\/[\w-]+.[\w.]+$/;  // . matches ANY character!

console.log(`  badUrlRegex.test("https://exampleXcom"): ${badUrlRegex.test("https://exampleXcom")}`);
// true — WRONG! The . matched "X"
console.log("  BUG: Unescaped . matches ANY character, not just a period");

// FIX: Escape the dot
// const goodUrlRegex = /^https?:\/\/[\w-]+\.[\w.]+$/;
// console.log(goodUrlRegex.test("https://exampleXcom"));  // false ✅
// console.log(goodUrlRegex.test("https://example.com"));  // true ✅


// ============================================
// Bug 4: Silent catch block — errors swallowed
// (Part 4 — Live Debugging)
// ============================================

console.log("\n🐛 Bug 4: Silent Catch Block\n");

function processOrder(orderJson) {
    try {
        const order = JSON.parse(orderJson);
        return order.total;
    } catch {
        return 0;  // BUG: Silently returns 0 — bad orders look like $0 orders
    }
}

console.log(`  processOrder('{"total": 500}'): ${processOrder('{"total": 500}')}`);  // 500 ✅
console.log(`  processOrder('invalid'):        ${processOrder('invalid')}`);          // 0 — WRONG!
console.log("  BUG: Invalid JSON silently returns 0 — looks like a $0 order, not an error");

// FIX: Always log errors, even when providing a fallback
// function processOrderFixed(orderJson) {
//     try {
//         const order = JSON.parse(orderJson);
//         return { success: true, total: order.total };
//     } catch (error) {
//         console.error(`Order processing failed: ${error.message}`);
//         return { success: false, total: 0, error: error.message };
//     }
// }


// ============================================
// Bug 5: Calling string methods without capturing result
// (Common Mistake — Part 1)
// ============================================

console.log("\n🐛 Bug 5: String Immutability Trap\n");

const input = "  Hello  ";
input.trim();  // BUG: Return value not captured!

if (input === "Hello") {
    console.log("  Match!");
} else {
    console.log(`  ❌ No match — input is still: "${input}"`);
    console.log("  BUG: trim() returns a NEW string — original is unchanged");
}

// FIX: Capture the return value
// const cleaned = input.trim();
// if (cleaned === "Hello") {
//     console.log("Match!");  // ✅ Works
// }


console.log("\n" + "═".repeat(50));
console.log("  🔧 Fix all 5 bugs by uncommenting the FIX sections!");
console.log("═".repeat(50));
