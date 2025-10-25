// src/components/SongRating.jsx
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function SongRating({ song, onRateChange }) {
  // song.id MUST be unique per song; we enforce a unique key from it.
  const storageKey = `rating-${song.id}`;
  const [rating, setRating] = useState(0);

  // Load initial rating from localStorage when this song row mounts or id changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = parseFloat(saved);
      if (!Number.isNaN(parsed)) setRating(parsed);
    } else {
      setRating(0);
    }
  }, [storageKey]);

  const handleChange = (val) => {
    setRating(val);
    localStorage.setItem(storageKey, String(val));
    onRateChange?.(val); // notify parent to recalc album average
  };

  return (
    <StarRating
      id={song.id}           // important: pass id to scope radio names
      value={rating}
      onChange={handleChange}
    />
  );
}
