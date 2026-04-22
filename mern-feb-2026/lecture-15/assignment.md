# Assignment: Task Management System with Role Hierarchy

## Overview

Build a complete task management system using Object-Oriented Programming principles. You'll create a class hierarchy with users of different roles (Admin, Manager, Developer), a task system with encapsulated private fields, an Observer pattern for reactive updates, and composition to wire everything together. This is the exact architecture behind enterprise applications — role-based access control, event-driven state management, and clean class design. The patterns you build here will directly translate to React components and state management in Module 3.

---

## Requirements

Your Task Management System must meet all of the following requirements.

### 1. User Base Class

- Create a `User` class with `constructor(name, email, role)`
- Include a `createdAt` property set to `new Date().toISOString()` in the constructor
- Add a `greet()` instance method that returns a string including the user's name and role
- Add a `getInfo()` instance method that returns name, email, and role in a formatted string
- Add a `static validateEmail(email)` method that returns `true`/`false` using a regex check
- Verify: `new User("Test", "test@x.com", "admin") instanceof User` should return `true`

### 2. Role Subclasses (at least 3)

Create at least **3 subclasses** that extend `User`:

**Admin:**
- Accepts `name` and `email` — sets role to `"admin"` via `super()`
- Has a `permissions` array: `["create", "read", "update", "delete", "manage-users"]`
- Has a `deleteUser(user)` method that returns a formatted deletion message
- Overrides `greet()` with admin-specific output

**Manager:**
- Accepts `name`, `email`, and `department`
- Sets role to `"manager"` via `super()`
- Has a `permissions` array and a `department` property
- Has an `assignTask(taskTitle, developer)` method
- Overrides `greet()` to include department

**Developer:**
- Accepts `name`, `email`, and `skills` (array, default `[]`)
- Sets role to `"developer"` via `super()`
- Has a `completedTasks` counter (starts at 0)
- Has a `completeTask(taskName)` method that increments the counter
- Overrides `greet()` to include skills

### 3. Task Class with Encapsulation

- Create a `Task` class with private fields: `#id`, `#status`, and `#history`
- `#id` should be set to `crypto.randomUUID()` — no setter (truly read-only)
- `#status` should default to `"pending"` — accessible via getter, changeable ONLY via validated setter
- The `status` setter must validate against a list of valid statuses and throw an `Error` for invalid values
- `#history` should track all status changes with timestamps — getter must return a COPY (`[...this.#history]`)
- Include a `toString()` method for formatted output
- Include at least one private method (e.g., `#logChange(message)`)

### 4. EventEmitter Class (Observer Pattern)

- Create an `EventEmitter` class with a private `#listeners` object
- Implement `on(event, callback)` — subscribes a callback to an event
  - Must return an **unsubscribe function** that removes the callback
- Implement `emit(event, data)` — calls all callbacks registered for that event
- Demonstrate that the unsubscribe function works (subscribe, emit, unsubscribe, emit again — second emit should NOT trigger the removed listener)

### 5. TaskStore with Reactive Updates

- Create a `TaskStore` class that `extends EventEmitter`
- Store tasks in a private `#tasks` array
- `addTask(title)` — creates a Task, stores it, and emits `"taskAdded"` and `"change"` events
- `completeTask(id)` — finds a task by ID, sets its status to `"completed"`, emits `"taskCompleted"` and `"change"` events
- `getTasks()` — returns a copy of the tasks array
- Subscribe at least **2 different listeners** to demonstrate the Observer pattern (e.g., a UI logger and an analytics tracker)

### 6. Composition

- Create at least **one independent utility class** (e.g., `Logger`, `Validator`, or `NotificationService`)
- Use it inside a composed class (e.g., `TaskManager`) via `#private` instance — NOT via inheritance
- The composed class should use the utility class for at least one operation (validation, logging, or notifications)

### 7. Built-in Classes (Map or Set)

- Use `Map` or `Set` in at least one meaningful way:
  - `Map` for task assignments (user → task list)
  - `Set` for unique skill tracking or tag deduplication
