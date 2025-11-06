// src/components/StarRating.jsx
import React, { useRef, useState } from "react";

export default function StarRating({ id, value = 0, onChange }) {
  const containerRef = useRef(null);
  const lastTouchValue = useRef(null);
  const [hoverValue, setHoverValue] = useState(null);

  const displayValue = hoverValue ?? value;

  const calcRatingFromClientX = (clientX) => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;

    let raw = (offsetX / rect.width) * 5;
    raw = Math.max(0, Math.min(raw, 5));

    const full = Math.floor(raw);
    const frac = raw - full;
    const rating = full + (frac > 0.5 ? 1 : 0.5);

    return rating;
  };

  const applyRating = (nextValue) => {
    if (nextValue == null) return;

    if (value === nextValue) {
      onChange?.(0);
    } else {
      onChange?.(nextValue);
    }

    setHoverValue(null);
  };

  const handleMove = (event) => {
    setHoverValue(calcRatingFromClientX(event.clientX));
  };

  const handleClick = (event) => {
    const newRating = calcRatingFromClientX(event.clientX);
    applyRating(newRating);
  };

  const handleTouch = (event, commit = false) => {
    const touch = event.touches?.[0] ?? event.changedTouches?.[0];
    if (!touch) return;

    const nextValue = calcRatingFromClientX(touch.clientX);
    lastTouchValue.current = nextValue;
    setHoverValue(nextValue);

    if (commit) {
      applyRating(nextValue);
    }
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    handleTouch(event, false);
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    handleTouch(event, false);
  };

  const handleTouchEnd = (event) => {
    event.preventDefault();
    const nextValue = lastTouchValue.current;
    lastTouchValue.current = null;
    applyRating(nextValue);
  };

  const handleTouchCancel = () => {
    lastTouchValue.current = null;
    setHoverValue(null);
  };

  const handleLeave = () => setHoverValue(null);

  return (
    <div className="flex items-center gap-3 select-none">
      <div
        ref={containerRef}
        className="flex items-center gap-2 cursor-pointer w-full max-w-[220px] sm:max-w-[170px]"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        aria-label="Rate this track"
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const fullThresh = i + 1;
          const halfThresh = i + 0.5;

          let state = "off";
          if (displayValue >= fullThresh) state = "full";
          else if (displayValue >= halfThresh) state = "half";

          return (
            <div key={i} className="relative w-8 h-8 sm:w-7 sm:h-7 pointer-events-none">
              <svg viewBox="0 0 24 24" className="absolute inset-0 text-gray-500" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>

              {state !== "off" && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 text-yellow-400 transition-all duration-150"
                  fill="currentColor"
                  style={state === "half" ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {displayValue > 0 && (
        <span className="text-base text-gray-200 w-10 text-left">
          {displayValue.toFixed(1)}
        </span>
      )}
    </div>
  );
}
