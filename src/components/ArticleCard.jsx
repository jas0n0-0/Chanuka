import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addBookmark, removeBookmark, isBookmarked } from "../bookmarks";
import "./ArticleCard.css";

const FALLBACK_IMG = "https://placehold.co/600x400/1a1a1a/ffffff?text=CHANUKA+SAHII";

export default function ArticleCard({ article, variant = "grid" }) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (!user || !article?.url) return;
    isBookmarked(user.uid, article.url).then((bm) => {
      if (bm) { setBookmarked(true); setBookmarkId(bm.id); }
      else { setBookmarked(false); setBookmarkId(null); }
    });
  }, [user, article?.url]);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please sign in to bookmark articles.");
      return;
    }
    setToggling(true);
    try {
      if (bookmarked && bookmarkId) {
        await removeBookmark(bookmarkId);
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const bm = await addBookmark(user.uid, article);
        setBookmarked(true);
        setBookmarkId(bm.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(false);
    }
  };

  const pub = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      })
    : "";

  if (variant === "hero") {
    return (
      <article className="card card--hero">
        <a href={article.url} target="_blank" rel="noreferrer" className="card__link">
          <div className="card__img-wrap card__img-wrap--hero">
            <img
              src={article.urlToImage || FALLBACK_IMG}
              alt={article.title}
              className="card__img"
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
          </div>
          <div className="card__body">
            <span className="card__source">{article.source?.name}</span>
            <h2 className="card__title card__title--hero">{article.title}</h2>
            <p className="card__desc">{article.description}</p>
            <div className="card__meta">
              <span className="card__date">{pub}</span>
              <button
                className={`card__bookmark ${bookmarked ? "card__bookmark--active" : ""} ${toggling ? "card__bookmark--spin" : ""}`}
                onClick={handleBookmark}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark this article"}
              >
                {bookmarked ? "★" : "☆"}
              </button>
            </div>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article className="card">
      <a href={article.url} target="_blank" rel="noreferrer" className="card__link">
        <div className="card__img-wrap">
          <img
            src={article.urlToImage || FALLBACK_IMG}
            alt={article.title}
            className="card__img"
            onError={(e) => { e.target.src = FALLBACK_IMG; }}
            loading="lazy"
          />
        </div>
        <div className="card__body">
          <span className="card__source">{article.source?.name}</span>
          <h3 className="card__title">{article.title}</h3>
          <div className="card__meta">
            <span className="card__date">{pub}</span>
            <button
              className={`card__bookmark ${bookmarked ? "card__bookmark--active" : ""} ${toggling ? "card__bookmark--spin" : ""}`}
              onClick={handleBookmark}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              {bookmarked ? "★" : "☆"}
            </button>
          </div>
        </div>
      </a>
    </article>
  );
}
