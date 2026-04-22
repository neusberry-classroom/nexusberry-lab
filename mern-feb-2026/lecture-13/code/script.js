// ============================================
// Lecture 13 — Smart Content Analyzer & Validator
// String Processing, Pattern Matching & Defensive Error Handling
// NexusBerry Modern Frontend Course
// ============================================

// ============================================
// === Part 1: String Fundamentals & Core Methods ===
// ============================================

// --- Primitives vs String Objects ---
const primitive = "Hello";           // String primitive (use this)
const object = new String("Hello");  // String object (avoid this)

console.log(typeof primitive);  // "string"
console.log(typeof object);    // "object" — different!

// Rule: ALWAYS use string primitives. Never use new String().
// JavaScript auto-wraps primitives when you call methods on them.

// --- Length & Character Access ---
const title = "Smart Content Analyzer";

console.log(`📏 Length: ${title.length}`);           // 22
console.log(`🔤 First char: "${title.charAt(0)}"`);  // "S"
console.log(`🔤 Bracket notation: "${title[6]}"`);   // "C"
console.log(`🔤 Last char (at): "${title.at(-1)}"`); // "r"
console.log(`🔤 Last char (old): "${title[title.length - 1]}"`); // "r"

// --- Unicode Basics ---
const emoji = "Hello 🌍";
console.log(`\n🌐 Unicode length: ${emoji.length}`);  // 8 (not 7!)
// Emoji 🌍 is a two-unit character — .length counts UTF-16 code units, not visible characters

// --- Searching Strings ---
const article = "JavaScript is versatile. JavaScript powers the web.";

console.log("\n🔍 Searching Methods:");
console.log(`  indexOf("JavaScript"): ${article.indexOf("JavaScript")}`);       // 0
console.log(`  lastIndexOf("JavaScript"): ${article.lastIndexOf("JavaScript")}`); // 24
console.log(`  indexOf("Python"): ${article.indexOf("Python")}`);               // -1 (not found)
console.log(`  includes("versatile"): ${article.includes("versatile")}`);       // true
console.log(`  startsWith("JavaScript"): ${article.startsWith("JavaScript")}`); // true
console.log(`  endsWith("web."): ${article.endsWith("web.")}`);                 // true

// includes vs indexOf — when to use which:
// includes() → returns boolean → use for yes/no checks
// indexOf() → returns position → use when you need the location

// --- Extracting Substrings ---
const url = "https://www.nexusberry.com/courses/react";

console.log("\n✂️ Extracting Substrings:");
console.log(`  slice(8, 27): "${url.slice(8, 27)}"`);         // "www.nexusberry.com"
console.log(`  slice(-5): "${url.slice(-5)}"`);                // "react"
console.log(`  substring(8, 27): "${url.substring(8, 27)}"`);  // "www.nexusberry.com"

// slice vs substring:
// slice() supports negative indices — substring() does not
// Recommendation: Always use slice() — it's more predictable

// --- Transforming Strings ---
const userInput = "   John DOE   ";

console.log("\n🔄 Transforming Strings:");
console.log(`  Original: "${userInput}"`);
console.log(`  trim(): "${userInput.trim()}"`);               // "John DOE"
console.log(`  trimStart(): "${userInput.trimStart()}"`);     // "John DOE   "
console.log(`  trimEnd(): "${userInput.trimEnd()}"`);         // "   John DOE"
console.log(`  toLowerCase(): "${userInput.trim().toLowerCase()}"`);  // "john doe"
console.log(`  toUpperCase(): "${userInput.trim().toUpperCase()}"`);  // "JOHN DOE"

// --- Replacing Content ---
const sentence = "I love cats. Cats are great. CATS rule.";

console.log("\n🔁 Replacing Content:");
console.log(`  replace("cats", "dogs"): "${sentence.replace("cats", "dogs")}"`);
// Only replaces FIRST occurrence: "I love dogs. Cats are great. CATS rule."

