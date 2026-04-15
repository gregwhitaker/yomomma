"use client";

import { useEffect, useState } from "react";

type Joke = {
  id: number;
  text: string;
};

type ApiResponse = {
  joke: Joke;
};

const fallbackMessage = "Loading a premium insult from the vault...";

export default function HomePage() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    async function initialize() {
      setIsLoading(true);

      try {
        const randomResponse = await fetch("/api/jokes/random", { cache: "no-store" });
        const randomData = (await randomResponse.json()) as ApiResponse;

        setCurrentJoke(randomData.joke);
      } finally {
        setIsLoading(false);
      }
    }

    void initialize();
  }, []);

  async function loadRandomJoke() {
    setIsRefreshing(true);
    setCopyState("idle");

    try {
      const response = await fetch("/api/jokes/random", { cache: "no-store" });
      const data = (await response.json()) as ApiResponse & { error?: string };

      if (!response.ok || !data.joke) {
        throw new Error(data.error || "No joke found");
      }

      setCurrentJoke(data.joke);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function copyJoke() {
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

  return (
    <main className="page-shell">
      <section className="simple-card">
        <article className="joke-card" aria-live="polite">
          <p>{isLoading ? fallbackMessage : currentJoke?.text || "No joke available yet."}</p>
        </article>
        <div className="button-row">
          <button className="primary-button" onClick={() => void loadRandomJoke()}>
            {isRefreshing ? "loading..." : "Hit Me"}
          </button>
          <button className="secondary-button" onClick={() => void copyJoke()}>
            {copyState === "copied" ? "Copied" : copyState === "error" ? "Copy Failed" : "Copy"}
          </button>
        </div>
      </section>
    </main>
  );
}
