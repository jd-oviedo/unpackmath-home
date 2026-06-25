import { NextResponse } from "next/server";

// Update this number manually as teachers sign up
// or automate it later by reading from your Google Sheet
const FOUNDING_COUNT = 3;

export async function GET() {
  return NextResponse.json({ count: FOUNDING_COUNT });
}
