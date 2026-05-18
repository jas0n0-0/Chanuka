export default function SkeletonCard({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton--img" />
          <div className="skeleton skeleton--line sk-sm" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line sk-md" />
          <div className="skeleton skeleton--line sk-xs" />
        </div>
      ))}
    </>
  );
}
