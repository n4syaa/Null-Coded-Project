import type { CourseData } from "@/types/learning";

const python: CourseData = {
  id: "python",
  title: "Python",
  description: "Pelajari Python dari nol — scripting, sains data, dan pengembangan web",
  icon: "🐍",
  color: "from-emerald-500/20 to-teal-500/20",
  difficulty: "beginner",
  totalLessons: 12,
  estimatedHours: "9h",
  chapters: [
    {
      id: "python-basics",
      title: "Dasar Python",
      icon: "🐍",
      lessons: [
        {
          id: "introduction",
          title: "Pendahuluan Python",
          description: "Apa itu Python, mengapa ia dicintai, dan bagaimana cara memulainya.",
          duration: "9 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content:
                "Python is a high-level, general-purpose programming language known for its clean, readable syntax. Created by Guido van Rossum in 1991, it has become one of the most popular languages in the world — loved for data science, AI, web development, automation, and more.",
            },
            {
              type: "heading",
              content: "Mengapa Python?",
            },
            {
              type: "list",
              items: [
                "Simple, readable syntax — looks almost like English",
                "Huge standard library — batteries included",
                "Dominant in data science and AI (NumPy, Pandas, PyTorch, TensorFlow)",
                "Web development with Django and FastAPI",
                "Automation and scripting for any task",
                "Most popular language in the world in 2024",
              ],
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "hello.py",
                code: `# Your first Python program
print("Hello, World!")

# Python is expressive and readable
name = "Null Coded"
version = 3.12
is_awesome = True

print(f"Welcome to {name}!")
print(f"Python {version} is awesome: {is_awesome}")

# No semicolons, no braces — just clean code
def greet(name):
    return f"Hello, {name}!"

message = greet("Nasya")
print(message)  # Hello, Nasya!`,
              },
            },
            {
              type: "tip",
              content: "Python uses indentation (spaces/tabs) to define code blocks instead of curly braces. This forces readable, consistent formatting — one of the reasons Python code is so clean.",
            },
          ],
        },
        {
          id: "variables",
          title: "Variables & Data Types",
          description: "Python's dynamic typing, built-in types, and type hints.",
          duration: "11 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Python is dynamically typed — you don't need to declare variable types. Python figures it out at runtime. But with type hints (Python 3.5+), you can add optional type annotations for clarity.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "types.py",
                code: `# Basic types
name: str = "Nasya"          # string
age: int = 30               # integer
height: float = 1.82        # float
is_active: bool = True      # boolean

# None (like null in other languages)
result = None

# Collections
skills: list = ["Python", "JS", "Rust"]
coords: tuple = (40.7128, -74.0060)   # immutable
unique_ids: set = {1, 2, 3, 4}         # no duplicates
user: dict = {"name": "Nasya", "age": 30}  # key-value

# Check type
print(type(name))    # <class 'str'>
print(type(42))      # <class 'int'>

# Type conversion
num_str = "42"
num = int(num_str)   # "42" -> 42
text = str(100)      # 100 -> "100"
flt = float("3.14")  # "3.14" -> 3.14

# Multiple assignment
x, y, z = 1, 2, 3
first, *rest = [1, 2, 3, 4, 5]
# first = 1, rest = [2, 3, 4, 5]`,
              },
            },
          ],
        },
        {
          id: "strings",
          title: "Strings & String Methods",
          description: "String manipulation, formatting, and common string operations.",
          duration: "12 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Strings are one of the most used data types. Python has a rich set of string methods and formatting options.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "strings.py",
                code: `text = "Hello, Null Coded!"

# Basic operations
print(len(text))           # 17
print(text.upper())        # "HELLO, NULL CODED!"
print(text.lower())        # "hello, null coded!"
print(text.strip())        # remove whitespace
print(text.replace("Hello", "Hi"))  # "Hi, Null Coded!"

# Slicing
print(text[0])       # "H"
print(text[0:5])     # "Hello"
print(text[-7:])     # "Coded!"
print(text[::-1])    # reverse!

# Check contents
print("Null" in text)        # True
print(text.startswith("Hi")) # False
print(text.endswith("!"))    # True

# Split and join
words = text.split(", ")    # ["Hello", "Null Coded!"]
joined = " | ".join(words)  # "Hello | Null Coded!"

# f-strings (modern formatting)
name = "Nasya"
score = 98.5
print(f"Name: {name}, Score: {score:.1f}%")
# "Name: Nasya, Score: 98.5%"

# Multi-line strings
sql = """
    SELECT *
    FROM users
    WHERE active = True
"""`,
              },
            },
          ],
        },
      ],
    },
    {
      id: "python-control-flow",
      title: "Control Flow",
      icon: "🔀",
      lessons: [
        {
          id: "conditionals",
          title: "Conditionals",
          description: "if/elif/else, match statements, and conditional expressions.",
          duration: "10 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Python conditionals use indentation to define blocks. The match statement (Python 3.10+) provides powerful pattern matching.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "conditionals.py",
                code: `score = 85

# if / elif / else
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")  # Grade: B

# Ternary expression
status = "pass" if score >= 60 else "fail"

# Walrus operator (:=) — Python 3.8+
import re
if m := re.search(r"(\d+)", "Age: 25"):
    print(f"Found number: {m.group(1)}")

# match statement — Python 3.10+
command = "quit"
match command:
    case "quit" | "exit":
        print("Goodbye!")
    case "hello":
        print("Hello!")
    case _:
        print(f"Unknown: {command}")`,
              },
            },
          ],
        },
        {
          id: "loops",
          title: "Loops & Comprehensions",
          description: "for loops, while loops, and Python's powerful list comprehensions.",
          duration: "13 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Python loops are clean and expressive. List comprehensions are a uniquely Pythonic way to create lists in a single line.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "loops.py",
                code: `# for loop with range
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)

# iterate over collections
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# enumerate — get index AND value
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# zip — iterate multiple at once
names = ["Alice", "Bob", "Charlie"]
scores = [90, 85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# while loop
count = 0
while count < 5:
    print(count)
    count += 1

# List comprehension (Pythonic!)
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Dict comprehension
word_lengths = {word: len(word) for word in ["cat", "dog", "elephant"]}
# {"cat": 3, "dog": 3, "elephant": 8}`,
              },
            },
            {
              type: "tip",
              content: "List comprehensions are faster than equivalent for loops in Python because they're optimized at the C level. Prefer them for creating new lists from existing iterables.",
            },
          ],
        },
      ],
    },
    {
      id: "python-functions",
      title: "Functions & Modules",
      icon: "⚙️",
      lessons: [
        {
          id: "functions",
          title: "Functions",
          description: "Define functions, use args/kwargs, lambdas, and decorators.",
          duration: "14 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Python functions are first-class objects — they can be passed as arguments, returned from other functions, and stored in variables.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "functions.py",
                code: `# Basic function
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

print(greet("Nasya"))           # "Hello, Nasya!"
print(greet("Sam", "Hi"))     # "Hi, Sam!"

# *args — variable positional arguments
def add(*numbers: float) -> float:
    return sum(numbers)

print(add(1, 2, 3, 4, 5))  # 15

# **kwargs — variable keyword arguments
def create_user(**kwargs) -> dict:
    defaults = {"role": "user", "active": True}
    return {**defaults, **kwargs}

user = create_user(name="Nasya", age=30)
# {"role": "user", "active": True, "name": "Nasya", "age": 30}

# Lambda functions
square = lambda x: x ** 2
sort_key = lambda item: item["score"]

students = [{"name": "Bob", "score": 85}, {"name": "Alice", "score": 92}]
students.sort(key=sort_key, reverse=True)

# Decorator
import time
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)`,
              },
            },
          ],
        },
        {
          id: "oop",
          title: "Object-Oriented Python",
          description: "Classes, inheritance, dataclasses, and Python's OOP model.",
          duration: "15 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Python supports object-oriented programming with classes. Modern Python uses dataclasses for simple data containers.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "oop.py",
                code: `from dataclasses import dataclass, field
from typing import Optional

@dataclass
class User:
    name: str
    email: str
    age: int
    role: str = "user"
    skills: list[str] = field(default_factory=list)

    def __post_init__(self):
        self.email = self.email.lower()

    @property
    def display_name(self) -> str:
        return f"{self.name} ({self.role})"

    def add_skill(self, skill: str) -> None:
        if skill not in self.skills:
            self.skills.append(skill)

    def __repr__(self) -> str:
        return f"User({self.name!r}, {self.role!r})"


# Inheritance
class AdminUser(User):
    role: str = "admin"
    permissions: list[str] = field(default_factory=list)

    def grant_permission(self, perm: str) -> None:
        self.permissions.append(perm)


# Usage
nasya = User(name="Nasya", email="nasya@example.com", age=30)
nasya.add_skill("Python")
nasya.add_skill("React")

print(nasya.display_name)  # "Nasya (user)"
print(nasya.email)         # "nasya@example.com" (lowercased)`,
              },
            },
          ],
        },
        {
          id: "standard-library",
          title: "Standard Library",
          description: "os, pathlib, json, datetime, collections, and more built-in power tools.",
          duration: "12 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Python's 'batteries included' philosophy means the standard library has modules for almost everything you need.",
            },
            {
              type: "code",
              code: {
                language: "python",
                filename: "stdlib.py",
                code: `from pathlib import Path
from datetime import datetime, timedelta
from collections import Counter, defaultdict
import json
import os

# pathlib — modern file system
current = Path.cwd()
config = Path.home() / ".config" / "app.json"
config.parent.mkdir(parents=True, exist_ok=True)
config.write_text(json.dumps({"theme": "dark"}))
data = json.loads(config.read_text())

# datetime
now = datetime.now()
tomorrow = now + timedelta(days=1)
formatted = now.strftime("%Y-%m-%d %H:%M")
parsed = datetime.fromisoformat("2024-01-15T10:30:00")

# collections
words = "the quick brown fox jumps over the lazy dog".split()
counts = Counter(words)
print(counts.most_common(3))  # [("the", 2), ...]

scores = defaultdict(list)
scores["Alice"].append(90)
scores["Bob"].append(85)

# Environment variables
api_key = os.environ.get("API_KEY", "default-key")
debug = os.getenv("DEBUG", "false").lower() == "true"`,
              },
            },
          ],
        },
      ],
    },
  ],
};

export default python;
