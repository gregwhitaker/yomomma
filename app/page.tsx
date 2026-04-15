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

  return (
    <main className="page-shell">
      <section className="simple-card">
        <article className="joke-card" aria-live="polite">
          <p>{isLoading ? fallbackMessage : currentJoke?.text || "No joke available yet."}</p>
        </article>
        <button className="primary-button" onClick={() => void loadRandomJoke()}>
          {isRefreshing ? "loading..." : "Hit Me"}
        </button>
      </section>
    </main>
  );
}
