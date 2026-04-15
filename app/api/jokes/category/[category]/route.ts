import { NextResponse } from "next/server";
import { getJokesByCategory } from "@/lib/jokes";

export async function GET(
  _request: Request,
  context: { params: Promise<{ category: string }> },
) {
  const { category } = await context.params;
  const jokes = getJokesByCategory(category);

  if (!jokes.length) {
    return NextResponse.json(
      { error: `No jokes found for category "${category}".` },
      { status: 404 },
    );
  }

  return NextResponse.json({
    category,
    count: jokes.length,
    jokes,
  });
}
