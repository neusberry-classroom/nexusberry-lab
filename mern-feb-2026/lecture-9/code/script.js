// ============================================
// Lecture 9: Conditional Logic & Program Flow Control
// University Admission Gateway
// NexusBerry Modern Frontend Course
// ============================================

// ============================================
// === Part 1: if / else if / else ===
// ============================================

// --- Basic if statement ---
const studentScore = 85;

if (studentScore >= 80) {
    console.log("🎓 Congratulations! You are ADMITTED.");
}
// If the condition is false, nothing happens — the code just skips the block

// --- if/else — Two-way branch ---
const entranceExamScore = 55;

if (entranceExamScore >= 60) {
    console.log("✅ Entrance exam: PASSED");
} else {
    console.log("❌ Entrance exam: FAILED");
}

// --- if / else if / else — Multi-way branch ---
// This is the core admission logic
const totalScore = 72;

if (totalScore >= 80) {
    console.log("🎓 Status: ADMITTED — Welcome to the program!");
    console.log("📧 Sending acceptance letter...");
} else if (totalScore >= 60) {
    console.log("⏳ Status: WAITLISTED — You may be admitted if seats open.");
    console.log("📧 Sending waitlist notification...");
} else if (totalScore >= 40) {
    console.log("📋 Status: CONDITIONAL — Remedial courses required.");
    console.log("📧 Sending conditional offer...");
} else {
    console.log("❌ Status: REJECTED — Score below minimum threshold.");
    console.log("📧 Sending feedback letter with improvement areas...");
}

// --- Order matters! ---
// WRONG: checking lower threshold first
const score = 95;

// BAD — this catches 95 in the first branch!
if (score >= 40) {
    console.log("Conditional admission");  // 95 >= 40 is true — stops here!
} else if (score >= 60) {
    console.log("Waitlisted");             // Never reached for 95
} else if (score >= 80) {
    console.log("Admitted");               // Never reached for 95
}

// CORRECT — check highest first
if (score >= 80) {
    console.log("Admitted");               // 95 >= 80 is true — correct!
} else if (score >= 60) {
    console.log("Waitlisted");
} else if (score >= 40) {
    console.log("Conditional");
} else {
    console.log("Rejected");
}

// --- Nested conditionals ---
const academicScore = 75;
const hasEntrance = true;
const seatsAvailable = 3;

if (academicScore >= 60) {
    if (hasEntrance) {
        if (seatsAvailable > 0) {
            console.log("✅ ADMITTED — All criteria met.");
        } else {
            console.log("⏳ WAITLISTED — No seats available.");
        }
    } else {
        console.log("❌ REJECTED — Entrance exam not passed.");
    }
} else {
    console.log("❌ REJECTED — Academic score too low.");
}

// --- Better: Flatten with logical AND ---
// Same logic, but cleaner:
if (academicScore >= 60 && hasEntrance && seatsAvailable > 0) {
    console.log("✅ ADMITTED");
} else if (academicScore >= 60 && hasEntrance) {
    console.log("⏳ WAITLISTED — No seats");
} else if (academicScore >= 60) {
    console.log("❌ REJECTED — No entrance exam");
} else {
    console.log("❌ REJECTED — Low score");
}

console.log("\n--- Part 1 Complete ---\n");

// ============================================
// === Part 2: switch & Ternary Operator ===
// ============================================

// --- switch statement: Department routing ---
const department = "Computer Science";

switch (department) {
    case "Computer Science":
        console.log("🖥️ Welcome to CS — Building 4, Floor 3");
        console.log("📋 Prerequisites: Mathematics, Logic");
        break;
    case "Business Administration":
        console.log("📊 Welcome to Business — Building 2, Floor 1");
        console.log("📋 Prerequisites: Economics, Statistics");
        break;
    case "Medicine":
        console.log("🏥 Welcome to Medicine — Medical Campus");
        console.log("📋 Prerequisites: Biology, Chemistry");
        break;
    case "Law":
        console.log("⚖️ Welcome to Law — Building 6, Floor 2");
        console.log("📋 Prerequisites: English, Social Studies");
        break;
    default:
        console.log("❓ Unknown department — please visit the admin office.");
        console.log("📞 Contact: 042-36440443");
}

// --- Fall-through: Intentional use ---
// Group departments by faculty
const dept = "Physics";

switch (dept) {
    case "Physics":
    case "Chemistry":
    case "Mathematics":
        console.log("🔬 Faculty of Sciences");
        break;
    case "Computer Science":
    case "Software Engineering":
        console.log("💻 Faculty of Computing");
        break;
    case "Business Administration":
    case "Accounting":
        console.log("📊 Faculty of Management");
        break;
    default:
        console.log("📁 General Faculty");
}

