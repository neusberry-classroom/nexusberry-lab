// ============================================
// Enterprise Data Transformer
// Lecture 12: Destructuring, Spread & Object Mastery
// NexusBerry Modern Frontend Course
// ============================================


// ============================================
// === Part 1: Objects Deep Dive & Destructuring Foundations ===
// ============================================

// --- Objects recap: property shorthand ---
const name = "TechCorp";
const industry = "Technology";
const employees = 250;

// OLD way — repetitive
const companyOld = { name: name, industry: industry, employees: employees };

// NEW way — property shorthand (when variable name matches key)
const company = { name, industry, employees };
console.log("=== Property Shorthand ===");
console.log(company);
// { name: "TechCorp", industry: "Technology", employees: 250 }

// --- Computed property names ---
const field = "revenue";
const year = 2025;

const report = {
    [field]: 5000000,              // key is "revenue"
    [`${field}_${year}`]: 5000000, // key is "revenue_2025"
    [field + "Growth"]: 12.5       // key is "revenueGrowth"
};
console.log("\n=== Computed Property Names ===");
console.log(report);
// { revenue: 5000000, revenue_2025: 5000000, revenueGrowth: 12.5 }

// --- Object destructuring basics ---
const employee = {
    firstName: "Sara",
    lastName: "Ahmed",
    role: "Senior Engineer",
    department: "Engineering",
    salary: 95000,
    isRemote: true
};

console.log("\n=== Object Destructuring ===");

// Extract specific properties into variables
const { firstName, role, department } = employee;
console.log(firstName);   // "Sara"
console.log(role);        // "Senior Engineer"
console.log(department);  // "Engineering"

// --- Renaming during destructuring ---
// What if a variable named "role" already exists?
const { role: jobTitle, salary: annualPay } = employee;
console.log("Renamed:", jobTitle, annualPay);
// "Senior Engineer" 95000

// --- Default values ---
const { firstName: fName, team = "Unassigned", office = "HQ" } = employee;
console.log("Defaults:", fName, team, office);
// "Sara" "Unassigned" "HQ"

// --- Array destructuring ---
console.log("\n=== Array Destructuring ===");
const scores = [95, 88, 72, 64, 91];

const [first, second, third] = scores;
console.log("First three:", first, second, third);
// 95 88 72

// Skipping elements
const [, , thirdScore, , fifthScore] = scores;
console.log("Skipped:", thirdScore, fifthScore);
// 72 91

// Swapping variables — the classic destructuring trick
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log("Swapped:", a, b); // 20 10
// No temporary variable needed!

// --- Nested destructuring ---
console.log("\n=== Nested Destructuring ===");
const employeeRecord = {
    id: "EMP-001",
    personal: {
        name: "Ali Khan",
        age: 30,
        address: {
            city: "Lahore",
            country: "Pakistan"
        }
    },
    professional: {
        title: "Lead Developer",
        skills: ["React", "Node.js", "TypeScript"]
    }
};

// Extract nested values in one statement
const {
    personal: {
        name: empName,
        address: { city, country }
    },
    professional: { title, skills: [primarySkill] }
} = employeeRecord;

console.log(empName);       // "Ali Khan"
console.log(city);          // "Lahore"
console.log(country);       // "Pakistan"
console.log(title);         // "Lead Developer"
console.log(primarySkill);  // "React"
// Note: `personal` and `professional` are NOT variables — they're paths

// --- Defensive destructuring (from Live Debugging) ---
console.log("\n=== Defensive Destructuring ===");

const apiResponse1 = {
    data: {
        users: [
            { name: "Ali", email: "ali@test.com" }
        ]
    }
};

// This works:
const { data: { users: [firstUser] } } = apiResponse1;
console.log("First user:", firstUser);

// What if the API returns an empty array?
const emptyResponse = { data: { users: [] } };
const { data: { users: [firstUserSafe] } } = emptyResponse;
console.log("Empty array result:", firstUserSafe); // undefined — no crash, but no data

// What if the API returns no `users` key at all?
const brokenResponse = { data: {} };
// Without defaults, this would crash:
// const { data: { users: [user1] } } = brokenResponse; // TypeError!

// Fix: provide defaults at each level
const { data: { users: [user1] = [] } = {} } = brokenResponse;
console.log("Broken response result:", user1); // undefined — safe, no crash


