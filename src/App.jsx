import React, { useEffect, useMemo, useState } from "react";
import { bandData } from "./data/bandData";
import * as tracks from "./data/tracks";
import AlbumList from "./components/AlbumList";
import AlbumDetail from "./components/AlbumDetail";
import TopTracksPage from "./components/TopTracksPage";
import SongSearchResults from "./components/SongSearchResults";

export default function App() {
  const [view, setView] = useState("albums"); // "albums" | "top-tracks"
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [sortMode, setSortMode] = useState("oldest");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const albumSongsLookup = useMemo(() => {
    const lookup = {};
    Object.values(tracks).forEach((album) => {
      lookup[album.albumId] = album.songs ?? [];
    });
    return lookup;
  }, []);

  const filteredAlbums = useMemo(() => {
    const search = debouncedSearch.toLowerCase();

    return bandData.albums
      .map((album) => {
        const songs = album.songs ?? albumSongsLookup[album.id] ?? [];

        let sum = 0;
        let count = 0;
        songs.forEach((song) => {
          const stored = localStorage.getItem(`rating-${song.id}`);
          if (!stored) return;
          const rating = parseFloat(stored);
          if (!Number.isFinite(rating) || rating <= 0) return;
          sum += rating;
          count += 1;
        });

        return {
          ...album,
          songs,
          averageRating: count ? sum / count : null,
          ratedCount: count,
          totalSongs: songs.length
        };
      })
      .filter((album) => {
        const matchesSearch =
          !search ||
          album.title.toLowerCase().includes(search) ||
          (album.artist || bandData.name).toLowerCase().includes(search);

        if (!matchesSearch) return false;

        if (ratingFilter === "rated") {
          return album.averageRating !== null;
        }

        if (ratingFilter === "unrated") {
          return album.averageRating === null;
        }

        if (ratingFilter !== "all") {
          const threshold = parseFloat(ratingFilter);
          if (!Number.isNaN(threshold)) {
            return album.averageRating !== null && album.averageRating >= threshold;
          }
        }

        return true;
      });
  }, [albumSongsLookup, debouncedSearch, ratingFilter]);

  const ratingOptions = [
    { label: "All ratings", value: "all" },
    { label: "4+ stars", value: "4" },
    { label: "3+ stars", value: "3" },
    { label: "2+ stars", value: "2" },
    { label: "Rated only", value: "rated" },
    { label: "Unrated only", value: "unrated" }
  ];

  const allSongs = useMemo(() => {
    return bandData.albums.flatMap((album) => {
      const songs = albumSongsLookup[album.id] ?? [];
      return songs.map((song, originalIndex) => ({
        ...song,
        albumId: album.id,
        albumTitle: album.title,
        albumYear: album.year,
        originalIndex
      }));
    });
  }, [albumSongsLookup]);

  const matchingSongs = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return [];

    return allSongs
      .filter((song) => song.title.toLowerCase().includes(query))
      .sort((a, b) => {
        if (a.albumYear && b.albumYear && a.albumYear !== b.albumYear) {
          return a.albumYear - b.albumYear;
        }
        if (a.albumTitle !== b.albumTitle) {
          return a.albumTitle.localeCompare(b.albumTitle);
        }
        return a.originalIndex - b.originalIndex;
      });
  }, [allSongs, debouncedSearch]);

  const handleSelectTrack = (albumId, trackId) => {
    handleSelectAlbum(albumId);
    setTimeout(() => {
      const el = document.getElementById(trackId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const handleSelectAlbum = (albumId) => {
    const albumMeta = bandData.albums.find((a) => a.id === albumId);
    if (!albumMeta) {
      console.error("Album meta not found for id:", albumId);
      return;
    }

    const match = Object.values(tracks).find((t) => t.albumId === albumId);
    const songs = match?.songs ?? [];

    setSelectedAlbum({ ...albumMeta, songs });
  };

  const navButtonClass = (isActive) => [
    "px-4 py-2 rounded-md border transition-colors text-center",
    "w-full sm:w-auto",
    isActive
      ? "text-yellow-300 border-yellow-500/70 bg-neutral-800"
      : "text-gray-300 border-transparent hover:text-gray-100 hover:border-neutral-600"
  ].join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-20 h-20 rounded-md bg-neutral-700 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-16 h-16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" className="text-yellow-400" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{bandData.name}</h1>
              <p className="text-gray-400 text-sm">{bandData.description}</p>
            </div>
          </div>

          <nav className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3 text-sm sm:justify-end mt-1 sm:mt-0">
            <button
              type="button"
              onClick={() => {
                setView("albums");
                setSelectedAlbum(null);
              }}
              className={navButtonClass(view === "albums")}
              aria-pressed={view === "albums"}
            >
              Albums
            </button>

            <button
              type="button"
              onClick={() => {
                setView("top-tracks");
                setSelectedAlbum(null);
              }}
              className={navButtonClass(view === "top-tracks")}
              aria-pressed={view === "top-tracks"}
            >
              My Top Tracks {"\u2B50"}
            </button>
          </nav>
        </header>

        {view === "albums" && !selectedAlbum && (
          <div className="mb-6 space-y-4 bg-neutral-850/60 border border-neutral-700/40 rounded-lg p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
              <div className="flex-1">
                <label htmlFor="album-search" className="text-xs uppercase tracking-wide text-gray-400 block mb-1">
                  Search albums or songs
                </label>
                <input
                  id="album-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Find an album or song..."
                  className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />
              </div>
              <div className="sm:w-48">
                <label htmlFor="rating-filter" className="text-xs uppercase tracking-wide text-gray-400 block mb-1">
                  Rating
                </label>
                <select
                  id="rating-filter"
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
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
              <p className="text-gray-400 sm:mr-auto text-xs uppercase tracking-wide">
                Sort albums
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSortMode("oldest")}
                  className={sortMode === "oldest" ? "text-yellow-300 font-semibold" : "text-gray-400"}
                >
                  Oldest
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("newest")}
                  className={sortMode === "newest" ? "text-yellow-300 font-semibold" : "text-gray-400"}
                >
                  Newest
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("highest")}
                  className={sortMode === "highest" ? "text-yellow-300 font-semibold" : "text-gray-400"}
                >
                  Highest Rated
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedAlbum ? (
          <AlbumDetail album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />
        ) : view === "top-tracks" ? (
          <TopTracksPage onSelectTrack={handleSelectTrack} />
        ) : filteredAlbums.length ? (
          <AlbumList albums={filteredAlbums} onSelect={handleSelectAlbum} sortMode={sortMode} />
        ) : (
          <p className="text-gray-400 text-center text-sm">No albums match the current filters.</p>
        )}

        {view === "albums" && !selectedAlbum && debouncedSearch && (
          <div className="mt-6">
            <SongSearchResults
              songs={matchingSongs}
              onSelectTrack={handleSelectTrack}
            />
          </div>
        )}
      </div>
    </div>
  );
}
