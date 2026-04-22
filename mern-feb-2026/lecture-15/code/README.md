# Task Management System with Role Hierarchy

Lecture 15: Object-Oriented Programming — Classes, Prototypes & Encapsulation

## What You'll Build

A complete task management system using OOP principles — a User class hierarchy (Admin, Manager, Developer) with role-based permissions, a Task class with private fields and validated setters, an EventEmitter implementing the Observer pattern, and a composed TaskManager that ties everything together.

## How to Run

### In Node.js (recommended)

```bash
node script.js
```

> **Note:** Requires Node.js 18+ for `crypto.randomUUID()` support.

### In the Browser

1. Open `index.html` in your browser
2. Open DevTools → Console tab to see all output

## File Structure

```
code/
├── README.md              ← This file
├── index.html             ← HTML entry point (loads script.js)
├── style.css              ← Dark theme styling for the console page
├── script.js              ← Complete working code (5 Parts)
└── script-debug.js        ← Intentional bugs for debugging practice
```

## Key Concepts Covered

- **Part 1:** Object literals, factory functions, `this` binding, method extraction bug
- **Part 2:** Constructor functions, `new` keyword (4 steps), prototype chain, `.prototype` vs `__proto__`
- **Part 3:** ES6 classes, inheritance (`extends`/`super`), polymorphism, static methods, `instanceof`
- **Part 4:** Private fields (`#`), getters/setters, composition vs inheritance, Observer pattern (EventEmitter)
- **Part 5:** Built-in classes (Map, Set, Date), TypeScript OOP preview, capstone demo