// ============================================
// === Part 2: Spread, Rest & The Art of Copying Data ===
// ============================================

console.log("\n\n=== Part 2: Spread, Rest & Copying ===");

// --- The mutation problem ---
const originalTeam = ["Sara", "Ali", "Zara"];
const teamRef = originalTeam;           // NOT a copy — same reference
teamRef.push("Hassan");
console.log("Mutated original:", originalTeam);
// ["Sara", "Ali", "Zara", "Hassan"] — mutated!

// --- Spread operator: copying arrays ---
const teamCopy = [...originalTeam];     // NEW array with same elements
teamCopy.push("Fatima");
console.log("Original safe:", originalTeam);
// ["Sara", "Ali", "Zara", "Hassan"] — unchanged
console.log("Copy modified:", teamCopy);
// ["Sara", "Ali", "Zara", "Hassan", "Fatima"]

// --- Merging arrays ---
const frontend = ["React", "Vue", "Angular"];
const backend = ["Node", "Django", "Laravel"];
const fullStack = [...frontend, ...backend];
console.log("\nMerged arrays:", fullStack);
// ["React", "Vue", "Angular", "Node", "Django", "Laravel"]

// Adding elements during spread
const allSkills = ["HTML", "CSS", ...frontend, "TypeScript", ...backend];
console.log("With extras:", allSkills);
// ["HTML", "CSS", "React", "Vue", "Angular", "TypeScript", "Node", "Django", "Laravel"]

// --- Spread operator: copying objects ---
console.log("\n=== Object Spread ===");
const baseEmployee = {
    company: "TechCorp",
    department: "Engineering",
    level: "Mid",
    benefits: ["health", "dental"]
};

const newEmployee = { ...baseEmployee, name: "Usman", level: "Senior" };
console.log("New employee:", newEmployee);
// { company: "TechCorp", department: "Engineering", level: "Senior",
//   benefits: ["health", "dental"], name: "Usman" }
// Note: "level" was overridden — last value wins!

console.log("Base unchanged:", baseEmployee.level); // "Mid"

// --- Merging objects ---
const personalInfo = { name: "Ayesha", age: 28 };
const jobInfo = { role: "Designer", department: "Creative" };
const locationInfo = { city: "Lahore", remote: true };

const fullProfile = { ...personalInfo, ...jobInfo, ...locationInfo };
console.log("Full profile:", fullProfile);
// { name: "Ayesha", age: 28, role: "Designer", department: "Creative",
//   city: "Lahore", remote: true }

// --- Override order matters ---
const defaults = { theme: "dark", language: "en", notifications: true };
const userPrefs = { theme: "light", language: "ur" };

// User preferences override defaults
const config = { ...defaults, ...userPrefs };
console.log("Config (user overrides):", config);
// { theme: "light", language: "ur", notifications: true }

// --- Rest in destructuring: objects ---
console.log("\n=== Rest Destructuring ===");
const fullEmployee = {
    id: "EMP-042",
    name: "Bilal",
    role: "Architect",
    salary: 120000,
    department: "Engineering",
    startDate: "2020-03-15"
};

const { id, salary, ...publicInfo } = fullEmployee;
console.log("Extracted id:", id);
console.log("Extracted salary:", salary);
console.log("Public info:", publicInfo);
// { name: "Bilal", role: "Architect", department: "Engineering", startDate: "2020-03-15" }
// Perfect for stripping sensitive fields!

// --- Rest in destructuring: arrays ---
const rankings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [gold, silver, bronze, ...others] = rankings;
console.log("Podium:", gold, silver, bronze);
console.log("Others:", others); // [4, 5, 6, 7, 8, 9, 10]

// --- Destructuring in function parameters ---
console.log("\n=== Destructuring in Params ===");
function formatEmployee({ name, role, department, level = "Junior" }) {
    return `${name} | ${role} | ${department} (${level})`;
}

const emp = { name: "Hira", role: "Developer", department: "Frontend", level: "Senior" };
console.log(formatEmployee(emp));
// "Hira | Developer | Frontend (Senior)"

// Without destructuring you'd write:
// function formatEmployee(employee) {
//     return `${employee.name} | ${employee.role} | ...`;
// }
// Destructuring in params is cleaner and self-documenting

