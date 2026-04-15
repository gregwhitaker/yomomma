import { NextResponse } from "next/server";
import { getAllJokes } from "@/lib/jokes";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "yomomma",
    jokeCount: getAllJokes().length,
  });
}
