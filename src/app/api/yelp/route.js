export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "Huntsville, AL";
  const term = searchParams.get("term") || "";
  const categories = searchParams.get("categories") || "";

  const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;
  const radius = 40000; // MAX allowed by Yelp (25 miles)

  try {
    let yelpURL = `https://api.yelp.com/v3/businesses/search?location=${location}&sort_by=best_match`;
    if (term) yelpURL += `&term=black%20owned%20${encodeURIComponent(term)}`;
    if (categories) yelpURL += `&term=black%20owned%20${encodeURIComponent(categories)}`;

    console.log(yelpURL);

    const response = await fetch(yelpURL, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching Yelp data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}



// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const location = searchParams.get("location") || "Huntsville,AL";
//   const categories = searchParams.get("categories") || "";
//   const term = searchParams.get("term") || "";
//   const apiKey = process.env.NEXT_PUBLIC_YELP_API_KEY;

//   let yelpURL = `https://api.yelp.com/v3/businesses/search?location=${location}&radius=${radius}&attributes=black_owned`;
//   if (term) yelpURL += `&term=${encodeURIComponent(term)}&categories=blackowned`;
//   if (categories!="") yelpURL += `&categories=${encodeURIComponent(categories)}`;
//   if (categories=="") yelpURL += `&categories=blackownedbusinesses`;

//   console.log(yelpURL);
//   try {
//     const response = await fetch(yelpURL, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) throw new Error("Failed to fetch Yelp data");

//     const data = await response.json();
//     return Response.json(data);
//   } catch (error) {
//     console.error("Error fetching Yelp data:", error);
//     return Response.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }


// // import { NextResponse } from "next/server";

// // export async function GET(req) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const location = searchParams.get("location");

// //     if (!location) {
// //       return NextResponse.json({ error: "Location is required" }, { status: 400 });
// //     }

// //     const YELP_API_KEY = process.env.NEXT_PUBLIC_YELP_API_KEY;
// //     const YELP_API_URL = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`;

// //     const response = await fetch(YELP_API_URL, {
// //       headers: {
// //         Authorization: `Bearer ${YELP_API_KEY}`,
// //         "Content-Type": "application/json",
// //       },
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to fetch data from Yelp");
// //     }

// //     const data = await response.json();
// //     return NextResponse.json(data);
// //   } catch (error) {
// //     return NextResponse.json({ error: error.message }, { status: 500 });
// //   }
// // }
