// src/components/SongRating.jsx
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useAuth } from "../contexts/AuthContext";
import { submitRating } from "../utils/supabaseClient";

export default function SongRating({ song, onRateChange }) {
  const { user } = useAuth();
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

    // If user is logged in, persist rating to Supabase
    if (user) {
      // Best-effort async sync; don't block UI
      (async () => {
        try {
          await submitRating({
            userId: user.id,
            trackId: song.id,
            rating: val,
            albumTitle: song.albumTitle || null,
            trackTitle: song.title || null,
          });
        } catch (err) {
          console.warn('Failed to submit rating to server', err);
        }
      })();
    }
  };

  return (
    <StarRating
      id={song.id}           // important: pass id to scope radio names
      value={rating}
      onChange={handleChange}
    />
  );
}
