import { useState, useCallback } from "react";
import { useInfiniteNews } from "../useInfiniteNews";
import { fetchTopHeadlines } from "../news";
import ArticleCard from "../components/ArticleCard";
import SkeletonCard from "../components/SkeletonCard";

const CATEGORIES = [
  { key: "general", label: "All" },
  { key: "business", label: "Business" },
  { key: "technology", label: "Technology" },
  { key: "politics", label: "Politics" },
  { key: "sports", label: "Sports" },
  { key: "health", label: "Health" },
  { key: "science", label: "Science" },
  { key: "entertainment", label: "Entertainment" },
];

export default function Home() {
  const [category, setCategory] = useState("general");

  const fetchFn = useCallback(
    (page, pageSize) => fetchTopHeadlines({ category, page, pageSize }),
    [category]
  );

  const { articles, loading, hasMore, error, sentinelRef } = useInfiniteNews(fetchFn, [category]);

  const hero = articles[0] || null;
  const rest = articles.slice(1);

  return (
    <main className="home">
      <section className="home__filters" aria-label="Filter by category">
        <div className="home__filters-inner">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`filter-btn ${category === c.key ? "filter-btn--active" : ""}`}
              onClick={() => setCategory(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {hero && (
        <section className="home__hero">
          <ArticleCard article={hero} variant="hero" />
        </section>
      )}

      <div className="home__section-head">
        <span className="home__section-label">
          {CATEGORIES.find((c) => c.key === category)?.label || "Latest"}
        </span>
        <div className="home__section-line" />
      </div>

      <section className="home__grid" aria-label="News articles">
        {rest.map((article, i) => (
          <ArticleCard key={`${article.url}-${i}`} article={article} />
        ))}
        {loading && <SkeletonCard count={6} />}
      </section>

      {error && <p className="home__error">Failed to load articles: {error}</p>}
      {!hasMore && !loading && articles.length > 0 && (
        <p className="home__end">You're all caught up.</p>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </main>
  );
}
