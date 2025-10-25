// src/components/SongList.jsx
import React, { useState, useEffect } from 'react';
import SongRating from './SongRating';

const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function SongList({ 
  songs, albumId, onRateChange, highlightedTrack, onFavoriteChange 
}) {

  if (!songs?.length) return <p>No tracks available.</p>;

  // ❤️ Favorites state
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    // Trigger album stats update
    onFavoriteChange?.();
  };

  return (
    <div className="space-y-3">

      {/* ❤️ Favorites Filter Toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          {showFavoritesOnly ? "Show All Songs" : "Show Favorites Only ♥"}
        </button>
      </div>

      {songs
        .filter((song) => !showFavoritesOnly || favorites.includes(song.id))
        .map((song, idx) => {
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