- Demonstrate `.size`, `.has()`, and iteration

### 8. TypeScript Type Comments

- Add TypeScript-style comments (in `/* */` blocks) showing:
  - At least one `interface` definition for your classes
  - Access modifiers (`public`, `private`, `protected`) on at least one class
  - An `abstract class` or `implements` example
- These don't need to run — they're documentation showing you understand TypeScript OOP

### 9. Console Output Demo

- Display formatted output in the console demonstrating the FULL system:
  - Create a team of users (at least 1 of each role)
  - Add tasks to the store (show observer notifications)
  - Use role-specific methods (assign, complete, delete)
  - Show polymorphism: loop through team members and call `greet()` on each
  - Display permissions per role
  - Show `instanceof` checks proving the inheritance chain

---

## Example Structure

```javascript
// === User Class Hierarchy ===

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

class Admin extends User {
  constructor(name, email) {
    super(name, email, "admin");  // super() MUST be first
    this.permissions = ["create", "read", "update", "delete", "manage-users"];
  }

  deleteUser(user) { /* ... */ }
  greet() { /* override with admin-specific output */ }
}

// ... Manager, Developer classes follow same pattern

// === Task with Encapsulation ===

class Task {
  #id;
  #status;
  #history;

  constructor(title, priority = "medium") {
    this.#id = crypto.randomUUID();   // Private, read-only
    this.title = title;                // Public
    this.priority = priority;
    this.#status = "pending";          // Private, validated setter
    this.#history = [{ action: "created", timestamp: new Date().toISOString() }];
  }

  get id() { return this.#id; }
  get status() { return this.#status; }
  get history() { return [...this.#history]; } // Defensive copy!

  set status(newStatus) {
    const valid = ["pending", "in-progress", "review", "completed"];
    if (!valid.includes(newStatus)) throw new Error(`Invalid status: "${newStatus}"`);
    this.#status = newStatus;
    this.#logChange(`Status: ${newStatus}`);
  }

  #logChange(message) {
    this.#history.push({ action: message, timestamp: new Date().toISOString() });
  }
}

// === Observer Pattern ===

class EventEmitter {
  #listeners = {};

  on(event, callback) {
    if (!this.#listeners[event]) this.#listeners[event] = [];
    this.#listeners[event].push(callback);
    return () => {
      this.#listeners[event] = this.#listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    this.#listeners[event]?.forEach(cb => cb(data));
  }
}

class TaskStore extends EventEmitter {
  #tasks = [];

  addTask(title) { /* create task, push, emit events */ }
  completeTask(id) { /* find task, set status, emit events */ }
  getTasks() { return [...this.#tasks]; }
}

// === Composition ===

class Logger {
  log(message) { console.log(`[LOG] ${message}`); }
}

class TaskManager {
  #store = new TaskStore();
  #logger = new Logger();

  createTask(title) {
    this.#logger.log(`Creating task: ${title}`);
    return this.#store.addTask(title);
  }
}

// === Demo Output ===

const store = new TaskStore();
store.on("taskAdded", (task) => console.log(`New: ${task.title}`));

const admin = new Admin("Ali", "ali@nexusberry.com");
const dev = new Developer("Omar", "omar@nexusberry.com", ["JS", "React"]);

store.addTask("Build Auth");
console.log(admin.greet());
console.log(dev.greet());
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class
- **MDN — Classes**: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes`
- **MDN — Private Fields**: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties`
- **MDN — Map**: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map`
- **MDN — Set**: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set`

---

## Submission Instructions

1. Create a folder named `assignment-15-your-name/`
2. Include your project file: `task-manager.js`
3. Compress to ZIP or push to a GitHub repository
4. Upload to Google Classroom before the deadline
5. **Important:** Your file must run without errors using `node task-manager.js`

**Deadline:** Before Lecture 16

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] `User` base class has `constructor`, `greet()`, `getInfo()`, and `static validateEmail()`
- [ ] At least 3 subclasses (Admin, Manager, Developer) extend User with `super()` called first
- [ ] Each subclass overrides `greet()` with role-specific output (polymorphism)
- [ ] Each subclass has at least one unique method (deleteUser, assignTask, completeTask)
- [ ] `Task` class uses private fields (`#id`, `#status`, `#history`)
- [ ] `Task` status setter validates input and throws on invalid values
- [ ] `Task` history getter returns a copy (`[...this.#history]`), not the original
- [ ] `EventEmitter` class has `on()` returning an unsubscribe function and `emit()`
- [ ] `TaskStore` extends `EventEmitter` and emits events on add/complete
- [ ] At least one composed class (e.g., `TaskManager` HAS-A `Logger` — not extends)
- [ ] `Map` or `Set` used meaningfully (not just created empty)
- [ ] TypeScript comments show interface, access modifiers, or abstract class
- [ ] Console output demonstrates the full system (team, tasks, events, polymorphism)
- [ ] `instanceof` checks prove the inheritance chain works
- [ ] No `var` anywhere — only `const` and `let`
- [ ] All comparisons use `===` and `!==`
- [ ] Code runs without errors: `node task-manager.js`

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **User Hierarchy & Polymorphism** — Base User class, 3+ subclasses with `extends`/`super`, overridden `greet()`, role-specific methods, `instanceof` checks | 25 |
| **Task Encapsulation** — Private `#id`/`#status`/`#history`, validated setter, defensive copy getter, private method | 20 |
| **Observer Pattern** — EventEmitter with `on()`/`emit()`, unsubscribe function, TaskStore emitting events, 2+ subscribers demonstrated | 20 |
| **Composition & Built-in Classes** — At least one composed utility (Logger/Validator), `Map` or `Set` usage with `.size`/`.has()` | 15 |
| **TypeScript Comments & Console Demo** — Interface/access modifier comments, formatted output showing full system in action | 10 |
| **Code Quality & Best Practices** — Clean formatting, meaningful names, no `var`, `===` comparisons, proper `super()` placement, comments on key patterns | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A class hierarchy that works correctly but is missing one subclass still earns most of its points.

