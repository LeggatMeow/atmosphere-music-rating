import React, { useState } from "react";
import { bandData } from "./data/bandData";
import * as tracks from "./data/tracks";
import AlbumList from "./components/AlbumList";
import AlbumDetail from "./components/AlbumDetail";

export default function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [sortMode, setSortMode] = useState("oldest");


  const handleSelectAlbum = (albumId) => {
    // 1) Find album metadata by id
    const albumMeta = bandData.albums.find(a => a.id === albumId);
    if (!albumMeta) {
      console.error("Album meta not found for id:", albumId);
      return;
    }

    // 2) Find tracks export that matches albumId
    const match = Object.values(tracks).find(t => t.albumId === albumId);
    const songs = match?.songs ?? [];

    // 3) Set a NEW object — do not mutate albumMeta
    setSelectedAlbum({ ...albumMeta, songs });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-md bg-neutral-700 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" className="text-yellow-400" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{bandData.name}</h1>
            <p className="text-gray-400 text-sm">{bandData.description}</p>
          </div>
        </header>

        
        {!selectedAlbum && (
  <div className="flex gap-4 mb-6 text-sm">
    <button
      onClick={() => setSortMode("oldest")}
      className={sortMode === "oldest" ? "text-yellow-400 font-semibold" : "text-gray-400"}
    >
      Oldest
    </button>
    <button
      onClick={() => setSortMode("newest")}
      className={sortMode === "newest" ? "text-yellow-400 font-semibold" : "text-gray-400"}
    >
      Newest
    </button>
    <button
      onClick={() => setSortMode("highest")}
      className={sortMode === "highest" ? "text-yellow-400 font-semibold" : "text-gray-400"}
    >
      Highest Rated
    </button>
  </div>
)}

        {selectedAlbum ? (
          <AlbumDetail album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />
        ) : (
          <AlbumList
  albums={bandData.albums}
  onSelect={handleSelectAlbum}
  sortMode={sortMode}
/>

        )}
      </div>
    </div>
  );
}
