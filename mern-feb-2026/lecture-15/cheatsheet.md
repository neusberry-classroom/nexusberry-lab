# Object-Oriented Programming — Classes, Prototypes & Encapsulation Cheatsheet
<!-- SYNC: cheatsheet.md sections must match presentation ending slides -->

Quick reference for all OOP concepts covered in Lecture 15: object literals, factory functions, constructor functions, prototypes, ES6 classes, inheritance, encapsulation, composition, the Observer pattern, built-in classes, and TypeScript OOP.

---

## Object Literals & Factory Functions

```javascript
// Object literal — fine for one-off objects
const user1 = {
  name: "Ali Khan",
  email: "ali@nexusberry.com",
  role: "admin",
  greet() {
    return `Hi, I'm ${this.name} (${this.role})`;
  }
};

// Factory function — reusable template
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
```

| Approach | Shared Methods | `instanceof` | Inheritance |
|----------|---------------|---------------|-------------|
| Object Literal | No (duplicated) | No | No |
| Factory Function | No (duplicated) | No | No |
| Constructor Function | Yes (prototype) | Yes | Manual |
| ES6 Class | Yes (prototype) | Yes | Built-in |

> **Pro Tip:** Use object literals for simple config/data. Use classes when you need shared behavior, type identity (`instanceof`), or hierarchies.

---

## The `this` Keyword

`this` = **whatever is LEFT of the dot** when the function is called.

```javascript
const user = {
  name: "Ali",
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

user.greet();           // "Hi, I'm Ali" — `this` = user

const greetFn = user.greet;
greetFn();              // "Hi, I'm undefined" — no dot, `this` lost!

// Fix 1: .bind()
const greetBound = user.greet.bind(user);
greetBound();           // "Hi, I'm Ali" ✓

// Fix 2: Arrow function wrapper
const greetArrow = () => user.greet();
greetArrow();           // "Hi, I'm Ali" ✓
```

| Binding Type | Example | `this` = |
|-------------|---------|----------|
| **Implicit** | `user.greet()` | `user` (left of dot) |
| **Explicit** | `greet.bind(user)()` | `user` (manually set) |
| **`new`** | `new User("Ali")` | New object being created |
| **Arrow function** | `() => this.name` | Inherited from enclosing scope |
| **Lost** | `const fn = user.greet; fn()` | `undefined` (strict) / `window` |

> **Pro Tip:** If you extract a method and pass it as a callback, always `.bind()` it or wrap it in an arrow function. This bug appears constantly in React event handlers.

---

## Constructor Functions & Prototypes

```javascript
// Constructor — PascalCase by convention
function User(name, email, role) {
  this.name = name;
  this.email = email;
  this.role = role;
}

// Methods on prototype — shared by ALL instances
User.prototype.greet = function () {
  return `Hi, I'm ${this.name} (${this.role})`;
};

const ali = new User("Ali Khan", "ali@nexusberry.com", "admin");
const sara = new User("Sara Ahmed", "sara@nexusberry.com", "developer");

ali.greet === sara.greet; // true — one copy, shared!
ali instanceof User;       // true ✓
```

**What `new` does (4 steps):**
1. Creates a fresh empty object `{}`
2. Links its prototype to `Constructor.prototype`
3. Runs the constructor with `this` = new object
4. Returns the object automatically

**Prototype Chain:**

```
ali (instance)
  ├── name, email, role        ← own properties
  └── [[Prototype]] → User.prototype
                        ├── greet()            ← shared methods
                        └── [[Prototype]] → Object.prototype
                                              ├── toString(), hasOwnProperty()
                                              └── [[Prototype]] → null
```

| Term | Lives On | Purpose |
|------|----------|---------|
| `.prototype` | Functions | The shared method bag for instances |
| `__proto__` | Instances | Link to the constructor's prototype |
| `Object.getPrototypeOf()` | — | Modern way to read `__proto__` |
| `hasOwnProperty()` | — | Check if property is own vs inherited |

> **Pro Tip:** Never modify `Object.prototype` or `Array.prototype` — it affects every object/array in your application. Only add methods to YOUR class prototypes.

---

## ES6 Classes

```javascript
class User {
  constructor(name, email, role) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = new Date().toISOString();
  }

  // Instance method — goes on User.prototype automatically
  greet() {
    return `Hi, I'm ${this.name} (${this.role})`;
  }

  getInfo() {
    return `${this.name} <${this.email}> — Role: ${this.role}`;
  }

  // Static method — called on the CLASS, not instances
  static validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

const ali = new User("Ali Khan", "ali@nexusberry.com", "admin");
ali.greet();                                // instance method
User.validateEmail("ali@nexusberry.com");   // static method
// ali.validateEmail(...)                   // TypeError! Static ≠ instance
```

| Feature | Instance Method | Static Method |
|---------|----------------|---------------|
| Called on | `ali.greet()` | `User.validateEmail()` |
| Has `this` | Yes (the instance) | No |
| On prototype | Yes | No |
| Use for | Behavior needing instance data | Utilities, factories, validation |

> **Pro Tip:** Ask yourself: "Does this method need `this` (instance data)?" If no — make it `static`. Examples: `User.validateEmail(email)`, `User.fromJSON(data)`.

---

## Inheritance — `extends` & `super`

```javascript
class Admin extends User {
  constructor(name, email) {
    super(name, email, "admin");  // MUST be first line!
    this.permissions = ["create", "read", "update", "delete", "manage-users"];
  }

  deleteUser(user) {
    return `${this.name} deleted user: ${user.name}`;
  }

  // Override parent method — polymorphism
  greet() {
    return `👑 Admin ${this.name} — Full access granted`;
  }
}

class Developer extends User {
  constructor(name, email, skills = []) {
    super(name, email, "developer");
    this.skills = skills;
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

// Calling parent methods with super
class TeamLead extends Developer {
  constructor(name, email, skills, teamSize) {
    super(name, email, skills);
    this.teamSize = teamSize;
  }

  greet() {
    const devGreet = super.greet();  // Call parent's greet
    return `${devGreet} | Leading team of ${this.teamSize}`;
  }
}
```

**`instanceof` checks the ENTIRE chain:**

```javascript
const dev = new Developer("Ali", "ali@x.com", ["JS"]);
dev instanceof Developer; // true
dev instanceof User;      // true — Developer IS-A User
dev instanceof Object;    // true — everything IS-A Object
```

**Inheritance Rules:**
- `super()` MUST be called before `this` in subclass constructors
- `super.method()` calls the parent's version of a method
- `instanceof` walks the entire prototype chain
- Override only when behavior genuinely differs

> **Pro Tip:** Use `super.method()` to extend parent behavior rather than rewriting from scratch. This keeps your code DRY and maintains the parent's logic.

---

## Encapsulation — Private Fields & Getters/Setters

```javascript
class Task {
  #id;           // Private — only this class can access
  #status;
  #history;

  constructor(title, priority = "medium") {
    this.#id = crypto.randomUUID();
    this.title = title;
    this.priority = priority;
    this.#status = "pending";
    this.#history = [{ action: "created", timestamp: new Date().toISOString() }];
  }

  // Getter — controlled read access
  get id() { return this.#id; }
  get status() { return this.#status; }
  get history() { return [...this.#history]; }  // Return COPY!

  // Setter with validation — controlled write access
  set status(newStatus) {
    const valid = ["pending", "in-progress", "review", "completed"];
    if (!valid.includes(newStatus)) {
      throw new Error(`Invalid status: "${newStatus}"`);
    }
    const old = this.#status;
    this.#status = newStatus;
    this.#logChange(`Status: ${old} → ${newStatus}`);
  }

  // Private method
  #logChange(message) {
    this.#history.push({ action: message, timestamp: new Date().toISOString() });
  }
}

const task = new Task("Build Login", "high");
task.status;                // "pending" (getter)
task.status = "in-progress"; // setter validates ✓
// task.status = "done";    // Error: Invalid status
// task.#id;                // SyntaxError — truly private
```

| Access | Syntax | Who Can Access |
|--------|--------|---------------|
| Public | `this.name` | Everyone |
| Private | `this.#name` | Only the class itself |
| Getter | `get name() { }` | Controlled read |
| Setter | `set name(v) { }` | Controlled write (with validation) |

> **Pro Tip:** Always return COPIES from getters that expose arrays or objects. `return [...this.#items]` prevents external code from mutating your private data through the reference.

---

## Composition vs Inheritance

```javascript
// Inheritance: "IS-A" — Admin IS-A User
class Admin extends User { ... }

// Composition: "HAS-A" — TaskManager HAS-A Logger
class TaskManager {
  #logger = new Logger();
  #validator = new Validator();
  #notifier = new NotificationService();

  addTask(title, assignee) {
    if (!this.#validator.validateName(title)) throw new Error("Invalid title");
    const task = new Task(title);
    this.#logger.log(`Task added: "${title}"`);
    this.#notifier.notify(assignee, `New task: "${title}"`);
    return task;
  }
}
```

| | Inheritance | Composition |
|---|---|---|
| Relationship | IS-A | HAS-A |
| Example | `Admin extends User` | `TaskManager` uses `Logger` |
| Flexibility | Single parent only | Combine unlimited pieces |
| Coupling | Tight (parent changes affect all) | Loose (swap components freely) |
| When to use | Clear type hierarchies | Mixing capabilities |

> **Pro Tip:** When in doubt, prefer composition. You can always combine multiple independent pieces, but JavaScript only allows single inheritance.

---

## Observer Pattern — The React Connection

```javascript
class EventEmitter {
  #listeners = {};

  on(event, callback) {
    if (!this.#listeners[event]) this.#listeners[event] = [];
    this.#listeners[event].push(callback);
    // Return unsubscribe function (like React useEffect cleanup!)
    return () => {
      this.#listeners[event] = this.#listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.#listeners[event]) {
      this.#listeners[event].forEach(cb => cb(data));
    }
  }
}

class TaskStore extends EventEmitter {
  #tasks = [];

  addTask(title) {
    const task = new Task(title);
    this.#tasks.push(task);
    this.emit("taskAdded", task);
    this.emit("change", this.getTasks());
    return task;
  }

  getTasks() { return [...this.#tasks]; }
}

// Subscribe → React equivalent
const unsub = store.on("taskAdded", (task) => {
  console.log(`New: ${task.title}`);
});

store.addTask("Build Dashboard");  // Triggers all subscribers
unsub();                           // Cleanup — like useEffect return
store.addTask("Write Tests");      // No notification to unsubscribed listener
```

| Observer Pattern | React Equivalent |
|-----------------|-----------------|
| `emitter.on(event, fn)` | `useEffect(() => { subscribe(); })` |
| Returned unsubscribe function | `useEffect` cleanup: `return () => unsub()` |
| `emitter.emit(event, data)` | `setState(newData)` |
| Listeners re-fire on emit | Components re-render on state change |

> **Pro Tip:** Always unsubscribe when done — forgetting causes memory leaks. In React, this is the cleanup function returned from `useEffect`. The pattern is identical.

---

## Built-in Classes — Map, Set, Date

### Map — Key-Value Pairs (Any Key Type)

```javascript
const assignments = new Map();
assignments.set(adminObj, ["Review PRs"]);  // Object as key!
assignments.get(adminObj);                   // ["Review PRs"]
assignments.has(adminObj);                   // true
assignments.size;                            // 1 (not .length!)
assignments.delete(adminObj);
```

### Set — Unique Values Only

```javascript
const skills = new Set(["JS", "React", "JS", "TS", "React"]);
// Set { "JS", "React", "TS" } — duplicates removed!
skills.size;           // 3
skills.add("Node.js");
skills.has("TS");      // true
skills.delete("React");

// Deduplicate an array:
const unique = [...new Set(["bug", "feature", "bug"])];
// ["bug", "feature"]
```

### Date — Working with Time

```javascript
const now = new Date();
const deadline = new Date("2026-04-15");
now.toLocaleDateString();              // "4/1/2026"
deadline.toLocaleDateString("en-PK");  // "15/04/2026"
now instanceof Date;                   // true — Date is a class!
```

| Built-in | Use Case | Key Gotcha |
|----------|----------|-----------|
| `Map` | Key-value with non-string keys | Use `.size`, not `.length` |
| `Set` | Unique collections, deduplication | Use `.size`, not `.length` |
| `Date` | Timestamps, deadlines | Month is 0-indexed (Jan = 0) |

---

## TypeScript OOP Preview

```typescript
// Access modifiers
class User {
  public name: string;       // Accessible everywhere (default)
  private email: string;     // Only in this class (like #email)
  protected role: string;    // This class AND subclasses
}

// Abstract classes — can't be instantiated, must be extended
abstract class Shape {
  abstract area(): number;          // Subclasses MUST implement
  describe(): string {              // Concrete — inherited as-is
    return `Area: ${this.area()}`;
  }
}

// Interfaces — contracts for class structure
interface Printable {
  print(): string;
}
interface Serializable {
  toJSON(): object;
}

// Multiple interfaces (unlike single inheritance!)
class Task implements Printable, Serializable {
  constructor(public title: string, private status: string = "pending") {}
  print(): string { return `[${this.status}] ${this.title}`; }
  toJSON(): object { return { title: this.title, status: this.status }; }
}
```

| TypeScript Feature | JavaScript Equivalent | Checked At |
|---|---|---|
| `private` | `#field` | Compile time |
| `protected` | No equivalent | Compile time |
| `abstract class` | No equivalent | Compile time |
| `implements` | No equivalent (duck typing) | Compile time |
| Constructor shorthand: `constructor(public name: string)` | Manual `this.name = name` | — |

---

## Common Mistakes to Avoid

### Mistake 1: Method in Constructor Instead of Class Body

```javascript
// ❌ WRONG — creates new function for each instance
class User {
  constructor(name) {
    this.name = name;
    this.greet = function() { return `Hi, ${this.name}`; };
  }
}

// ✅ CORRECT — method on prototype, shared by all
class User {
  constructor(name) { this.name = name; }
  greet() { return `Hi, ${this.name}`; }
}
```

### Mistake 2: Using `this` Before `super()`

```javascript
// ❌ WRONG — ReferenceError!
class Admin extends User {
  constructor(name) {
    this.name = name;      // `this` doesn't exist yet!
    super(name, "admin");
  }
}

// ✅ CORRECT — super() first, always
class Admin extends User {
  constructor(name) {
    super(name, "admin");  // Creates `this`
    this.permissions = ["all"];
  }
}
```

### Mistake 3: Getter Returns Private Array Reference

```javascript
// ❌ WRONG — external code can mutate private data
get tasks() { return this.#tasks; }

// ✅ CORRECT — return a copy
get tasks() { return [...this.#tasks]; }
```

### Mistake 4: Forgetting `new` with Constructor Functions

```javascript
// ❌ WRONG — returns undefined, pollutes global scope
function User(name) { this.name = name; }
const ali = User("Ali");     // ali = undefined!

// ✅ CORRECT — use new (or use class syntax, which enforces it)
const ali = new User("Ali"); // ali = { name: "Ali" }
```

### Mistake 5: Extracting Method Loses `this`

```javascript
// ❌ WRONG — `this` is lost
const greetFn = user.greet;
greetFn(); // "Hi, I'm undefined"

// ✅ CORRECT — bind or wrap
const greetFn = user.greet.bind(user);
greetFn(); // "Hi, I'm Ali"
```

---

## VS Code Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Go to Definition | `F12` | `F12` |
| Peek Definition | `Alt+F12` | `Opt+F12` |
| Rename Symbol (class/method) | `F2` | `F2` |
| Fold/Unfold Code Block | `Ctrl+Shift+[` / `]` | `Cmd+Opt+[` / `]` |
| Run File in Terminal | `Ctrl+` `` ` `` then `node app.js` | `Cmd+` `` ` `` then `node app.js` |
| Multi-cursor (edit multiple `this`) | `Ctrl+D` | `Cmd+D` |
| Open Integrated Terminal | `` Ctrl+` `` | `` Cmd+` `` |

---

## Quick Reference Table

| Concept | Syntax | Key Point |
|---------|--------|-----------|
| Class | `class User { constructor() {} }` | Blueprint for objects |
| Constructor | `constructor(name) { this.name = name }` | Runs on `new` |
| Instance method | `greet() { return ... }` | Auto-prototype, shared |
| Static method | `static validate() { ... }` | Called on class, not instance |
| Inheritance | `class Admin extends User` | IS-A relationship |
| Super constructor | `super(name, email)` | Must be first in subclass |
| Super method | `super.greet()` | Call parent version |
| Private field | `#balance` | Only accessible inside class |
| Getter | `get name() { return this.#name }` | Controlled read |
| Setter | `set name(v) { this.#name = v }` | Controlled write |
| Prototype | `User.prototype.greet = fn` | Pre-class shared methods |
| instanceof | `ali instanceof User` | Checks entire chain |
| Map | `new Map()` / `.set()` / `.get()` | Any key type, `.size` |
| Set | `new Set([...])` | Unique values, `.size` |
| Observer | `emitter.on(event, cb)` | Subscribe to changes |
| Emit | `emitter.emit(event, data)` | Notify all subscribers |
| Unsubscribe | `const unsub = on(...); unsub()` | Cleanup to prevent leaks |

---

## What's Next?

**Lecture 16: DOM Manipulation & Event-Driven Programming**
- *Project: Interactive Task Board with Drag & Drop*
- Selecting and creating HTML elements with JavaScript
- Event listeners — `addEventListener`, event delegation, bubbling
- Dynamic UI updates — rendering lists, toggling visibility
- Form handling with regex validation from Lecture 13
- `data-*` attributes and the `dataset` property
- The Observer pattern from today maps directly to DOM events: `addEventListener` = `on()`, `removeEventListener` = unsubscribe

> Your Task Management System from today gets a visual interface in Lecture 16 — users will drag tasks between columns, click to edit, and see real-time updates. Everything connects.

---

*NexusBerry Modern Frontend Course — Lecture 15*
*Instructor: Rana M. Ajmal*
