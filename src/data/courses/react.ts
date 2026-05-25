import type { CourseData } from "@/types/learning";

const react: CourseData = {
  id: "react",
  title: "React",
  description: "Bangun UI modern dengan React 19, hooks, dan model komponen",
  icon: "⚛️",
  color: "from-cyan-500/20 to-blue-500/20",
  difficulty: "intermediate",
  totalLessons: 14,
  estimatedHours: "10h",
  chapters: [
    {
      id: "react-fundamentals",
      title: "Dasar-dasar React",
      icon: "🧱",
      lessons: [
        {
          id: "introduction",
          title: "Pendahuluan React",
          description: "Pahami model komponen React dan mengapa ia mengubah pengembangan frontend.",
          duration: "10 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content:
                "React is a JavaScript library for building user interfaces. Created by Facebook (Meta) in 2013, it introduced the concept of reusable components that manage their own state — revolutionizing how we build web applications.",
            },
            {
              type: "heading",
              content: "Why React?",
            },
            {
              type: "list",
              items: [
                "Component-based — build encapsulated pieces, compose them into complex UIs",
                "Declarative — describe WHAT the UI should look like, React handles HOW",
                "Virtual DOM — efficient updates only where needed",
                "Huge ecosystem — Next.js, React Native, Remix, and thousands of libraries",
                "Industry standard — used by Meta, Airbnb, Netflix, Uber, and millions of apps",
              ],
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "App.tsx",
                code: `// A simple React component
function Welcome({ name }: { name: string }) {
  return (
    <div className="card">
      <h1>Hello, {name}! 👋</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

// Using the component
function App() {
  return (
    <div>
      <Welcome name="Nasya" />
      <Welcome name="Sam" />
    </div>
  );
}

export default App;`,
              },
            },
            {
              type: "note",
              content: "React uses JSX — a syntax extension that looks like HTML inside JavaScript. JSX gets compiled to regular JavaScript function calls by tools like Babel or the TypeScript compiler.",
            },
          ],
        },
        {
          id: "jsx",
          title: "JSX & Rendering",
          description: "Write JSX, understand how React renders, and learn conditional rendering.",
          duration: "12 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content:
                "JSX (JavaScript XML) lets you write HTML-like syntax inside JavaScript. It's not required but makes React code much more readable.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "jsx-examples.tsx",
                code: `// JSX basics
const element = <h1 className="title">Hello React!</h1>;

// Expressions inside JSX (use curly braces)
const name = "Null Coded";
const title = <h1>Welcome to {name.toUpperCase()}!</h1>;

// Conditional rendering
function UserBadge({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div>
      {isAdmin ? (
        <span className="badge-admin">Admin</span>
      ) : (
        <span className="badge-user">User</span>
      )}
      {/* Short circuit for optional content */}
      {isAdmin && <button>Manage Users</button>}
    </div>
  );
}

// Rendering lists
function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
}`,
              },
            },
            {
              type: "warning",
              content: "Always add a unique key prop when rendering lists in React. Without it, React can't efficiently update the DOM and you'll get console warnings.",
            },
          ],
        },
        {
          id: "components",
          title: "Components & Props",
          description: "Master component composition, prop passing, and TypeScript interfaces.",
          duration: "14 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Components are the heart of React. They accept props (properties) as inputs and return JSX as output. Think of them as reusable, customizable UI building blocks.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "components.tsx",
                code: `// Define prop types with TypeScript
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

// A reusable Button component
function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Component composition
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="My Profile">
      <p>Hello from a child component!</p>
      <Button onClick={() => alert("clicked!")}>Click me</Button>
    </Card>
  );
}`,
              },
            },
          ],
        },
      ],
    },
    {
      id: "hooks",
      title: "React Hooks",
      icon: "🪝",
      lessons: [
        {
          id: "hooks",
          title: "useState & useEffect",
          description: "Manage state and side effects with React's core hooks.",
          duration: "16 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were introduced in React 16.8 and completely changed how React apps are written.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "hooks.tsx",
                code: `import { useState, useEffect } from "react";

// useState — manage local state
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// useEffect — handle side effects
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Runs after render, when userId changes
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });

    // Cleanup function (runs before next effect or unmount)
    return () => {
      // Cancel requests, clear timers, etc.
    };
  }, [userId]); // dependency array

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}`,
              },
            },
            {
              type: "tip",
              content: "Think of useEffect as a way to synchronize your component with the outside world (APIs, DOM, subscriptions). Don't use it to transform data that could be calculated during render.",
            },
          ],
        },
        {
          id: "use-reducer",
          title: "useReducer & useContext",
          description: "Manage complex state and share data across components without prop drilling.",
          duration: "15 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "When state logic gets complex, useReducer provides a more structured pattern. useContext lets you share data across the component tree without passing props through every level.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "reducer-context.tsx",
                code: `import { useReducer, useContext, createContext } from "react";

// useReducer for complex state
type Action = 
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number };

function counterReducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment": return state + 1;
    case "decrement": return state - 1;
    case "reset": return 0;
    case "set": return action.payload;
    default: return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

// useContext to avoid prop drilling
const ThemeContext = createContext<"dark" | "light">("dark");

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={\`btn-\${theme}\`}>Themed</button>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton /> {/* no prop passing needed! */}
    </ThemeContext.Provider>
  );
}`,
              },
            },
          ],
        },
        {
          id: "custom-hooks",
          title: "Custom Hooks",
          description: "Extract and reuse stateful logic with custom hooks.",
          duration: "13 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "Custom hooks let you extract component logic into reusable functions. Any function that starts with 'use' and calls other hooks is a custom hook.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "custom-hooks.ts",
                code: `import { useState, useEffect, useCallback } from "react";

// useFetch — reusable data fetching
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    
    fetch(url, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
        return r.json();
      })
      .then(setData)
      .catch(e => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// useLocalStorage — persist state
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch { return initial; }
  });

  const set = useCallback((v: T) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  }, [key]);

  return [value, set] as const;
}

// Usage
function App() {
  const { data: user, loading } = useFetch<User>("/api/user");
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  
  return loading ? <Spinner /> : <Profile user={user!} />;
}`,
              },
            },
          ],
        },
      ],
    },
    {
      id: "advanced-react",
      title: "Advanced Patterns",
      icon: "🔬",
      lessons: [
        {
          id: "performance",
          title: "Performance Optimization",
          description: "Memoization, lazy loading, and avoiding unnecessary re-renders.",
          duration: "14 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content: "React is fast by default, but as apps grow, performance can suffer. These optimization techniques ensure your app stays snappy.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "performance.tsx",
                code: `import { memo, useMemo, useCallback, lazy, Suspense } from "react";

// memo — prevent re-render if props unchanged
const ExpensiveComponent = memo(({ data }: { data: string[] }) => {
  return <ul>{data.map(d => <li key={d}>{d}</li>)}</ul>;
});

// useMemo — cache expensive calculations
function FilteredList({ items, query }: Props) {
  const filtered = useMemo(
    () => items.filter(item => item.includes(query)),
    [items, query] // only recalculate when these change
  );
  return <List items={filtered} />;
}

// useCallback — stable function reference
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this creates a new function every render
  // causing Child to re-render unnecessarily
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // stable reference

  return <Child onClick={handleClick} />;
}

// Lazy loading — code splitting
const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  );
}`,
              },
            },
          ],
        },
        {
          id: "server-components",
          title: "Server Components",
          description: "Understand React Server Components and the Next.js App Router model.",
          duration: "13 min",
          xp: 50,
          content: [
            {
              type: "paragraph",
              content:
                "React Server Components (RSC) allow you to render components on the server — reducing JavaScript sent to the browser, enabling direct database access, and improving performance.",
            },
            {
              type: "code",
              code: {
                language: "tsx",
                filename: "ServerPage.tsx",
                code: `// Server Component (default in Next.js App Router)
// Runs ONLY on the server — can be async!
async function UserPage({ params }: { params: { id: string } }) {
  // Direct database access — no API needed!
  const user = await db.user.findUnique({ where: { id: params.id } });
  
  return (
    <div>
      <h1>{user.name}</h1>
      {/* Client component for interactivity */}
      <FollowButton userId={user.id} />
    </div>
  );
}

// Client Component — needs interactivity
"use client";
import { useState } from "react";

function FollowButton({ userId }: { userId: string }) {
  const [following, setFollowing] = useState(false);
  
  return (
    <button onClick={() => setFollowing(f => !f)}>
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}`,
              },
            },
            {
              type: "note",
              content:
                "The rule of thumb: use Server Components by default for data fetching and static content. Add 'use client' only when you need interactivity (useState, useEffect, event handlers).",
            },
          ],
        },
      ],
    },
  ],
};

export default react;
