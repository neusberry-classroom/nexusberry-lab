# Lecture 15: Portal Quiz (10 MCQs)

**Instructions:** Complete this quiz on the online portal **before Lecture 16**.
These questions evaluate your understanding of the concepts covered in Lecture 15: Object-Oriented Programming — Classes, Prototypes & Encapsulation.
You may refer to the cheatsheet and lecture recording while attempting.

---

## Question 1

**Context:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

const dog = new Animal("Rex");
console.log(dog.speak());
```

**Question:** What does `console.log(dog.speak())` output?

- A) `undefined makes a sound`
- B) `Rex makes a sound` ✓
- C) `Animal makes a sound`
- D) `TypeError: dog.speak is not a function`

**Answer:** B) `Rex makes a sound`

**Explanation:** When `new Animal("Rex")` is called, the constructor sets `this.name = "Rex"`. The `speak()` method is defined on `Animal.prototype` and uses `this.name` to build the string. Since `dog.speak()` is called with `dog` left of the dot, `this` refers to `dog`, which has `name: "Rex"`. Option A would occur if the constructor didn't receive a name. Option C confuses the class name with the instance's name property. Option D is wrong because `speak` is properly defined as a class method.

---

## Question 2

**Context:**
```javascript
function Car(make, model) {
  this.make = make;
  this.model = model;
}

Car.prototype.describe = function() {
  return `${this.make} ${this.model}`;
};

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Honda", "Civic");
```

**Question:** What does `car1.describe === car2.describe` evaluate to?

- A) `false` — each instance gets a copy of the method
- B) `true` ✓
- C) `TypeError` — you can't compare functions
- D) `undefined` — `describe` doesn't exist on instances

**Answer:** B) `true`

**Explanation:** Methods defined on `Car.prototype` are shared by all instances. Both `car1` and `car2` inherit the same `describe` function from `Car.prototype`, so the strict equality check returns `true` — they reference the exact same function in memory. Option A would be true if `describe` were defined inside the constructor with `this.describe = function() {...}`. Option C is wrong because JavaScript allows function comparison with `===`. Option D is wrong because prototype methods ARE accessible on instances through the prototype chain.

---

## Question 3

**Question:** Which of the following correctly defines a class with a static method?

- A) `class User { static greet() { return this.name; } }` — static methods access instance data via `this`
- B) `class User { constructor() { static validate() {} } }` — static methods go inside the constructor
- C) `class User { static validate(email) { return email.includes("@"); } }` ✓
- D) `class User { validate = static (email) => email.includes("@"); }` — static goes before the arrow

**Answer:** C) `class User { static validate(email) { return email.includes("@"); } }`

**Explanation:** Static methods are defined with the `static` keyword directly in the class body. They are called on the class itself (`User.validate(email)`), not on instances. Option A is misleading — while the syntax is valid, `this` inside a static method refers to the class, not an instance, so `this.name` would be `"User"` (the class name), not an instance's name. Option B is a syntax error — you can't put method definitions inside a constructor. Option D uses invalid syntax — `static` is a keyword modifier, not a prefix for arrow functions.

---

## Question 4

**Context:**
```javascript
class Product {
  #price;

  constructor(name, price) {
    this.name = name;
    this.#price = price;
  }

  get price() {
    return this.#price;
  }
}

const item = new Product("Laptop", 150000);
```

**Question:** What happens when you run `console.log(item.#price)` from OUTSIDE the class?

- A) It logs `150000` — private fields are just a naming convention
- B) It logs `undefined` — private fields return undefined when accessed externally
- C) `SyntaxError` — private fields cannot be accessed outside the class ✓
- D) It logs `150000` but shows a deprecation warning

**Answer:** C) `SyntaxError` — private fields cannot be accessed outside the class

**Explanation:** The `#` prefix creates truly private fields in JavaScript. Attempting to access `item.#price` from outside the `Product` class throws a `SyntaxError` at parse time — not a runtime error, but a syntax-level restriction. This is different from TypeScript's `private` keyword, which only checks at compile time. To read the price, you must use the public getter: `item.price`. Option A confuses `#private` with the `_underscore` convention, which has no enforcement. Option B is wrong because the error occurs before any value could be returned.

---

## Question 5

**Context:**
```javascript
class Vehicle {
  constructor(type) {
    this.type = type;
  }
}

class Truck extends Vehicle {
  constructor(brand) {
    super("truck");
    this.brand = brand;
  }
}

const t = new Truck("Ford");
```

