import type { Metadata } from "next";
import { SiteFooter } from "@/app/components/site-footer";

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
        <h1 className="api-title">API</h1>
        <p className="api-intro">
          Simple docs for the yomomma.io joke API with curl examples you can run as-is.
        </p>

        <div className="api-endpoints">
          {endpoints.map((endpoint) => (
            <section key={endpoint.path} className="api-endpoint-card">
              <p className="api-endpoint-heading">
                <span className="api-endpoint-method">{endpoint.method}</span> {endpoint.path}
              </p>
              <p className="api-endpoint-description">{endpoint.description}</p>
              <pre className="api-code-block">
                <code>{endpoint.curl}</code>
              </pre>
            </section>
          ))}
        </div>
      </section>
      <SiteFooter linkHref="/" linkLabel="Home" />
    </main>
  );
}