console.log(`  replaceAll("cats", "dogs"): "${sentence.replaceAll("cats", "dogs")}"`);
// Replaces ALL exact matches: "I love dogs. Cats are great. CATS rule."
// Note: case-sensitive! "Cats" and "CATS" are NOT replaced

// --- Split & Join — String ↔ Array Bridge ---
const csv = "Laptop,Mouse,Keyboard,Monitor";
const words = csv.split(",");
console.log("\n🔗 Split & Join:");
console.log(`  split(","): `, words);           // ["Laptop", "Mouse", "Keyboard", "Monitor"]
console.log(`  join(" | "): "${words.join(" | ")}"`);  // "Laptop | Mouse | Keyboard | Monitor"

// Real-world: parse CSV data, split URLs, tokenize search queries
const paragraph = "Hello world. How are you.";
const wordCount = paragraph.split(" ").length;
console.log(`  Word count: ${wordCount}`);  // 5

// --- Template Literals Deep Dive ---
const product = { name: "Laptop", price: 89999, stock: 15 };

console.log("\n📝 Template Literals:");

// Expression interpolation — any JS expression works
console.log(`  ${product.name}: Rs. ${product.price.toLocaleString()}`);

// Multiline strings — no \n needed
const report = `
  Product Report
  ─────────────
  Name:  ${product.name}
  Price: Rs. ${product.price.toLocaleString()}
  Stock: ${product.stock} units
  Value: Rs. ${(product.price * product.stock).toLocaleString()}
  Status: ${product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
`;
console.log(report);

// Nested template literals
const items = ["HTML", "CSS", "JavaScript"];
console.log(`Skills: ${items.map(s => `[${s}]`).join(" ")}`);
// "Skills: [HTML] [CSS] [JavaScript]"

// --- Padding & Repeating ---
console.log("\n📐 Padding & Repeating:");
console.log(`  "5".padStart(3, "0"): "${"5".padStart(3, "0")}"`);       // "005"
console.log(`  "42".padStart(3, "0"): "${"42".padStart(3, "0")}"`);     // "042"
console.log(`  "Hi".padEnd(10, "."): "${"Hi".padEnd(10, ".")}"`);       // "Hi........"
console.log(`  "─".repeat(30): "${"─".repeat(30)}"`);                    // 30 dashes

// Real-world: formatting invoice numbers, aligning console output, creating separators
const invoiceNum = String(42).padStart(6, "0");
console.log(`  Invoice: INV-${invoiceNum}`);  // INV-000042


// ============================================
// === Part 2: Regular Expressions Fundamentals ===
// ============================================

// --- Creating Regex ---
// Two ways to create:
const literal = /hello/;           // Regex literal — use when pattern is fixed
const dynamic = new RegExp("hello"); // Constructor — use when pattern is a variable

// When to use which:
// /pattern/ → most of the time (cleaner, faster)
// new RegExp(variable) → when the pattern comes from user input or a variable
const searchTerm = "laptop";
const dynamicRegex = new RegExp(searchTerm, "i");  // "i" flag = case-insensitive

// --- Character Classes ---
console.log("\n📋 Character Classes:");

const testString = "Order #42 shipped on 2024-01-15";

console.log(`  \\d test: "${testString}".match(/\\d+/g)`);
console.log(`  Result:`, testString.match(/\d+/g));   // ["42", "2024", "01", "15"]

console.log(`  \\w test: "hello world!".match(/\\w+/g)`);
console.log(`  Result:`, "hello world!".match(/\w+/g));  // ["hello", "world"]

console.log(`  \\s test: "a b  c".match(/\\s+/g)`);
console.log(`  Result:`, "a b  c".match(/\s+/g));  // [" ", "  "]

console.log(`  .  test: "a1 b2".match(/./g)`);
console.log(`  Result:`, "a1 b2".match(/./g));  // ["a", "1", " ", "b", "2"]

// --- Character Sets ---
console.log("\n🎯 Character Sets:");

