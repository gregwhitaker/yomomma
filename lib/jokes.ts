import { readFileSync } from "node:fs";
import path from "node:path";

export type Joke = {
  id: number;
  text: string;
  category: string;
  slug: string;
};

const jokesPath = path.join(process.cwd(), "data", "jokes.txt");

function normalizeCategory(rawCategory: string | undefined) {
  const value = rawCategory?.trim().toLowerCase() || "classic";
  return value;
}

function slugifyCategory(category: string) {
  return category.replace(/\s+/g, "-");
}

function parseCategory(joke: string) {
  const match = joke.match(/^Yo mama so ([^,!.]+)/i);
  return normalizeCategory(match?.[1]);
}

function loadJokes(): Joke[] {
  const file = readFileSync(jokesPath, "utf8");
  let currentCategory: string | undefined;
  let id = 0;

  return file
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const categoryHeader = line.match(/^\[(.+)\]$/);

      if (categoryHeader) {
        currentCategory = normalizeCategory(categoryHeader[1]);
        return [];
      }

      const category = currentCategory ?? parseCategory(line);
      id += 1;

      return [
        {
          id,
          text: line,
          category,
          slug: slugifyCategory(category),
        },
      ];
    });
}

const jokes = loadJokes();

export function getAllJokes() {
  return jokes;
}

export function getRandomJoke(category?: string) {
  const collection = category ? getJokesByCategory(category) : jokes;

  if (!collection.length) {
    return null;
  }

  const index = Math.floor(Math.random() * collection.length);
  return collection[index];
}

export function getJokesByCategory(category: string) {
  const normalized = normalizeCategory(category).replace(/-/g, " ");

  return jokes.filter(
    (joke) => joke.category === normalized || joke.slug === normalized.replace(/\s+/g, "-"),
  );
}

export function getCategories() {
  const counts = new Map<string, { name: string; slug: string; count: number }>();

  for (const joke of jokes) {
    const existing = counts.get(joke.slug);

    if (existing) {
      existing.count += 1;
      continue;
    }

    counts.set(joke.slug, {
      name: joke.category,
      slug: joke.slug,
      count: 1,
    });
  }

  return Array.from(
    counts.values(),
  ).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
