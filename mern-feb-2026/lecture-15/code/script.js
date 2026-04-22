// ============================================================
// Lecture 15: Object-Oriented Programming
// Project: Task Management System with Role Hierarchy
// ============================================================

// === Part 1: What is OOP — Objects as Real-World Models ===

// --- Object Literals ---
const user1 = {
  name: "Ali Khan",
  email: "ali@nexusberry.com",
  role: "admin",
  greet() {
    return `Hi, I'm ${this.name} (${this.role})`;
  }
};

console.log("=== Part 1: Object Literals & Factory Functions ===");
console.log(user1.greet()); // "Hi, I'm Ali Khan (admin)"

// --- Factory Function ---
function createUser(name, email, role) {
  return {
    name,
    email,
    role,
    greet() {
      return `Hi, I'm ${this.name} (${this.role})`;
    }
  };
}

const user3 = createUser("Omar Malik", "omar@nexusberry.com", "manager");
const user4 = createUser("Hina Raza", "hina@nexusberry.com", "developer");

console.log(user3.greet()); // "Hi, I'm Omar Malik (manager)"
console.log(user4.greet()); // "Hi, I'm Hina Raza (developer)"

// Problem: greet() duplicated for every object, no instanceof
console.log(user3 instanceof Object); // true — but everything is!

