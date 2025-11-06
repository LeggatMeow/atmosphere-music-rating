// src/components/SongSearchResults.jsx
import React, { useEffect, useMemo, useState } from "react";
import SongRating from "./SongRating";

export default function SongSearchResults({ songs, onSelectTrack }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter((fav) => fav !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  if (!songs.length) {
    return (
      <div className="bg-neutral-850/60 border border-neutral-700/40 rounded-lg p-4 text-sm text-gray-400">
        No songs match the current search.
      </div>
    );
  }

  return (
    <div className="bg-neutral-850/60 border border-neutral-700/40 rounded-lg p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
            Song matches
          </p>
          <p className="text-xs text-gray-500">
            Click a song to jump to its album and track in the list.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          {songs.length} result{songs.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="space-y-2">
        {songs.map((song) => {
          const isFav = favoriteSet.has(song.id);

          return (
            <div
              key={song.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectTrack?.(song.albumId, song.id)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  onSelectTrack?.(song.albumId, song.id);
                }
              }}
              className="flex items-center justify-between gap-3 rounded bg-neutral-800 px-3 py-2 hover:bg-neutral-700 transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              <div className="text-left">
                <p className="text-sm text-gray-100">{song.title}</p>
                <p className="text-xs text-gray-500">
                  {song.albumTitle} {song.albumYear ? `(${song.albumYear})` : ""}
                </p>
              </div>

              <div
                className="flex items-center gap-3"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label={isFav ? "Remove favorite" : "Add favorite"}
                  onClick={() => toggleFavorite(song.id)}
                  className={`text-lg transition ${
                    isFav ? "text-red-400" : "text-gray-500 hover:text-red-300"
                  }`}
                >
                  ♥
                </button>

                <SongRating song={song} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
