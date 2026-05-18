import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBookmarks, removeBookmark } from "../bookmarks";

const FALLBACK_IMG = "https://placehold.co/600x400/1a1a1a/ffffff?text=CHANUKA+SAHII";

function SavedCard({ bookmark, onRemove }) {
  const pub = bookmark.savedAt
    ? new Date(bookmark.savedAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      })
    : "";

  return (
    <article className="saved-card">
      <a href={bookmark.url} target="_blank" rel="noreferrer" className="saved-card__link">
        <div className="saved-card__img-wrap">
          <img
            src={bookmark.urlToImage || FALLBACK_IMG}
            alt={bookmark.title}
            className="saved-card__img"
            onError={(e) => { e.target.src = FALLBACK_IMG; }}
            loading="lazy"
          />
        </div>
        <div className="saved-card__body">
          <span className="saved-card__source">{bookmark.source}</span>
          <h3 className="saved-card__title">{bookmark.title}</h3>
          <p className="saved-card__desc">{bookmark.description}</p>
        </div>
      </a>
      <div className="saved-card__footer">
        <span className="saved-card__date">Saved {pub}</span>
        <button
          className="saved-card__remove"
          onClick={() => onRemove(bookmark.id)}
          aria-label="Remove bookmark"
        >
          Remove ✕
        </button>
      </div>
    </article>
  );
}

export default function Saved() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getBookmarks(user.uid)
      .then(setBookmarks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await removeBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch (e) {
      alert("Failed to remove bookmark.");
    }
  };

  if (!user) {
    return (
      <main className="saved saved--gate">
        <div className="saved__gate-card">
          <span className="saved__gate-icon">☆</span>
          <h2 className="saved__gate-title">Your saved articles</h2>
          <p className="saved__gate-body">
            Sign in to bookmark articles and access them from any device.
          </p>
          <Link to="/login" className="saved__gate-btn">Sign In to Continue</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="saved">
      <div className="saved__header">
        <span className="saved__eyebrow">Your Library</span>
        <h1 className="saved__title">Saved Articles</h1>
        <p className="saved__count">
          {loading ? "Loading…" : `${bookmarks.length} article${bookmarks.length !== 1 ? "s" : ""} saved`}
        </p>
      </div>

      {loading && (
        <div className="saved__loading">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="saved-skeleton">
              <div className="skeleton saved-skeleton__img" />
              <div className="saved-skeleton__lines">
                <div className="skeleton sk-sm" />
                <div className="skeleton" />
                <div className="skeleton sk-md" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="saved__error">{error}</p>}

      {!loading && bookmarks.length === 0 && (
        <div className="saved__empty">
          <span className="saved__empty-icon">☆</span>
          <p>No bookmarks yet. Star articles to save them here.</p>
          <Link to="/" className="saved__go-home">Browse stories →</Link>
        </div>
      )}

      <div className="saved__grid">
        {bookmarks.map((bm) => (
          <SavedCard key={bm.id} bookmark={bm} onRemove={handleRemove} />
        ))}
      </div>
    </main>
  );
}
