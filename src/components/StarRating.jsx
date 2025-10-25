// src/components/StarRating.jsx
import React, { useState } from "react";

const Star = ({ fill }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-6 h-6 ${fill ? "text-yellow-400" : "text-gray-600"}`}
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
  </svg>
);

export default function StarRating({ id, value = 0, onChange }) {
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue ?? value;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const starWidth = rect.width / 5;
    let val = position / starWidth;
    val = Math.min(Math.max(val, 0), 4.99); // bounds
    const half = val % 1 < 0.5 ? 0.5 : 1;
    const rating = Math.floor(val) + half;
    setHoverValue(rating);
  };

  const handleLeave = () => {
    setHoverValue(null);
  };

  const handleClick = () => {
    if (hoverValue) {
      onChange?.(hoverValue);
    }
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ width: "150px" }} // 5 stars * 30px
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const starVal = i + 1;
        const filled = displayValue >= starVal;
        return <Star key={i} fill={filled} />;
      })}

      {displayValue > 0 && (
        <span className="ml-2 text-sm text-gray-400">{displayValue.toFixed(1)}</span>
      )}
    </div>
  );
}