// Custom ranges
console.log(`  [aeiou]: "Hello World".match(/[aeiou]/gi)`);
console.log(`  Result:`, "Hello World".match(/[aeiou]/gi));  // ["e", "o", "o"]

console.log(`  [A-Z]: "Hello World".match(/[A-Z]/g)`);
console.log(`  Result:`, "Hello World".match(/[A-Z]/g));    // ["H", "W"]

console.log(`  [^0-9]: "abc123".match(/[^0-9]/g)`);
console.log(`  Result:`, "abc123".match(/[^0-9]/g));        // ["a", "b", "c"]
// ^ inside [] means NEGATION — match anything NOT in the set

// --- Quantifiers ---
console.log("\n🔢 Quantifiers:");

const quantTest = "aaa bb c dddd";
console.log(`  String: "${quantTest}"`);
console.log(`  /a+/:`, quantTest.match(/a+/g));      // ["aaa"] — 1 or more a's
console.log(`  /b+/:`, quantTest.match(/b+/g));      // ["bb"] — 1 or more b's
console.log(`  /d{2}/:`, quantTest.match(/d{2}/g));  // ["dd", "dd"] — exactly 2 d's
console.log(`  /d{2,3}/:`, quantTest.match(/d{2,3}/g)); // ["ddd"] — 2 to 3 d's (greedy)

// ? = optional (0 or 1)
console.log(`\n  "colour" matches /colou?r/:`, /colou?r/.test("colour"));  // true
console.log(`  "color" matches /colou?r/:`, /colou?r/.test("color"));    // true
// The "u" is optional — matches both British and American spelling

// --- Anchors & Boundaries ---
console.log("\n⚓ Anchors & Boundaries:");

const text = "cat catalog scattered";
console.log(`  String: "${text}"`);
console.log(`  /cat/ (no anchor):`, text.match(/cat/g));        // ["cat", "cat", "cat"]
console.log(`  /^cat/ (start):`, text.match(/^cat/g));          // ["cat"] — only at start
console.log(`  /\\bcat\\b/ (word boundary):`, text.match(/\bcat\b/g)); // ["cat"] — whole word only

// --- Groups & Alternation ---
console.log("\n🔗 Groups & Alternation:");

// Alternation — OR
console.log(`  /(cat|dog)/:`, "I have a cat and a dog".match(/(cat|dog)/g));
// ["cat", "dog"]

// Capturing groups
const dateStr = "2024-01-15";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(`\n  Date: "${dateStr}"`);
console.log(`  Full match: "${dateMatch[0]}"`);   // "2024-01-15"
console.log(`  Year: "${dateMatch[1]}"`);          // "2024"
console.log(`  Month: "${dateMatch[2]}"`);         // "01"
console.log(`  Day: "${dateMatch[3]}"`);           // "15"

// --- Flags ---
console.log("\n🚩 Regex Flags:");

const flagText = "Hello hello HELLO";
console.log(`  String: "${flagText}"`);
console.log(`  /hello/g:`, flagText.match(/hello/g));      // ["hello"] — case-sensitive
console.log(`  /hello/gi:`, flagText.match(/hello/gi));    // ["Hello", "hello", "HELLO"]

// --- Regex with String Methods ---
console.log("\n🛠️ Regex + String Methods:");

// test() — returns boolean (called on the regex)
console.log(`  /\\d/.test("abc123"):`, /\d/.test("abc123"));  // true
console.log(`  /\\d/.test("abcdef"):`, /\d/.test("abcdef"));  // false

// search() — returns index of first match
console.log(`  "abc123".search(/\\d/):`, "abc123".search(/\d/));  // 3

// match() — returns matches (with g flag: all matches)
console.log(`  "a1b2c3".match(/\\d/g):`, "a1b2c3".match(/\d/g)); // ["1", "2", "3"]

