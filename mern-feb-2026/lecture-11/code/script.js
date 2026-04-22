// ============================================
// Lecture 11 — Functions, Closures & Higher-Order Array Methods
// Project: Employee Profile Generator
// NexusBerry Modern Frontend Course
// ============================================

// ============================================
// === Part 1: Function Fundamentals ===
// ============================================

// --- Function Declaration ---
// Hoisted — can be called before it's defined in the file
function formatEmployeeName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

console.log(formatEmployeeName("Sara", "Ahmed"));  // "Sara Ahmed"
console.log(formatEmployeeName("Ali", "Khan"));    // "Ali Khan"

// --- Function Expression ---
// NOT hoisted — must be defined before use
const calculateSalary = function(basePay, hoursWorked) {
    return basePay * hoursWorked;
};

console.log(calculateSalary(2500, 160));  // 400000

// --- Arrow Function ---
// Concise syntax, implicit return for single expressions
const getFullTitle = (name, department) => `${name} — ${department}`;

console.log(getFullTitle("Sara Ahmed", "Engineering"));
// "Sara Ahmed — Engineering"

// Arrow with function body (multiple lines need curly braces + explicit return)
const generateEmployeeId = (department, index) => {
    const prefix = department.substring(0, 3).toUpperCase();
    const paddedIndex = String(index).padStart(4, "0");
    return `${prefix}-${paddedIndex}`;
};

console.log(generateEmployeeId("Engineering", 42));  // "ENG-0042"
console.log(generateEmployeeId("Marketing", 7));     // "MAR-0007"

// --- Default Parameters ---
const createProfile = (name, role = "Junior Developer", department = "Unassigned") => {
    return { name, role, department };
};

console.log(createProfile("Ali Khan"));
// { name: "Ali Khan", role: "Junior Developer", department: "Unassigned" }
console.log(createProfile("Sara Ahmed", "Senior Engineer", "Engineering"));
// { name: "Sara Ahmed", role: "Senior Engineer", department: "Engineering" }

// --- Rest Parameters ---
// Collects all remaining arguments into an array
const logActivity = (employeeName, ...activities) => {
    console.log(`${employeeName}'s activities:`);
    for (const activity of activities) {
        console.log(`  - ${activity}`);
    }
};

logActivity("Sara", "Code Review", "Sprint Planning", "Deployment");
// Sara's activities:
//   - Code Review
//   - Sprint Planning
//   - Deployment


// ============================================
// === Part 2: Scope, Closures & Pure Functions ===
// ============================================

// --- Scope Demonstration ---

// Global scope
const companyName = "NexusBerry";

function createDepartmentReport(deptName) {
    // Function scope — only visible inside this function
    const reportTitle = `${deptName} Department Report`;

    if (deptName === "Engineering") {
        // Block scope — only visible inside this if block
        const bonus = 15;
        console.log(`${reportTitle} — Bonus: ${bonus}%`);
    }

    // console.log(bonus);  // ❌ ReferenceError — bonus is block-scoped
    console.log(reportTitle);   // ✅ Works — same function scope
    console.log(companyName);   // ✅ Works — global scope (scope chain lookup)
}

createDepartmentReport("Engineering");

// --- Scope Chain in Action ---
const globalRate = 0.1;

function calculatePayroll(employeeList) {
    const departmentRate = 0.05;

    function calculateBonus(salary) {
        // This function can access:
        // - its own scope (salary parameter)
        // - parent scope (departmentRate)
        // - global scope (globalRate)
        return salary * (globalRate + departmentRate);
    }

    for (const emp of employeeList) {
        console.log(`${emp.name}: Bonus = ${calculateBonus(emp.salary)}`);
    }
}

calculatePayroll([
    { name: "Sara", salary: 80000 },
    { name: "Ali", salary: 65000 }
]);
// Sara: Bonus = 12000
// Ali: Bonus = 9750

// --- Closures ---

// Closure Example 1: Counter
function createCounter(startValue = 0) {
    let count = startValue;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => { count = startValue; }
    };
}

const taskCounter = createCounter();
console.log(taskCounter.increment());  // 1
console.log(taskCounter.increment());  // 2
console.log(taskCounter.increment());  // 3
console.log(taskCounter.decrement());  // 2
console.log(taskCounter.getCount());   // 2

// Each call to createCounter creates a NEW closure with its own `count`
const bugCounter = createCounter(10);
console.log(bugCounter.getCount());    // 10 — independent from taskCounter
console.log(taskCounter.getCount());   // 2 — unaffected

// Closure Example 2: Employee ID Generator (factory pattern)
function createIdGenerator(prefix) {
    let nextId = 1;

    return function(name) {
        const id = `${prefix}-${String(nextId).padStart(4, "0")}`;
        nextId++;
        return { id, name };
    };
}

const generateEngineerId = createIdGenerator("ENG");
const generateMarketingId = createIdGenerator("MKT");