// --- Fall-through BUG (what happens without break) ---
const status = "waitlisted";

switch (status) {
    case "admitted":
        console.log("Send acceptance letter");
    // MISSING break! Falls through to next case
    case "waitlisted":
        console.log("Send waitlist notification");
    // MISSING break! Falls through again
    case "rejected":
        console.log("Send rejection letter");
    // MISSING break!
    default:
        console.log("Update records");
}
// Output for "waitlisted":
// "Send waitlist notification"
// "Send rejection letter"        ← BUG! Student gets rejection AND waitlist
// "Update records"               ← Also runs

// --- switch uses STRICT equality (===) ---
const inputScore = "80";  // string from prompt()

switch (inputScore) {
    case 80:               // number 80 — strict comparison
        console.log("This will NOT match '80' (string)");
        break;
    case "80":             // string "80" — strict comparison
        console.log("This WILL match '80' (string)");
        break;
}
// Always convert your input type before using switch!

// --- Ternary Operator ---
const admissionScore = 78;
const admissionStatus = admissionScore >= 60 ? "Accepted" : "Rejected";
console.log(`Status: ${admissionStatus}`);

// --- Ternary for dynamic messages ---
const seatsLeft = 0;
const seatMessage = seatsLeft > 0
    ? `${seatsLeft} seat(s) available — Apply now!`
    : "No seats available — Join the waitlist.";
console.log(seatMessage);

// --- Ternary for fee calculation ---
const isInternational = true;
const baseFee = 50000;
const totalFee = isInternational ? baseFee * 2 : baseFee;
console.log(`Tuition: Rs. ${totalFee.toLocaleString()}`);

// --- Nested ternary: When it's acceptable ---
// ✅ Acceptable: 2-3 branches, pure value assignment, formatted vertically
const studentScore2 = 75;
const grade = studentScore2 >= 80 ? "A"
    : studentScore2 >= 60 ? "B"
    : studentScore2 >= 40 ? "C"
    : "F";
console.log(`Grade: ${grade}`);  // "Grade: B"
// Each line: one condition → one value — easy to read top-to-bottom

// --- Nested ternary: When it's NOT acceptable ---
// ❌ Bad: deeply nested, complex logic, or side effects
// const result = a > 10
//     ? b > 5
//         ? c > 0 ? "deep-1" : "deep-2"
//         : "mid"
//     : "low";
// Use if/else instead — this is unreadable

// --- Decision Framework: Ternary vs if/else ---
// ✅ Use ternary: assigning a value, 2-3 branches, readable
// ❌ Use if/else: side effects, 4+ branches, complex logic

console.log("\n--- Part 2 Complete ---\n");

// ============================================
// === Part 3: Short-Circuit & Modern Operators ===
// ============================================

// --- Short-circuit with || (OR) — Default values ---
const studentName = "";  // Student didn't enter their name
const displayName = studentName || "Anonymous Student";
console.log(`Welcome, ${displayName}`);

const userInput = null;
const major = userInput || "Undeclared";
console.log(`Major: ${major}`);

// --- The || problem: falsy vs actually missing ---
const prerequisitesPassed = 0;  // Student passed zero prerequisites (valid data!)
const prereqDisplay = prerequisitesPassed || "No data available";
console.log(`Prerequisites (wrong): ${prereqDisplay}`);
// Output: "Prerequisites: No data available" — WRONG! 0 is valid data

// --- Nullish coalescing ?? — null/undefined only ---
const prereqCorrect = prerequisitesPassed ?? "No data available";
console.log(`Prerequisites (correct): ${prereqCorrect}`);
// Output: "Prerequisites: 0" — CORRECT! ?? only triggers on null/undefined

// More ?? examples:
const middleName = null;
const displayMiddle = middleName ?? "N/A";
console.log(`Middle name: ${displayMiddle}`);

const gpa = undefined;
const displayGPA = gpa ?? "Not calculated yet";
console.log(`GPA: ${displayGPA}`);

const emptyString = "";
const displayEmpty = emptyString ?? "fallback";
console.log(`Result: "${displayEmpty}"`);  // "" — empty string is NOT null/undefined

// --- Short-circuit with && (AND) — Guard clauses ---
const student = {
    name: "Ayesha Khan",
    scores: { math: 88, english: 76 },
    isActive: true
};

student && student.isActive && console.log(`Processing: ${student.name}`);