// replace() with regex
const mixed = "I love cats. Cats are great. CATS rule.";
console.log(`\n  Before: "${mixed}"`);
console.log(`  After:  "${mixed.replace(/cats/gi, "dogs")}"`);
// "I love dogs. dogs are great. dogs rule."


// ============================================
// === Part 3: Practical Regex Patterns ===
// ============================================

// --- Email Format Validation ---
console.log("\n📧 Email Validation:");

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

const emails = [
    "user@example.com",        // ✅ valid
    "john.doe@company.co.uk",  // ✅ valid
    "name@domain",             // ❌ missing extension
    "@example.com",            // ❌ missing local part
    "user@.com",               // ❌ missing domain name
    "user name@example.com"    // ❌ space in local part
];

for (const email of emails) {
    const isValid = emailRegex.test(email);
    console.log(`  ${isValid ? "✅" : "❌"} "${email}"`);
}

// --- Phone Number Validation (Pakistan format) ---
console.log("\n📱 Phone Number Validation:");

const phoneRegex = /^(\+92|0)\d{3}-?\d{7}$/;

const phones = [
    "0300-1234567",     // ✅ with dash
    "03001234567",      // ✅ without dash
    "+923001234567",    // ✅ international format
    "300-1234567",      // ❌ missing leading 0 or +92
    "0300-123456",      // ❌ too few digits
    "0300-12345678"     // ❌ too many digits
];

for (const phone of phones) {
    const isValid = phoneRegex.test(phone);
    console.log(`  ${isValid ? "✅" : "❌"} "${phone}"`);
}

// --- Password Strength Validation ---
console.log("\n🔐 Password Strength Checker:");

