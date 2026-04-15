"use client";

import { useEffect, useState } from "react";

type Joke = {
  id: number;
  text: string;
  category: string;
  slug: string;
};

type Category = {
  name: string;
  slug: string;
  count: number;
};

type ApiResponse = {
  joke: Joke;
};

type JokesResponse = {
  jokes: Joke[];
  count: number;
  categories: Category[];
};

const fallbackMessage = "Loading a premium insult from the vault...";

export default function HomePage() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    async function initialize() {
      setIsLoading(true);

      try {
        const [jokesResponse, randomResponse] = await Promise.all([
          fetch("/api/jokes", { cache: "no-store" }),
          fetch("/api/jokes/random", { cache: "no-store" }),
        ]);

        const jokesData = (await jokesResponse.json()) as JokesResponse;
        const randomData = (await randomResponse.json()) as ApiResponse;

        setCategories(jokesData.categories);
        setCurrentJoke(randomData.joke);
      } finally {
        setIsLoading(false);
      }
    }

    void initialize();
  }, []);

  async function loadRandomJoke(categorySlug: string) {
    setIsRefreshing(true);
    setCopyState("idle");

    try {
      const url =
        categorySlug === "all"
          ? "/api/jokes/random"
          : `/api/jokes/random?category=${encodeURIComponent(categorySlug)}`;

      const response = await fetch(url, { cache: "no-store" });
      const data = (await response.json()) as ApiResponse & { error?: string };

      if (!response.ok || !data.joke) {
        throw new Error(data.error || "No joke found");
      }

      setCurrentJoke(data.joke);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleCopy() {
    if (!currentJoke) {
      return;
    }

    try {
      await navigator.clipboard.writeText(currentJoke.text);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  async function handleCategoryChange(categorySlug: string) {
    setSelectedCategory(categorySlug);
    await loadRandomJoke(categorySlug);
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="eyebrow">yomomma.io</div>
        <h1>Yo momma jokes, API-first.</h1>
        <p className="lede">
          A deployable Vercel app with a text-backed REST API and a fast little frontend for
          pulling the next devastating classic.
        </p>

        <div className="controls">
          <label className="select-wrap">
            <span>Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => {
                void handleCategoryChange(event.target.value);
              }}
            >
              <option value="all">all categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </label>

          <button className="primary-button" onClick={() => void loadRandomJoke(selectedCategory)}>
            {isRefreshing ? "loading..." : "hit me"}
          </button>
        </div>

        <article className="joke-card" aria-live="polite">
          <div className="joke-label">
            <span>random joke</span>
            {currentJoke ? <span className="pill">{currentJoke.category}</span> : null}
          </div>
          <p>{isLoading ? fallbackMessage : currentJoke?.text || "No joke available yet."}</p>
        </article>

        <div className="actions">
          <button className="secondary-button" onClick={() => void handleCopy()}>
            {copyState === "copied" ? "copied" : copyState === "error" ? "copy failed" : "copy joke"}
          </button>
          <a className="text-link" href="/api/jokes" target="_blank" rel="noreferrer">
            view API payload
          </a>
        </div>
      </section>

      <section className="api-card">
        <div>
          <h2>REST endpoints</h2>
          <p>Use the frontend or call these routes directly from your own app.</p>
        </div>

        <div className="endpoint-list">
          <div>
            <code>GET /api/jokes</code>
            <span>all jokes, categories, and total count</span>
          </div>
          <div>
            <code>GET /api/jokes/random</code>
            <span>one random joke from the full dataset</span>
          </div>
          <div>
            <code>GET /api/jokes/random?category=fat</code>
            <span>one random joke from a single category</span>
          </div>
          <div>
            <code>GET /api/jokes/category/ugly</code>
            <span>all jokes in a specific category</span>
          </div>
          <div>
            <code>GET /api/health</code>
            <span>basic health check for deployment monitoring</span>
          </div>
        </div>
      </section>
    </main>
  );
}
