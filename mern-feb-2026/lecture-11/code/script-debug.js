// DEBUG VERSION — contains intentional bugs for live debugging demos
// Lecture 11: Functions, Closures & Higher-Order Array Methods
// NexusBerry Modern Frontend Course
//
// Each bug is labeled with the Part where it's demonstrated.
// Students should try to find and fix each bug before checking script.js.

// ============================================
// Bug 1 (Part 1): Arrow function returning object without parentheses
// ============================================
console.log("--- Bug 1: Arrow function object return ---");

const createEmployee = (name, role) => { name: name, role: role };
// Expected: { name: "Sara", role: "Engineer" }
// Actual: undefined — JavaScript thinks {} is a code block, not an object!

console.log(createEmployee("Sara", "Engineer"));
// Fix: const createEmployee = (name, role) => ({ name: name, role: role });


// ============================================
// Bug 2 (Part 1): Arrow function with curly braces missing return
// ============================================
console.log("\n--- Bug 2: Missing return ---");

const greet = (name) => {
    `Hello, ${name}! Welcome aboard.`
};

console.log(greet("Sara"));
// Expected: "Hello, Sara! Welcome aboard."
// Actual: undefined — curly braces require explicit return
// Fix: Add return keyword, or remove curly braces for implicit return


// ============================================
// Bug 3 (Part 2): Stale closure — captures reference, not value
// ============================================
console.log("\n--- Bug 3: Stale closure ---");

let employeeCount = 5;
const getCount = () => employeeCount;
employeeCount = 10;

console.log(getCount());
// Expected by some: 5 (the value when getCount was created)
// Actual: 10 — closures capture REFERENCES, not snapshots
// This is how React's stale closure bug works!


// ============================================
// Bug 4 (Part 3): filter callback missing return (curly braces)
// ============================================
console.log("\n--- Bug 4: filter with missing return ---");

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

const highSalary = employees.filter(emp => {
    emp.salary >= 80000;  // Missing return!
});

console.log("High salary count:", highSalary.length);
// Expected: 4 (Sara, Hina, Fatima, Hassan)
// Actual: 0 — empty array! The callback returns undefined (falsy) for every element
// Fix: const highSalary = employees.filter(emp => emp.salary >= 80000);


// ============================================
// Bug 5 (Part 4): Sorting numbers without a comparator
// ============================================
console.log("\n--- Bug 5: Default sort on numbers ---");

const prices = [200, 30, 1000, 5, 80];
console.log("Sorted prices:", prices.sort());
// Expected: [5, 30, 80, 200, 1000]
// Actual: [1000, 200, 30, 5, 80] — sorted as STRINGS, not numbers!
// Fix: [...prices].sort((a, b) => a - b)
// Also notice: prices is now mutated!


// ============================================
// Bug 6 (Part 4): Sort mutating the original array
// ============================================
console.log("\n--- Bug 6: Sort mutation ---");

const names = ["Sara", "Ali", "Hina", "Omar"];
console.log("Before sort:", names);

names.sort();
console.log("After sort:", names);
// The original array is now permanently changed!
// Fix: const sorted = [...names].sort();
// Always sort a copy when you need the original intact


console.log("\n🐛 All debug demos complete — find and fix each bug!");