// --- Rest in function parameters (recap from L11, now combined) ---
function createTeam(lead, ...members) {
    return {
        lead,
        members,
        size: members.length + 1
    };
}
console.log(createTeam("Sara", "Ali", "Zara", "Hassan"));
// { lead: "Sara", members: ["Ali", "Zara", "Hassan"], size: 4 }

// --- SHALLOW vs DEEP copy — the critical distinction ---
console.log("\n=== Shallow vs Deep Copy ===");
const dept = {
    name: "Engineering",
    lead: "Sara",
    members: ["Ali", "Zara", "Hassan"],  // nested array (reference!)
    config: { budget: 50000 }             // nested object (reference!)
};

const deptCopy = { ...dept };

// Top-level properties are independent:
deptCopy.name = "Product";
console.log("Original name:", dept.name);  // "Engineering" — unchanged

// BUT nested references are still shared!
deptCopy.members.push("Fatima");
console.log("Original members (mutated!):", dept.members);
// ["Ali", "Zara", "Hassan", "Fatima"] — MUTATED!

deptCopy.config.budget = 75000;
console.log("Original budget (mutated!):", dept.config.budget);
// 75000 — MUTATED!

// --- Deep copy with structuredClone ---
const deptDeepCopy = structuredClone(dept);
deptDeepCopy.members.push("Usman");
deptDeepCopy.config.budget = 100000;

console.log("After structuredClone — original members:", dept.members.length);
// 4 — unchanged
console.log("After structuredClone — original budget:", dept.config.budget);
// 75000 — unchanged
// structuredClone is the modern, correct way to deep copy

// --- Safe function: return new object instead of mutating ---
function addSkillSafe(employee, newSkill) {
    return {
        ...employee,
        skills: [...employee.skills, newSkill]
    };
}

const dev = { name: "Zara", skills: ["JS", "CSS"] };
const updatedDev = addSkillSafe(dev, "React");

console.log("\nOriginal skills:", dev.skills);        // ["JS", "CSS"]
console.log("Updated skills:", updatedDev.skills);    // ["JS", "CSS", "React"]
console.log("Different objects:", updatedDev === dev); // false


// ============================================
// === Part 3: Immutability & Object Static Methods ===
// ============================================

console.log("\n\n=== Part 3: Immutability & Object Methods ===");

// --- Object.freeze ---
const APP_CONFIG = Object.freeze({
    apiUrl: "https://api.techcorp.com",
    version: "2.1.0",
    maxRetries: 3,
    features: ["dashboard", "reports"]  // nested array!
});

APP_CONFIG.apiUrl = "https://hacked.com";  // silently fails in non-strict
console.log("Frozen apiUrl:", APP_CONFIG.apiUrl);
// "https://api.techcorp.com" — unchanged

APP_CONFIG.newProp = "test";               // silently fails
console.log("New prop on frozen:", APP_CONFIG.newProp); // undefined

// WARNING: freeze is shallow!
APP_CONFIG.features.push("admin-panel");   // This WORKS!
console.log("Frozen nested array (mutated!):", APP_CONFIG.features);
// ["dashboard", "reports", "admin-panel"] — nested mutation still possible
// Deep freeze would require a recursive function or structuredClone + freeze

// --- Object.seal ---
const formTemplate = Object.seal({
    name: "",
    email: "",
    role: "user"
});

formTemplate.name = "Ali";         // Can modify existing values
formTemplate.email = "ali@x.com";  // Can modify existing values
formTemplate.age = 25;             // silently fails — can't add
delete formTemplate.role;          // silently fails — can't delete

console.log("\nSealed form:", formTemplate);
// { name: "Ali", email: "ali@x.com", role: "user" }

// --- Object.keys / values / entries ---
console.log("\n=== Object.keys / values / entries ===");
const emp2 = {
    name: "Hira",
    role: "Designer",
    department: "Creative",
    salary: 85000,
    isRemote: true
};

const keys = Object.keys(emp2);
console.log("Keys:", keys);
// ["name", "role", "department", "salary", "isRemote"]

const values = Object.values(emp2);
console.log("Values:", values);
// ["Hira", "Designer", "Creative", 85000, true]

const entries = Object.entries(emp2);
console.log("Entries:", entries);
// [["name","Hira"], ["role","Designer"], ["department","Creative"],
//  ["salary",85000], ["isRemote",true]]

// --- Iterating objects with Object.entries + HOFs ---
// Transform: get only string-valued properties
const stringProps = Object.entries(emp2)
    .filter(([key, value]) => typeof value === "string")
    .map(([key, value]) => `${key}: ${value.toUpperCase()}`);