// --- `this` Binding ---
const user = {
  name: "Ali",
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

console.log(user.greet()); // "Hi, I'm Ali"

// Fix for lost `this`:
const greetBound = user.greet.bind(user);
console.log(greetBound()); // "Hi, I'm Ali" ✓

const greetArrow = () => user.greet();
console.log(greetArrow()); // "Hi, I'm Ali" ✓


// === Part 2: Constructor Functions & The Prototype Chain ===

console.log("\n=== Part 2: Constructor Functions & Prototypes ===");

// --- Constructor Function ---
function UserConstructor(name, email, role) {
  this.name = name;
  this.email = email;
  this.role = role;
}

// Methods on prototype — shared by all instances
UserConstructor.prototype.greet = function () {
  return `Hi, I'm ${this.name} (${this.role})`;
};

UserConstructor.prototype.getInfo = function () {
  return `${this.name} <${this.email}> — Role: ${this.role}`;
};

const ali = new UserConstructor("Ali Khan", "ali@nexusberry.com", "admin");
const sara = new UserConstructor("Sara Ahmed", "sara@nexusberry.com", "developer");

console.log(ali.greet());   // "Hi, I'm Ali Khan (admin)"
console.log(sara.greet());  // "Hi, I'm Sara Ahmed (developer)"

// Type identity
console.log("ali instanceof UserConstructor:", ali instanceof UserConstructor); // true
console.log("ali instanceof Object:", ali instanceof Object); // true

// Shared methods — same function reference
console.log("ali.greet === sara.greet:", ali.greet === sara.greet); // true ✓

// --- Prototype Chain Inspection ---
console.log("Object.getPrototypeOf(ali) === UserConstructor.prototype:",
  Object.getPrototypeOf(ali) === UserConstructor.prototype); // true
console.log("UserConstructor.prototype.constructor === UserConstructor:",
  UserConstructor.prototype.constructor === UserConstructor); // true
console.log('ali.hasOwnProperty("name"):', ali.hasOwnProperty("name")); // true
console.log('ali.hasOwnProperty("greet"):', ali.hasOwnProperty("greet")); // false (on prototype)

// --- __proto__ vs .prototype ---
console.log("ali.__proto__ === UserConstructor.prototype:",
  ali.__proto__ === UserConstructor.prototype); // true


// === Part 3: ES6 Classes, Inheritance & Static Members ===

console.log("\n=== Part 3: ES6 Classes & Inheritance ===");

// --- ES6 Class ---
class User {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date().toISOString();
  }

  greet() {
    return `Hi, I'm ${this.name} (${this.role})`;
  }

  getInfo() {
    return `${this.name} <${this.email}> — Role: ${this.role}`;
  }

  static validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const aliClass = new User("Ali Khan", "ali@nexusberry.com", "admin");
console.log(aliClass.greet());     // "Hi, I'm Ali Khan (admin)"
console.log(aliClass.getInfo());   // "Ali Khan <ali@nexusberry.com> — Role: admin"

// Static methods — called on CLASS
console.log("User.validateEmail('ali@nexusberry.com'):", User.validateEmail("ali@nexusberry.com")); // true
console.log("User.validateEmail('not-an-email'):", User.validateEmail("not-an-email")); // false

// Proof it's still prototypes
console.log("aliClass instanceof User:", aliClass instanceof User);
console.log("Object.getPrototypeOf(aliClass) === User.prototype:",
  Object.getPrototypeOf(aliClass) === User.prototype);

// --- Inheritance ---
class Admin extends User {
  constructor(name, email) {
    super(name, email, "admin");
    this.permissions = ["create", "read", "update", "delete", "manage-users"];
  }

  deleteUser(user) {
    return `${this.name} deleted user: ${user.name}`;
  }

  greet() {
    return `👑 Admin ${this.name} — Full access granted`;
  }
}

class Manager extends User {
  constructor(name, email, department) {
    super(name, email, "manager");
    this.department = department;
    this.permissions = ["create", "read", "update", "assign"];
  }

  assignTask(task, developer) {
    return `${this.name} assigned "${task}" to ${developer.name}`;
  }

  greet() {
    return `📋 Manager ${this.name} — ${this.department} Department`;
  }
}

class Developer extends User {
  constructor(name, email, skills = []) {
    super(name, email, "developer");
    this.skills = skills;
    this.permissions = ["read", "update-own"];
    this.completedTasks = 0;
  }

  completeTask(taskName) {
    this.completedTasks++;
    return `${this.name} completed "${taskName}" (${this.completedTasks} total)`;
  }

  greet() {
    return `💻 Developer ${this.name} — Skills: ${this.skills.join(", ")}`;
  }
}

// Create the team
const admin = new Admin("Ali Khan", "ali@nexusberry.com");
const manager = new Manager("Sara Ahmed", "sara@nexusberry.com", "Engineering");
const dev1 = new Developer("Omar Malik", "omar@nexusberry.com", ["JavaScript", "React"]);
const dev2 = new Developer("Hina Raza", "hina@nexusberry.com", ["TypeScript", "Node.js"]);

// Polymorphism
console.log(admin.greet());   // "👑 Admin Ali Khan — Full access granted"
console.log(manager.greet()); // "📋 Manager Sara Ahmed — Engineering Department"
console.log(dev1.greet());    // "💻 Developer Omar Malik — Skills: JavaScript, React"

// Inherited methods
console.log(admin.getInfo()); // "Ali Khan <ali@nexusberry.com> — Role: admin"
console.log(dev1.getInfo());  // "Omar Malik <omar@nexusberry.com> — Role: developer"

// Role-specific behavior
console.log(admin.deleteUser(dev2));
console.log(manager.assignTask("Build API", dev1));
console.log(dev1.completeTask("Build API"));

// instanceof checks
console.log("admin instanceof Admin:", admin instanceof Admin);   // true
console.log("admin instanceof User:", admin instanceof User);     // true
console.log("dev1 instanceof Admin:", dev1 instanceof Admin);     // false

// --- super — Calling Parent Methods ---
class TeamLead extends Developer {
  constructor(name, email, skills, teamSize) {
    super(name, email, skills);
    this.teamSize = teamSize;
  }

  greet() {
    const devGreet = super.greet();
    return `${devGreet} | Leading team of ${this.teamSize}`;
  }
}

const lead = new TeamLead("Zain Abbas", "zain@nexusberry.com", ["React", "AWS"], 5);
console.log(lead.greet());
// "💻 Developer Zain Abbas — Skills: React, AWS | Leading team of 5"

console.log("lead instanceof TeamLead:", lead instanceof TeamLead);
console.log("lead instanceof Developer:", lead instanceof Developer);
console.log("lead instanceof User:", lead instanceof User);


// === Part 4: Encapsulation, Composition & the Observer Pattern ===

console.log("\n=== Part 4: Encapsulation, Composition & Observer ===");

// --- Encapsulation — Private Fields ---
class Task {
  #id;
  #status;
  #history;

  constructor(title, priority = "medium") {
    this.#id = crypto.randomUUID();
    this.title = title;
    this.priority = priority;
    this.#status = "pending";
    this.#history = [{
      action: "created",
      timestamp: new Date().toISOString()
    }];
  }

  get id() {
    return this.#id;
  }

  get status() {
    return this.#status;
  }

  get history() {
    return [...this.#history]; // Return COPY
  }

  set status(newStatus) {
    const validStatuses = ["pending", "in-progress", "review", "completed"];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: "${newStatus}". Must be one of: ${validStatuses.join(", ")}`);
    }
    const oldStatus = this.#status;
    this.#status = newStatus;
    this.#logChange(`Status changed: ${oldStatus} → ${newStatus}`);
  }

  #logChange(message) {
    this.#history.push({
      action: message,
      timestamp: new Date().toISOString()
    });
  }

  toString() {
    return `[${this.priority.toUpperCase()}] ${this.title} — ${this.#status}`;
  }
}

const task = new Task("Build Login Form", "high");
console.log("Task ID:", task.id);
console.log("Task Status:", task.status); // "pending"
console.log("Task toString:", task.toString());

// Controlled status change
task.status = "in-progress";
console.log("Updated Status:", task.status); // "in-progress"

// History is read-only (getter returns a copy)
console.log("History:", task.history);
task.history.push("hack"); // Modifies the COPY only
console.log("History length after hack attempt:", task.history.length); // Still 2

// Uncomment to see validation error:
// task.status = "done"; // Error: Invalid status: "done"

// --- Composition ---
class Logger {
  log(message) {
    console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
  }
}

class Validator {
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validateName(name) {
    return typeof name === "string" && name.trim().length >= 2;
  }
}

class NotificationService {
  notify(user, message) {
    console.log(`📧 Notification to ${user.name}: ${message}`);
  }
}

// Composed class — HAS-A logger, HAS-A validator, HAS-A notifier
class TaskManager {
  #tasks;
  #logger;
  #validator;
  #notifier;

  constructor() {
    this.#tasks = [];
    this.#logger = new Logger();
    this.#validator = new Validator();
    this.#notifier = new NotificationService();
  }

  addTask(title, assignee) {
    if (!this.#validator.validateName(title)) {
      throw new Error("Task title must be at least 2 characters");
    }

    const newTask = new Task(title);
    this.#tasks.push(newTask);
    this.#logger.log(`Task added: "${title}"`);
    this.#notifier.notify(assignee, `New task assigned: "${title}"`);
    return newTask;
  }

  getTasks() {
    return [...this.#tasks];
  }
}

console.log("\n--- Composition Demo ---");
const tm = new TaskManager();
const assignee = { name: "Omar" };
const newTask = tm.addTask("Design Homepage", assignee);

// --- Observer Pattern ---
console.log("\n--- Observer Pattern Demo ---");

class EventEmitter {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  on(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push(callback);
    return () => {
      this.#listeners[event] = this.#listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.#listeners[event]) {
      this.#listeners[event].forEach(callback => callback(data));
    }
  }
}

class TaskStore extends EventEmitter {
  #tasks;

  constructor() {
    super();
    this.#tasks = [];
  }

  addTask(title) {
    const storeTask = new Task(title);
    this.#tasks.push(storeTask);
    this.emit("taskAdded", storeTask);
    this.emit("change", this.getTasks());
    return storeTask;
  }

  completeTask(id) {
    const foundTask = this.#tasks.find(t => t.id === id);
    if (foundTask) {
      foundTask.status = "completed";
      this.emit("taskCompleted", foundTask);
      this.emit("change", this.getTasks());
    }
  }

  getTasks() {
    return [...this.#tasks];
  }
}

const store = new TaskStore();

// Subscriber 1: UI updater
const unsubscribe = store.on("taskAdded", (addedTask) => {
  console.log(`🖥️  UI Update: New task "${addedTask.title}" appeared on screen`);
});

// Subscriber 2: Analytics
store.on("taskAdded", (addedTask) => {
  console.log(`📊 Analytics: Task creation event logged`);
});

// Subscriber 3: Change listener
store.on("change", (tasks) => {
  console.log(`📋 Total tasks: ${tasks.length}`);
});

// Subscriber 4: Completion listener
store.on("taskCompleted", (completedTask) => {
  console.log(`🎉 Completed: ${completedTask.title}`);
});

// Add tasks — all subscribers notified
store.addTask("Build Dashboard");
store.addTask("Write Tests");

// Unsubscribe UI updater
unsubscribe();

store.addTask("Deploy to Production");
// Notice: no UI Update log for this one — unsubscribed!


// === Part 5: Built-in Classes, TypeScript OOP & Capstone ===

console.log("\n=== Part 5: Built-in Classes & Capstone ===");

// --- Map ---
const taskAssignments = new Map();
taskAssignments.set(admin, ["Review PRs", "Manage access"]);
taskAssignments.set(dev1, ["Build login", "Write tests"]);

console.log("Admin tasks:", taskAssignments.get(admin));
console.log("Map size:", taskAssignments.size);
console.log("Has dev1:", taskAssignments.has(dev1));

// --- Set ---
const skills = new Set(["JavaScript", "React", "JavaScript", "TypeScript", "React"]);
console.log("Unique skills:", skills); // Set { "JavaScript", "React", "TypeScript" }
console.log("Skills size:", skills.size); // 3
skills.add("Node.js");
skills.delete("React");
console.log("Has TypeScript:", skills.has("TypeScript")); // true

// Deduplicate an array
const tags = ["bug", "feature", "bug", "urgent", "feature"];
const uniqueTags = [...new Set(tags)];
console.log("Unique tags:", uniqueTags); // ["bug", "feature", "urgent"]

// --- Date ---
const now = new Date();
const deadline = new Date("2026-04-15");
console.log("Today:", now.toLocaleDateString());
console.log("Deadline:", deadline.toLocaleDateString("en-PK"));
console.log("now instanceof Date:", now instanceof Date);

// --- TypeScript OOP Preview (Comments Only) ---
/*
// 1. Access Modifiers
class User {
  public name: string;          // Accessible everywhere (default)
  private email: string;        // Only in this class (like #email)
  protected role: string;       // In this class AND subclasses
}

// 2. Abstract Classes
abstract class Shape {
  abstract area(): number;
  describe(): string {
    return `Area: ${this.area()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

// 3. Interfaces — contracts for class structure
interface Printable { print(): string; }
interface Serializable { toJSON(): object; }

class Task implements Printable, Serializable {
  constructor(public title: string, private status: string = "pending") {}
  print(): string { return `[${this.status}] ${this.title}`; }
  toJSON(): object { return { title: this.title, status: this.status }; }
}
*/

// --- Capstone: Full System in Action ---
console.log("\n=== CAPSTONE: Full Task Management System ===");

const taskStore = new TaskStore();

// Subscribe to events
taskStore.on("taskAdded", (t) => console.log(`  ✅ New task: ${t.title}`));
taskStore.on("taskCompleted", (t) => console.log(`  🎉 Completed: ${t.title}`));

// Create team
const projectAdmin = new Admin("Ali Khan", "ali@nexusberry.com");
const projectManager = new Manager("Sara Ahmed", "sara@nexusberry.com", "Engineering");
const projectDev = new Developer("Omar Malik", "omar@nexusberry.com", ["JavaScript", "React"]);

// Add tasks
const task1 = taskStore.addTask("Build User Authentication");
const task2 = taskStore.addTask("Design Database Schema");
const task3 = taskStore.addTask("Write API Documentation");

// Role-specific actions
console.log(projectManager.assignTask("Build Auth", projectDev));
console.log(projectDev.completeTask("Build Auth"));

// Complete a task — observers notified
taskStore.completeTask(task1.id);

// Team roster — polymorphism
console.log("\n--- Team Roster ---");
const team = [projectAdmin, projectManager, projectDev];
team.forEach(member => console.log(member.greet()));

// Permissions
console.log("\n--- Permissions ---");
team.forEach(member => {
  console.log(`${member.name}: ${member.permissions?.join(", ") || "standard"}`);
});

// typeof reveals classes are functions
console.log("\ntypeof User:", typeof User); // "function"
console.log("Classes are syntactic sugar over constructor functions!");
