// ============================================================
// Lecture 15: Debug Version — Intentional Bugs for Live Debugging
// ============================================================
// This file contains common OOP mistakes for in-class debugging practice.
// Each bug is marked with "BUG:" and the fix is shown below it.

// === Bug 1: `this` Lost When Method Is Extracted ===

const user = {
  name: "Ali",
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

const greetFn = user.greet; // Extract the method
console.log("Bug 1 - Lost this:", greetFn()); // "Hi, I'm undefined" ← BUG!

// FIX 1: Use .bind() to lock `this`
// const greetBound = user.greet.bind(user);
// console.log(greetBound()); // "Hi, I'm Ali" ✓

// FIX 2: Use an arrow function wrapper
// const greetArrow = () => user.greet();
// console.log(greetArrow()); // "Hi, I'm Ali" ✓


// === Bug 2: Method Defined on Instance Instead of Prototype ===

function Product(name, price) {
  this.name = name;
  this.price = price;
  // BUG: This creates a NEW function for EVERY instance
  this.getTotal = function (qty) {
    return this.price * qty;
  };
}

const p1 = new Product("Laptop", 150000);
const p2 = new Product("Phone", 80000);

console.log("Bug 2 - Shared method?", p1.getTotal === p2.getTotal); // false — two different functions!

// FIX: Move method to prototype
// Product.prototype.getTotal = function(qty) { return this.price * qty; };


// === Bug 3: Constructor Method Shadows Prototype Method ===

class User3 {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
  greet() {
    return `Hi, I'm ${this.name} (${this.role})`;
  }
}

class Manager3 extends User3 {
  constructor(name, email, department) {
    super(name, email, "manager");
    // BUG: Defining method inside constructor — creates per-instance copy
    this.greet = function () {
      return `Manager: ${this.name}`;
    };
  }
}

const m1 = new Manager3("Sara", "sara@x.com", "Engineering");
const m2 = new Manager3("Omar", "omar@x.com", "Design");

console.log("Bug 3 - Shared method?", m1.greet === m2.greet); // false — each has own greet!

// FIX: Define greet as a class method (goes on prototype automatically)
// class Manager3 extends User3 {
//   constructor(name, email, department) {
//     super(name, email, "manager");
//     this.department = department;
//   }
//   greet() { return `Manager: ${this.name} — ${this.department}`; }
// }


// === Bug 4: Getter Returns Reference to Private Array ===

class TaskList {
  #tasks = [];

  addTask(title) {
    this.#tasks.push({ title, done: false });
  }

  get tasks() {
    return this.#tasks; // BUG: Returns the ACTUAL array!
  }
}

const list = new TaskList();
list.addTask("Build API");
list.addTask("Write docs");

// External code can mutate the private array!
list.tasks.push({ title: "HACKED", done: true });
console.log("Bug 4 - Tasks after hack:", list.tasks.length); // 3 — the "private" array was modified!

list.tasks.length = 0; // Wipe everything!
console.log("Bug 4 - Tasks after wipe:", list.tasks.length); // 0 — all deleted from outside!

// FIX: Return a copy from the getter
// get tasks() { return [...this.#tasks]; }


// === Bug 5: Missing super() Before this ===
// Uncomment to see the error:

// class Animal {
//   constructor(name) { this.name = name; }
// }
//
// class Dog extends Animal {
//   constructor(name, breed) {
//     // BUG: Using `this` before calling super()
//     this.breed = breed;   // ReferenceError!
//     super(name);
//   }
// }
//
// const dog = new Dog("Rex", "German Shepherd"); // ReferenceError!

// FIX: Call super() FIRST, then use this
// class Dog extends Animal {
//   constructor(name, breed) {
//     super(name);         // FIRST!
//     this.breed = breed;  // Now safe
//   }
// }


console.log("\n--- All bugs demonstrated. Check the comments for fixes! ---");
