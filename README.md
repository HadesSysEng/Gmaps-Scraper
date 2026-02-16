# Google Maps Places Data Extractor

A Node.js tool for collecting structured business data using the Google Places API.

This project retrieves up to 300 businesses per run and exports clean JSON data for analysis or further processing.

---

## What This Project Does

This tool performs:

1. Text Search using Google Places API  
2. Fetching detailed data for each place  
3. Exporting structured JSON output  

It does NOT scrape the Google Maps UI.  
It uses the official API for stability and reliability.

---

## Extracted Data Fields

For each place, the following data is returned:

- Name  
- Category (types)  
- Address  
- Phone number  
- Website  
- Rating  
- Reviews count  
- Latitude  
- Longitude  
- Google Maps URL  

Output file:

```
places_data.json
```

---

## Why API Instead of Scraping?

Google Maps UI scraping is unstable and prone to blocking.

This project uses the official Google Places API which provides:

- Stable access  
- Structured data  
- No captcha issues  
- Scalable architecture  

---

## Requirements

- Node.js 18+
- A valid Google Cloud project
- Google Places API enabled
- Billing enabled in Google Cloud

---

## Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create environment file

Create a `.env` file:

```
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

---

## Usage

Edit inside `scraper_api.js`:

```js
const QUERY = "restaurants in Berlin";
const MAX_RESULTS = 300;
```

Then run:

```bash
node scraper_api.js
```

---

## Capacity & Limits

- Up to 300 results per run (configurable)
- Pagination handled automatically
- Respects Google API requirements
- Suitable for small to medium batch extraction

### Important

Google Places API has usage limits depending on your billing plan.

This project is designed for moderate workloads (100–300 results per execution).

---

## Project Structure

```
scraper_api.js
package.json
package-lock.json
.gitignore
README.md
```

---

## Notes

- Do not commit your API key
- Keep `.env` file private
- Use environment variables for security
##  *Hope for the freedom of Iran and the Iranian people*
---

## License

MIT License
