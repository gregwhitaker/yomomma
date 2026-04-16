import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API | yomomma.io",
  description: "Human-readable API docs for the yomomma joke API.",
};

const endpoints = [
  {
    method: "GET",
    path: "/api/jokes",
    description: "Returns all jokes plus category metadata.",
    curl: "curl https://yomomma.io/api/jokes",
  },
  {
    method: "GET",
    path: "/api/jokes?category=fat",
    description: "Returns all jokes in a specific category.",
    curl: "curl \"https://yomomma.io/api/jokes?category=fat\"",
  },
  {
    method: "GET",
    path: "/api/jokes/random",
    description: "Returns one random joke from the full list.",
    curl: "curl https://yomomma.io/api/jokes/random",
  },
  {
    method: "GET",
    path: "/api/jokes/random?category=ugly",
    description: "Returns one random joke from a specific category.",
    curl: "curl \"https://yomomma.io/api/jokes/random?category=ugly\"",
  },
  {
    method: "GET",
    path: "/api/jokes/category/stupid",
    description: "Returns all jokes in a category using the path-based route.",
    curl: "curl https://yomomma.io/api/jokes/category/stupid",
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Health check endpoint for uptime monitoring.",
    curl: "curl https://yomomma.io/api/health",
  },
];

export default function ApiDocsPage() {
  return (
    <main className="page-shell">
      <section className="simple-card">
        <h1 style={{ margin: 0, fontSize: "clamp(2rem, 5vw, 3rem)" }}>API</h1>
        <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
          Simple docs for the yomomma.io joke API with curl examples you can run as-is.
        </p>

        <div style={{ display: "grid", gap: "1rem" }}>
          {endpoints.map((endpoint) => (
            <section
              key={endpoint.path}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "20px",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.66)",
              }}
            >
              <p style={{ margin: 0, fontWeight: 700 }}>
                <span style={{ color: "var(--primary)" }}>{endpoint.method}</span> {endpoint.path}
              </p>
              <p style={{ margin: "0.5rem 0 0", color: "var(--muted)", lineHeight: 1.5 }}>
                {endpoint.description}
              </p>
              <pre
                style={{
                  margin: "0.9rem 0 0",
                  padding: "0.85rem 1rem",
                  borderRadius: "14px",
                  background: "#24160a",
                  color: "#fffaf2",
                  overflowX: "auto",
                  fontSize: "0.95rem",
                }}
              >
                <code>{endpoint.curl}</code>
              </pre>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
