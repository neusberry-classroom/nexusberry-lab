// ============================================
// Enterprise Data Transformer — DEBUG VERSION
// Lecture 12: Intentional bugs for Live Debugging sessions
// NexusBerry Modern Frontend Course
// ============================================
// This file contains INTENTIONAL BUGS demonstrated during lecture.
// Compare with script.js to see the correct versions.


// === Debug 1: Destructuring a non-existent nested path ===
// (From Part 1 — Live Debugging)

console.log("=== Debug 1: Destructuring Non-Existent Path ===");

const apiResponse = {
    data: {
        users: [
            { name: "Ali", email: "ali@test.com" }
        ]
    }
};

// This works fine:
const { data: { users: [firstUser] } } = apiResponse;
console.log("First user:", firstUser);

// But what if the API returns an empty array?
const emptyResponse = { data: { users: [] } };
const { data: { users: [firstUserSafe] } } = emptyResponse;
console.log("Empty array result:", firstUserSafe); // undefined — no crash, but no data

// What if the API returns no `users` key at all?
const brokenResponse = { data: {} };

// BUG: This crashes!
try {
    const { data: { users: [user1] } } = brokenResponse;
} catch (error) {
    console.log("Error:", error.message);
    // TypeError: Cannot read properties of undefined (reading '0')
    // Because `data.users` is undefined, and you can't access [0] on undefined
}

// FIX: Provide defaults at each level
const { data: { users: [user1] = [] } = {} } = brokenResponse;
console.log("Safe result:", user1); // undefined — safe, no crash


// === Debug 2: Mutation bug in addSkill function ===
// (From Part 2 — Live Debugging)

console.log("\n=== Debug 2: Mutation Bug ===");

function addSkill(employee, newSkill) {
    // BUG: This mutates the original employee object!
    employee.skills.push(newSkill);
    return employee;
}

const dev = { name: "Zara", skills: ["JS", "CSS"] };
const updatedDev = addSkill(dev, "React");

console.log("Original skills:", dev.skills);
// Expected: ["JS", "CSS"]
// Actual: ["JS", "CSS", "React"] — MUTATED!

console.log("Same object?", updatedDev === dev);
// Expected: false (new object)
// Actual: true — it's the SAME object!

// FIX: See script.js — addSkillSafe uses spread at both levels:
// return { ...employee, skills: [...employee.skills, newSkill] };


// === Debug 3: Shallow copy trap ===
// (From Part 2 — Interactive Question)

console.log("\n=== Debug 3: Shallow Copy Trap ===");

const original = { name: "Report", tags: ["urgent", "Q1"] };
const copy = { ...original };

// This LOOKS safe — we made a copy...
copy.tags.push("reviewed");
copy.name = "Report v2";

console.log("original.name:", original.name);
// "Report" — top-level string is safe

console.log("original.tags:", original.tags);
// ["urgent", "Q1", "reviewed"] — MUTATED!
// Nested array is shared between original and copy

// FIX: Use structuredClone(original) for deep copy
// Or: const copy = { ...original, tags: [...original.tags] };


// === Debug 4: for...in iterates inherited properties ===
// (From Part 3 — Live Debugging)

console.log("\n=== Debug 4: for...in Prototype Leak ===");

function Employee(name) {
    this.name = name;
}
Employee.prototype.company = "TechCorp"; // Inherited property

const emp = new Employee("Ali");
emp.role = "Developer";

// BUG: for...in iterates inherited properties too!
console.log("for...in (includes prototype!):");
for (const key in emp) {
    console.log(`  ${key}: ${emp[key]}`);
}
// Logs: name, role, AND company (from prototype)

// FIX 1: hasOwnProperty check
console.log("\nWith hasOwnProperty:");
for (const key in emp) {
    if (emp.hasOwnProperty(key)) {
        console.log(`  ${key}: ${emp[key]}`);
    }
}

// FIX 2 (best): Use Object.keys or Object.entries
console.log("\nWith Object.entries:");
Object.entries(emp).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});


// === Debug 5: Nested config merge trap ===
// (From Part 4 — Live Debugging)

console.log("\n=== Debug 5: Nested Config Merge Trap ===");

const appDefaults = {
    api: { baseUrl: "https://api.default.com", timeout: 5000, retries: 3 },
    ui: { theme: "dark", animations: true }
};

const envConfig = {
    api: { baseUrl: "https://api.production.com" }
    // Only overriding baseUrl — want to keep timeout and retries!
};

// BUG: Shallow spread replaces entire api object
const broken = { ...appDefaults, ...envConfig };
console.log("Broken config:", broken.api);
// { baseUrl: "https://api.production.com" }
// timeout and retries are GONE!

// FIX: Spread at each nested level
const correct = {
    ...appDefaults,
    ...envConfig,
    api: { ...appDefaults.api, ...envConfig.api },
    ui: { ...appDefaults.ui, ...(envConfig.ui || {}) }
};
console.log("Correct config:", correct.api);
// { baseUrl: "https://api.production.com", timeout: 5000, retries: 3 }


// === Debug 6: Destructuring undefined ===
// (From Part 1 — Interactive Question)

console.log("\n=== Debug 6: Destructuring Undefined ===");

const user = { name: "Zara", settings: undefined };

// BUG: This crashes!
try {
    const { settings: { theme } } = user;
} catch (error) {
    console.log("Error:", error.message);
    // TypeError: Cannot destructure property 'theme' of undefined
}

// FIX: Provide default at the nested level
const { settings: { theme } = {} } = user;
console.log("Safe theme:", theme); // undefined — no crash


console.log("\n=== Debug Version Complete ===");
console.log("Compare each bug with the fix in script.js");