const inactiveStudent = { name: "Test", isActive: false };
inactiveStudent && inactiveStudent.isActive && console.log("This won't run");

// --- Optional chaining ?. ---
const fullStudent = {
    name: "Ahmed Ali",
    address: {
        city: "Lahore",
        zip: "54000"
    },
    scores: [85, 90, 78],
    getGPA() {
        return 3.5;
    }
};

// Property access
console.log(fullStudent.address.city);         // "Lahore"
console.log(fullStudent.address?.city);        // "Lahore" (same, but safe)

// Without optional chaining — accessing missing property
const incompleteStudent = { name: "Sara" };
// console.log(incompleteStudent.address.city);  // TypeError!
console.log(incompleteStudent.address?.city);    // undefined — no error!

// Array element access
console.log(fullStudent.scores?.[0]);            // 85
console.log(incompleteStudent.scores?.[0]);      // undefined — no error

// Method call
console.log(fullStudent.getGPA?.());             // 3.5
console.log(incompleteStudent.getGPA?.());       // undefined — no error

// --- Combining ?. with ?? — The power combo ---
const studentCity = incompleteStudent.address?.city ?? "City not provided";
console.log(`City: ${studentCity}`);

// --- Logical assignment operators (ES2021) ---
let studentEmail = "";
studentEmail ||= "no-email@university.edu";
console.log(`Email (||=): ${studentEmail}`);

let studentPhone = "0300-1234567";
studentPhone ||= "no-phone";
console.log(`Phone (||=): ${studentPhone}`);

let notes = null;
notes ??= "No notes available";
console.log(`Notes (??=): ${notes}`);

let existingNotes = "";
existingNotes ??= "No notes available";
console.log(`Existing notes (??=): "${existingNotes}"`);  // "" preserved

let userPreference = "dark-mode";
userPreference &&= userPreference.toUpperCase();
console.log(`Preference (&&=): ${userPreference}`);

let noPreference = null;
noPreference &&= noPreference.toUpperCase();
console.log(`No preference (&&=): ${noPreference}`);  // null — safe

console.log("\n--- Part 3 Complete ---\n");

// ============================================
// === Part 4: University Admission Gateway ===
// === Complete Application — All Constructs ===
// ============================================

// --- Student Application Data ---
const application = {
    name: "Fatima Noor",
    age: 19,
    scores: { math: 82, english: 74, science: 91 },
    department: "Computer Science",
    entranceExam: true,
    address: { city: "Lahore", country: "Pakistan" },
    scholarship: null,
    referral: undefined
};

// Step 1: Score Validation (if/else — range checks)
const avgScore = (application.scores.math + application.scores.english + application.scores.science) / 3;
console.log(`📊 Average Score: ${avgScore.toFixed(1)}`);

let eligibilityStatus;

if (avgScore >= 80) {
    eligibilityStatus = "Excellent — Direct Admission";
} else if (avgScore >= 60) {
    eligibilityStatus = "Good — Standard Admission";
} else if (avgScore >= 40) {
    eligibilityStatus = "Conditional — Remedial Required";
} else {
    eligibilityStatus = "Below Minimum — Not Eligible";
}
console.log(`📋 Eligibility: ${eligibilityStatus}`);

// Step 2: Department Routing (switch — exact match)
let departmentInfo;
let prerequisitesMet = false;

switch (application.department) {
    case "Computer Science":
        departmentInfo = "🖥️ CS Department — Building 4, Floor 3";
        prerequisitesMet = application.scores.math >= 70;
        break;
    case "Business Administration":
        departmentInfo = "📊 Business — Building 2, Floor 1";
        prerequisitesMet = application.scores.english >= 60;
        break;
    case "Medicine":
        departmentInfo = "🏥 Medicine — Medical Campus";
        prerequisitesMet = application.scores.science >= 85;
        break;
    case "Law":
        departmentInfo = "⚖️ Law — Building 6, Floor 2";
        prerequisitesMet = application.scores.english >= 70;
        break;
    default:
        departmentInfo = "❓ Department not found — contact admissions";
        prerequisitesMet = false;
}
console.log(departmentInfo);
console.log(`📚 Prerequisites: ${prerequisitesMet ? "Met ✅" : "Not Met ❌"}`);

// Step 3: Scholarship Calculation (ternary + ??)
const scholarshipPercent = avgScore >= 90 ? 100
    : avgScore >= 80 ? 50
    : avgScore >= 70 ? 25
    : 0;

const finalScholarship = application.scholarship ?? scholarshipPercent;
console.log(`💰 Scholarship: ${finalScholarship}%`);

