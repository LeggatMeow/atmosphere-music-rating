// src/components/SongList.jsx
import React, { useState, useEffect } from 'react';
import SongRating from './SongRating';

const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function SongList({ songs, albumId, onRateChange, highlightedTrack }) {
  if (!songs?.length) return <p>No tracks available.</p>;

  // ❤️ Load favorites on first mount
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(f => f !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="space-y-3">
      {songs.map((song, idx) => {
        const safeId = song.id || `${albumId}-${slug(song.title)}-${idx}`;
        const isFav = favorites.includes(safeId);
        const isHighlighted = highlightedTrack === safeId;

        return (
          <div
            key={safeId}
            id={safeId}
            className={`flex items-center justify-between p-2 rounded transition-colors duration-500
            ${isHighlighted ? "bg-yellow-500/20" : "bg-neutral-800"}`}
          >
            <p className="font-medium">{idx + 1}. {song.title}</p>

            <div className="flex items-center gap-3">
              {/* ❤️ Favorite button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(safeId);
                }}
                aria-label={isFav ? "Unfavorite" : "Favorite"}
                className={`text-xl transition-all ${
                  isFav ? "text-red-400" : "text-gray-500 hover:text-red-300"
                }`}
              >
                ♥
              </button>

              {/* ⭐ Rating UI */}
              <SongRating
                song={{ ...song, id: safeId }}
                onRateChange={onRateChange}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
