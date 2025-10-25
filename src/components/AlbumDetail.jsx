import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

export default function AlbumDetail({ album, onBack }) {
  const [albumAverage, setAlbumAverage] = useState(null);
  const [cover, setCover] = useState(null);

  // Calculate album average
  const calculateAverage = () => {
    const ratings = album.songs
      .map((song) => {
        const saved = localStorage.getItem(`rating-${song.id}`);
        return saved ? parseFloat(saved) : 0;
      })
      .filter((r) => r > 0);

    if (ratings.length === 0) return null;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(2);
  };

  useEffect(() => {
    setAlbumAverage(calculateAverage());
  }, []);

  const handleRateChange = () => {
    setAlbumAverage(calculateAverage());
  };

  // Fetch album cover dynamically from iTunes
  useEffect(() => {
    async function loadCover() {
      const url = await fetchAlbumArt(album.title, "Atmosphere");
      setCover(url);
    }
    loadCover();
  }, [album.title]);

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-400 mb-4">
        ← Back
      </button>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
        {cover && <img src={cover} alt={album.title} className="w-48 rounded-lg shadow-lg" />}
        <div>
          <h2 className="text-2xl font-bold">{album.title}</h2>
          <p className="text-gray-400 mb-1">{album.year}</p>
          <p className="text-yellow-400 font-semibold mb-4">
            {albumAverage ? `Album Avg: ${albumAverage} ⭐` : "No ratings yet"}
          </p>
          <p className="text-gray-300 max-w-xl">
            Album tracklist — rate songs with 1–5 stars (half stars supported).
          </p>
        </div>
      </div>

      <SongList songs={album.songs} onRateChange={handleRateChange} />
    </div>
  );
}
