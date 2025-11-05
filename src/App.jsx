import React, { useState } from "react";
import { bandData } from "./data/bandData";
import * as tracks from "./data/tracks";
import AlbumList from "./components/AlbumList";
import AlbumDetail from "./components/AlbumDetail";
import TopTracksPage from "./components/TopTracksPage";

export default function App() {
  const [view, setView] = useState("albums"); // "albums" | "top-tracks"
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [sortMode, setSortMode] = useState("oldest");

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
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 text-sm">
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
        )}

        {selectedAlbum ? (
          <AlbumDetail album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />
        ) : view === "top-tracks" ? (
          <TopTracksPage onSelectTrack={handleSelectTrack} />
        ) : (
          <AlbumList albums={bandData.albums} onSelect={handleSelectAlbum} sortMode={sortMode} />
        )}
      </div>
    </div>
  );
}