console.log(generateEngineerId("Sara Ahmed"));    // { id: "ENG-0001", name: "Sara Ahmed" }
console.log(generateEngineerId("Ali Khan"));      // { id: "ENG-0002", name: "Ali Khan" }
console.log(generateMarketingId("Hina Malik"));   // { id: "MKT-0001", name: "Hina Malik" }

// --- Pure Functions ---

// PURE: Same input → same output, no side effects
function calculateAnnualSalary(monthlySalary) {
    return monthlySalary * 12;
}

// PURE: Transforms data without modifying input
function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

console.log(formatCurrency(calculateAnnualSalary(85000)));
// "Rs. 1,020,000"

// IMPURE: Depends on external variable
let exchangeRate = 278;  // PKR to USD
function convertToUSD(pkrAmount) {
    return pkrAmount / exchangeRate;  // Result changes if exchangeRate changes!
}

// FIXED — Make it pure by passing the rate as a parameter
function convertCurrency(amount, rate) {
    return amount / rate;
}


// ============================================
// === Part 3: Callbacks & HOFs — forEach, map, filter, find ===
// ============================================

// --- Our Employee Data ---
const employees = [
    { name: "Sara Ahmed", department: "Engineering", salary: 95000, rating: 9, active: true },
    { name: "Ali Khan", department: "Marketing", salary: 72000, rating: 7, active: true },
    { name: "Hina Malik", department: "Engineering", salary: 88000, rating: 8, active: false },
    { name: "Omar Farooq", department: "Sales", salary: 65000, rating: 6, active: true },
    { name: "Fatima Noor", department: "Engineering", salary: 105000, rating: 10, active: true },
    { name: "Zain Abbas", department: "Marketing", salary: 58000, rating: 5, active: true },
    { name: "Ayesha Siddiqui", department: "Sales", salary: 70000, rating: 8, active: true },
    { name: "Hassan Raza", department: "Engineering", salary: 92000, rating: 7, active: false }
];

// --- Callback Functions ---
// A callback is a function passed as an argument to another function

function processEmployees(employeeList, callback) {
    for (const employee of employeeList) {
        callback(employee);
    }
}

// Passing different callbacks to the same function
console.log("\n--- Callbacks ---");
processEmployees(employees, (emp) => {
    console.log(`${emp.name} — ${emp.department}`);
});

processEmployees(employees, (emp) => {
    if (emp.rating >= 8) {
        console.log(`⭐ ${emp.name} is a top performer!`);
    }
});

// --- forEach — Iterate without creating a new array ---
// Deferred from Lecture 10 — now you understand callbacks!
console.log("\n--- forEach ---");
employees.forEach((employee, index) => {
    console.log(`${index + 1}. ${employee.name} (${employee.department})`);
});

// forEach returns undefined — it's for side effects only (logging, updating DOM)
// Do NOT use forEach when you need a result — use map instead

// --- map — Transform each element, return new array ---
console.log("\n--- map ---");
const employeeNames = employees.map(emp => emp.name);
console.log(employeeNames);
// ["Sara Ahmed", "Ali Khan", "Hina Malik", ...]

const employeeCards = employees.map(emp => ({
    displayName: emp.name.toUpperCase(),
    label: `${emp.department} — Rating: ${emp.rating}/10`,
    status: emp.active ? "Active" : "Inactive"
}));
console.log(employeeCards);

// map with index — generate numbered badges
const badges = employees.map((emp, index) => ({
    badgeNumber: index + 1,
    name: emp.name,
    department: emp.department
}));
console.log(badges);

// --- filter — Select elements by condition ---
console.log("\n--- filter ---");

// Active employees only
const activeEmployees = employees.filter(emp => emp.active);
console.log(`Active employees: ${activeEmployees.length}`);
// 6 out of 8

// High performers (rating >= 8)
const topPerformers = employees.filter(emp => emp.rating >= 8);
console.log("Top performers:", topPerformers.map(emp => emp.name));
// ["Sara Ahmed", "Hina Malik", "Fatima Noor", "Ayesha Siddiqui"]

// Engineering department
const engineers = employees.filter(emp => emp.department === "Engineering");
console.log(`Engineers: ${engineers.length}`);

// Multiple conditions — active AND high salary
const seniorActiveStaff = employees.filter(emp => emp.active && emp.salary >= 80000);
console.log("Senior active staff:", seniorActiveStaff.map(emp => emp.name));

// --- find / findIndex — Locate first matching element ---
console.log("\n--- find / findIndex ---");

// find returns the FIRST matching element (or undefined)
const sara = employees.find(emp => emp.name === "Sara Ahmed");
console.log(sara);  // { name: "Sara Ahmed", department: "Engineering", ... }

// findIndex returns the INDEX of the first match (or -1)
const saraIndex = employees.findIndex(emp => emp.name === "Sara Ahmed");
console.log(`Sara is at index: ${saraIndex}`);  // 0

// find vs filter: find stops at the first match, filter checks all
const firstEngineer = employees.find(emp => emp.department === "Engineering");
const allEngineers = employees.filter(emp => emp.department === "Engineering");
console.log(`First engineer: ${firstEngineer.name}`);       // Sara Ahmed
console.log(`All engineers: ${allEngineers.length} found`);  // 4 found