console.log("\nString props uppercased:", stringProps);
// ["name: HIRA", "role: DESIGNER", "department: CREATIVE"]

// --- Object.fromEntries: array → object ---
console.log("\n=== Object.fromEntries Pipelines ===");

// Transform: create a new object with all salaries increased by 10%
const teamSalaries = {
    sara: 95000,
    ali: 88000,
    zara: 92000,
    hassan: 78000
};

const raisedTeam = Object.fromEntries(
    Object.entries(teamSalaries).map(([name, salary]) => [name, salary * 1.1])
);
console.log("After 10% raise:", raisedTeam);
// { sara: 104500, ali: 96800, zara: 101200, hassan: 85800 }

// --- Filter object properties ---
// Remove employees earning below 90000
const seniorTeam = Object.fromEntries(
    Object.entries(teamSalaries).filter(([name, salary]) => salary >= 90000)
);
console.log("Senior team (>=90k):", seniorTeam);
// { sara: 95000, zara: 92000 }

// --- Object.assign (older pattern — spread is preferred) ---
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

Object.assign(target, source1, source2);
console.log("\nObject.assign (mutated target):", target);
// { a: 1, b: 3, c: 5, d: 6 }
// Object.assign MUTATES the target!
// Prefer: const result = { ...target, ...source1, ...source2 };

// --- for...in revisited vs Object.entries ---
console.log("\n=== for...in vs Object.entries ===");
const project = { name: "Phoenix", status: "active", priority: "high" };

// for...in — iterates keys (also inherited properties!)
console.log("for...in:");
for (const key in project) {
    console.log(`  ${key}: ${project[key]}`);
}

// Object.entries — only own properties, works with HOFs
console.log("Object.entries:");
Object.entries(project).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});
// Same output, but Object.entries is safer (no inherited properties)
// and can be chained with map/filter/reduce

// --- Array static methods ---
console.log("\n=== Array Static Methods ===");

// Array.from — convert array-like or iterable to real array
const nameStr = "JavaScript";
const chars = Array.from(nameStr);
console.log("Array.from string:", chars);
// ["J","a","v","a","S","c","r","i","p","t"]

// Array.from with mapping function
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
console.log("Array.from with map:", numbers);
// [1, 2, 3, 4, 5]

// Array.isArray — reliable type check
console.log("Array.isArray([]):", Array.isArray([1, 2, 3]));        // true
console.log("Array.isArray('hello'):", Array.isArray("hello"));      // false
console.log("Array.isArray({length:3}):", Array.isArray({ length: 3 })); // false

// Array.of — create array from arguments
const nums = Array.of(1, 2, 3);
console.log("Array.of:", nums); // [1, 2, 3]


// ============================================
// === Part 4: JSON, Data Pipelines & Real-World Transformation ===
// ============================================

console.log("\n\n=== Part 4: JSON & Data Pipelines ===");

// --- JSON.stringify basics ---
const emp3 = {
    name: "Sara Ahmed",
    role: "Lead Engineer",
    salary: 95000,
    skills: ["React", "TypeScript", "Node.js"],
    isRemote: true
};

const jsonString = JSON.stringify(emp3);
console.log("Stringified:", jsonString);
console.log("Type:", typeof jsonString); // "string"

// Pretty-printed JSON (great for debugging)
console.log("\nPretty-printed:");
console.log(JSON.stringify(emp3, null, 2));

// --- JSON.parse ---
const parsed = JSON.parse(jsonString);
console.log("\nParsed name:", parsed.name);     // "Sara Ahmed"
console.log("Parsed skill:", parsed.skills[0]); // "React"

// --- JSON deep clone workaround ---
const originalDept = {
    name: "Engineering",
    members: ["Sara", "Ali"],
    config: { budget: 50000 }
};

const deepClone = JSON.parse(JSON.stringify(originalDept));
deepClone.members.push("Zara");
deepClone.config.budget = 75000;

console.log("\nJSON clone — original members:", originalDept.members);
// ["Sara", "Ali"] — safe
console.log("JSON clone — original budget:", originalDept.config.budget);
// 50000 — safe

