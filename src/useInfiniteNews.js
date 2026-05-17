import { useState, useEffect, useCallback, useRef } from "react";

export function useInfiniteNews(fetchFn, deps = []) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);
  const PAGE_SIZE = 9;


  const depsKey = JSON.stringify(deps);
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [depsKey]); 


  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchFn(page, PAGE_SIZE);
        if (cancelled) return;
        const fresh = data.articles?.filter((a) => a.title !== "[Removed]") || [];
        setArticles((prev) => (page === 1 ? fresh : [...prev, ...fresh]));
        const totalPages = Math.ceil((data.totalResults || 0) / PAGE_SIZE);
        if (page >= totalPages || fresh.length < PAGE_SIZE) setHasMore(false);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [page, depsKey]); 

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return { articles, loading, hasMore, error, sentinelRef };
}
