const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE = "https://newsapi.org/v2";

export async function fetchTopHeadlines({ category = "general", page = 1, pageSize = 9 } = {}) {
  const params = new URLSearchParams({
    country: "us",
    category,
    page,
    pageSize,
    apiKey: API_KEY,
  });
  const res = await fetch(`${BASE}/top-headlines?${params}`);
  if (!res.ok) throw new Error("NewsAPI error");
  return res.json();
}

export async function searchNews({ query, page = 1, pageSize = 9 } = {}) {
  const params = new URLSearchParams({
    q: query,
    language: "en",
    sortBy: "publishedAt",
    page,
    pageSize,
    apiKey: API_KEY,
  });
  const res = await fetch(`${BASE}/everything?${params}`);
  if (!res.ok) throw new Error("NewsAPI error");
  return res.json();
}

export async function fetchTrending({ page = 1, pageSize = 12 } = {}) {
  const params = new URLSearchParams({
    country: "us",
    page,
    pageSize,
    apiKey: API_KEY,
  });
  const res = await fetch(`${BASE}/top-headlines?${params}`);
  if (!res.ok) throw new Error("NewsAPI error");
  return res.json();
}