// --- JSON clone limitations ---
const problematic = {
    date: new Date(),        // becomes a string
    fn: function() {},       // disappears
    undef: undefined,        // disappears
    regex: /test/gi          // becomes {}
};
console.log("\nJSON clone limitations:", JSON.parse(JSON.stringify(problematic)));
// { date: "2026-...", regex: {} }
// fn and undef are gone! Use structuredClone instead for these cases.

// --- JSON.stringify with replacer ---
// Only include specific fields
const publicJSON = JSON.stringify(emp3, ["name", "role", "skills"]);
console.log("\nReplacer (array):", publicJSON);

// Custom replacer function — redact salary
const safeJSON = JSON.stringify(emp3, (key, value) => {
    if (key === "salary") return undefined;  // omit
    return value;
});
console.log("Replacer (function):", safeJSON);


// ============================================
// REAL-WORLD DATA TRANSFORMATION PIPELINES
// ============================================

console.log("\n\n========================================");
console.log("REAL-WORLD DATA TRANSFORMATION PIPELINES");
console.log("========================================");

// --- Pipeline 1: API Response → Display Data ---
console.log("\n--- Pipeline 1: API → Display Data ---");

const apiResponse = JSON.stringify({
    data: {
        employees: [
            { id: 1, firstName: "Sara", lastName: "Ahmed", dept: "ENG", salary: 95000, active: true },
            { id: 2, firstName: "Ali", lastName: "Khan", dept: "ENG", salary: 88000, active: true },
            { id: 3, firstName: "Zara", lastName: "Malik", dept: "DES", salary: 82000, active: false },
            { id: 4, firstName: "Hassan", lastName: "Raza", dept: "ENG", salary: 91000, active: true },
            { id: 5, firstName: "Hira", lastName: "Shah", dept: "DES", salary: 86000, active: true }
        ],
        meta: { total: 5, page: 1 }
    }
});

// Step 1: Parse the JSON
const { data: { employees: employeeList, meta } } = JSON.parse(apiResponse);

// Step 2: Filter active engineers only
const activeEngineers = employeeList.filter(
    ({ dept, active }) => dept === "ENG" && active
);

// Step 3: Transform into display format
const displayData = activeEngineers.map(({ firstName, lastName, salary }) => ({
    fullName: `${firstName} ${lastName}`,
    salary: `Rs. ${salary.toLocaleString()}`,
    initials: `${firstName[0]}${lastName[0]}`
}));

console.log("Active engineers:", displayData);
// [
//   { fullName: "Sara Ahmed", salary: "Rs. 95,000", initials: "SA" },
//   { fullName: "Ali Khan", salary: "Rs. 88,000", initials: "AK" },
//   { fullName: "Hassan Raza", salary: "Rs. 91,000", initials: "HR" }
// ]

// --- Pipeline 2: Group employees by department ---
console.log("\n--- Pipeline 2: Group by Department ---");

const byDepartment = employeeList.reduce((groups, employee) => {
    const { dept, ...info } = employee;
    return {
        ...groups,
        [dept]: [...(groups[dept] || []), info]
    };
}, {});

console.log("By department:", JSON.stringify(byDepartment, null, 2));

// --- Pipeline 3: Create department summary ---
console.log("\n--- Pipeline 3: Department Summary ---");

const deptSummary = Object.fromEntries(
    Object.entries(byDepartment).map(([dept, members]) => [
        dept,
        {
            count: members.length,
            totalSalary: members.reduce((sum, { salary }) => sum + salary, 0),
            avgSalary: Math.round(
                members.reduce((sum, { salary }) => sum + salary, 0) / members.length
            ),
            names: members.map(({ firstName }) => firstName)
        }
    ])
);

console.log("Department summary:", JSON.stringify(deptSummary, null, 2));

// --- Pipeline 4: Merge configs with defaults ---
console.log("\n--- Pipeline 4: Deep Merge Configs ---");

const systemDefaults = {
    theme: "dark",
    language: "en",
    notifications: { email: true, sms: false, push: true },
    dashboard: { layout: "grid", itemsPerPage: 10 }
};

const userConfig = {
    theme: "light",
    language: "ur",
    notifications: { email: false }
    // dashboard not specified — use defaults
};

// WRONG: Shallow merge loses nested defaults
const shallowMerge = { ...systemDefaults, ...userConfig };
console.log("Shallow merge notifications:", shallowMerge.notifications);
// { email: false } — sms and push are GONE!

