// ============================================
// Lecture 9: Conditional Logic & Program Flow Control
// University Admission Gateway — Interactive Version
// Uses prompt-sync for Node.js user input
// NexusBerry Modern Frontend Course
// ============================================
// Run: node admission-interactive.js

// --- Setup: prompt-sync for Node.js user input ---
const prompt = require("prompt-sync")();

// ============================================
// Step 1: Collect Student Data (User Input)
// ============================================
console.log("\n========================================");
console.log("   UNIVERSITY ADMISSION GATEWAY");
console.log("   NexusBerry University System");
console.log("========================================\n");

const studentName = prompt("Enter student name: ");
const studentAge = Number(prompt("Enter age: "));
const mathScore = Number(prompt("Enter Math score (0-100): "));
const englishScore = Number(prompt("Enter English score (0-100): "));
const scienceScore = Number(prompt("Enter Science score (0-100): "));
const department = prompt("Enter department (Computer Science / Business Administration / Medicine / Law): ");
const entranceExamInput = prompt("Passed entrance exam? (yes/no): ");
const entranceExam = entranceExamInput.toLowerCase() === "yes";

// --- Build the application object ---
const application = {
    name: studentName,
    age: studentAge,
    scores: { math: mathScore, english: englishScore, science: scienceScore },
    department: department,
    entranceExam: entranceExam,
    address: { city: "Lahore", country: "Pakistan" },
    scholarship: null,   // not yet determined
    referral: undefined  // optional field
};

// ============================================
// Step 2: Score Classification (if/else — range checks)
// ============================================
const avgScore = (application.scores.math + application.scores.english + application.scores.science) / 3;
console.log(`\n📊 Average Score: ${avgScore.toFixed(1)}`);

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

// ============================================
// Step 3: Department Routing (switch — exact match)
// ============================================
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

// ============================================
// Step 4: Scholarship Calculation (ternary + ??)
// ============================================
const scholarshipPercent = avgScore >= 90 ? 100
    : avgScore >= 80 ? 50
    : avgScore >= 70 ? 25
    : 0;

// Use ?? to check if scholarship was manually set
const finalScholarship = application.scholarship ?? scholarshipPercent;
console.log(`💰 Scholarship: ${finalScholarship}%`);

// Scholarship message using ternary
const scholarshipMessage = finalScholarship > 0
    ? `Congratulations! You receive a ${finalScholarship}% tuition waiver.`
    : "No scholarship awarded. Full tuition applies.";
console.log(scholarshipMessage);

// ============================================
// Step 5: Optional Data (?.  &&  ??)
// ============================================
const city = application.address?.city ?? "City not provided";
const state = application.address?.state ?? "State not provided";
const referralName = application.referral?.name ?? "No referral";
console.log(`📍 Location: ${city}`);
console.log(`📍 State: ${state}`);
console.log(`🤝 Referral: ${referralName}`);

// Guard clause with &&
application.entranceExam && console.log("✅ Entrance exam completed");
!application.entranceExam && console.log("⚠️ Entrance exam pending");

// ============================================
// Step 6: Final Admission Decision (all combined)
// ============================================
let finalDecision;

if (avgScore >= 60 && prerequisitesMet && application.entranceExam) {
    finalDecision = "🎓 ADMITTED";
} else if (avgScore >= 60 && application.entranceExam) {
    finalDecision = "⏳ WAITLISTED — Prerequisites not met";
} else if (avgScore >= 60) {
    finalDecision = "📋 CONDITIONAL — Complete entrance exam";
} else {
    finalDecision = "❌ REJECTED — Below minimum score";
}

// ============================================
// Step 7: Final Report
// ============================================
console.log("\n========================================");
console.log("   ADMISSION DECISION REPORT");
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

// ============================================
// Logical Assignment — Initialize defaults
// ============================================
let studentNotes = application.notes;
studentNotes ??= "No additional notes";
console.log(`📝 Notes: ${studentNotes}`);

let contactEmail = application.email;
contactEmail ??= `${application.name.toLowerCase().replace(" ", ".")}@student.nexusberry.edu`;
console.log(`📧 Email: ${contactEmail}`);
