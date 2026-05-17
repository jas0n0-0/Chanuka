import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const COL = "bookmarks";

export async function getBookmarks(userId) {
  const q = query(collection(db, COL), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addBookmark(userId, article) {
  // Prevent duplicates
  const existing = await getBookmarks(userId);
  const dupe = existing.find((b) => b.url === article.url);
  if (dupe) return dupe;

  const docRef = await addDoc(collection(db, COL), {
    userId,
    url: article.url,
    title: article.title,
    description: article.description || "",
    urlToImage: article.urlToImage || "",
    source: article.source?.name || "Unknown",
    publishedAt: article.publishedAt || "",
    savedAt: serverTimestamp(),
  });

  return { id: docRef.id, userId, url: article.url, title: article.title };
}

export async function removeBookmark(bookmarkId) {
  await deleteDoc(doc(db, COL, bookmarkId));
}

export async function isBookmarked(userId, articleUrl) {
  const bookmarks = await getBookmarks(userId);
  return bookmarks.find((b) => b.url === articleUrl) || null;
}