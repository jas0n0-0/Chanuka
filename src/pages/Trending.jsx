import { useState, useCallback } from "react";
import { useInfiniteNews } from "../useInfiniteNews";
import { fetchTrending, searchNews } from "../news";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import "./Trending.css";

export default function Trending() {
  const [query, setQuery] = useState("");

  const fetchFn = useCallback(
    (page, pageSize) =>
      query
        ? searchNews({ query, page, pageSize })
        : fetchTrending({ page, pageSize }),
    [query]
  );

  const { articles, loading, hasMore, error, sentinelRef } = useInfiniteNews(fetchFn, [query]);

  const hero = articles[0] || null;
  const rest = articles.slice(1);

  return (
    <main className="trending">
      <div className="trending__header">
        <div className="trending__header-top">
          <span className="trending__eyebrow">Trending Now</span>
          <h1 className="trending__title">
            {query ? `Results for "${query}"` : "Today's Top Stories"}
          </h1>
        </div>
        <SearchBar onSearch={setQuery} placeholder="Search all news…" />
      </div>

      {!loading && hero && (
        <section className="trending__hero">
          <ArticleCard article={hero} variant="hero" />
        </section>
      )}

      {!query && (
        <div className="trending__ticker-wrap" aria-hidden="true">
          <div className="trending__ticker">
            {articles.slice(1, 6).map((a) => (
              <span key={a.url} className="trending__ticker-item">
                <b>{a.source?.name}</b> — {a.title}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="trending__section-head">
        <span className="trending__section-label">{query ? "Search Results" : "Trending Stories"}</span>
        <div className="trending__section-line" />
      </div>

      <section className="trending__grid">
        {rest.map((article, i) => (
          <ArticleCard key={`${article.url}-${i}`} article={article} />
        ))}
        {loading && <SkeletonCard count={6} />}
      </section>

      {error && <p className="trending__error">Failed to load: {error}</p>}
      {!hasMore && !loading && articles.length > 0 && (
        <p className="trending__end">No more stories.</p>
      )}
      {!loading && articles.length === 0 && query && (
        <div className="trending__empty">
          <p>No results found for <em>"{query}"</em>. Try a different search term.</p>
        </div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
    </main>
  );
}
