export default async function handler(req, res) {
  const { category = "general", page = 1, pageSize = 9, q } = req.query;
  const API_KEY = process.env.VITE_NEWS_API_KEY;

  let url;
  if (q) {
    url = `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}