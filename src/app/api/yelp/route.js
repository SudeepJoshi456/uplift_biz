import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");

    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }

    const YELP_API_KEY = process.env.NEXT_PUBLIC_YELP_API_KEY;
    const YELP_API_URL = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=blackowned`;

    const response = await fetch(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Yelp");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
