// src/components/StarRating.jsx
import React from "react";

/**
 * Shows 5 stars, but each star supports half-step ratings (0.5 increments).
 * Example: 3.5 stars selects half of the 4th star.
 */
export default function StarRating({ id, value = 0, onChange }) {
  const groupName = `rating-group-${id}`;

  /**
   * Array of 5 stars. For each star index i (0-4):
   *  - first click: i + 0.5
   *  - second click: i + 1.0
   */
  const stars = [0, 1, 2, 3, 4];

  // Helper: determine if star should appear filled
  const isFilled = (starIndex) => value >= starIndex + 1;

  // If value = 3.5 -> halfStarIndex = 3 (0-based for the 4th star)
  const halfStarIndex = value % 1 !== 0 ? Math.floor(value) : null;

  return (
    <div className="flex items-center gap-1" aria-label="Star rating">
      {stars.map((i) => {
        const halfVal = i + 0.5;
        const fullVal = i + 1;

        return (
          <div key={`${groupName}-${i}`} className="flex items-center gap-0.5">
            {/* HALF STAR click */}
            <label
              title={`${halfVal} stars`}
              className="cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <input
                type="radio"
                name={groupName}
                className="hidden"
                value={halfVal}
                checked={value === halfVal}
                onChange={() => onChange(halfVal)}
              />
              <span
                className={`text-xl ${
                  halfStarIndex === i || value > i ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                {halfStarIndex === i ? "★" : "✩"}
              </span>
            </label>

            {/* FULL STAR click */}
            <label
              title={`${fullVal} stars`}
              className="cursor-pointer"
              style={{ lineHeight: 1 }}
            >
              <input
                type="radio"
                name={groupName}
                className="hidden"
                value={fullVal}
                checked={value === fullVal}
                onChange={() => onChange(fullVal)}
              />
              <span
                className={`text-xl ${
                  isFilled(i) ? "text-yellow-400" : "text-gray-500"
                }`}
              >
                ★
              </span>
            </label>
          </div>
        );
      })}

      {value > 0 && (
        <span className="ml-2 text-sm text-gray-400">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
