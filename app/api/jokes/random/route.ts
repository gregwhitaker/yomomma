import { NextRequest, NextResponse } from "next/server";
import { getRandomJoke } from "@/lib/jokes";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || undefined;
  const joke = getRandomJoke(category);

  if (!joke) {
    return NextResponse.json({ error: "No jokes found for that category." }, { status: 404 });
  }

  return NextResponse.json({ joke });
}