---

## Tips for Success

1. **Build piece by piece** — start with User, test it. Then add Admin, test it. Then Task, then EventEmitter. Test each class individually before combining.
2. **Test encapsulation** — try accessing `task.#status` from outside the class to verify it throws. Try pushing to `task.history` to verify the copy works.
3. **Test the Observer** — subscribe, emit, check the output. Unsubscribe, emit again, verify silence. This is the most important pattern for React.
4. **Reference the cheatsheet** — it contains every pattern and syntax you need.
5. **Don't memorize** — look things up. Professional developers reference documentation constantly.

---

## Common Mistakes to Avoid

- Forgetting `super()` as the first line in subclass constructors — causes a `ReferenceError`
- Defining methods inside the constructor (`this.greet = function() {...}`) instead of as class methods — wastes memory, breaks sharing
- Returning the original private array from a getter instead of a copy — external code can mutate your "private" data
- Not testing the unsubscribe function — just showing subscribe + emit isn't enough
- Using `extends` when you mean composition — a TaskManager IS-NOT a Logger
- Forgetting that `Map` and `Set` use `.size`, not `.length`
- Not validating in setters — the whole point of encapsulation is controlled access
- Submitting without running `node task-manager.js` to check for errors

---

## Need Help?

- Review the **lecture recording** on Google Classroom
- Check the **`cheatsheet.md`** file for quick reference on all OOP patterns
- Post questions in the **Google Classroom comments** (classmates can help too)
- Attend office hours (schedule posted on Google Classroom)

The class hierarchy and Observer pattern you're building here is the exact architecture behind React components, Redux stores, and every enterprise application. Admin/Manager/Developer roles? That's RBAC — Role-Based Access Control — used in every production app. The EventEmitter? That's React's state management model. Master these patterns now and Module 3 (React) will feel like putting familiar pieces together in a new way. You've got this — every professional developer started exactly where you are.

---

*NexusBerry Modern Frontend Course — Lecture 15*
*Instructor: Rana M. Ajmal*
