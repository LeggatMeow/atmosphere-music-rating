import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating, onChange }) {
  const [hover, setHover] = useState(null);

  const handleClick = (starIndex, isHalf) => {
    const newRating = isHalf ? starIndex - 0.5 : starIndex;
    onChange(newRating);
  };

  const handleMouseEnter = (starIndex, isHalf) => {
    setHover(isHalf ? starIndex - 0.5 : starIndex);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const displayRating = hover !== null ? hover : rating;

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="relative inline-block">
          {/* Left half */}
          <span
            className="absolute left-0 w-1/2 h-full cursor-pointer"
            onClick={() => handleClick(star, true)}
            onMouseEnter={() => handleMouseEnter(star, true)}
            onMouseLeave={handleMouseLeave}
          />
          {/* Right half */}
          <span
            className="absolute right-0 w-1/2 h-full cursor-pointer"
            onClick={() => handleClick(star, false)}
            onMouseEnter={() => handleMouseEnter(star, false)}
            onMouseLeave={handleMouseLeave}
          />
          {/* Star icon */}
          {displayRating >= star ? (
            <FaStar className="text-yellow-400" />
          ) : displayRating + 0.5 === star ? (
            <FaStarHalfAlt className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-yellow-400" />
          )}
        </span>
      ))}
    </div>
  );
}