// ============================================
// === Part 4: some, every, reduce, sort & Chaining ===
// ============================================

// --- some — Does at least one element pass the test? ---
console.log("\n--- some / every ---");

const hasTopPerformer = employees.some(emp => emp.rating === 10);
console.log(`Has a 10-rated employee: ${hasTopPerformer}`);  // true

const hasIntern = employees.some(emp => emp.department === "Internship");
console.log(`Has interns: ${hasIntern}`);  // false

// some stops as soon as it finds the first match — efficient!

// --- every — Do ALL elements pass the test? ---
const allActive = employees.every(emp => emp.active);
console.log(`All employees active: ${allActive}`);  // false

const allPaid = employees.every(emp => emp.salary > 0);
console.log(`All employees have salary: ${allPaid}`);  // true

// Use case: form validation — are ALL fields valid?
// const formValid = fields.every(field => field.isValid);

// --- reduce — Accumulate array into a single value ---
console.log("\n--- reduce ---");

// Total payroll
const totalPayroll = employees.reduce((total, emp) => total + emp.salary, 0);
console.log(`Total monthly payroll: Rs. ${totalPayroll.toLocaleString()}`);
// Rs. 645,000

// Average salary
const avgSalary = totalPayroll / employees.length;
console.log(`Average salary: Rs. ${avgSalary.toLocaleString()}`);

// Average rating
const avgRating = employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length;
console.log(`Average rating: ${avgRating.toFixed(1)}/10`);

// Count by department using reduce
const departmentCounts = employees.reduce((counts, emp) => {
    counts[emp.department] = (counts[emp.department] || 0) + 1;
    return counts;
}, {});
console.log("Department breakdown:", departmentCounts);
// { Engineering: 4, Marketing: 2, Sales: 2 }

// Highest salary using reduce
const topEarner = employees.reduce((highest, emp) =>
    emp.salary > highest.salary ? emp : highest
);
console.log(`Top earner: ${topEarner.name} — Rs. ${topEarner.salary.toLocaleString()}`);

// --- sort — Order elements (MUTATES the array!) ---
console.log("\n--- sort ---");

// IMPORTANT: sort mutates the original array!
// Always sort a COPY to avoid side effects
const sortedBySalary = [...employees].sort((a, b) => b.salary - a.salary);
console.log("By salary (highest first):");
sortedBySalary.forEach(emp =>
    console.log(`  ${emp.name}: Rs. ${emp.salary.toLocaleString()}`)
);

// Sort by rating (ascending)
const sortedByRating = [...employees].sort((a, b) => a.rating - b.rating);

// Sort by name (alphabetical)
const sortedByName = [...employees].sort((a, b) => a.name.localeCompare(b.name));
console.log("Alphabetical:", sortedByName.map(emp => emp.name));

// How sort comparator works:
// Return negative → a comes first
// Return positive → b comes first
// Return zero → keep original order

// --- Chaining HOFs — Data Pipelines ---
console.log("\n--- Chaining ---");

// Pipeline: Active engineers, sorted by rating, formatted as report
const engineeringReport = employees
    .filter(emp => emp.active && emp.department === "Engineering")
    .sort((a, b) => b.rating - a.rating)
    .map(emp => `${emp.name} — Rating: ${emp.rating}/10 — Rs. ${emp.salary.toLocaleString()}`);

console.log("Active Engineering Team (by rating):");
engineeringReport.forEach(line => console.log(`  ${line}`));

// Pipeline: Department salary report
const departmentSalaryReport = employees
    .filter(emp => emp.active)
    .reduce((report, emp) => {
        if (!report[emp.department]) {
            report[emp.department] = { total: 0, count: 0 };
        }
        report[emp.department].total += emp.salary;
        report[emp.department].count += 1;
        return report;
    }, {});

console.log("Department salary summary:", departmentSalaryReport);

// Pipeline: Top 3 performers with formatted output
const topThree = [...employees]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map((emp, index) => `${index + 1}. ${emp.name} (${emp.rating}/10)`);

console.log("Top 3 performers:");
topThree.forEach(line => console.log(`  ${line}`));


// ============================================
// === Part 5: TypeScript Functions (Preview) ===
// ============================================
// TypeScript examples shown in presentation slides and TypeScript Playground.
// The following are JavaScript equivalents demonstrating the patterns:

console.log("\n--- TypeScript Patterns (JS equivalents) ---");

// Generic-like pattern: function that works with any array
function getFirst(items) {
    return items[0];
}

console.log(getFirst([10, 20, 30]));        // 10
console.log(getFirst(["hello", "world"]));  // "hello"

// Typed callback pattern (in TS: (emp: Employee) => boolean)
function filterItems(items, predicate) {
    return items.filter(predicate);
}

const highSalary = filterItems(employees, emp => emp.salary > 80000);
console.log("High salary employees:", highSalary.map(emp => emp.name));

console.log("\n✅ All Lecture 11 demos complete!");
