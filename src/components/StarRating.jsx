// src/components/StarRating.jsx
import React, { useState, useRef } from "react";

export default function StarRating({ id, value = 0, onChange }) {
  const containerRef = useRef(null);
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue ?? value;

  const calcRatingFromEvent = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    let raw = (offsetX / rect.width) * 5;
    raw = Math.max(0, Math.min(raw, 5)); // bounds 0..5

    const full = Math.floor(raw);
    const frac = raw - full;
    const rating = full + (frac > 0.5 ? 1 : 0.5);

    return rating;
  };

  const handleMove = (e) => {
    const rating = calcRatingFromEvent(e);
    setHoverValue(rating);
  };

  const handleClick = (e) => {
    const rating = calcRatingFromEvent(e);
    onChange?.(rating);
    setHoverValue(null);
  };

  const handleLeave = () => {
    setHoverValue(null);
  };

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-1 cursor-pointer select-none"
      style={{ width: "150px" }} // 5 * 30px stars
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fullThresh = i + 1;
        const halfThresh = i + 0.5;

        let state = "off";
        if (displayValue >= fullThresh) state = "full";
        else if (displayValue >= halfThresh) state = "half";

        return (
          <div key={i} className="relative w-6 h-6 pointer-events-none">
            {/* Base outline */}
            <svg viewBox="0 0 24 24" className="absolute inset-0 text-gray-500" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>

            {/* Filled layers */}
            {state !== "off" && (
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 text-yellow-400 transition-all duration-150"
                fill="currentColor"
                style={
                  state === "half"
                    ? { clipPath: "inset(0 50% 0 0)" }
                    : {}
                }
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
