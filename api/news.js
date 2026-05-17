export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const API_KEY = process.env.VITE_NEWS_API_KEY;

  
  if (!API_KEY) {
    return res.status(500).json({
      error: "Missing API key",
      hint: "Add VITE_NEWS_API_KEY to Vercel environment variables",
    });
  }

  const { category = "general", page = 1, pageSize = 9, q } = req.query;

  const url = q
    ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "NewsAPI error",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch from NewsAPI",
      message: err.message,
    });
  }
}