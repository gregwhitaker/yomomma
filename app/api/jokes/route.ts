import { NextRequest, NextResponse } from "next/server";
import { getAllJokes, getCategories, getJokesByCategory } from "@/lib/jokes";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || undefined;
  const jokes = category ? getJokesByCategory(category) : getAllJokes();
  const categories = getCategories();

  if (category && !jokes.length) {
    return NextResponse.json(
      { error: `No jokes found for category "${category}".`, categories },
      { status: 404 },
    );
  }

  return NextResponse.json({
    jokes,
    count: jokes.length,
    categories,
    category: category ?? null,
  });
}