function checkPasswordStrength(password) {
    const checks = {
        length:    password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit:     /\d/.test(password),
        special:   /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    const passed = Object.values(checks).filter(Boolean).length;

    let strength;
    if (passed <= 2) strength = "🔴 Weak";
    else if (passed <= 3) strength = "🟡 Fair";
    else if (passed <= 4) strength = "🟠 Good";
    else strength = "🟢 Strong";

    return { ...checks, passed, strength };
}

const passwords = ["password", "Password1", "P@ssw0rd!", "12345678", "Tr0ub4dor&3"];
for (const pw of passwords) {
    const result = checkPasswordStrength(pw);
    console.log(`  ${result.strength}: "${pw}" (${result.passed}/5 checks)`);
}

// --- URL Validation ---
console.log("\n🌐 URL Validation:");

const urlRegex = /^https?:\/\/[\w.-]+(:\d+)?(\/[\w./\-?&#=]*)?$/;

const urls = [
    "https://www.nexusberry.com",           // ✅
    "http://localhost:3000",                 // ✅
    "https://api.example.com/users?id=42",  // ✅
    "ftp://files.example.com",              // ❌ not http(s)
    "www.example.com",                      // ❌ missing protocol
    "https://",                             // ❌ missing domain
];

for (const testUrl of urls) {
    const isValid = urlRegex.test(testUrl);
    console.log(`  ${isValid ? "✅" : "❌"} "${testUrl}"`);
}

// --- Practical: Extract All Data from Text ---
console.log("\n📊 Data Extraction from Text:");

const contactInfo = `
    Contact us:
    Email: admin@nexusberry.com or support@nexusberry.com
    Phone: 0328-4500073 or 042-36440443
    Website: https://www.nexusberry.com
    Postal Code: 54000
`;

const extractedEmails = contactInfo.match(/[\w.-]+@[\w.-]+\.\w{2,}/g) || [];
const extractedPhones = contactInfo.match(/\d{3,4}-\d{7,8}/g) || [];
const extractedUrls = contactInfo.match(/https?:\/\/[\w.-]+/g) || [];
const extractedZips = contactInfo.match(/\b\d{5}\b/g) || [];

console.log(`  Emails found: ${extractedEmails.join(", ")}`);
console.log(`  Phones found: ${extractedPhones.join(", ")}`);
console.log(`  URLs found:   ${extractedUrls.join(", ")}`);
console.log(`  Zip codes:    ${extractedZips.join(", ")}`);


// ============================================
// === Part 4: Defensive Error Handling ===
// ============================================

// --- Error Types Demo ---
console.log("\n💥 JavaScript Error Types:\n");

// TypeError — the most common production error
try {
    const user = undefined;
    console.log(user.name);  // 💥 Cannot read properties of undefined
} catch (error) {
    console.log(`  TypeError caught: ${error.message}`);
    console.log(`  Error name: ${error.name}`);
}

// ReferenceError — using undeclared variables
try {
    console.log(unknownVariable);  // 💥 unknownVariable is not defined
} catch (error) {
    console.log(`  ReferenceError caught: ${error.message}`);
}

// RangeError — values out of allowed range
try {
    const arr = new Array(-1);  // 💥 Invalid array length
} catch (error) {
    console.log(`  RangeError caught: ${error.message}`);
}

// --- try/catch/finally — The Full Pattern ---
console.log("\n🛡️ try/catch/finally:");

function parseJSON(jsonString) {
    let result = null;
    try {
        console.log(`  Parsing: "${jsonString}"`);
        result = JSON.parse(jsonString);
        console.log(`  ✅ Parsed successfully:`, result);
    } catch (error) {
        console.log(`  ❌ Parse failed: ${error.message}`);
        result = null;  // Explicit fallback
    } finally {
        console.log(`  🔄 Cleanup complete (finally block always runs)`);
    }
    return result;
}

parseJSON('{"name": "Laptop", "price": 89999}');  // ✅ Valid JSON
parseJSON('{"name": broken}');                      // ❌ Invalid JSON
parseJSON('');                                      // ❌ Empty string

// --- The Error Object ---
console.log("\n📋 Error Object Properties:");

try {
    null.toString();
} catch (error) {
    console.log(`  name:    ${error.name}`);     // "TypeError"
    console.log(`  message: ${error.message}`);  // "Cannot read properties of null"
    console.log(`  stack:   ${error.stack.split("\n")[0]}`);  // First line of stack trace
}

// --- throw — Creating Custom Errors ---
console.log("\n🚨 Custom Errors with throw:");

function validateAge(age) {
    if (typeof age !== "number") {
        throw new TypeError(`Age must be a number, got ${typeof age}`);
    }
    if (age < 0 || age > 150) {
        throw new RangeError(`Age must be 0-150, got ${age}`);
    }
    return `✅ Valid age: ${age}`;
}

const testAges = [25, "thirty", -5, 200, 0, 150];
for (const age of testAges) {
    try {
        console.log(`  ${validateAge(age)}`);
    } catch (error) {
        console.log(`  ❌ ${error.name}: ${error.message}`);
    }
}

// --- Defensive Programming — Guard Clauses ---
console.log("\n🛡️ Defensive Programming — Guard Clauses:");

// GOOD: Guard clauses — fail fast, return early
function processUser(user) {
    if (!user) return "❌ No user provided";
    if (!user.name) return "❌ User has no name";
    if (user.name.trim().length === 0) return "❌ User name is empty";

    // Happy path — only reached if all guards pass
    return `✅ Processing ${user.name}`;
}

console.log(`  ${processUser(null)}`);
console.log(`  ${processUser({})}`);
console.log(`  ${processUser({ name: "   " })}`);
console.log(`  ${processUser({ name: "Rana" })}`);

// --- Input Validation — Combining Regex + Error Handling ---
console.log("\n🔍 Input Validation with Regex + try/catch:");

function validateEmail(email) {
    if (typeof email !== "string") {
        throw new TypeError("Email must be a string");
    }

    const trimmed = email.trim();

    if (trimmed.length === 0) {
        throw new Error("Email cannot be empty");
    }

    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(trimmed)) {
        throw new Error(`Invalid email format: "${trimmed}"`);
    }

    return trimmed.toLowerCase();
}

const emailTests = ["admin@nexusberry.com", "", "not-an-email", 42, "  USER@Gmail.COM  "];
for (const input of emailTests) {
    try {
        const validated = validateEmail(input);
        console.log(`  ✅ Valid: "${validated}"`);
    } catch (error) {
        console.log(`  ❌ ${error.message}`);
    }
}

// --- Fail-Fast Pattern ---
console.log("\n⚡ Fail-Fast Pattern:");

function calculateDiscount(price, discountPercent) {
    // Validate inputs FIRST — before any processing
    if (typeof price !== "number" || isNaN(price)) {
        throw new TypeError(`Price must be a valid number, got: ${price}`);
    }
    if (price < 0) {
        throw new RangeError(`Price cannot be negative: ${price}`);
    }
    if (typeof discountPercent !== "number" || discountPercent < 0 || discountPercent > 100) {
        throw new RangeError(`Discount must be 0-100, got: ${discountPercent}`);
    }

    // Safe to proceed — inputs are validated
    const discount = price * (discountPercent / 100);
    const finalPrice = price - discount;

    return {
        original: price,
        discount: Math.round(discount * 100) / 100,
        final: Math.round(finalPrice * 100) / 100
    };
}

const discountTests = [
    [1000, 20],
    [500, 110],
    [-100, 10],
    ["free", 50]
];

for (const [price, discount] of discountTests) {
    try {
        const result = calculateDiscount(price, discount);
        console.log(`  ✅ Rs. ${result.original} → ${discount}% off → Rs. ${result.final}`);
    } catch (error) {
        console.log(`  ❌ ${error.name}: ${error.message}`);
    }
}

// --- Error Handling Best Practices ---
console.log("\n📌 When to Catch vs When to Propagate:");

// CATCH: When you can handle it meaningfully
function safeParse(json) {
    try {
        return { success: true, data: JSON.parse(json) };
    } catch {
        return { success: false, data: null };
    }
}

// PROPAGATE: When the caller should decide how to handle it
function divide(a, b) {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
}

try {
    console.log(`  10 / 2 = ${divide(10, 2)}`);
    console.log(`  10 / 0 = ${divide(10, 0)}`);
} catch (error) {
    console.log(`  ❌ ${error.message} — showing user-friendly message instead`);
}


// ============================================
// === Part 5: Smart Content Analyzer (Capstone) ===
// ============================================

// --- Content Analyzer Function ---
function analyzeContent(text) {
    // Guard clauses — validate input
    if (typeof text !== "string") {
        throw new TypeError(`Expected string, got ${typeof text}`);
    }

    const trimmed = text.trim();

    if (trimmed.length === 0) {
        throw new Error("Content cannot be empty");
    }

    // --- Basic Statistics ---
    const charCount = trimmed.length;
    const charNoSpaces = trimmed.replace(/\s/g, "").length;
    const analyzerWords = trimmed.split(/\s+/);
    const analyzerWordCount = analyzerWords.length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const paragraphs = trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // --- Readability ---
    const avgWordLength = charNoSpaces / analyzerWordCount;
    const avgSentenceLength = analyzerWordCount / sentenceCount;

    let readabilityLevel;
    if (avgSentenceLength <= 10) readabilityLevel = "🟢 Easy";
    else if (avgSentenceLength <= 20) readabilityLevel = "🟡 Moderate";
    else readabilityLevel = "🔴 Complex";

    // --- Pattern Detection ---
    const detectedEmails = trimmed.match(/[\w.-]+@[\w.-]+\.\w{2,}/g) || [];
    const detectedUrls = trimmed.match(/https?:\/\/[\w.-]+(\/[\w./-]*)?/g) || [];
    const numbers = trimmed.match(/\b\d+\.?\d*\b/g) || [];

    // --- Word Frequency (top 5) ---
    const wordFreq = {};
    const cleanWords = trimmed.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    for (const word of cleanWords) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
    const topWords = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // --- Longest & Shortest Words ---
    const uniqueWords = [...new Set(analyzerWords.map(w => w.replace(/[^a-zA-Z]/g, "").toLowerCase()))].filter(w => w.length > 0);
    const longestWord = uniqueWords.reduce((a, b) => a.length >= b.length ? a : b, "");
    const shortestWord = uniqueWords.reduce((a, b) => a.length <= b.length ? a : b, uniqueWords[0] || "");

    return {
        charCount,
        charNoSpaces,
        wordCount: analyzerWordCount,
        sentenceCount,
        paragraphCount,
        avgWordLength: Math.round(avgWordLength * 10) / 10,
        avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
        readabilityLevel,
        emails: detectedEmails,
        urls: detectedUrls,
        numbers,
        topWords,
        longestWord,
        shortestWord
    };
}

// --- Report Generator ---
function generateReport(analysis) {
    const divider = "═".repeat(50);

    return `
${divider}
   📊 SMART CONTENT ANALYZER — REPORT
${divider}

📏 Basic Statistics:
   Characters (with spaces):    ${analysis.charCount}
   Characters (without spaces): ${analysis.charNoSpaces}
   Words:                        ${analysis.wordCount}
   Sentences:                    ${analysis.sentenceCount}
   Paragraphs:                   ${analysis.paragraphCount}

📖 Readability:
   Avg word length:     ${analysis.avgWordLength} characters
   Avg sentence length: ${analysis.avgSentenceLength} words
   Reading level:       ${analysis.readabilityLevel}

🔤 Word Analysis:
   Longest word:  "${analysis.longestWord}"
   Shortest word: "${analysis.shortestWord}"
   Top words: ${analysis.topWords.map(([w, c]) => `${w} (${c})`).join(", ")}

🔍 Detected Patterns:
   Emails: ${analysis.emails.length > 0 ? analysis.emails.join(", ") : "None found"}
   URLs:   ${analysis.urls.length > 0 ? analysis.urls.join(", ") : "None found"}
   Numbers: ${analysis.numbers.length > 0 ? analysis.numbers.join(", ") : "None found"}

${divider}`;
}

// --- Test with Real Content ---
const sampleText = `
NexusBerry Training and Solutions offers the best programming courses in Lahore.
Our Modern Frontend course covers 36 lectures over 3 months. Students learn HTML, CSS, JavaScript, TypeScript, React, and Next.js.

Contact us at admin@nexusberry.com or visit https://www.nexusberry.com for details.
Phone: 0328-4500073. We have trained over 500 students since 2020.

Our instructors have 25 years of production experience. Join the next batch starting soon!
`;

try {
    const analysis = analyzeContent(sampleText);
    console.log(generateReport(analysis));
} catch (error) {
    console.log(`❌ Analysis failed: ${error.message}`);
}

// --- Test Error Handling ---
console.log("\n🧪 Error Handling Tests:");

const errorTests = [null, "", 42, "   "];
for (const input of errorTests) {
    try {
        analyzeContent(input);
        console.log(`  ✅ "${input}" — analyzed`);
    } catch (error) {
        console.log(`  ❌ ${error.name}: ${error.message}`);
    }
}

// --- TypeScript String Utilities Preview ---
console.log("\n📘 TypeScript String Types (Preview):");
console.log("  Template literal types create precise string patterns:");
console.log('  type Color = "red" | "green" | "blue";');
console.log('  type Size = "sm" | "md" | "lg";');
console.log('  type CSSClass = `${Size}-${Color}`;');
console.log('  // "sm-red" | "sm-green" | "sm-blue" | "md-red" | ... (9 combinations)');
console.log("");
console.log("  String union narrowing with switch:");
console.log('  function handle(status: "loading" | "success" | "error") {');
console.log('    switch (status) {');
console.log('      case "loading": return "⏳";');
console.log('      case "success": return "✅";');
console.log('      case "error": return "❌";');
console.log("    }  // TypeScript ensures all cases covered");
console.log("  }");