// CORRECT: Deep merge preserves nested defaults
const deepMerge = {
    ...systemDefaults,
    ...userConfig,
    notifications: { ...systemDefaults.notifications, ...userConfig.notifications },
    dashboard: { ...systemDefaults.dashboard, ...(userConfig.dashboard || {}) }
};
console.log("Deep merge notifications:", deepMerge.notifications);
// { email: false, sms: false, push: true }
console.log("Deep merge dashboard:", deepMerge.dashboard);
// { layout: "grid", itemsPerPage: 10 }

// --- Pipeline 5: snake_case → camelCase transformation ---
console.log("\n--- Pipeline 5: Key Rename & Reshape ---");

const rawUsers = [
    { user_name: "sara_ahmed", user_email: "sara@tech.com", user_role: "admin" },
    { user_name: "ali_khan", user_email: "ali@tech.com", user_role: "editor" },
    { user_name: "zara_malik", user_email: "zara@tech.com", user_role: "viewer" }
];

// Transform: snake_case keys → camelCase, add computed fields
const transformedUsers = rawUsers.map(({ user_name, user_email, user_role }) => ({
    username: user_name,
    email: user_email,
    role: user_role,
    displayName: user_name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
    isAdmin: user_role === "admin"
}));

console.log("Transformed users:", JSON.stringify(transformedUsers, null, 2));


// ============================================
// === Part 5: TypeScript — Interfaces, Type Aliases & Object Types ===
// ============================================

console.log("\n\n=== Part 5: TypeScript (see comments in code) ===");
console.log("TypeScript examples are in comments — run them in TypeScript Playground.");
console.log("Visit: typescriptlang.org/play");

// TypeScript interface (for reference — run in TS Playground):
//
// // --- Interface: defining object shape ---
// interface Employee {
//     id: string;
//     name: string;
//     role: string;
//     department: string;
//     salary: number;
//     isRemote: boolean;
// }
//
// // TypeScript enforces the shape
// const sara: Employee = {
//     id: "EMP-001",
//     name: "Sara Ahmed",
//     role: "Lead Engineer",
//     department: "Engineering",
//     salary: 95000,
//     isRemote: true
// };
//
// // Missing property — TypeScript error!
// // const ali: Employee = { id: "EMP-002", name: "Ali" };
// // Error: missing role, department, salary, isRemote
//
// // --- Optional properties ---
// interface Config {
//     apiUrl: string;
//     timeout: number;
//     retries?: number;      // optional
//     debugMode?: boolean;   // optional
// }
//
// const prodConfig: Config = { apiUrl: "https://api.com", timeout: 5000 };
// // Valid — retries and debugMode are optional
//
// // --- Readonly properties ---
// interface AppSettings {
//     readonly appName: string;
//     readonly version: string;
//     theme: string;  // mutable
// }
//
// const settings: AppSettings = {
//     appName: "Enterprise Transformer",
//     version: "2.0.0",
//     theme: "dark"
// };
//
// settings.theme = "light";      // Allowed
// // settings.appName = "Hacked"; // Error: cannot assign to readonly
//
// // --- Type aliases ---
// type Department = "Engineering" | "Design" | "Marketing" | "Sales";
// type Salary = number;
//
// interface TypedEmployee {
//     name: string;
//     department: Department;   // can only be one of 4 values
//     salary: Salary;
// }
//
// // --- Interfaces with destructuring ---
// function formatEmployee({ name, role, department }: Employee): string {
//     return `${name} — ${role} (${department})`;
// }
//
// // --- Extending interfaces ---
// interface Person {
//     name: string;
//     age: number;
// }
//
// interface Developer extends Person {
//     skills: string[];
//     level: "junior" | "mid" | "senior";
// }
//
// const dev: Developer = {
//     name: "Ali Khan",
//     age: 28,
//     skills: ["React", "TypeScript"],
//     level: "mid"
// };
// // Developer has all Person properties plus its own
//
// // --- Index signature ---
// interface SalaryMap {
//     [name: string]: number;
// }
//
// const teamSalaries: SalaryMap = { sara: 95000, ali: 88000, zara: 92000 };
//
// // Object.entries returns [string, number][]
// const raised: SalaryMap = Object.fromEntries(
//     Object.entries(teamSalaries).map(([name, salary]): [string, number] => [
//         name,
//         salary * 1.1
//     ])
// );


console.log("\n========================================");
console.log("Enterprise Data Transformer — Complete!");
console.log("========================================");
