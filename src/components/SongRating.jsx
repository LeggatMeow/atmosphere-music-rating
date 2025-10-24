import React from 'react';
import { useEffect, useState, useRef } from 'react'

// Rating component supports 0.5 increments (half-stars).
// Stores each user's rating in localStorage using key: rating-<songId>
export default function SongRating({ songId, onRateChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`rating-${songId}`);
    if (saved) setRating(parseFloat(saved));
  }, [songId]);

  const handleClick = (e, value) => {
    setRating(value);
    localStorage.setItem(`rating-${songId}`, value);
    if (onRateChange) onRateChange(); // Notify parent
  };

  const display = hover || rating;

  return (
    <div className="flex items-center gap-2">
      {/* Star rendering logic (same as before) */}
      <div className="w-16 text-right text-sm text-gray-300">
        {rating ? rating.toFixed(1) : '—'}
      </div>
    </div>
  );
}

