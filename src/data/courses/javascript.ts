import type { CourseData } from "@/types/learning";

const javascript: CourseData = {
  id: "javascript",
  title: "JavaScript",
  description: "Kuasai JavaScript modern dari dasar hingga pola lanjutan",
  icon: "⚡",
  color: "from-yellow-500/20 to-orange-500/20",
  difficulty: "beginner",
  totalLessons: 18,
  estimatedHours: "12j",
  chapters: [
    {
      id: "getting-started",
      title: "Persiapan",
      icon: "🚀",
      lessons: [
        {
          id: "introduction",
          title: "Pendahuluan JavaScript",
          description: "Pelajari apa itu JavaScript, mengapa penting, dan bagaimana ia menggerakkan web modern.",
          duration: "8 mnt",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content:
                "JavaScript is the programming language of the web. It runs in every browser, powers servers via Node.js, and is the most widely used language in the world. Whether you want to build interactive websites, mobile apps, or backend services — JavaScript is your gateway.",
            },
            {
              type: "heading",
              content: "What is JavaScript?",
            },
            {
              type: "paragraph",
              content:
                "JavaScript (JS) is a lightweight, interpreted, and just-in-time compiled programming language with first-class functions. It is most well-known as the scripting language for Web pages, but it also runs in non-browser environments like Node.js.",
            },
            {
              type: "tip",
              content:
                "JavaScript was created in just 10 days by Brendan Eich in 1995. Despite its rushed creation, it has grown into one of the most powerful and versatile languages ever made.",
            },
            {
              type: "heading",
              content: "Your First JavaScript",
            },
            {
              type: "paragraph",
              content: "Let's write the classic first program. In JavaScript, you can output text to the browser console using console.log().",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "hello.js",
                code: `// Your first JavaScript program
console.log("Hello, World!");

// You can also show alerts in the browser
alert("Welcome to JavaScript!");

// Or write to the HTML document
document.write("<h1>Hello from JS!</h1>");`,
              },
            },
            {
              type: "heading",
              content: "Where Does JavaScript Run?",
            },
            {
              type: "list",
              items: [
                "In the browser — making websites interactive",
                "On the server — using Node.js for backend APIs",
                "In mobile apps — with React Native",
                "In desktop apps — with Electron",
                "Everywhere — JavaScript has taken over the world",
              ],
            },
            {
              type: "note",
              content:
                "JavaScript is NOT the same as Java. They share a similar name but are completely different languages with different syntax, semantics, and use cases.",
            },
            {
              type: "playground",
              playground: {
                html: `<div id="output" style="font-family:monospace;padding:16px;"></div>`,
                css: `body { background: #0a0a0a; color: #e4e4e7; }
#output { background: #18181b; border: 1px solid #27272a; border-radius: 8px; }`,
                js: `const output = document.getElementById('output');
output.innerHTML = '<p>✅ Hello, World!</p><p>🚀 JavaScript is running!</p><p>⚡ Edit this code to experiment.</p>';`,
              },
            },
          ],
        },
        {
          id: "variables",
          title: "Variables & Data Types",
          description: "Understand var, let, const and the core data types in JavaScript.",
          duration: "12 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content:
                "Variables are containers for storing data values. In modern JavaScript, we use let and const to declare variables. Understanding data types is fundamental to writing correct programs.",
            },
            {
              type: "heading",
              content: "Declaring Variables",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "variables.js",
                code: `// const — cannot be reassigned (preferred)
const name = "Null Coded";
const year = 2024;

// let — can be reassigned
let score = 0;
score = 100; // ✅ works

// var — old way, avoid in modern JS
var oldSchool = "avoid this";

// Multiple assignment
let x = 1, y = 2, z = 3;`,
              },
            },
            {
              type: "heading",
              content: "Data Types",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "types.js",
                code: `// String — text
const greeting = "Hello, World!";
const template = \`Welcome, \${name}!\`; // template literal

// Number — integers and floats
const age = 25;
const price = 19.99;

// Boolean — true or false
const isLoggedIn = true;
const hasSubscription = false;

// null — intentional absence of value
const empty = null;

// undefined — variable declared but not assigned
let notYetDefined;

// Symbol — unique identifier
const id = Symbol("id");

// Object — collection of key-value pairs
const user = { name: "Nasya", age: 30 };

// Array — ordered list
const skills = ["JS", "React", "Node"];

// Check type with typeof
console.log(typeof greeting); // "string"
console.log(typeof age);      // "number"
console.log(typeof isLoggedIn); // "boolean"`,
              },
            },
            {
              type: "warning",
              content:
                "Avoid using var in modern JavaScript. It has function scope (not block scope) which leads to confusing bugs. Always use const by default, and let when you need to reassign.",
            },
            {
              type: "tip",
              content: "Use const for everything by default. Only switch to let if you get an error about reassignment. This makes your code more predictable.",
            },
          ],
        },
        {
          id: "operators",
          title: "Operators & Expressions",
          description: "Master arithmetic, comparison, logical, and assignment operators.",
          duration: "10 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Operators perform operations on values. JavaScript has operators for arithmetic, comparison, logical operations, and more.",
            },
            {
              type: "heading",
              content: "Arithmetic Operators",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "operators.js",
                code: `// Basic math
console.log(10 + 5);  // 15
console.log(10 - 5);  // 5
console.log(10 * 5);  // 50
console.log(10 / 5);  // 2
console.log(10 % 3);  // 1 (remainder)
console.log(2 ** 8);  // 256 (exponent)

// Increment / Decrement
let count = 0;
count++;  // count = 1
count--;  // count = 0

// Comparison operators
console.log(5 === 5);   // true (strict equality)
console.log(5 !== 10);  // true (strict inequality)
console.log(10 > 5);    // true
console.log(10 >= 10);  // true
console.log(5 < 10);    // true

// Logical operators
console.log(true && false); // false (AND)
console.log(true || false); // true (OR)
console.log(!true);         // false (NOT)`,
              },
            },
            {
              type: "warning",
              content: "Always use === (strict equality) instead of == (loose equality). Loose equality does type coercion and leads to bugs like: 0 == false → true, which is almost never what you want.",
            },
          ],
        },
      ],
    },
    {
      id: "control-flow",
      title: "Control Flow",
      icon: "🔀",
      lessons: [
        {
          id: "conditionals",
          title: "If / Else & Conditionals",
          description: "Control program flow using if, else, switch, and ternary operators.",
          duration: "11 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Conditionals let your program make decisions. Depending on whether a condition is true or false, different code will execute.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "conditionals.js",
                code: `const score = 85;

// if / else if / else
if (score >= 90) {
  console.log("A — Excellent!");
} else if (score >= 80) {
  console.log("B — Great job!");
} else if (score >= 70) {
  console.log("C — Keep going!");
} else {
  console.log("F — Study more!");
}
// Output: "B — Great job!"

// Ternary operator (short if/else)
const result = score >= 60 ? "Pass" : "Fail";
console.log(result); // "Pass"

// Nullish coalescing
const username = null ?? "Anonymous";
console.log(username); // "Anonymous"

// Optional chaining
const user = { profile: { name: "Nasya" } };
console.log(user?.profile?.name); // "Nasya"
console.log(user?.settings?.theme); // undefined (no error!)`,
              },
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "switch.js",
                code: `// Switch statement
const day = "Monday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday — time to code!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend — still time to code!");
    break;
  default:
    console.log("Unknown day");
}`,
              },
            },
          ],
        },
        {
          id: "loops",
          title: "Loops & Iteration",
          description: "Iterate with for, while, forEach, and modern array methods.",
          duration: "14 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Loops let you repeat code. JavaScript has several loop types — each suited for different situations.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "loops.js",
                code: `// for loop — classic, full control
for (let i = 0; i < 5; i++) {
  console.log(\`Step \${i + 1}\`);
}

// while loop
let count = 0;
while (count < 3) {
  console.log(\`Count: \${count}\`);
  count++;
}

// for...of — iterate over arrays
const languages = ["JS", "Python", "Rust"];
for (const lang of languages) {
  console.log(lang);
}

// for...in — iterate over object keys
const user = { name: "Nasya", age: 30, role: "dev" };
for (const key in user) {
  console.log(\`\${key}: \${user[key]}\`);
}

// Array methods (modern & preferred)
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(n => console.log(n));
const doubled = numbers.map(n => n * 2);     // [2,4,6,8,10]
const evens = numbers.filter(n => n % 2 === 0); // [2,4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15`,
              },
            },
            {
              type: "tip",
              content: "Prefer array methods (map, filter, reduce) over traditional for loops when working with arrays. They're more readable, functional, and often faster.",
            },
          ],
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      icon: "⚙️",
      lessons: [
        {
          id: "function-basics",
          title: "Function Basics",
          description: "Declare functions, understand parameters, return values, and scope.",
          duration: "13 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Functions are the building blocks of JavaScript. They let you group reusable logic, take inputs (parameters), and return outputs.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "functions.js",
                code: `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("Nasya")); // "Hello, Nasya!"

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function (modern, preferred)
const multiply = (a, b) => a * b;

// Default parameters
const greetUser = (name = "Anonymous") => \`Hi, \${name}!\`;
console.log(greetUser());       // "Hi, Anonymous!"
console.log(greetUser("Nasya")); // "Hi, Nasya!"

// Rest parameters
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3, 4, 5)); // 15

// Destructuring parameters
const createUser = ({ name, age, role = "user" }) => ({
  id: Math.random(),
  name,
  age,
  role,
});`,
              },
            },
          ],
        },
        {
          id: "async-await",
          title: "Async / Await",
          description: "Handle asynchronous operations with modern async/await patterns.",
          duration: "16 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Asynchronous JavaScript allows you to perform long-running tasks (like fetching data from an API) without blocking the rest of your program.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "async.js",
                code: `// Promises
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Nasya", role: "developer" });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
};

// async/await — cleaner than .then()
const loadUser = async (id) => {
  try {
    const user = await fetchUser(id);
    console.log("User:", user);
    return user;
  } catch (error) {
    console.error("Failed:", error.message);
  }
};

// Fetch API (real HTTP requests)
const getPost = async (id) => {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  const data = await response.json();
  return data;
};

// Parallel requests
const [user, posts] = await Promise.all([
  fetchUser(1),
  getPost(1),
]);`,
              },
            },
            {
              type: "warning",
              content: "Always wrap await calls in try/catch blocks. Unhandled promise rejections will crash your app silently in some environments.",
            },
          ],
        },
      ],
    },
    {
      id: "modern-js",
      title: "Modern JavaScript",
      icon: "✨",
      lessons: [
        {
          id: "destructuring",
          title: "Destructuring & Spread",
          description: "Unpack arrays and objects with destructuring, use the spread operator.",
          duration: "10 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Destructuring and the spread operator are powerful ES6+ features that make working with arrays and objects clean and expressive.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "destructuring.js",
                code: `// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Object destructuring
const { name, age, role = "user" } = { name: "Nasya", age: 30 };
console.log(name); // "Nasya"
console.log(role); // "user" (default)

// Rename while destructuring
const { name: fullName } = { name: "Nasya Johnson" };
console.log(fullName); // "Nasya Johnson"

// Spread operator
const defaults = { theme: "dark", lang: "en", notifications: true };
const userPrefs = { ...defaults, lang: "id", fontSize: 16 };
// { theme: "dark", lang: "id", notifications: true, fontSize: 16 }

// Spread arrays
const nums = [1, 2, 3];
const moreNums = [...nums, 4, 5, 6]; // [1,2,3,4,5,6]

// Clone without reference
const original = { x: 1, y: 2 };
const copy = { ...original };`,
              },
            },
          ],
        },
        {
          id: "modules",
          title: "ES Modules",
          description: "Organize code with import and export syntax.",
          duration: "9 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "ES Modules let you split your code into reusable files. This is how modern JavaScript projects are organized.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "math.js",
                code: `// math.js — named exports
export const PI = 3.14159;
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Default export
export default class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
}`,
              },
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "main.js",
                code: `// Import named exports
import { PI, add, multiply } from "./math.js";
console.log(PI);         // 3.14159
console.log(add(2, 3));  // 5

// Import default export
import Calculator from "./math.js";
const calc = new Calculator();
calc.add(10, 5); // 15

// Import everything
import * as MathUtils from "./math.js";
MathUtils.add(1, 2);

// Dynamic import (lazy loading)
const module = await import("./heavy-module.js");`,
              },
            },
          ],
        },
        {
          id: "closures",
          title: "Closures & Scope",
          description: "Understand lexical scope, closures, and how JavaScript manages memory.",
          duration: "15 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "A closure is a function that remembers the variables from its outer scope, even after that outer function has finished executing. This is one of the most powerful features of JavaScript.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "closures.js",
                code: `// Basic closure
function makeCounter() {
  let count = 0; // private variable!

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log(counter.getCount()); // 1
// count is not accessible from outside!

// Practical closure: memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // imagine this takes 2 seconds
  return n * n;
});`,
              },
            },
            {
              type: "tip",
              content: "Closures are used everywhere in JavaScript — in React hooks, event listeners, module patterns, and more. Mastering closures means mastering JavaScript.",
            },
          ],
        },
      ],
    },
    {
      id: "dom",
      title: "DOM & Browser APIs",
      icon: "🌐",
      lessons: [
        {
          id: "dom-basics",
          title: "DOM Manipulation",
          description: "Select, create, modify, and delete HTML elements with JavaScript.",
          duration: "14 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "The Document Object Model (DOM) is a programming interface for HTML documents. JavaScript can select and change all elements, attributes, and styles in the page.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "dom.js",
                code: `// Selecting elements
const title = document.getElementById("title");
const buttons = document.querySelectorAll(".btn");
const firstLink = document.querySelector("a");

// Reading / Writing content
title.textContent = "New Title";
title.innerHTML = "<span>Rich <b>HTML</b></span>";

// Changing styles
title.style.color = "#0ea5e9";
title.classList.add("active");
title.classList.toggle("hidden");
title.classList.remove("disabled");

// Creating elements
const card = document.createElement("div");
card.className = "card glass";
card.textContent = "Dynamic card!";
document.body.appendChild(card);

// Event listeners
const btn = document.querySelector("#submit");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Button clicked!", event.target);
});

// Data attributes
card.dataset.id = "123";
console.log(card.dataset.id); // "123"`,
              },
            },
            {
              type: "playground",
              playground: {
                html: `<div style="padding:20px">
  <h2 id="title" style="color:#38bdf8">Click the button!</h2>
  <button id="btn" style="background:#0ea5e9;color:white;padding:8px 16px;border:none;border-radius:8px;cursor:pointer">
    Change Text
  </button>
  <div id="output" style="margin-top:12px"></div>
</div>`,
                css: `body { background: #09090b; color: #e4e4e7; font-family: sans-serif; }`,
                js: `let count = 0;
document.getElementById('btn').addEventListener('click', () => {
  count++;
  document.getElementById('title').textContent = \`Clicked \${count} times!\`;
  document.getElementById('output').innerHTML = \`<p style="color:#4ade80">✅ DOM manipulation works!</p>\`;
});`,
              },
            },
          ],
        },
        {
          id: "events",
          title: "Events & Event Handling",
          description: "Master browser events, event bubbling, delegation, and custom events.",
          duration: "12 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Events are actions that happen in the browser — clicks, keypresses, form submissions, page loads. JavaScript listens for and responds to these events.",
            },
            {
              type: "code",
              code: {
                language: "javascript",
                filename: "events.js",
                code: `// Mouse events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseover", handler);
element.addEventListener("mouseout", handler);

// Keyboard events
document.addEventListener("keydown", (e) => {
  console.log(e.key, e.code, e.ctrlKey);
  if (e.key === "Escape") closeModal();
  if (e.ctrlKey && e.key === "s") save();
});

// Form events
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload
  const data = new FormData(e.target);
  console.log(Object.fromEntries(data));
});

// Event delegation (efficient!)
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.matches(".item")) {
    console.log("Clicked item:", e.target.dataset.id);
  }
});

// Custom events
const event = new CustomEvent("userLoggedIn", {
  detail: { userId: "123", timestamp: Date.now() },
});
document.dispatchEvent(event);`,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default javascript;