const scholarshipMessage = finalScholarship > 0
    ? `Congratulations! You receive a ${finalScholarship}% tuition waiver.`
    : "No scholarship awarded. Full tuition applies.";
console.log(scholarshipMessage);

// Step 4: Optional Data (?. && ??)
const city = application.address?.city ?? "City not provided";
const state = application.address?.state ?? "State not provided";
const referralName = application.referral?.name ?? "No referral";
console.log(`📍 Location: ${city}`);
console.log(`📍 State: ${state}`);
console.log(`🤝 Referral: ${referralName}`);

application.entranceExam && console.log("✅ Entrance exam completed");
!application.entranceExam && console.log("⚠️ Entrance exam pending");

// Step 5: Final Admission Decision (all combined)
let finalDecision;
let decisionColor;

if (avgScore >= 60 && prerequisitesMet && application.entranceExam) {
    finalDecision = "🎓 ADMITTED";
    decisionColor = "green";
} else if (avgScore >= 60 && application.entranceExam) {
    finalDecision = "⏳ WAITLISTED — Prerequisites not met";
    decisionColor = "orange";
} else if (avgScore >= 60) {
    finalDecision = "📋 CONDITIONAL — Complete entrance exam";
    decisionColor = "yellow";
} else {
    finalDecision = "❌ REJECTED — Below minimum score";
    decisionColor = "red";
}

// Step 6: Final Report
console.log("\n========================================");
console.log("   UNIVERSITY ADMISSION GATEWAY");
console.log("   NexusBerry University System");
console.log("========================================");
console.log(`   Applicant:    ${application.name}`);
console.log(`   Age:          ${application.age}`);
console.log(`   Department:   ${application.department}`);
console.log(`   Avg Score:    ${avgScore.toFixed(1)}%`);
console.log(`   Eligibility:  ${eligibilityStatus}`);
console.log(`   Prerequisites:${prerequisitesMet ? " Met ✅" : " Not Met ❌"}`);
console.log(`   Entrance Exam:${application.entranceExam ? " Passed ✅" : " Pending ⏳"}`);
console.log(`   Scholarship:  ${finalScholarship}%`);
console.log(`   Location:     ${city}`);
console.log("----------------------------------------");
console.log(`   DECISION:     ${finalDecision}`);
console.log("========================================\n");

// Logical Assignment — Initialize defaults
let studentNotes = application.notes;
studentNotes ??= "No additional notes";
console.log(`📝 Notes: ${studentNotes}`);

let contactEmail = application.email;
contactEmail ??= `${application.name.toLowerCase().replace(" ", ".")}@student.nexusberry.edu`;
console.log(`📧 Email: ${contactEmail}`);

console.log("\n--- Part 4 Complete ---\n");

// ============================================
// === Part 5: TypeScript Narrowing (Preview) ===
// === (Shown as comments — JS equivalent) ===
// ============================================

// TypeScript adds type safety to conditionals.
// These patterns are shown as comments since we're in .js,
// but the JavaScript equivalents work the same way.

// --- typeof guards ---
// TypeScript: function formatScore(score: string | number): string
function formatScore(score) {
    if (typeof score === "string") {
        return score.toUpperCase();  // TS knows: string
    } else {
        return `${score.toFixed(1)}%`;  // TS knows: number
    }
}

console.log(formatScore(82.5));        // "82.5%"
console.log(formatScore("excellent")); // "EXCELLENT"

// --- Truthiness narrowing ---
// TypeScript: function getStudentCity(address: {city: string} | null | undefined): string
function getStudentCity(address) {
    if (address) {
        return address.city;  // TS knows: not null/undefined
    }
    return "City not provided";
}

console.log(getStudentCity({ city: "Lahore" }));  // "Lahore"
console.log(getStudentCity(null));                 // "City not provided"
console.log(getStudentCity(undefined));            // "City not provided"

// --- Discriminated unions (shown as JS pattern) ---
// In TypeScript, each object would have a strict type based on 'status'
function processResult(result) {
    switch (result.status) {
        case "admitted":
            return `Welcome to ${result.department}! Scholarship: ${result.scholarship}%`;
        case "waitlisted":
            return `Waitlisted at position #${result.position}`;
        case "rejected":
            return `Application rejected: ${result.reason}`;
        default:
            return "Unknown status";
    }
}

const result1 = { status: "admitted", department: "Computer Science", scholarship: 50 };
console.log(processResult(result1));

const result2 = { status: "rejected", reason: "Score below minimum threshold" };
console.log(processResult(result2));

console.log("\n--- Part 5 Complete ---");
console.log("--- End of Lecture 9 Code ---");
