import React, { useEffect, useMemo, useState } from "react";
import * as tracksData from "../data/tracks";

export default function TopTracksPage({ onSelectTrack }) {
  const [topTracks, setTopTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const allTracks = Object.values(tracksData).flatMap(album =>
      album.songs.map(song => ({
        ...song,
        albumTitle: album.title,
        albumId: album.albumId,
        rating: parseFloat(localStorage.getItem(`rating-${song.id}`) || "0"),
        isFav: favorites.includes(song.id)
      }))
    );

    const rated = allTracks.filter(t => t.rating > 0);

    setTopTracks(
      rated.sort((a, b) => b.rating - a.rating)
    );
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredTracks = useMemo(() => {
    const search = debouncedSearch;

    return topTracks.filter((track) => {
      if (favoritesOnly && !track.isFav) return false;

      if (search) {
        const haystack = `${track.title} ${track.albumTitle}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }

      if (ratingFilter !== "all") {
        const threshold = parseFloat(ratingFilter);
        if (!Number.isNaN(threshold)) {
          return track.rating >= threshold;
        }
      }

      return true;
    });
  }, [debouncedSearch, favoritesOnly, ratingFilter, topTracks]);

  const ratingOptions = [
    { value: "all", label: "All ratings" },
    { value: "4", label: "4+ stars" },
    { value: "3.5", label: "3.5+ stars" },
    { value: "3", label: "3+ stars" }
  ];

  if (!topTracks.length)
    return <p className="text-gray-400">Rate some tracks to see your list!</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Top Tracks</h2>

      <div className="bg-neutral-850/70 border border-neutral-700/40 rounded-md p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex-1">
            <span className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
              Search tracks or albums
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Filter by track or album name..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </label>

          <label className="sm:w-44">
            <span className="block text-xs uppercase tracking-wide text-gray-400 mb-1">
              Rating
            </span>
            <select
              value={ratingFilter}
              onChange={(event) => setRatingFilter(event.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
          <p>
            Showing {filteredTracks.length} of {topTracks.length} rated track
            {topTracks.length === 1 ? "" : "s"}
          </p>
          <button
            type="button"
            onClick={() => setFavoritesOnly((prev) => !prev)}
            className={`uppercase tracking-wide transition ${
              favoritesOnly ? "text-red-400" : "text-gray-400 hover:text-red-300"
            }`}
          >
            {favoritesOnly ? "Showing favorites" : "Favorites only"}
          </button>
        </div>
      </div>

      {filteredTracks.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No tracks match the current filters.
        </p>
      ) : (
        filteredTracks.map((track, idx) => (
          <div
            key={track.id}
            className="p-2 bg-neutral-800 rounded cursor-pointer flex justify-between hover:bg-neutral-700 transition"
            onClick={() => onSelectTrack(track.albumId, track.id)}
          >
            <div>
              <p className="text-gray-100">
                {idx + 1}. {track.title}
              </p>
              <p className="text-gray-400 text-xs">{track.albumTitle}</p>
            </div>
            <p className="text-yellow-400">
              {track.rating.toFixed(1)} {"\u2B50"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
