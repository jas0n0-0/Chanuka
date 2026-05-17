const BASE = "http://localhost:3001";

export async function getBookmarks(userId) {
  const res = await fetch(`${BASE}/bookmarks?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  return res.json();
}

export async function addBookmark(userId, article) {
  // Prevent duplicate: check first
  const existing = await getBookmarks(userId);
  const dupe = existing.find((b) => b.url === article.url);
  if (dupe) return dupe;

  const res = await fetch(`${BASE}/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      url: article.url,
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      source: article.source?.name || "Unknown",
      publishedAt: article.publishedAt,
      savedAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error("Failed to add bookmark");
  return res.json();
}

export async function removeBookmark(bookmarkId) {
  const res = await fetch(`${BASE}/bookmarks/${bookmarkId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove bookmark");
}

export async function isBookmarked(userId, articleUrl) {
  const bookmarks = await getBookmarks(userId);
  return bookmarks.find((b) => b.url === articleUrl) || null;
}
