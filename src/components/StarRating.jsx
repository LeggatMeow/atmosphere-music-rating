// src/components/StarRating.jsx
import React from "react";

export default function StarRating({ id, value = 0, onChange }) {
  const groupName = `rating-${id}`;
  
  const isFull = (i) => value >= i + 1;
  const isHalf = (i) => value > i && value < i + 1;

  const handleClick = (e, i) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const half = rect.width / 2;

    if (clickX <= half) {
      onChange(i + 0.5);
    } else {
      onChange(i + 1);
    }
  };

  return (
    <div className="flex items-center gap-1 select-none">
      {[0,1,2,3,4].map((i) => (
        <div 
          key={i}
          className="relative w-6 h-6 cursor-pointer"
          onClick={(e) => handleClick(e, i)}
        >
          {/* Outline star */}
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 text-gray-600 pointer-events-none"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
          </svg>

          {/* Full star fill */}
          {isFull(i) && (
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 text-yellow-400 pointer-events-none"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
          )}

          {/* Half star fill */}
          {isHalf(i) && (
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 text-yellow-400 pointer-events-none"
              fill="currentColor"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