**Question:** What does `Object.getPrototypeOf(t) === Truck.prototype` return?

- A) `false` — `getPrototypeOf` returns the parent class
- B) `true` ✓
- C) `undefined` — instances don't have prototypes
- D) `TypeError` — `getPrototypeOf` only works on plain objects

**Answer:** B) `true`

**Explanation:** `Object.getPrototypeOf(t)` returns the prototype of `t`, which is `Truck.prototype` — the direct constructor's prototype, not the parent class's prototype. The prototype chain continues from there: `Truck.prototype` → `Vehicle.prototype` → `Object.prototype` → `null`. Option A confuses the direct prototype with the grandparent. If you wanted `Vehicle.prototype`, you'd need `Object.getPrototypeOf(Object.getPrototypeOf(t))`. Option C is wrong because every object has a prototype (except `Object.create(null)`). Option D is wrong because `getPrototypeOf` works on any object.

---

## Question 6

**Context:**
```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  describe() {
    return `A ${this.color} circle with radius ${this.radius}`;
  }
}

const shapes = [new Shape("red"), new Circle("blue", 5)];
shapes.forEach(s => console.log(s.describe()));
```

**Question:** What is the output of the `forEach` loop?

- A) `A red shape` and `A blue shape` — Circle uses Shape's describe
- B) `A red shape` and `A blue circle with radius 5` ✓
- C) `A red shape` and `TypeError: s.describe is not a function`
- D) Both print `A undefined shape` — `this.color` is not accessible

**Answer:** B) `A red shape` and `A blue circle with radius 5`

**Explanation:** This demonstrates polymorphism — the same method name (`describe`) produces different output depending on the object's class. `Shape`'s `describe` returns the generic message. `Circle` overrides `describe` with its own version that includes the radius. When `forEach` calls `s.describe()`, JavaScript looks up the method on the actual object's prototype — `Shape.prototype` for the first, `Circle.prototype` for the second. Option A is wrong because Circle has its own `describe` that shadows Shape's. Option D is wrong because `super(color)` correctly sets `this.color` in the parent constructor.

---

## Question 7

**Context:**
```javascript
class EventEmitter {
  #listeners = {};

  on(event, callback) {
    if (!this.#listeners[event]) this.#listeners[event] = [];
    this.#listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.#listeners[event]) {
      this.#listeners[event].forEach(cb => cb(data));
    }
  }
}

const emitter = new EventEmitter();
emitter.on("save", (d) => console.log("A:", d));
emitter.on("save", (d) => console.log("B:", d));
emitter.on("delete", (d) => console.log("C:", d));
emitter.emit("save", "file.txt");
```

**Question:** What is the console output?

- A) `A: file.txt` only
- B) `A: file.txt`, `B: file.txt`, and `C: file.txt`
- C) `A: file.txt` and `B: file.txt` ✓
- D) No output — `emit` doesn't trigger listeners

**Answer:** C) `A: file.txt` and `B: file.txt`

**Explanation:** `emit("save", "file.txt")` triggers ONLY listeners subscribed to the `"save"` event. Two callbacks were registered for `"save"` (A and B), so both fire. The `"delete"` listener (C) is NOT triggered because the emitted event is `"save"`, not `"delete"`. Each event name has its own array of listeners. Option A is wrong because ALL listeners for an event fire, not just the first. Option B is wrong because listeners are event-specific — `"delete"` listeners don't respond to `"save"` events.

---

## Question 8

**Context:**
```javascript
class BankAccount {
  #balance;

  constructor(initial) {
    this.#balance = initial;
  }

  get balance() {
    return this.#balance;
  }

  set balance(amount) {
    if (amount < 0) throw new Error("Balance cannot be negative");
    this.#balance = amount;
  }

  withdraw(amount) {
    this.balance = this.#balance - amount;
  }
}

const account = new BankAccount(1000);
account.withdraw(1500);
```

**Question:** What happens when `account.withdraw(1500)` executes?

- A) The balance becomes `-500` — subtraction works normally
- B) The balance stays at `1000` — negative values are silently ignored
- C) `Error: "Balance cannot be negative"` ✓
- D) `TypeError` — you can't use a setter inside a class method

**Answer:** C) `Error: "Balance cannot be negative"`

