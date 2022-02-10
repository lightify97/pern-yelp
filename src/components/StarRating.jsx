import React from "react";

const StarRating = ({ rating = 0, reviews = 0, showReviews = false }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    i <= rating
      ? stars.push(<i key={i} className="fas fa-star"></i>)
      : stars.push(<i key={i} className="far fa-star"></i>);
  }
  if (!Number.isInteger(rating) && rating < 5)
    stars[Math.floor(rating)] = <i className="fas fa-star-half-alt"></i>;

  if (showReviews) stars.push(<span>({reviews})</span>);

  return <>{rating === 0 ? "No Rating" : stars}</>;
};

export default StarRating;
