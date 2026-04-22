// DEBUG VERSION — contains intentional bugs for live debugging demos
// See Part 1: Missing curly braces bug
// See Part 2: Assignment instead of comparison in switch

// ============================================
// Lecture 9: Debug File — Intentional Bugs
// Conditional Logic & Program Flow Control
// University Admission Gateway
// NexusBerry Modern Frontend Course
// ============================================

// ============================================
// BUG 1 (Part 1): Missing curly braces
// ============================================
const temperature = 35;

if (temperature > 30)
    console.log("It's hot!");
    console.log("Stay hydrated!"); // This ALWAYS runs — not inside the if!

// The second console.log is NOT part of the if block.
// Without braces, only the FIRST line after if is conditional.
// FIX: Always use curly braces — even for one-liners.


// ============================================
// BUG 2 (Part 2): Assignment instead of comparison
// ============================================
const userRole = "student";

switch (true) {
    case userRole = "admin":  // BUG! = is assignment, not === comparison
        console.log("Admin dashboard");
        break;
    case userRole === "student":
        console.log("Student portal");
        break;
}
// userRole is now "admin" — the assignment changed it!
// This bug is subtle and won't throw an error.
// FIX: Always use === inside case expressions.


// ============================================
// BUG 3 (Part 3): Using || when ?? was needed
// ============================================
const scholarship = 0;  // 0% scholarship (no discount — valid!)

const finalScholarship = scholarship || 100;  // BUG: treats 0 as "no data"
console.log(`Scholarship: ${finalScholarship}%`);
// Output: "Scholarship: 100%" — Student gets full scholarship by accident!

// FIX: Use ??
// const fixedScholarship = scholarship ?? 100;
// console.log(`Scholarship: ${fixedScholarship}%`);  // "Scholarship: 0%"


// ============================================
// BUG 4 (Part 4): Accessing missing nested property
// ============================================
const incompleteApp = {
    name: "Test Student",
    department: "Law"
    // no scores, no entranceExam, no address
};

// WITHOUT optional chaining — CRASHES
// Uncomment the line below to see the error:
// const avg = (incompleteApp.scores.math + incompleteApp.scores.english) / 2;
// TypeError: Cannot read properties of undefined (reading 'math')

// FIX: Use ?. + ??
const mathScore = incompleteApp.scores?.math ?? 0;
const englishScore = incompleteApp.scores?.english ?? 0;
const safeAvg = (mathScore + englishScore) / 2;
console.log(`Safe average: ${safeAvg}`);  // 0
