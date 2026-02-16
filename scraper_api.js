const axios = require("axios");
const fs = require("fs");
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;
const QUERY = "restaurants in Berlin";
const MAX_RESULTS = 300;

async function textSearch(query) {
  let results = [];
  let nextPageToken = null;

  do {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: query,
          key: API_KEY,
          pagetoken: nextPageToken
        }
      }
    );

    if (response.data.status !== "OK" && response.data.status !== "ZERO_RESULTS") {
      console.error("TextSearch Error:", response.data.status);
      break;
    }

    results.push(...response.data.results);
    nextPageToken = response.data.next_page_token;

    if (nextPageToken) {
      await new Promise(r => setTimeout(r, 2000)); // Google requirement
    }

  } while (nextPageToken && results.length < MAX_RESULTS);

  return results.slice(0, MAX_RESULTS);
}

async function getDetails(placeId) {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    {
      params: {
        place_id: placeId,
        fields: "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,geometry,types",
        key: API_KEY
      }
    }
  );

  if (response.data.status !== "OK") {
    console.error("Details Error:", response.data.status);
    return null;
  }

  return response.data.result;
}

async function run() {
  console.log("🔎 Running Text Search...");

  const places = await textSearch(QUERY);
  console.log(`Found ${places.length} places`);

  let finalResults = [];

  for (let i = 0; i < places.length; i++) {
    console.log(`📍 Processing ${i + 1}/${places.length}`);

    const details = await getDetails(places[i].place_id);
    if (!details) continue;

    finalResults.push({
      name: details.name || null,
      category: details.types || [],
      address: details.formatted_address || null,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      rating: details.rating || null,
      reviews_count: details.user_ratings_total || null,
      lat: details.geometry?.location?.lat || null,
      lng: details.geometry?.location?.lng || null,
      google_maps_url: `https://www.google.com/maps/place/?q=place_id:${places[i].place_id}`
    });

    await new Promise(r => setTimeout(r, 100));
  }

  fs.writeFileSync(
    "places_data.json",
    JSON.stringify(finalResults, null, 2)
  );

  console.log("✅ Saved to places_data.json");
}

run();

