export function StarRating({ rating }: { rating?: number }) {
  if (!rating || rating <= 0) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <span className="stars" aria-label={`${rating}点`}>
      {"★".repeat(fullStars)}
      {hasHalfStar && "☆"}
    </span>
  );
}
