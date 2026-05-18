import { useState } from "react";

export default function SearchBar({ onSearch, placeholder = "Search articles…" }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit} role="search">
      <span className="searchbar__icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        className="searchbar__input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search news"
      />
      {query && (
        <button type="button" className="searchbar__clear" onClick={handleClear} aria-label="Clear search">
          ✕
        </button>
      )}
      <button type="submit" className="searchbar__btn">Search</button>
    </form>
  );
}
