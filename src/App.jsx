import React, { useState } from "react";
import { bandData } from "./data/bandData";
import AlbumList from "./components/AlbumList";
import AlbumDetail from "./components/AlbumDetail";

export default function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-md bg-neutral-700 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                className="text-yellow-400"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{bandData.name}</h1>
            <p className="text-gray-400 text-sm">{bandData.description}</p>
          </div>
        </header>

        {selectedAlbum ? (
          <AlbumDetail album={selectedAlbum} onBack={() => setSelectedAlbum(null)} />
        ) : (
          <AlbumList albums={bandData.albums} onSelect={setSelectedAlbum} />
        )}
      </div>
    </div>
  );
}