**Explanation:** The `withdraw` method sets `this.balance = this.#balance - amount`, which is `1000 - 1500 = -500`. This triggers the `set balance(amount)` setter, which checks `if (amount < 0)` and throws an Error because `-500` is negative. This is the power of encapsulation — even code INSIDE the class goes through the validated setter. Option A would be true if the method directly modified `this.#balance` without using the setter. Option B is wrong because the setter throws an error, not silently rejects. Option D is wrong because setters work normally inside class methods.

---

## Question 9

**Context:**
```javascript
class TaskList {
  #items = [];

  add(task) {
    this.#items.push(task);
  }

  get items() {
    return this.#items;
  }
}

const list = new TaskList();
list.add("Build API");
list.add("Write tests");

const snapshot = list.items;
snapshot.push("HACKED");
console.log(list.items.length);
```

**Question:** What does `console.log(list.items.length)` output?

- A) `2` — the push only affects the snapshot copy
- B) `3` — the getter returns a reference to the private array ✓
- C) `TypeError` — you can't push to a getter result
- D) `0` — private arrays are always empty when accessed externally

**Answer:** B) `3` — the getter returns a reference to the private array

**Explanation:** This is a common encapsulation bug. The getter returns `this.#items` directly — a reference to the actual private array, not a copy. When external code pushes to `snapshot`, it mutates the original private array because both variables point to the same array in memory. The fix is to return a copy: `get items() { return [...this.#items]; }`. With the spread copy, `snapshot.push("HACKED")` would only modify the copy, and `list.items.length` would remain `2`. This is why returning defensive copies from getters is a best practice.

---

## Question 10

**Context:**
```javascript
class Logger {
  log(msg) { console.log(`[LOG] ${msg}`); }
}

class Validator {
  isValid(val) { return val !== null && val !== undefined; }
}

class DataService {
  #logger;
  #validator;
  #cache = new Map();

  constructor() {
    this.#logger = new Logger();
    this.#validator = new Validator();
  }

  process(key, value) {
    if (!this.#validator.isValid(value)) {
      this.#logger.log(`Invalid value for ${key}`);
      return false;
    }
    this.#cache.set(key, value);
    this.#logger.log(`Stored: ${key}`);
    return true;
  }
}
```

**Question:** This `DataService` class uses composition instead of inheritance. Which statement BEST explains why this is the preferred approach here?

- A) Composition is always better than inheritance in every situation
- B) DataService HAS-A Logger and HAS-A Validator — it IS-NOT either one. Composition allows combining multiple capabilities that single inheritance cannot. ✓
- C) JavaScript doesn't support inheritance, so composition is the only option
- D) Composition makes the code run faster because it avoids prototype chain lookups

**Answer:** B) DataService HAS-A Logger and HAS-A Validator — it IS-NOT either one. Composition allows combining multiple capabilities that single inheritance cannot.

**Explanation:** The IS-A vs HAS-A test is the key decision factor. A DataService is not a Logger — it USES a Logger. It also uses a Validator and a Map cache. With JavaScript's single inheritance, you could only extend ONE of these. Composition lets you combine all three without inheritance constraints. Each piece (Logger, Validator) is independently reusable and testable. Option A is too absolute — inheritance IS appropriate for "IS-A" relationships like `Admin extends User`. Option C is wrong because JavaScript fully supports inheritance via `extends`. Option D is wrong because composition doesn't improve performance — it improves flexibility and maintainability.

---

## Self-Assessment

After completing the quiz, rate your confidence in each topic:

| Topic | Confident | Need Review | Lost |
|-------|-----------|-------------|------|
| Class syntax (constructor, methods) | ☐ | ☐ | ☐ |
| Static methods vs instance methods | ☐ | ☐ | ☐ |
| Prototype chain & method sharing | ☐ | ☐ | ☐ |
| Inheritance (extends, super) | ☐ | ☐ | ☐ |
| Polymorphism (method overriding) | ☐ | ☐ | ☐ |
| Private fields (#) & getters/setters | ☐ | ☐ | ☐ |
| Encapsulation & defensive copies | ☐ | ☐ | ☐ |
| Observer pattern (EventEmitter) | ☐ | ☐ | ☐ |
| Composition vs inheritance | ☐ | ☐ | ☐ |
| Built-in classes (Map, Set) | ☐ | ☐ | ☐ |

**Scoring Guide:**
- 9-10: Excellent — ready for Lecture 16 (DOM Manipulation & Event-Driven Programming)
- 7-8: Good — review topics you missed using the cheatsheet
- 5-6: Needs work — rewatch the recording, focus on classes and encapsulation
- Below 5: Schedule office hours — OOP concepts build on each other and are critical for React

---
