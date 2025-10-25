// src/components/StarRating.jsx
import React, { useState, useRef } from "react";

export default function StarRating({ id, value = 0, onChange }) {
  const containerRef = useRef(null);
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue ?? value;

  const calcRatingFromEvent = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;

    let raw = (offsetX / rect.width) * 5;
    raw = Math.max(0, Math.min(raw, 5)); 

    const full = Math.floor(raw);
    const frac = raw - full;
    const rating = full + (frac > 0.5 ? 1 : 0.5);

    return rating;
  };

  const handleMove = (e) => {
    setHoverValue(calcRatingFromEvent(e));
  };

  const handleClick = (e) => {
  const newRating = calcRatingFromEvent(e);

  // If clicking the same rating -> clear
  if (value === newRating) {
    onChange?.(0);
  } else {
    onChange?.(newRating);
  }

  setHoverValue(null);
};

  const handleLeave = () => setHoverValue(null);

  return (
    <div className="flex items-center gap-2 select-none">
      <div
        ref={containerRef}
        className="flex items-center gap-1 cursor-pointer"
        style={{ width: "150px" }}
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
              <svg viewBox="0 0 24 24" className="absolute inset-0 text-gray-500" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
              </svg>

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

      {/* ⭐ Star number label */}
      {displayValue > 0 && (
        <span className="text-sm text-gray-300 w-8 text-left">
          {displayValue.toFixed(1)}
        </span>
      )}
    </div>
  );
}
