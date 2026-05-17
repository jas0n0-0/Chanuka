const BASE = "/api/news";

export async function fetchTopHeadlines({ category = "general", page = 1, pageSize = 9 } = {}) {
  const params = new URLSearchParams({ category, page, pageSize });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error("News fetch error");
  return res.json();
}

export async function searchNews({ query, page = 1, pageSize = 9 } = {}) {
  const params = new URLSearchParams({ q: query, page, pageSize });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error("News fetch error");
  return res.json();
}

export async function fetchTrending({ page = 1, pageSize = 12 } = {}) {
  const params = new URLSearchParams({ category: "general", page, pageSize });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error("News fetch error");
  return res.json();
}