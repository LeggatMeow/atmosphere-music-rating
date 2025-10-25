// src/components/StarRating.jsx
import React from "react";

/**
 * Displays 5 stars, each supporting full & half selection.
 * Example: 3.5 stars → 3 full stars + 1 half-filled star
 */
export default function StarRating({ id, value = 0, onChange }) {
  const groupName = `rating-${id}`;

  // Determine highlight state
  const isFull = (i) => value >= i + 1;
  const isHalf = (i) => value > i && value < i + 1;

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="relative w-6 h-6 cursor-pointer">
          
          {/* Invisible half button */}
          <input
            type="radio"
            name={groupName}
            id={`${groupName}-half-${i}`}
            className="absolute left-0 w-1/2 h-full opacity-0 cursor-pointer"
            onChange={() => onChange(i + 0.5)}
          />

          {/* Invisible full button */}
          <input
            type="radio"
            name={groupName}
            id={`${groupName}-full-${i}`}
            className="absolute right-0 w-1/2 h-full opacity-0 cursor-pointer"
            onChange={() => onChange(i + 1)}
          />

          {/* Base star outline */}
          <svg
            viewBox="0 0 24 24"
            className="absolute inset-0 text-gray-600"
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
          </svg>

          {/* Full fill overlay */}
          {isFull(i) && (
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 text-yellow-400"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
          )}

          {/* Half fill overlay */}
          {isHalf(i) && (
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 text-yellow-400"
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
