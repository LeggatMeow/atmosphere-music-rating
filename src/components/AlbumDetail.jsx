import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

export default function AlbumDetail({ album, onBack }) {
  console.log("AlbumDetail received:", {
  id: album?.id,
  title: album?.title,
  songs: album?.songs,
  songsCount: album?.songs?.length
});

  const [albumAverage, setAlbumAverage] = useState(null);
  const [cover, setCover] = useState(null);

  const songs = album?.songs ?? [];

  const calculateAverage = () => {
    const ratings = songs
      .map((song) => {
        const key = song.id || `${album.id}-${song.title}`;
        const saved = localStorage.getItem(`rating-${key}`);
        return saved ? parseFloat(saved) : 0;
      })
      .filter((r) => r > 0);

    if (!ratings.length) return null;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(2);
  };

  useEffect(() => {
  setAlbumAverage(calculateAverage());
}, [album.songs]); // recalc if songs change


const handleRateChange = () => {
  const newAvg = calculateAverage();
  setAlbumAverage(newAvg);
};

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = await fetchAlbumArt(album.title, "Atmosphere");
        if (!cancelled) setCover(url || null);
      } catch (e) {
        console.warn("Detail cover fetch failed for", album.title, e);
      }
    })();
    return () => { cancelled = true; };
  }, [album.title]);

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-400 mb-4">← Back</button>
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

      {album.type === "studio" ? (
  <SongList songs={songs} albumId={album.id} onRateChange={handleRateChange} />
) : (
  <p className="text-gray-400 italic mt-4">Tracklist coming soon…</p>
)}

    </div>
  );
}
